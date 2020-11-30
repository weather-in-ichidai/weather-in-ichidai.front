import "../styles/index.css"
import React from "react"

const MyApp: React.FC<any> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
