import { ChartContent } from './chart'

const ChartHome = () => {
    return (
        <section className="container mx-auto py-8 mt-12">
            <div className="bg-gradient-to-br from-[#FFFDEF] to-[#FAD407] rounded-lg py-8 px-12 text-black">
                <div>
                    <h3 className="text-3xl font-semibold">Pesebaran Data</h3>
                    <p className="text-lg mt-1 text-slate-500">
                        Pesebaran Data Anak Tidak Sekolah Pada Kecamatan
                    </p>
                </div>
                <div className="mt-8 h-[400px]">
                    <ChartContent />
                </div>
            </div>
        </section>
    )
}

export default ChartHome
