import { Element } from 'react-scroll'
import { ChartContent } from './chart'

const ChartHome = () => {
    return (
        <Element
            name="sebaran"
            id="sebaran"
            className="container mx-auto py-8 mt-12"
        >
            <div className="bg-gradient-to-br from-[#FFFDEF] to-[#FAD407] rounded-lg lg:rounded-3xl lg:border lg:border-yellow-primary py-8 px-4 md:px-12 text-black">
                <div>
                    <h3 className="text-2xl md:text-3xl font-semibold">
                        Pesebaran Data
                    </h3>
                    <p className="text-lg mt-1 text-slate-500">
                        Pesebaran Data Anak Tidak Sekolah Pada Kecamatan
                    </p>
                </div>
                <div className="mt-8 h-[400px]">
                    <ChartContent />
                </div>
            </div>
        </Element>
    )
}

export default ChartHome
