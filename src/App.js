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
        dispatch({type: 'SET_AUTH', value: true})
    }

    useEffect(() => {
        if (localStorage.getItem('auth') && localStorage.getItem('userid')) {
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
