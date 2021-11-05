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
    function BittrexClient(_a) {
        var _b = _a.apiKey, apiKey = _b === void 0 ? '' : _b, _c = _a.apiSecret, apiSecret = _c === void 0 ? '' : _c, _d = _a.keepAlive, keepAlive = _d === void 0 ? true : _d;
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
    /*-------------------------------------------------------------------------*
     * V3 BALANCES ENDPOINTS (3 endpoints)
     *-------------------------------------------------------------------------*/
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
    BittrexClient.prototype.balanceSnapshot = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('head', '/balances')];
            });
        });
    };
    /*-------------------------------------------------------------------------*
     * V3 BATCH ENDPOINTS (1 endpoint)
     *-------------------------------------------------------------------------*/
    BittrexClient.prototype.createBatch = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('post', '/batch', {
                        body: payload
                    })];
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
    /*-------------------------------------------------------------------------*
     * V3 DEPOSITS ENDPOINTS (5 endpoints)
     *-------------------------------------------------------------------------*/
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
                return [2 /*return*/, this.request('get', '/deposit/closed', { params: props })];
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
    /*-------------------------------------------------------------------------*
     * V3 FundsTransferMethods ENDPOINTS (1 endpoints)
     *-------------------------------------------------------------------------*/
    /*-------------------------------------------------------------------------*
     * V3 Markets ENDPOINTS (15 endpoints)
     *-------------------------------------------------------------------------*/
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
                return [2 /*return*/, this.request('get', '/markets/' + marketSymbol + '/candles/' + candleType + '/' + candleInterval + '/recent')];
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
                return [2 /*return*/, this.request('head', '/markets/' + marketSymbol + '/candles/' + candleType + '/' + candleInterval + '/recent')];
            });
        });
    };
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
    BittrexClient.prototype.marketCandlesDate = function (marketSymbol, candleInterval, year, candleType, month, day) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/markets/' + marketSymbol + '/candles/' + candleType + '/' + candleInterval + '/historical/' + year + (month && '/' + month) + (day && '/' + day))];
            });
        });
    };
    /*-------------------------------------------------------------------------*
     * V3 Orders ENDPOINTS (8 endpoints)
     *-------------------------------------------------------------------------*/
    /*-------------------------------------------------------------------------*
     * V3 Ping ENDPOINTS (1 endpoints)
     *-------------------------------------------------------------------------*/
    /**
     * Pings the service
     * @returns {Promise}
     */
    BittrexClient.prototype.ping = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/ping')];
            });
        });
    };
    /*-------------------------------------------------------------------------*
     * V3 Subaccounts ENDPOINTS (7 endpoints)
     *-------------------------------------------------------------------------*/
    /**
     * List subaccounts.
     *
     * (NOTE: This API is limited to partners and not available for traders.)
     * Pagination and the sort order of the results
     * are in inverse order of the CreatedAt field.
     * @returns
     */
    BittrexClient.prototype.subaccounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/subaccounts')];
            });
        });
    };
    // Subaccount endpoints are for partners.
    // Won't be implemented yet since I don't need it.
    /*-------------------------------------------------------------------------*
     * V3 Transfers ENDPOINTS (4 endpoints)
     *-------------------------------------------------------------------------*/
    /*-------------------------------------------------------------------------*
     * V3 Withdrawals ENDPOINTS (7 endpoints)
     *-------------------------------------------------------------------------*/
    /**
     * @private
     * @method request
     * @param {String} method
     * @param {String} url
     * @param {Object} [options.data]
     * @param {Object} [options.params]
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
                                else {
                                    throw err;
                                }
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
     * @private
     * @method requestSignature
     * @param {String} url
     * @return {String}
     */
    BittrexClient.prototype.requestSignature = function (nonce, path, method, contentHash, params) {
        var query = querystring.stringify(params);
        var url = "" + this._client.defaults.baseURL + path + (query ? '?' + query : '');
        var preSign = [nonce, url, method.toUpperCase(), contentHash, ''].join('');
        var hmac = crypto.createHmac('sha512', this._apiSecret);
        return hmac.update(preSign).digest('hex');
    };
    /**
     * @private
     * @method sanitizeParams
     * @param {Object} params
     * @return {Object}
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
     * @private
     * @method parseDates
     * @param {Array<Object>} results
     * @param {Array<String>} keys
     * @return {Array<Object>}
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
