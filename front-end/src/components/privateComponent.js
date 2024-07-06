import React from "react";
import { Navigate,Outlet } from "react-router-dom";

// const navigate = useNavigate();

const PrivateComponent = () => {
    // return <Outlet />;
    const auth = localStorage.getItem("user");
        if(auth)
        {
            return <Outlet />;
        }   
        else{
            return <Navigate to="/signUp" />;
        }

}
export default PrivateComponent;