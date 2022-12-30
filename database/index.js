const { Database } = require('sileco.db');

const db = new Database('./database/database.json')

//db = { user: contractAddress[]]}


/**
 * 
 * @param {*} userAddress 
 * @param {*} contractAddress
 */
const addCampaign = (userAddress, contractAddress) => {
    try {
        db.push(userAddress, contractAddress)
        return { success: 'success'}
    } catch (error) {
        return { error }
    }
}

/**
 * 
 * @param {*} userAddress 
 * @param {*} contractAddress
 */
const removeCampaign = (userAddress, contractAddress) => {
    try {
        db.pop(userAddress, contractAddress)
        return { success: 'success'}
    } catch (error) {
        return { error }
    }
}

/**
 * 
 * @param {*} userAddress 
 */
const fetchUser = (userAddress) => {
    try {
        const data = db.fetch(userAddress)
        return data
    } catch (error) {
        return { error }
    }
}

const fetchAll = () => {
    try {
        const data = db.fetchAllData()
        return data
    } catch (error) {
        return { error }
    }
}

module.exports =  {
    addCampaign,
    removeCampaign,
    fetchUser,
    fetchAllData
}