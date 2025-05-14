import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginPage from './pages/login'
import OtpPage from './pages/otp-page'
import DashboardPage from './pages/dashboard'
import { Outlet } from 'react-router'
import Homepage from './pages/homepage'
import LayoutFormAnak from './features/dashboard/edit-anak/layout'
import CardForm from './features/dashboard/edit-anak/card'
import FormDataAnak from './features/dashboard/form/form-data-anak'
import FormDataWali from './features/dashboard/form/form-data-wali'
import FormDataSekolah from './features/dashboard/form/form-data-sekolah'
import FormDataTindakLanjut from './features/dashboard/form/form-data-tindak-lanjut'
import Dashboard from './features/dashboard/beranda'
import { TableAnakFull } from './features/dashboard/list-anak/table-anak-full'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Outlet />,
        errorElement: <div>Not Found</div>,

        children: [
            {
                path: '/',
                element: <Homepage />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'otp',
                element: <OtpPage />,
            },
            {
                path: 'dashboard',
                element: <DashboardPage />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    },
                    {
                        path: 'anak',
                        element: <TableAnakFull />,
                    },
                    {
                        path: 'anak/:id',
                        element: <LayoutFormAnak />,
                        children: [
                            {
                                path: 'data-anak',
                                element: (
                                    <CardForm
                                        title="Data Anak"
                                        description="Isi semua yang terkait dengan data anak."
                                        content={<FormDataAnak />}
                                    />
                                ),
                            },
                            {
                                path: 'data-wali',
                                element: (
                                    <CardForm
                                        title="Data Wali"
                                        description="Isi semua yang terkait dengan data wali."
                                        content={<FormDataWali />}
                                    />
                                ),
                            },
                            {
                                path: 'data-sekolah',
                                element: (
                                    <CardForm
                                        title="Data Sekolah"
                                        description="Isi semua yang terkait dengan data sekolah."
                                        content={<FormDataSekolah />}
                                    />
                                ),
                            },
                            {
                                path: 'data-tindak-lanjut',
                                element: (
                                    <CardForm
                                        title="Data Tindak Lanjut"
                                        description="Isi semua yang terkait dengan data tindak lanjut."
                                        content={<FormDataTindakLanjut />}
                                    />
                                ),
                            },
                        ],
                    },
                ],
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
