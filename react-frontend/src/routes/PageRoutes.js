import { Route, Routes } from "react-router-dom";
import AdminLogin from "../components/admin/AdminLogin";
import Appbar from "../components/Appbar";
import HomePageAdmin from "../pages/admin/HomePageAdmin";
import HomePage from "../pages/HomePage";
import WelcomePage from "../pages/WelcomePage";


export default function PageRoutes() {
    return (
      <>
        <Appbar />
        <Routes>
          <Route path="" element={<WelcomePage />} />
          <Route path="/Home" element={<HomePage />} />

          <Route path="Admin">
            <Route index element={<AdminLogin />} />
            <Route path="Home" element={<HomePageAdmin />} />

          </Route>
        </Routes>
      </>
    )
  }