import { Slash } from 'lucide-react'
import Image from 'next/image'

import liquidIcon from '@/assets/liquid-icon.svg'

import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'

export const Header = () => {
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={liquidIcon}
          className="size-6 dark:invert"
          alt="liquid"
        ></Image>

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <OrganizationSwitcher />
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </div>
  )
}