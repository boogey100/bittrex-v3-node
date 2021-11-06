# bittrex-v3-node

[![wercker status](https://app.wercker.com/status/feb7e7d87d5a4a29ea9c04b4a1350a44/s/master "wercker status")](https://app.wercker.com/project/byKey/feb7e7d87d5a4a29ea9c04b4a1350a44)
[![codecov](https://codecov.io/gh/JAlbertoGonzalez/bittrex-node/branch/master/graph/badge.svg?token=4OAXQYECUQ)](https://codecov.io/gh/JAlbertoGonzalez/bittrex-node)

This project is based on [Andrew Barba](https://github.com/AndrewBarba) [bittrex-node](https://github.com/AndrewBarba/bittrex-node). It is mainly developed for personal use, but feel free to fork, notify issues or pull request contributions.

## Development status

> :warning: **This package is under development**: Use at your own risk.

This warning will be removed when all base endpoints and tests are finished.

### Assumptions

* This project will be written in TypeScript. Params and responses will be strictly typed according to official docs.
* Endpoint details will be documented with the official [bittrex API V3 documentation](https://bittrex.github.io/api/v3).
* This project won't be compatible with any v1.1 API version. Use [bittrex-node](https://github.com/AndrewBarba/bittrex-node) for that purpose.
* Libraries will be updated to latest version, specially axios, to avoid the latest well-known security issues with old versions.
* Tests + coverage will be provided.

### General overview

- [x] V3 Authenticated requests
- [ ] Rate Limits control
- [x] Pagination support
- [ ] Error codes
- [ ] Parse number and Date response fields
- [ ] Websockets support
- [ ] Unit tests (safe to run with real API keys)

### API Endpoints

- [x] Account
- [x] Addresses
- [x] Balances
- [x] Batch
- [x] ConditionalOrders
- [x] Currencies
- [x] Deposits
- [x] Executions
- [x] FundsTransferMethods
- [x] Markets
- [x] Orders
- [x] Ping
- [x] Subaccounts
- [x] Transfers
- [x] Withdrawals

A full-featured Bittrex API client for Node.js

- [x] Supports all documented v3 endpoints
- [x] 100% unit-test coverage
- [x] Heavily documented
- [x] Promise based with async/await

## Documentation


## Get started

If you're using the Bittrex REST API, I can assure you this is the only library worth using. Here's why:

- It doesn't make you parse the Bittrex response and look for errors
- It properly parses all timestamps to JavaScript Date objects
- It uses proper JavaScript and Node conventions
- It throws proper errors when parameters are missing
- It uses a single https client with Keep-Alive enabled
- It's faster than every other node Bittrex library

## Initialize Client

```javascript
const { BittrexClient } = require('bittrex-v3-node')

let client = new BittrexClient({
  apiKey: '12345',
  apiSecret: 'abcde'
})
```

## Public Methods

```javascript
await client.markets()
await client.currencies()
await client.ticker('BTC-ETH')
await client.marketSummaries()
await client.marketSummary('BTC-ETH')
await client.marketHistory('BTC-ETH')
await client.orderBook('BTC-ETH', { type: 'both' })
```

## Market Methods

```javascript
await client.buyLimit('BTC-ETH', { quantity: 2.1, price: 0.1 })
await client.sellLimit('BTC-ETH', { quantity: 2.1, price: 0.1 })
await client.cancelOrder('1234-5678')
await client.openOrders('BTC-ETH')
```

## Account Methods

```javascript
await client.balances()
await client.balance('BTC')
await client.depositAddress('BTC')
await client.withdraw('BTC', { quantity: 1.2, address: 'abcde' })
await client.order('30594e6e-ba54-4914-96f3-5b9d5de2468e')
await client.orderHistory('BTC-ETH')
await client.withdrawalHistory('BTC')
await client.depositHistory('BTC')
```
