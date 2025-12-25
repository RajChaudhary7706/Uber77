import { useState } from "react"
import { CaptainDataContext } from "./CaptainDataContext"

// 2️⃣ Custom hook (uses CONTEXT, not provider)
// export const useCaptain = () => {
//   const context = useContext(CaptainDataContext)

//   if (!context) {
//     throw new Error("useCaptain must be used within a CaptainContextProvider")
//   }

//   return context
// }

// 3️⃣ Provider component
const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
  }

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext
