import { Routes, Route } from "react-router-dom";
import Chat from "../pages/Chat.jsx";

function Router() {
    return (
        <Routes>
            <Route path="/chat" element={<Chat />} />
        </Routes>
    );
}

export default Router;