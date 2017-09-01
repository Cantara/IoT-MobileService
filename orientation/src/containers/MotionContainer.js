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
  withHandlers({
    handleOrientation: ({ orientation, setOrientation, isAuth, setIsAuth }) => e => {
      // certain devices use different orientation variables.
      const alphaGammaFlipped = e.alpha < 0 || e.gamma > 180

      const eventOrientation = {
        alpha: alphaGammaFlipped ? e.gamme : e.alpha,
        beta: e.beta,
        gamma: alphaGammaFlipped ? e.alpha : e.gamma,
      }
      // console.log(JSON.stringify(eventOrientation))
      // Update state
      setOrientation(eventOrientation)
      // send to server if allowed
      console.log(isAuth, setIsAuth)
      if (isAuth) {
        // Move out and call debounced version. setIsAuth(false) on error 403/401
        fetch(`https://iotlab.cantara.no/javazone/orientation/ok`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: eventOrientation,
        }).then((response) => {
          console.log('response', response)
        }, (error) => {
          console.log('error', error)
          setIsAuth(false)
        })
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      window.addEventListener('deviceorientation', this.props.handleOrientation)
    },
    componentWillUnmount() {
      window.removeEventListener('deviceorientation', this.props.handleOrientation)
    },
  }),
)(MotionBoard)
