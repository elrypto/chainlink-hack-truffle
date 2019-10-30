const MyHttpContract = artifacts.require('MyHTTPContract')

/*
  This script allows for a Chainlink request to be created from
  the requesting contract. Defaults to the Chainlink oracle address
  on this page: https://docs.chain.link/docs/testnet-oracles
*/

/*
 req.add("path", "ebook_count");
   // req.addInt("times", _times);
    req.add("get", "https://openlibrary.org");
    //req.add("queryParams", "firstKey=firstVal&secondKey=secondVal");
    req.add("extPath", "subjects/love.json");

*/

const oracleAddress =
  process.env.TRUFFLE_CL_BOX_ORACLE_ADDRESS ||
  '0x1948C20CC492539968BB9b041F96D6556B4b7001'
const jobId =
  process.env.TRUFFLE_CL_BOX_JOB_ID || '80fecd06d2e14c67a22cee5f9728e067'
const payment = process.env.TRUFFLE_CL_BOX_PAYMENT || '1000000000000000000'
const url =
  process.env.TRUFFLE_CL_BOX_URL ||
  'https://0o56rr6pig.execute-api.us-east-1.amazonaws.com/dev/balanceForAddress'
const path = process.env.TRUFFLE_CL_BOX_JSON_PATH || 'message'
const times = process.env.TRUFFLE_CL_BOX_TIMES || '100'

module.exports = async callback => {
  const mc = await MyHttpContract.deployed()
  console.log('Creating request on contract:', mc.address)
  const tx = await mc.createRequestTo(
    oracleAddress,
    web3.utils.toHex(jobId),
    payment,
    url,
    path,
    times,
  )
  callback(tx.tx)
}
