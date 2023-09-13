import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Circle from './shapes/Circle'
import Square from './shapes/Square'
import Triangle from './shapes/Triangle'

function getRandomWidth() {
  return Math.floor(Math.random() * 275) + 5
}

function getRandomHeight(heightValue: number) {
  return Math.floor(Math.random() * heightValue) + 5
}

function getCurrentDimention() {
  return {
    width: window.innerWidth,
    height: window.innerHeight / 2,
  }
}

function Game() {
  //Screen Size
  const [screenSize, setScreenSize] = useState(getCurrentDimention())
  //Shapes
  const [squareXY, setSquareXY] = useState([
    getRandomWidth(),
    getRandomHeight(screenSize.height),
  ])
  const [circleXY, setCircleXY] = useState([
    getRandomWidth(),
    getRandomHeight(screenSize.height),
  ])
  const [triangleXY, setTriangleXY] = useState([
    getRandomWidth(),
    getRandomHeight(screenSize.height),
  ])
  //Score
  const [count, setCount] = useState(0)
  const [shapeScore, setShapeScore] = useState(100)
  //Timer
  const [num, setNum] = useState(60)

  const intervalRef = useRef()
  const decreaseNum = () => setNum((prev) => prev - 1)
  const decreaseScore = () => setShapeScore((prev) => prev - 1)

  //Timer useEffect
  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 1000)
    intervalRef.current = setInterval(decreaseScore, 100)
    return () => clearInterval(intervalRef.current)
  }, [])

  //Responsive useEffect
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimention())
    }
    window.addEventListener('resize', updateDimension)
    return () => {
      window.removeEventListener('resize', updateDimension)
    }
  }, [screenSize])

  //click handlers
  function handleClick() {
    setSquareXY([getRandomWidth(), getRandomHeight(screenSize.height)])
    setCount(count + shapeScore)
    setShapeScore(100)
  }

  function handleCircleClick() {
    setCircleXY([getRandomWidth(), getRandomHeight(screenSize.height)])
    setCount(count + shapeScore)
    setShapeScore(100)
  }
  function handleTriangleClick() {
    setTriangleXY([getRandomWidth(), getRandomHeight(screenSize.height)])
    setCount(count + shapeScore)
    setShapeScore(100)
  }

  return (
    <>
      <button className="go-back-button">
        <Link to="/catagory"> Go Back </Link>
      </button>
      <div>
        <h1>Clicky!</h1>
        <h2>Score: {count}</h2>
        <div>
          <h2>{num}</h2>
        </div>
        <svg
          viewBox={`0 0 300 ${screenSize.height}`}
          style={{ border: 'solid' }}
        >
          <Square
            x={squareXY[0]}
            y={squareXY[1]}
            size={20}
            handleClick={handleClick}
          />
          <Circle
            x={circleXY[0]}
            y={circleXY[1]}
            radius={10}
            handleCircleClick={handleCircleClick}
          />
          <Triangle
            x={triangleXY[0]}
            y={triangleXY[1]}
            sideLength={20}
            handleTriangleClick={handleTriangleClick}
          />
        </svg>
      </div>
    </>
  )
}

//1340 855 game dimension
//1440 1024 screen size

export default Game
