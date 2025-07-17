import { useMediaQuery } from 'react-responsive'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import { useAnakList } from '@/api/list-anak'
import { useAuthStore } from '@/store/login-store'
import TableAnakList from './table-anak-list'
import CardContainer from './card-container'
import { FileDown, Filter, UserPlus2 } from 'lucide-react'
import PaginationAnak from './pagination'
import useFilterAnak from '@/store/filter-anak-store'
import SearchForm from './search-form'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { FormCariAnak } from '../beranda/form-add-search'
import FilterExport from './filter-export'
import Loading from '@/components/other/loading'
import TabArsip from './tab-arsip'

export default function TableAnakFull() {
    const { user } = useAuthStore()
    const { page, per_page, is_all, is_old, parameter } = useFilterAnak()
    const {
        data: dataAnak,
        isLoading,
        isFetching,
    } = useAnakList({
        token: user?.token || '',
        filter: {
            parameter: parameter || '',
            is_old: is_old || 0,
            is_all: is_all || 0,
            per_page: per_page || 10,
            page: page || 1,
        },
    })

    const isDesktop = useMediaQuery({
        query: '(min-width: 768px)',
    })

    return (
        <Card className="col-span-12 shadow-none border-0 py-0 md:py-1 gap-2 md:gap-4">
            <CardHeader className="p-2 md:p-4 md:pb-0">
                <CardTitle>List Anak Tidak Sekolah</CardTitle>
                <CardDescription>
                    Semua data anak yang baru ditambahkan oleh PSM
                </CardDescription>
            </CardHeader>
            <CardContent className="p-2 md:p-4 md:pt-0">
                <div className="mb-4">
                    <TabArsip />
                </div>
                <div className="flex flex-col md:flex-row w-full gap-2 justify-between mb-4">
                    <SearchForm />
                    <div className="flex gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant={'outline'}>
                                    <FileDown className="size-4" />
                                    Export
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <Filter className="w-6 h-6 text-blue-600" />
                                        Export Excel Anak
                                    </DialogTitle>
                                    <DialogDescription className="text-left">
                                        Centang 18 jika ingin menampilkan hanya
                                        anak yang berumur diatas 18+
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="w-full">
                                    <FilterExport />
                                </div>
                                <div></div>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant={'outline'}>
                                    <UserPlus2 className="size-4" />
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
                    </div>
                </div>
                {isLoading || isFetching ? (
                    <div className="w-full text-center p-8 md:py-24">
                        <Loading
                            text="Memuat Data ..."
                            size="sm"
                            color="gray"
                        />
                    </div>
                ) : (
                    <>
                        {isDesktop ? (
                            <TableAnakList
                                dataAnak={dataAnak?.data?.data?.data ?? []}
                            />
                        ) : (
                            <CardContainer
                                dataAnak={dataAnak?.data?.data?.data ?? []}
                            />
                        )}
                        <div className="mt-6 flex w-full">
                            <PaginationAnak
                                totalAnak={
                                    dataAnak?.data?.pagination?.total ?? 0
                                }
                            />
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
}
