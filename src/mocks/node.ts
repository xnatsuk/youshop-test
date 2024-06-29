import { setupServer } from 'msw/node'
import { checkoutHandlers, productHandlers } from './handlers'

export const server = setupServer(...productHandlers, ...checkoutHandlers)
