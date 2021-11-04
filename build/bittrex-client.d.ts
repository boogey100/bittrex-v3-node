import { Method } from 'axios';
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
    /**
     * @method markets
     * @return {Promise}
     */
    markets(): Promise<any>;
    /**
     * @method currencies
     * @return {Promise}
     */
    currencies(): Promise<unknown>;
    /**
     * @method ticker
     * @param {String} market
     * @return {Promise}
     */
    ticker(market: string): Promise<unknown>;
    /**
     * @method marketSummaries
     * @return {Promise}
     */
    marketSummaries(): Promise<any>;
    /**
     * @method marketSummary
     * @param {String} market
     * @return {Promise}
     */
    marketSummary(market: string): Promise<any>;
    /**
     * @method marketHistory
     * @param {String} market
     * @return {Promise}
     */
    marketHistory(market: string): Promise<any>;
    /**
     * @method orderBook
     * @param {String} market
     * @param {String} type
     * @return {Promise}
     */
    orderBook(market: string, { type }?: any): Promise<unknown>;
    /**
     * @method buyLimit
     * @param {String} market
     * @param {String|Number} options.quantity
     * @param {String|Number} options.price
     * @return {Promise}
     */
    buyLimit(market: string, { quantity, rate, timeInForce }?: any): Promise<unknown>;
    /**
     * @method sellLimit
     * @param {String} market
     * @param {String|Number} options.quantity
     * @param {String|Number} options.price
     * @return {Promise}
     */
    sellLimit(market: string, { quantity, rate, timeInForce }?: any): Promise<unknown>;
    /**
     * @method cancelOrder
     * @param {String} uuid
     * @return {Promise}
     */
    cancelOrder(uuid: string): Promise<unknown>;
    /**
     * @method openOrders
     * @param {String} market
     * @return {Promise}
     */
    openOrders(market: string): Promise<any>;
    /**
     * @method balances
     * @return {Promise}
     */
    balances(): Promise<unknown>;
    /**
     * @method balance
     * @param {String} currency
     * @return {Promise}
     */
    balance(currency: string): Promise<unknown>;
    /**
     * @method depositAddress
     * @param {String} currency
     * @return {Promise}
     */
    depositAddress(currency: string): Promise<unknown>;
    /**
     * @method withdraw
     * @param {String} currency
     * @param {String|Number} options.quantity
     * @param {String} options.address
     * @param {String} [options.paymentid]
     * @return {Promise}
     */
    withdraw(currency: string, { quantity, address, paymentid }?: any): Promise<unknown>;
    /**
     * @method orderHistory
     * @param {String} market
     * @return {Promise}
     */
    orderHistory(market: string): Promise<any>;
    /**
     * @method order
     * @param {String} uuid
     * @return {Promise}
     */
    order(uuid: string): Promise<any>;
    /**
     * @method withdrawalHistory
     * @param {String} [currency]
     * @return {Promise}
     */
    withdrawalHistory(currency: string): Promise<any>;
    /**
     * @method depositHistory
     * @param {String} [currency]
     * @return {Promise}
     */
    depositHistory(currency: string): Promise<any>;
    /**
     * @private
     * @method request
     * @param {String} method
     * @param {String} url
     * @param {Object} [options.data]
     * @param {Object} [options.params]
     */
    request<R>(method: Method, url: string, { headers, params, body }?: any): Promise<R>;
    /**
     * @private
     * @method requestSignature
     * @param {String} url
     * @return {String}
     */
    requestSignature(nonce: number, path: string, method: Method, contentHash: string, params: any): string;
    /**
     * @private
     * @method sanitizeParams
     * @param {Object} params
     * @return {Object}
     */
    sanitizeParams(params?: any): any;
    /**
     * @private
     * @method parseDates
     * @param {Array<Object>} results
     * @param {Array<String>} keys
     * @return {Array<Object>}
     */
    parseDates(results: any, keys: string[]): any;
}
export default BittrexClient;
