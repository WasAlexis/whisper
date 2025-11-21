import { Routes, Route } from "react-router-dom";
import Chat from "../pages/Chat.jsx";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Chat />} />
        </Routes>
    );
}

export default Router;