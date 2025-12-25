import { useEffect, useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { CaptainDataContext } from "../UserContext/CaptainDataContext"

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const { setCaptain } = useContext(CaptainDataContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate("/captain-login")
      return
    }

    const fetchCaptainProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.status === 200) {
          setCaptain(response.data)
        }
      } catch (err) {
        console.error(err)
        localStorage.removeItem("token")
        navigate("/captain-login")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCaptainProfile()
  }, [token, navigate, setCaptain])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

export default CaptainProtectWrapper
