const Web3 = require('web3');
require('dotenv/config');

const connectWeb3 = async () => new Web3(`https://mainnet.infura.io/v3/${process.env.Infura_Api_Key}`);

module.exports = connectWeb3;