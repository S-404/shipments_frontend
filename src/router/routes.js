import Login from "../components/pages/Login";
import About from "../components/pages/About";
import Admin from "../components/pages/Admin";
import Picker from "../components/pages/Picker";
import Dispatcher from "../components/pages/Dispatcher";
import Driver from "../components/pages/Driver";
import NotFound from "../components/pages/NotFound";

export const privateRoutes = [
    {path: '/about', component: About},
    {path: '/admin', component: Admin},
    {path: '/picker', component: Picker},
    {path: '/dispatcher', component: Dispatcher},
    {path: '/driver', component: Driver},
    {path: '/login', component: Login},
    {path: '/login', component: NotFound},
]

export const publicRoutes = [
    {path: '/login', component: Login},
]