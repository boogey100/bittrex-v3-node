interface NewOrder {
    marketSymbol: string;
    direction: 'buy' | 'sell';
    type: 'limit' | 'market' | 'ceiling_limit' | 'ceiling_market';
    quantity?: number;
    ceiling?: number;
    limit?: number;
    timeInForce: 'good_til_cancelled' | 'immediate_or_cancel' | 'fill_or_kill' | 'post_only_good_til_cancelled' | 'buy_now' | 'instant';
    clientOrderId?: string;
    useAwards: boolean;
}
interface DeleteOrder {
    id: string;
}
interface BatchSchemaDelete {
    resource: 'order';
    operation: 'delete';
    payload: DeleteOrder;
}
interface BatchSchemaPost {
    resource: 'order';
    operation: 'post';
    payload: NewOrder;
}
declare type BatchSchema = BatchSchemaDelete | BatchSchemaPost;
declare type BatchSchemaBody = BatchSchema[];
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
    account(): Promise<{
        accountId: string;
    }>;
    /**
     * Get trade fee for the given marketSymbol.
     * Get trade fees for each markets when marketSymbol is not provided.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    accountFeesTrading(): Promise<{
        marketSymbol: string;
        makerRate: string;
        takerRate: string;
    }[]>;
    accountFeesTrading(marketSymbol: string): Promise<{
        marketSymbol: string;
        makerRate: string;
        takerRate: string;
    }>;
    /**
     * Get 30 day volume for account
     * @returns {Promise}
     */
    accountVolume(): Promise<{
        updated: string;
        volume30days: string;
    }>;
    /**
     * Get trading permissions when marketSymbol is not provided.
     * Get trading permissions for a single market.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    accountPermissionsMarkets(marketSymbol?: string): Promise<{
        symbol: string;
        view: boolean;
        buy: boolean;
        sell: boolean;
    }[]>;
    /**
     * Get currency permissions for a single currency.
     * Get all currency permissions when marketSymbol is not provided.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    accountPermissionsCurrencies(marketSymbol?: string): Promise<{
        symbol: string;
        view: boolean;
        deposit: {
            blockchain?: boolean;
            creditCard?: boolean;
            wireTransfer?: boolean;
            ach?: boolean;
        };
        withdraw: {
            blockchain?: boolean;
            wireTransfer?: boolean;
            ach?: boolean;
        };
    }[]>;
    /**
     * List deposit addresses that have been requested or provisioned.
     * Retrieve the status of the deposit address for a particular currency for which one has been requested or provisioned.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    addresses(): Promise<{
        status: 'REQUESTED' | 'PROVISIONED';
        currencySymbol: string;
        cryptoAddress: string;
        cryptoAddressTag?: string;
    }[]>;
    addresses(marketSymbol: string): Promise<{
        status: 'REQUESTED' | 'PROVISIONED';
        currencySymbol: string;
        cryptoAddress: string;
        cryptoAddressTag?: string;
    }>;
    addressStatus(marketSymbol: string): Promise<{
        status: "REQUESTED" | "PROVISIONED";
        currencySymbol: string;
        cryptoAddress: string;
        cryptoAddressTag?: string | undefined;
    }>;
    /**
     * Request provisioning of a deposit address for a currency
     * for which no address has been requested or provisioned.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    addressCreate(marketSymbol: string): Promise<{
        status: 'REQUESTED' | 'PROVISIONED';
        currencySymbol: string;
        cryptoAddress: string;
        cryptoAddressTag?: string;
    }>;
    /**
     * List account balances across available currencies.
     * Returns a Balance entry for each currency for which there
     * is either a balance or an address.
     * @returns {Promise}
     */
    getBalances(): Promise<{
        currencySymbol: string;
        total: string;
        available: string;
        updatedAt: string;
    }[]>;
    /**
     * Retrieve account balance for a specific currency.
     * Request will always succeed when the currency exists,
     * regardless of whether there is a balance or address.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    getBalance(marketSymbol: string): Promise<{
        currencySymbol: string;
        total: string;
        available: string;
        updatedAt: string;
    }>;
    /**
     * Get sequence of balances snapshot.
     * @returns {Promise}
     */
    balanceSnapshot(): Promise<unknown>;
    createBatch(payload: BatchSchemaBody): Promise<{
        status: number;
        payload: any;
    }[]>;
    currencies(): Promise<{
        symbol: string;
        name: string;
        coinType: string;
        status: 'online' | 'offline';
        minConfirmations: number;
        notice: string;
        txFee: number;
        logoUrl: string;
        prohibitedIn: string[];
        baseAddress: string;
        associatedTermsOfService: string[];
        tags: string[];
    }[]>;
    currencies(marketSymbol: string): Promise<{
        symbol: string;
        name: string;
        coinType: string;
        status: 'online' | 'offline';
        minConfirmations: number;
        notice: string;
        txFee: number;
        logoUrl: string;
        prohibitedIn: string[];
        baseAddress: string;
        associatedTermsOfService: string[];
        tags: string[];
    }>;
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
