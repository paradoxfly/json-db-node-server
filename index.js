const fs = require('fs')
const dbActions = require('./database')

//Initialize server
var express = require('express');
var http = require('http');
var cors = require('cors')
var app = express();
const path = require('path');
const { response } = require('express');

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.use(cors())

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, ()=> {
    console.log("Listening on port " + port)
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({ extended: false }));

app.post('/create', (request, response) => {
    // {userAddress, contractAddress}
    const data = dbActions.addCampaign(request.body.userAddress, request.body.contractAddress)
    
    if(data.error){
        response.json({ status: 'success'})
    }
    else {
        response.json({ error: data.error.message })
    }
})

app.delete('/delete-campaign', (request, response) => {
    // {userAddress, contractAddress}
    const data = dbActions.removeCampaign(request.body.userAddress, request.body.contractAddress)
    
    if(data.error){
        response.json({ status: 'success'})
    }
    else {
        response.json({ error: data.error.message })
    }
})

app.get('/fetch-all', (request, response) => {
    const data = dbActions.fetchAllData()

    if(data.error){
        response.json({ status: 'success'})
    }
    else {
        response.json({ error: data.error.message })
    }
})

app.get('/fetch-user', (request, response) => {
    //{ userAddress }
    const data = dbActions.fetchUser(response.body.userAddress)

    if(data.error){
        response.json({ status: 'success'})
    }
    else {
        response.json({ error: data.error.message })
    }    
})

