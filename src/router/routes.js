import Login from "../pages/LoginPage/Login";
import About from "../pages/AboutPage/About";
import Admin from "../pages/AdminPages/AdminPage/Admin";
import Picker from "../pages/PickerPage/Picker";
import Dispatcher from "../pages/DispatcherPage/Dispatcher";
import Driver from "../pages/DriverPage/Driver";
import AdminAccessPage from "../pages/AdminPages/AdminAccessPage/AdminAccessPage";
import AdminShippingAreaPage from "../pages/AdminPages/AdminShippingAreaPage/AdminShippingAreaPage";
import FindByOrder from "../pages/PickerPage/FindByOrder";
import FindByPickID from "../pages/PickerPage/FindByPickID";

export const privateRoutes = [
    {path: '/about', component: About},
    {path: '/admin', component: Admin},
    {path: '/admin/access', component: AdminAccessPage},
    {path: '/admin/shipping-area', component: AdminShippingAreaPage},
    {path: '/picker', component: Picker},
    {path: '/picker/order-num', component: FindByOrder},
    {path: '/picker/pick-id', component: FindByPickID},
    {path: '/dispatcher', component: Dispatcher},
    {path: '/driver', component: Driver},
]

export const publicRoutes = [
    {path: '/login', component: Login},
]