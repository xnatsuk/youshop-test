import { afterAll, beforeAll } from 'vitest'
import { server } from '../src/mocks/node'

export const API_URL = import.meta.env.VITE_API_URL
export function initMockServer() {
  beforeAll(() => server.listen())
  afterAll(() => server.close())
  afterEach(() => server.resetHandlers())
}
