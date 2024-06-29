export interface Product {
  name: string
  price: number
  offerCode: number | string
  image: string
  tax: number
  shipping: number
}

export type ProductCard = Pick<Product, 'offerCode' | 'name' | 'image' | 'price'>
export interface ProductRequestParams { offerCode: string }
export type ProductResponse = Product[] | Product

export interface UserInfo {
  name: string
  email: string
  phone: string
}

export interface ShippingInfo {
  address: string
  city: string
  state: string
  neighborhood: string
  postalCode: string
}

export interface PaymentInfo {
  cpf: string
  birthday: string
  total: number
  type: 'card' | 'pix' | 'invoice'
}

export interface CheckoutInfo {
  client?: UserInfo
  shipping?: ShippingInfo
  payment?: PaymentInfo
  total?: number
}

export interface CheckoutRequestBody {
  data: CheckoutInfo
}

export interface OrderSuccessResponse {
  orderCode: number
  total: number
  shipping: ShippingInfo
  client: UserInfo
  invoice?: string
  pix?: string
}

export interface OrderErrorResponse {
  status: string
  message: string
}

export type Order = OrderSuccessResponse | OrderErrorResponse
