import { User, MapPin, Phone, Mail } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const ProfileDetailCard = () => {
    // Sample data based on your API response
    const profileData = {
        status: 200,
        message: 'Data Operator ditemukan',
        data: {
            nama_lengkap: 'Juliansyah',
            jenis_kelamin: 'PRIA',
            alamat: 'Jalan Adyaksa No. 90',
            kelurahan: 5,
            mobile: '083175087363',
            email: 'indofiz@gmail.com',
        },
    }

    const { data } = profileData

    return (
        <div className="max-w-md mx-auto">
            <Card className="overflow-hidden pt-0">
                {/* Header Section */}
                <CardHeader className="bg-yellow-primary text-white text-center pb-8 pt-6">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <User className="w-10 h-10 text-blue-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-black font-bold">
                        {data.nama_lengkap}
                    </CardTitle>
                    <p className="text-black capitalize">
                        {data.jenis_kelamin.toLowerCase()}
                    </p>
                </CardHeader>

                <CardContent className="p-6">
                    {/* Profile Details */}
                    <div className="space-y-4 mb-6">
                        {/* Address */}
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">
                                    Alamat
                                </p>
                                <p className="text-sm text-gray-600 break-words">
                                    {data.alamat}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Kelurahan: {data.kelurahan}
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Phone className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">
                                    No. Telepon
                                </p>
                                <p className="text-sm text-gray-600">
                                    {data.mobile}
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Mail className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">
                                    Email
                                </p>
                                <p className="text-sm text-gray-600 break-all">
                                    {data.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-center">
                        <Button className="w-full">Edit Profile</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileDetailCard
