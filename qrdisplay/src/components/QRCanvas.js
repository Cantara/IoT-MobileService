import React from 'react'
import PropTypes from 'prop-types'

const QRCanvas = ({ fetchError }) => (
  <div>
    <canvas id='qr'></canvas>
    {fetchError && (
      <h3>Unable to fetch new sessionId</h3>
    )}
  </div>
)

QRCanvas.propTypes = {
  fetchError: PropTypes.object,
}

export default QRCanvas
