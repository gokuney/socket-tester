const express = require('express')
const app = express()
const Fs = require('fs')
const https = require('https')

const credentials = {
  key: Fs.readFileSync('/home/shenron/AE/VADER/districtView/dev/certs/ae.key'),
  cert: Fs.readFileSync('/home/shenron/AE/VADER/districtView/dev/certs/ae.crt')
};

app.use( '/static', express.static(__dirname+'/public')  )

// ROUTES

app.get('/', (req, res) => {
	res.sendFile(__dirname+'/index.html');
})

console.log('Server listening at port 3322')
var Server = https.createServer(credentials, app)
const io = require('socket.io').listen(Server, { 'pingTimeout': 5000, 'pingInterval': 2000 });


// SOCKETS
io.on('connect', (socket) => {
        console.log('someone joined!')


        socket.on('message', (data) => {
          socket.emit('log', {message: `Got your data as ${data}`, endpoint: 'message'})
          console.log(`Client sent to endpoint 'message': `, data)
        })

})




Server.listen(3322)