import Home from "../pages/Home/index"
import UserDetail from "../pages/UserDetail/index";

const publicRoutes = [
    { path: '/', component: Home }, 
    { path: '/user/:userId', component:UserDetail }
];

export {publicRoutes}