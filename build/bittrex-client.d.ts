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
    createBatch(payload: BatchSchemaBody): Promise<{
        status: number;
        payload: any;
    }[]>;
    currencies(): Promise<Currency[]>;
    currencies(marketSymbol: string): Promise<Currency>;
    markets(): Promise<any>;
    marketsSummaries(): Promise<any>;
    headMarketsSummaries(): Promise<unknown>;
    marketsTickers(): Promise<unknown>;
    headMarketsTickers(): Promise<unknown>;
    marketTicker(marketSymbol: string): Promise<unknown>;
    market(marketSymbol: string): Promise<unknown>;
    marketSummary(marketSymbol: string): Promise<unknown>;
    marketOrderBook(marketSymbol: string, depth?: number): Promise<unknown>;
    headMarketOrderBook(marketSymbol: string, depth?: number): Promise<unknown>;
    marketTrades(marketSymbol: string): Promise<unknown>;
    marketCandles(marketSymbol: string, candleInterval: 'MINUTE_1' | 'MINUTE_5' | 'HOUR_1' | 'DAY_1', candleType?: 'TRADE' | 'MIDPOINT'): Promise<unknown>;
    headMarketCandles(marketSymbol: string, candleInterval: 'MINUTE_1' | 'MINUTE_5' | 'HOUR_1' | 'DAY_1', candleType?: 'TRADE' | 'MIDPOINT'): Promise<unknown>;
    marketCandlesDate(marketSymbol: string, candleInterval: 'MINUTE_1' | 'MINUTE_5' | 'HOUR_1' | 'DAY_1', year: number, candleType?: 'TRADE' | 'MIDPOINT', month?: number, day?: number): Promise<unknown>;
    /**
     *
     * @returns {Promise}
     */
    ping(): Promise<unknown>;
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
