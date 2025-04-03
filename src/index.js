import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import ErrorBoundery from "./errorBoundery.js";
import Header from "./pages/header/component/header.js";
import App from "./app.js";
import ModeContext from "./component/mode.js";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));

const Index = () => {

    const [mode, setMode] = useState('light');

    return (
        <React.Fragment>
            <BrowserRouter>
                <ErrorBoundery errorText='error'>
                    <ModeContext.Provider value={{ mode, setMode }}>
                        <Header />
                    </ModeContext.Provider>
                </ErrorBoundery>
            </BrowserRouter>
            <ErrorBoundery errorText='error App "Exemple"'>
                <App />
            </ErrorBoundery>
        </React.Fragment>
    )

}


root.render(<Index />);
