// import React,{useContext} from "react";
// import { UserDataContext } from "../UserContext/UserDataContext";
// import { useNavigate } from "react-router-dom";

// const UserProtectWrapper = ({ children }) => {

//     const token = localStorage.getItem("token");
//     const navigate = useNavigate();

//     if(!token){
//         navigate('/login');
//         return null;
//     }

//     return (
//         <>
//             {children}
//         </>
//     )
// }

// export default UserProtectWrapper;

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [token, navigate])

  if (!token) return null

  return <>{children}</>
}

export default UserProtectWrapper
