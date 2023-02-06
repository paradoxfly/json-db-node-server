const fs = require('fs')
const dbActions = require('./database')

//Initialize server
var express = require('express');
var http = require('http');
var cors = require('cors')
var app = express();
const path = require('path');
const { response } = require('express');

var port = normalizePort(process.env.PORT || '8080');
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

// dbActions.addCampaign({
//     title: "Crowd funding project",
//     description: "This is a web 3.0 project aimed at building a scalable crowd funding dapp",
//     expected: 1800,
//     img: "/start-campaign-4.jpg",
//     progress: 0,
//     address: 'kulikuli',
//     deployer: 'karago'
// })


app.post('/create', async (request, response) => {
    // { title: string, description: string, expected: string, img: string, progress: string, donorCount: string, address: string, deployer: string }
    const data = await dbActions.addCampaign(request.body)
    
    if(data.error){
        response.json({ error: data.error.message})
    }
    else {
        response.json({ status: 'successful', id: data._id })
    }
})

app.put('/edit', async (request, response) => {
    // { title: string, description: string, expected: string, img: string, progress: string, donorCount: string, address: string, deployer: string }
    const data = await dbActions.editCampaign(request.body)
    
    if(data.error){
        response.json({ error: data.error.message})
    }
    else {
        response.json({ status: 'successful'})
    }
})

app.delete('/delete-campaign', async (request, response) => {
    // {contractAddress}
    const data = await dbActions.removeCampaign(request.body.contractAddress)
    
    if(data.error){
        response.json({ error: data.error.message})
    }
    else {
        response.json({ status: 'successful' })
    }
})

app.get('/fetch-all', async (request, response) => {
    const data = await dbActions.fetchAllData()
    console.log(data)

    if(data?.error){
        response.json({ error: data.error.message})
    }
    else {
        // console.log(data)
        response.json(data)
    }
})

app.post('/fetch-user-campaigns', async (request, response) => {
    //{ userAddress }
    const data = await dbActions.fetchUserCampaigns(request.body.userAddress)

    if(data.error){
        response.json({ error: data.error.message})
    }
    else {
        response.json(data)
    }    
})

