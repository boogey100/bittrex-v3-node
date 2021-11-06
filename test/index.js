const should = require('should')
const { BittrexClient } = require('../src')
require('dotenv').config()

const xdescribe = () => { }

const client = new BittrexClient({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
})

describe('bittrex v3 api', () => {
  describe('# account', () => {
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

  describe('# addresses', () => {
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
        let results = await client.addressCreate('BTC')
        results.status.should.be.equals("REQUESTED")
      } catch (err) {
        err.message.should.be.equals("CRYPTO_ADDRESS_ALREADY_EXISTS")
      }
    })
  })

  describe('# balances', () => {
    it('should get balances', async () => {
      let results = await client.balances()
      results.length.should.be.aboveOrEqual(0)
    })

    it('should get specific balance', async () => {
      let results = await client.balance('BTC')
      results.currencySymbol.should.be.equals('BTC')
    })

    it('should get sequence of balances snapshot', async () => {
      await client.headBalances()
    })
  })

  describe('# batch', () => {
    it('should create batch', async () => {
      try {
        await client.batch()
      } catch (err) {
        err.message.should.be.equals("REQUEST_NOT_PROCESSED")
      }
    })
  })

  describe('# conditional orders', () => {
    it('should get conditional order by id', async () => {
      try {
        await client.conditionalOrders('00000000-0000-0000-00000000')
      } catch (err) {
        err.message.should.be.equals("NOT_FOUND")
      }
    })

    it('should delete conditional order', async () => {
      try {
        await client.conditionalOrderDelete('00000000-0000-4000-00000000')
      } catch (err) {
        err.message.should.be.equals("NOT_FOUND")
      }
    })

    it('should get closed conditional orders', async () => {
      let results = await client.conditionalOrdersClosed()
      results.length.should.be.aboveOrEqual(0)
    })

    it('should get open conditional orders', async () => {
      let results = await client.conditionalOrdersOpen()
      results.length.should.be.aboveOrEqual(0)
    })

    it('should head open conditional orders', async () => {
      await client.headConditionalOrdersOpen()
    })

    it('should create new conditional order', async () => {
      try {
        await client.conditionalOrdersCreate()
      } catch (err) {
        err.message.should.be.equals("REQUEST_NOT_PROCESSED")
      }
    })
  })

  describe('# currencies', () => {
    it('should get currencies', async () => {
      let results = await client.currencies()
      results.length.should.be.aboveOrEqual(0)
    })

    it('should get currencies w/ marketSymbol', async () => {
      let results = await client.currencies('BTC')
      results.symbol.should.be.equals('BTC')
    })
  })

  describe('# deposits', () => {
    it('should get open deposits', async () => {
      let results = await client.depositsOpen();
      results.length.should.be.aboveOrEqual(0)
    })

    it('should head open deposits', async () => {
      await client.headDepositsOpen();
    })

    it('should get closed deposits', async () => {
      let results = await client.depositsClosed();
      results.length.should.be.aboveOrEqual(0)
    })

    it('should get deposits by tx id', async () => {
      let results = await client.depositsByTxId();
      results.length.should.be.aboveOrEqual(0)
    })

    it('should get deposit by id', async () => {
      try {
        await client.deposits('00000000-0000-4000-00000000')
      } catch (err) {
        err.message.should.be.equals("NOT_FOUND")
      }
    })
  })

  describe('# markets', () => {
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
      results.length.should.be.aboveOrEqual(0)
    })
  })

})
