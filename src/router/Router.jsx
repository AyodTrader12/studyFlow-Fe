import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import LandingPage from "../pages/LandingPage";
import Authlayout from "../layout/Authlayout";
import Signup from "../pages/auth/Signup";
import Verify from "../pages/auth/Verify";
import Login from "../pages/auth/Login";
import Dashboardlayout from "../layout/Dashboardlayout";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
    { 
        path: "/",
        element:<Mainlayout/>,
        children:[
            {index:true, path:"/", element:<LandingPage/>}
        ]
    },
    {
        path:"/auth",
        element:<Authlayout/>,
        children:[
            {index:true, path:"/auth",element:<Signup/>},
            {path:"/auth/verify", element:<Verify/>},
            {path:"/auth/login", element:<Login/>}
        ]
    },
    {
        path:"/dashboard",
        element:<Dashboardlayout/>,
        children:[
            {index:true,path:"/dashboard",element:<Dashboard/>}
        ]
    }
])