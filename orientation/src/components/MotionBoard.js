import React from 'react'

import logo from './logo.png'
import './MotionBoard.css'

const UnsupportedInfo = () => {
  const hasNoDeviceOrientation = !('ondeviceorientation' in window)
  const hasNoDeviceMotion = !('ondevicemotion' in window)
  return (
    <div>
      {hasNoDeviceOrientation && (
        <p id='do-unsupported' className='api-support hidden'>deviceorientation event not supported</p>
      )}
      {hasNoDeviceMotion && (
        <p id='dm-unsupported' className='api-support hidden'>devicemotion event not supported</p>
      )}
      {hasNoDeviceOrientation && hasNoDeviceMotion && (
        <p>This box won't work with your current device!</p>
      )}
    </div>
  )
}

const Logoboard = ({ alpha, beta, gamma }) => {
  const rotate = `rotateX(${beta}deg) rotateY(${gamma}deg) rotateZ(${alpha}deg)`
  const newStyle = {
    WebkitTransform: rotate,
    transform: rotate,
  }
  return (
    <div
      className='board'
      style={newStyle}
    >
      <div className='face'>
        <img src={logo} alt='logo' />
      </div>
    </div>
  )
}

const MotionBoard = ({ orientation }) => {
  return (
    <div>
      <UnsupportedInfo />
      <Logoboard {...orientation}/>
    </div>
  )
}

export default MotionBoard
