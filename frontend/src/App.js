import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const MainPage = lazy(() => import("./pages/MainPage"));

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path={("/@:username", "/")} element={<MainPage />}></Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
};

export default App;
