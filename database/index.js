const Datastore = require('nedb');

const db = new Datastore({ filename: './database/database.json', autoload: true})

// data = {
//     title: "Crowd funding project",
//     description: "This is a web 3.0 project aimed at building a scalable crowd funding dapp",
//     expected: 1800,
//     img: "/start-campaign-4.jpg",
//     progress: 0,
//     donorCount: 0,
//     address: '',
//     deployer: '',
//     donors: [
//        { address: '', donation: '' }
//     ]
// }

/**
 * 
 * @param { { title: string, description: string, expected: string, img: string, progress: string, donorCount: string, address: string, deployer: string }} data
 */
const addCampaign = (data) => {
    return new Promise(resolve => {
        db.insert(data, (err, newDoc) => {
            if(err){
                console.log(error)
                resolve({ error: err})
            }
            else {
                resolve(newDoc)
            }
        })
    })
}

/**
 * 
 * @param { { title: string, description: string, expected: string, img: string, progress: string, donorCount: string, address: string, deployer: string }} data
 */
const editCampaign = (data) => {
    return new Promise(resolve => {
        db.update({ address: data.address}, data, (err, newDoc) => {
            if(err){
                console.log(error)
                resolve({ error: err})
            }
            else {
                resolve(newDoc)
            }
        })
    })
}

/**
 * 
 * @param {string} contractAddress
 */
const removeCampaign = (contractAddress) => {
    return new Promise((resolve) => {
        db.remove({ "address": contractAddress}, (err, numRemoved) => {
            if(err){
                console.log(err)
                resolve({ error: err})
            } else {
                resolve(numRemoved)
            }
        });
    })
}

/**
 * 
 * @param {string} userAddress 
 */
const fetchUserCampaigns = (userAddress) => {
    return new Promise((resolve) => {
        db.find({ "deployer": userAddress}, (err, docs) => {
            if(err){
                console.log(err)
                resolve({ error: err})
            } else {
                resolve(docs)
            }
        });
    })
}

const fetchAllData = () => {
    return new Promise((resolve) => {
        data = db.find({}, (err, docs) => {
            if(err){
                console.log(err)
                resolve({ error: err})
            } else {
                resolve(docs)
            }
        });
    })
}

module.exports =  {
    addCampaign,
    removeCampaign,
    fetchUserCampaigns,
    fetchAllData,
    editCampaign
}