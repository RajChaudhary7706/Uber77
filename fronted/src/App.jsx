import { useContext } from "react"
import { UserDataContext } from "./UserContext/UserDataContext"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Start from "./pages/Start"
import UserLogin from "./pages/UserLogin"
import UserSignUp from "./pages/UserSignUp"
import CaptainLogin from "./pages/CaptainLogin"
import CaptainSignUp from "./pages/CaptainSignUp"
import CaptainHome from "./pages/CaptainHome"
import CaptainLogout from "./pages/CaptainLogout"
import UserProtectWrapper from "./pages/UserProtectWrapper"
import UserLogout from "./pages/UserLogout"
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper"


export default function App () {

  const ans = useContext(UserDataContext);
  console.log(ans);
  return (
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path='/home' 
        element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
         }/>

         <Route path='user/logout' 
         element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
         }/>
         <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
         } />
         <Route path="/captain-home" element={
            <CaptainProtectWrapper>
              <CaptainHome/>
            </CaptainProtectWrapper>
          } />
      </Routes>
  )
}
