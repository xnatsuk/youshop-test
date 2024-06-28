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
