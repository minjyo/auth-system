import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const MainPage = lazy(() => import("./pages/MainPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path={("/@:username", "/")} element={<MainPage />}></Route>
                        <Route path={"/auth"} element={<AuthPage />}></Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
};

export default App;
