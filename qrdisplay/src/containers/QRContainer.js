import { compose, lifecycle, withState, withHandlers } from 'recompose'
import QRious from 'qrious'

import QRCanvas from '../components/QRCanvas'

export default compose (
  withState('fetchError', 'setFetchError', null),
  withHandlers({
    generateQr: ({
      fetchError,
      setFetchError,
    }) => e => {
      if (fetchError) {
        setFetchError(null)
      }
      // fetch session code
      fetch(`https://iotlab.cantara.no/javazone/code`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf8',
        },
      }).then((response) => {
        const sessionkey = response.code || 'ok'
        new QRious({
          element: document.getElementById('qr'),
          background: '#155aaa',
          backgroundAlpha: 1,
          foreground: '#60c7e8',
          foregroundAlpha: 1,
          level: 'H',
          padding: 15,
          size: 400,
          value: `https://iotlab.cantara.no/javazone/orientation?session=${sessionkey}`,
        })
      }, (error) => {
        console.log('error', error)
        setFetchError(error)
      })
    },
  }),
  lifecycle({
    componentDidMount() {
      // generate qr
      this.props.generateQr()
      // start timer and generate every n seconds
      setInterval(() =>{
        this.props.generateQr()
      }, 1000*60*5)
    },
  }),
)(QRCanvas)
