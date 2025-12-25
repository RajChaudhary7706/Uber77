import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const UserLogout = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.status === 200) {
          localStorage.removeItem("token")
          navigate("/login")
        }
      } catch (error) {
        console.error("Logout failed:", error)
        localStorage.removeItem("token") // force logout
        navigate("/login")
      }
    }

    logout()
  }, [navigate, token])

  return null
}

export default UserLogout
