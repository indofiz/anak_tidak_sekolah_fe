import { Outlet } from 'react-router'
import SidebarForm from './sidebar'

const LayoutFormAnak = () => {
    return (
        <div className="col-span-12 flex gap-4">
            {/* sidebar list flex column  */}
            <SidebarForm />

            <Outlet />
        </div>
    )
}

export default LayoutFormAnak
