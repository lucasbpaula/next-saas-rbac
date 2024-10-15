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
import { XCircle } from 'lucide-react'
import { ComponentProps } from 'react'
import { removeMemberAction } from './actions'

interface RemoveMemberButtonProps extends ComponentProps<typeof Button> {
  memberId: string
}

export function RemoveMemberButton({
  memberId,
  ...props
}: RemoveMemberButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" {...props}>
          <XCircle className="mr-2 size-4" />
          Remove
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove this
            member of the organization.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={removeMemberAction.bind(null, memberId)}>
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
