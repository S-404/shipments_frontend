import './styles/App.css';
import {BrowserRouter as Router,} from "react-router-dom";
import AppRouter from "./router/AppRouter";
import NavbarVertical from "./components/UI/navbar/navbarVertical";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

function App() {
    const dispatch = useDispatch()
    const login = () => {
        dispatch({type: 'SET_USERID', value: localStorage.getItem('userid')})
        dispatch({type: 'SET_ADMIN_ACCESS', value: JSON.parse(localStorage.getItem('admin'))})
        dispatch({type: 'SET_USER_ACCESS', value: JSON.parse(localStorage.getItem('access'))})
        dispatch({type: 'SET_AUTH', value: true})
    }

    const isNotExpiredTimeStamp = (strObj) => {
        const obj = JSON.parse(strObj);
        return (+Date.now() - +obj?.timeStamp) < (1000 * 60 * 60 * 12);
    }

    useEffect(() => {
        if (
            isNotExpiredTimeStamp(localStorage.getItem('auth')) &&
            localStorage.getItem('userid') &&
            localStorage.getItem('admin')
        ) {
            login();
        }
    }, [])
    return (
        <Router>
            <NavbarVertical/>
            <AppRouter/>
        </Router>
    )
}

export default App;
