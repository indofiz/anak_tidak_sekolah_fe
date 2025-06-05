import { Anak, useDeleteAnak } from '@/api/list-anak'
import CardAnak from './card-anak'
import { toast } from 'sonner'
import { useDeleteDialogStore } from '@/store/dialog-delete'

const CardContainer = ({ dataAnak }: { dataAnak: Anak[] }) => {
    const deleteMutation = useDeleteAnak()
    const { openDialog } = useDeleteDialogStore()

    const handleDelete = async (nik: string) => {
        deleteMutation.mutate(nik, {
            onSuccess: () => {
                toast.success('Anak berhasil dihapus')
                // Optionally show a success message or perform other actions
            },
            onError: (error) => {
                toast.error('Gagal menghapus anak: ' + error.message)
                console.error('Error deleting anak:', error)
            },
        })
    }
    const openDeleteDialog = (nik: string) => {
        openDialog(
            () => handleDelete(nik),
            'Yakin ingin menghapus data anak?',
            'data yang dihapus tidak bisa dikembalikan, harus ditambahkan ulang.'
        )
    }

    return (
        <div className="grid grid-cols-12 gap-2">
            {dataAnak.map((anak) => (
                <CardAnak
                    key={anak.nik}
                    anak={anak}
                    onDelete={openDeleteDialog}
                />
            ))}
        </div>
    )
}

export default CardContainer
