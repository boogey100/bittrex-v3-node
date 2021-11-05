declare class BittrexClient {
    private _apiKey;
    private _apiSecret;
    private _client;
    constructor({ apiKey, apiSecret, keepAlive }: {
        apiKey: string;
        apiSecret: string;
        keepAlive: boolean;
    });
    /**
     * REFERENCE: https://bittrex.github.io/api/v3
     */
    /**
     * Retrieve information for the account associated with the request.
     * For now, it only echoes the subaccount if one was specified in the header,
     * which can be used to verify that one is operating on the intended account.
     * More fields will be added later.
     * @returns {Promise}
     */
    account(): Promise<Account>;
    /**
     * Get trade fee for the given marketSymbol.
     * Get trade fees for each markets when marketSymbol is not provided.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    accountFeesTrading(): Promise<CommissionRatesWithMarket[]>;
    accountFeesTrading(marketSymbol: string): Promise<CommissionRatesWithMarket>;
    /**
     * Get 30 day volume for account
     * @returns {Promise}
     */
    accountVolume(): Promise<AccountVolume>;
    /**
     * Get trading permissions when marketSymbol is not provided.
     * Get trading permissions for a single market.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    accountPermissionsMarkets(marketSymbol?: string): Promise<MarketPolicy[]>;
    /**
     * Get currency permissions for a single currency.
     * Get all currency permissions when marketSymbol is not provided.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    accountPermissionsCurrencies(marketSymbol?: string): Promise<CurrencyPolicy[]>;
    /**
     * List deposit addresses that have been requested or provisioned.
     * Retrieve the status of the deposit address for a particular currency for which one has been requested or provisioned.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    addresses(): Promise<Address[]>;
    addresses(marketSymbol: string): Promise<Address>;
    addressStatus(marketSymbol: string): Promise<Address>;
    /**
     * Request provisioning of a deposit address for a currency
     * for which no address has been requested or provisioned.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    addressCreate(marketSymbol: string): Promise<Address>;
    /**
     * List account balances across available currencies.
     * Returns a Balance entry for each currency for which there
     * is either a balance or an address.
     * @returns {Promise}
     */
    balances(): Promise<Balance[]>;
    /**
     * Retrieve account balance for a specific currency.
     * Request will always succeed when the currency exists,
     * regardless of whether there is a balance or address.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    balance(marketSymbol: string): Promise<Balance>;
    /**
     * Get sequence of balances snapshot.
     * @returns {Promise}
     */
    balanceSnapshot(): Promise<unknown>;
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
    createBatch(payload: BatchSchemaBody): Promise<{
        status: number;
        payload: any;
    }[]>;
    /**
     * Retrieve information on a specific conditional order.
     * @param conditionalOrderId (uuid-formatted string) - ID of conditional order to retrieve
     * @returns
     */
    conditionalOrders(conditionalOrderId: string): Promise<ConditionalOrder>;
    /**
     * Cancel a conditional order.
     * @param conditionalOrderId (uuid-formatted string) - ID of order to cancel
     * @returns
     */
    conditionalOrderDelete(conditionalOrderId: string): Promise<ConditionalOrder>;
    /**
     * List closed conditional orders.
     * StartDate and EndDate filters apply to the ClosedAt field.
     * Pagination and the sort order of the results are in inverse
     * order of the ClosedAt field.
     * @param props
     * @returns
     */
    conditionalOrdersClosed(props?: {
        marketSymbol: string;
        nextPageToken: string;
        previousPageToken: string;
        pageSize: number;
        startDate: string;
        endDate: string;
    }): Promise<ConditionalOrder[]>;
    /**
     * List open conditional orders.
     * @param marketSymbol filter by market (optional)
     * @returns
     */
    conditionalOrdersOpen(marketSymbol?: string): Promise<ConditionalOrder[]>;
    /**
     * Get sequence of open conditional orders snapshot.
     * @returns
     */
    headConditionalOrdersOpen(): Promise<unknown>;
    /**
     * Create a new conditional order.
     * @param newConditionalOrder information specifying the conditional order to create
     * @returns
     */
    conditionalOrdersCreate(newConditionalOrder: NewConditionalOrder): Promise<ConditionalOrder>;
    /**
     * List currencies.
     */
    currencies(): Promise<Currency[]>;
    /**
     * Retrieve info on a specified currency.
     * @param marketSymbol symbol of the currency to retrieve
     */
    currencies(marketSymbol: string): Promise<Currency>;
    /**
     * List open deposits.
     * Results are sorted in inverse order of UpdatedAt,
     * and are limited to the first 1000.
     * @param props
     * @returns
     */
    depositsOpen(props?: {
        status: string;
        currencySymbol: string;
    }): Promise<Deposit[]>;
    /**
     * Get open deposits sequence.
     * @returns {Promise}
     */
    headDepositsOpen(): Promise<unknown>;
    /**
     * List closed deposits.
     * StartDate and EndDate filters apply to the CompletedAt field.
     * Pagination and the sort order of the results are in inverse
     * order of the CompletedAt field.
     * @returns
     */
    depositsClosed(props?: {
        status?: 'completed' | 'orphaned' | 'invalidated';
        currencySymbol?: string;
        nextPageToken?: string;
        previousPageToken?: string;
        pageSize?: number;
        startSate?: string;
        endDate?: string;
    }): Promise<Deposit[]>;
    /**
     * Retrieves all deposits for this account with the given TxId
     * @param txId the transaction id to lookup
     * @returns
     */
    depositsByTxId(txId: string): Promise<Deposit[]>;
    /**
     * Retrieve information for a specific deposit.
     * @param depositId (uuid-formatted string) - ID of the deposit to retrieve
     * @returns
     */
    deposits(depositId: string): Promise<unknown>;
    /**
     * Retrieve information on a specific execution.
     * NOTE: Executions from before 5/27/2019 are not available.
     * Also, there may be a delay before an executed trade is visible in this endpoint.
     * @param executionId (uuid-formatted string) - ID of execution to retrieve
     */
    executions(executionId: string): Promise<Execution>;
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
    executions(props: ExecutionsRequestParams): Promise<Execution[]>;
    /**
     * Gets sequence number and last execution id.
     * @returns {Promise}
     */
    executionLastId(): Promise<ExecutionLastId>;
    /**
     * Get sequence number for executions.
     * @returns
     */
    headExecutionLastId(): Promise<unknown>;
    /**
     * Get details about a linked bank account
     * @param fundsTransferMethodId (uuid-formatted string) - ID of funds transfer method to retrieve
     * @returns
     */
    fundsTransferMethods(fundsTransferMethodId: string): Promise<FundsTransferMethod>;
    /**
     * List markets.
     * @returns
     */
    markets(): Promise<Market[]>;
    /**
     * List summaries of the last 24 hours of activity for all markets.
     * @returns
     */
    marketsSummaries(): Promise<MarketSummary[]>;
    /**
     * Retrieve the current sequence number for the market summaries snapshot.
     * @returns
     */
    headMarketsSummaries(): Promise<unknown>;
    /**
     * List tickers for all markets.
     * @returns
     */
    marketsTickers(): Promise<Ticker[]>;
    /**
     * Retrieve the current sequence number for the tickers snapshot.
     * @returns
     */
    headMarketsTickers(): Promise<unknown>;
    /**
     * Retrieve the ticker for a specific market.
     * @param marketSymbol symbol of market to retrieve ticker for
     * @returns
     */
    marketTicker(marketSymbol: string): Promise<Ticker>;
    /**
     * Retrieve information for a specific market.
     * @param marketSymbol symbol of market to retrieve
     * @returns
     */
    market(marketSymbol: string): Promise<Market>;
    /**
     * Retrieve summary of the last 24 hours of activity for a specific market.
     * @param marketSymbol symbol of market to retrieve summary for
     * @returns
     */
    marketSummary(marketSymbol: string): Promise<MarketSummary>;
    /**
     * Retrieve the order book for a specific market.
     * @param marketSymbol symbol of market to retrieve order book for
     * @param depth maximum depth of order book to return (optional, allowed values are [1, 25, 500], default is 25)
     * @returns
     */
    marketOrderBook(marketSymbol: string, depth?: number): Promise<OrderBook>;
    /**
     * Retrieve the current sequence number for the specified market's order book snapshot.
     * @param marketSymbol symbol of market to retrieve order book for
     * @param depth maximum depth of order book to return (optional, allowed values are [1, 25, 500], default is 25)
     * @returns
     */
    headMarketOrderBook(marketSymbol: string, depth?: number): Promise<unknown>;
    /**
     * Retrieve the recent trades for a specific market.
     * @param marketSymbol symbol of market to retrieve recent trades for
     * @returns
     */
    marketTrades(marketSymbol: string): Promise<Trade[]>;
    /**
     * Retrieve the current sequence number for the specified market's recent trades snapshot.
     * @param marketSymbol symbol of market to retrieve order book for
     * @returns
     */
    headMarketTrades(marketSymbol: string): Promise<unknown>;
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
    marketCandles(marketSymbol: string, candleInterval: 'MINUTE_1' | 'MINUTE_5' | 'HOUR_1' | 'DAY_1', candleType?: 'TRADE' | 'MIDPOINT'): Promise<Candle[]>;
    /**
     * Retrieve the current sequence number for the specified market's candles snapshot.
     * @param marketSymbol symbol of market to retrieve candles for
     * @param candleInterval desired time interval between candles
     * @param candleType type of candles (trades or midpoint). This portion of the url may be omitted if trade based candles are desired (e.g. /candles/{candleInterval}/recent will return trade based candles)
     * @returns
     */
    headMarketCandles(marketSymbol: string, candleInterval: 'MINUTE_1' | 'MINUTE_5' | 'HOUR_1' | 'DAY_1', candleType?: 'TRADE' | 'MIDPOINT'): Promise<unknown>;
    /**
     * Retrieve recent candles for a specific market and candle interval.
     * The date range of returned candles depends on the interval as follows:
     * (MINUTE_1: 1 day, MINUTE_5: 1 day, HOUR_1: 31 days, DAY_1: 366 days).
     * Candles for intervals without any trading activity
     * will match the previous close and volume will be zero.
     * @param marketSymbol symbol of market to retrieve candles for
     * @param candleInterval desired time interval between candles
     * @param year desired year to start from
     * @param candleType type of candles (trades or midpoint). This portion of the url may be omitted if trade based candles are desired (e.g. /candles/{candleInterval}/historical/{year} will return trade based candles)
     * @param month desired month to start from (if applicable)
     * @param day desired day to start from (if applicable)
     * @returns
     */
    marketCandlesDate(marketSymbol: string, candleInterval: 'MINUTE_1' | 'MINUTE_5' | 'HOUR_1' | 'DAY_1', year: number, candleType?: 'TRADE' | 'MIDPOINT', month?: number, day?: number): Promise<Candle[]>;
    /**
     * Pings the service
     * @returns {Promise}
     */
    ping(): Promise<ServicePing>;
    /**
     * List subaccounts.
     *
     * (NOTE: This API is limited to partners and not available for traders.)
     * Pagination and the sort order of the results
     * are in inverse order of the CreatedAt field.
     * @returns
     */
    subaccounts(): Promise<Subaccount[]>;
    /**
     * @private
     * @method request
     * @param {String} method
     * @param {String} url
     * @param {Object} [options.data]
     * @param {Object} [options.params]
     */
    private request;
    /**
     * @private
     * @method requestSignature
     * @param {String} url
     * @return {String}
     */
    private requestSignature;
    /**
     * @private
     * @method sanitizeParams
     * @param {Object} params
     * @return {Object}
     */
    private sanitizeParams;
    /**
     * @private
     * @method parseDates
     * @param {Array<Object>} results
     * @param {Array<String>} keys
     * @return {Array<Object>}
     */
    private parseDates;
}
export default BittrexClient;
