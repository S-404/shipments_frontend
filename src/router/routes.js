import Login from "../components/pages/Login";
import About from "../components/pages/About";
import Admin from "../components/pages/Admin";
import Picker from "../components/pages/Picker";
import Dispatcher from "../components/pages/Dispatcher";
import Driver from "../components/pages/Driver";
import AdminAccessPage from "../components/pages/AdminAccessPage";
import AdminShippingAreaPage from "../components/pages/AdminShippingAreaPage";

export const privateRoutes = [
    {path: '/about', component: About},
    {path: '/admin', component: Admin},
    {path: '/admin/access', component: AdminAccessPage},
    {path: '/admin/shipping-area', component: AdminShippingAreaPage},
    {path: '/picker', component: Picker},
    {path: '/dispatcher', component: Dispatcher},
    {path: '/driver', component: Driver},
]

export const publicRoutes = [
    {path: '/login', component: Login},
]