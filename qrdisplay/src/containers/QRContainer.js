import { compose, lifecycle, withState, withHandlers } from 'recompose'

import QRCanvas from '../components/QRCanvas'

export default compose (
  withState('isAuth', 'setIsAuth', true),
  withHandlers({
    handleOrientation: ({
      isAuth,
      setIsAuth,
    }) => e => {
      console.log(e)
    },
  }),
  lifecycle({
    componentDidMount() {
      // setInterval(() =>{
      //   this.props.setCanSend(true)
      // }, 250)
    },
    componentWillUnmount() {
      // clean up
    },
  }),
)(QRCanvas)
