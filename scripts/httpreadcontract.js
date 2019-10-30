const MyHttpContract = artifacts.require('MyHTTPContract')

/*
  This script makes it easy to read the data variable
  of the requesting contract.
*/

module.exports = async callback => {
  const mc = await MyHttpContract.deployed()
  const data = await mc.data.call()
  callback(data)
}
