import { useEffect, useState } from "react"
import AnimatedNumbers from "./components/AnimatedNumbers"

function App() {
  const [number, setNumber] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber((prevNumber) => prevNumber + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [])
  return (
    <div>
      <AnimatedNumbers value={number} maxLength={5} options={
        {
          border: "1px solid red",
          fontSize: 100
        }
      }/>
    </div>
  )
}

export default App
