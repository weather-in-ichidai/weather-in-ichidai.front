import "../styles/index.css"
import React from "react"
import PropTypes from "prop-types"

const MyApp: React.FC<{ Component: any; pageProps: any }> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}
MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
}

export default MyApp
