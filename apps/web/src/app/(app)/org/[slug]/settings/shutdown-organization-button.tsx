import { Button } from '@/components/ui/button'
import { XCircle } from 'lucide-react'
import { getCurrentOrg } from '../../../../../auth/auth'
import { shutdownOrganization } from '@/http/shutdown-organization'
import { redirect } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog'

export function ShutdownOrganizationButton() {
  async function shutdownOrganizationAction() {
    'use server'

    const currentOrg = await getCurrentOrg()

    await shutdownOrganization({ org: currentOrg! })

    redirect('/')
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-48">
            <XCircle className="mr-2 size-4" />
            Shutdown organization
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete
              organization data and all projects.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form action={shutdownOrganizationAction}>
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
    </>
  )
}
