const axios = require('axios')
const crypto = require('crypto')
const https = require('https')
const querystring = require('querystring')

class BittrexClient {

  /**
   * @constructor
   * @param {String} [options.apiKey=null]
   * @param {String} [options.apiSecret=null]
   * @param {Boolean} [options.keepAlive=true]
   */
  constructor({ apiKey = null, apiSecret = null, keepAlive = true } = {}) {
    this._apiKey = apiKey
    this._apiSecret = apiSecret
    this._nonce = Date.now()
    this._client = axios.create({
      baseURL: 'https://api.bittrex.com/v3',
      httpsAgent: new https.Agent({ keepAlive })
    })
  }

  /**
   * REFERENCE: https://bittrex.github.io/api/v3
   */

  /*-------------------------------------------------------------------------*
   * V3 ACCOUNT ENDPOINTS (8 endpoints)
   *-------------------------------------------------------------------------*/

  async account() {
    return this.request('get', '/account')
  }

  async accountFeesTrading(marketSymbol) {
    if (marketSymbol) {
      return this.request('get', '/account/fees/trading/' + marketSymbol)
    }
    return this.request('get', '/account/fees/trading')
  }

  async accountVolume() {
    return this.request('get', '/account/volume')
  }

  async accountPermissionsMarkets(marketSymbol) {
    if (marketSymbol) {
      return this.request('get', '/account/permissions/markets/' + marketSymbol)
    }
    return this.request('get', '/account/permissions/markets')
  }

  async accountPermissionsCurrencies(marketSymbol) {
    if (marketSymbol) {
      return this.request('get', '/account/permissions/currencies/' + marketSymbol)
    }
    return this.request('get', '/account/permissions/currencies')
  }

  /*-------------------------------------------------------------------------*
   * V3 ADDRESSES ENDPOINTS (3 endpoints)
   *-------------------------------------------------------------------------*/

  async addresses(marketSymbol) {
    if (marketSymbol) {
      return this.request('get', '/addresses/' + marketSymbol)
    }
    return this.request('get', '/addresses')
  }

  /*-------------------------------------------------------------------------*
   * Public
   *-------------------------------------------------------------------------*/

  /**
   * @method markets
   * @return {Promise}
   */
  async markets() {
    const results = await this.request('get', '/public/getmarkets')
    return this.parseDates(results, ['Created'])
  }

  /**
   * @method currencies
   * @return {Promise}
   */
  async currencies() {
    return this.request('get', '/public/getcurrencies')
  }

  /**
   * @method ticker
   * @param {String} market
   * @return {Promise}
   */
  async ticker(market) {
    if (!market) throw new Error('market is required')
    const params = { market }
    return this.request('get', '/public/getticker', { params })
  }

  /**
   * @method marketSummaries
   * @return {Promise}
   */
  async marketSummaries() {
    const results = await this.request('get', '/public/getmarketsummaries')
    return this.parseDates(results, ['TimeStamp', 'Created'])
  }

  /**
   * @method marketSummary
   * @param {String} market
   * @return {Promise}
   */
  async marketSummary(market) {
    if (!market) throw new Error('market is required')
    const params = { market }
    const results = await this.request('get', '/public/getmarketsummary', { params })
    return this.parseDates(results, ['TimeStamp', 'Created'])
  }

  /**
   * @method marketHistory
   * @param {String} market
   * @return {Promise}
   */
  async marketHistory(market) {
    if (!market) throw new Error('market is required')
    const params = { market }
    const results = await this.request('get', '/public/getmarkethistory', { params })
    return this.parseDates(results, ['TimeStamp'])
  }

  /**
   * @method orderBook
   * @param {String} market
   * @param {String} type
   * @return {Promise}
   */
  async orderBook(market, { type = 'both' } = {}) {
    if (!market) throw new Error('market is required')
    if (!type) throw new Error('options.type is required')
    const params = { market, type }
    return this.request('get', '/public/getorderbook', { params })
  }

  /*-------------------------------------------------------------------------*
   * Market
   *-------------------------------------------------------------------------*/

  /**
   * @method buyLimit
   * @param {String} market
   * @param {String|Number} options.quantity
   * @param {String|Number} options.price
   * @return {Promise}
   */
  async buyLimit(market, { quantity, rate, timeInForce = 'GTC' } = {}) {
    if (!market) throw new Error('market is required')
    if (!quantity) throw new Error('options.quantity is required')
    if (!rate) throw new Error('options.rate is required')
    if (timeInForce !== 'IOC' && timeInForce !== 'GTC') throw new Error('options.timeInForce not IOC or GTC')
    const params = {
      market,
      quantity: parseFloat(quantity).toFixed(8),
      rate: parseFloat(rate).toFixed(8),
      timeInForce
    }
    return this.request('get', '/market/buylimit', { params })
  }

  /**
   * @method sellLimit
   * @param {String} market
   * @param {String|Number} options.quantity
   * @param {String|Number} options.price
   * @return {Promise}
   */
  async sellLimit(market, { quantity, rate, timeInForce = 'GTC' } = {}) {
    if (!market) throw new Error('market is required')
    if (!quantity) throw new Error('options.quantity is required')
    if (!rate) throw new Error('options.rate is required')
    if (timeInForce !== 'IOC' && timeInForce !== 'GTC') throw new Error('options.timeInForce not IOC or GTC')

    const params = {
      market,
      quantity: parseFloat(quantity).toFixed(8),
      rate: parseFloat(rate).toFixed(8),
      timeInForce
    }
    return this.request('get', '/market/selllimit', { params })
  }

