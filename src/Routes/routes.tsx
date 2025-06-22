import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Protected from "../utils/routeProtection";
import LoginPage from "@/pages/auth/login";
import VouchersPage from "@/pages/voucher/allVouchers";
import { CreateVoucherForm } from "@/pages/voucher/createNewVoucher";
import DashboardStats from "@/pages/dashboard/dashboard";
import IssuedVouchersPage from "@/pages/voucher/issuedVouchers";


export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />, 
  },
  {
    element: (
      <Protected>
        <Layout /> {/* Contains sidebar + header */}
      </Protected>
    ),
    children: [
      { path: '/', element: <DashboardStats /> },
       { path: '/vouchers', element: <VouchersPage /> },
      { path: '/vouchers/create', element: < CreateVoucherForm/> },
      { path: '/vouchers/edit/:id', element: < CreateVoucherForm/> },
      { path: '/issued', element: <IssuedVouchersPage /> },
    
    ],
  },
]);