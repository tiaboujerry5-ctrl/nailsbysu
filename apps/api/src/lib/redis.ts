// Redis is disabled in local dev mode.
// This is a no-op stub so imports don't break.
export const redis = {
  get: async (_key: string) => null,
  set: async (_key: string, _value: string) => 'OK',
  del: async (_key: string) => 0,
  on: (_event: string, _handler: unknown) => {},
}
