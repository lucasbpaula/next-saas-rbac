'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createProject } from '@/http/create-project'
import { useParams } from 'next/navigation'
import { getCurrentOrg } from '@/auth/auth'

const projectSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Please, include at least 4 characters.' }),
  description: z
    .string()
    .min(4, { message: 'Please, include at least 4 characters.' }),
})

export async function createProjectAction(formData: FormData) {
  const org = getCurrentOrg()
  const result = projectSchema.safeParse(Object.fromEntries(formData))

  if (!org) {
    return {
      success: false,
      message: `Unexpected error, there's no organization selected.`,
      errors: null,
    }
  }

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, description } = result.data

  try {
    await createProject({
      name,
      description,
      org,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the project!',
    errors: null,
  }
}
