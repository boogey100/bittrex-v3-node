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
     * @constructor
     * @param {String} [options.apiKey=null]
     * @param {String} [options.apiSecret=null]
     * @param {Boolean} [options.keepAlive=true]
     */
    function BittrexClient(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.apiKey, apiKey = _c === void 0 ? '' : _c, _d = _b.apiSecret, apiSecret = _d === void 0 ? '' : _d, _e = _b.keepAlive, keepAlive = _e === void 0 ? true : _e;
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
    /**
     * Get trade fee for the given marketSymbol.
     * Get trade fees for each markets when marketSymbol is not provided.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
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
    /*-------------------------------------------------------------------------*
     * V3 ADDRESSES ENDPOINTS (3 endpoints)
     *-------------------------------------------------------------------------*/
    /**
     * List deposit addresses that have been requested or provisioned.
     * Retrieve the status of the deposit address for a particular currency for which one has been requested or provisioned.
     * @param {string} marketSymbol
     * @returns {Promise}
     */
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
    BittrexClient.prototype.getBalances = function () {
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
    BittrexClient.prototype.getBalance = function (marketSymbol) {
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
    /*-------------------------------------------------------------------------*
     * V3 ConditionalOrders ENDPOINTS (6 endpoints)
     *-------------------------------------------------------------------------*/
    /*-------------------------------------------------------------------------*
     * V3 CURRENCIES ENDPOINTS (2 endpoints)
     *-------------------------------------------------------------------------*/
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
    /*-------------------------------------------------------------------------*
     * V3 Orders ENDPOINTS (8 endpoints)
     *-------------------------------------------------------------------------*/
    /*-------------------------------------------------------------------------*
     * V3 Ping ENDPOINTS (1 endpoints)
     *-------------------------------------------------------------------------*/
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
     * Public
     *-------------------------------------------------------------------------*/
    /**
     * @method markets
     * @return {Promise}
     */
    BittrexClient.prototype.markets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('get', '/public/getmarkets')];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, this.parseDates(results, ['Created'])];
                }
            });
        });
    };
    /**
     * @method currencies
     * @return {Promise}
     */
    BittrexClient.prototype.currencies = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/public/getcurrencies')];
            });
        });
    };
    /**
     * @method ticker
     * @param {String} market
     * @return {Promise}
     */
    BittrexClient.prototype.ticker = function (market) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                if (!market)
                    throw new Error('market is required');
                params = { market: market };
                return [2 /*return*/, this.request('get', '/public/getticker', { params: params })];
            });
        });
    };
    /**
     * @method marketSummaries
     * @return {Promise}
     */
    BittrexClient.prototype.marketSummaries = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('get', '/public/getmarketsummaries')];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, this.parseDates(results, ['TimeStamp', 'Created'])];
                }
            });
        });
    };
    /**
     * @method marketSummary
     * @param {String} market
     * @return {Promise}
     */
    BittrexClient.prototype.marketSummary = function (market) {
        return __awaiter(this, void 0, void 0, function () {
            var params, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!market)
                            throw new Error('market is required');
                        params = { market: market };
                        return [4 /*yield*/, this.request('get', '/public/getmarketsummary', { params: params })];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, this.parseDates(results, ['TimeStamp', 'Created'])];
                }
            });
        });
    };
    /**
     * @method marketHistory
     * @param {String} market
     * @return {Promise}
     */
    BittrexClient.prototype.marketHistory = function (market) {
        return __awaiter(this, void 0, void 0, function () {
            var params, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!market)
                            throw new Error('market is required');
                        params = { market: market };
                        return [4 /*yield*/, this.request('get', '/public/getmarkethistory', { params: params })];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, this.parseDates(results, ['TimeStamp'])];
                }
            });
        });
    };
    /**
     * @method orderBook
     * @param {String} market
     * @param {String} type
     * @return {Promise}
     */
    BittrexClient.prototype.orderBook = function (market, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.type, type = _c === void 0 ? 'both' : _c;
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_d) {
                if (!market)
                    throw new Error('market is required');
                if (!type)
                    throw new Error('options.type is required');
                params = { market: market, type: type };
                return [2 /*return*/, this.request('get', '/public/getorderbook', { params: params })];
            });
        });
    };
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
    BittrexClient.prototype.buyLimit = function (market, _a) {
        var _b = _a === void 0 ? {} : _a, quantity = _b.quantity, rate = _b.rate, _c = _b.timeInForce, timeInForce = _c === void 0 ? 'GTC' : _c;
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_d) {
                if (!market)
                    throw new Error('market is required');
                if (!quantity)
                    throw new Error('options.quantity is required');
                if (!rate)
                    throw new Error('options.rate is required');
                if (timeInForce !== 'IOC' && timeInForce !== 'GTC')
                    throw new Error('options.timeInForce not IOC or GTC');
                params = {
                    market: market,
                    quantity: parseFloat(quantity).toFixed(8),
                    rate: parseFloat(rate).toFixed(8),
                    timeInForce: timeInForce
                };
                return [2 /*return*/, this.request('get', '/market/buylimit', { params: params })];
            });
        });
    };
    /**
     * @method sellLimit
     * @param {String} market
     * @param {String|Number} options.quantity
     * @param {String|Number} options.price
     * @return {Promise}
     */
    BittrexClient.prototype.sellLimit = function (market, _a) {
        var _b = _a === void 0 ? {} : _a, quantity = _b.quantity, rate = _b.rate, _c = _b.timeInForce, timeInForce = _c === void 0 ? 'GTC' : _c;
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_d) {
                if (!market)
                    throw new Error('market is required');
                if (!quantity)
                    throw new Error('options.quantity is required');
                if (!rate)
                    throw new Error('options.rate is required');
                if (timeInForce !== 'IOC' && timeInForce !== 'GTC')
                    throw new Error('options.timeInForce not IOC or GTC');
                params = {
                    market: market,
                    quantity: parseFloat(quantity).toFixed(8),
                    rate: parseFloat(rate).toFixed(8),
                    timeInForce: timeInForce
                };
                return [2 /*return*/, this.request('get', '/market/selllimit', { params: params })];
            });
        });
    };
    /**
     * @method cancelOrder
     * @param {String} uuid
     * @return {Promise}
     */
    BittrexClient.prototype.cancelOrder = function (uuid) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                if (!uuid)
                    throw new Error('uuid is required');
                params = { uuid: uuid };
                return [2 /*return*/, this.request('get', '/market/cancel', { params: params })];
            });
        });
    };
    /**
     * @method openOrders
     * @param {String} market
     * @return {Promise}
     */
    BittrexClient.prototype.openOrders = function (market) {
        return __awaiter(this, void 0, void 0, function () {
            var params, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { market: market };
                        return [4 /*yield*/, this.request('get', '/market/getopenorders', { params: params })];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, this.parseDates(results, ['Opened'])];
                }
            });
        });
    };
    /*-------------------------------------------------------------------------*
     * Account
     *-------------------------------------------------------------------------*/
    /**
     * @method balances
     * @return {Promise}
     */
    BittrexClient.prototype.balances = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('get', '/account/getbalances')];
            });
        });
    };
    /**
     * @method balance
     * @param {String} currency
     * @return {Promise}
     */
    BittrexClient.prototype.balance = function (currency) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                if (!currency)
                    throw new Error('currency is required');
                params = { currency: currency };
                return [2 /*return*/, this.request('get', '/account/getbalance', { params: params })];
            });
        });
    };
    /**
     * @method depositAddress
     * @param {String} currency
     * @return {Promise}
     */
    BittrexClient.prototype.depositAddress = function (currency) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                if (!currency)
                    throw new Error('currency is required');
                params = { currency: currency };
                return [2 /*return*/, this.request('get', '/account/getdepositaddress', { params: params })];
            });
        });
    };
    /**
     * @method withdraw
     * @param {String} currency
     * @param {String|Number} options.quantity
     * @param {String} options.address
     * @param {String} [options.paymentid]
     * @return {Promise}
     */
    BittrexClient.prototype.withdraw = function (currency, _a) {
        var _b = _a === void 0 ? {} : _a, quantity = _b.quantity, address = _b.address, paymentid = _b.paymentid;
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_c) {
                if (!currency)
                    throw new Error('currency is required');
                if (!quantity)
                    throw new Error('options.quantity is required');
                if (!address)
                    throw new Error('options.address is required');
                params = { currency: currency, quantity: quantity, address: address, paymentid: paymentid };
                return [2 /*return*/, this.request('get', '/account/withdraw', { params: params })];
            });
        });
    };
    /**
     * @method orderHistory
     * @param {String} market
     * @return {Promise}
     */
    BittrexClient.prototype.orderHistory = function (market) {
        return __awaiter(this, void 0, void 0, function () {
            var params, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { market: market };
                        return [4 /*yield*/, this.request('get', '/account/getorderhistory', { params: params })];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, this.parseDates(results, ['TimeStamp', 'Closed'])];
                }
            });
        });
    };
    /**
     * @method order
     * @param {String} uuid
     * @return {Promise}
     */
    BittrexClient.prototype.order = function (uuid) {
        return __awaiter(this, void 0, void 0, function () {
            var params, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!uuid)
                            throw new Error('uuid is required');
                        params = { uuid: uuid };
                        return [4 /*yield*/, this.request('get', '/account/getorder', { params: params })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, this.parseDates([result], ['Opened', 'Closed'])[0]];
                }
            });
        });
    };
    /**
     * @method withdrawalHistory
     * @param {String} [currency]
     * @return {Promise}
     */
    BittrexClient.prototype.withdrawalHistory = function (currency) {
        return __awaiter(this, void 0, void 0, function () {
            var params, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { currency: currency };
                        return [4 /*yield*/, this.request('get', '/account/getwithdrawalhistory', { params: params })];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, this.parseDates(results, ['LastUpdated'])];
                }
            });
        });
    };
    /**
     * @method depositHistory
     * @param {String} [currency]
     * @return {Promise}
     */
    BittrexClient.prototype.depositHistory = function (currency) {
        return __awaiter(this, void 0, void 0, function () {
            var params, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { currency: currency };
                        return [4 /*yield*/, this.request('get', '/account/getdeposithistory', { params: params })];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, this.parseDates(results, ['LastUpdated'])];
                }
            });
        });
    };
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
                result[key] = new Date(result[key] + "Z");
            }
        }
        return results;
    };
    return BittrexClient;
}());
exports.default = BittrexClient;
