import { Box } from "@mui/material";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Chat from "./components/chat/Chat";
import Header from "./components/chat/Header";
import userListing from "./components/chat/UserListing";

function App() {
  return (
    <Box className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
          <Route path="/chat" Component={userListing} />

          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
