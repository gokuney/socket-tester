var socket = function(url){
    console.log('Socket inited');
    this.url = url;
    try{
    this.IO = io.connect(url, {query: {rejectUnauthorized: false, token: 'PUz0dP0Xv0QFDBQtpJV0DwrhEz4T9BblDzGJKLi5cgYYbAouqVycBsMFLOiGEZYw'}});
    }catch(e){
        alert('errored!!')
    }
    this.init();
    return this;
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

socket.prototype.removeListener = function(watcher){
    var self = this;
    //disconnect
    self.IO.removeListener(watcher)
};

socket.prototype.addListener = function(name){
    var self = this;
    
    self.removeListener(lastIOwatcher);

    var ep = APP.receiveEndpoint
    lastIOwatcher = ep;
    APP.receiveMessage = '';
    self.IO.on(ep, function(eventName, data){
        console.log(`Got data : `,data)
        var msg = typeof data == 'string ' ? data : JSON.stringify(data)
        APP.receiveMessage = `Event Name : ${eventName} | Data : ${msg} | TS: ${new Date()}`
    });
    alert(`We will now listen for all messages over endpoint "${ep}"`);
};