import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { FormCariAnak } from './form-add-search'

const TopCard = () => {
    return (
        <div className="col-span-12 md:col-span-8 bg-yellow-primary bg-[url('/bg-to-dashboard.png')] bg-top-right bg-no-repeat bg-size-[200px] px-6 py-4 md:px-14 md:py-8 rounded-lg text-black flex flex-col gap-2">
            <div className="text-2xl md:text-3xl font-semibold">
                “Kenali. Peduli. Laporkan.”
            </div>
            <div className="text-sm md:text-lg">
                Mari ambil peran kecil untuk masa depan besar anak-anak kita.
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <button className="w-full md:w-fit py-3 mt-4 bg-blue-primary font-semibold px-8 text-white rounded-md hover:bg-gray-800">
                        Tambahkan Data Anak
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah Anak</DialogTitle>
                        <DialogDescription>
                            Masukan Nama dan NIK anak, guna melihat apakah anak
                            sudah pernah didata.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="w-full">
                        <FormCariAnak />
                    </div>
                    <div></div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TopCard
