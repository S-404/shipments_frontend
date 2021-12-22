import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./routes";
import Login from "../pages/Login";
import About from "../pages/About";
import {useSelector} from "react-redux";

const AppRouter = () => {
    const isAuth = useSelector(state => state.auth.isAuth)
    console.log(isAuth)
    return (
        <div>
            {isAuth?
            <Routes>
                {privateRoutes.map((route) =>
                    <Route
                        key={Date.now() + route.path}
                        path={route.path}
                        element={<route.component/>}
                    />
                )}
                <Route path="*" element={<About/>}/>
            </Routes>

            :
                <Routes>
                    {publicRoutes.map((route) =>
                        <Route
                            key={Date.now() + route.path}
                            path={route.path}
                            element={<route.component/>}
                        />
                    )}
                    <Route path="*" element={<Login/>}/>
                </Routes>
            }
        </div>
    );
};

export default AppRouter;