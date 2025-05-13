import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router";
import LoginPage from "./pages/login";
import OtpPage from "./pages/otp-page";
import DashboardPage from "./pages/dashboard/page";
import { Outlet } from "react-router";
import Homepage from "./pages/homepage";
import LayoutFormAnak from "./features/dashboard/edit-anak/layout";
import CardForm from "./features/dashboard/edit-anak/card";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      errorElement: <div>Not Found</div>,

      children: [
        {
          path: "/",
          element: <Homepage />,
        }
        ,
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "otp",
          element: <OtpPage />,
        },
        {
          path: "dashboard",
          element: <DashboardPage />,
          children: [
            {
              path: "anak",
              element: <>Users</>,
            },
            {
              path: "anak/:id",
              element: <LayoutFormAnak />,
              children: [
                {
                  path: "data-anak",
                  element: <CardForm title="Data Anak" description="Isi semua yang terkait dengan data anak." content={<p>Isi semua yang terkait dengan data anak.</p>} />,
                },
                {
                    path: "data-wali",
                    element: <CardForm title="Data Wali" description="Isi semua yang terkait dengan data wali." content={<p>Isi semua yang terkait dengan data wali.</p>} />,
                  },
                  {
                    path: "data-sekolah",
                    element: <CardForm title="Data Sekolah" description="Isi semua yang terkait dengan data sekolah." content={<p>Isi semua yang terkait dengan data sekolah.</p>} />,
                  },
                  {
                    path: "data-tindak-lanjut",
                    element: <CardForm title="Data Tindak Lanjut" description="Isi semua yang terkait dengan data tindak lanjut." content={<p>Isi semua yang terkait dengan data tindak lanjut.</p>} />,
                  },
              ],
            },
          ]
        },
      ],
    },
  ]);

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App
