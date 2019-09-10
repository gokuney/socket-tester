//Socket code 
var oldSocks = window.localStorage.getItem('old-socks') ? JSON.parse(window.localStorage.getItem('old-socks')) : [] ;
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
    logs: [],
    lastSockets : oldSocks
};

var initialData = JSON.stringify(appData);


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
            // var testSock = new RegExp(/(wss?:\/\/.*):(\d*)\/?(.*)/);
            var testSock = new RegExp(/(wss?:\/\/.*)\/?(.*)/);
            if(testSock.test(this.socketurlinput)){

                if( oldSocks.indexOf(this.socketurlinput) == -1 ){
                oldSocks.push(this.socketurlinput);
                }
                //remove all index above 5
                oldSocks = oldSocks.reverse()
                if(oldSocks.length > 5){
                    oldSocks.splice(4, oldSocks.length-5)
                }
                this.lastSockets = oldSocks;
                window.localStorage.setItem('old-socks', JSON.stringify(oldSocks))
                new socket(this.socketurlinput);
            }else{
                alert('Invalid web socket address. Make sure the address is wss and is in valid format.')
                return false;
            }
        },

        oldConnect: function(sock){
            this.socketurlinput = sock
        },

        sendMessageToServer: function(){
            console.log(`Using endpoint ${this.sendEndpoint} to send message : `, this.sendMessage)
            this.socket.emit(this.sendEndpoint, this.sendMessage);
        },
        disconnect: function(){
            var d = JSON.parse(initialData);
            this.status = false;
            for( var key in d){
                this[key] = d[key];
            }
            Ldisconnected(lott);
        }
    }
  })