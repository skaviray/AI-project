import { useState, React, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'


export default function App() {
  const [message, setMessage] = useState('')
  useEffect(() => {
    fetch("/api/info").then(res => res.json()).then(data => setMessage(data.message))
  }, [])
  return (
    <>
      <p className="font-bold p-20 text-5xl">{message}</p>
      <Button>Click Me</Button>
    </>
  )
}

