"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var crypto = require("crypto");
var https = require("https");
var querystring = require("querystring");
var BittrexClient = /** @class */ (function () {
    /**
     * Create a new client instance with API Keys
     * @param param0
     */
    function BittrexClient(_a) {
        var apiKey = _a.apiKey, apiSecret = _a.apiSecret, _b = _a.keepAlive, keepAlive = _b === void 0 ? true : _b;
        this._apiKey = apiKey;
        this._apiSecret = apiSecret;
        this._client = axios_1.default.create({
            baseURL: 'https://api.bittrex.com/v3',
            httpsAgent: new https.Agent({ keepAlive: keepAlive })
        });
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
    BittrexClient.prototype.account = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/account')];
            });
        });
    };
    BittrexClient.prototype.accountFeesTrading = function (marketSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (marketSymbol) {
                    return [2 /*return*/, this.request('get', '/account/fees/trading/' + marketSymbol)];
                }
                return [2 /*return*/, this.request('get', '/account/fees/trading')];
            });
        });
    };
    /**
     * Get 30 day volume for account
     * @returns {Promise}
     */
    BittrexClient.prototype.accountVolume = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/account/volume')];
            });
        });
    };
    /**
     * Get trading permissions when marketSymbol is not provided.
     * Get trading permissions for a single market.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    BittrexClient.prototype.accountPermissionsMarkets = function (marketSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (marketSymbol) {
                    return [2 /*return*/, this.request('get', '/account/permissions/markets/' + marketSymbol)];
                }
                return [2 /*return*/, this.request('get', '/account/permissions/markets')];
            });
        });
    };
    /**
     * Get currency permissions for a single currency.
     * Get all currency permissions when marketSymbol is not provided.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    BittrexClient.prototype.accountPermissionsCurrencies = function (marketSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (marketSymbol) {
                    return [2 /*return*/, this.request('get', '/account/permissions/currencies/' + marketSymbol)];
                }
                return [2 /*return*/, this.request('get', '/account/permissions/currencies')];
            });
        });
    };
    BittrexClient.prototype.addresses = function (marketSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (marketSymbol) {
                    return [2 /*return*/, this.request('get', '/addresses/' + marketSymbol)];
                }
                return [2 /*return*/, this.request('get', '/addresses')];
            });
        });
    };
    /**
     * Retrieve the status of the deposit address for a particular currency for which one has been requested or provisioned.
     * Alias of addresses(marketSymbol)
     * @param marketSymbol symbol of the currency to retrieve the deposit address for
     * @returns
     */
    BittrexClient.prototype.addressStatus = function (marketSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.addresses(marketSymbol)];
            });
        });
    };
    /**
     * Request provisioning of a deposit address for a currency
     * for which no address has been requested or provisioned.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    BittrexClient.prototype.addressCreate = function (marketSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('post', '/addresses', {
                        body: {
                            currencySymbol: marketSymbol
                        }
                    })];
            });
        });
    };
    //#endregion
    //#region V3 BALANCES ENDPOINTS (3 endpoints)
    /**
     * List account balances across available currencies.
     * Returns a Balance entry for each currency for which there
     * is either a balance or an address.
     * @returns {Promise}
     */
    BittrexClient.prototype.balances = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/balances')];
            });
        });
    };
    /**
     * Retrieve account balance for a specific currency.
     * Request will always succeed when the currency exists,
     * regardless of whether there is a balance or address.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
    BittrexClient.prototype.balance = function (marketSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/balances/' + marketSymbol)];
            });
        });
    };
    /**
     * Get sequence of balances snapshot.
     * @returns {Promise}
     */
    BittrexClient.prototype.headBalances = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('head', '/balances')];
            });
        });
    };
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
    BittrexClient.prototype.batch = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('post', '/batch', { body: payload })];
            });
        });
    };
    //#endregion
    //#region V3 ConditionalOrders ENDPOINTS (6 endpoints)
    /**
     * Retrieve information on a specific conditional order.
     * @param conditionalOrderId (uuid-formatted string) - ID of conditional order to retrieve
     * @returns
     */
    BittrexClient.prototype.conditionalOrders = function (conditionalOrderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/conditional-orders/' + conditionalOrderId)];
            });
        });
    };
    /**
     * Cancel a conditional order.
     * @param conditionalOrderId (uuid-formatted string) - ID of order to cancel
     * @returns
     */
    BittrexClient.prototype.conditionalOrderDelete = function (conditionalOrderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('delete', '/conditional-orders/' + conditionalOrderId)];
            });
        });
    };
    /**
     * List closed conditional orders.
     * StartDate and EndDate filters apply to the ClosedAt field.
     * Pagination and the sort order of the results are in inverse
     * order of the ClosedAt field.
     * @param props
     * @returns
     */
    BittrexClient.prototype.conditionalOrdersClosed = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/conditional-orders/closed', { params: props })];
            });
        });
    };
    /**
     * List open conditional orders.
     * @param marketSymbol filter by market (optional)
     * @returns
     */
    BittrexClient.prototype.conditionalOrdersOpen = function (marketSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/conditional-orders/open', { params: { marketSymbol: marketSymbol } })];
            });
        });
    };
    /**
     * Get sequence of open conditional orders snapshot.
     * @returns
     */
    BittrexClient.prototype.headConditionalOrdersOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('head', '/conditional-orders/open')];
            });
        });
    };
    /**
     * Create a new conditional order.
     * @param newConditionalOrder information specifying the conditional order to create
     * @returns
     */
    BittrexClient.prototype.conditionalOrdersCreate = function (newConditionalOrder) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('post', '/conditional-orders', { body: newConditionalOrder })];
            });
        });
    };
    BittrexClient.prototype.currencies = function (marketSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (marketSymbol) {
                    return [2 /*return*/, this.request('get', '/currencies/' + marketSymbol)];
                }
                return [2 /*return*/, this.request('get', '/currencies')];
            });
        });
    };
    //#endregion
    //#region V3 DEPOSITS ENDPOINTS (5 endpoints)
    /**
     * List open deposits.
     * Results are sorted in inverse order of UpdatedAt,
     * and are limited to the first 1000.
     * @param props
     * @returns
     */
    BittrexClient.prototype.depositsOpen = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/deposits/open', { params: props })];
            });
        });
    };
    /**
     * Get open deposits sequence.
     * @returns {Promise}
     */
    BittrexClient.prototype.headDepositsOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('head', '/deposits/open')];
            });
        });
    };
    /**
     * List closed deposits.
     * StartDate and EndDate filters apply to the CompletedAt field.
     * Pagination and the sort order of the results are in inverse
     * order of the CompletedAt field.
     * @returns
     */
    BittrexClient.prototype.depositsClosed = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/deposits/closed', { params: props })];
            });
        });
    };
    /**
     * Retrieves all deposits for this account with the given TxId
     * @param txId the transaction id to lookup
     * @returns
     */
    BittrexClient.prototype.depositsByTxId = function (txId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/deposits/ByTxId/' + txId)];
            });
        });
    };
    /**
     * Retrieve information for a specific deposit.
     * @param depositId (uuid-formatted string) - ID of the deposit to retrieve
     * @returns
     */
    BittrexClient.prototype.deposits = function (depositId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/deposits/' + depositId)];
            });
        });
    };
    BittrexClient.prototype.executions = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof props === 'string') {
                    return [2 /*return*/, this.request('get', '/executions/' + props)];
                }
                return [2 /*return*/, this.request('get', '/executions', { params: props })];
            });
        });
    };
    /**
     * Gets sequence number and last execution id.
     * @returns {Promise}
     */
    BittrexClient.prototype.executionLastId = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/executions/last-id')];
            });
        });
    };
    /**
     * Get sequence number for executions.
     * @returns
     */
    BittrexClient.prototype.headExecutionLastId = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('head', '/executions/last-id')];
            });
        });
    };
    //#endregion
    //#region V3 FundsTransferMethods ENDPOINTS (1 endpoints)
    /**
     * Get details about a linked bank account
     * @param fundsTransferMethodId (uuid-formatted string) - ID of funds transfer method to retrieve
     * @returns
     */
    BittrexClient.prototype.fundsTransferMethods = function (fundsTransferMethodId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/funds-transfer-methods/' + fundsTransferMethodId)];
            });
        });
    };
    //#endregion
    //#region V3 Markets ENDPOINTS (15 endpoints)
    /**
     * List markets.
     * @returns
     */
    BittrexClient.prototype.markets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('get', '/markets')];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, this.parseDates(results, ['createdAt'])];
                }
            });
        });
    };
    /**
     * List summaries of the last 24 hours of activity for all markets.
     * @returns
     */
    BittrexClient.prototype.marketsSummaries = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('get', '/markets/summaries')];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, this.parseDates(results, ['updatedAt'])];
                }
            });
        });
    };
    /**
     * Retrieve the current sequence number for the market summaries snapshot.
     * @returns
     */
    BittrexClient.prototype.headMarketsSummaries = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('head', '/markets/summaries')];
            });
        });
    };
    /**
     * List tickers for all markets.
     * @returns
     */
    BittrexClient.prototype.marketsTickers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/markets/tickers')];
            });
        });
    };
    /**
     * Retrieve the current sequence number for the tickers snapshot.
     * @returns
     */
    BittrexClient.prototype.headMarketsTickers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('head', '/markets/tickers')];
            });
        });
    };
    /**
     * Retrieve the ticker for a specific market.
     * @param marketSymbol symbol of market to retrieve ticker for
     * @returns
     */
    BittrexClient.prototype.marketTicker = function (marketSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/markets/' + marketSymbol + '/ticker')];
            });
        });
    };
    /**
     * Retrieve information for a specific market.
     * @param marketSymbol symbol of market to retrieve
     * @returns
     */
    BittrexClient.prototype.market = function (marketSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/markets/' + marketSymbol)];
            });
        });
    };
    /**
     * Retrieve summary of the last 24 hours of activity for a specific market.
     * @param marketSymbol symbol of market to retrieve summary for
     * @returns
     */
    BittrexClient.prototype.marketSummary = function (marketSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/markets/' + marketSymbol + '/summary')];
            });
        });
    };
    /**
     * Retrieve the order book for a specific market.
     * @param marketSymbol symbol of market to retrieve order book for
     * @param depth maximum depth of order book to return (optional, allowed values are [1, 25, 500], default is 25)
     * @returns
     */
    BittrexClient.prototype.marketOrderBook = function (marketSymbol, depth) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (depth && ![1, 25, 500].includes(depth)) {
                    throw Error('DEPTH_INVALID');
                }
                return [2 /*return*/, this.request('get', '/markets/' + marketSymbol + '/orderbook', { params: { depth: depth } })];
            });
        });
    };
    /**
     * Retrieve the current sequence number for the specified market's order book snapshot.
     * @param marketSymbol symbol of market to retrieve order book for
     * @param depth maximum depth of order book to return (optional, allowed values are [1, 25, 500], default is 25)
     * @returns
     */
    BittrexClient.prototype.headMarketOrderBook = function (marketSymbol, depth) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('head', '/markets/' + marketSymbol + '/orderbook', { params: { depth: depth } })];
            });
        });
    };
    /**
     * Retrieve the recent trades for a specific market.
     * @param marketSymbol symbol of market to retrieve recent trades for
     * @returns
     */
    BittrexClient.prototype.marketTrades = function (marketSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/markets/' + marketSymbol + '/trades')];
            });
        });
    };
    /**
     * Retrieve the current sequence number for the specified market's recent trades snapshot.
     * @param marketSymbol symbol of market to retrieve order book for
     * @returns
     */
    BittrexClient.prototype.headMarketTrades = function (marketSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('head', '/markets/' + marketSymbol + '/trade')];
            });
        });
    };
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
    BittrexClient.prototype.marketCandles = function (marketSymbol, candleInterval, candleType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/markets/' + marketSymbol + '/candles/' + (!!candleType ? candleType + '/' : '') + candleInterval + '/recent')];
            });
        });
    };
    /**
     * Retrieve the current sequence number for the specified market's candles snapshot.
     * @param marketSymbol symbol of market to retrieve candles for
     * @param candleInterval desired time interval between candles
     * @param candleType type of candles (trades or midpoint). This portion of the url may be omitted if trade based candles are desired (e.g. /candles/{candleInterval}/recent will return trade based candles)
     * @returns
     */
    BittrexClient.prototype.headMarketCandles = function (marketSymbol, candleInterval, candleType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('head', '/markets/' + marketSymbol + '/candles/' + (!!candleType ? candleType + '/' : '') + candleInterval + '/recent')];
            });
        });
    };
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
    BittrexClient.prototype.marketCandlesDate = function (marketSymbol, candleInterval, year, candleType, month, day) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                if (!year)
                    throw Error('Invalid year');
                if (!month && candleInterval !== 'DAY_1')
                    throw Error('Years can only be DAY_1 interval');
                if (year && month && !day && candleInterval !== 'HOUR_1')
                    throw Error('Year+month can only be HOUR_1 interval');
                if (day && (candleInterval !== 'MINUTE_1' && candleInterval !== 'MINUTE_5'))
                    throw Error('Year+month+day and only be MINUTE_5 or MINUTE_1 interval');
                url = '/markets/' + marketSymbol + '/candles/' + (!!candleType ? candleType + '/' : '') + candleInterval + '/historical/' + year + (!!month ? '/' + month : '') + (!!day ? '/' + day : '');
                return [2 /*return*/, this.request('get', url)];
            });
        });
    };
    //#endregion
    //#region V3 Orders ENDPOINTS (8 endpoints)
    /**
     * List closed orders.
     * StartDate and EndDate filters apply to the ClosedAt field.
     * Pagination and the sort order of the results are in inverse order of the ClosedAt field.
     * @param props
     * @returns
     */
    BittrexClient.prototype.ordersClosed = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/orders/closed', {
                        params: props
                    })];
            });
        });
    };
    /**
     * List open orders.
     * @param marketSymbol filter by market (optional)
     * @returns
     */
    BittrexClient.prototype.ordersOpen = function (marketSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/orders/open', { params: { marketSymbol: marketSymbol } })];
            });
        });
    };
    /**
     * Bulk cancel all open orders (can be limited to a specified market)
     * @param marketSymbol
     * @returns
     */
    BittrexClient.prototype.ordersDelete = function (marketSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('delete', '/orders/open', { params: { marketSymbol: marketSymbol } })];
            });
        });
    };
    /**
     * Get sequence of open orders snapshot.
     * @returns
     */
    BittrexClient.prototype.headOrdersOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('head', '/orders/open')];
            });
        });
    };
    /**
     * Retrieve information on a specific order.
     * @param orderId (uuid-formatted string) - ID of order to retrieve
     * @returns
     */
    BittrexClient.prototype.order = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/orders/' + orderId)];
            });
        });
    };
    /**
     * Cancel an order.
     * @param orderId (uuid-formatted string) - ID of order to cancel
     * @returns
     */
    BittrexClient.prototype.orderDelete = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('delete', '/orders/' + orderId)];
            });
        });
    };
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
    BittrexClient.prototype.ordersExecutions = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/orders/' + orderId + '/executions')];
            });
        });
    };
    /**
     * Create a new order.
     * @param newOrder information specifying the order to create
     * @returns
     */
    BittrexClient.prototype.orderCreate = function (newOrder) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('post', '/orders', { body: newOrder })];
            });
        });
    };
    //#endregion
    //#region V3 Ping ENDPOINTS (1 endpoints)
    /**
     * Pings the service
     * @returns {Promise<ServicePing>}
     */
    BittrexClient.prototype.ping = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/ping')];
            });
        });
    };
    BittrexClient.prototype.subaccounts = function (subaccountId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (subaccountId) {
                    return [2 /*return*/, this.request('get', '/subaccounts/' + subaccountId)];
                }
                return [2 /*return*/, this.request('get', '/subaccounts')];
            });
        });
    };
    /**
     * Create a new subaccount.
     *
     * (NOTE: This API is limited to partners and not available for traders.)
     *
     * (WARNING: Official API doesn't provide information about NewSubaccount body payload)
     * @param payload information specifying the subaccount to create
     * @returns
     */
    BittrexClient.prototype.subaccountCreate = function (newSubaccount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('post', '/subaccounts', { body: newSubaccount })];
            });
        });
    };
    /**
     * List open withdrawals for all subaccounts.
     *
     * Results are sorted in inverse order of the CreatedAt field, and are limited to the first 1000.
     * @param options
     * @returns
     */
    BittrexClient.prototype.subaccountWithdrawalsOpen = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/subaccounts/withdrawals/open', { params: options })];
            });
        });
    };
    /**
     * List closed withdrawals for all subaccounts.
     *
     * StartDate and EndDate filters apply to the CompletedAt field.
     *
     * Pagination and the sort order of the results are in inverse order of the CompletedAt field.
     * @param options
     * @returns
     */
    BittrexClient.prototype.subaccountWithdrawalsClosed = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/subaccounts/withdrawals/closed', { params: options })];
            });
        });
    };
    /**
     * List closed deposits for all subaccounts.
     *
     * StartDate and EndDate filters apply to the CompletedAt field.
     *
     * Pagination and the sort order of the results are in inverse order of the CompletedAt field.
     * @param options
     * @returns
     */
    BittrexClient.prototype.subaccountsDepositsClosed = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/subaccounts/deposits/closed', { params: options })];
            });
        });
    };
    //#endregion
    //#region V3 Transfers ENDPOINTS (4 endpoints)
    /**
     * List sent transfers.
     * (NOTE: This API is limited to partners and not available for traders.)
     * Pagination and the sort order of the results are in inverse order of the Executed field.
     * @param options
     * @returns
     */
    BittrexClient.prototype.transfersSent = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/transfers/sent', { params: options })];
            });
        });
    };
    /**
     * List received transfers.
     * (NOTE: This API is limited to partners and not available for traders.)
     * Pagination and the sort order of the results are in inverse order of the Executed field.
     * @param options
     * @returns
     */
    BittrexClient.prototype.transfersReceived = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/transfers/received', { params: options })];
            });
        });
    };
    /**
     * Retrieve information on the specified transfer.
     * (NOTE: This API is limited to partners and not available for traders.)
     * @param transferId (uuid-formatted string) - ID of the transfer to retrieve
     * @returns
     */
    BittrexClient.prototype.transfer = function (transferId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/transfers/' + transferId)];
            });
        });
    };
    /**
     * Executes a new transfer.
     * (NOTE: This API is limited to partners and not available for traders.)
     * @param newTransfer information specifying the transfer to execute
     * @returns
     */
    BittrexClient.prototype.transferCreate = function (newTransfer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('post', '/transfers', { body: newTransfer })];
            });
        });
    };
    //#endregion
    //#region V3 Withdrawals ENDPOINTS (7 endpoints)
    /**
     * List open withdrawals. Results are sorted in inverse order of the CreatedAt field, and are limited to the first 1000.
     * @param props
     * @returns
     */
    BittrexClient.prototype.withdrawalsOpen = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/withdrawals/open', { params: props })];
            });
        });
    };
    /**
     * List closed withdrawals.
     *
     * StartDate and EndDate filters apply to the CompletedAt field.
     *
     * Pagination and the sort order of the results are in inverse order of the CompletedAt field.
     * @param props
     * @returns
     */
    BittrexClient.prototype.withdrawalsClosed = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/withdrawals/closed', { params: props })];
            });
        });
    };
    /**
     * Retrieves all withdrawals for this account with the given TxId
     * @param txId the transaction id to lookup
     * @returns
     */
    BittrexClient.prototype.withdrawalByTxId = function (txId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/withdrawals/ByTxId/' + txId)];
            });
        });
    };
    /**
     * Retrieve information on a specified withdrawal.
     * @param withdrawalId (uuid-formatted string) - ID of withdrawal to retrieve
     * @returns
     */
    BittrexClient.prototype.withdrawal = function (withdrawalId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/withdrawals/' + withdrawalId)];
            });
        });
    };
    /**
     * Cancel a withdrawal.
     *
     * (Withdrawals can only be cancelled if status is REQUESTED, AUTHORIZED, or ERROR_INVALID_ADDRESS.)
     * @param withdrawalId
     * @returns
     */
    BittrexClient.prototype.withdrawalDelete = function (withdrawalId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('delete', '/withdrawals/' + withdrawalId)];
            });
        });
    };
    /**
     * Create a new withdrawal.
     *
     * To initiate a fiat withdrawal specify a funds transfer method id instead of a crypto address.
     * @param newWithdrawal information specifying the withdrawal to create
     * @returns
     */
    BittrexClient.prototype.withdrawalCreate = function (newWithdrawal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('post', '/withdrawals', { body: newWithdrawal })];
            });
        });
    };
    /**
     * Returns a list of allowed addresses.
     * @returns
     */
    BittrexClient.prototype.withdrawalsAllowedAddresses = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/withdrawals/allowed-addresses')];
            });
        });
    };
    //#endregion
    //#region private methods
    /**
     * Creates an axios request with signed headers
     * @param method request method (GET, POST, HEAD...)
     * @param url base url without query string
     * @param options
     * @returns
     */
    BittrexClient.prototype.request = function (method, url, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.headers, headers = _c === void 0 ? {} : _c, _d = _b.params, params = _d === void 0 ? {} : _d, _e = _b.body, body = _e === void 0 ? '' : _e;
        return __awaiter(this, void 0, void 0, function () {
            var nonce, contentHash, data;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        params = this.sanitizeParams(params);
                        if (this._apiKey) {
                            nonce = Date.now();
                            contentHash = crypto.createHash('sha512').update(body ? JSON.stringify(body) : '').digest('hex');
                            headers['Api-Key'] = this._apiKey;
                            headers['Api-Timestamp'] = nonce;
                            headers['Api-Content-Hash'] = contentHash;
                            headers['Api-Signature'] = this.requestSignature(nonce, url, method, contentHash, params);
                        }
                        return [4 /*yield*/, this._client.request({ method: method, url: url, headers: headers, params: params, data: body }).catch(function (err) {
                                if (err.isAxiosError) {
                                    return err.response;
                                }
                                /* istanbul ignore next */
                                throw err;
                            })];
                    case 1:
                        data = (_f.sent()).data;
                        if (data.code) {
                            throw new Error(data.code);
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * Create a pre-sign string, and sign via HmacSHA512, using your API secret as the signing secret. Hex-encode the result of this operation and populate the Api-Signature header with it.
     * @param nonce
     * @param path
     * @param method
     * @param contentHash
     * @param params query string params
     * @returns
     */
    BittrexClient.prototype.requestSignature = function (nonce, path, method, contentHash, params) {
        var query = querystring.stringify(params);
        var url = "" + this._client.defaults.baseURL + path + (query ? '?' + query : '');
        var preSign = [nonce, url, method.toUpperCase(), contentHash, ''].join('');
        var hmac = crypto.createHmac('sha512', this._apiSecret);
        return hmac.update(preSign).digest('hex');
    };
    /**
     * Clean up object removing undefined keys in order to avoid
     * useless query params in the request.
     * @param params
     * @returns
     */
    BittrexClient.prototype.sanitizeParams = function (params) {
        if (params === void 0) { params = {}; }
        var obj = {};
        for (var _i = 0, _a = Object.keys(params); _i < _a.length; _i++) {
            var key = _a[_i];
            if (params[key] === undefined)
                continue;
            obj[key] = params[key];
        }
        return obj;
    };
    /**
     * Convert ISO String dates to Date instances
     * @param results
     * @param keys
     * @returns
     */
    BittrexClient.prototype.parseDates = function (results, keys) {
        for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
            var result = results_1[_i];
            for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
                var key = keys_1[_a];
                if (!result[key])
                    continue;
                result[key] = new Date("" + result[key]);
            }
        }
        return results;
    };
    return BittrexClient;
}());
exports.default = BittrexClient;
//# sourceMappingURL=bittrex-client.js.map