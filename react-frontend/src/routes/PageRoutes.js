import { Route, Routes } from "react-router-dom";
import Appbar from "../components/Appbar";
import HomePage from "../pages/HomePage";
import WelcomePage from "../pages/WelcomePage";


export default function PageRoutes() {
    return (
      <>
        <Appbar />
        <Routes>
          <Route path="" element={<WelcomePage />} />
          <Route path="/Home" element={<HomePage />} />
        </Routes>
      </>
    )
  }