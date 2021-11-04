interface NewOrder {
  marketSymbol: string
  direction: 'buy' | 'sell'
  type: 'limit' | 'market' | 'ceiling_limit' | 'ceiling_market'
  quantity?: number
  ceiling?: number
  limit?: number
  timeInForce: 'good_til_cancelled' | 'immediate_or_cancel' | 'fill_or_kill' | 'post_only_good_til_cancelled' | 'buy_now' | 'instant'
  clientOrderId?: string
  useAwards: boolean
}

interface DeleteOrder {
  id: string
}

interface BatchSchemaDelete {
  resource: 'order'
  operation: 'delete'
  payload: DeleteOrder
}
interface BatchSchemaPost {
  resource: 'order'
  operation: 'post'
  payload: NewOrder
}
type BatchSchema = BatchSchemaDelete | BatchSchemaPost

type BatchSchemaBody = BatchSchema[]

interface CommissionRatesWithMarket {
  marketSymbol: string
  makerRate: number
  takerRate: number
}

interface Account {
  subaccountId: string
  accountId: string
  actionsNeeded: string[]
}

interface AccountVolume {
  updated: string
  volume30days: number
}

interface MarketPolicy {
  symbol: string
  view: boolean
  buy: boolean
  sell: boolean
}

interface CurrencyPolicy {
  symbol: string
  view: boolean
  deposit: DepositMethods
  withdraw: WithdrawMethods
}

interface DepositMethods {
  blockchain: boolean
  creditCard: boolean
  wireTransfer: boolean
  ach: boolean
}

interface WithdrawMethods {
  blockchain: boolean
  wireTransfer: boolean
  ach: boolean
}

interface Address {
  status: 'REQUESTED' | 'PROVISIONED',
  currencySymbol: string,
  cryptoAddress: string,
  cryptoAddressTag?: string
}

interface Balance {
  currencySymbol: string,
  total: string
  available: string
  updatedAt: string
}

interface Currency {
  symbol: string
  name: string
  coinType: string
  status: 'online' | 'offline'
  minConfirmations: number
  notice: string
  txFee: number
  logoUrl: string
  prohibitedIn: string[]
  baseAddress: string
  associatedTermsOfService: string[]
  tags: string[]
}

interface ServicePing {
  serverTime: number
}

interface Market {
  symbol: string
  baseCurrencySymbol: string
  quoteCurrencySymbol: string
  minTradeSize: number
  precision: number
  status: 'online' | 'offline'
  createdAt: string
  notice: string
  prohibitedIn: string[]
  associatedTermsOfService: string[]
  tags: string[]
}

interface MarketSummary {
  symbol: string
  high: number
  low: number
  volume: number
  quoteVolume: number
  percentChange: number
  updatedAt: string
}

interface Ticker {
  symbol: string
  lastTradeRate: number
  bidRate: number
  askRate: number
}

interface OrderBookEntry {
  quantity: number
  rate: number
}

interface OrderBook {
  bid: OrderBookEntry[]
  ask: OrderBookEntry[]
}

interface Trade {
  id: string
  executedAt: string
  quantity: number
  rate: number
  takerSide: 'buy' | 'sell'
}

interface Candle {
  startsAt: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  quoteVolume: number
}

interface Subaccount {
  id: string
  createdAt: string
}

interface Execution {
  id: string
  marketSymbol: string
  executedAt: string
  quantity: number
  rate: number
  orderId: string
  commission: number
  isTaker: boolean
}

interface ExecutionLastId {
  lastId: string
}

interface ExecutionsRequestParams {
  marketSymbol?: string
  nextPageToken?: string
  previousPageToken?: string
  pageSize?: number
  startDate?: string
  endDate?: string
}