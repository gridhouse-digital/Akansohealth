export type RateLimitResult = { ok: true } | { ok: false; retryAfterSeconds: number }

type Bucket = { count: number; resetAt: number }

/**
 * Best-effort limiter for a single server instance. On Vercel each isolate has
 * its own memory, so a determined sender can exceed the limit. A shared store
 * (Vercel Firewall rate limit, or Upstash Redis) is the durable version.
 */
export function createRateLimiter(options: {
  limit: number
  windowMs: number
  now?: () => number
}) {
  const buckets = new Map<string, Bucket>()
  const now = options.now ?? Date.now

  return {
    check(rawKey: string): RateLimitResult {
      const key = (rawKey || 'unknown').slice(0, 128)
      const time = now()

      if (buckets.size > 2000) {
        for (const [bucketKey, bucket] of buckets) {
          if (bucket.resetAt <= time) buckets.delete(bucketKey)
        }
      }

      const existing = buckets.get(key)
      if (!existing || existing.resetAt <= time) {
        buckets.set(key, { count: 1, resetAt: time + options.windowMs })
        return { ok: true }
      }

      if (existing.count >= options.limit) {
        return {
          ok: false,
          retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - time) / 1000)),
        }
      }

      existing.count += 1
      return { ok: true }
    },
  }
}

export const CONTACT_RATE_LIMIT = 8
export const CONTACT_RATE_WINDOW_MS = 10 * 60 * 1000

export const contactRateLimit = createRateLimiter({
  limit: CONTACT_RATE_LIMIT,
  windowMs: CONTACT_RATE_WINDOW_MS,
})

export function clientIp(request: Request) {
  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp.slice(0, 128)

  const forwarded = request.headers.get('x-forwarded-for')
  const first = forwarded?.split(',')[0]?.trim()
  if (first) return first.slice(0, 128)

  return 'unknown'
}
