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
import Subjects from "../pages/dashboard/Subjects";
import Bookmark from "../pages/dashboard/Bookmark";
import Settings from "../pages/Settings";
import PastQuestions from "../pages/dashboard/PastQuestions";
import AdminPanel from "../pages/Admin/AdminPanel";
import ResourceViewer from "../pages/dashboard/ResourceView";
import DashboardProgress from "../pages/dashboard/Progress";
import ResourcesPage from "../pages/dashboard/ResourcePage";
import PastQuestionsBrowser from "../pages/dashboard/PastQuestionBrowser";
import PastQuestionViewer from "../pages/dashboard/PastQuestionViewer";
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
            {index:true,element:<Dashboard/>},
            {path:"/dashboard/subjects",element:<Subjects/>},
            {path:"/dashboard/bookmarks",element:<Bookmark/>},
            {path:"/dashboard/settings",element:<Settings/>},
            {path:"/dashboard/past-questions",element:<PastQuestions/>},
            {path:"/dashboard/resource",element:<ResourceViewer/>},
            {path:"/dashboard/progress",element:<DashboardProgress/>},
            {path:"/dashboard/resource-view/:id",element:<ResourceViewer/>},
            {path:"/dashboard/resource-page",element:<ResourcesPage/>},
            {path:"/dashboard/past-question/browser",element:<PastQuestionsBrowser/>},
            {path:"/dashboard/past-question-viewer/:id",element:<PastQuestionViewer/>}

        ]
    },
    {path:"/admin",element:<AdminPanel/>}

])