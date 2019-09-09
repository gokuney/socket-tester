//Socket code 

var appData = {
    socketURL: false,
    socketurlinput: '',
    socket: null,
    status: false,
    socketCommandInput1: '',
    socketCommandInput2: '',
    lottie: null,
    sendMessage: '',
    sendEndpoint: '',
    logs: []
}

function Ldisconnected(lott){
    // lott.setDirection(1);
    lott.playSegments([ [0,120] ], true);
    lott.play();
}

function Lconnected(lott){
    // lott.setDirection(1);
    lott.playSegments([ [120, 152] ], true);
    lott.play();
}

var lott = false;

var APP = new Vue({
    el: '#app',
    data: appData,
    mounted: function(){
        lott  = lottie.loadAnimation({
            container: document.getElementById('connection-status'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: `/static/connection.json`
        });
        lott.stop();
        lott.addEventListener('DOMLoaded',function(){
            Ldisconnected(lott);
        });
    },
    methods: {
        enterSocket: function(){
            var testSock = new RegExp(/(wss?:\/\/.*):(\d*)\/?(.*)/);
            if(testSock.test(this.socketurlinput)){
                new socket(this.socketurlinput);
            }else{
                alert('Invalid web socket address. Make sure the address is wss and is in valid format.')
                return false;
            }
        },
        sendMessageToServer: function(){
            console.log(`Using endpoint ${this.sendEndpoint} to send message : `, this.sendMessage)
            this.socket.emit(this.sendEndpoint, this.sendMessage);
        }
    }
  })