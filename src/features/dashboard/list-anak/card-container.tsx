import { Anak, useDeleteAnak } from '@/api/list-anak'
import CardAnak from './card-anak'
import { toast } from 'sonner'
import { useDeleteDialogStore } from '@/store/dialog-delete'
import NoData from '@/components/other/no-data'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { FormCariAnak } from '../beranda/form-add-search'
import { useQueryClient } from '@tanstack/react-query'

const CardContainer = ({ dataAnak }: { dataAnak: Anak[] }) => {
    const deleteMutation = useDeleteAnak()
    const { openDialog } = useDeleteDialogStore()

    const queryClient = useQueryClient()

    const handleDelete = async (nik: string) => {
        deleteMutation.mutate(nik, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['list-anak'] })
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

    if (dataAnak.length === 0) {
        return (
            <NoData
                title="Belum ada data anak"
                description="Tambahkan data anak terlebih dahulu"
                button={
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={'default'}>
                                <PlusCircle className="size-4" />
                                Tambah Anak
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tambah Anak</DialogTitle>
                                <DialogDescription>
                                    Masukan Nama dan NIK anak, guna melihat
                                    apakah anak sudah pernah didata.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="w-full">
                                <FormCariAnak />
                            </div>
                            <div></div>
                        </DialogContent>
                    </Dialog>
                }
            />
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
