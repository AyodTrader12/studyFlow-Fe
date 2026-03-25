import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";

import Authlayout from "../layout/Authlayout";
import Signup from "../pages/auth/Signup";
import Verify from "../pages/auth/Verify";
import Login from "../pages/auth/Login";
import Dashboardlayout from "../layout/Dashboardlayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Forgotpassword from "../pages/auth/Forgotpassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Home from "../pages/Home"
import AboutUs from "../pages/AboutUs";
import Features from "../pages/Features";
import Contact from "../pages/Contact";

export const router = createBrowserRouter([
    { 
        path: "/",
        element:<Mainlayout/>,
        children:[
            {index:true, element:<Home/>},
            {path:"about",element:<AboutUs/>  },
            {path:"features",element:<Features/>},
            {path:"contact",element:<Contact/>}
        ]
    },
    {
        path:"/auth",
        element:<Authlayout/>,
        children:[
            {index:true, path:"/auth",element:<Signup/>},
            {path:"/auth/verify", element:<Verify/>},
            {path:"/auth/login", element:<Login/>},
            {path:"/auth/forgot-password",element:<Forgotpassword/> },
            {path:"/auth/reset-password",element:<ResetPassword/>}
        ]
    },
    {
        path:"/dashboard",
        element:<Dashboardlayout/>,
        children:[
            {index:true,element:<Dashboard/>}
        ]
    }
])