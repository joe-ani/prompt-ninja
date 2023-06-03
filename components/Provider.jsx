"use client"


// client based
import { SessionProvider } from "next-auth/react"

const Provider = ({children, session}) => {
  return (
    // higher order component
    // for authentication (google)
    <SessionProvider session={session} >
      {children} 
    </SessionProvider>
  )
}

export default Provider