import { withRouter } from 'react-router-dom'
import { compose, lifecycle, withState, withHandlers } from 'recompose'

import MotionBoard from '../components/MotionBoard'

export default compose (
  withRouter,
  withState('orientation', 'setOrientation', () => ({
    alpha: 0, // 0 to 360
    beta: 0, // -180 to 180
    gamma: 0, // -180 to 180
  })),
  withState('isAuth', 'setIsAuth', true),
  withState('canSend', 'setCanSend', true),
  withHandlers({
    handleOrientation: ({
      location,
      orientation,
      setOrientation,
      isAuth,
      setIsAuth,
      canSend,
      setCanSend,
    }) => e => {
      // certain devices use different orientation variables.
      const alphaGammaFlipped = e.alpha < 0 || e.gamma > 180

      const eventOrientation = {
        alpha: alphaGammaFlipped ? e.gamma : e.alpha,
        beta: e.beta,
        gamma: alphaGammaFlipped ? e.alpha : e.gamma,
      }

      // Update state
      setOrientation(eventOrientation)
      // send to server if isAuth and canSend
      const sessionKey = location.search != null && location.search !== ''
        ? decodeURIComponent(location.search).replace(/^.*=/, '')
        : 'nosession'
      const stringifiedOrientation = {
        alpha: `${Math.round(eventOrientation.alpha)}`,
        beta: `${Math.round(eventOrientation.beta)}`,
        gamma: `${Math.round(eventOrientation.gamma)}`,
      }
      if (isAuth && canSend) {
        // disable sending until next interval
        setCanSend(false)
        // post eventOrientation
        fetch(`https://iotlab.cantara.no/javazone/orientation/${sessionKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify(stringifiedOrientation),
        }).then((response) => {
          console.log('response', response)
          // disable next request if response isnt ok
          if (!response.ok) {
            setIsAuth(false)
          }
        }, (error) => {
          console.log('error', error)
          // Stop next request on any error
          setIsAuth(false)
        })
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      window.addEventListener('deviceorientation', this.props.handleOrientation)
      setInterval(() =>{
        this.props.setCanSend(true)
      }, 250)
    },
    componentWillUnmount() {
      window.removeEventListener('deviceorientation', this.props.handleOrientation)
    },
  }),
)(MotionBoard)
