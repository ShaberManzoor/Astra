import React from 'react'
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
} from "@/components/ui/alert-dialog"
import Link from 'next/link'

const AlertBox = () => {
  return (
    <AlertDialog>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>No Access!</AlertDialogTitle>
            <AlertDialogDescription>
                The chat didn't appear to belong to you, so you can't access.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogAction>
                <Link href={'/'}>Go to Home</Link>
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

  )
}

export default AlertBox