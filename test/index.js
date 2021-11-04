const should = require('should')

const xdescribe = () => { }

const { BittrexClient } = require('../build')
require('dotenv').config()
const client = new BittrexClient({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
})

xdescribe('account', () => {
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

xdescribe('addresses', () => {
  it('should get addresses', async () => {
    let results = await client.addresses()
    results.length.should.be.aboveOrEqual(0)
  })

  it('should get addresses w/ marketSymbol', async () => {
    let results = await client.addresses('BTC')
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

xdescribe('balances', () => {
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


xdescribe('bittrex-node', () => {
  describe('public', () => {
    it('should get markets', async () => {
      let results = await client.markets()
      should.exist(results)
      results.length.should.be.above(0)
    })

    it('should get currencies', async () => {
      let results = await client.currencies()
      should.exist(results)
      results.length.should.be.above(0)
    })

    it('should get ticker', async () => {
      let { Bid, Ask, Last } = await client.ticker('BTC-XLM')
      should.exist(Bid)
      should.exist(Ask)
      should.exist(Last)
      Bid.should.be.above(0)
      Ask.should.be.above(0)
      Last.should.be.above(0)
    })

    it('should get market summaries', async () => {
      let results = await client.marketSummaries()
      should.exist(results)
      results.length.should.be.above(0)
    })

    it('should get market summary', async () => {
      let results = await client.marketSummary('BTC-XLM')
      should.exist(results)
      results.length.should.equal(1)
    })

    it('should get market history', async () => {
      let results = await client.marketHistory('BTC-XLM')
      should.exist(results)
      results.length.should.be.above(0)
    })

    it('should get order book', async () => {
      let { buy, sell } = await client.orderBook('BTC-XLM')
      should.exist(buy)
      should.exist(sell)
      buy.length.should.be.above(0)
      sell.length.should.be.above(0)
    })
  })

  describe('market', () => {
    let buyOrderId

    it('should get open orders', async () => {
      let results = await client.openOrders('BTC-XLM')
      should.exist(results)
      results.length.should.be.aboveOrEqual(0)
    })

    it('should place a buy limit order', async () => {
      let { uuid } = await client.buyLimit('BTC-ETH', { quantity: 50000, rate: 0.0000001 })
      should.exist(uuid)
      buyOrderId = uuid
    })

    it('should cancel an order', async () => {
      await client.cancelOrder(buyOrderId)
    })

    it('should attempt a sell limit order', async () => {
      try {
        let result = await client.sellLimit('BTC-ETH', { quantity: 50000, rate: 0.0000001 })
        should.not.exist(result)
      } catch (err) {
        should.exist(err)
        err.message.should.equal('INSUFFICIENT_FUNDS')
      }
    })
  })

  describe('account', () => {
    it('should get balances', async () => {
      let results = await client.balances()
      should.exist(results)
      results.length.should.be.aboveOrEqual(0)
    })

    it('should get balance', async () => {
      let { Balance } = await client.balance('BTC')
      should.exist(Balance)
      Balance.should.be.aboveOrEqual(0)
    })

    it('should get deposit address', async () => {
      let { Address } = await client.depositAddress('BTC')
      should.exist(Address)
    })

    it('should get order history', async () => {
      let results = await client.orderHistory('BTC-XLM')
      should.exist(results)
      results.length.should.be.aboveOrEqual(0)
    })

    it('should get withdrawl history', async () => {
      let results = await client.withdrawalHistory('BTC')
      should.exist(results)
      results.length.should.be.aboveOrEqual(0)
    })

    it('should get deposit history', async () => {
      let results = await client.depositHistory('BTC')
      should.exist(results)
      results.length.should.be.aboveOrEqual(0)
    })
  })
})
