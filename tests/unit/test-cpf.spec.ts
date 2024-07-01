import flushPromises from 'flush-promises'
import waitForExpect from 'wait-for-expect'
import { API_URL, initMockServer } from '../mock-server'

initMockServer()

// Test requests are made directly through the useFetch composable instead of using the pinia store

it('returns status 400 when CPF is invalid', async () => {
  const body = {
    order: {
      payment: {
        cpf: '000.000.000-00',
      },
    },
  }

  const { statusCode, response } = await useFetch(`${API_URL}/offers/1/create_order`).post(body)
  await flushPromises()
  await waitForExpect(() => {
    expect(statusCode.value).equal(400)
    expect(response.value?.statusText).equal('Invalid CPF')
  })
})

it('returns status 201 when CPF is valid', async () => {
  const body = {
    order: {
      payment: {
        cpf: '666.666.666-66',
      },
    },
  }

  const { statusCode, response } = await useFetch(`${API_URL}/offers/1/create_order`).post(body)
  await flushPromises()
  await waitForExpect(() => {
    expect(statusCode.value).equal(201)
    expect(response.value?.statusText).equal('Created')
  })
})
