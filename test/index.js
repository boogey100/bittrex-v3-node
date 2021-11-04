const should = require('should')

const xdescribe = () => { }

const { BittrexClient } = require('../src')
require('dotenv').config()
const client = new BittrexClient({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
})

describe('account', () => {
  it('should get account', async () => {
    let results = await client.account()
    should.exist(results.accountId)
  })

  it('should get account fees trading', async () => {
    let results = await client.accountFeesTrading()
    results.length.should.be.aboveOrEqual(0)
  })

  it('should get account fees trading w/ market symbol', async () => {
    let results = await client.accountFeesTrading('BTC-USD')
    should.exist(results.marketSymbol)
  })

  it('should get account volume', async () => {
    let results = await client.accountVolume()
    should.exist(results.volume30days)
  })

  it('should get account permissions markets', async () => {
    let results = await client.accountPermissionsMarkets()
    results.length.should.be.aboveOrEqual(0)
  })

  it('should get account permissions markets w/ marketSymbol', async () => {
    let results = await client.accountPermissionsMarkets('BTC-USD')
    results.length.should.be.aboveOrEqual(0)
  })

  it('should get account permissions currencies', async () => {
    let results = await client.accountPermissionsCurrencies()
    results.length.should.be.aboveOrEqual(0)
    should.exist(results[0].symbol)
  })

  it('should get account permissions currencies w/ marketSymbol', async () => {
    let results = await client.accountPermissionsCurrencies('BTC')
    results.length.should.be.aboveOrEqual(0)
    results[0].symbol.should.be.equals('BTC')
  })

})

describe('addresses', () => {
  it('should get addresses', async () => {
    let results = await client.addresses()
    results.length.should.be.aboveOrEqual(0)
  })

  it('should get addresses w/ marketSymbol', async () => {
    let results = await client.addresses('BTC')
    results.currencySymbol.should.be.equals('BTC')
  })

  it('should get address status', async () => {
    let results = await client.addressStatus('BTC')
    results.currencySymbol.should.be.equals('BTC')
  })

  it('should request provisioning of a new deposit address for a given currency', async () => {
    try {
      let results = await client.addressCreate('USDT')
      results.status.should.be.equals("REQUESTED")
    } catch (err) {
      err.message.should.be.equals("CRYPTO_ADDRESS_ALREADY_EXISTS")
    }
  })
})

describe('balances', () => {
  it('should get balances', async () => {
    let results = await client.getBalances()
    results.length.should.be.aboveOrEqual(0)
  });

  it('should get specific balance', async () => {
    let results = await client.getBalance('BTC')
    results.currencySymbol.should.be.equals('BTC')
  });

  xit('should get sequence of balances snapshot', async () => {
    let results = await client.headBalances()
  });
})

xdescribe('batch', () => {
  it('should create batch', async () => {
    let results = await client.createBatch([
      {
        operation: 'post',
        resource: 'order',
        payload: {

        }
      }
    ])
  })
})

describe('currencies', () => {
  it('should get currencies', async () => {
    let results = await client.currencies()
    results.length.should.be.aboveOrEqual(0)
  })

  it('should get currencies w/ marketSymbol', async () => {
    let results = await client.currencies('BTC')
    results.symbol.should.be.equals('BTC')
  })
})

describe('markets', () => {
  it('should get all markets', async () => {
    let results = await client.markets()
    results.length.should.be.aboveOrEqual(0)
  })
  it('should get all markets summaries', async () => {
    let results = await client.marketsSummaries()
    results.length.should.be.aboveOrEqual(0)
  })
  it('should get all markets tickers', async () => {
    let results = await client.marketsTickers()
    console.log(results)
    results.length.should.be.aboveOrEqual(0)
  })
})

