import { useProfileDetail } from '@/api/profile'
import UserFormCard from './form-edit'
import { useAuthStore } from '@/store/login-store'
import Loading from '@/components/other/loading'

const PageEditProfile = () => {
    const { user } = useAuthStore()
    const { data, isLoading, isRefetching } = useProfileDetail({
        token: user?.token || '',
    })

    if (isLoading || isRefetching) {
        return (
            <div className="max-w-md text-center p-8">
                <Loading text="Memuat Data ..." size="sm" color="gray" />
            </div>
        )
    }
    return (
        <div className="col-span-12">
            <UserFormCard
                initialData={{
                    alamat: data?.data.alamat || '',
                    email: data?.data.email || '',
                    jenis_kelamin: data?.data.jenis_kelamin || 'Laki-Laki',
                    mobile: data?.data.mobile || '',
                    nama_lengkap: data?.data.nama_lengkap || '',
                }}
            />
        </div>
    )
}

export default PageEditProfile
