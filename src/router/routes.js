import Login from "../pages/LoginPage/Login";
import About from "../pages/AboutPage/About";
import Admin from "../pages/AdminPages/AdminPage/Admin";
import Picker from "../pages/PickerPage/Picker";
import Dispatcher from "../pages/DispatcherPage/Dispatcher";
import Driver from "../pages/DriverPage/Driver";
import AdminAccessPage from "../pages/AdminPages/AdminAccessPage/AdminAccessPage";
import AdminShippingAreaPage from "../pages/AdminPages/AdminShippingAreaPage/AdminShippingAreaPage";

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