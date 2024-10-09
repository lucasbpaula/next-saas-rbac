import { ability, getCurrentOrg } from '@/auth/auth'
import { Button } from './ui/button'
import { NavLink } from './nav-link'
import { permissions } from '../../../../packages/auth/src/permissions'
import { permission } from 'process'

export async function Tabs() {
  const currentOrg = await getCurrentOrg()
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  
  const canGetMembers = permissions?.can('get', 'User')
  const canGetProjects = permissions?.can('get', 'Project')

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        {canGetProjects ? (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
          >
            <NavLink href={`/org/${currentOrg}`}>Projects</NavLink>
          </Button>
        ) : null}

        {canGetMembers ? (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
          >
            <NavLink href={`/org/${currentOrg}/members`}>Members</NavLink>
          </Button>
        ) : null}

        {canUpdateOrganization || canGetBilling ? (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
          >
            <NavLink href={`/org/${currentOrg}/settings`}>
              Settings & Billing
            </NavLink>
          </Button>
        ) : null}
      </nav>
    </div>
  )
}