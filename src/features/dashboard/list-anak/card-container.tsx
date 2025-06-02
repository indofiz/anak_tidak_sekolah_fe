import { Anak } from '@/api/list-anak'
import CardAnak from './card-anak'

const CardContainer = ({ dataAnak }: { dataAnak: Anak[] }) => {
    return (
        <div className="grid grid-cols-12 gap-2">
            {dataAnak.map((anak) => (
                <CardAnak key={anak.nik} anak={anak} />
            ))}
        </div>
    )
}

export default CardContainer
