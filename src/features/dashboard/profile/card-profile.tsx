import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Phone, Mail, Edit3, UserCircle2, Home, Building2 } from 'lucide-react'
import { useProfileDetail } from '@/api/profile'
import { useAuthStore } from '@/store/login-store'
import Loading from '@/components/other/loading'
import { Link } from 'react-router'

export default function ProfileDetailCard() {
    const { user } = useAuthStore()
    const {
        data: userProfile,
        isLoading,
        isRefetching,
    } = useProfileDetail({
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
        <div className="w-full max-w-md mx-auto md:p-4">
            <Card className="duration-300 shadow-none">
                <CardHeader className="pb-4">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-16 h-16 bg-blue-primary rounded-full flex items-center justify-center">
                            <UserCircle2 className="w-9 h-9 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {userProfile?.data.nama_lengkap}
                            </h2>
                            <Badge variant="secondary" className="mt-2">
                                {userProfile?.data.jenis_kelamin}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                            <div className="w-5 h-5 mt-0.5 text-gray-500">
                                <Home className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-700">
                                    Alamat
                                </p>
                                <p className="text-sm text-gray-600">
                                    {userProfile?.data.alamat}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <div className="w-5 h-5 mt-0.5 text-gray-500">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-700">
                                    Kelurahan
                                </p>
                                <p className="text-sm text-gray-600">
                                    {userProfile?.data.kelurahan}
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 text-gray-500">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-700">
                                    Mobile
                                </p>
                                <p className="text-sm text-gray-600">
                                    {userProfile?.data.mobile}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 text-gray-500">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-700">
                                    Email
                                </p>
                                <p className="text-sm text-gray-600 break-all">
                                    {userProfile?.data.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button
                            className="w-full bg-blue-primary hover:bg-blue-600 text-white"
                            asChild
                        >
                            <Link to="/dashboard/profil/edit">
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit Profile
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
