import { ability, getCurrentOrg } from '@/auth/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getInvites } from '@/http/get-invites'
import { RevokeInviteButton } from './revoke-invite-button'
import { CreateInviteForm } from './create-invite-form'

export async function Invites() {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()

  const { invites } = await getInvites(currentOrg!)

  return (
    <div>
      {permissions?.can('create', 'Invite') && (
        <Card>
          <CardHeader>
            <CardTitle>Invite member</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateInviteForm />
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Invites</h2>

        <div className="rounded border">
          <Table>
            <TableBody>
              {invites.map((invite) => (
                <TableRow key={invite.id}>
                  <TableCell className="py-2.5" style={{ width: 48 }}>
                    <span className="text-muted-foreground">
                      {invite.email}
                    </span>
                  </TableCell>

                  <TableCell className="py-2.5 font-medium">
                    {invite.role}
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex justify-end">
                      {permissions?.can('delete', 'Invite') && (
                        <RevokeInviteButton inviteId={invite.id} />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {invites.length === 0 && (
                <TableRow>
                  <TableCell className="text-center text-muted-foreground">
                    No invites founded.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}