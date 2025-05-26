// LayoutFormAnak.tsx
import { Outlet } from 'react-router'
import SidebarForm from './sidebar'

const LayoutFormAnak = () => {
    return (
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 md:gap-6 lg:gap-8">
            <SidebarForm />
            <div className="md:col-span-1">
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutFormAnak
