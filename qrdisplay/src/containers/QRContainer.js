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
          'Authorization': `Basic ${window.btoa('qrscanner:qrscanner')}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }).then((response, data) => {
        return response.json()
      }, (error) => {
        console.log('error', error)
        setFetchError(error)
      }).then((resJson) => {
        const sessionkey = resJson.code || 'nosession'
        const baseUrl = 'http://orientation.iot.capraconsulting.no.s3-website-eu-west-1.amazonaws.com'
        new QRious({
          element: document.getElementById('qr'),
          background: '#155aaa',
          backgroundAlpha: 1,
          foreground: '#60c7e8',
          foregroundAlpha: 1,
          level: 'H',
          padding: 15,
          size: 300,
          value: `${baseUrl}?session=${sessionkey}`,
        })
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
