import { HttpResponse, http } from 'msw'
import type { CheckoutInfo, CheckoutRequestBody, ProductRequestParams } from '@/types'

const API_URL = 'https://api.deepspacestore.com'

const data = [
  {
    offerCode: 1,
    name: 'Kit Roupas Masculinas',
    tax: 0.1,
    price: 129.99,
    shipping: 15.99,
    image: 'https://cdn.shopify.com/s/files/1/0688/1755/1382/collections/cd_a_neatly_arranged_photo_of_mens_clothes_t-shirt_gray_hoodie__c5a4ebe4-ccb1-4d94-ae56-a1b33b4e71d9_1.png?v=1675456349',
  },
  {
    offerCode: 2,
    name: 'Kit Roupas Esportivas Unissex',
    tax: 0,
    price: 199.99,
    shipping: 15.99,
    image: 'https://cdn.shopify.com/s/files/1/0688/1755/1382/collections/cd_three_pairs_of_neatly_arranged_men_and_womens_running_shoes._f4121e54-2c8a-4ad2-b366-355c0cc4348d_7.png?v=1675467965',
  },
  {
    offerCode: 3,
    name: 'Kit Roupas Femininas',
    tax: 0.1,
    price: 129.99,
    shipping: 15.99,
    image: 'https://cdn.shopify.com/s/files/1/0688/1755/1382/collections/cd_a_neatly_arranged_photo_of_womens_clothes_t-shirt_yoga_pants_1f41a422-4293-4b40-b986-8d514fb2041c_1.png?v=1675456116',
  },
]

const invoiceImage = 'https://1.bp.blogspot.com/-KRy1jKoNSZk/Vw0JRWirnnI/AAAAAAAAUdg/ZVZDImzOMxgwlk9Z73lc24tWtRbDCcpwQCLcB/s640/Boleto%2BBancario%2B-%2BPadrao%2BBanco%2Bdo%2BBrasil.png'
const pixImage = 'https://i.pinimg.com/originals/9e/a2/6b/9ea26b7ef2ae06994cfe34f609f307ca.jpg'

function createOrder(data: CheckoutInfo) {
  const { payment, shipping, user, total } = data

  switch (payment.payment) {
    case 'card': {
      return {
        status: 'approved',
        orderCode: Math.floor(Math.random() * 1000),
        total,
        shipping,
        user,
      }
    }
    case 'invoice': {
      return {
        invoice: invoiceImage,
        orderCode: Math.floor(Math.random() * 1000),
        total,
        shipping,
        user,
      }
    }
    case 'pix': {
      return {
        pix: pixImage,
        orderCode: Math.floor(Math.random() * 1000),
        total,
        shipping,
        user,
      }
    }
    default:
      return new HttpResponse('Invalid payment method', { status: 400 })
  }
}

export const productHandlers = [
  http.get(`${API_URL}/offers`, () => {
    return HttpResponse.json(data)
  }),

  http.get<ProductRequestParams>(`${API_URL}/offers/:offerCode`, async ({ params }) => {
    const { offerCode } = params
    const offerData = data.find(product => product.offerCode === Number(offerCode))!

    return HttpResponse.json(offerData)
  }),
]

export const checkoutHandlers = [
  http.post<ProductRequestParams, CheckoutRequestBody>(`${API_URL}/offers/:offerCode/create_order`, async ({ request }) => {
    const { order } = await request.json()
    const { payment } = order
    if (payment.cpf === '000.000.000-00') {
      return new HttpResponse(null, { status: 400, statusText: 'Invalid CPF' })
    }

    const response = createOrder(order)

    return HttpResponse.json(response, { status: 201 })
  }),
]
