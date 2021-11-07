import axios, { AxiosInstance, Method } from 'axios'
import * as crypto from 'crypto'
import * as https from 'https'
import * as querystring from 'querystring'
import * as BTT from './bittrex-types'

class BittrexClient {
  private _apiKey: string
  private _apiSecret: string
  private _client: AxiosInstance

  /**
   * Create a new client instance with API Keys
   * @param param0 
   */
  constructor({ apiKey, apiSecret, keepAlive = true }: {
    apiKey: string,
    apiSecret: string,
    keepAlive?: boolean
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

  //#region V3 ACCOUNT ENDPOINTS (8 endpoints)

  /**
   * Retrieve information for the account associated with the request.
   * For now, it only echoes the subaccount if one was specified in the header,
   * which can be used to verify that one is operating on the intended account.
   * More fields will be added later.
   * @returns {Promise}
   */
  async account(): Promise<BTT.Account> {
    return this.request('get', '/account')
  }

  /**
   * Get trade fee for the given marketSymbol.
   * Get trade fees for each markets when marketSymbol is not provided.
   * @param {string} marketSymbol 
   * @returns {Promise}
   */
  async accountFeesTrading(): Promise<BTT.CommissionRatesWithMarket[]>;
  /**
   * Get trade fee for the given marketSymbol.
   * @param marketSymbol 
   */
  async accountFeesTrading(marketSymbol: string): Promise<BTT.CommissionRatesWithMarket>;
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
  async accountVolume(): Promise<BTT.AccountVolume> {
    const result = await this.request('get', '/account/volume')
    return this.parseDates(result, ['updated'])
  }

  /**
   * Get trading permissions when marketSymbol is not provided.
   * Get trading permissions for a single market.
   * @param {string} marketSymbol 
   * @returns {Promise}
   */
  async accountPermissionsMarkets(marketSymbol?: string): Promise<BTT.MarketPolicy[]> {
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
  async accountPermissionsCurrencies(marketSymbol?: string): Promise<BTT.CurrencyPolicy[]> {
    if (marketSymbol) {
      return this.request('get', '/account/permissions/currencies/' + marketSymbol)
    }
    return this.request('get', '/account/permissions/currencies')
  }

  //#endregion

  //#region V3 ADDRESSES ENDPOINTS (3 endpoints)

  /**
   * List deposit addresses that have been requested or provisioned.
   * Retrieve the status of the deposit address for a particular currency for which one has been requested or provisioned.
   * @param {string} marketSymbol 
   * @returns {Promise}
   */
  async addresses(): Promise<BTT.Address[]>
  /**
   * Retrieve the status of the deposit address for a particular currency for which one has been requested or provisioned.
   * Alias of addressesStatus(marketSymbol)
   * @param marketSymbol symbol of the currency to retrieve the deposit address for
   * @returns 
   */
  async addresses(marketSymbol: string): Promise<BTT.Address>
  async addresses(marketSymbol?: string) {
    if (marketSymbol) {
      return this.request('get', '/addresses/' + marketSymbol)
    }
    return this.request('get', '/addresses')
  }

  /**
   * Retrieve the status of the deposit address for a particular currency for which one has been requested or provisioned.
   * Alias of addresses(marketSymbol)
   * @param marketSymbol symbol of the currency to retrieve the deposit address for
   * @returns 
   */
  async addressStatus(marketSymbol: string) {
    return this.addresses(marketSymbol);
  }

  /**
   * Request provisioning of a deposit address for a currency
   * for which no address has been requested or provisioned.
   * @param {string} marketSymbol 
   * @returns {Promise}
   */
  async addressCreate(marketSymbol: string): Promise<BTT.Address> {
    return this.request('post', '/addresses', {
      body: {
        currencySymbol: marketSymbol
      }
    })
  }

  //#endregion

  //#region V3 BALANCES ENDPOINTS (3 endpoints)

  /**
   * List account balances across available currencies.
   * Returns a Balance entry for each currency for which there
   * is either a balance or an address.
   * @returns {Promise}
   */
  async balances(): Promise<BTT.Balance[]> {
    const results = await this.request('get', '/balances');
    return this.parseDates(results, ['updatedAt'])
  }

  /**
   * Retrieve account balance for a specific currency.
   * Request will always succeed when the currency exists,
   * regardless of whether there is a balance or address.
   * @param {string} marketSymbol 
   * @returns {Promise}
   */
  async balance(marketSymbol: string): Promise<BTT.Balance> {
    const results = await this.request('get', '/balances/' + marketSymbol);
    return this.parseDates(results, ['updatedAt'])
  }

  /**
   * Get sequence of balances snapshot.
   * @returns {Promise}
   */
  async headBalances(): Promise<void> {
    return this.request('head', '/balances')
  }

  //#endregion

  //#region V3 BATCH ENDPOINTS (1 endpoint)

  /**
   * Create a new batch request.
   * Currently batch requests are limited to placing and cancelling orders.
   * The request model corresponds to the equivalent individual operations.
   * Batch operations are executed sequentially in the order
   * they are listed in the request.
   * The response will return one result for each operation in the request
   * in the same order.
   * The status and response payload are the same as the responses
   * would be if individual API requests were made for each operation.
   * @param payload List of operations in the batch
   * @returns 
   */
  async batch(payload: BTT.BatchSchemaBody): Promise<{
    status: number
    payload: any
  }[]> {
    return this.request('post', '/batch', { body: payload })
  }

  //#endregion

  //#region V3 ConditionalOrders ENDPOINTS (6 endpoints)
  /**
   * Retrieve information on a specific conditional order.
   * @param conditionalOrderId (uuid-formatted string) - ID of conditional order to retrieve
   * @returns 
   */
  async conditionalOrders(conditionalOrderId: string): Promise<BTT.ConditionalOrder> {
    const results = await this.request('get', '/conditional-orders/' + conditionalOrderId)
    return this.parseDates(results, ['createdAt', 'updatedAt', 'closedAt'])
  }

  /**
   * Cancel a conditional order.
   * @param conditionalOrderId (uuid-formatted string) - ID of order to cancel
   * @returns 
   */
  async conditionalOrderDelete(conditionalOrderId: string): Promise<BTT.ConditionalOrder> {
    const results = await this.request('delete', '/conditional-orders/' + conditionalOrderId)
    return this.parseDates(results, ['createdAt', 'updatedAt', 'closedAt'])
  }

  /**
   * List closed conditional orders.
   * StartDate and EndDate filters apply to the ClosedAt field.
   * Pagination and the sort order of the results are in inverse
   * order of the ClosedAt field.
   * @param props 
   * @returns 
   */
  async conditionalOrdersClosed(props?: {
    marketSymbol: string
    nextPageToken: string
    previousPageToken: string
    pageSize: number
    startDate: string
    endDate: string
  }): Promise<BTT.ConditionalOrder[]> {
    const results = await this.request('get', '/conditional-orders/closed', { params: props })
    return this.parseDates(results, ['createdAt', 'updatedAt', 'closedAt'])
  }

  /**
   * List open conditional orders.
   * @param marketSymbol filter by market (optional)
   * @returns 
   */
  async conditionalOrdersOpen(marketSymbol?: string): Promise<BTT.ConditionalOrder[]> {
    const results = await this.request('get', '/conditional-orders/open', { params: { marketSymbol } })
    return this.parseDates(results, ['createdAt', 'updatedAt', 'closedAt'])
  }

  /**
   * Get sequence of open conditional orders snapshot.
   * @returns 
   */
  async headConditionalOrdersOpen(): Promise<void> {
    return this.request('head', '/conditional-orders/open')
  }

  /**
   * Create a new conditional order.
   * @param newConditionalOrder information specifying the conditional order to create
   * @returns 
   */
  async conditionalOrdersCreate(newConditionalOrder: BTT.NewConditionalOrder): Promise<BTT.ConditionalOrder> {
    const results = await this.request('post', '/conditional-orders', { body: newConditionalOrder })
    return this.parseDates(results, ['createdAt', 'updatedAt', 'closedAt'])
  }

  //#endregion

  //#region V3 CURRENCIES ENDPOINTS (2 endpoints)
  /**
   * List currencies.
   */
  async currencies(): Promise<BTT.Currency[]>;
  /**
   * Retrieve info on a specified currency.
   * @param marketSymbol symbol of the currency to retrieve
   */
  async currencies(marketSymbol: string): Promise<BTT.Currency>;
  async currencies(marketSymbol?: any) {
    if (marketSymbol) {
      return this.request('get', '/currencies/' + marketSymbol)
    }
    return this.request('get', '/currencies');
  }
  //#endregion

  //#region V3 DEPOSITS ENDPOINTS (5 endpoints)
  /**
   * List open deposits.
   * Results are sorted in inverse order of UpdatedAt,
   * and are limited to the first 1000.
   * @param props 
   * @returns 
   */
  async depositsOpen(props?: {
    status: string
    currencySymbol: string
  }): Promise<BTT.Deposit[]> {
    const results = await this.request('get', '/deposits/open', { params: props })
    return this.parseDates(results, ['updatedAt', 'completedAt'])
  }

  /**
   * Get open deposits sequence.
   * @returns {Promise}
   */
  async headDepositsOpen(): Promise<void> {
    return this.request('head', '/deposits/open')
  }

  /**
   * List closed deposits.
   * StartDate and EndDate filters apply to the CompletedAt field.
   * Pagination and the sort order of the results are in inverse
   * order of the CompletedAt field.
   * @returns 
   */
  async depositsClosed(props?: {
    status?: 'completed' | 'orphaned' | 'invalidated'
    currencySymbol?: string
    nextPageToken?: string
    previousPageToken?: string
    pageSize?: number
    startSate?: string
    endDate?: string
  }): Promise<BTT.Deposit[]> {
    const results = await this.request('get', '/deposits/closed', { params: props })
    return this.parseDates(results, ['updatedAt', 'completedAt'])
  }

  /**
   * Retrieves all deposits for this account with the given TxId
   * @param txId the transaction id to lookup
   * @returns 
   */
  async depositsByTxId(txId: string): Promise<BTT.Deposit[]> {
    const results = await this.request('get', '/deposits/ByTxId/' + txId)
    return this.parseDates(results, ['updatedAt', 'completedAt'])
  }

  /**
   * Retrieve information for a specific deposit.
   * @param depositId (uuid-formatted string) - ID of the deposit to retrieve
   * @returns 
   */
  async deposits(depositId: string) {
    return this.request('get', '/deposits/' + depositId)
  }

  //#endregion

  //#region V3 EXECUTIONS ENDPOINTS (4 endpoints)
  /**
   * Retrieve information on a specific execution.
   * NOTE: Executions from before 5/27/2019 are not available.
   * Also, there may be a delay before an executed trade is visible in this endpoint.
   * @param executionId (uuid-formatted string) - ID of execution to retrieve
   */
  async executions(executionId: string): Promise<BTT.Execution>;
  /**
   * List historical executions for account.
   * Pagination and the sort order of the results are
   * in inverse order of the Executed field.
   * 
   * NOTE: Executions from before 5/27/2019 are not available.
   * Also, there may be a delay before an executed trade
   * is visible in this endpoint.
   * @param props 
   */
  async executions(props: BTT.ExecutionsRequestParams): Promise<BTT.Execution[]>;
  async executions(props: any) {
    let results
    if (typeof props === 'string') {
      results = await this.request('get', '/executions/' + props)
    } else {
      results = await this.request('get', '/executions', { params: props });
    }
    return this.parseDates(results, ['executedAt'])
  }

  /**
   * Gets sequence number and last execution id.
   * @returns {Promise}
   */
  async executionLastId(): Promise<BTT.ExecutionLastId> {
    return this.request('get', '/executions/last-id')
  }

  /**
   * Get sequence number for executions.
   * @returns 
   */
  async headExecutionLastId(): Promise<void> {
    return this.request('head', '/executions/last-id')
  }

  //#endregion

  //#region V3 FundsTransferMethods ENDPOINTS (1 endpoints)
  /**
   * Get details about a linked bank account
   * @param fundsTransferMethodId (uuid-formatted string) - ID of funds transfer method to retrieve
   * @returns 
   */
  async fundsTransferMethods(fundsTransferMethodId: string): Promise<BTT.FundsTransferMethod> {
    return this.request('get', '/funds-transfer-methods/' + fundsTransferMethodId)
  }

  //#endregion

  //#region V3 Markets ENDPOINTS (15 endpoints)

  /**
   * List markets.
   * @returns 
   */
  async markets(): Promise<BTT.Market[]> {
    const results = await this.request('get', '/markets')
    return this.parseDates(results, ['createdAt'])
  }

  /**
   * List summaries of the last 24 hours of activity for all markets.
   * @returns 
   */
  async marketsSummaries(): Promise<BTT.MarketSummary[]> {
    const results = await this.request('get', '/markets/summaries')
    return this.parseDates(results, ['updatedAt'])
  }

  /**
   * Retrieve the current sequence number for the market summaries snapshot.
   * @returns 
   */
  async headMarketsSummaries(): Promise<void> {
    return this.request('head', '/markets/summaries')
  }

  /**
   * List tickers for all markets.
   * @returns 
   */
  async marketsTickers(): Promise<BTT.Ticker[]> {
    return this.request('get', '/markets/tickers')
  }

  /**
   * Retrieve the current sequence number for the tickers snapshot.
   * @returns 
   */
  async headMarketsTickers(): Promise<void> {
    return this.request('head', '/markets/tickers')
  }

  /**
   * Retrieve the ticker for a specific market.
   * @param marketSymbol symbol of market to retrieve ticker for
   * @returns 
   */
  async marketTicker(marketSymbol: string): Promise<BTT.Ticker> {
    return this.request('get', '/markets/' + marketSymbol + '/ticker')
  }

  /**
   * Retrieve information for a specific market.
   * @param marketSymbol symbol of market to retrieve
   * @returns 
   */
  async market(marketSymbol: string): Promise<BTT.Market> {
    const results = await this.request('get', '/markets/' + marketSymbol)
    return this.parseDates(results, ['createdAt'])
  }

  /**
   * Retrieve summary of the last 24 hours of activity for a specific market.
   * @param marketSymbol symbol of market to retrieve summary for
   * @returns 
   */
  async marketSummary(marketSymbol: string): Promise<BTT.MarketSummary> {
    const results = await this.request('get', '/markets/' + marketSymbol + '/summary')
    return this.parseDates(results, ['updatedAt'])
  }

  /**
   * Retrieve the order book for a specific market.
   * @param marketSymbol symbol of market to retrieve order book for
   * @param depth maximum depth of order book to return (optional, allowed values are [1, 25, 500], default is 25)
   * @returns 
   */
  async marketOrderBook(marketSymbol: string, depth?: number): Promise<BTT.OrderBook> {
    if (depth && ![1, 25, 500].includes(depth)) {
      throw Error('DEPTH_INVALID')
    }
    return this.request('get', '/markets/' + marketSymbol + '/orderbook', { params: { depth } })
  }

  /**
   * Retrieve the current sequence number for the specified market's order book snapshot.
   * @param marketSymbol symbol of market to retrieve order book for
   * @param depth maximum depth of order book to return (optional, allowed values are [1, 25, 500], default is 25)
   * @returns 
   */
  async headMarketOrderBook(marketSymbol: string, depth?: number): Promise<void> {
    return this.request('head', '/markets/' + marketSymbol + '/orderbook', { params: { depth } })
  }

  /**
   * Retrieve the recent trades for a specific market.
   * @param marketSymbol symbol of market to retrieve recent trades for
   * @returns 
   */
  async marketTrades(marketSymbol: string): Promise<BTT.Trade[]> {
    const results = await this.request('get', '/markets/' + marketSymbol + '/trades')
    return this.parseDates(results, ['executedAt'])
  }

  /**
   * Retrieve the current sequence number for the specified market's recent trades snapshot.
   * @param marketSymbol symbol of market to retrieve order book for
   * @returns 
   */
  async headMarketTrades(marketSymbol: string): Promise<void> {
    return this.request('head', '/markets/' + marketSymbol + '/trade')
  }

  /**
   * Retrieve recent candles for a specific market and candle interval.
   * The maximum age of the returned candles
   * depends on the interval as follows:
   * (MINUTE_1: 1 day, MINUTE_5: 1 day, HOUR_1: 31 days, DAY_1: 366 days).
   * Candles for intervals without any trading activity
   * will match the previous close and volume will be zero.
   * @param marketSymbol symbol of market to retrieve candles for
   * @param candleInterval desired time interval between candles
   * @param candleType type of candles (trades or midpoint). This portion of the url may be omitted if trade based candles are desired (e.g. /candles/{candleInterval}/recent will return trade based candles)
   * @returns 
   */
  async marketCandles(marketSymbol: string, candleInterval: 'MINUTE_1' | 'MINUTE_5' | 'HOUR_1' | 'DAY_1', candleType?: 'TRADE' | 'MIDPOINT'): Promise<BTT.Candle[]> {
    const results = await this.request('get', '/markets/' + marketSymbol + '/candles/' + (!!candleType ? candleType + '/' : '') + candleInterval + '/recent')
    return this.parseDates(results, ['startsAt'])
  }

  /**
   * Retrieve the current sequence number for the specified market's candles snapshot.
   * @param marketSymbol symbol of market to retrieve candles for
   * @param candleInterval desired time interval between candles
   * @param candleType type of candles (trades or midpoint). This portion of the url may be omitted if trade based candles are desired (e.g. /candles/{candleInterval}/recent will return trade based candles)
   * @returns 
   */
  async headMarketCandles(marketSymbol: string, candleInterval: 'MINUTE_1' | 'MINUTE_5' | 'HOUR_1' | 'DAY_1', candleType?: 'TRADE' | 'MIDPOINT'): Promise<void> {
    return this.request('head', '/markets/' + marketSymbol + '/candles/' + (!!candleType ? candleType + '/' : '') + candleInterval + '/recent')
  }

  /**
   * Retrieve recent candles for a specific market and candle interval.
   * The date range of returned candles depends on the interval as follows:
   * (MINUTE_1: 1 day, MINUTE_5: 1 day, HOUR_1: 31 days, DAY_1: 366 days).
   * Candles for intervals without any trading activity
   * will match the previous close and volume will be zero.
   * 
   * WARNING: (Not documented in the official API).
   * The optional params are not arbitrary, are not really "optional".
   * 
   * If you specify YEAR, MONTH and DAY, interval must be DAY_1
   * 
   * If you specify YEAR and MONTH (omit day), interval must be HOUR_1
   * 
   * If you only specify YEAR (omit month and day), interval must be MINUTE_1 or MINUTE_5
   * 
   * In the future: Overload function to lock fixed params depending on the candleInterval value to avoid api call errors.
   * 
   * @param marketSymbol symbol of market to retrieve candles for
   * @param candleInterval desired time interval between candles
   * @param year desired year to start from
   * @param candleType type of candles (trades or midpoint). This portion of the url may be omitted if trade based candles are desired (e.g. /candles/{candleInterval}/historical/{year} will return trade based candles)
   * @param month desired month to start from (if applicable)
   * @param day desired day to start from (if applicable)
   * @returns 
   */
  async marketCandlesDate(marketSymbol: string, candleInterval: 'MINUTE_1' | 'MINUTE_5' | 'HOUR_1' | 'DAY_1', year: number, candleType?: 'TRADE' | 'MIDPOINT', month?: number, day?: number): Promise<BTT.Candle[]> {
    if (!year) throw Error('Invalid year')
    if (!month && candleInterval !== 'DAY_1') throw Error('Years can only be DAY_1 interval')
    if (year && month && !day && candleInterval !== 'HOUR_1') throw Error('Year+month can only be HOUR_1 interval')
    if (day && (candleInterval !== 'MINUTE_1' && candleInterval !== 'MINUTE_5')) throw Error('Year+month+day and only be MINUTE_5 or MINUTE_1 interval')
    const url = '/markets/' + marketSymbol + '/candles/' + (!!candleType ? candleType + '/' : '') + candleInterval + '/historical/' + year + (!!month ? '/' + month : '') + (!!day ? '/' + day : '')
    const results = await this.request('get', url)
    return this.parseDates(results, ['startsAt'])
  }

  //#endregion

  //#region V3 Orders ENDPOINTS (8 endpoints)

  /**
   * List closed orders.
   * StartDate and EndDate filters apply to the ClosedAt field.
   * Pagination and the sort order of the results are in inverse order of the ClosedAt field.
   * @param props 
   * @returns 
   */
  async ordersClosed(props?: {
    marketSymbol?: string
    nextPageToken?: string
    previousPageToken?: string
    pageSize?: number
    startDate: string
    endDate: string
  }): Promise<BTT.Order[]> {
    const results = await this.request('get', '/orders/closed', { params: props })
    return this.parseDates(results, ['createdAt', 'updatedAt', 'closedAt'])
  }

  /**
   * List open orders.
   * @param marketSymbol filter by market (optional)
   * @returns 
   */
  async ordersOpen(marketSymbol: string): Promise<BTT.Order[]> {
    const results = await this.request('get', '/orders/open', { params: { marketSymbol } })
    return this.parseDates(results, ['createdAt', 'updatedAt', 'closedAt'])
  }

  /**
   * Bulk cancel all open orders (can be limited to a specified market)
   * @param marketSymbol 
   * @returns 
   */
  async ordersDelete(marketSymbol: string): Promise<BTT.BulkCancelResult[]> {
    return this.request('delete', '/orders/open', { params: { marketSymbol } })
  }

  /**
   * Get sequence of open orders snapshot.
   * @returns 
   */
  async headOrdersOpen(): Promise<void> {
    return this.request('head', '/orders/open')
  }

  /**
   * Retrieve information on a specific order.
   * @param orderId (uuid-formatted string) - ID of order to retrieve
   * @returns 
   */
  async order(orderId: string): Promise<BTT.Order> {
    const results = await this.request('get', '/orders/' + orderId)
    return this.parseDates(results, ['createdAt', 'updatedAt', 'closedAt'])
  }

  /**
   * Cancel an order.
   * @param orderId (uuid-formatted string) - ID of order to cancel
   * @returns 
   */
  async orderDelete(orderId: string): Promise<BTT.Order> {
    const results = await this.request('delete', '/orders/' + orderId)
    return this.parseDates(results, ['createdAt', 'updatedAt', 'closedAt'])
  }

  /**
   * Retrieve executions for a specific order.
   * 
   * Results are sorted in inverse order of execution time, and are limited to the first 1000.
   * 
   * NOTE: Executions from before 5/27/2019 are not available.
   * 
   * Also, there may be a delay before an executed trade is visible in this endpoint.
   * @param orderId 
   * @returns 
   */
  async ordersExecutions(orderId: string): Promise<BTT.Execution[]> {
    const results = await this.request('get', '/orders/' + orderId + '/executions')
    return this.parseDates(results, ['executedAt'])
  }

  /**
   * Create a new order.
   * @param newOrder information specifying the order to create
   * @returns 
   */
  async orderCreate(newOrder: BTT.NewOrder): Promise<BTT.Order> {
    const results = await this.request('post', '/orders', { body: newOrder })
    return this.parseDates(results, ['createdAt', 'updatedAt', 'closedAt'])
  }

  //#endregion

  //#region V3 Ping ENDPOINTS (1 endpoints)

  /**
   * Pings the service
   * @returns {Promise<ServicePing>}
   */
  async ping(): Promise<BTT.ServicePing> {
    return this.request('get', '/ping');
  }

  //#endregion

  //#region V3 Subaccounts ENDPOINTS (7 endpoints)

  /*-------------------------------------------------------------------------*
   * WARNING: Subaccounts API are only for partners.
   * Regular traders cannot use it.
   *-------------------------------------------------------------------------*/

  /**
   * List subaccounts.
   * 
   * (NOTE: This API is limited to partners and not available for traders.)
   * 
   * Pagination and the sort order of the results are in inverse order of the CreatedAt field.
   * @returns 
   */
  async subaccounts(): Promise<BTT.Subaccount[]>;
  /**
   * Retrieve details for a specified subaccount. (NOTE: This API is limited to partners and not available for traders.)
   * @param subaccountId (uuid-formatted string) - ID of the subaccount to retrieve details for
   */
  async subaccounts(subaccountId: string): Promise<BTT.Subaccount>;
  async subaccounts(subaccountId?: string) {
    if (subaccountId) {
      return this.request('get', '/subaccounts/' + subaccountId)
    }
    const results = await this.request('get', '/subaccounts')
    return this.parseDates(results, ['createdAt'])
  }

  /**
   * Create a new subaccount.
   * 
   * (NOTE: This API is limited to partners and not available for traders.)
   * 
   * (WARNING: Official API doesn't provide information about NewSubaccount body payload)
   * @param payload information specifying the subaccount to create
   * @returns 
   */
  async subaccountCreate(newSubaccount: {}): Promise<BTT.Subaccount> {
    const results = await this.request('post', '/subaccounts', { body: newSubaccount })
    return this.parseDates(results, ['createdAt'])
  }

  /**
   * List open withdrawals for all subaccounts.
   * 
   * Results are sorted in inverse order of the CreatedAt field, and are limited to the first 1000.
   * @param options 
   * @returns 
   */
  async subaccountWithdrawalsOpen(options?: {
    status?: 'requested' | 'authorized' | 'pending' | 'error_invalid_address'
    currencySymbol?: string
    nextPageToken?: string
    previousPageToken?: string
    pageSize?: number
    startDate?: string
    endDate?: string
  }): Promise<BTT.Withdrawal> {
    const results = await this.request('get', '/subaccounts/withdrawals/open', { params: options })
    return this.parseDates(results, ['createdAt', 'executedAt'])
  }

  /**
   * List closed withdrawals for all subaccounts.
   * 
   * StartDate and EndDate filters apply to the CompletedAt field.
   * 
   * Pagination and the sort order of the results are in inverse order of the CompletedAt field.
   * @param options 
   * @returns 
   */
  async subaccountWithdrawalsClosed(options?: {
    status?: 'completed' | 'cancelled'
    currencySymbol?: string
    nextPageToken?: string
    previousPageToken?: string
    pageSize?: number
    startDate?: string
    endDate?: string
  }): Promise<BTT.Withdrawal> {
    const results = await this.request('get', '/subaccounts/withdrawals/closed', { params: options })
    return this.parseDates(results, ['createdAt', 'executedAt'])
  }

  /**
   * List closed deposits for all subaccounts.
   * 
   * StartDate and EndDate filters apply to the CompletedAt field.
   * 
   * Pagination and the sort order of the results are in inverse order of the CompletedAt field.
   * @param options 
   * @returns 
   */
  async subaccountsDepositsClosed(options?: {
    status?: 'completed' | 'orphaned' | 'invalidated'
    currencySymbol?: string
    nextPageToken?: string
    previousPageToken?: string
    pageSize?: number
    startDate?: string
    endDate?: string
  }): Promise<BTT.Deposit[]> {
    const results = await this.request('get', '/subaccounts/deposits/closed', { params: options })
    return this.parseDates(results, ['updatedAt', 'completedAt'])
  }

  //#endregion

  //#region V3 Transfers ENDPOINTS (4 endpoints)

  /**
   * List sent transfers.
   * (NOTE: This API is limited to partners and not available for traders.)
   * Pagination and the sort order of the results are in inverse order of the Executed field.
   * @param options 
   * @returns 
   */
  async transfersSent(options?: {
    toSubaccountId?: string
    toMasterAccount?: boolean
    currencySymbol?: string
    nextPageToken?: string
    previousPageToken?: string
    pageSize?: number
    startDate?: string
    endDate?: string
  }): Promise<BTT.SentTransferInfo[]> {
    const results = await this.request('get', '/transfers/sent', { params: options })
    return this.parseDates(results, ['executedAt'])
  }

  /**
   * List received transfers.
   * (NOTE: This API is limited to partners and not available for traders.)
   * Pagination and the sort order of the results are in inverse order of the Executed field.
   * @param options 
   * @returns 
   */
  async transfersReceived(options?: {
    fromSubaccountId?: string
    fromMasterAccount?: boolean
    currencySymbol?: string
    nextPageToken?: string
    previousPageToken?: string
    pageSize?: number
    startDate?: string
    endDate?: string
  }): Promise<BTT.ReceivedTransferInfo[]> {
    const results = await this.request('get', '/transfers/received', { params: options })
    return this.parseDates(results, ['executedAt'])
  }

  /**
   * Retrieve information on the specified transfer.
   * (NOTE: This API is limited to partners and not available for traders.)
   * @param transferId (uuid-formatted string) - ID of the transfer to retrieve
   * @returns 
   */
  async transfer(transferId: string): Promise<BTT.ReceivedTransferInfo> {
    const results = await this.request('get', '/transfers/' + transferId)
    return this.parseDates(results, ['executedAt'])
  }

  /**
   * Executes a new transfer.
   * (NOTE: This API is limited to partners and not available for traders.)
   * @param newTransfer information specifying the transfer to execute
   * @returns 
   */
  async transferCreate(newTransfer: BTT.NewTransfer): Promise<BTT.NewTransfer> {
    return this.request('post', '/transfers', { body: newTransfer })
  }

  //#endregion

  //#region V3 Withdrawals ENDPOINTS (7 endpoints)

  /**
   * List open withdrawals. Results are sorted in inverse order of the CreatedAt field, and are limited to the first 1000.
   * @param props 
   * @returns 
   */
  async withdrawalsOpen(props?: {
    status?: 'REQUESTED' | 'AUTHORIZED' | 'PENDING' | 'ERROR_INVALID_ADDRESS'
    currencySymbol?: string
  }): Promise<BTT.Withdrawal[]> {
    const results = await this.request('get', '/withdrawals/open', { params: props })
    return this.parseDates(results, ['createdAt', 'executedAt'])
  }

  /**
   * List closed withdrawals.
   * 
   * StartDate and EndDate filters apply to the CompletedAt field.
   * 
   * Pagination and the sort order of the results are in inverse order of the CompletedAt field.
   * @param props 
   * @returns 
   */
  async withdrawalsClosed(props?: {
    status?: 'COMPLETED' | 'CANCELLED'
    currencySymbol?: string
    nextPageToken?: string
    previousPageToken?: string
    pageSize?: number
    startDate?: string
    endDate?: string
  }): Promise<BTT.Withdrawal[]> {
    const results = await this.request('get', '/withdrawals/closed', { params: props })
    return this.parseDates(results, ['createdAt', 'executedAt'])
  }

  /**
   * Retrieves all withdrawals for this account with the given TxId
   * @param txId the transaction id to lookup
   * @returns 
   */
  async withdrawalByTxId(txId: string): Promise<BTT.Withdrawal[]> {
    const results = await this.request('get', '/withdrawals/ByTxId/' + txId)
    return this.parseDates(results, ['createdAt', 'executedAt'])
  }

  /**
   * Retrieve information on a specified withdrawal.
   * @param withdrawalId (uuid-formatted string) - ID of withdrawal to retrieve
   * @returns 
   */
  async withdrawal(withdrawalId: string): Promise<BTT.Withdrawal> {
    const results = await this.request('get', '/withdrawals/' + withdrawalId)
    return this.parseDates(results, ['createdAt', 'executedAt'])
  }

  /**
   * Cancel a withdrawal.
   * 
   * (Withdrawals can only be cancelled if status is REQUESTED, AUTHORIZED, or ERROR_INVALID_ADDRESS.)
   * @param withdrawalId 
   * @returns 
   */
  async withdrawalDelete(withdrawalId: string): Promise<BTT.Withdrawal> {
    return this.request('delete', '/withdrawals/' + withdrawalId)
  }

  /**
   * Create a new withdrawal.
   * 
   * To initiate a fiat withdrawal specify a funds transfer method id instead of a crypto address.
   * @param newWithdrawal information specifying the withdrawal to create
   * @returns 
   */
  async withdrawalCreate(newWithdrawal: BTT.NewWithdrawal): Promise<BTT.Withdrawal> {
    const results = await this.request('post', '/withdrawals', { body: newWithdrawal })
    return this.parseDates(results, ['createdAt', 'executedAt'])
  }

  /**
   * Returns a list of allowed addresses.
   * @returns 
   */
  async withdrawalsAllowedAddresses(): Promise<BTT.AllowedAddress> {
    const results = await this.request('get', '/withdrawals/allowed-addresses')
    return this.parseDates(results, ['createdAt', 'activeAt'])
  }

  //#endregion

  //#region private methods
  /**
   * Creates an axios request with signed headers
   * @param method request method (GET, POST, HEAD...)
   * @param url base url without query string
   * @param options 
   * @returns 
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
      }
      /* istanbul ignore next */
      throw err
    })

    if (data.code) {
      throw new Error(data.code)
    }

    return data
  }

