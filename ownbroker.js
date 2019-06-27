var mosca = require('mosca')
var SECURE_KEY = 'key.pem';
var SECURE_CERT = 'cert.pem';
var settings = {
    port: 1888,
    logger: {
        name: "secureExample",
        level:40,
    },
    http: {
        port: 3000,
        bundle: true,
        static: './'
    }
};

var authenticate = function(client,username,password,callback){
    var authorized = (username === 'anshika0701' && password.toString()==='yachi-1997');
    if(authorized) client.user = username;
    callback(null,authorized)
}

var server = new mosca.Server(settings);
server.on('ready',setup);

function setup(){
    server.authenticate = authenticate;
    console.log('mosca server is up and running')
}

server.on('clientConnected', function(client){
    console.log('client connected',client.id);
})

server.on('published',function(packet,client) {
    console.log('published :',packet.payload.toString ('utf8'));
})
server.on('subscribed',function(topic,client){
    console.log('subscribed:',topic);
});

server.on('unsubscribed',function(topic,client){
    console.log('unsubscribed:', topic)
});
server.on('clientDissconnecting',function(client){
    console.log('clientDiscoonecting:', client.id)
});