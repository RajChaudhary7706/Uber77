import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const CaptainLogout = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/captains/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.status === 200) {
          localStorage.removeItem("token")
          navigate("/captain-login")
        }
      } catch (error) {
        console.error("Captain logout failed:", error)
        // Force local logout regardless
        localStorage.removeItem("token")
        navigate("/captain-login")
      }
    }

    logout()
  }, [navigate, token])

  return null
}

export default CaptainLogout
