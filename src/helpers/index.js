const fetch = require('cross-fetch');
const { hash } = require('bcrypt');
const loadWeb3 = require('../web3/index');
const GenerateReferralID = require('../models/referralCreation');
const ReferralRegistrgation = require('../models/register');

require('dotenv/config');

let web3;

const loadBlockchainData = async () => {
    try {
        web3 = await loadWeb3();
    } catch (error) { return error; }
}

const addNewReferral = async _data => {
    try {
        const { user } = _data;
        const result = await GenerateReferralID.find({ user });

        if(!web3.utils.isAddress(user)) return new Error(`${user} is not a vaild Ethereum address`);
        if(result.length > 0) return new Error("Referral have already been registered");

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
    const _minLength = _maxLength - 9;
    let temptItem = [];

    for(let i = 0; i < 8; i++) temptItem = [...temptItem, result[i]];
    for(let i = _minLength; i < _maxLength; i++) temptItem = [...temptItem, result[i]];
    temptItem = temptItem.join("");
    return temptItem;
}

// const test = async () => {
//     try {
//         const _wallet = web3.utils.toChecksumAddress("0x491dee00dde856342eEFfb3320035419D5c3E28C");
//         const _endBlock = await web3.eth.getBlockNumber();
//         let _startBlock = 0;

//         let result = await fetch(`//api.etherscan.io/api?module=account&action=txlist&address=${_wallet}&startblock=${_startBlock}&endblock=${_endBlock}&sort=desc&apikey=${process.env.Etherscan_Api_Key}`)
//         result = await result.json();
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//     }
// }

const newUserRegistration = async _data => {
    try {
        const { user } = _data;
        const isValidReferralID = await GenerateReferralID.find({ referralID: _data.referralID });
        let referralID = process.env.adminReferralAddress;
        if(isValidReferralID.length > 0) referralID = _data.referralID;
        
        const isRegisteredAccount = await ReferralRegistrgation.find({ user });

        if(isRegisteredAccount.length > 0) return new Error("user have already been registered");

        const _newUser = new ReferralRegistrgation({ user, referralID });
        await _newUser.save();
        return _newUser;
    } catch (error) {
        console.log(error);
        return error
    }
}

const getAllRegisteredUser = async () => {
    try {
        const result = await ReferralRegistrgation.find({  });
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = { 
    web3,
    loadBlockchainData,
    addNewReferral,
    getAllReferrer,
    findReferrerByAddress,
    newUserRegistration,
    getAllRegisteredUser
}