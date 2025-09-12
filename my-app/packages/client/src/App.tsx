import { useState, React, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'


export default function App() {
  const [message, setMessage] = useState('')
  useEffect(() => {
    fetch("/api/info").then(res => res.json()).then(data => setMessage(data.message))
  }, [])
  return (
    <div>
      <p>{message}</p>
    </div>
  )
}