  /**
   * Create a pre-sign string, and sign via HmacSHA512, using your API secret as the signing secret. Hex-encode the result of this operation and populate the Api-Signature header with it.
   * @param nonce 
   * @param path 
   * @param method 
   * @param contentHash 
   * @param params query string params
   * @returns 
   */
  private requestSignature(nonce: number, path: string, method: Method, contentHash: string, params: any) {
    const query = querystring.stringify(params)
    const url = `${this._client.defaults.baseURL}${path}${query ? '?' + query : ''}`
    const preSign = [nonce, url, method.toUpperCase(), contentHash, ''].join('')
    const hmac = crypto.createHmac('sha512', this._apiSecret)
    return hmac.update(preSign).digest('hex')
  }

  /**
   * Clean up object removing undefined keys in order to avoid
   * useless query params in the request.
   * @param params 
   * @returns 
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
   * Convert ISO String dates to Date instances
   * @param results 
   * @param keys 
   * @returns 
   */
  private parseDates(results: any, keys: string[]) {
    // results is array
    for (const result of results) {
      for (const key of keys) {
        if (result[key]) {
          result[key] = new Date(`${result[key]}`)
        }
      }
    }
    // results is object
    for (const key of keys) {
      if (results[key]) {
        results[key] = new Date(`${results[key]}`)
      }
    }
    return results
  }

  //#endregion
}

export default BittrexClient
