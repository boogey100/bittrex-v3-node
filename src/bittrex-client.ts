import axios, { AxiosInstance, Method } from 'axios'
import * as crypto from 'crypto'
import * as https from 'https'
import * as querystring from 'querystring'

interface NewOrder {
  marketSymbol: string
  direction: 'buy' | 'sell'
  type: 'limit' | 'market' | 'ceiling_limit' | 'ceiling_market'
  quantity?: number
  ceiling?: number
  limit?: number
  timeInForce: 'good_til_cancelled' | 'immediate_or_cancel' | 'fill_or_kill' | 'post_only_good_til_cancelled' | 'buy_now' | 'instant'
  clientOrderId?: string
  useAwards: boolean
}

interface DeleteOrder {
  id: string
}

interface BatchSchemaDelete {
  resource: 'order'
  operation: 'delete'
  payload: DeleteOrder
}
interface BatchSchemaPost {
  resource: 'order'
  operation: 'post'
  payload: NewOrder
}
type BatchSchema = BatchSchemaDelete | BatchSchemaPost

type BatchSchemaBody = BatchSchema[]

class BittrexClient {

  private _apiKey: string
  private _apiSecret: string
  private _client: AxiosInstance

  constructor({ apiKey = '', apiSecret = '', keepAlive = true }: {
    apiKey: string,
    apiSecret: string,
    keepAlive: boolean
  }) {
    this._apiKey = apiKey
    this._apiSecret = apiSecret

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

  /**
   * Retrieve information for the account associated with the request.
   * For now, it only echoes the subaccount if one was specified in the header,
   * which can be used to verify that one is operating on the intended account.
   * More fields will be added later.
   * @returns {Promise}
   */
  async account() {
    return this.request<{
      accountId: string
    }>('get', '/account')
  }

  /**
   * Get trade fee for the given marketSymbol.
   * Get trade fees for each markets when marketSymbol is not provided.
   * @param {string} marketSymbol 
   * @returns {Promise}
   */
  async accountFeesTrading(): Promise<{
    marketSymbol: string, makerRate: string, takerRate: string
  }[]>;
  async accountFeesTrading(marketSymbol: string): Promise<{
    marketSymbol: string, makerRate: string, takerRate: string
  }>;
  async accountFeesTrading(marketSymbol?: string) {
    if (marketSymbol) {
      return this.request('get', '/account/fees/trading/' + marketSymbol)
    }
    return this.request('get', '/account/fees/trading')
  }

  /**
   * Get 30 day volume for account
   * @returns {Promise}
   */
  async accountVolume() {
    return this.request<{
      updated: string
      volume30days: string
    }>('get', '/account/volume')
  }

  /**
   * Get trading permissions when marketSymbol is not provided.
   * Get trading permissions for a single market.
   * @param {string} marketSymbol 
   * @returns {Promise}
   */
  async accountPermissionsMarkets(marketSymbol?: string): Promise<{
    symbol: string, view: boolean, buy: boolean, sell: boolean
  }[]> {
    if (marketSymbol) {
      return this.request('get', '/account/permissions/markets/' + marketSymbol)
    }
    return this.request('get', '/account/permissions/markets')
  }

  /**
   * Get currency permissions for a single currency.
   * Get all currency permissions when marketSymbol is not provided.
   * @param {string} marketSymbol 
   * @returns {Promise}
   */
  async accountPermissionsCurrencies(marketSymbol?: string): Promise<{
    symbol: string,
    view: boolean,
    deposit: {
      blockchain?: boolean
      creditCard?: boolean
      wireTransfer?: boolean
      ach?: boolean
    },
    withdraw: {
      blockchain?: boolean
      wireTransfer?: boolean
      ach?: boolean
    }
  }[]> {
    if (marketSymbol) {
      return this.request('get', '/account/permissions/currencies/' + marketSymbol)
    }
    return this.request('get', '/account/permissions/currencies')
  }

  /*-------------------------------------------------------------------------*
   * V3 ADDRESSES ENDPOINTS (3 endpoints)
   *-------------------------------------------------------------------------*/

  /**
   * List deposit addresses that have been requested or provisioned.
   * Retrieve the status of the deposit address for a particular currency for which one has been requested or provisioned.
   * @param {string} marketSymbol 
   * @returns {Promise}
   */
  async addresses(): Promise<{
    status: 'REQUESTED' | 'PROVISIONED',
    currencySymbol: string,
    cryptoAddress: string,
    cryptoAddressTag?: string
  }[]>
  async addresses(marketSymbol: string): Promise<{
    status: 'REQUESTED' | 'PROVISIONED',
    currencySymbol: string,
    cryptoAddress: string,
    cryptoAddressTag?: string
  }>
  async addresses(marketSymbol?: string) {
    if (marketSymbol) {
      return this.request('get', '/addresses/' + marketSymbol)
    }
    return this.request('get', '/addresses')
  }

  async addressStatus(marketSymbol: string) {
    return this.addresses(marketSymbol);
  }

  /**
   * Request provisioning of a deposit address for a currency
   * for which no address has been requested or provisioned.
   * @param {string} marketSymbol 
   * @returns {Promise}
   */
  async addressCreate(marketSymbol: string): Promise<{
    status: 'REQUESTED' | 'PROVISIONED',
    currencySymbol: string,
    cryptoAddress: string,
    cryptoAddressTag?: string
  }> {
    return this.request('post', '/addresses', {
      body: {
        currencySymbol: marketSymbol
      }
    })
  }

  /*-------------------------------------------------------------------------*
   * V3 BALANCES ENDPOINTS (3 endpoints)
   *-------------------------------------------------------------------------*/

  /**
   * List account balances across available currencies.
   * Returns a Balance entry for each currency for which there
   * is either a balance or an address.
   * @returns {Promise}
   */
  async getBalances(): Promise<{
    currencySymbol: string,
    total: string
    available: string
    updatedAt: string
  }[]> {
    return this.request('get', '/balances');
  }

  /**
   * Retrieve account balance for a specific currency.
   * Request will always succeed when the currency exists,
   * regardless of whether there is a balance or address.
   * @param {string} marketSymbol 
   * @returns {Promise}
   */
  async getBalance(marketSymbol: string): Promise<{
    currencySymbol: string,
    total: string
    available: string
    updatedAt: string
  }> {
    return this.request('get', '/balances/' + marketSymbol);
  }

  /**
   * Get sequence of balances snapshot.
   * @returns {Promise}
   */
  async balanceSnapshot() {
    return this.request('head', '/balances')
  }

  /*-------------------------------------------------------------------------*
   * V3 BATCH ENDPOINTS (1 endpoint)
   *-------------------------------------------------------------------------*/

  async createBatch(payload: BatchSchemaBody): Promise<{
    status: number
    payload: any
  }[]> {
    return this.request('post', '/batch', {
      body: payload
    })
  }
  /*-------------------------------------------------------------------------*
   * V3 ConditionalOrders ENDPOINTS (6 endpoints)
   *-------------------------------------------------------------------------*/
  /*-------------------------------------------------------------------------*
   * V3 CURRENCIES ENDPOINTS (2 endpoints)
   *-------------------------------------------------------------------------*/
  async currencies(): Promise<{
    symbol: string
    name: string
    coinType: string
    status: 'online' | 'offline'
    minConfirmations: number
    notice: string
    txFee: number
    logoUrl: string
    prohibitedIn: string[]
    baseAddress: string
    associatedTermsOfService: string[]
    tags: string[]
  }[]>;
  async currencies(marketSymbol: string): Promise<{
    symbol: string
    name: string
    coinType: string
    status: 'online' | 'offline'
    minConfirmations: number
    notice: string
    txFee: number
    logoUrl: string
    prohibitedIn: string[]
    baseAddress: string
    associatedTermsOfService: string[]
    tags: string[]
  }>;
  async currencies(marketSymbol?: string) {
    if (marketSymbol) {
      return this.request('get', '/currencies/' + marketSymbol)
    }
    return this.request('get', '/currencies');
  }
  /*-------------------------------------------------------------------------*
   * V3 DEPOSITS ENDPOINTS (5 endpoints)
   *-------------------------------------------------------------------------*/
  /*-------------------------------------------------------------------------*
   * V3 EXECUTIONS ENDPOINTS (4 endpoints)
   *-------------------------------------------------------------------------*/
  /*-------------------------------------------------------------------------*
   * V3 FundsTransferMethods ENDPOINTS (1 endpoints)
   *-------------------------------------------------------------------------*/
  /*-------------------------------------------------------------------------*
   * V3 Markets ENDPOINTS (15 endpoints)
   *-------------------------------------------------------------------------*/
  async markets() {
    const results = await this.request('get', '/markets')
    return this.parseDates(results, ['createdAt'])
  }

  async marketsSummaries() {
    const results = await this.request('get', '/markets/summaries')
    return this.parseDates(results, ['updatedAt'])
  }

  async headMarketsSummaries() {
    return this.request('head', '/markets/summaries')
  }

  async marketsTickers() {
    return this.request('get', '/markets/tickers')
  }

  async headMarketsTickers() {
    return this.request('head', '/markets/tickers')
  }

  async marketTicker(marketSymbol: string) {
    return this.request('get', '/markets/' + marketSymbol + '/ticker')
  }

  async market(marketSymbol: string) {
    return this.request('get', '/markets/' + marketSymbol)
  }

  async marketSummary(marketSymbol: string) {
    return this.request('get', '/markets/' + marketSymbol + '/summary')
  }

  async marketOrderBook(marketSymbol: string, depth?: number) {
    return this.request('get', '/markets/' + marketSymbol + '/orderbook', { params: { depth } })
  }

  async headMarketOrderBook(marketSymbol: string, depth?: number) {
    return this.request('head', '/markets/' + marketSymbol + '/orderbook', { params: { depth } })
  }

  async marketTrades(marketSymbol: string) {
    return this.request('head', '/markets/' + marketSymbol + '/trades')
  }

  async marketCandles(marketSymbol: string, candleInterval: 'MINUTE_1' | 'MINUTE_5' | 'HOUR_1' | 'DAY_1', candleType?: 'TRADE' | 'MIDPOINT') {
    return this.request('get', '/markets/' + marketSymbol + '/candles/' + candleType + '/' + candleInterval + '/recent')
  }

  async headMarketCandles(marketSymbol: string, candleInterval: 'MINUTE_1' | 'MINUTE_5' | 'HOUR_1' | 'DAY_1', candleType?: 'TRADE' | 'MIDPOINT') {
    return this.request('head', '/markets/' + marketSymbol + '/candles/' + candleType + '/' + candleInterval + '/recent')
  }

  async marketCandlesDate(marketSymbol: string, candleInterval: 'MINUTE_1' | 'MINUTE_5' | 'HOUR_1' | 'DAY_1', year: number, candleType?: 'TRADE' | 'MIDPOINT', month?: number, day?: number) {
    return this.request('get', '/markets/' + marketSymbol + '/candles/' + candleType + '/' + candleInterval + '/historical/' + year + (month && '/' + month) + (day && '/' + day))
  }

  /*-------------------------------------------------------------------------*
   * V3 Orders ENDPOINTS (8 endpoints)
   *-------------------------------------------------------------------------*/
  /*-------------------------------------------------------------------------*
   * V3 Ping ENDPOINTS (1 endpoints)
   *-------------------------------------------------------------------------*/

  async ping() {
    return this.request('get', '/ping');
  }
  /*-------------------------------------------------------------------------*
   * V3 Subaccounts ENDPOINTS (7 endpoints)
   *-------------------------------------------------------------------------*/
  /*-------------------------------------------------------------------------*
   * V3 Transfers ENDPOINTS (4 endpoints)
   *-------------------------------------------------------------------------*/
  /*-------------------------------------------------------------------------*
   * V3 Withdrawals ENDPOINTS (7 endpoints)
   *-------------------------------------------------------------------------*/

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
  async buyLimit(market: string, { quantity, rate, timeInForce = 'GTC' }: any = {}) {
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
  async sellLimit(market: string, { quantity, rate, timeInForce = 'GTC' }: any = {}) {
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
  async cancelOrder(uuid: string) {
    if (!uuid) throw new Error('uuid is required')
    const params = { uuid }
    return this.request('get', '/market/cancel', { params })
  }

  /**
   * @method openOrders
   * @param {String} market
   * @return {Promise}
   */
  async openOrders(market: string) {
    const params = { market }
    const results = await this.request('get', '/market/getopenorders', { params })
    return this.parseDates(results, ['Opened'])
  }

  /*-------------------------------------------------------------------------*
   * Account
   *-------------------------------------------------------------------------*/

  /**
   * @method withdraw
   * @param {String} currency
   * @param {String|Number} options.quantity
   * @param {String} options.address
   * @param {String} [options.paymentid]
   * @return {Promise}
   */
  async withdraw(currency: string, { quantity, address, paymentid }: any = {}) {
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
  async orderHistory(market: string) {
    const params = { market }
    const results = await this.request('get', '/account/getorderhistory', { params })
    return this.parseDates(results, ['TimeStamp', 'Closed'])
  }

  /**
   * @method order
   * @param {String} uuid
   * @return {Promise}
   */
  async order(uuid: string) {
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
  async withdrawalHistory(currency: string) {
    const params = { currency }
    const results = await this.request('get', '/account/getwithdrawalhistory', { params })
    return this.parseDates(results, ['LastUpdated'])
  }

  /**
   * @method depositHistory
   * @param {String} [currency]
   * @return {Promise}
   */
  async depositHistory(currency: string) {
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
  private async request<R>(method: Method, url: string, { headers = {}, params = {}, body = '' }: any = {}): Promise<R> {
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
  private requestSignature(nonce: number, path: string, method: Method, contentHash: string, params: any) {
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
  private sanitizeParams(params: any = {}) {
    const obj: any = {}
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
  private parseDates(results: any, keys: string[]) {
    for (const result of results) {
      for (const key of keys) {
        if (!result[key]) continue
        result[key] = new Date(`${result[key]}`)
      }
    }
    return results
  }
}

export default BittrexClient
