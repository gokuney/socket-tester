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
    self.IO.on(ep, function(...args){
        APP.receiveMessage = `
        <span class="label-padding label label-default"> Event:  ${lastIOwatcher} </span> &emsp;
        <span class="label-padding label label-default">${new Date()}</span>
        <div id = "json-data-wrapper"></div>
        `;

        setTimeout(function(){
            for( var i in args ){
                var d = args[i];
                console.log(i, d)
                if(typeof d == "object"){
                    $('#json-data-wrapper').append(`<div class="response-data"> <p>Argument ${parseInt(i)+1}</p><div class="json-data-${i}"></div> </div>`);
                    $(`.json-data-${i}`).jsonViewer(d)
                }else{
                    $('#json-data-wrapper').append(`<div class="response-data"> <p>Argument ${parseInt(i)+1}</p>${d} </div>`);
                }
            }
        }, 300);

    });
    alert(`We will now listen for all messages over endpoint "${ep}"`);
};