import React, { useContext, useState, useEffect } from "react";
import ModeContext from "../../../component/mode.js";
import Main from "../../main/components/main.js";
import Contact from "../../contact/components/contact.js";
import About from "../../about/components/about.js";
import ErrorBoundery from "../../../errorBoundery.js";
import { Routes, Route, Link } from "react-router-dom";
import '../style-header.scss'

const Header = () => {


    const { mode, setMode } = useContext(ModeContext);
    //const [btnClass, setBtnClass] = useState('');



    const modeToggle = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        // setBtnClass(newMode);

    }

    useEffect(() => {
        document.body.className = mode;
    }, [mode]);





    return (
        <>
            <h1>SPA — {mode} mode</h1>
            <button onClick={modeToggle}>
                Switch to {mode === 'light' ? 'dark' : 'light'}
            </button>
            <nav className="nav__header">
                <Link to='/main'>Main page</Link>
                <Link to='/about'>About</Link>
                <Link to='/contact'>Contacts</Link>
            </nav>
            <ErrorBoundery errorText="Routing error">
                <Routes>
                    <Route path="/main" element={<Main />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </ErrorBoundery>
        </>
    )
}

export default Header;