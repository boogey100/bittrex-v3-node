interface NewOrder {
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

interface Deposit {
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

interface Error {
  code: string
  detail?: string
  data?: any
}

interface NewCancelConditionalOrder {
  type: 'order' | 'conditional_order'
  id?: string
}

interface ConditionalOrder {
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

interface NewConditionalOrder {
  marketSymbol: string
  operand: 'lte' | 'gte'
  triggerPrice?: number
  trailingStopPercent?: number
  orderToCreate?: NewOrder
  orderToCancel?: NewCancelConditionalOrder
  clientConditionalOrderId?: string
}

interface FundsTransferMethod {
  id: string
  friendlyName: string
  bankName: string
  accountNumber: string
  state: 'disabled' | 'enabled' | 'deleted' | 'pending' | 'verification_required' | 'validation_failed'
  type: 'wire' | 'sepa' | 'instant_settlement' | 'ach' | 'sen'
  depositOnly: boolean
}

interface Withdrawal {
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

interface SentTransferInfo {
  toSubaccountId: string
  toMasterAccount?: boolean
  id: string
  requestId?: string
  currencySymbol: string
  amount: number
  executedAt: string
}

interface ReceivedTransferInfo {
  fromSubaccountId: string
  frommasterAccount?: boolean
  id: string
  requestId?: string
  currencySymbol: string
  amount: number
  executedAt: string
}

interface NewTransfer {
  toSubaccountId?: string
  requestId?: string
  currencySymbol: string
  amount: number
  toMasterAccount?: boolean
}