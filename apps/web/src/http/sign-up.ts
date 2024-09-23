import { api } from './api-client'

interface ISignUpRequest {
  name: string
  email: string
  password: string
}

type SignUpResponse = void

export async function signUp({
  name,
  email,
  password,
}: ISignUpRequest): Promise<SignUpResponse> {
  await api
    .post('users', {
      json: {
        name,
        email,
        password,
      },
    })
    .json()
}
