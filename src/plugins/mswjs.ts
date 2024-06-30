import { worker } from '@/mocks/browser'

export default async function initMocks() {
  await worker.start()
}
