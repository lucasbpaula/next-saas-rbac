import { ability } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { OrganizationForm } from '../../organization-form'
import { ShutdownOrganizationButton } from './shutdown-organization-button'

export default async function Settings() {
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-4">
        {canUpdateOrganization ? (
          <Card>
            <CardHeader>
              <CardTitle>Organization settings</CardTitle>
              <CardDescription>
                Update your organization details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrganizationForm />
            </CardContent>
          </Card>
        ) : null}

        {canGetBilling ? <div>Billing</div> : null}

        {canShutdownOrganization ? (
          <Card>
            <CardHeader>
              <CardTitle>Shutdown Organization</CardTitle>
              <CardDescription>
                This will delete all organization data including all projects.
                Your cannot undo this action.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShutdownOrganizationButton />
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  )
}
