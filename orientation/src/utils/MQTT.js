// export const mqttUri = 'mqtt://test.mosquitto.org'
export const mqttUri = 'tcp://mqttdev.cantara.no'

// ws specific options: https://github.com/websockets/ws/blob/master/doc/ws.md
// mqtt options https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
export const mqttOptions = {
    protocol: 'tcp',
    host: 'mqttdev.cantara.no',
    port: 883,
}


// import { connect } from 'mqtt'

// Example(js)
// var mqtt = require('mqtt')
// var client  = mqtt.connect('wxs://test.mosquitto.org')
