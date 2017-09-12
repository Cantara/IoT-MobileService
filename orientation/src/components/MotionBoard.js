import React from 'react'

import logo from './Capra_logo_web_transparent.svg'
import './MotionBoard.css'

const UnsupportedInfo = () => {
  const hasNoDeviceOrientation = !('ondeviceorientation' in window)
  const hasNoDeviceMotion = !('ondevicemotion' in window)
  return (
    <div>
      {hasNoDeviceOrientation && (
        <p>deviceorientation event not supported</p>
      )}
      {hasNoDeviceMotion && (
        <p>devicemotion event not supported</p>
      )}
      {hasNoDeviceOrientation && hasNoDeviceMotion && (
        <p>This box won't work with your current device!</p>
      )}
    </div>
  )
}

const ReconnectInfo = () => (
  <p className='reconnect-info'>
    Not connected to the cube.
    <br />
    Please re-scan QRcode to reconnect!
  </p>
)

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

const Contactus = ({ randomBool }) => {
  const email = randomBool
    ? 'oth@capraconsulting.no'
    : 'ses@capraconsulting.no'
  return (
    <p className='contact'>
      <a href={`mailto:${email}?subject=Livet, lyset og Capra&body=Hei! Jeg vil gjerne ta en prat om Capra.`}>
        Ps. lyst på en gratis kaffe og en jovial prat om livet, lyset og Capra? Send melding hit da vel?
      </a>
    </p>
  )
}

const MotionBoard = ({ orientation, isAuth, randomBool }) => {
  return (
    <div>
      <UnsupportedInfo />
      <Logoboard {...orientation}/>
      {!isAuth && (
        <ReconnectInfo />
      )}
      <Contactus randomBool={randomBool} />
    </div>
  )
}

export default MotionBoard
