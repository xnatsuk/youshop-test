export default async function prepare() {
  const { worker } = await import('@/mocks/browser')
  await worker.start()

  return Promise.resolve()
}
