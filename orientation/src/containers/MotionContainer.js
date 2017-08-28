import React from 'react'
import { connect } from 'mqtt'

import { withRouter } from 'react-router-dom'
import { compose, lifecycle, withState, withHandlers } from 'recompose'

import { mqttUri, mqttOptions } from '../utils/MQTT'

import MotionBoard from '../components/MotionBoard'

/**
 * skille ut mqtt i egen container
 * (WBN) flytte orientation til redux -> både motionboard og mqtt bruker samme data
 */

export default compose (
  withRouter,
  withState('orientation', 'setOrientation', () => ({
    alpha: 0, // 0 to 360
    beta: 0, // -180 to 180
    gamma: 0, // -180 to 180
  })),
  withHandlers({
    handleOrientation: ({ orientation, setOrientation }) => e => {
      // certain devices use different orientation variables.
      const alphaGammaFlipped = e.alpha < 0 || e.gamma > 180
      setOrientation({
        alpha: alphaGammaFlipped ? e.gamme : e.alpha,
        beta: e.beta,
        gamma: alphaGammaFlipped ? e.alpha : e.gamma,
      })
    },
    handleMQTTConnect: () => e => {
      console.log('handleMQTTConnect', this, e)
    }
  }),
  lifecycle({
    componentDidMount() {
      window.addEventListener('deviceorientation', this.props.handleOrientation)
      const client = connect({
        ...mqttOptions,
        clientId: `capracube_${Math.random().toString(16).substring(2,8)}`,
      })
      console.log(this.props, client)
      // client.on('connect', this.props.handleMQTTConnect)
      client.on('error', (e) => console.log('mqttError: ', e))
    },
    componentWillUnmount() {
      window.removeEventListener('deviceorientation', this.props.handleOrientation)
    }
  }),
)(MotionBoard)
