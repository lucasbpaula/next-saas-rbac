import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { XCircle, XOctagon } from 'lucide-react'
import { ComponentProps } from 'react'
import { revokeInviteAction } from './actions'

interface RevokeInviteButtonProps extends ComponentProps<typeof Button> {
  inviteId: string
}

export async function RevokeInviteButton({
  inviteId,
  ...props
}: RevokeInviteButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" {...props}>
          <XOctagon className="mr-2 size-4" />
          Revoke invite
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently revoke this
            invite.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={revokeInviteAction.bind(null, inviteId)}>
            <AlertDialogAction
              asChild
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Button type="submit" variant="destructive">
                <XCircle className="mr-2 size-4" />
                Confirm
              </Button>
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
