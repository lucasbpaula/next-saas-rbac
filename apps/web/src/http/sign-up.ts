import { api } from './api-client'

interface ISignUpRequest {
  name: string
  email: string
  password: string
}

export async function signUp({ name, email, password }: ISignUpRequest) {
  const result = await api
    .post('users', {
      json: {
        name,
        email,
        password,
      },
    })
    .json()

  return result
}