  /**
   * @method cancelOrder
   * @param {String} uuid
   * @return {Promise}
   */
  async cancelOrder(uuid) {
    if (!uuid) throw new Error('uuid is required')
    const params = { uuid }
    return this.request('get', '/market/cancel', { params })
  }

  /**
   * @method openOrders
   * @param {String} market
   * @return {Promise}
   */
  async openOrders(market) {
    const params = { market }
    const results = await this.request('get', '/market/getopenorders', { params })
    return this.parseDates(results, ['Opened'])
  }

  /*-------------------------------------------------------------------------*
   * Account
   *-------------------------------------------------------------------------*/

  /**
   * @method balances
   * @return {Promise}
   */
  async balances() {
    return this.request('get', '/account/getbalances')
  }

  /**
   * @method balance
   * @param {String} currency
   * @return {Promise}
   */
  async balance(currency) {
    if (!currency) throw new Error('currency is required')
    const params = { currency }
    return this.request('get', '/account/getbalance', { params })
  }

  /**
   * @method depositAddress
   * @param {String} currency
   * @return {Promise}
   */
  async depositAddress(currency) {
    if (!currency) throw new Error('currency is required')
    const params = { currency }
    return this.request('get', '/account/getdepositaddress', { params })
  }

  /**
   * @method withdraw
   * @param {String} currency
   * @param {String|Number} options.quantity
   * @param {String} options.address
   * @param {String} [options.paymentid]
   * @return {Promise}
   */
  async withdraw(currency, { quantity, address, paymentid } = {}) {
    if (!currency) throw new Error('currency is required')
    if (!quantity) throw new Error('options.quantity is required')
    if (!address) throw new Error('options.address is required')
    const params = { currency, quantity, address, paymentid }
    return this.request('get', '/account/withdraw', { params })
  }

  /**
   * @method orderHistory
   * @param {String} market
   * @return {Promise}
   */
  async orderHistory(market) {
    const params = { market }
    const results = await this.request('get', '/account/getorderhistory', { params })
    return this.parseDates(results, ['TimeStamp', 'Closed'])
  }

  /**
   * @method order
   * @param {String} uuid
   * @return {Promise}
   */
  async order(uuid) {
    if (!uuid) throw new Error('uuid is required')
    const params = { uuid }
    const result = await this.request('get', '/account/getorder', { params })
    return this.parseDates([result], ['Opened', 'Closed'])[0]
  }

  /**
   * @method withdrawalHistory
   * @param {String} [currency]
   * @return {Promise}
   */
  async withdrawalHistory(currency) {
    const params = { currency }
    const results = await this.request('get', '/account/getwithdrawalhistory', { params })
    return this.parseDates(results, ['LastUpdated'])
  }

  /**
   * @method depositHistory
   * @param {String} [currency]
   * @return {Promise}
   */
  async depositHistory(currency) {
    const params = { currency }
    const results = await this.request('get', '/account/getdeposithistory', { params })
    return this.parseDates(results, ['LastUpdated'])
  }

  /*-------------------------------------------------------------------------*
   * Private
   *-------------------------------------------------------------------------*/

  /**
   * @private
   * @method request
   * @param {String} method
   * @param {String} url
   * @param {Object} [options.data]
   * @param {Object} [options.params]
   */
  async request(method, url, { headers = {}, params = {}, body } = {}) {
    params = this.sanitizeParams(params)

    if (this._apiKey) {
      const nonce = Date.now()
      const contentHash = crypto.createHash('sha512').update(body ? JSON.stringify(body) : '').digest('hex')
      headers['Api-Key'] = this._apiKey
      headers['Api-Timestamp'] = nonce
      headers['Api-Content-Hash'] = contentHash
      headers['Api-Signature'] = this.requestSignature(nonce, url, method, contentHash, params)
    }

    const { data } = await this._client.request({ method, url, headers, params, data: body }).catch(err => {
      if (err.isAxiosError) {
        return err.response
      } else {
        throw err
      }
    })

    if (data.code) {
      throw new Error(data.code)
    }

    return data
  }

  /**
   * @private
   * @method requestSignature
   * @param {String} url
   * @return {String}
   */
  requestSignature(nonce, path, method, contentHash, params) {
    const query = querystring.stringify(params)
    const url = `${this._client.defaults.baseURL}${path}${query ? '?' + query : ''}`
    const preSign = [nonce, url, method.toUpperCase(), contentHash, ''].join('')
    const hmac = crypto.createHmac('sha512', this._apiSecret)
    return hmac.update(preSign).digest('hex')
  }

  /**
   * @private
   * @method sanitizeParams
   * @param {Object} params
   * @return {Object}
   */
  sanitizeParams(params = {}) {
    const obj = {}
    for (const key of Object.keys(params)) {
      if (params[key] === undefined) continue
      obj[key] = params[key]
    }
    return obj
  }

  /**
   * @private
   * @method parseDates
   * @param {Array<Object>} results
   * @param {Array<String>} keys
   * @return {Array<Object>}
   */
  parseDates(results, keys) {
    for (const result of results) {
      for (const key of keys) {
        if (!result[key]) continue
        result[key] = new Date(`${result[key]}Z`)
      }
    }
    return results
  }
}

module.exports = BittrexClient
