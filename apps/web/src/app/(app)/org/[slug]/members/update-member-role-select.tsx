'use client'

import { Role } from '@sass/auth'
import { ComponentProps } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { updateMemberAction } from './actions'

interface UpdateMemberRoleSelect extends ComponentProps<typeof Select> {
  memberId: string
}

export function UpdateMemberRoleSelect({
  memberId,
  ...props
}: UpdateMemberRoleSelect) {
  async function updateMemberRole(role: Role) {
    await updateMemberAction(memberId, role)
  }

  return (
    <Select onValueChange={updateMemberRole} {...props}>
      <SelectTrigger className="h-8 w-32">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="ADMIN">Admin</SelectItem>
        <SelectItem value="MEMBER">Member</SelectItem>
        <SelectItem value="BILLING">Billing</SelectItem>
      </SelectContent>
    </Select>
  )
}
