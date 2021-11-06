export interface NewOrder {
  marketSymbol: string
  direction: 'buy' | 'sell'
  type: 'limit' | 'market' | 'ceiling_limit' | 'ceiling_market'
  quantity?: number
  ceiling?: number
  limit?: number
  timeInForce: 'good_til_cancelled' | 'immediate_or_cancel' | 'fill_or_kill' | 'post_only_good_til_cancelled' | 'buy_now' | 'instant'
  clientOrderId?: string
  useAwards?: boolean
}

export interface DeleteOrder {
  id: string
}

export interface BatchSchemaDelete {
  resource: 'order'
  operation: 'delete'
  payload: DeleteOrder
}
export interface BatchSchemaPost {
  resource: 'order'
  operation: 'post'
  payload: NewOrder
}
type BatchSchema = BatchSchemaDelete | BatchSchemaPost

export type BatchSchemaBody = BatchSchema[]

export interface CommissionRatesWithMarket {
  marketSymbol: string
  makerRate: number
  takerRate: number
}

export interface Account {
  subaccountId: string
  accountId: string
  actionsNeeded: string[]
}

export interface AccountVolume {
  updated: string
  volume30days: number
}

export interface MarketPolicy {
  symbol: string
  view: boolean
  buy: boolean
  sell: boolean
}

export interface CurrencyPolicy {
  symbol: string
  view: boolean
  deposit: DepositMethods
  withdraw: WithdrawMethods
}

export interface DepositMethods {
  blockchain: boolean
  creditCard: boolean
  wireTransfer: boolean
  ach: boolean
}

export interface WithdrawMethods {
  blockchain: boolean
  wireTransfer: boolean
  ach: boolean
}

export interface Address {
  status: 'REQUESTED' | 'PROVISIONED',
  currencySymbol: string,
  cryptoAddress: string,
  cryptoAddressTag?: string
}

export interface Balance {
  currencySymbol: string,
  total: string
  available: string
  updatedAt: string
}

export interface Currency {
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

export interface ServicePing {
  serverTime: number
}

export interface Market {
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

export interface MarketSummary {
  symbol: string
  high: number
  low: number
  volume: number
  quoteVolume: number
  percentChange: number
  updatedAt: string
}

export interface Ticker {
  symbol: string
  lastTradeRate: number
  bidRate: number
  askRate: number
}

export interface OrderBookEntry {
  quantity: number
  rate: number
}

export interface OrderBook {
  bid: OrderBookEntry[]
  ask: OrderBookEntry[]
}

export interface Trade {
  id: string
  executedAt: string
  quantity: number
  rate: number
  takerSide: 'buy' | 'sell'
}

export interface Candle {
  startsAt: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  quoteVolume: number
}

export interface Subaccount {
  id: string
  createdAt: string
}
export interface Execution {
  id: string
  marketSymbol: string
  executedAt: string
  quantity: number
  rate: number
  orderId: string
  commission: number
  isTaker: boolean
}

export interface ExecutionLastId {
  lastId: string
}

export interface ExecutionsRequestParams {
  marketSymbol?: string
  nextPageToken?: string
  previousPageToken?: string
  pageSize?: number
  startDate?: string
  endDate?: string
}

export interface Deposit {
  id: string
  currencySymbol: string
  quantity: number
  cryptoAddress: string
  fundsTransferMethodId: string
  cryptoAddressTag: string
  txId: string
  confirmations: number
  updatedAt: string
  completedAt: string
  status: 'pending' | 'completed' | 'orphaned' | 'invalidated'
  source: 'blockchain' | 'wire_transfer' | 'credit_card' | 'ach' | 'airdrop'
  accountId: string
  error: Error
}

export interface Error {
  code: string
  detail?: string
  data?: any
}

export interface NewCancelConditionalOrder {
  type: 'order' | 'conditional_order'
  id?: string
}

export interface ConditionalOrder {
  id: string
  marketSymbol: string
  operand: 'lte' | 'gte'
  triggerPrice: number
  trailingStopPercent: number
  createdOrderId: string
  orderToCreate: NewOrder
  orderToCancel: NewCancelConditionalOrder
  clientConditionalOrderId: string
  status: 'open' | 'completed' | 'cancelled' | 'failed'
  orderCreationErrorCode: string
  createdAt: string
  updatedAt: string
  closedAt: string
}

export interface NewConditionalOrder {
  marketSymbol: string
  operand: 'lte' | 'gte'
  triggerPrice?: number
  trailingStopPercent?: number
  orderToCreate?: NewOrder
  orderToCancel?: NewCancelConditionalOrder
  clientConditionalOrderId?: string
}

export interface FundsTransferMethod {
  id: string
  friendlyName: string
  bankName: string
  accountNumber: string
  state: 'disabled' | 'enabled' | 'deleted' | 'pending' | 'verification_required' | 'validation_failed'
  type: 'wire' | 'sepa' | 'instant_settlement' | 'ach' | 'sen'
  depositOnly: boolean
}

export interface Withdrawal {
  id: string
  currencySymbol: string
  quantity: number
  cryptoAddress: string
  cryptoAddressTag?: string
  fundsTransferMethodId?: string
  txCost?: number
  txId?: string
  status: 'requested' | 'authorized' | 'pending' | 'completed' | 'error_invalid_address' | 'cancelled' | 'new'
  createdAt: string
  completedAt?: string
  clientWithdrawalId: string
  target?: 'blockchain' | 'wire_transfer' | 'credit_card' | 'ach'
  accountId?: string
  error?: Error
}

export interface SentTransferInfo {
  toSubaccountId: string
  toMasterAccount?: boolean
  id: string
  requestId?: string
  currencySymbol: string
  amount: number
  executedAt: string
}

export interface ReceivedTransferInfo {
  fromSubaccountId: string
  frommasterAccount?: boolean
  id: string
  requestId?: string
  currencySymbol: string
  amount: number
  executedAt: string
}

export interface NewTransfer {
  toSubaccountId?: string
  requestId?: string
  currencySymbol: string
  amount: number
  toMasterAccount?: boolean
}

export interface Order {
  id: string
  marketSymbol: string
  direction: 'BUY' | 'SELL'
  type: 'LIMIT' | 'MARKET' | 'CEILING_LIMIT' | 'CEILING_MARKET'
  quantity?: number
  limit?: number
  ceiling?: number
  timeInForce: 'GOOD_TIL_CANCELLED' | 'IMMEDIATE_OR_CANCEL' | 'FILL_OR_KILL' | 'POST_ONLY_GOOD_TIL_CANCELLED' | 'BUY_NOW' | 'INSTANT'
  clientOrderId?: string
  fillQuantity: number
  commision: number
  proceeds: number
  status: 'OPEN' | 'CLOSED'
  createdAt: string
  updatedAt?: string
  closedAt?: string
  orderToCancel?: NewCancelConditionalOrder
}

export interface BulkCancelResult {
  id: string
  statusCode: string
  result: Order
}

export interface NewWithdrawal {
  currencySymbol: string
  quantity: number
  cryptoAddress?: string
  cryptoAddressTag?: string
  fundsTransferMethodId?: string
  clientWithdrawalId: string
}

export interface AllowedAddress {
  currencySymbol: string
  createdAt: string
  status: 'ACTIVE' | 'PENDING'
  activeAt?: string
  cryptoAddress: string
  cryptoAddressTag?: string
}

export interface NewSubaccount {
}