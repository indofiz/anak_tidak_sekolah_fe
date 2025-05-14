import Angka from './angka'
import { ChartJenjang } from './chart-jenjang'
import { ChartUsia } from './chart-usia'
import { TableAnak } from './table-anak'
import TopCard from './top-card'

const Dashboard = () => {
    return (
        <div className="col-span-12">
            <div className="grid grid-cols-12 justify-center gap-4">
                <TopCard />
                <Angka />
            </div>
            {/* FILTER */}
            <div className="grid grid-cols-12 gap-4 mt-12">
                <div className="col-span-8">
                    <TableAnak />
                </div>
                <div className="col-span-4 flex flex-col gap-4">
                    <ChartUsia />
                    <ChartJenjang />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
