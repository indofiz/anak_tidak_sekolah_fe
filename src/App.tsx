import React, { Suspense } from 'react'
import { Outlet } from 'react-router'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

import LayoutFormAnak from './features/dashboard/edit-anak/layout'
import CardForm from './features/dashboard/edit-anak/card'
import { ProtectedRoute } from './pages/protected-route'
import SpinnerLoader, { SuspenseLoaderSection } from './loader-suspense'

// LAZY LOAD
const Homepage = React.lazy(() => import('./pages/homepage'))
const DashboardPage = React.lazy(() => import('./pages/dashboard'))
const OtpPage = React.lazy(() => import('./pages/otp-page'))
const LoginPage = React.lazy(() => import('./pages/login'))
const Dashboard = React.lazy(() => import('./features/dashboard/beranda'))
const ProfilePage = React.lazy(() => import('./features/dashboard/profile'))
const ChildrenDetailPage = React.lazy(
    () => import('./features/dashboard/detail')
)
const PageEditProfile = React.lazy(
    () => import('./features/dashboard/profile/page-edit')
)

// 404
const NotFoundPage = React.lazy(() => import('./pages/404'))

//TABLE
const TableAnakFull = React.lazy(
    () => import('./features/dashboard/list-anak/show-anak')
)

//CONTAINER FORM
const ContainerDataAnak = React.lazy(
    () => import('./features/dashboard/edit-anak/container-form/form-anak')
)
const ContainerDataWali = React.lazy(
    () => import('./features/dashboard/edit-anak/container-form/form-wali')
)
const ContainerDataSekolah = React.lazy(
    () => import('./features/dashboard/edit-anak/container-form/form-sekolah')
)
const ContainerDataTidakLanjut = React.lazy(
    () =>
        import(
            './features/dashboard/edit-anak/container-form/form-tindak-lanjut'
        )
)

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
                        element: (
                            <SuspenseLoaderSection>
                                <TableAnakFull />
                            </SuspenseLoaderSection>
                        ),
                    },
                    {
                        path: 'profil',
                        element: <ProfilePage />,
                    },
                    {
                        path: 'profil/edit',
                        element: <PageEditProfile />,
                    },
                    {
                        path: 'anak/:nik',
                        element: <ChildrenDetailPage />,
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
            <Suspense fallback={<SpinnerLoader />}>
                <RouterProvider router={router} />
            </Suspense>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App
