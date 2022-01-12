import './styles/App.css';
import {BrowserRouter as Router,} from "react-router-dom";
import AppRouter from "./router/AppRouter";
import NavbarVertical from "./components/UI/navbar/navbarVertical";

function App() {
    return (
        <Router>
            <NavbarVertical/>
            <AppRouter/>
        </Router>
    )
}

export default App;
