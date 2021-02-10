const fetch = require('cross-fetch');
const { hash } = require('bcrypt');
const loadWeb3 = require('../web3/index');
// const UNDGTransferEvent = require('../models/transfer.event');
const GenerateReferralID = require('../models/referralCreation');
require('dotenv/config');

let web3;

const loadBlockchainData = async () => {
    try {
        web3 = await loadWeb3();
        await test()
    } catch (error) { return error; }
}

const addNewReferral = async _data => {
    try {
        const { user } = _data;
        if(!web3.utils.isAddress(user)) throw new Error(`${user} is not a vaild Ethereum address`);

        const result = await GenerateReferralID.find({ user });
        if(result.length > 0) throw new Error("Referral have already been registered");
        const _hash = await hash(`${user}${Date.now()}`, 10);
        const _id = await filterHash(_hash);
        const _referrer = new GenerateReferralID({user, referralID: _id});
        await _referrer.save();
        return _referrer;
    } catch (error) {  
        console.log(error);
        return error;
    }
}

const getAllReferrer = async () => {
    try {
        const result = await GenerateReferralID.find({  }); 
        return result;
    } catch (error) { return error; }
}

const findReferrerByAddress = async _data => {
    try {
        const { user } = _data;
        const result = await GenerateReferralID.find({ user });
        return result;
    } catch (error) {
        return error
    }
}

const filterHash = async _data => {
    const result = _data.split("");
    const _maxLength = _data.length;
    const _minLength = _maxLength - 7;
    let temptItem = [];

    for(let i = 0; i < 6; i++) temptItem = [...temptItem, result[i]];
    for(let i = _minLength; i < _maxLength; i++) temptItem = [...temptItem, result[i]];
    temptItem = temptItem.join("");
    return temptItem;
}

const test = async () => {
    try {
        const _latestBlock = await web3.eth.getBlockNumber();
        const _user = await web3.utils.toChecksumAddress("0x1fa1000272ec1241cf53dbf7e5577d3c94003bb6");
        const _contractAddress = "0x63D0eEa1D7C0d1e89d7e665708d7e8997C0a9eD6";
        let result = await fetch(`//api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${_contractAddress}&address=${_user}&tag=latest&apikey=${process.env.Etherscan_Api_Key}`)
        result = await result.json();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { 
    web3,
    loadBlockchainData,
    addNewReferral,
    getAllReferrer,
    findReferrerByAddress
}