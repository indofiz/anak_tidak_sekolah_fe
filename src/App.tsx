import { createBrowserRouter, RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

import LoginPage from './pages/login'
import OtpPage from './pages/otp-page'
import DashboardPage from './pages/dashboard'
import { Outlet } from 'react-router'
import Homepage from './pages/homepage'
import LayoutFormAnak from './features/dashboard/edit-anak/layout'
import CardForm from './features/dashboard/edit-anak/card'
import Dashboard from './features/dashboard/beranda'
import { TableAnakFull } from './features/dashboard/list-anak/table-anak-full'
import { ProtectedRoute } from './pages/protected-route'
import ContainerDataAnak from './features/dashboard/edit-anak/container-form/form-anak'
import ContainerDataWali from './features/dashboard/edit-anak/container-form/form-wali'
import ContainerDataSekolah from './features/dashboard/edit-anak/container-form/form-sekolah'
import ContainerDataTidakLanjut from './features/dashboard/edit-anak/container-form/form-tindak-lanjut'
import NotFoundPage from './pages/404'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Outlet />,
        errorElement: <NotFoundPage />,

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
                element: (
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                ),
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
                                        content={<ContainerDataAnak />}
                                    />
                                ),
                            },
                            {
                                path: 'data-wali',
                                element: (
                                    <CardForm
                                        title="Data Wali"
                                        description="Isi semua yang terkait dengan data wali."
                                        content={<ContainerDataWali />}
                                    />
                                ),
                            },
                            {
                                path: 'data-sekolah',
                                element: (
                                    <CardForm
                                        title="Data Sekolah"
                                        description="Isi semua yang terkait dengan data sekolah."
                                        content={<ContainerDataSekolah />}
                                    />
                                ),
                            },
                            {
                                path: 'data-tindak-lanjut',
                                element: (
                                    <CardForm
                                        title="Data Tindak Lanjut"
                                        description="Isi semua yang terkait dengan data tindak lanjut."
                                        content={<ContainerDataTidakLanjut />}
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

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster richColors position="top-center" />
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App
