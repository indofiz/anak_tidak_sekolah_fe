import { useMediaQuery } from 'react-responsive'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { useAnakList } from '@/api/list-anak'
import { useAuthStore } from '@/store/login-store'
import TableAnakList from './table-anak-list'
import CardContainer from './card-container'

export function TableAnakFull() {
    const { user } = useAuthStore()
    const { data: dataAnak, isLoading } = useAnakList({
        token: user?.token,
    })
    const isDesktop = useMediaQuery({
        query: '(min-width: 768px)',
    })

    if (isLoading) {
        return <div className="text-center">Loading...</div>
    }

    return (
        <Card className="col-span-12 shadow-none border-0 py-0 md:py-4 gap-2 md:gap-4">
            <CardHeader className="p-2 md:p-4">
                <CardTitle>List Anak Tidak Sekolah</CardTitle>
                <CardDescription>
                    Semua data anak yang baru ditambahkan oleh PSM
                </CardDescription>
            </CardHeader>
            <CardContent className="p-2 md:p-4">
                <div className="flex w-full justify-between mb-4">
                    <div className="w-full flex items-center space-x-2">
                        <div className="flex w-full max-w-lg items-center space-x-2">
                            <Input
                                type="email"
                                placeholder="Cari nama anak atau nik"
                            />
                            <Button type="submit" variant={'outline'}>
                                Cari
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Button>Export</Button>
                    </div>
                </div>
                {isDesktop ? (
                    <TableAnakList
                        dataAnak={dataAnak?.data?.data?.data ?? []}
                    />
                ) : (
                    <CardContainer
                        dataAnak={dataAnak?.data?.data?.data ?? []}
                    />
                )}
            </CardContent>
        </Card>
    )
}
