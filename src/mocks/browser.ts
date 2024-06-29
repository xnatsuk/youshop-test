import { setupWorker } from 'msw/browser'
import { checkoutHandlers, productHandlers } from './handlers'

export const worker = setupWorker(...productHandlers, ...checkoutHandlers)
