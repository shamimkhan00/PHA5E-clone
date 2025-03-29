import { useState, useEffect } from 'react'
import Homepage from './Homepage'
import './App.css'

function App() {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => setIsAnimationComplete(true), 1000)
    }, 2500) 

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-screen bg-[rgb(33,33,33)]">
      {!isAnimationComplete ? (
        <div className={`h-full flex justify-center items-center 
          transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          
          <div className="relative text-9xl font-bold font-[Area_Normal,Helvetica,Arial,sans-serif]">
            {/* Border animation */}
            <div className="absolute inset-0 animate-text-stroke">
              <svg width="100%" height="100%" viewBox="0 0 500 150">
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="stroke-text"
                >
                  PHA5E
                </text>
              </svg>
            </div>

            {/* Fill animation */}
            <div className="animate-text-fill">
              <svg width="100%" height="100%" viewBox="0 0 500 150">
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="fill-text"
                >
                  PHA5E
                </text>
              </svg>
            </div>
          </div>
        </div>
      ) : (
    
        <div className="h-full bg-[rgb(33,33,33)] p-8">
          <Homepage></Homepage>
        </div>
      )}
    </div>
  )
}

export default App