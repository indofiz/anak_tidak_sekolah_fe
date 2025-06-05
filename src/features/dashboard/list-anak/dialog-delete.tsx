import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useDeleteDialogStore } from '@/store/dialog-delete'

const DialogDelete = () => {
    const { isOpen, title, message, onConfirm, closeDialog } =
        useDeleteDialogStore()

    const handleConfirm = async () => {
        if (onConfirm) {
            await onConfirm() // Execute the dynamic delete function
        }
        closeDialog()
    }
    return (
        <AlertDialog open={isOpen} onOpenChange={closeDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {title || 'Apakah anda yakin ingin menghapus?'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {message ||
                            'Setelah dihapus, data tidak bisa dikembalikan, harus di tambah ulang.'}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={closeDialog}>
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            variant={'destructive'}
                            className="bg-red-500 text-white"
                            onClick={handleConfirm}
                        >
                            Ya, Hapus
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DialogDelete
