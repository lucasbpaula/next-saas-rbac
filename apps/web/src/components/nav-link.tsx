'use client'

import Link from 'next/link'
import { ComponentProps } from 'react'
import { usePathname } from 'next/navigation'

interface NavLinkProps extends ComponentProps<typeof Link> {}

export function NavLink(props: NavLinkProps) {
  const pathname = usePathname()

  const isCurrent = props.href.toString() === pathname

  return <Link data-current={isCurrent} {...props} />
}
