import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
})

export default router

router.beforeEach(async (to, from, next) => {
  const store = useProductStore()
  if (to.name === '/checkout/[code]')
    await store.setProduct(to.params.code)

  if (to.name === '/')
    await store.setProductList()

  next()
})
