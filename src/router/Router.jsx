import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import LandingPage from "../pages/LandingPage";
import Authlayout from "../layout/Authlayout";
import Signup from "../pages/Signup";
import Verify from "../pages/Verify";
import Login from "../pages/Login";

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
    }
])