var socket = function(url){
    console.log('Socket inited');
    this.url = url;
    try{
    this.IO = io.connect(url, {query: {token: 'PUz0dP0Xv0QFDBQtpJV0DwrhEz4T9BblDzGJKLi5cgYYbAouqVycBsMFLOiGEZYw'}});
    }catch(e){
        alert('errored!!')
    }
    this.init();
}

socket.prototype.init = function(){

    var self = this;

    self.IO.on('connect', function(){
        APP.socketURL = self.url;
        APP.status = true;
        APP.socket = self.IO;
        Lconnected(lott);
    });

    self.IO.on('connect_error' , function(e){
        console.log(`Error in connecting to ${self.url} socket `, e)
        APP.status = false;
        Ldisconnected(lott);
    });

    self.IO.on('log', function(data){
        var tmp = {
            data: data,
            timestamp: new Date()
        };
        APP.logs.push(tmp);
    });

};