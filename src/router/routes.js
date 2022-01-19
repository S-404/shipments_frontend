import Login from "../pages/Login";
import About from "../pages/About";
import Admin from "../pages/Admin";
import Picker from "../pages/Picker";
import Dispatcher from "../pages/Dispatcher";
import Driver from "../pages/Driver";
import NotFound from "../pages/NotFound";

export const privateRoutes = [
    {path: '/about', component: About},
    {path: '/admin', component: Admin},
    {path: '/picker', component: Picker},
    {path: '/dispatcher', component: Dispatcher},
    {path: '/driver', component: Driver},

]

export const publicRoutes = [
    {path: '/login', component: Login},
]