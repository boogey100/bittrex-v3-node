import * as BTT from './bittrex-types';
declare class BittrexClient {
    private _apiKey;
    private _apiSecret;
    private _client;
    /**
     * Create a new client instance with API Keys
     * @param param0
     */
    constructor({ apiKey, apiSecret, keepAlive }: {
        apiKey: string;
        apiSecret: string;
        keepAlive?: boolean;
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
    account(): Promise<BTT.Account>;
    /**
     * Get trade fee for the given marketSymbol.
     * Get trade fees for each markets when marketSymbol is not provided.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    accountFeesTrading(): Promise<BTT.CommissionRatesWithMarket[]>;
    /**
     * Get trade fee for the given marketSymbol.
     * @param marketSymbol
     */
    accountFeesTrading(marketSymbol: string): Promise<BTT.CommissionRatesWithMarket>;
    /**
     * Get 30 day volume for account
     * @returns {Promise}
     */
    accountVolume(): Promise<BTT.AccountVolume>;
    /**
     * Get trading permissions when marketSymbol is not provided.
     * Get trading permissions for a single market.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    accountPermissionsMarkets(marketSymbol?: string): Promise<BTT.MarketPolicy[]>;
    /**
     * Get currency permissions for a single currency.
     * Get all currency permissions when marketSymbol is not provided.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    accountPermissionsCurrencies(marketSymbol?: string): Promise<BTT.CurrencyPolicy[]>;
    /**
     * List deposit addresses that have been requested or provisioned.
     * Retrieve the status of the deposit address for a particular currency for which one has been requested or provisioned.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    addresses(): Promise<BTT.Address[]>;
    /**
     * Retrieve the status of the deposit address for a particular currency for which one has been requested or provisioned.
     * Alias of addressesStatus(marketSymbol)
     * @param marketSymbol symbol of the currency to retrieve the deposit address for
     * @returns
     */
    addresses(marketSymbol: string): Promise<BTT.Address>;
    /**
     * Retrieve the status of the deposit address for a particular currency for which one has been requested or provisioned.
     * Alias of addresses(marketSymbol)
     * @param marketSymbol symbol of the currency to retrieve the deposit address for
     * @returns
     */
    addressStatus(marketSymbol: string): Promise<BTT.Address>;
    /**
     * Request provisioning of a deposit address for a currency
     * for which no address has been requested or provisioned.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    addressCreate(marketSymbol: string): Promise<BTT.Address>;
    /**
     * List account balances across available currencies.
     * Returns a Balance entry for each currency for which there
     * is either a balance or an address.
     * @returns {Promise}
     */
    balances(): Promise<BTT.Balance[]>;
    /**
     * Retrieve account balance for a specific currency.
     * Request will always succeed when the currency exists,
     * regardless of whether there is a balance or address.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    balance(marketSymbol: string): Promise<BTT.Balance>;
    /**
     * Get sequence of balances snapshot.
     * @returns {Promise}
     */
    headBalances(): Promise<void>;
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
    batch(payload: BTT.BatchSchemaBody): Promise<{
        status: number;
        payload: any;
    }[]>;
    /**
     * Retrieve information on a specific conditional order.
     * @param conditionalOrderId (uuid-formatted string) - ID of conditional order to retrieve
     * @returns
     */
    conditionalOrders(conditionalOrderId: string): Promise<BTT.ConditionalOrder>;
    /**
     * Cancel a conditional order.
     * @param conditionalOrderId (uuid-formatted string) - ID of order to cancel
     * @returns
     */
    conditionalOrderDelete(conditionalOrderId: string): Promise<BTT.ConditionalOrder>;
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
    }): Promise<BTT.ConditionalOrder[]>;
    /**
     * List open conditional orders.
     * @param marketSymbol filter by market (optional)
     * @returns
     */
    conditionalOrdersOpen(marketSymbol?: string): Promise<BTT.ConditionalOrder[]>;
    /**
     * Get sequence of open conditional orders snapshot.
     * @returns
     */
    headConditionalOrdersOpen(): Promise<void>;
    /**
     * Create a new conditional order.
     * @param newConditionalOrder information specifying the conditional order to create
     * @returns
     */
    conditionalOrdersCreate(newConditionalOrder: BTT.NewConditionalOrder): Promise<BTT.ConditionalOrder>;
    /**
     * List currencies.
     */
    currencies(): Promise<BTT.Currency[]>;
    /**
     * Retrieve info on a specified currency.
     * @param marketSymbol symbol of the currency to retrieve
     */
    currencies(marketSymbol: string): Promise<BTT.Currency>;
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
    }): Promise<BTT.Deposit[]>;
    /**
     * Get open deposits sequence.
     * @returns {Promise}
     */
    headDepositsOpen(): Promise<void>;
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
    }): Promise<BTT.Deposit[]>;
    /**
     * Retrieves all deposits for this account with the given TxId
     * @param txId the transaction id to lookup
     * @returns
     */
    depositsByTxId(txId: string): Promise<BTT.Deposit[]>;
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
    executions(executionId: string): Promise<BTT.Execution>;
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
    executions(props: BTT.ExecutionsRequestParams): Promise<BTT.Execution[]>;
    /**
     * Gets sequence number and last execution id.
     * @returns {Promise}
     */
    executionLastId(): Promise<BTT.ExecutionLastId>;
    /**
     * Get sequence number for executions.
     * @returns
     */
    headExecutionLastId(): Promise<void>;
    /**
     * Get details about a linked bank account
     * @param fundsTransferMethodId (uuid-formatted string) - ID of funds transfer method to retrieve
     * @returns
     */
    fundsTransferMethods(fundsTransferMethodId: string): Promise<BTT.FundsTransferMethod>;
    /**
     * List markets.
     * @returns
     */
    markets(): Promise<BTT.Market[]>;
    /**
     * List summaries of the last 24 hours of activity for all markets.
     * @returns
     */
    marketsSummaries(): Promise<BTT.MarketSummary[]>;
    /**
     * Retrieve the current sequence number for the market summaries snapshot.
     * @returns
     */
    headMarketsSummaries(): Promise<void>;
    /**
     * List tickers for all markets.
     * @returns
     */
    marketsTickers(): Promise<BTT.Ticker[]>;
    /**
     * Retrieve the current sequence number for the tickers snapshot.
     * @returns
     */
    headMarketsTickers(): Promise<void>;
    /**
     * Retrieve the ticker for a specific market.
     * @param marketSymbol symbol of market to retrieve ticker for
     * @returns
     */
    marketTicker(marketSymbol: string): Promise<BTT.Ticker>;
    /**
     * Retrieve information for a specific market.
     * @param marketSymbol symbol of market to retrieve
     * @returns
     */
    market(marketSymbol: string): Promise<BTT.Market>;
    /**
     * Retrieve summary of the last 24 hours of activity for a specific market.
     * @param marketSymbol symbol of market to retrieve summary for
     * @returns
     */
    marketSummary(marketSymbol: string): Promise<BTT.MarketSummary>;
    /**
     * Retrieve the order book for a specific market.
     * @param marketSymbol symbol of market to retrieve order book for
     * @param depth maximum depth of order book to return (optional, allowed values are [1, 25, 500], default is 25)
     * @returns
     */
    marketOrderBook(marketSymbol: string, depth?: number): Promise<BTT.OrderBook>;
    /**
     * Retrieve the current sequence number for the specified market's order book snapshot.
     * @param marketSymbol symbol of market to retrieve order book for
     * @param depth maximum depth of order book to return (optional, allowed values are [1, 25, 500], default is 25)
     * @returns
     */
    headMarketOrderBook(marketSymbol: string, depth?: number): Promise<void>;
    /**
     * Retrieve the recent trades for a specific market.
     * @param marketSymbol symbol of market to retrieve recent trades for
     * @returns
     */
    marketTrades(marketSymbol: string): Promise<BTT.Trade[]>;
    /**
     * Retrieve the current sequence number for the specified market's recent trades snapshot.
     * @param marketSymbol symbol of market to retrieve order book for
     * @returns
     */
    headMarketTrades(marketSymbol: string): Promise<void>;
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
    marketCandles(marketSymbol: string, candleInterval: 'MINUTE_1' | 'MINUTE_5' | 'HOUR_1' | 'DAY_1', candleType?: 'TRADE' | 'MIDPOINT'): Promise<BTT.Candle[]>;
    /**
     * Retrieve the current sequence number for the specified market's candles snapshot.
     * @param marketSymbol symbol of market to retrieve candles for
     * @param candleInterval desired time interval between candles
     * @param candleType type of candles (trades or midpoint). This portion of the url may be omitted if trade based candles are desired (e.g. /candles/{candleInterval}/recent will return trade based candles)
     * @returns
     */
    headMarketCandles(marketSymbol: string, candleInterval: 'MINUTE_1' | 'MINUTE_5' | 'HOUR_1' | 'DAY_1', candleType?: 'TRADE' | 'MIDPOINT'): Promise<void>;
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
    marketCandlesDate(marketSymbol: string, candleInterval: 'MINUTE_1' | 'MINUTE_5' | 'HOUR_1' | 'DAY_1', year: number, candleType?: 'TRADE' | 'MIDPOINT', month?: number, day?: number): Promise<BTT.Candle[]>;
    /**
     * List closed orders.
     * StartDate and EndDate filters apply to the ClosedAt field.
     * Pagination and the sort order of the results are in inverse order of the ClosedAt field.
     * @param props
     * @returns
     */
    ordersClosed(props?: {
        marketSymbol?: string;
        nextPageToken?: string;
        previousPageToken?: string;
        pageSize?: number;
        startDate: string;
        endDate: string;
    }): Promise<BTT.Order[]>;
    /**
     * List open orders.
     * @param marketSymbol filter by market (optional)
     * @returns
     */
    ordersOpen(marketSymbol: string): Promise<BTT.Order[]>;
    /**
     * Bulk cancel all open orders (can be limited to a specified market)
     * @param marketSymbol
     * @returns
     */
    ordersDelete(marketSymbol: string): Promise<BTT.BulkCancelResult[]>;
    /**
     * Get sequence of open orders snapshot.
     * @returns
     */
    headOrdersOpen(): Promise<void>;
    /**
     * Retrieve information on a specific order.
     * @param orderId (uuid-formatted string) - ID of order to retrieve
     * @returns
     */
    order(orderId: string): Promise<BTT.Order>;
    /**
     * Cancel an order.
     * @param orderId (uuid-formatted string) - ID of order to cancel
     * @returns
     */
    orderDelete(orderId: string): Promise<BTT.Order>;
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
    ordersExecutions(orderId: string): Promise<BTT.Execution[]>;
    /**
     * Create a new order.
     * @param newOrder information specifying the order to create
     * @returns
     */
    orderCreate(newOrder: BTT.NewOrder): Promise<BTT.Order>;
    /**
     * Pings the service
     * @returns {Promise<ServicePing>}
     */
    ping(): Promise<BTT.ServicePing>;
    /**
     * List subaccounts.
     *
     * (NOTE: This API is limited to partners and not available for traders.)
     *
     * Pagination and the sort order of the results are in inverse order of the CreatedAt field.
     * @returns
     */
    subaccounts(): Promise<BTT.Subaccount[]>;
    /**
     * Retrieve details for a specified subaccount. (NOTE: This API is limited to partners and not available for traders.)
     * @param subaccountId (uuid-formatted string) - ID of the subaccount to retrieve details for
     */
    subaccounts(subaccountId: string): Promise<BTT.Subaccount>;
    /**
     * Create a new subaccount.
     *
     * (NOTE: This API is limited to partners and not available for traders.)
     *
     * (WARNING: Official API doesn't provide information about NewSubaccount body payload)
     * @param payload information specifying the subaccount to create
     * @returns
     */
    subaccountCreate(newSubaccount: {}): Promise<BTT.Subaccount>;
    /**
     * List open withdrawals for all subaccounts.
     *
     * Results are sorted in inverse order of the CreatedAt field, and are limited to the first 1000.
     * @param options
     * @returns
     */
    subaccountWithdrawalsOpen(options?: {
        status?: 'requested' | 'authorized' | 'pending' | 'error_invalid_address';
        currencySymbol?: string;
        nextPageToken?: string;
        previousPageToken?: string;
        pageSize?: number;
        startDate?: string;
        endDate?: string;
    }): Promise<BTT.Withdrawal>;
    /**
     * List closed withdrawals for all subaccounts.
     *
     * StartDate and EndDate filters apply to the CompletedAt field.
     *
     * Pagination and the sort order of the results are in inverse order of the CompletedAt field.
     * @param options
     * @returns
     */
    subaccountWithdrawalsClosed(options?: {
        status?: 'completed' | 'cancelled';
        currencySymbol?: string;
        nextPageToken?: string;
        previousPageToken?: string;
        pageSize?: number;
        startDate?: string;
        endDate?: string;
    }): Promise<BTT.Withdrawal>;
    /**
     * List closed deposits for all subaccounts.
     *
     * StartDate and EndDate filters apply to the CompletedAt field.
     *
     * Pagination and the sort order of the results are in inverse order of the CompletedAt field.
     * @param options
     * @returns
     */
    subaccountsDepositsClosed(options?: {
        status?: 'completed' | 'orphaned' | 'invalidated';
        currencySymbol?: string;
        nextPageToken?: string;
        previousPageToken?: string;
        pageSize?: number;
        startDate?: string;
        endDate?: string;
    }): Promise<BTT.Deposit[]>;
    /**
     * List sent transfers.
     * (NOTE: This API is limited to partners and not available for traders.)
     * Pagination and the sort order of the results are in inverse order of the Executed field.
     * @param options
     * @returns
     */
    transfersSent(options?: {
        toSubaccountId?: string;
        toMasterAccount?: boolean;
        currencySymbol?: string;
        nextPageToken?: string;
        previousPageToken?: string;
        pageSize?: number;
        startDate?: string;
        endDate?: string;
    }): Promise<BTT.SentTransferInfo[]>;
    /**
     * List received transfers.
     * (NOTE: This API is limited to partners and not available for traders.)
     * Pagination and the sort order of the results are in inverse order of the Executed field.
     * @param options
     * @returns
     */
    transfersReceived(options?: {
        fromSubaccountId?: string;
        fromMasterAccount?: boolean;
        currencySymbol?: string;
        nextPageToken?: string;
        previousPageToken?: string;
        pageSize?: number;
        startDate?: string;
        endDate?: string;
    }): Promise<BTT.ReceivedTransferInfo[]>;
    /**
     * Retrieve information on the specified transfer.
     * (NOTE: This API is limited to partners and not available for traders.)
     * @param transferId (uuid-formatted string) - ID of the transfer to retrieve
     * @returns
     */
    transfer(transferId: string): Promise<BTT.ReceivedTransferInfo>;
    /**
     * Executes a new transfer.
     * (NOTE: This API is limited to partners and not available for traders.)
     * @param newTransfer information specifying the transfer to execute
     * @returns
     */
    transferCreate(newTransfer: BTT.NewTransfer): Promise<BTT.NewTransfer>;
    /**
     * List open withdrawals. Results are sorted in inverse order of the CreatedAt field, and are limited to the first 1000.
     * @param props
     * @returns
     */
    withdrawalsOpen(props?: {
        status?: 'REQUESTED' | 'AUTHORIZED' | 'PENDING' | 'ERROR_INVALID_ADDRESS';
        currencySymbol?: string;
    }): Promise<BTT.Withdrawal[]>;
    /**
     * List closed withdrawals.
     *
     * StartDate and EndDate filters apply to the CompletedAt field.
     *
     * Pagination and the sort order of the results are in inverse order of the CompletedAt field.
     * @param props
     * @returns
     */
    withdrawalsClosed(props?: {
        status?: 'COMPLETED' | 'CANCELLED';
        currencySymbol?: string;
        nextPageToken?: string;
        previousPageToken?: string;
        pageSize?: number;
        startDate?: string;
        endDate?: string;
    }): Promise<BTT.Withdrawal[]>;
    /**
     * Retrieves all withdrawals for this account with the given TxId
     * @param txId the transaction id to lookup
     * @returns
     */
    withdrawalByTxId(txId: string): Promise<BTT.Withdrawal[]>;
    /**
     * Retrieve information on a specified withdrawal.
     * @param withdrawalId (uuid-formatted string) - ID of withdrawal to retrieve
     * @returns
     */
    withdrawal(withdrawalId: string): Promise<BTT.Withdrawal>;
    /**
     * Cancel a withdrawal.
     *
     * (Withdrawals can only be cancelled if status is REQUESTED, AUTHORIZED, or ERROR_INVALID_ADDRESS.)
     * @param withdrawalId
     * @returns
     */
    withdrawalDelete(withdrawalId: string): Promise<BTT.Withdrawal>;
    /**
     * Create a new withdrawal.
     *
     * To initiate a fiat withdrawal specify a funds transfer method id instead of a crypto address.
     * @param newWithdrawal information specifying the withdrawal to create
     * @returns
     */
    withdrawalCreate(newWithdrawal: BTT.NewWithdrawal): Promise<BTT.Withdrawal>;
    /**
     * Returns a list of allowed addresses.
     * @returns
     */
    withdrawalsAllowedAddresses(): Promise<BTT.AllowedAddress>;
    /**
     * Creates an axios request with signed headers
     * @param method request method (GET, POST, HEAD...)
     * @param url base url without query string
     * @param options
     * @returns
     */
    private request;
    /**
     * Create a pre-sign string, and sign via HmacSHA512, using your API secret as the signing secret. Hex-encode the result of this operation and populate the Api-Signature header with it.
     * @param nonce
     * @param path
     * @param method
     * @param contentHash
     * @param params query string params
     * @returns
     */
    private requestSignature;
    /**
     * Clean up object removing undefined keys in order to avoid
     * useless query params in the request.
     * @param params
     * @returns
     */
    private sanitizeParams;
    /**
     * Convert ISO String dates to Date instances
     * @param results
     * @param keys
     * @returns
     */
    private parseDates;
}
export default BittrexClient;
