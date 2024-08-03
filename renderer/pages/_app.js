import React from 'react'
import './globals.css'

const App = ({Component, PageProps}) => {
  return (
    <Component {...PageProps} />
  )
}

export default App