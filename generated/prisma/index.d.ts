
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Property
 * 
 */
export type Property = $Result.DefaultSelection<Prisma.$PropertyPayload>
/**
 * Model UnitType
 * 
 */
export type UnitType = $Result.DefaultSelection<Prisma.$UnitTypePayload>
/**
 * Model Unit
 * 
 */
export type Unit = $Result.DefaultSelection<Prisma.$UnitPayload>
/**
 * Model Booking
 * 
 */
export type Booking = $Result.DefaultSelection<Prisma.$BookingPayload>
/**
 * Model PriceSnapshot
 * 
 */
export type PriceSnapshot = $Result.DefaultSelection<Prisma.$PriceSnapshotPayload>
/**
 * Model PaymentIntent
 * 
 */
export type PaymentIntent = $Result.DefaultSelection<Prisma.$PaymentIntentPayload>
/**
 * Model PaymentTransaction
 * 
 */
export type PaymentTransaction = $Result.DefaultSelection<Prisma.$PaymentTransactionPayload>
/**
 * Model ProviderEvent
 * 
 */
export type ProviderEvent = $Result.DefaultSelection<Prisma.$ProviderEventPayload>
/**
 * Model MessageThread
 * 
 */
export type MessageThread = $Result.DefaultSelection<Prisma.$MessageThreadPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  GUEST: 'GUEST'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Currency: {
  XAF: 'XAF',
  EUR: 'EUR',
  USD: 'USD'
};

export type Currency = (typeof Currency)[keyof typeof Currency]


export const BookingStatus: {
  DRAFT: 'DRAFT',
  RESERVED: 'RESERVED',
  CONFIRMED: 'CONFIRMED',
  CHECKED_IN: 'CHECKED_IN',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]


export const PaymentStatus: {
  NOT_REQUIRED: 'NOT_REQUIRED',
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  EXPIRED: 'EXPIRED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const PaymentMethod: {
  PAY_ON_ARRIVAL: 'PAY_ON_ARRIVAL',
  CARD: 'CARD',
  MOBILE_MONEY: 'MOBILE_MONEY'
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]


export const PaymentProvider: {
  INTERNAL: 'INTERNAL',
  STRIPE: 'STRIPE',
  MTN_MOMO: 'MTN_MOMO',
  ORANGE_MOMO: 'ORANGE_MOMO',
  CUSTOM: 'CUSTOM'
};

export type PaymentProvider = (typeof PaymentProvider)[keyof typeof PaymentProvider]


export const UnitTypeStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ARCHIVED: 'ARCHIVED'
};

export type UnitTypeStatus = (typeof UnitTypeStatus)[keyof typeof UnitTypeStatus]


export const UnitStatus: {
  ACTIVE: 'ACTIVE',
  OUT_OF_SERVICE: 'OUT_OF_SERVICE',
  ARCHIVED: 'ARCHIVED'
};

export type UnitStatus = (typeof UnitStatus)[keyof typeof UnitStatus]


export const MessageThreadStatus: {
  OPEN: 'OPEN',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED'
};

export type MessageThreadStatus = (typeof MessageThreadStatus)[keyof typeof MessageThreadStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Currency = $Enums.Currency

export const Currency: typeof $Enums.Currency

export type BookingStatus = $Enums.BookingStatus

export const BookingStatus: typeof $Enums.BookingStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type PaymentMethod = $Enums.PaymentMethod

export const PaymentMethod: typeof $Enums.PaymentMethod

export type PaymentProvider = $Enums.PaymentProvider

export const PaymentProvider: typeof $Enums.PaymentProvider

export type UnitTypeStatus = $Enums.UnitTypeStatus

export const UnitTypeStatus: typeof $Enums.UnitTypeStatus

export type UnitStatus = $Enums.UnitStatus

export const UnitStatus: typeof $Enums.UnitStatus

export type MessageThreadStatus = $Enums.MessageThreadStatus

export const MessageThreadStatus: typeof $Enums.MessageThreadStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Properties
 * const properties = await prisma.property.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Properties
   * const properties = await prisma.property.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.property`: Exposes CRUD operations for the **Property** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Properties
    * const properties = await prisma.property.findMany()
    * ```
    */
  get property(): Prisma.PropertyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.unitType`: Exposes CRUD operations for the **UnitType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UnitTypes
    * const unitTypes = await prisma.unitType.findMany()
    * ```
    */
  get unitType(): Prisma.UnitTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.unit`: Exposes CRUD operations for the **Unit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Units
    * const units = await prisma.unit.findMany()
    * ```
    */
  get unit(): Prisma.UnitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.priceSnapshot`: Exposes CRUD operations for the **PriceSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PriceSnapshots
    * const priceSnapshots = await prisma.priceSnapshot.findMany()
    * ```
    */
  get priceSnapshot(): Prisma.PriceSnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paymentIntent`: Exposes CRUD operations for the **PaymentIntent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentIntents
    * const paymentIntents = await prisma.paymentIntent.findMany()
    * ```
    */
  get paymentIntent(): Prisma.PaymentIntentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paymentTransaction`: Exposes CRUD operations for the **PaymentTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentTransactions
    * const paymentTransactions = await prisma.paymentTransaction.findMany()
    * ```
    */
  get paymentTransaction(): Prisma.PaymentTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.providerEvent`: Exposes CRUD operations for the **ProviderEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProviderEvents
    * const providerEvents = await prisma.providerEvent.findMany()
    * ```
    */
  get providerEvent(): Prisma.ProviderEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.messageThread`: Exposes CRUD operations for the **MessageThread** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MessageThreads
    * const messageThreads = await prisma.messageThread.findMany()
    * ```
    */
  get messageThread(): Prisma.MessageThreadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Property: 'Property',
    UnitType: 'UnitType',
    Unit: 'Unit',
    Booking: 'Booking',
    PriceSnapshot: 'PriceSnapshot',
    PaymentIntent: 'PaymentIntent',
    PaymentTransaction: 'PaymentTransaction',
    ProviderEvent: 'ProviderEvent',
    MessageThread: 'MessageThread',
    Message: 'Message',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "property" | "unitType" | "unit" | "booking" | "priceSnapshot" | "paymentIntent" | "paymentTransaction" | "providerEvent" | "messageThread" | "message" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Property: {
        payload: Prisma.$PropertyPayload<ExtArgs>
        fields: Prisma.PropertyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findFirst: {
            args: Prisma.PropertyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findMany: {
            args: Prisma.PropertyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          create: {
            args: Prisma.PropertyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          createMany: {
            args: Prisma.PropertyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          delete: {
            args: Prisma.PropertyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          update: {
            args: Prisma.PropertyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          deleteMany: {
            args: Prisma.PropertyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PropertyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          upsert: {
            args: Prisma.PropertyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          aggregate: {
            args: Prisma.PropertyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProperty>
          }
          groupBy: {
            args: Prisma.PropertyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyCountAggregateOutputType> | number
          }
        }
      }
      UnitType: {
        payload: Prisma.$UnitTypePayload<ExtArgs>
        fields: Prisma.UnitTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UnitTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UnitTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitTypePayload>
          }
          findFirst: {
            args: Prisma.UnitTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UnitTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitTypePayload>
          }
          findMany: {
            args: Prisma.UnitTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitTypePayload>[]
          }
          create: {
            args: Prisma.UnitTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitTypePayload>
          }
          createMany: {
            args: Prisma.UnitTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UnitTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitTypePayload>[]
          }
          delete: {
            args: Prisma.UnitTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitTypePayload>
          }
          update: {
            args: Prisma.UnitTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitTypePayload>
          }
          deleteMany: {
            args: Prisma.UnitTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UnitTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UnitTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitTypePayload>[]
          }
          upsert: {
            args: Prisma.UnitTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitTypePayload>
          }
          aggregate: {
            args: Prisma.UnitTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUnitType>
          }
          groupBy: {
            args: Prisma.UnitTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<UnitTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.UnitTypeCountArgs<ExtArgs>
            result: $Utils.Optional<UnitTypeCountAggregateOutputType> | number
          }
        }
      }
      Unit: {
        payload: Prisma.$UnitPayload<ExtArgs>
        fields: Prisma.UnitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UnitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UnitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          findFirst: {
            args: Prisma.UnitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UnitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          findMany: {
            args: Prisma.UnitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>[]
          }
          create: {
            args: Prisma.UnitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          createMany: {
            args: Prisma.UnitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UnitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>[]
          }
          delete: {
            args: Prisma.UnitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          update: {
            args: Prisma.UnitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          deleteMany: {
            args: Prisma.UnitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UnitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UnitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>[]
          }
          upsert: {
            args: Prisma.UnitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          aggregate: {
            args: Prisma.UnitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUnit>
          }
          groupBy: {
            args: Prisma.UnitGroupByArgs<ExtArgs>
            result: $Utils.Optional<UnitGroupByOutputType>[]
          }
          count: {
            args: Prisma.UnitCountArgs<ExtArgs>
            result: $Utils.Optional<UnitCountAggregateOutputType> | number
          }
        }
      }
      Booking: {
        payload: Prisma.$BookingPayload<ExtArgs>
        fields: Prisma.BookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
          }
        }
      }
      PriceSnapshot: {
        payload: Prisma.$PriceSnapshotPayload<ExtArgs>
        fields: Prisma.PriceSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PriceSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PriceSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceSnapshotPayload>
          }
          findFirst: {
            args: Prisma.PriceSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PriceSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceSnapshotPayload>
          }
          findMany: {
            args: Prisma.PriceSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceSnapshotPayload>[]
          }
          create: {
            args: Prisma.PriceSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceSnapshotPayload>
          }
          createMany: {
            args: Prisma.PriceSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PriceSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceSnapshotPayload>[]
          }
          delete: {
            args: Prisma.PriceSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceSnapshotPayload>
          }
          update: {
            args: Prisma.PriceSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.PriceSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PriceSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PriceSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.PriceSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceSnapshotPayload>
          }
          aggregate: {
            args: Prisma.PriceSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePriceSnapshot>
          }
          groupBy: {
            args: Prisma.PriceSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<PriceSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.PriceSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<PriceSnapshotCountAggregateOutputType> | number
          }
        }
      }
      PaymentIntent: {
        payload: Prisma.$PaymentIntentPayload<ExtArgs>
        fields: Prisma.PaymentIntentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentIntentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentIntentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>
          }
          findFirst: {
            args: Prisma.PaymentIntentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentIntentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>
          }
          findMany: {
            args: Prisma.PaymentIntentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>[]
          }
          create: {
            args: Prisma.PaymentIntentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>
          }
          createMany: {
            args: Prisma.PaymentIntentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentIntentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>[]
          }
          delete: {
            args: Prisma.PaymentIntentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>
          }
          update: {
            args: Prisma.PaymentIntentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentIntentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentIntentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentIntentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentIntentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>
          }
          aggregate: {
            args: Prisma.PaymentIntentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentIntent>
          }
          groupBy: {
            args: Prisma.PaymentIntentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentIntentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentIntentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentIntentCountAggregateOutputType> | number
          }
        }
      }
      PaymentTransaction: {
        payload: Prisma.$PaymentTransactionPayload<ExtArgs>
        fields: Prisma.PaymentTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          findFirst: {
            args: Prisma.PaymentTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          findMany: {
            args: Prisma.PaymentTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>[]
          }
          create: {
            args: Prisma.PaymentTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          createMany: {
            args: Prisma.PaymentTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>[]
          }
          delete: {
            args: Prisma.PaymentTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          update: {
            args: Prisma.PaymentTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          deleteMany: {
            args: Prisma.PaymentTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>[]
          }
          upsert: {
            args: Prisma.PaymentTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          aggregate: {
            args: Prisma.PaymentTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentTransaction>
          }
          groupBy: {
            args: Prisma.PaymentTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentTransactionCountAggregateOutputType> | number
          }
        }
      }
      ProviderEvent: {
        payload: Prisma.$ProviderEventPayload<ExtArgs>
        fields: Prisma.ProviderEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProviderEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProviderEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderEventPayload>
          }
          findFirst: {
            args: Prisma.ProviderEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProviderEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderEventPayload>
          }
          findMany: {
            args: Prisma.ProviderEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderEventPayload>[]
          }
          create: {
            args: Prisma.ProviderEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderEventPayload>
          }
          createMany: {
            args: Prisma.ProviderEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProviderEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderEventPayload>[]
          }
          delete: {
            args: Prisma.ProviderEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderEventPayload>
          }
          update: {
            args: Prisma.ProviderEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderEventPayload>
          }
          deleteMany: {
            args: Prisma.ProviderEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProviderEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProviderEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderEventPayload>[]
          }
          upsert: {
            args: Prisma.ProviderEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderEventPayload>
          }
          aggregate: {
            args: Prisma.ProviderEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProviderEvent>
          }
          groupBy: {
            args: Prisma.ProviderEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProviderEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProviderEventCountArgs<ExtArgs>
            result: $Utils.Optional<ProviderEventCountAggregateOutputType> | number
          }
        }
      }
      MessageThread: {
        payload: Prisma.$MessageThreadPayload<ExtArgs>
        fields: Prisma.MessageThreadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageThreadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageThreadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload>
          }
          findFirst: {
            args: Prisma.MessageThreadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageThreadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload>
          }
          findMany: {
            args: Prisma.MessageThreadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload>[]
          }
          create: {
            args: Prisma.MessageThreadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload>
          }
          createMany: {
            args: Prisma.MessageThreadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageThreadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload>[]
          }
          delete: {
            args: Prisma.MessageThreadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload>
          }
          update: {
            args: Prisma.MessageThreadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload>
          }
          deleteMany: {
            args: Prisma.MessageThreadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageThreadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageThreadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload>[]
          }
          upsert: {
            args: Prisma.MessageThreadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageThreadPayload>
          }
          aggregate: {
            args: Prisma.MessageThreadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessageThread>
          }
          groupBy: {
            args: Prisma.MessageThreadGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageThreadGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageThreadCountArgs<ExtArgs>
            result: $Utils.Optional<MessageThreadCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    property?: PropertyOmit
    unitType?: UnitTypeOmit
    unit?: UnitOmit
    booking?: BookingOmit
    priceSnapshot?: PriceSnapshotOmit
    paymentIntent?: PaymentIntentOmit
    paymentTransaction?: PaymentTransactionOmit
    providerEvent?: ProviderEventOmit
    messageThread?: MessageThreadOmit
    message?: MessageOmit
    auditLog?: AuditLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PropertyCountOutputType
   */

  export type PropertyCountOutputType = {
    unitTypes: number
    units: number
    bookings: number
    priceSnapshots: number
    paymentIntents: number
    messageThreads: number
    auditLogs: number
  }

  export type PropertyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    unitTypes?: boolean | PropertyCountOutputTypeCountUnitTypesArgs
    units?: boolean | PropertyCountOutputTypeCountUnitsArgs
    bookings?: boolean | PropertyCountOutputTypeCountBookingsArgs
    priceSnapshots?: boolean | PropertyCountOutputTypeCountPriceSnapshotsArgs
    paymentIntents?: boolean | PropertyCountOutputTypeCountPaymentIntentsArgs
    messageThreads?: boolean | PropertyCountOutputTypeCountMessageThreadsArgs
    auditLogs?: boolean | PropertyCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyCountOutputType
     */
    select?: PropertyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountUnitTypesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UnitTypeWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountUnitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UnitWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountPriceSnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceSnapshotWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountPaymentIntentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentIntentWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountMessageThreadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageThreadWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type UnitTypeCountOutputType
   */

  export type UnitTypeCountOutputType = {
    units: number
  }

  export type UnitTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    units?: boolean | UnitTypeCountOutputTypeCountUnitsArgs
  }

  // Custom InputTypes
  /**
   * UnitTypeCountOutputType without action
   */
  export type UnitTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitTypeCountOutputType
     */
    select?: UnitTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UnitTypeCountOutputType without action
   */
  export type UnitTypeCountOutputTypeCountUnitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UnitWhereInput
  }


  /**
   * Count Type UnitCountOutputType
   */

  export type UnitCountOutputType = {
    bookings: number
  }

  export type UnitCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | UnitCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * UnitCountOutputType without action
   */
  export type UnitCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitCountOutputType
     */
    select?: UnitCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UnitCountOutputType without action
   */
  export type UnitCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Count Type BookingCountOutputType
   */

  export type BookingCountOutputType = {
    paymentIntents: number
    messageThreads: number
    auditLogs: number
  }

  export type BookingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentIntents?: boolean | BookingCountOutputTypeCountPaymentIntentsArgs
    messageThreads?: boolean | BookingCountOutputTypeCountMessageThreadsArgs
    auditLogs?: boolean | BookingCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingCountOutputType
     */
    select?: BookingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeCountPaymentIntentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentIntentWhereInput
  }

  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeCountMessageThreadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageThreadWhereInput
  }

  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type PaymentIntentCountOutputType
   */

  export type PaymentIntentCountOutputType = {
    transactions: number
    providerEvents: number
  }

  export type PaymentIntentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | PaymentIntentCountOutputTypeCountTransactionsArgs
    providerEvents?: boolean | PaymentIntentCountOutputTypeCountProviderEventsArgs
  }

  // Custom InputTypes
  /**
   * PaymentIntentCountOutputType without action
   */
  export type PaymentIntentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntentCountOutputType
     */
    select?: PaymentIntentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PaymentIntentCountOutputType without action
   */
  export type PaymentIntentCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentTransactionWhereInput
  }

  /**
   * PaymentIntentCountOutputType without action
   */
  export type PaymentIntentCountOutputTypeCountProviderEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProviderEventWhereInput
  }


  /**
   * Count Type MessageThreadCountOutputType
   */

  export type MessageThreadCountOutputType = {
    messages: number
    auditLogs: number
  }

  export type MessageThreadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | MessageThreadCountOutputTypeCountMessagesArgs
    auditLogs?: boolean | MessageThreadCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * MessageThreadCountOutputType without action
   */
  export type MessageThreadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThreadCountOutputType
     */
    select?: MessageThreadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MessageThreadCountOutputType without action
   */
  export type MessageThreadCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * MessageThreadCountOutputType without action
   */
  export type MessageThreadCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Property
   */

  export type AggregateProperty = {
    _count: PropertyCountAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  export type PropertyMinAggregateOutputType = {
    id: string | null
    slug: string | null
    name: string | null
    description: string | null
    city: string | null
    country: string | null
    addressLine1: string | null
    addressLine2: string | null
    postalCode: string | null
    timezone: string | null
    defaultCurrency: $Enums.Currency | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PropertyMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    name: string | null
    description: string | null
    city: string | null
    country: string | null
    addressLine1: string | null
    addressLine2: string | null
    postalCode: string | null
    timezone: string | null
    defaultCurrency: $Enums.Currency | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PropertyCountAggregateOutputType = {
    id: number
    slug: number
    name: number
    description: number
    city: number
    country: number
    addressLine1: number
    addressLine2: number
    postalCode: number
    timezone: number
    defaultCurrency: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PropertyMinAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    description?: true
    city?: true
    country?: true
    addressLine1?: true
    addressLine2?: true
    postalCode?: true
    timezone?: true
    defaultCurrency?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PropertyMaxAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    description?: true
    city?: true
    country?: true
    addressLine1?: true
    addressLine2?: true
    postalCode?: true
    timezone?: true
    defaultCurrency?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PropertyCountAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    description?: true
    city?: true
    country?: true
    addressLine1?: true
    addressLine2?: true
    postalCode?: true
    timezone?: true
    defaultCurrency?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PropertyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Property to aggregate.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Properties
    **/
    _count?: true | PropertyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyMaxAggregateInputType
  }

  export type GetPropertyAggregateType<T extends PropertyAggregateArgs> = {
        [P in keyof T & keyof AggregateProperty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProperty[P]>
      : GetScalarType<T[P], AggregateProperty[P]>
  }




  export type PropertyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyWhereInput
    orderBy?: PropertyOrderByWithAggregationInput | PropertyOrderByWithAggregationInput[]
    by: PropertyScalarFieldEnum[] | PropertyScalarFieldEnum
    having?: PropertyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyCountAggregateInputType | true
    _min?: PropertyMinAggregateInputType
    _max?: PropertyMaxAggregateInputType
  }

  export type PropertyGroupByOutputType = {
    id: string
    slug: string
    name: string
    description: string | null
    city: string
    country: string
    addressLine1: string | null
    addressLine2: string | null
    postalCode: string | null
    timezone: string
    defaultCurrency: $Enums.Currency
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: PropertyCountAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  type GetPropertyGroupByPayload<T extends PropertyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyGroupByOutputType[P]>
        }
      >
    >


  export type PropertySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    city?: boolean
    country?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    postalCode?: boolean
    timezone?: boolean
    defaultCurrency?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    unitTypes?: boolean | Property$unitTypesArgs<ExtArgs>
    units?: boolean | Property$unitsArgs<ExtArgs>
    bookings?: boolean | Property$bookingsArgs<ExtArgs>
    priceSnapshots?: boolean | Property$priceSnapshotsArgs<ExtArgs>
    paymentIntents?: boolean | Property$paymentIntentsArgs<ExtArgs>
    messageThreads?: boolean | Property$messageThreadsArgs<ExtArgs>
    auditLogs?: boolean | Property$auditLogsArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property"]>

  export type PropertySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    city?: boolean
    country?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    postalCode?: boolean
    timezone?: boolean
    defaultCurrency?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["property"]>

  export type PropertySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    city?: boolean
    country?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    postalCode?: boolean
    timezone?: boolean
    defaultCurrency?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["property"]>

  export type PropertySelectScalar = {
    id?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    city?: boolean
    country?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    postalCode?: boolean
    timezone?: boolean
    defaultCurrency?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PropertyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "name" | "description" | "city" | "country" | "addressLine1" | "addressLine2" | "postalCode" | "timezone" | "defaultCurrency" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["property"]>
  export type PropertyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    unitTypes?: boolean | Property$unitTypesArgs<ExtArgs>
    units?: boolean | Property$unitsArgs<ExtArgs>
    bookings?: boolean | Property$bookingsArgs<ExtArgs>
    priceSnapshots?: boolean | Property$priceSnapshotsArgs<ExtArgs>
    paymentIntents?: boolean | Property$paymentIntentsArgs<ExtArgs>
    messageThreads?: boolean | Property$messageThreadsArgs<ExtArgs>
    auditLogs?: boolean | Property$auditLogsArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PropertyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PropertyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PropertyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Property"
    objects: {
      unitTypes: Prisma.$UnitTypePayload<ExtArgs>[]
      units: Prisma.$UnitPayload<ExtArgs>[]
      bookings: Prisma.$BookingPayload<ExtArgs>[]
      priceSnapshots: Prisma.$PriceSnapshotPayload<ExtArgs>[]
      paymentIntents: Prisma.$PaymentIntentPayload<ExtArgs>[]
      messageThreads: Prisma.$MessageThreadPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      name: string
      description: string | null
      city: string
      country: string
      addressLine1: string | null
      addressLine2: string | null
      postalCode: string | null
      timezone: string
      defaultCurrency: $Enums.Currency
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["property"]>
    composites: {}
  }

  type PropertyGetPayload<S extends boolean | null | undefined | PropertyDefaultArgs> = $Result.GetResult<Prisma.$PropertyPayload, S>

  type PropertyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PropertyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropertyCountAggregateInputType | true
    }

  export interface PropertyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Property'], meta: { name: 'Property' } }
    /**
     * Find zero or one Property that matches the filter.
     * @param {PropertyFindUniqueArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyFindUniqueArgs>(args: SelectSubset<T, PropertyFindUniqueArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Property that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PropertyFindUniqueOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Property that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyFindFirstArgs>(args?: SelectSubset<T, PropertyFindFirstArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Property that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Properties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Properties
     * const properties = await prisma.property.findMany()
     * 
     * // Get first 10 Properties
     * const properties = await prisma.property.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyWithIdOnly = await prisma.property.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyFindManyArgs>(args?: SelectSubset<T, PropertyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Property.
     * @param {PropertyCreateArgs} args - Arguments to create a Property.
     * @example
     * // Create one Property
     * const Property = await prisma.property.create({
     *   data: {
     *     // ... data to create a Property
     *   }
     * })
     * 
     */
    create<T extends PropertyCreateArgs>(args: SelectSubset<T, PropertyCreateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Properties.
     * @param {PropertyCreateManyArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyCreateManyArgs>(args?: SelectSubset<T, PropertyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Properties and returns the data saved in the database.
     * @param {PropertyCreateManyAndReturnArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Properties and only return the `id`
     * const propertyWithIdOnly = await prisma.property.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Property.
     * @param {PropertyDeleteArgs} args - Arguments to delete one Property.
     * @example
     * // Delete one Property
     * const Property = await prisma.property.delete({
     *   where: {
     *     // ... filter to delete one Property
     *   }
     * })
     * 
     */
    delete<T extends PropertyDeleteArgs>(args: SelectSubset<T, PropertyDeleteArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Property.
     * @param {PropertyUpdateArgs} args - Arguments to update one Property.
     * @example
     * // Update one Property
     * const property = await prisma.property.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyUpdateArgs>(args: SelectSubset<T, PropertyUpdateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Properties.
     * @param {PropertyDeleteManyArgs} args - Arguments to filter Properties to delete.
     * @example
     * // Delete a few Properties
     * const { count } = await prisma.property.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyDeleteManyArgs>(args?: SelectSubset<T, PropertyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Properties
     * const property = await prisma.property.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyUpdateManyArgs>(args: SelectSubset<T, PropertyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Properties and returns the data updated in the database.
     * @param {PropertyUpdateManyAndReturnArgs} args - Arguments to update many Properties.
     * @example
     * // Update many Properties
     * const property = await prisma.property.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Properties and only return the `id`
     * const propertyWithIdOnly = await prisma.property.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PropertyUpdateManyAndReturnArgs>(args: SelectSubset<T, PropertyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Property.
     * @param {PropertyUpsertArgs} args - Arguments to update or create a Property.
     * @example
     * // Update or create a Property
     * const property = await prisma.property.upsert({
     *   create: {
     *     // ... data to create a Property
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Property we want to update
     *   }
     * })
     */
    upsert<T extends PropertyUpsertArgs>(args: SelectSubset<T, PropertyUpsertArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyCountArgs} args - Arguments to filter Properties to count.
     * @example
     * // Count the number of Properties
     * const count = await prisma.property.count({
     *   where: {
     *     // ... the filter for the Properties we want to count
     *   }
     * })
    **/
    count<T extends PropertyCountArgs>(
      args?: Subset<T, PropertyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PropertyAggregateArgs>(args: Subset<T, PropertyAggregateArgs>): Prisma.PrismaPromise<GetPropertyAggregateType<T>>

    /**
     * Group by Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PropertyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyGroupByArgs['orderBy'] }
        : { orderBy?: PropertyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PropertyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Property model
   */
  readonly fields: PropertyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Property.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    unitTypes<T extends Property$unitTypesArgs<ExtArgs> = {}>(args?: Subset<T, Property$unitTypesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    units<T extends Property$unitsArgs<ExtArgs> = {}>(args?: Subset<T, Property$unitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookings<T extends Property$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Property$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    priceSnapshots<T extends Property$priceSnapshotsArgs<ExtArgs> = {}>(args?: Subset<T, Property$priceSnapshotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    paymentIntents<T extends Property$paymentIntentsArgs<ExtArgs> = {}>(args?: Subset<T, Property$paymentIntentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messageThreads<T extends Property$messageThreadsArgs<ExtArgs> = {}>(args?: Subset<T, Property$messageThreadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends Property$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, Property$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Property model
   */
  interface PropertyFieldRefs {
    readonly id: FieldRef<"Property", 'String'>
    readonly slug: FieldRef<"Property", 'String'>
    readonly name: FieldRef<"Property", 'String'>
    readonly description: FieldRef<"Property", 'String'>
    readonly city: FieldRef<"Property", 'String'>
    readonly country: FieldRef<"Property", 'String'>
    readonly addressLine1: FieldRef<"Property", 'String'>
    readonly addressLine2: FieldRef<"Property", 'String'>
    readonly postalCode: FieldRef<"Property", 'String'>
    readonly timezone: FieldRef<"Property", 'String'>
    readonly defaultCurrency: FieldRef<"Property", 'Currency'>
    readonly isActive: FieldRef<"Property", 'Boolean'>
    readonly createdAt: FieldRef<"Property", 'DateTime'>
    readonly updatedAt: FieldRef<"Property", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Property findUnique
   */
  export type PropertyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findUniqueOrThrow
   */
  export type PropertyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findFirst
   */
  export type PropertyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findFirstOrThrow
   */
  export type PropertyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findMany
   */
  export type PropertyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Properties to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property create
   */
  export type PropertyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to create a Property.
     */
    data: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
  }

  /**
   * Property createMany
   */
  export type PropertyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Property createManyAndReturn
   */
  export type PropertyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Property update
   */
  export type PropertyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to update a Property.
     */
    data: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
    /**
     * Choose, which Property to update.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property updateMany
   */
  export type PropertyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Properties.
     */
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyInput>
    /**
     * Filter which Properties to update
     */
    where?: PropertyWhereInput
    /**
     * Limit how many Properties to update.
     */
    limit?: number
  }

  /**
   * Property updateManyAndReturn
   */
  export type PropertyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * The data used to update Properties.
     */
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyInput>
    /**
     * Filter which Properties to update
     */
    where?: PropertyWhereInput
    /**
     * Limit how many Properties to update.
     */
    limit?: number
  }

  /**
   * Property upsert
   */
  export type PropertyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The filter to search for the Property to update in case it exists.
     */
    where: PropertyWhereUniqueInput
    /**
     * In case the Property found by the `where` argument doesn't exist, create a new Property with this data.
     */
    create: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
    /**
     * In case the Property was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
  }

  /**
   * Property delete
   */
  export type PropertyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter which Property to delete.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property deleteMany
   */
  export type PropertyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Properties to delete
     */
    where?: PropertyWhereInput
    /**
     * Limit how many Properties to delete.
     */
    limit?: number
  }

  /**
   * Property.unitTypes
   */
  export type Property$unitTypesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitType
     */
    select?: UnitTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UnitType
     */
    omit?: UnitTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitTypeInclude<ExtArgs> | null
    where?: UnitTypeWhereInput
    orderBy?: UnitTypeOrderByWithRelationInput | UnitTypeOrderByWithRelationInput[]
    cursor?: UnitTypeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UnitTypeScalarFieldEnum | UnitTypeScalarFieldEnum[]
  }

  /**
   * Property.units
   */
  export type Property$unitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    where?: UnitWhereInput
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    cursor?: UnitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UnitScalarFieldEnum | UnitScalarFieldEnum[]
  }

  /**
   * Property.bookings
   */
  export type Property$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Property.priceSnapshots
   */
  export type Property$priceSnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceSnapshot
     */
    select?: PriceSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceSnapshot
     */
    omit?: PriceSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceSnapshotInclude<ExtArgs> | null
    where?: PriceSnapshotWhereInput
    orderBy?: PriceSnapshotOrderByWithRelationInput | PriceSnapshotOrderByWithRelationInput[]
    cursor?: PriceSnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PriceSnapshotScalarFieldEnum | PriceSnapshotScalarFieldEnum[]
  }

  /**
   * Property.paymentIntents
   */
  export type Property$paymentIntentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    where?: PaymentIntentWhereInput
    orderBy?: PaymentIntentOrderByWithRelationInput | PaymentIntentOrderByWithRelationInput[]
    cursor?: PaymentIntentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentIntentScalarFieldEnum | PaymentIntentScalarFieldEnum[]
  }

  /**
   * Property.messageThreads
   */
  export type Property$messageThreadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageThreadInclude<ExtArgs> | null
    where?: MessageThreadWhereInput
    orderBy?: MessageThreadOrderByWithRelationInput | MessageThreadOrderByWithRelationInput[]
    cursor?: MessageThreadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageThreadScalarFieldEnum | MessageThreadScalarFieldEnum[]
  }

  /**
   * Property.auditLogs
   */
  export type Property$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Property without action
   */
  export type PropertyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
  }


  /**
   * Model UnitType
   */

  export type AggregateUnitType = {
    _count: UnitTypeCountAggregateOutputType | null
    _avg: UnitTypeAvgAggregateOutputType | null
    _sum: UnitTypeSumAggregateOutputType | null
    _min: UnitTypeMinAggregateOutputType | null
    _max: UnitTypeMaxAggregateOutputType | null
  }

  export type UnitTypeAvgAggregateOutputType = {
    estimatedRating: number | null
    maxGuests: number | null
    basePriceMinor: number | null
    displayOrder: number | null
  }

  export type UnitTypeSumAggregateOutputType = {
    estimatedRating: number | null
    maxGuests: number | null
    basePriceMinor: number | null
    displayOrder: number | null
  }

  export type UnitTypeMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    slug: string | null
    name: string | null
    description: string | null
    coverImageUrl: string | null
    estimatedRating: number | null
    status: $Enums.UnitTypeStatus | null
    maxGuests: number | null
    basePriceMinor: number | null
    currency: $Enums.Currency | null
    displayOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UnitTypeMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    slug: string | null
    name: string | null
    description: string | null
    coverImageUrl: string | null
    estimatedRating: number | null
    status: $Enums.UnitTypeStatus | null
    maxGuests: number | null
    basePriceMinor: number | null
    currency: $Enums.Currency | null
    displayOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UnitTypeCountAggregateOutputType = {
    id: number
    propertyId: number
    slug: number
    name: number
    description: number
    coverImageUrl: number
    galleryImageUrls: number
    estimatedRating: number
    status: number
    maxGuests: number
    basePriceMinor: number
    currency: number
    displayOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UnitTypeAvgAggregateInputType = {
    estimatedRating?: true
    maxGuests?: true
    basePriceMinor?: true
    displayOrder?: true
  }

  export type UnitTypeSumAggregateInputType = {
    estimatedRating?: true
    maxGuests?: true
    basePriceMinor?: true
    displayOrder?: true
  }

  export type UnitTypeMinAggregateInputType = {
    id?: true
    propertyId?: true
    slug?: true
    name?: true
    description?: true
    coverImageUrl?: true
    estimatedRating?: true
    status?: true
    maxGuests?: true
    basePriceMinor?: true
    currency?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UnitTypeMaxAggregateInputType = {
    id?: true
    propertyId?: true
    slug?: true
    name?: true
    description?: true
    coverImageUrl?: true
    estimatedRating?: true
    status?: true
    maxGuests?: true
    basePriceMinor?: true
    currency?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UnitTypeCountAggregateInputType = {
    id?: true
    propertyId?: true
    slug?: true
    name?: true
    description?: true
    coverImageUrl?: true
    galleryImageUrls?: true
    estimatedRating?: true
    status?: true
    maxGuests?: true
    basePriceMinor?: true
    currency?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UnitTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UnitType to aggregate.
     */
    where?: UnitTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UnitTypes to fetch.
     */
    orderBy?: UnitTypeOrderByWithRelationInput | UnitTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UnitTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UnitTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UnitTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UnitTypes
    **/
    _count?: true | UnitTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UnitTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UnitTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UnitTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UnitTypeMaxAggregateInputType
  }

  export type GetUnitTypeAggregateType<T extends UnitTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateUnitType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUnitType[P]>
      : GetScalarType<T[P], AggregateUnitType[P]>
  }




  export type UnitTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UnitTypeWhereInput
    orderBy?: UnitTypeOrderByWithAggregationInput | UnitTypeOrderByWithAggregationInput[]
    by: UnitTypeScalarFieldEnum[] | UnitTypeScalarFieldEnum
    having?: UnitTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UnitTypeCountAggregateInputType | true
    _avg?: UnitTypeAvgAggregateInputType
    _sum?: UnitTypeSumAggregateInputType
    _min?: UnitTypeMinAggregateInputType
    _max?: UnitTypeMaxAggregateInputType
  }

  export type UnitTypeGroupByOutputType = {
    id: string
    propertyId: string
    slug: string
    name: string
    description: string | null
    coverImageUrl: string | null
    galleryImageUrls: string[]
    estimatedRating: number
    status: $Enums.UnitTypeStatus
    maxGuests: number
    basePriceMinor: number
    currency: $Enums.Currency
    displayOrder: number
    createdAt: Date
    updatedAt: Date
    _count: UnitTypeCountAggregateOutputType | null
    _avg: UnitTypeAvgAggregateOutputType | null
    _sum: UnitTypeSumAggregateOutputType | null
    _min: UnitTypeMinAggregateOutputType | null
    _max: UnitTypeMaxAggregateOutputType | null
  }

  type GetUnitTypeGroupByPayload<T extends UnitTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UnitTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UnitTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UnitTypeGroupByOutputType[P]>
            : GetScalarType<T[P], UnitTypeGroupByOutputType[P]>
        }
      >
    >


  export type UnitTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    coverImageUrl?: boolean
    galleryImageUrls?: boolean
    estimatedRating?: boolean
    status?: boolean
    maxGuests?: boolean
    basePriceMinor?: boolean
    currency?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    units?: boolean | UnitType$unitsArgs<ExtArgs>
    _count?: boolean | UnitTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unitType"]>

  export type UnitTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    coverImageUrl?: boolean
    galleryImageUrls?: boolean
    estimatedRating?: boolean
    status?: boolean
    maxGuests?: boolean
    basePriceMinor?: boolean
    currency?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unitType"]>

  export type UnitTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    coverImageUrl?: boolean
    galleryImageUrls?: boolean
    estimatedRating?: boolean
    status?: boolean
    maxGuests?: boolean
    basePriceMinor?: boolean
    currency?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unitType"]>

  export type UnitTypeSelectScalar = {
    id?: boolean
    propertyId?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    coverImageUrl?: boolean
    galleryImageUrls?: boolean
    estimatedRating?: boolean
    status?: boolean
    maxGuests?: boolean
    basePriceMinor?: boolean
    currency?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UnitTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "propertyId" | "slug" | "name" | "description" | "coverImageUrl" | "galleryImageUrls" | "estimatedRating" | "status" | "maxGuests" | "basePriceMinor" | "currency" | "displayOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["unitType"]>
  export type UnitTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    units?: boolean | UnitType$unitsArgs<ExtArgs>
    _count?: boolean | UnitTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UnitTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type UnitTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $UnitTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UnitType"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
      units: Prisma.$UnitPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      slug: string
      name: string
      description: string | null
      coverImageUrl: string | null
      galleryImageUrls: string[]
      estimatedRating: number
      status: $Enums.UnitTypeStatus
      maxGuests: number
      basePriceMinor: number
      currency: $Enums.Currency
      displayOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["unitType"]>
    composites: {}
  }

  type UnitTypeGetPayload<S extends boolean | null | undefined | UnitTypeDefaultArgs> = $Result.GetResult<Prisma.$UnitTypePayload, S>

  type UnitTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UnitTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UnitTypeCountAggregateInputType | true
    }

  export interface UnitTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UnitType'], meta: { name: 'UnitType' } }
    /**
     * Find zero or one UnitType that matches the filter.
     * @param {UnitTypeFindUniqueArgs} args - Arguments to find a UnitType
     * @example
     * // Get one UnitType
     * const unitType = await prisma.unitType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UnitTypeFindUniqueArgs>(args: SelectSubset<T, UnitTypeFindUniqueArgs<ExtArgs>>): Prisma__UnitTypeClient<$Result.GetResult<Prisma.$UnitTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UnitType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UnitTypeFindUniqueOrThrowArgs} args - Arguments to find a UnitType
     * @example
     * // Get one UnitType
     * const unitType = await prisma.unitType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UnitTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, UnitTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UnitTypeClient<$Result.GetResult<Prisma.$UnitTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UnitType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitTypeFindFirstArgs} args - Arguments to find a UnitType
     * @example
     * // Get one UnitType
     * const unitType = await prisma.unitType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UnitTypeFindFirstArgs>(args?: SelectSubset<T, UnitTypeFindFirstArgs<ExtArgs>>): Prisma__UnitTypeClient<$Result.GetResult<Prisma.$UnitTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UnitType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitTypeFindFirstOrThrowArgs} args - Arguments to find a UnitType
     * @example
     * // Get one UnitType
     * const unitType = await prisma.unitType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UnitTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, UnitTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__UnitTypeClient<$Result.GetResult<Prisma.$UnitTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UnitTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UnitTypes
     * const unitTypes = await prisma.unitType.findMany()
     * 
     * // Get first 10 UnitTypes
     * const unitTypes = await prisma.unitType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const unitTypeWithIdOnly = await prisma.unitType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UnitTypeFindManyArgs>(args?: SelectSubset<T, UnitTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UnitType.
     * @param {UnitTypeCreateArgs} args - Arguments to create a UnitType.
     * @example
     * // Create one UnitType
     * const UnitType = await prisma.unitType.create({
     *   data: {
     *     // ... data to create a UnitType
     *   }
     * })
     * 
     */
    create<T extends UnitTypeCreateArgs>(args: SelectSubset<T, UnitTypeCreateArgs<ExtArgs>>): Prisma__UnitTypeClient<$Result.GetResult<Prisma.$UnitTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UnitTypes.
     * @param {UnitTypeCreateManyArgs} args - Arguments to create many UnitTypes.
     * @example
     * // Create many UnitTypes
     * const unitType = await prisma.unitType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UnitTypeCreateManyArgs>(args?: SelectSubset<T, UnitTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UnitTypes and returns the data saved in the database.
     * @param {UnitTypeCreateManyAndReturnArgs} args - Arguments to create many UnitTypes.
     * @example
     * // Create many UnitTypes
     * const unitType = await prisma.unitType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UnitTypes and only return the `id`
     * const unitTypeWithIdOnly = await prisma.unitType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UnitTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, UnitTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UnitType.
     * @param {UnitTypeDeleteArgs} args - Arguments to delete one UnitType.
     * @example
     * // Delete one UnitType
     * const UnitType = await prisma.unitType.delete({
     *   where: {
     *     // ... filter to delete one UnitType
     *   }
     * })
     * 
     */
    delete<T extends UnitTypeDeleteArgs>(args: SelectSubset<T, UnitTypeDeleteArgs<ExtArgs>>): Prisma__UnitTypeClient<$Result.GetResult<Prisma.$UnitTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UnitType.
     * @param {UnitTypeUpdateArgs} args - Arguments to update one UnitType.
     * @example
     * // Update one UnitType
     * const unitType = await prisma.unitType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UnitTypeUpdateArgs>(args: SelectSubset<T, UnitTypeUpdateArgs<ExtArgs>>): Prisma__UnitTypeClient<$Result.GetResult<Prisma.$UnitTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UnitTypes.
     * @param {UnitTypeDeleteManyArgs} args - Arguments to filter UnitTypes to delete.
     * @example
     * // Delete a few UnitTypes
     * const { count } = await prisma.unitType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UnitTypeDeleteManyArgs>(args?: SelectSubset<T, UnitTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UnitTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UnitTypes
     * const unitType = await prisma.unitType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UnitTypeUpdateManyArgs>(args: SelectSubset<T, UnitTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UnitTypes and returns the data updated in the database.
     * @param {UnitTypeUpdateManyAndReturnArgs} args - Arguments to update many UnitTypes.
     * @example
     * // Update many UnitTypes
     * const unitType = await prisma.unitType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UnitTypes and only return the `id`
     * const unitTypeWithIdOnly = await prisma.unitType.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UnitTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, UnitTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UnitType.
     * @param {UnitTypeUpsertArgs} args - Arguments to update or create a UnitType.
     * @example
     * // Update or create a UnitType
     * const unitType = await prisma.unitType.upsert({
     *   create: {
     *     // ... data to create a UnitType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UnitType we want to update
     *   }
     * })
     */
    upsert<T extends UnitTypeUpsertArgs>(args: SelectSubset<T, UnitTypeUpsertArgs<ExtArgs>>): Prisma__UnitTypeClient<$Result.GetResult<Prisma.$UnitTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UnitTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitTypeCountArgs} args - Arguments to filter UnitTypes to count.
     * @example
     * // Count the number of UnitTypes
     * const count = await prisma.unitType.count({
     *   where: {
     *     // ... the filter for the UnitTypes we want to count
     *   }
     * })
    **/
    count<T extends UnitTypeCountArgs>(
      args?: Subset<T, UnitTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UnitTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UnitType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UnitTypeAggregateArgs>(args: Subset<T, UnitTypeAggregateArgs>): Prisma.PrismaPromise<GetUnitTypeAggregateType<T>>

    /**
     * Group by UnitType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UnitTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UnitTypeGroupByArgs['orderBy'] }
        : { orderBy?: UnitTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UnitTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnitTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UnitType model
   */
  readonly fields: UnitTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UnitType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UnitTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    units<T extends UnitType$unitsArgs<ExtArgs> = {}>(args?: Subset<T, UnitType$unitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UnitType model
   */
  interface UnitTypeFieldRefs {
    readonly id: FieldRef<"UnitType", 'String'>
    readonly propertyId: FieldRef<"UnitType", 'String'>
    readonly slug: FieldRef<"UnitType", 'String'>
    readonly name: FieldRef<"UnitType", 'String'>
    readonly description: FieldRef<"UnitType", 'String'>
    readonly coverImageUrl: FieldRef<"UnitType", 'String'>
    readonly galleryImageUrls: FieldRef<"UnitType", 'String[]'>
    readonly estimatedRating: FieldRef<"UnitType", 'Float'>
    readonly status: FieldRef<"UnitType", 'UnitTypeStatus'>
    readonly maxGuests: FieldRef<"UnitType", 'Int'>
    readonly basePriceMinor: FieldRef<"UnitType", 'Int'>
    readonly currency: FieldRef<"UnitType", 'Currency'>
    readonly displayOrder: FieldRef<"UnitType", 'Int'>
    readonly createdAt: FieldRef<"UnitType", 'DateTime'>
    readonly updatedAt: FieldRef<"UnitType", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UnitType findUnique
   */
  export type UnitTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitType
     */
    select?: UnitTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UnitType
     */
    omit?: UnitTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitTypeInclude<ExtArgs> | null
    /**
     * Filter, which UnitType to fetch.
     */
    where: UnitTypeWhereUniqueInput
  }

  /**
   * UnitType findUniqueOrThrow
   */
  export type UnitTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitType
     */
    select?: UnitTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UnitType
     */
    omit?: UnitTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitTypeInclude<ExtArgs> | null
    /**
     * Filter, which UnitType to fetch.
     */
    where: UnitTypeWhereUniqueInput
  }

  /**
   * UnitType findFirst
   */
  export type UnitTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitType
     */
    select?: UnitTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UnitType
     */
    omit?: UnitTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitTypeInclude<ExtArgs> | null
    /**
     * Filter, which UnitType to fetch.
     */
    where?: UnitTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UnitTypes to fetch.
     */
    orderBy?: UnitTypeOrderByWithRelationInput | UnitTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UnitTypes.
     */
    cursor?: UnitTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UnitTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UnitTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UnitTypes.
     */
    distinct?: UnitTypeScalarFieldEnum | UnitTypeScalarFieldEnum[]
  }

  /**
   * UnitType findFirstOrThrow
   */
  export type UnitTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitType
     */
    select?: UnitTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UnitType
     */
    omit?: UnitTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitTypeInclude<ExtArgs> | null
    /**
     * Filter, which UnitType to fetch.
     */
    where?: UnitTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UnitTypes to fetch.
     */
    orderBy?: UnitTypeOrderByWithRelationInput | UnitTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UnitTypes.
     */
    cursor?: UnitTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UnitTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UnitTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UnitTypes.
     */
    distinct?: UnitTypeScalarFieldEnum | UnitTypeScalarFieldEnum[]
  }

  /**
   * UnitType findMany
   */
  export type UnitTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitType
     */
    select?: UnitTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UnitType
     */
    omit?: UnitTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitTypeInclude<ExtArgs> | null
    /**
     * Filter, which UnitTypes to fetch.
     */
    where?: UnitTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UnitTypes to fetch.
     */
    orderBy?: UnitTypeOrderByWithRelationInput | UnitTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UnitTypes.
     */
    cursor?: UnitTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UnitTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UnitTypes.
     */
    skip?: number
    distinct?: UnitTypeScalarFieldEnum | UnitTypeScalarFieldEnum[]
  }

  /**
   * UnitType create
   */
  export type UnitTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitType
     */
    select?: UnitTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UnitType
     */
    omit?: UnitTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a UnitType.
     */
    data: XOR<UnitTypeCreateInput, UnitTypeUncheckedCreateInput>
  }

  /**
   * UnitType createMany
   */
  export type UnitTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UnitTypes.
     */
    data: UnitTypeCreateManyInput | UnitTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UnitType createManyAndReturn
   */
  export type UnitTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitType
     */
    select?: UnitTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UnitType
     */
    omit?: UnitTypeOmit<ExtArgs> | null
    /**
     * The data used to create many UnitTypes.
     */
    data: UnitTypeCreateManyInput | UnitTypeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitTypeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UnitType update
   */
  export type UnitTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitType
     */
    select?: UnitTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UnitType
     */
    omit?: UnitTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a UnitType.
     */
    data: XOR<UnitTypeUpdateInput, UnitTypeUncheckedUpdateInput>
    /**
     * Choose, which UnitType to update.
     */
    where: UnitTypeWhereUniqueInput
  }

  /**
   * UnitType updateMany
   */
  export type UnitTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UnitTypes.
     */
    data: XOR<UnitTypeUpdateManyMutationInput, UnitTypeUncheckedUpdateManyInput>
    /**
     * Filter which UnitTypes to update
     */
    where?: UnitTypeWhereInput
    /**
     * Limit how many UnitTypes to update.
     */
    limit?: number
  }

  /**
   * UnitType updateManyAndReturn
   */
  export type UnitTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitType
     */
    select?: UnitTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UnitType
     */
    omit?: UnitTypeOmit<ExtArgs> | null
    /**
     * The data used to update UnitTypes.
     */
    data: XOR<UnitTypeUpdateManyMutationInput, UnitTypeUncheckedUpdateManyInput>
    /**
     * Filter which UnitTypes to update
     */
    where?: UnitTypeWhereInput
    /**
     * Limit how many UnitTypes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitTypeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UnitType upsert
   */
  export type UnitTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitType
     */
    select?: UnitTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UnitType
     */
    omit?: UnitTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the UnitType to update in case it exists.
     */
    where: UnitTypeWhereUniqueInput
    /**
     * In case the UnitType found by the `where` argument doesn't exist, create a new UnitType with this data.
     */
    create: XOR<UnitTypeCreateInput, UnitTypeUncheckedCreateInput>
    /**
     * In case the UnitType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UnitTypeUpdateInput, UnitTypeUncheckedUpdateInput>
  }

  /**
   * UnitType delete
   */
  export type UnitTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitType
     */
    select?: UnitTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UnitType
     */
    omit?: UnitTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitTypeInclude<ExtArgs> | null
    /**
     * Filter which UnitType to delete.
     */
    where: UnitTypeWhereUniqueInput
  }

  /**
   * UnitType deleteMany
   */
  export type UnitTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UnitTypes to delete
     */
    where?: UnitTypeWhereInput
    /**
     * Limit how many UnitTypes to delete.
     */
    limit?: number
  }

  /**
   * UnitType.units
   */
  export type UnitType$unitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    where?: UnitWhereInput
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    cursor?: UnitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UnitScalarFieldEnum | UnitScalarFieldEnum[]
  }

  /**
   * UnitType without action
   */
  export type UnitTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitType
     */
    select?: UnitTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UnitType
     */
    omit?: UnitTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitTypeInclude<ExtArgs> | null
  }


  /**
   * Model Unit
   */

  export type AggregateUnit = {
    _count: UnitCountAggregateOutputType | null
    _min: UnitMinAggregateOutputType | null
    _max: UnitMaxAggregateOutputType | null
  }

  export type UnitMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    unitTypeId: string | null
    code: string | null
    name: string | null
    floor: string | null
    status: $Enums.UnitStatus | null
    isBookable: boolean | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UnitMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    unitTypeId: string | null
    code: string | null
    name: string | null
    floor: string | null
    status: $Enums.UnitStatus | null
    isBookable: boolean | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UnitCountAggregateOutputType = {
    id: number
    propertyId: number
    unitTypeId: number
    code: number
    name: number
    floor: number
    status: number
    isBookable: number
    isPublished: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UnitMinAggregateInputType = {
    id?: true
    propertyId?: true
    unitTypeId?: true
    code?: true
    name?: true
    floor?: true
    status?: true
    isBookable?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UnitMaxAggregateInputType = {
    id?: true
    propertyId?: true
    unitTypeId?: true
    code?: true
    name?: true
    floor?: true
    status?: true
    isBookable?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UnitCountAggregateInputType = {
    id?: true
    propertyId?: true
    unitTypeId?: true
    code?: true
    name?: true
    floor?: true
    status?: true
    isBookable?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UnitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Unit to aggregate.
     */
    where?: UnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Units to fetch.
     */
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Units from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Units.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Units
    **/
    _count?: true | UnitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UnitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UnitMaxAggregateInputType
  }

  export type GetUnitAggregateType<T extends UnitAggregateArgs> = {
        [P in keyof T & keyof AggregateUnit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUnit[P]>
      : GetScalarType<T[P], AggregateUnit[P]>
  }




  export type UnitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UnitWhereInput
    orderBy?: UnitOrderByWithAggregationInput | UnitOrderByWithAggregationInput[]
    by: UnitScalarFieldEnum[] | UnitScalarFieldEnum
    having?: UnitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UnitCountAggregateInputType | true
    _min?: UnitMinAggregateInputType
    _max?: UnitMaxAggregateInputType
  }

  export type UnitGroupByOutputType = {
    id: string
    propertyId: string
    unitTypeId: string
    code: string
    name: string | null
    floor: string | null
    status: $Enums.UnitStatus
    isBookable: boolean
    isPublished: boolean
    createdAt: Date
    updatedAt: Date
    _count: UnitCountAggregateOutputType | null
    _min: UnitMinAggregateOutputType | null
    _max: UnitMaxAggregateOutputType | null
  }

  type GetUnitGroupByPayload<T extends UnitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UnitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UnitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UnitGroupByOutputType[P]>
            : GetScalarType<T[P], UnitGroupByOutputType[P]>
        }
      >
    >


  export type UnitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    unitTypeId?: boolean
    code?: boolean
    name?: boolean
    floor?: boolean
    status?: boolean
    isBookable?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bookings?: boolean | Unit$bookingsArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    unitType?: boolean | UnitTypeDefaultArgs<ExtArgs>
    _count?: boolean | UnitCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unit"]>

  export type UnitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    unitTypeId?: boolean
    code?: boolean
    name?: boolean
    floor?: boolean
    status?: boolean
    isBookable?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    unitType?: boolean | UnitTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unit"]>

  export type UnitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    unitTypeId?: boolean
    code?: boolean
    name?: boolean
    floor?: boolean
    status?: boolean
    isBookable?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    unitType?: boolean | UnitTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unit"]>

  export type UnitSelectScalar = {
    id?: boolean
    propertyId?: boolean
    unitTypeId?: boolean
    code?: boolean
    name?: boolean
    floor?: boolean
    status?: boolean
    isBookable?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UnitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "propertyId" | "unitTypeId" | "code" | "name" | "floor" | "status" | "isBookable" | "isPublished" | "createdAt" | "updatedAt", ExtArgs["result"]["unit"]>
  export type UnitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | Unit$bookingsArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    unitType?: boolean | UnitTypeDefaultArgs<ExtArgs>
    _count?: boolean | UnitCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UnitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    unitType?: boolean | UnitTypeDefaultArgs<ExtArgs>
  }
  export type UnitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    unitType?: boolean | UnitTypeDefaultArgs<ExtArgs>
  }

  export type $UnitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Unit"
    objects: {
      bookings: Prisma.$BookingPayload<ExtArgs>[]
      property: Prisma.$PropertyPayload<ExtArgs>
      unitType: Prisma.$UnitTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      unitTypeId: string
      code: string
      name: string | null
      floor: string | null
      status: $Enums.UnitStatus
      isBookable: boolean
      isPublished: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["unit"]>
    composites: {}
  }

  type UnitGetPayload<S extends boolean | null | undefined | UnitDefaultArgs> = $Result.GetResult<Prisma.$UnitPayload, S>

  type UnitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UnitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UnitCountAggregateInputType | true
    }

  export interface UnitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Unit'], meta: { name: 'Unit' } }
    /**
     * Find zero or one Unit that matches the filter.
     * @param {UnitFindUniqueArgs} args - Arguments to find a Unit
     * @example
     * // Get one Unit
     * const unit = await prisma.unit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UnitFindUniqueArgs>(args: SelectSubset<T, UnitFindUniqueArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Unit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UnitFindUniqueOrThrowArgs} args - Arguments to find a Unit
     * @example
     * // Get one Unit
     * const unit = await prisma.unit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UnitFindUniqueOrThrowArgs>(args: SelectSubset<T, UnitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Unit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitFindFirstArgs} args - Arguments to find a Unit
     * @example
     * // Get one Unit
     * const unit = await prisma.unit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UnitFindFirstArgs>(args?: SelectSubset<T, UnitFindFirstArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Unit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitFindFirstOrThrowArgs} args - Arguments to find a Unit
     * @example
     * // Get one Unit
     * const unit = await prisma.unit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UnitFindFirstOrThrowArgs>(args?: SelectSubset<T, UnitFindFirstOrThrowArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Units that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Units
     * const units = await prisma.unit.findMany()
     * 
     * // Get first 10 Units
     * const units = await prisma.unit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const unitWithIdOnly = await prisma.unit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UnitFindManyArgs>(args?: SelectSubset<T, UnitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Unit.
     * @param {UnitCreateArgs} args - Arguments to create a Unit.
     * @example
     * // Create one Unit
     * const Unit = await prisma.unit.create({
     *   data: {
     *     // ... data to create a Unit
     *   }
     * })
     * 
     */
    create<T extends UnitCreateArgs>(args: SelectSubset<T, UnitCreateArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Units.
     * @param {UnitCreateManyArgs} args - Arguments to create many Units.
     * @example
     * // Create many Units
     * const unit = await prisma.unit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UnitCreateManyArgs>(args?: SelectSubset<T, UnitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Units and returns the data saved in the database.
     * @param {UnitCreateManyAndReturnArgs} args - Arguments to create many Units.
     * @example
     * // Create many Units
     * const unit = await prisma.unit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Units and only return the `id`
     * const unitWithIdOnly = await prisma.unit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UnitCreateManyAndReturnArgs>(args?: SelectSubset<T, UnitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Unit.
     * @param {UnitDeleteArgs} args - Arguments to delete one Unit.
     * @example
     * // Delete one Unit
     * const Unit = await prisma.unit.delete({
     *   where: {
     *     // ... filter to delete one Unit
     *   }
     * })
     * 
     */
    delete<T extends UnitDeleteArgs>(args: SelectSubset<T, UnitDeleteArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Unit.
     * @param {UnitUpdateArgs} args - Arguments to update one Unit.
     * @example
     * // Update one Unit
     * const unit = await prisma.unit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UnitUpdateArgs>(args: SelectSubset<T, UnitUpdateArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Units.
     * @param {UnitDeleteManyArgs} args - Arguments to filter Units to delete.
     * @example
     * // Delete a few Units
     * const { count } = await prisma.unit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UnitDeleteManyArgs>(args?: SelectSubset<T, UnitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Units.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Units
     * const unit = await prisma.unit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UnitUpdateManyArgs>(args: SelectSubset<T, UnitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Units and returns the data updated in the database.
     * @param {UnitUpdateManyAndReturnArgs} args - Arguments to update many Units.
     * @example
     * // Update many Units
     * const unit = await prisma.unit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Units and only return the `id`
     * const unitWithIdOnly = await prisma.unit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UnitUpdateManyAndReturnArgs>(args: SelectSubset<T, UnitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Unit.
     * @param {UnitUpsertArgs} args - Arguments to update or create a Unit.
     * @example
     * // Update or create a Unit
     * const unit = await prisma.unit.upsert({
     *   create: {
     *     // ... data to create a Unit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Unit we want to update
     *   }
     * })
     */
    upsert<T extends UnitUpsertArgs>(args: SelectSubset<T, UnitUpsertArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Units.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitCountArgs} args - Arguments to filter Units to count.
     * @example
     * // Count the number of Units
     * const count = await prisma.unit.count({
     *   where: {
     *     // ... the filter for the Units we want to count
     *   }
     * })
    **/
    count<T extends UnitCountArgs>(
      args?: Subset<T, UnitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UnitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Unit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UnitAggregateArgs>(args: Subset<T, UnitAggregateArgs>): Prisma.PrismaPromise<GetUnitAggregateType<T>>

    /**
     * Group by Unit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UnitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UnitGroupByArgs['orderBy'] }
        : { orderBy?: UnitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UnitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Unit model
   */
  readonly fields: UnitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Unit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UnitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookings<T extends Unit$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Unit$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    unitType<T extends UnitTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UnitTypeDefaultArgs<ExtArgs>>): Prisma__UnitTypeClient<$Result.GetResult<Prisma.$UnitTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Unit model
   */
  interface UnitFieldRefs {
    readonly id: FieldRef<"Unit", 'String'>
    readonly propertyId: FieldRef<"Unit", 'String'>
    readonly unitTypeId: FieldRef<"Unit", 'String'>
    readonly code: FieldRef<"Unit", 'String'>
    readonly name: FieldRef<"Unit", 'String'>
    readonly floor: FieldRef<"Unit", 'String'>
    readonly status: FieldRef<"Unit", 'UnitStatus'>
    readonly isBookable: FieldRef<"Unit", 'Boolean'>
    readonly isPublished: FieldRef<"Unit", 'Boolean'>
    readonly createdAt: FieldRef<"Unit", 'DateTime'>
    readonly updatedAt: FieldRef<"Unit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Unit findUnique
   */
  export type UnitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter, which Unit to fetch.
     */
    where: UnitWhereUniqueInput
  }

  /**
   * Unit findUniqueOrThrow
   */
  export type UnitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter, which Unit to fetch.
     */
    where: UnitWhereUniqueInput
  }

  /**
   * Unit findFirst
   */
  export type UnitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter, which Unit to fetch.
     */
    where?: UnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Units to fetch.
     */
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Units.
     */
    cursor?: UnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Units from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Units.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Units.
     */
    distinct?: UnitScalarFieldEnum | UnitScalarFieldEnum[]
  }

  /**
   * Unit findFirstOrThrow
   */
  export type UnitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter, which Unit to fetch.
     */
    where?: UnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Units to fetch.
     */
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Units.
     */
    cursor?: UnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Units from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Units.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Units.
     */
    distinct?: UnitScalarFieldEnum | UnitScalarFieldEnum[]
  }

  /**
   * Unit findMany
   */
  export type UnitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter, which Units to fetch.
     */
    where?: UnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Units to fetch.
     */
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Units.
     */
    cursor?: UnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Units from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Units.
     */
    skip?: number
    distinct?: UnitScalarFieldEnum | UnitScalarFieldEnum[]
  }

  /**
   * Unit create
   */
  export type UnitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * The data needed to create a Unit.
     */
    data: XOR<UnitCreateInput, UnitUncheckedCreateInput>
  }

  /**
   * Unit createMany
   */
  export type UnitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Units.
     */
    data: UnitCreateManyInput | UnitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Unit createManyAndReturn
   */
  export type UnitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * The data used to create many Units.
     */
    data: UnitCreateManyInput | UnitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Unit update
   */
  export type UnitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * The data needed to update a Unit.
     */
    data: XOR<UnitUpdateInput, UnitUncheckedUpdateInput>
    /**
     * Choose, which Unit to update.
     */
    where: UnitWhereUniqueInput
  }

  /**
   * Unit updateMany
   */
  export type UnitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Units.
     */
    data: XOR<UnitUpdateManyMutationInput, UnitUncheckedUpdateManyInput>
    /**
     * Filter which Units to update
     */
    where?: UnitWhereInput
    /**
     * Limit how many Units to update.
     */
    limit?: number
  }

  /**
   * Unit updateManyAndReturn
   */
  export type UnitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * The data used to update Units.
     */
    data: XOR<UnitUpdateManyMutationInput, UnitUncheckedUpdateManyInput>
    /**
     * Filter which Units to update
     */
    where?: UnitWhereInput
    /**
     * Limit how many Units to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Unit upsert
   */
  export type UnitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * The filter to search for the Unit to update in case it exists.
     */
    where: UnitWhereUniqueInput
    /**
     * In case the Unit found by the `where` argument doesn't exist, create a new Unit with this data.
     */
    create: XOR<UnitCreateInput, UnitUncheckedCreateInput>
    /**
     * In case the Unit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UnitUpdateInput, UnitUncheckedUpdateInput>
  }

  /**
   * Unit delete
   */
  export type UnitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter which Unit to delete.
     */
    where: UnitWhereUniqueInput
  }

  /**
   * Unit deleteMany
   */
  export type UnitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Units to delete
     */
    where?: UnitWhereInput
    /**
     * Limit how many Units to delete.
     */
    limit?: number
  }

  /**
   * Unit.bookings
   */
  export type Unit$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Unit without action
   */
  export type UnitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
  }


  /**
   * Model Booking
   */

  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingAvgAggregateOutputType = {
    adultsCount: number | null
    childrenCount: number | null
    totalAmountMinor: number | null
  }

  export type BookingSumAggregateOutputType = {
    adultsCount: number | null
    childrenCount: number | null
    totalAmountMinor: number | null
  }

  export type BookingMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    unitId: string | null
    idempotencyKey: string | null
    status: $Enums.BookingStatus | null
    paymentStatus: $Enums.PaymentStatus | null
    checkInDate: Date | null
    checkOutDate: Date | null
    guestFullName: string | null
    guestEmail: string | null
    guestPhone: string | null
    adultsCount: number | null
    childrenCount: number | null
    currency: $Enums.Currency | null
    totalAmountMinor: number | null
    notes: string | null
    cancelledAt: Date | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    unitId: string | null
    idempotencyKey: string | null
    status: $Enums.BookingStatus | null
    paymentStatus: $Enums.PaymentStatus | null
    checkInDate: Date | null
    checkOutDate: Date | null
    guestFullName: string | null
    guestEmail: string | null
    guestPhone: string | null
    adultsCount: number | null
    childrenCount: number | null
    currency: $Enums.Currency | null
    totalAmountMinor: number | null
    notes: string | null
    cancelledAt: Date | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    propertyId: number
    unitId: number
    idempotencyKey: number
    status: number
    paymentStatus: number
    checkInDate: number
    checkOutDate: number
    guestFullName: number
    guestEmail: number
    guestPhone: number
    adultsCount: number
    childrenCount: number
    currency: number
    totalAmountMinor: number
    notes: number
    cancelledAt: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookingAvgAggregateInputType = {
    adultsCount?: true
    childrenCount?: true
    totalAmountMinor?: true
  }

  export type BookingSumAggregateInputType = {
    adultsCount?: true
    childrenCount?: true
    totalAmountMinor?: true
  }

  export type BookingMinAggregateInputType = {
    id?: true
    propertyId?: true
    unitId?: true
    idempotencyKey?: true
    status?: true
    paymentStatus?: true
    checkInDate?: true
    checkOutDate?: true
    guestFullName?: true
    guestEmail?: true
    guestPhone?: true
    adultsCount?: true
    childrenCount?: true
    currency?: true
    totalAmountMinor?: true
    notes?: true
    cancelledAt?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    propertyId?: true
    unitId?: true
    idempotencyKey?: true
    status?: true
    paymentStatus?: true
    checkInDate?: true
    checkOutDate?: true
    guestFullName?: true
    guestEmail?: true
    guestPhone?: true
    adultsCount?: true
    childrenCount?: true
    currency?: true
    totalAmountMinor?: true
    notes?: true
    cancelledAt?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    propertyId?: true
    unitId?: true
    idempotencyKey?: true
    status?: true
    paymentStatus?: true
    checkInDate?: true
    checkOutDate?: true
    guestFullName?: true
    guestEmail?: true
    guestPhone?: true
    adultsCount?: true
    childrenCount?: true
    currency?: true
    totalAmountMinor?: true
    notes?: true
    cancelledAt?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithAggregationInput | BookingOrderByWithAggregationInput[]
    by: BookingScalarFieldEnum[] | BookingScalarFieldEnum
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _avg?: BookingAvgAggregateInputType
    _sum?: BookingSumAggregateInputType
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }

  export type BookingGroupByOutputType = {
    id: string
    propertyId: string
    unitId: string
    idempotencyKey: string | null
    status: $Enums.BookingStatus
    paymentStatus: $Enums.PaymentStatus
    checkInDate: Date
    checkOutDate: Date
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount: number
    currency: $Enums.Currency
    totalAmountMinor: number
    notes: string | null
    cancelledAt: Date | null
    expiresAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    unitId?: boolean
    idempotencyKey?: boolean
    status?: boolean
    paymentStatus?: boolean
    checkInDate?: boolean
    checkOutDate?: boolean
    guestFullName?: boolean
    guestEmail?: boolean
    guestPhone?: boolean
    adultsCount?: boolean
    childrenCount?: boolean
    currency?: boolean
    totalAmountMinor?: boolean
    notes?: boolean
    cancelledAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    priceSnapshot?: boolean | Booking$priceSnapshotArgs<ExtArgs>
    paymentIntents?: boolean | Booking$paymentIntentsArgs<ExtArgs>
    messageThreads?: boolean | Booking$messageThreadsArgs<ExtArgs>
    auditLogs?: boolean | Booking$auditLogsArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    unit?: boolean | UnitDefaultArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    unitId?: boolean
    idempotencyKey?: boolean
    status?: boolean
    paymentStatus?: boolean
    checkInDate?: boolean
    checkOutDate?: boolean
    guestFullName?: boolean
    guestEmail?: boolean
    guestPhone?: boolean
    adultsCount?: boolean
    childrenCount?: boolean
    currency?: boolean
    totalAmountMinor?: boolean
    notes?: boolean
    cancelledAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    unit?: boolean | UnitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    unitId?: boolean
    idempotencyKey?: boolean
    status?: boolean
    paymentStatus?: boolean
    checkInDate?: boolean
    checkOutDate?: boolean
    guestFullName?: boolean
    guestEmail?: boolean
    guestPhone?: boolean
    adultsCount?: boolean
    childrenCount?: boolean
    currency?: boolean
    totalAmountMinor?: boolean
    notes?: boolean
    cancelledAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    unit?: boolean | UnitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    propertyId?: boolean
    unitId?: boolean
    idempotencyKey?: boolean
    status?: boolean
    paymentStatus?: boolean
    checkInDate?: boolean
    checkOutDate?: boolean
    guestFullName?: boolean
    guestEmail?: boolean
    guestPhone?: boolean
    adultsCount?: boolean
    childrenCount?: boolean
    currency?: boolean
    totalAmountMinor?: boolean
    notes?: boolean
    cancelledAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "propertyId" | "unitId" | "idempotencyKey" | "status" | "paymentStatus" | "checkInDate" | "checkOutDate" | "guestFullName" | "guestEmail" | "guestPhone" | "adultsCount" | "childrenCount" | "currency" | "totalAmountMinor" | "notes" | "cancelledAt" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["booking"]>
  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    priceSnapshot?: boolean | Booking$priceSnapshotArgs<ExtArgs>
    paymentIntents?: boolean | Booking$paymentIntentsArgs<ExtArgs>
    messageThreads?: boolean | Booking$messageThreadsArgs<ExtArgs>
    auditLogs?: boolean | Booking$auditLogsArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    unit?: boolean | UnitDefaultArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    unit?: boolean | UnitDefaultArgs<ExtArgs>
  }
  export type BookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    unit?: boolean | UnitDefaultArgs<ExtArgs>
  }

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      priceSnapshot: Prisma.$PriceSnapshotPayload<ExtArgs> | null
      paymentIntents: Prisma.$PaymentIntentPayload<ExtArgs>[]
      messageThreads: Prisma.$MessageThreadPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
      property: Prisma.$PropertyPayload<ExtArgs>
      unit: Prisma.$UnitPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      unitId: string
      idempotencyKey: string | null
      status: $Enums.BookingStatus
      paymentStatus: $Enums.PaymentStatus
      checkInDate: Date
      checkOutDate: Date
      guestFullName: string
      guestEmail: string
      guestPhone: string
      adultsCount: number
      childrenCount: number
      currency: $Enums.Currency
      totalAmountMinor: number
      notes: string | null
      cancelledAt: Date | null
      expiresAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["booking"]>
    composites: {}
  }

  type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = $Result.GetResult<Prisma.$BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingFindManyArgs>(args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
     */
    create<T extends BookingCreateArgs>(args: SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingCreateManyArgs>(args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
     */
    delete<T extends BookingDeleteArgs>(args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingUpdateArgs>(args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingUpdateManyArgs>(args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings and returns the data updated in the database.
     * @param {BookingUpdateManyAndReturnArgs} args - Arguments to update many Bookings.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookingUpdateManyAndReturnArgs>(args: SelectSubset<T, BookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Booking model
   */
  readonly fields: BookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    priceSnapshot<T extends Booking$priceSnapshotArgs<ExtArgs> = {}>(args?: Subset<T, Booking$priceSnapshotArgs<ExtArgs>>): Prisma__PriceSnapshotClient<$Result.GetResult<Prisma.$PriceSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    paymentIntents<T extends Booking$paymentIntentsArgs<ExtArgs> = {}>(args?: Subset<T, Booking$paymentIntentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messageThreads<T extends Booking$messageThreadsArgs<ExtArgs> = {}>(args?: Subset<T, Booking$messageThreadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends Booking$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, Booking$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    unit<T extends UnitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UnitDefaultArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Booking model
   */
  interface BookingFieldRefs {
    readonly id: FieldRef<"Booking", 'String'>
    readonly propertyId: FieldRef<"Booking", 'String'>
    readonly unitId: FieldRef<"Booking", 'String'>
    readonly idempotencyKey: FieldRef<"Booking", 'String'>
    readonly status: FieldRef<"Booking", 'BookingStatus'>
    readonly paymentStatus: FieldRef<"Booking", 'PaymentStatus'>
    readonly checkInDate: FieldRef<"Booking", 'DateTime'>
    readonly checkOutDate: FieldRef<"Booking", 'DateTime'>
    readonly guestFullName: FieldRef<"Booking", 'String'>
    readonly guestEmail: FieldRef<"Booking", 'String'>
    readonly guestPhone: FieldRef<"Booking", 'String'>
    readonly adultsCount: FieldRef<"Booking", 'Int'>
    readonly childrenCount: FieldRef<"Booking", 'Int'>
    readonly currency: FieldRef<"Booking", 'Currency'>
    readonly totalAmountMinor: FieldRef<"Booking", 'Int'>
    readonly notes: FieldRef<"Booking", 'String'>
    readonly cancelledAt: FieldRef<"Booking", 'DateTime'>
    readonly expiresAt: FieldRef<"Booking", 'DateTime'>
    readonly createdAt: FieldRef<"Booking", 'DateTime'>
    readonly updatedAt: FieldRef<"Booking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Booking findUnique
   */
  export type BookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findFirst
   */
  export type BookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }

  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking createManyAndReturn
   */
  export type BookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
  }

  /**
   * Booking updateManyAndReturn
   */
  export type BookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }

  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to delete.
     */
    limit?: number
  }

  /**
   * Booking.priceSnapshot
   */
  export type Booking$priceSnapshotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceSnapshot
     */
    select?: PriceSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceSnapshot
     */
    omit?: PriceSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceSnapshotInclude<ExtArgs> | null
    where?: PriceSnapshotWhereInput
  }

  /**
   * Booking.paymentIntents
   */
  export type Booking$paymentIntentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    where?: PaymentIntentWhereInput
    orderBy?: PaymentIntentOrderByWithRelationInput | PaymentIntentOrderByWithRelationInput[]
    cursor?: PaymentIntentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentIntentScalarFieldEnum | PaymentIntentScalarFieldEnum[]
  }

  /**
   * Booking.messageThreads
   */
  export type Booking$messageThreadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageThreadInclude<ExtArgs> | null
    where?: MessageThreadWhereInput
    orderBy?: MessageThreadOrderByWithRelationInput | MessageThreadOrderByWithRelationInput[]
    cursor?: MessageThreadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageThreadScalarFieldEnum | MessageThreadScalarFieldEnum[]
  }

  /**
   * Booking.auditLogs
   */
  export type Booking$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Booking without action
   */
  export type BookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
  }


  /**
   * Model PriceSnapshot
   */

  export type AggregatePriceSnapshot = {
    _count: PriceSnapshotCountAggregateOutputType | null
    _avg: PriceSnapshotAvgAggregateOutputType | null
    _sum: PriceSnapshotSumAggregateOutputType | null
    _min: PriceSnapshotMinAggregateOutputType | null
    _max: PriceSnapshotMaxAggregateOutputType | null
  }

  export type PriceSnapshotAvgAggregateOutputType = {
    nightsCount: number | null
    nightlyRateMinor: number | null
    subtotalMinor: number | null
    discountsMinor: number | null
    taxesMinor: number | null
    feesMinor: number | null
    totalAmountMinor: number | null
    pricingVersion: number | null
  }

  export type PriceSnapshotSumAggregateOutputType = {
    nightsCount: number | null
    nightlyRateMinor: number | null
    subtotalMinor: number | null
    discountsMinor: number | null
    taxesMinor: number | null
    feesMinor: number | null
    totalAmountMinor: number | null
    pricingVersion: number | null
  }

  export type PriceSnapshotMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    bookingId: string | null
    currency: $Enums.Currency | null
    nightsCount: number | null
    nightlyRateMinor: number | null
    subtotalMinor: number | null
    discountsMinor: number | null
    taxesMinor: number | null
    feesMinor: number | null
    totalAmountMinor: number | null
    pricingVersion: number | null
    promotionCode: string | null
    capturedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PriceSnapshotMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    bookingId: string | null
    currency: $Enums.Currency | null
    nightsCount: number | null
    nightlyRateMinor: number | null
    subtotalMinor: number | null
    discountsMinor: number | null
    taxesMinor: number | null
    feesMinor: number | null
    totalAmountMinor: number | null
    pricingVersion: number | null
    promotionCode: string | null
    capturedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PriceSnapshotCountAggregateOutputType = {
    id: number
    propertyId: number
    bookingId: number
    currency: number
    nightsCount: number
    nightlyRateMinor: number
    subtotalMinor: number
    discountsMinor: number
    taxesMinor: number
    feesMinor: number
    totalAmountMinor: number
    pricingVersion: number
    promotionCode: number
    capturedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PriceSnapshotAvgAggregateInputType = {
    nightsCount?: true
    nightlyRateMinor?: true
    subtotalMinor?: true
    discountsMinor?: true
    taxesMinor?: true
    feesMinor?: true
    totalAmountMinor?: true
    pricingVersion?: true
  }

  export type PriceSnapshotSumAggregateInputType = {
    nightsCount?: true
    nightlyRateMinor?: true
    subtotalMinor?: true
    discountsMinor?: true
    taxesMinor?: true
    feesMinor?: true
    totalAmountMinor?: true
    pricingVersion?: true
  }

  export type PriceSnapshotMinAggregateInputType = {
    id?: true
    propertyId?: true
    bookingId?: true
    currency?: true
    nightsCount?: true
    nightlyRateMinor?: true
    subtotalMinor?: true
    discountsMinor?: true
    taxesMinor?: true
    feesMinor?: true
    totalAmountMinor?: true
    pricingVersion?: true
    promotionCode?: true
    capturedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PriceSnapshotMaxAggregateInputType = {
    id?: true
    propertyId?: true
    bookingId?: true
    currency?: true
    nightsCount?: true
    nightlyRateMinor?: true
    subtotalMinor?: true
    discountsMinor?: true
    taxesMinor?: true
    feesMinor?: true
    totalAmountMinor?: true
    pricingVersion?: true
    promotionCode?: true
    capturedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PriceSnapshotCountAggregateInputType = {
    id?: true
    propertyId?: true
    bookingId?: true
    currency?: true
    nightsCount?: true
    nightlyRateMinor?: true
    subtotalMinor?: true
    discountsMinor?: true
    taxesMinor?: true
    feesMinor?: true
    totalAmountMinor?: true
    pricingVersion?: true
    promotionCode?: true
    capturedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PriceSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PriceSnapshot to aggregate.
     */
    where?: PriceSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceSnapshots to fetch.
     */
    orderBy?: PriceSnapshotOrderByWithRelationInput | PriceSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PriceSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PriceSnapshots
    **/
    _count?: true | PriceSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PriceSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PriceSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PriceSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PriceSnapshotMaxAggregateInputType
  }

  export type GetPriceSnapshotAggregateType<T extends PriceSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregatePriceSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePriceSnapshot[P]>
      : GetScalarType<T[P], AggregatePriceSnapshot[P]>
  }




  export type PriceSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceSnapshotWhereInput
    orderBy?: PriceSnapshotOrderByWithAggregationInput | PriceSnapshotOrderByWithAggregationInput[]
    by: PriceSnapshotScalarFieldEnum[] | PriceSnapshotScalarFieldEnum
    having?: PriceSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PriceSnapshotCountAggregateInputType | true
    _avg?: PriceSnapshotAvgAggregateInputType
    _sum?: PriceSnapshotSumAggregateInputType
    _min?: PriceSnapshotMinAggregateInputType
    _max?: PriceSnapshotMaxAggregateInputType
  }

  export type PriceSnapshotGroupByOutputType = {
    id: string
    propertyId: string
    bookingId: string
    currency: $Enums.Currency
    nightsCount: number
    nightlyRateMinor: number
    subtotalMinor: number
    discountsMinor: number
    taxesMinor: number
    feesMinor: number
    totalAmountMinor: number
    pricingVersion: number
    promotionCode: string | null
    capturedAt: Date
    createdAt: Date
    updatedAt: Date
    _count: PriceSnapshotCountAggregateOutputType | null
    _avg: PriceSnapshotAvgAggregateOutputType | null
    _sum: PriceSnapshotSumAggregateOutputType | null
    _min: PriceSnapshotMinAggregateOutputType | null
    _max: PriceSnapshotMaxAggregateOutputType | null
  }

  type GetPriceSnapshotGroupByPayload<T extends PriceSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PriceSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PriceSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PriceSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], PriceSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type PriceSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    currency?: boolean
    nightsCount?: boolean
    nightlyRateMinor?: boolean
    subtotalMinor?: boolean
    discountsMinor?: boolean
    taxesMinor?: boolean
    feesMinor?: boolean
    totalAmountMinor?: boolean
    pricingVersion?: boolean
    promotionCode?: boolean
    capturedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priceSnapshot"]>

  export type PriceSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    currency?: boolean
    nightsCount?: boolean
    nightlyRateMinor?: boolean
    subtotalMinor?: boolean
    discountsMinor?: boolean
    taxesMinor?: boolean
    feesMinor?: boolean
    totalAmountMinor?: boolean
    pricingVersion?: boolean
    promotionCode?: boolean
    capturedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priceSnapshot"]>

  export type PriceSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    currency?: boolean
    nightsCount?: boolean
    nightlyRateMinor?: boolean
    subtotalMinor?: boolean
    discountsMinor?: boolean
    taxesMinor?: boolean
    feesMinor?: boolean
    totalAmountMinor?: boolean
    pricingVersion?: boolean
    promotionCode?: boolean
    capturedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priceSnapshot"]>

  export type PriceSnapshotSelectScalar = {
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    currency?: boolean
    nightsCount?: boolean
    nightlyRateMinor?: boolean
    subtotalMinor?: boolean
    discountsMinor?: boolean
    taxesMinor?: boolean
    feesMinor?: boolean
    totalAmountMinor?: boolean
    pricingVersion?: boolean
    promotionCode?: boolean
    capturedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PriceSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "propertyId" | "bookingId" | "currency" | "nightsCount" | "nightlyRateMinor" | "subtotalMinor" | "discountsMinor" | "taxesMinor" | "feesMinor" | "totalAmountMinor" | "pricingVersion" | "promotionCode" | "capturedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["priceSnapshot"]>
  export type PriceSnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type PriceSnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type PriceSnapshotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }

  export type $PriceSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PriceSnapshot"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
      booking: Prisma.$BookingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      bookingId: string
      currency: $Enums.Currency
      nightsCount: number
      nightlyRateMinor: number
      subtotalMinor: number
      discountsMinor: number
      taxesMinor: number
      feesMinor: number
      totalAmountMinor: number
      pricingVersion: number
      promotionCode: string | null
      capturedAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["priceSnapshot"]>
    composites: {}
  }

  type PriceSnapshotGetPayload<S extends boolean | null | undefined | PriceSnapshotDefaultArgs> = $Result.GetResult<Prisma.$PriceSnapshotPayload, S>

  type PriceSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PriceSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PriceSnapshotCountAggregateInputType | true
    }

  export interface PriceSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PriceSnapshot'], meta: { name: 'PriceSnapshot' } }
    /**
     * Find zero or one PriceSnapshot that matches the filter.
     * @param {PriceSnapshotFindUniqueArgs} args - Arguments to find a PriceSnapshot
     * @example
     * // Get one PriceSnapshot
     * const priceSnapshot = await prisma.priceSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PriceSnapshotFindUniqueArgs>(args: SelectSubset<T, PriceSnapshotFindUniqueArgs<ExtArgs>>): Prisma__PriceSnapshotClient<$Result.GetResult<Prisma.$PriceSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PriceSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PriceSnapshotFindUniqueOrThrowArgs} args - Arguments to find a PriceSnapshot
     * @example
     * // Get one PriceSnapshot
     * const priceSnapshot = await prisma.priceSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PriceSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, PriceSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PriceSnapshotClient<$Result.GetResult<Prisma.$PriceSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PriceSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceSnapshotFindFirstArgs} args - Arguments to find a PriceSnapshot
     * @example
     * // Get one PriceSnapshot
     * const priceSnapshot = await prisma.priceSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PriceSnapshotFindFirstArgs>(args?: SelectSubset<T, PriceSnapshotFindFirstArgs<ExtArgs>>): Prisma__PriceSnapshotClient<$Result.GetResult<Prisma.$PriceSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PriceSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceSnapshotFindFirstOrThrowArgs} args - Arguments to find a PriceSnapshot
     * @example
     * // Get one PriceSnapshot
     * const priceSnapshot = await prisma.priceSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PriceSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, PriceSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__PriceSnapshotClient<$Result.GetResult<Prisma.$PriceSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PriceSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PriceSnapshots
     * const priceSnapshots = await prisma.priceSnapshot.findMany()
     * 
     * // Get first 10 PriceSnapshots
     * const priceSnapshots = await prisma.priceSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const priceSnapshotWithIdOnly = await prisma.priceSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PriceSnapshotFindManyArgs>(args?: SelectSubset<T, PriceSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PriceSnapshot.
     * @param {PriceSnapshotCreateArgs} args - Arguments to create a PriceSnapshot.
     * @example
     * // Create one PriceSnapshot
     * const PriceSnapshot = await prisma.priceSnapshot.create({
     *   data: {
     *     // ... data to create a PriceSnapshot
     *   }
     * })
     * 
     */
    create<T extends PriceSnapshotCreateArgs>(args: SelectSubset<T, PriceSnapshotCreateArgs<ExtArgs>>): Prisma__PriceSnapshotClient<$Result.GetResult<Prisma.$PriceSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PriceSnapshots.
     * @param {PriceSnapshotCreateManyArgs} args - Arguments to create many PriceSnapshots.
     * @example
     * // Create many PriceSnapshots
     * const priceSnapshot = await prisma.priceSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PriceSnapshotCreateManyArgs>(args?: SelectSubset<T, PriceSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PriceSnapshots and returns the data saved in the database.
     * @param {PriceSnapshotCreateManyAndReturnArgs} args - Arguments to create many PriceSnapshots.
     * @example
     * // Create many PriceSnapshots
     * const priceSnapshot = await prisma.priceSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PriceSnapshots and only return the `id`
     * const priceSnapshotWithIdOnly = await prisma.priceSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PriceSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, PriceSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PriceSnapshot.
     * @param {PriceSnapshotDeleteArgs} args - Arguments to delete one PriceSnapshot.
     * @example
     * // Delete one PriceSnapshot
     * const PriceSnapshot = await prisma.priceSnapshot.delete({
     *   where: {
     *     // ... filter to delete one PriceSnapshot
     *   }
     * })
     * 
     */
    delete<T extends PriceSnapshotDeleteArgs>(args: SelectSubset<T, PriceSnapshotDeleteArgs<ExtArgs>>): Prisma__PriceSnapshotClient<$Result.GetResult<Prisma.$PriceSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PriceSnapshot.
     * @param {PriceSnapshotUpdateArgs} args - Arguments to update one PriceSnapshot.
     * @example
     * // Update one PriceSnapshot
     * const priceSnapshot = await prisma.priceSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PriceSnapshotUpdateArgs>(args: SelectSubset<T, PriceSnapshotUpdateArgs<ExtArgs>>): Prisma__PriceSnapshotClient<$Result.GetResult<Prisma.$PriceSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PriceSnapshots.
     * @param {PriceSnapshotDeleteManyArgs} args - Arguments to filter PriceSnapshots to delete.
     * @example
     * // Delete a few PriceSnapshots
     * const { count } = await prisma.priceSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PriceSnapshotDeleteManyArgs>(args?: SelectSubset<T, PriceSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PriceSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PriceSnapshots
     * const priceSnapshot = await prisma.priceSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PriceSnapshotUpdateManyArgs>(args: SelectSubset<T, PriceSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PriceSnapshots and returns the data updated in the database.
     * @param {PriceSnapshotUpdateManyAndReturnArgs} args - Arguments to update many PriceSnapshots.
     * @example
     * // Update many PriceSnapshots
     * const priceSnapshot = await prisma.priceSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PriceSnapshots and only return the `id`
     * const priceSnapshotWithIdOnly = await prisma.priceSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PriceSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, PriceSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PriceSnapshot.
     * @param {PriceSnapshotUpsertArgs} args - Arguments to update or create a PriceSnapshot.
     * @example
     * // Update or create a PriceSnapshot
     * const priceSnapshot = await prisma.priceSnapshot.upsert({
     *   create: {
     *     // ... data to create a PriceSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PriceSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends PriceSnapshotUpsertArgs>(args: SelectSubset<T, PriceSnapshotUpsertArgs<ExtArgs>>): Prisma__PriceSnapshotClient<$Result.GetResult<Prisma.$PriceSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PriceSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceSnapshotCountArgs} args - Arguments to filter PriceSnapshots to count.
     * @example
     * // Count the number of PriceSnapshots
     * const count = await prisma.priceSnapshot.count({
     *   where: {
     *     // ... the filter for the PriceSnapshots we want to count
     *   }
     * })
    **/
    count<T extends PriceSnapshotCountArgs>(
      args?: Subset<T, PriceSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PriceSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PriceSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PriceSnapshotAggregateArgs>(args: Subset<T, PriceSnapshotAggregateArgs>): Prisma.PrismaPromise<GetPriceSnapshotAggregateType<T>>

    /**
     * Group by PriceSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PriceSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PriceSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: PriceSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PriceSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPriceSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PriceSnapshot model
   */
  readonly fields: PriceSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PriceSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PriceSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PriceSnapshot model
   */
  interface PriceSnapshotFieldRefs {
    readonly id: FieldRef<"PriceSnapshot", 'String'>
    readonly propertyId: FieldRef<"PriceSnapshot", 'String'>
    readonly bookingId: FieldRef<"PriceSnapshot", 'String'>
    readonly currency: FieldRef<"PriceSnapshot", 'Currency'>
    readonly nightsCount: FieldRef<"PriceSnapshot", 'Int'>
    readonly nightlyRateMinor: FieldRef<"PriceSnapshot", 'Int'>
    readonly subtotalMinor: FieldRef<"PriceSnapshot", 'Int'>
    readonly discountsMinor: FieldRef<"PriceSnapshot", 'Int'>
    readonly taxesMinor: FieldRef<"PriceSnapshot", 'Int'>
    readonly feesMinor: FieldRef<"PriceSnapshot", 'Int'>
    readonly totalAmountMinor: FieldRef<"PriceSnapshot", 'Int'>
    readonly pricingVersion: FieldRef<"PriceSnapshot", 'Int'>
    readonly promotionCode: FieldRef<"PriceSnapshot", 'String'>
    readonly capturedAt: FieldRef<"PriceSnapshot", 'DateTime'>
    readonly createdAt: FieldRef<"PriceSnapshot", 'DateTime'>
    readonly updatedAt: FieldRef<"PriceSnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PriceSnapshot findUnique
   */
  export type PriceSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceSnapshot
     */
    select?: PriceSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceSnapshot
     */
    omit?: PriceSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which PriceSnapshot to fetch.
     */
    where: PriceSnapshotWhereUniqueInput
  }

  /**
   * PriceSnapshot findUniqueOrThrow
   */
  export type PriceSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceSnapshot
     */
    select?: PriceSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceSnapshot
     */
    omit?: PriceSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which PriceSnapshot to fetch.
     */
    where: PriceSnapshotWhereUniqueInput
  }

  /**
   * PriceSnapshot findFirst
   */
  export type PriceSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceSnapshot
     */
    select?: PriceSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceSnapshot
     */
    omit?: PriceSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which PriceSnapshot to fetch.
     */
    where?: PriceSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceSnapshots to fetch.
     */
    orderBy?: PriceSnapshotOrderByWithRelationInput | PriceSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PriceSnapshots.
     */
    cursor?: PriceSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PriceSnapshots.
     */
    distinct?: PriceSnapshotScalarFieldEnum | PriceSnapshotScalarFieldEnum[]
  }

  /**
   * PriceSnapshot findFirstOrThrow
   */
  export type PriceSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceSnapshot
     */
    select?: PriceSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceSnapshot
     */
    omit?: PriceSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which PriceSnapshot to fetch.
     */
    where?: PriceSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceSnapshots to fetch.
     */
    orderBy?: PriceSnapshotOrderByWithRelationInput | PriceSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PriceSnapshots.
     */
    cursor?: PriceSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PriceSnapshots.
     */
    distinct?: PriceSnapshotScalarFieldEnum | PriceSnapshotScalarFieldEnum[]
  }

  /**
   * PriceSnapshot findMany
   */
  export type PriceSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceSnapshot
     */
    select?: PriceSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceSnapshot
     */
    omit?: PriceSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which PriceSnapshots to fetch.
     */
    where?: PriceSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceSnapshots to fetch.
     */
    orderBy?: PriceSnapshotOrderByWithRelationInput | PriceSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PriceSnapshots.
     */
    cursor?: PriceSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceSnapshots.
     */
    skip?: number
    distinct?: PriceSnapshotScalarFieldEnum | PriceSnapshotScalarFieldEnum[]
  }

  /**
   * PriceSnapshot create
   */
  export type PriceSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceSnapshot
     */
    select?: PriceSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceSnapshot
     */
    omit?: PriceSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a PriceSnapshot.
     */
    data: XOR<PriceSnapshotCreateInput, PriceSnapshotUncheckedCreateInput>
  }

  /**
   * PriceSnapshot createMany
   */
  export type PriceSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PriceSnapshots.
     */
    data: PriceSnapshotCreateManyInput | PriceSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PriceSnapshot createManyAndReturn
   */
  export type PriceSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceSnapshot
     */
    select?: PriceSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PriceSnapshot
     */
    omit?: PriceSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many PriceSnapshots.
     */
    data: PriceSnapshotCreateManyInput | PriceSnapshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceSnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PriceSnapshot update
   */
  export type PriceSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceSnapshot
     */
    select?: PriceSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceSnapshot
     */
    omit?: PriceSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a PriceSnapshot.
     */
    data: XOR<PriceSnapshotUpdateInput, PriceSnapshotUncheckedUpdateInput>
    /**
     * Choose, which PriceSnapshot to update.
     */
    where: PriceSnapshotWhereUniqueInput
  }

  /**
   * PriceSnapshot updateMany
   */
  export type PriceSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PriceSnapshots.
     */
    data: XOR<PriceSnapshotUpdateManyMutationInput, PriceSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which PriceSnapshots to update
     */
    where?: PriceSnapshotWhereInput
    /**
     * Limit how many PriceSnapshots to update.
     */
    limit?: number
  }

  /**
   * PriceSnapshot updateManyAndReturn
   */
  export type PriceSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceSnapshot
     */
    select?: PriceSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PriceSnapshot
     */
    omit?: PriceSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update PriceSnapshots.
     */
    data: XOR<PriceSnapshotUpdateManyMutationInput, PriceSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which PriceSnapshots to update
     */
    where?: PriceSnapshotWhereInput
    /**
     * Limit how many PriceSnapshots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceSnapshotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PriceSnapshot upsert
   */
  export type PriceSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceSnapshot
     */
    select?: PriceSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceSnapshot
     */
    omit?: PriceSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceSnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the PriceSnapshot to update in case it exists.
     */
    where: PriceSnapshotWhereUniqueInput
    /**
     * In case the PriceSnapshot found by the `where` argument doesn't exist, create a new PriceSnapshot with this data.
     */
    create: XOR<PriceSnapshotCreateInput, PriceSnapshotUncheckedCreateInput>
    /**
     * In case the PriceSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PriceSnapshotUpdateInput, PriceSnapshotUncheckedUpdateInput>
  }

  /**
   * PriceSnapshot delete
   */
  export type PriceSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceSnapshot
     */
    select?: PriceSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceSnapshot
     */
    omit?: PriceSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceSnapshotInclude<ExtArgs> | null
    /**
     * Filter which PriceSnapshot to delete.
     */
    where: PriceSnapshotWhereUniqueInput
  }

  /**
   * PriceSnapshot deleteMany
   */
  export type PriceSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PriceSnapshots to delete
     */
    where?: PriceSnapshotWhereInput
    /**
     * Limit how many PriceSnapshots to delete.
     */
    limit?: number
  }

  /**
   * PriceSnapshot without action
   */
  export type PriceSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceSnapshot
     */
    select?: PriceSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceSnapshot
     */
    omit?: PriceSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceSnapshotInclude<ExtArgs> | null
  }


  /**
   * Model PaymentIntent
   */

  export type AggregatePaymentIntent = {
    _count: PaymentIntentCountAggregateOutputType | null
    _avg: PaymentIntentAvgAggregateOutputType | null
    _sum: PaymentIntentSumAggregateOutputType | null
    _min: PaymentIntentMinAggregateOutputType | null
    _max: PaymentIntentMaxAggregateOutputType | null
  }

  export type PaymentIntentAvgAggregateOutputType = {
    amountMinor: number | null
  }

  export type PaymentIntentSumAggregateOutputType = {
    amountMinor: number | null
  }

  export type PaymentIntentMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    bookingId: string | null
    amountMinor: number | null
    currency: $Enums.Currency | null
    method: $Enums.PaymentMethod | null
    provider: $Enums.PaymentProvider | null
    status: $Enums.PaymentStatus | null
    providerIntentRef: string | null
    providerCustomerRef: string | null
    idempotencyKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentIntentMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    bookingId: string | null
    amountMinor: number | null
    currency: $Enums.Currency | null
    method: $Enums.PaymentMethod | null
    provider: $Enums.PaymentProvider | null
    status: $Enums.PaymentStatus | null
    providerIntentRef: string | null
    providerCustomerRef: string | null
    idempotencyKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentIntentCountAggregateOutputType = {
    id: number
    propertyId: number
    bookingId: number
    amountMinor: number
    currency: number
    method: number
    provider: number
    status: number
    providerIntentRef: number
    providerCustomerRef: number
    idempotencyKey: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentIntentAvgAggregateInputType = {
    amountMinor?: true
  }

  export type PaymentIntentSumAggregateInputType = {
    amountMinor?: true
  }

  export type PaymentIntentMinAggregateInputType = {
    id?: true
    propertyId?: true
    bookingId?: true
    amountMinor?: true
    currency?: true
    method?: true
    provider?: true
    status?: true
    providerIntentRef?: true
    providerCustomerRef?: true
    idempotencyKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentIntentMaxAggregateInputType = {
    id?: true
    propertyId?: true
    bookingId?: true
    amountMinor?: true
    currency?: true
    method?: true
    provider?: true
    status?: true
    providerIntentRef?: true
    providerCustomerRef?: true
    idempotencyKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentIntentCountAggregateInputType = {
    id?: true
    propertyId?: true
    bookingId?: true
    amountMinor?: true
    currency?: true
    method?: true
    provider?: true
    status?: true
    providerIntentRef?: true
    providerCustomerRef?: true
    idempotencyKey?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentIntentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentIntent to aggregate.
     */
    where?: PaymentIntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentIntents to fetch.
     */
    orderBy?: PaymentIntentOrderByWithRelationInput | PaymentIntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentIntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentIntents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentIntents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentIntents
    **/
    _count?: true | PaymentIntentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentIntentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentIntentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentIntentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentIntentMaxAggregateInputType
  }

  export type GetPaymentIntentAggregateType<T extends PaymentIntentAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentIntent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentIntent[P]>
      : GetScalarType<T[P], AggregatePaymentIntent[P]>
  }




  export type PaymentIntentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentIntentWhereInput
    orderBy?: PaymentIntentOrderByWithAggregationInput | PaymentIntentOrderByWithAggregationInput[]
    by: PaymentIntentScalarFieldEnum[] | PaymentIntentScalarFieldEnum
    having?: PaymentIntentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentIntentCountAggregateInputType | true
    _avg?: PaymentIntentAvgAggregateInputType
    _sum?: PaymentIntentSumAggregateInputType
    _min?: PaymentIntentMinAggregateInputType
    _max?: PaymentIntentMaxAggregateInputType
  }

  export type PaymentIntentGroupByOutputType = {
    id: string
    propertyId: string
    bookingId: string
    amountMinor: number
    currency: $Enums.Currency
    method: $Enums.PaymentMethod
    provider: $Enums.PaymentProvider
    status: $Enums.PaymentStatus
    providerIntentRef: string | null
    providerCustomerRef: string | null
    idempotencyKey: string | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentIntentCountAggregateOutputType | null
    _avg: PaymentIntentAvgAggregateOutputType | null
    _sum: PaymentIntentSumAggregateOutputType | null
    _min: PaymentIntentMinAggregateOutputType | null
    _max: PaymentIntentMaxAggregateOutputType | null
  }

  type GetPaymentIntentGroupByPayload<T extends PaymentIntentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentIntentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentIntentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentIntentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentIntentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentIntentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    amountMinor?: boolean
    currency?: boolean
    method?: boolean
    provider?: boolean
    status?: boolean
    providerIntentRef?: boolean
    providerCustomerRef?: boolean
    idempotencyKey?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    transactions?: boolean | PaymentIntent$transactionsArgs<ExtArgs>
    providerEvents?: boolean | PaymentIntent$providerEventsArgs<ExtArgs>
    _count?: boolean | PaymentIntentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentIntent"]>

  export type PaymentIntentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    amountMinor?: boolean
    currency?: boolean
    method?: boolean
    provider?: boolean
    status?: boolean
    providerIntentRef?: boolean
    providerCustomerRef?: boolean
    idempotencyKey?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentIntent"]>

  export type PaymentIntentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    amountMinor?: boolean
    currency?: boolean
    method?: boolean
    provider?: boolean
    status?: boolean
    providerIntentRef?: boolean
    providerCustomerRef?: boolean
    idempotencyKey?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentIntent"]>

  export type PaymentIntentSelectScalar = {
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    amountMinor?: boolean
    currency?: boolean
    method?: boolean
    provider?: boolean
    status?: boolean
    providerIntentRef?: boolean
    providerCustomerRef?: boolean
    idempotencyKey?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentIntentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "propertyId" | "bookingId" | "amountMinor" | "currency" | "method" | "provider" | "status" | "providerIntentRef" | "providerCustomerRef" | "idempotencyKey" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["paymentIntent"]>
  export type PaymentIntentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    transactions?: boolean | PaymentIntent$transactionsArgs<ExtArgs>
    providerEvents?: boolean | PaymentIntent$providerEventsArgs<ExtArgs>
    _count?: boolean | PaymentIntentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PaymentIntentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type PaymentIntentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }

  export type $PaymentIntentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentIntent"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
      booking: Prisma.$BookingPayload<ExtArgs>
      transactions: Prisma.$PaymentTransactionPayload<ExtArgs>[]
      providerEvents: Prisma.$ProviderEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      bookingId: string
      amountMinor: number
      currency: $Enums.Currency
      method: $Enums.PaymentMethod
      provider: $Enums.PaymentProvider
      status: $Enums.PaymentStatus
      providerIntentRef: string | null
      providerCustomerRef: string | null
      idempotencyKey: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["paymentIntent"]>
    composites: {}
  }

  type PaymentIntentGetPayload<S extends boolean | null | undefined | PaymentIntentDefaultArgs> = $Result.GetResult<Prisma.$PaymentIntentPayload, S>

  type PaymentIntentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentIntentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentIntentCountAggregateInputType | true
    }

  export interface PaymentIntentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentIntent'], meta: { name: 'PaymentIntent' } }
    /**
     * Find zero or one PaymentIntent that matches the filter.
     * @param {PaymentIntentFindUniqueArgs} args - Arguments to find a PaymentIntent
     * @example
     * // Get one PaymentIntent
     * const paymentIntent = await prisma.paymentIntent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentIntentFindUniqueArgs>(args: SelectSubset<T, PaymentIntentFindUniqueArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PaymentIntent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentIntentFindUniqueOrThrowArgs} args - Arguments to find a PaymentIntent
     * @example
     * // Get one PaymentIntent
     * const paymentIntent = await prisma.paymentIntent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentIntentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentIntentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentIntent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentIntentFindFirstArgs} args - Arguments to find a PaymentIntent
     * @example
     * // Get one PaymentIntent
     * const paymentIntent = await prisma.paymentIntent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentIntentFindFirstArgs>(args?: SelectSubset<T, PaymentIntentFindFirstArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentIntent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentIntentFindFirstOrThrowArgs} args - Arguments to find a PaymentIntent
     * @example
     * // Get one PaymentIntent
     * const paymentIntent = await prisma.paymentIntent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentIntentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentIntentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PaymentIntents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentIntentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentIntents
     * const paymentIntents = await prisma.paymentIntent.findMany()
     * 
     * // Get first 10 PaymentIntents
     * const paymentIntents = await prisma.paymentIntent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentIntentWithIdOnly = await prisma.paymentIntent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentIntentFindManyArgs>(args?: SelectSubset<T, PaymentIntentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PaymentIntent.
     * @param {PaymentIntentCreateArgs} args - Arguments to create a PaymentIntent.
     * @example
     * // Create one PaymentIntent
     * const PaymentIntent = await prisma.paymentIntent.create({
     *   data: {
     *     // ... data to create a PaymentIntent
     *   }
     * })
     * 
     */
    create<T extends PaymentIntentCreateArgs>(args: SelectSubset<T, PaymentIntentCreateArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PaymentIntents.
     * @param {PaymentIntentCreateManyArgs} args - Arguments to create many PaymentIntents.
     * @example
     * // Create many PaymentIntents
     * const paymentIntent = await prisma.paymentIntent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentIntentCreateManyArgs>(args?: SelectSubset<T, PaymentIntentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaymentIntents and returns the data saved in the database.
     * @param {PaymentIntentCreateManyAndReturnArgs} args - Arguments to create many PaymentIntents.
     * @example
     * // Create many PaymentIntents
     * const paymentIntent = await prisma.paymentIntent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaymentIntents and only return the `id`
     * const paymentIntentWithIdOnly = await prisma.paymentIntent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentIntentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentIntentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PaymentIntent.
     * @param {PaymentIntentDeleteArgs} args - Arguments to delete one PaymentIntent.
     * @example
     * // Delete one PaymentIntent
     * const PaymentIntent = await prisma.paymentIntent.delete({
     *   where: {
     *     // ... filter to delete one PaymentIntent
     *   }
     * })
     * 
     */
    delete<T extends PaymentIntentDeleteArgs>(args: SelectSubset<T, PaymentIntentDeleteArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PaymentIntent.
     * @param {PaymentIntentUpdateArgs} args - Arguments to update one PaymentIntent.
     * @example
     * // Update one PaymentIntent
     * const paymentIntent = await prisma.paymentIntent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentIntentUpdateArgs>(args: SelectSubset<T, PaymentIntentUpdateArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PaymentIntents.
     * @param {PaymentIntentDeleteManyArgs} args - Arguments to filter PaymentIntents to delete.
     * @example
     * // Delete a few PaymentIntents
     * const { count } = await prisma.paymentIntent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentIntentDeleteManyArgs>(args?: SelectSubset<T, PaymentIntentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentIntents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentIntentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentIntents
     * const paymentIntent = await prisma.paymentIntent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentIntentUpdateManyArgs>(args: SelectSubset<T, PaymentIntentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentIntents and returns the data updated in the database.
     * @param {PaymentIntentUpdateManyAndReturnArgs} args - Arguments to update many PaymentIntents.
     * @example
     * // Update many PaymentIntents
     * const paymentIntent = await prisma.paymentIntent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PaymentIntents and only return the `id`
     * const paymentIntentWithIdOnly = await prisma.paymentIntent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentIntentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentIntentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PaymentIntent.
     * @param {PaymentIntentUpsertArgs} args - Arguments to update or create a PaymentIntent.
     * @example
     * // Update or create a PaymentIntent
     * const paymentIntent = await prisma.paymentIntent.upsert({
     *   create: {
     *     // ... data to create a PaymentIntent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentIntent we want to update
     *   }
     * })
     */
    upsert<T extends PaymentIntentUpsertArgs>(args: SelectSubset<T, PaymentIntentUpsertArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PaymentIntents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentIntentCountArgs} args - Arguments to filter PaymentIntents to count.
     * @example
     * // Count the number of PaymentIntents
     * const count = await prisma.paymentIntent.count({
     *   where: {
     *     // ... the filter for the PaymentIntents we want to count
     *   }
     * })
    **/
    count<T extends PaymentIntentCountArgs>(
      args?: Subset<T, PaymentIntentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentIntentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentIntent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentIntentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentIntentAggregateArgs>(args: Subset<T, PaymentIntentAggregateArgs>): Prisma.PrismaPromise<GetPaymentIntentAggregateType<T>>

    /**
     * Group by PaymentIntent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentIntentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentIntentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentIntentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentIntentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentIntentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentIntentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentIntent model
   */
  readonly fields: PaymentIntentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentIntent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentIntentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transactions<T extends PaymentIntent$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, PaymentIntent$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    providerEvents<T extends PaymentIntent$providerEventsArgs<ExtArgs> = {}>(args?: Subset<T, PaymentIntent$providerEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PaymentIntent model
   */
  interface PaymentIntentFieldRefs {
    readonly id: FieldRef<"PaymentIntent", 'String'>
    readonly propertyId: FieldRef<"PaymentIntent", 'String'>
    readonly bookingId: FieldRef<"PaymentIntent", 'String'>
    readonly amountMinor: FieldRef<"PaymentIntent", 'Int'>
    readonly currency: FieldRef<"PaymentIntent", 'Currency'>
    readonly method: FieldRef<"PaymentIntent", 'PaymentMethod'>
    readonly provider: FieldRef<"PaymentIntent", 'PaymentProvider'>
    readonly status: FieldRef<"PaymentIntent", 'PaymentStatus'>
    readonly providerIntentRef: FieldRef<"PaymentIntent", 'String'>
    readonly providerCustomerRef: FieldRef<"PaymentIntent", 'String'>
    readonly idempotencyKey: FieldRef<"PaymentIntent", 'String'>
    readonly metadata: FieldRef<"PaymentIntent", 'Json'>
    readonly createdAt: FieldRef<"PaymentIntent", 'DateTime'>
    readonly updatedAt: FieldRef<"PaymentIntent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PaymentIntent findUnique
   */
  export type PaymentIntentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * Filter, which PaymentIntent to fetch.
     */
    where: PaymentIntentWhereUniqueInput
  }

  /**
   * PaymentIntent findUniqueOrThrow
   */
  export type PaymentIntentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * Filter, which PaymentIntent to fetch.
     */
    where: PaymentIntentWhereUniqueInput
  }

  /**
   * PaymentIntent findFirst
   */
  export type PaymentIntentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * Filter, which PaymentIntent to fetch.
     */
    where?: PaymentIntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentIntents to fetch.
     */
    orderBy?: PaymentIntentOrderByWithRelationInput | PaymentIntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentIntents.
     */
    cursor?: PaymentIntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentIntents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentIntents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentIntents.
     */
    distinct?: PaymentIntentScalarFieldEnum | PaymentIntentScalarFieldEnum[]
  }

  /**
   * PaymentIntent findFirstOrThrow
   */
  export type PaymentIntentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * Filter, which PaymentIntent to fetch.
     */
    where?: PaymentIntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentIntents to fetch.
     */
    orderBy?: PaymentIntentOrderByWithRelationInput | PaymentIntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentIntents.
     */
    cursor?: PaymentIntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentIntents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentIntents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentIntents.
     */
    distinct?: PaymentIntentScalarFieldEnum | PaymentIntentScalarFieldEnum[]
  }

  /**
   * PaymentIntent findMany
   */
  export type PaymentIntentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * Filter, which PaymentIntents to fetch.
     */
    where?: PaymentIntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentIntents to fetch.
     */
    orderBy?: PaymentIntentOrderByWithRelationInput | PaymentIntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentIntents.
     */
    cursor?: PaymentIntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentIntents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentIntents.
     */
    skip?: number
    distinct?: PaymentIntentScalarFieldEnum | PaymentIntentScalarFieldEnum[]
  }

  /**
   * PaymentIntent create
   */
  export type PaymentIntentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentIntent.
     */
    data: XOR<PaymentIntentCreateInput, PaymentIntentUncheckedCreateInput>
  }

  /**
   * PaymentIntent createMany
   */
  export type PaymentIntentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentIntents.
     */
    data: PaymentIntentCreateManyInput | PaymentIntentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentIntent createManyAndReturn
   */
  export type PaymentIntentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * The data used to create many PaymentIntents.
     */
    data: PaymentIntentCreateManyInput | PaymentIntentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentIntent update
   */
  export type PaymentIntentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentIntent.
     */
    data: XOR<PaymentIntentUpdateInput, PaymentIntentUncheckedUpdateInput>
    /**
     * Choose, which PaymentIntent to update.
     */
    where: PaymentIntentWhereUniqueInput
  }

  /**
   * PaymentIntent updateMany
   */
  export type PaymentIntentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentIntents.
     */
    data: XOR<PaymentIntentUpdateManyMutationInput, PaymentIntentUncheckedUpdateManyInput>
    /**
     * Filter which PaymentIntents to update
     */
    where?: PaymentIntentWhereInput
    /**
     * Limit how many PaymentIntents to update.
     */
    limit?: number
  }

  /**
   * PaymentIntent updateManyAndReturn
   */
  export type PaymentIntentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * The data used to update PaymentIntents.
     */
    data: XOR<PaymentIntentUpdateManyMutationInput, PaymentIntentUncheckedUpdateManyInput>
    /**
     * Filter which PaymentIntents to update
     */
    where?: PaymentIntentWhereInput
    /**
     * Limit how many PaymentIntents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentIntent upsert
   */
  export type PaymentIntentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentIntent to update in case it exists.
     */
    where: PaymentIntentWhereUniqueInput
    /**
     * In case the PaymentIntent found by the `where` argument doesn't exist, create a new PaymentIntent with this data.
     */
    create: XOR<PaymentIntentCreateInput, PaymentIntentUncheckedCreateInput>
    /**
     * In case the PaymentIntent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentIntentUpdateInput, PaymentIntentUncheckedUpdateInput>
  }

  /**
   * PaymentIntent delete
   */
  export type PaymentIntentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * Filter which PaymentIntent to delete.
     */
    where: PaymentIntentWhereUniqueInput
  }

  /**
   * PaymentIntent deleteMany
   */
  export type PaymentIntentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentIntents to delete
     */
    where?: PaymentIntentWhereInput
    /**
     * Limit how many PaymentIntents to delete.
     */
    limit?: number
  }

  /**
   * PaymentIntent.transactions
   */
  export type PaymentIntent$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    where?: PaymentTransactionWhereInput
    orderBy?: PaymentTransactionOrderByWithRelationInput | PaymentTransactionOrderByWithRelationInput[]
    cursor?: PaymentTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentTransactionScalarFieldEnum | PaymentTransactionScalarFieldEnum[]
  }

  /**
   * PaymentIntent.providerEvents
   */
  export type PaymentIntent$providerEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderEvent
     */
    select?: ProviderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderEvent
     */
    omit?: ProviderEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderEventInclude<ExtArgs> | null
    where?: ProviderEventWhereInput
    orderBy?: ProviderEventOrderByWithRelationInput | ProviderEventOrderByWithRelationInput[]
    cursor?: ProviderEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProviderEventScalarFieldEnum | ProviderEventScalarFieldEnum[]
  }

  /**
   * PaymentIntent without action
   */
  export type PaymentIntentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
  }


  /**
   * Model PaymentTransaction
   */

  export type AggregatePaymentTransaction = {
    _count: PaymentTransactionCountAggregateOutputType | null
    _avg: PaymentTransactionAvgAggregateOutputType | null
    _sum: PaymentTransactionSumAggregateOutputType | null
    _min: PaymentTransactionMinAggregateOutputType | null
    _max: PaymentTransactionMaxAggregateOutputType | null
  }

  export type PaymentTransactionAvgAggregateOutputType = {
    amountMinor: number | null
    sequence: number | null
  }

  export type PaymentTransactionSumAggregateOutputType = {
    amountMinor: number | null
    sequence: number | null
  }

  export type PaymentTransactionMinAggregateOutputType = {
    id: string | null
    paymentIntentId: string | null
    status: $Enums.PaymentStatus | null
    amountMinor: number | null
    currency: $Enums.Currency | null
    providerTxnRef: string | null
    externalReference: string | null
    message: string | null
    sequence: number | null
    occurredAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentTransactionMaxAggregateOutputType = {
    id: string | null
    paymentIntentId: string | null
    status: $Enums.PaymentStatus | null
    amountMinor: number | null
    currency: $Enums.Currency | null
    providerTxnRef: string | null
    externalReference: string | null
    message: string | null
    sequence: number | null
    occurredAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentTransactionCountAggregateOutputType = {
    id: number
    paymentIntentId: number
    status: number
    amountMinor: number
    currency: number
    providerTxnRef: number
    externalReference: number
    message: number
    rawPayload: number
    sequence: number
    occurredAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentTransactionAvgAggregateInputType = {
    amountMinor?: true
    sequence?: true
  }

  export type PaymentTransactionSumAggregateInputType = {
    amountMinor?: true
    sequence?: true
  }

  export type PaymentTransactionMinAggregateInputType = {
    id?: true
    paymentIntentId?: true
    status?: true
    amountMinor?: true
    currency?: true
    providerTxnRef?: true
    externalReference?: true
    message?: true
    sequence?: true
    occurredAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentTransactionMaxAggregateInputType = {
    id?: true
    paymentIntentId?: true
    status?: true
    amountMinor?: true
    currency?: true
    providerTxnRef?: true
    externalReference?: true
    message?: true
    sequence?: true
    occurredAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentTransactionCountAggregateInputType = {
    id?: true
    paymentIntentId?: true
    status?: true
    amountMinor?: true
    currency?: true
    providerTxnRef?: true
    externalReference?: true
    message?: true
    rawPayload?: true
    sequence?: true
    occurredAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentTransaction to aggregate.
     */
    where?: PaymentTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentTransactions to fetch.
     */
    orderBy?: PaymentTransactionOrderByWithRelationInput | PaymentTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentTransactions
    **/
    _count?: true | PaymentTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentTransactionMaxAggregateInputType
  }

  export type GetPaymentTransactionAggregateType<T extends PaymentTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentTransaction[P]>
      : GetScalarType<T[P], AggregatePaymentTransaction[P]>
  }




  export type PaymentTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentTransactionWhereInput
    orderBy?: PaymentTransactionOrderByWithAggregationInput | PaymentTransactionOrderByWithAggregationInput[]
    by: PaymentTransactionScalarFieldEnum[] | PaymentTransactionScalarFieldEnum
    having?: PaymentTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentTransactionCountAggregateInputType | true
    _avg?: PaymentTransactionAvgAggregateInputType
    _sum?: PaymentTransactionSumAggregateInputType
    _min?: PaymentTransactionMinAggregateInputType
    _max?: PaymentTransactionMaxAggregateInputType
  }

  export type PaymentTransactionGroupByOutputType = {
    id: string
    paymentIntentId: string
    status: $Enums.PaymentStatus
    amountMinor: number
    currency: $Enums.Currency
    providerTxnRef: string | null
    externalReference: string | null
    message: string | null
    rawPayload: JsonValue | null
    sequence: number
    occurredAt: Date
    createdAt: Date
    updatedAt: Date
    _count: PaymentTransactionCountAggregateOutputType | null
    _avg: PaymentTransactionAvgAggregateOutputType | null
    _sum: PaymentTransactionSumAggregateOutputType | null
    _min: PaymentTransactionMinAggregateOutputType | null
    _max: PaymentTransactionMaxAggregateOutputType | null
  }

  type GetPaymentTransactionGroupByPayload<T extends PaymentTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentTransactionGroupByOutputType[P]>
        }
      >
    >


  export type PaymentTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentIntentId?: boolean
    status?: boolean
    amountMinor?: boolean
    currency?: boolean
    providerTxnRef?: boolean
    externalReference?: boolean
    message?: boolean
    rawPayload?: boolean
    sequence?: boolean
    occurredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paymentIntent?: boolean | PaymentIntentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentTransaction"]>

  export type PaymentTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentIntentId?: boolean
    status?: boolean
    amountMinor?: boolean
    currency?: boolean
    providerTxnRef?: boolean
    externalReference?: boolean
    message?: boolean
    rawPayload?: boolean
    sequence?: boolean
    occurredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paymentIntent?: boolean | PaymentIntentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentTransaction"]>

  export type PaymentTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentIntentId?: boolean
    status?: boolean
    amountMinor?: boolean
    currency?: boolean
    providerTxnRef?: boolean
    externalReference?: boolean
    message?: boolean
    rawPayload?: boolean
    sequence?: boolean
    occurredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paymentIntent?: boolean | PaymentIntentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentTransaction"]>

  export type PaymentTransactionSelectScalar = {
    id?: boolean
    paymentIntentId?: boolean
    status?: boolean
    amountMinor?: boolean
    currency?: boolean
    providerTxnRef?: boolean
    externalReference?: boolean
    message?: boolean
    rawPayload?: boolean
    sequence?: boolean
    occurredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "paymentIntentId" | "status" | "amountMinor" | "currency" | "providerTxnRef" | "externalReference" | "message" | "rawPayload" | "sequence" | "occurredAt" | "createdAt" | "updatedAt", ExtArgs["result"]["paymentTransaction"]>
  export type PaymentTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentIntent?: boolean | PaymentIntentDefaultArgs<ExtArgs>
  }
  export type PaymentTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentIntent?: boolean | PaymentIntentDefaultArgs<ExtArgs>
  }
  export type PaymentTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentIntent?: boolean | PaymentIntentDefaultArgs<ExtArgs>
  }

  export type $PaymentTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentTransaction"
    objects: {
      paymentIntent: Prisma.$PaymentIntentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      paymentIntentId: string
      status: $Enums.PaymentStatus
      amountMinor: number
      currency: $Enums.Currency
      providerTxnRef: string | null
      externalReference: string | null
      message: string | null
      rawPayload: Prisma.JsonValue | null
      sequence: number
      occurredAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["paymentTransaction"]>
    composites: {}
  }

  type PaymentTransactionGetPayload<S extends boolean | null | undefined | PaymentTransactionDefaultArgs> = $Result.GetResult<Prisma.$PaymentTransactionPayload, S>

  type PaymentTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentTransactionCountAggregateInputType | true
    }

  export interface PaymentTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentTransaction'], meta: { name: 'PaymentTransaction' } }
    /**
     * Find zero or one PaymentTransaction that matches the filter.
     * @param {PaymentTransactionFindUniqueArgs} args - Arguments to find a PaymentTransaction
     * @example
     * // Get one PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentTransactionFindUniqueArgs>(args: SelectSubset<T, PaymentTransactionFindUniqueArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PaymentTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentTransactionFindUniqueOrThrowArgs} args - Arguments to find a PaymentTransaction
     * @example
     * // Get one PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionFindFirstArgs} args - Arguments to find a PaymentTransaction
     * @example
     * // Get one PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentTransactionFindFirstArgs>(args?: SelectSubset<T, PaymentTransactionFindFirstArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionFindFirstOrThrowArgs} args - Arguments to find a PaymentTransaction
     * @example
     * // Get one PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PaymentTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentTransactions
     * const paymentTransactions = await prisma.paymentTransaction.findMany()
     * 
     * // Get first 10 PaymentTransactions
     * const paymentTransactions = await prisma.paymentTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentTransactionWithIdOnly = await prisma.paymentTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentTransactionFindManyArgs>(args?: SelectSubset<T, PaymentTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PaymentTransaction.
     * @param {PaymentTransactionCreateArgs} args - Arguments to create a PaymentTransaction.
     * @example
     * // Create one PaymentTransaction
     * const PaymentTransaction = await prisma.paymentTransaction.create({
     *   data: {
     *     // ... data to create a PaymentTransaction
     *   }
     * })
     * 
     */
    create<T extends PaymentTransactionCreateArgs>(args: SelectSubset<T, PaymentTransactionCreateArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PaymentTransactions.
     * @param {PaymentTransactionCreateManyArgs} args - Arguments to create many PaymentTransactions.
     * @example
     * // Create many PaymentTransactions
     * const paymentTransaction = await prisma.paymentTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentTransactionCreateManyArgs>(args?: SelectSubset<T, PaymentTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaymentTransactions and returns the data saved in the database.
     * @param {PaymentTransactionCreateManyAndReturnArgs} args - Arguments to create many PaymentTransactions.
     * @example
     * // Create many PaymentTransactions
     * const paymentTransaction = await prisma.paymentTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaymentTransactions and only return the `id`
     * const paymentTransactionWithIdOnly = await prisma.paymentTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PaymentTransaction.
     * @param {PaymentTransactionDeleteArgs} args - Arguments to delete one PaymentTransaction.
     * @example
     * // Delete one PaymentTransaction
     * const PaymentTransaction = await prisma.paymentTransaction.delete({
     *   where: {
     *     // ... filter to delete one PaymentTransaction
     *   }
     * })
     * 
     */
    delete<T extends PaymentTransactionDeleteArgs>(args: SelectSubset<T, PaymentTransactionDeleteArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PaymentTransaction.
     * @param {PaymentTransactionUpdateArgs} args - Arguments to update one PaymentTransaction.
     * @example
     * // Update one PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentTransactionUpdateArgs>(args: SelectSubset<T, PaymentTransactionUpdateArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PaymentTransactions.
     * @param {PaymentTransactionDeleteManyArgs} args - Arguments to filter PaymentTransactions to delete.
     * @example
     * // Delete a few PaymentTransactions
     * const { count } = await prisma.paymentTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentTransactionDeleteManyArgs>(args?: SelectSubset<T, PaymentTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentTransactions
     * const paymentTransaction = await prisma.paymentTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentTransactionUpdateManyArgs>(args: SelectSubset<T, PaymentTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentTransactions and returns the data updated in the database.
     * @param {PaymentTransactionUpdateManyAndReturnArgs} args - Arguments to update many PaymentTransactions.
     * @example
     * // Update many PaymentTransactions
     * const paymentTransaction = await prisma.paymentTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PaymentTransactions and only return the `id`
     * const paymentTransactionWithIdOnly = await prisma.paymentTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PaymentTransaction.
     * @param {PaymentTransactionUpsertArgs} args - Arguments to update or create a PaymentTransaction.
     * @example
     * // Update or create a PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.upsert({
     *   create: {
     *     // ... data to create a PaymentTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentTransaction we want to update
     *   }
     * })
     */
    upsert<T extends PaymentTransactionUpsertArgs>(args: SelectSubset<T, PaymentTransactionUpsertArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PaymentTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionCountArgs} args - Arguments to filter PaymentTransactions to count.
     * @example
     * // Count the number of PaymentTransactions
     * const count = await prisma.paymentTransaction.count({
     *   where: {
     *     // ... the filter for the PaymentTransactions we want to count
     *   }
     * })
    **/
    count<T extends PaymentTransactionCountArgs>(
      args?: Subset<T, PaymentTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentTransactionAggregateArgs>(args: Subset<T, PaymentTransactionAggregateArgs>): Prisma.PrismaPromise<GetPaymentTransactionAggregateType<T>>

    /**
     * Group by PaymentTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentTransactionGroupByArgs['orderBy'] }
        : { orderBy?: PaymentTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentTransaction model
   */
  readonly fields: PaymentTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    paymentIntent<T extends PaymentIntentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PaymentIntentDefaultArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PaymentTransaction model
   */
  interface PaymentTransactionFieldRefs {
    readonly id: FieldRef<"PaymentTransaction", 'String'>
    readonly paymentIntentId: FieldRef<"PaymentTransaction", 'String'>
    readonly status: FieldRef<"PaymentTransaction", 'PaymentStatus'>
    readonly amountMinor: FieldRef<"PaymentTransaction", 'Int'>
    readonly currency: FieldRef<"PaymentTransaction", 'Currency'>
    readonly providerTxnRef: FieldRef<"PaymentTransaction", 'String'>
    readonly externalReference: FieldRef<"PaymentTransaction", 'String'>
    readonly message: FieldRef<"PaymentTransaction", 'String'>
    readonly rawPayload: FieldRef<"PaymentTransaction", 'Json'>
    readonly sequence: FieldRef<"PaymentTransaction", 'Int'>
    readonly occurredAt: FieldRef<"PaymentTransaction", 'DateTime'>
    readonly createdAt: FieldRef<"PaymentTransaction", 'DateTime'>
    readonly updatedAt: FieldRef<"PaymentTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PaymentTransaction findUnique
   */
  export type PaymentTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentTransaction to fetch.
     */
    where: PaymentTransactionWhereUniqueInput
  }

  /**
   * PaymentTransaction findUniqueOrThrow
   */
  export type PaymentTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentTransaction to fetch.
     */
    where: PaymentTransactionWhereUniqueInput
  }

  /**
   * PaymentTransaction findFirst
   */
  export type PaymentTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentTransaction to fetch.
     */
    where?: PaymentTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentTransactions to fetch.
     */
    orderBy?: PaymentTransactionOrderByWithRelationInput | PaymentTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentTransactions.
     */
    cursor?: PaymentTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentTransactions.
     */
    distinct?: PaymentTransactionScalarFieldEnum | PaymentTransactionScalarFieldEnum[]
  }

  /**
   * PaymentTransaction findFirstOrThrow
   */
  export type PaymentTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentTransaction to fetch.
     */
    where?: PaymentTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentTransactions to fetch.
     */
    orderBy?: PaymentTransactionOrderByWithRelationInput | PaymentTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentTransactions.
     */
    cursor?: PaymentTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentTransactions.
     */
    distinct?: PaymentTransactionScalarFieldEnum | PaymentTransactionScalarFieldEnum[]
  }

  /**
   * PaymentTransaction findMany
   */
  export type PaymentTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentTransactions to fetch.
     */
    where?: PaymentTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentTransactions to fetch.
     */
    orderBy?: PaymentTransactionOrderByWithRelationInput | PaymentTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentTransactions.
     */
    cursor?: PaymentTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentTransactions.
     */
    skip?: number
    distinct?: PaymentTransactionScalarFieldEnum | PaymentTransactionScalarFieldEnum[]
  }

  /**
   * PaymentTransaction create
   */
  export type PaymentTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentTransaction.
     */
    data: XOR<PaymentTransactionCreateInput, PaymentTransactionUncheckedCreateInput>
  }

  /**
   * PaymentTransaction createMany
   */
  export type PaymentTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentTransactions.
     */
    data: PaymentTransactionCreateManyInput | PaymentTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentTransaction createManyAndReturn
   */
  export type PaymentTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many PaymentTransactions.
     */
    data: PaymentTransactionCreateManyInput | PaymentTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentTransaction update
   */
  export type PaymentTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentTransaction.
     */
    data: XOR<PaymentTransactionUpdateInput, PaymentTransactionUncheckedUpdateInput>
    /**
     * Choose, which PaymentTransaction to update.
     */
    where: PaymentTransactionWhereUniqueInput
  }

  /**
   * PaymentTransaction updateMany
   */
  export type PaymentTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentTransactions.
     */
    data: XOR<PaymentTransactionUpdateManyMutationInput, PaymentTransactionUncheckedUpdateManyInput>
    /**
     * Filter which PaymentTransactions to update
     */
    where?: PaymentTransactionWhereInput
    /**
     * Limit how many PaymentTransactions to update.
     */
    limit?: number
  }

  /**
   * PaymentTransaction updateManyAndReturn
   */
  export type PaymentTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * The data used to update PaymentTransactions.
     */
    data: XOR<PaymentTransactionUpdateManyMutationInput, PaymentTransactionUncheckedUpdateManyInput>
    /**
     * Filter which PaymentTransactions to update
     */
    where?: PaymentTransactionWhereInput
    /**
     * Limit how many PaymentTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentTransaction upsert
   */
  export type PaymentTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentTransaction to update in case it exists.
     */
    where: PaymentTransactionWhereUniqueInput
    /**
     * In case the PaymentTransaction found by the `where` argument doesn't exist, create a new PaymentTransaction with this data.
     */
    create: XOR<PaymentTransactionCreateInput, PaymentTransactionUncheckedCreateInput>
    /**
     * In case the PaymentTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentTransactionUpdateInput, PaymentTransactionUncheckedUpdateInput>
  }

  /**
   * PaymentTransaction delete
   */
  export type PaymentTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter which PaymentTransaction to delete.
     */
    where: PaymentTransactionWhereUniqueInput
  }

  /**
   * PaymentTransaction deleteMany
   */
  export type PaymentTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentTransactions to delete
     */
    where?: PaymentTransactionWhereInput
    /**
     * Limit how many PaymentTransactions to delete.
     */
    limit?: number
  }

  /**
   * PaymentTransaction without action
   */
  export type PaymentTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
  }


  /**
   * Model ProviderEvent
   */

  export type AggregateProviderEvent = {
    _count: ProviderEventCountAggregateOutputType | null
    _min: ProviderEventMinAggregateOutputType | null
    _max: ProviderEventMaxAggregateOutputType | null
  }

  export type ProviderEventMinAggregateOutputType = {
    id: string | null
    provider: string | null
    eventId: string | null
    providerReference: string | null
    paymentIntentId: string | null
    status: string | null
    signatureValid: boolean | null
    occurredAt: Date | null
    processedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProviderEventMaxAggregateOutputType = {
    id: string | null
    provider: string | null
    eventId: string | null
    providerReference: string | null
    paymentIntentId: string | null
    status: string | null
    signatureValid: boolean | null
    occurredAt: Date | null
    processedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProviderEventCountAggregateOutputType = {
    id: number
    provider: number
    eventId: number
    providerReference: number
    paymentIntentId: number
    status: number
    signatureValid: number
    rawPayload: number
    occurredAt: number
    processedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProviderEventMinAggregateInputType = {
    id?: true
    provider?: true
    eventId?: true
    providerReference?: true
    paymentIntentId?: true
    status?: true
    signatureValid?: true
    occurredAt?: true
    processedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProviderEventMaxAggregateInputType = {
    id?: true
    provider?: true
    eventId?: true
    providerReference?: true
    paymentIntentId?: true
    status?: true
    signatureValid?: true
    occurredAt?: true
    processedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProviderEventCountAggregateInputType = {
    id?: true
    provider?: true
    eventId?: true
    providerReference?: true
    paymentIntentId?: true
    status?: true
    signatureValid?: true
    rawPayload?: true
    occurredAt?: true
    processedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProviderEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProviderEvent to aggregate.
     */
    where?: ProviderEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProviderEvents to fetch.
     */
    orderBy?: ProviderEventOrderByWithRelationInput | ProviderEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProviderEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProviderEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProviderEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProviderEvents
    **/
    _count?: true | ProviderEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProviderEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProviderEventMaxAggregateInputType
  }

  export type GetProviderEventAggregateType<T extends ProviderEventAggregateArgs> = {
        [P in keyof T & keyof AggregateProviderEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProviderEvent[P]>
      : GetScalarType<T[P], AggregateProviderEvent[P]>
  }




  export type ProviderEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProviderEventWhereInput
    orderBy?: ProviderEventOrderByWithAggregationInput | ProviderEventOrderByWithAggregationInput[]
    by: ProviderEventScalarFieldEnum[] | ProviderEventScalarFieldEnum
    having?: ProviderEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProviderEventCountAggregateInputType | true
    _min?: ProviderEventMinAggregateInputType
    _max?: ProviderEventMaxAggregateInputType
  }

  export type ProviderEventGroupByOutputType = {
    id: string
    provider: string
    eventId: string
    providerReference: string | null
    paymentIntentId: string | null
    status: string | null
    signatureValid: boolean
    rawPayload: JsonValue
    occurredAt: Date | null
    processedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ProviderEventCountAggregateOutputType | null
    _min: ProviderEventMinAggregateOutputType | null
    _max: ProviderEventMaxAggregateOutputType | null
  }

  type GetProviderEventGroupByPayload<T extends ProviderEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProviderEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProviderEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProviderEventGroupByOutputType[P]>
            : GetScalarType<T[P], ProviderEventGroupByOutputType[P]>
        }
      >
    >


  export type ProviderEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    eventId?: boolean
    providerReference?: boolean
    paymentIntentId?: boolean
    status?: boolean
    signatureValid?: boolean
    rawPayload?: boolean
    occurredAt?: boolean
    processedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paymentIntent?: boolean | ProviderEvent$paymentIntentArgs<ExtArgs>
  }, ExtArgs["result"]["providerEvent"]>

  export type ProviderEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    eventId?: boolean
    providerReference?: boolean
    paymentIntentId?: boolean
    status?: boolean
    signatureValid?: boolean
    rawPayload?: boolean
    occurredAt?: boolean
    processedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paymentIntent?: boolean | ProviderEvent$paymentIntentArgs<ExtArgs>
  }, ExtArgs["result"]["providerEvent"]>

  export type ProviderEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    eventId?: boolean
    providerReference?: boolean
    paymentIntentId?: boolean
    status?: boolean
    signatureValid?: boolean
    rawPayload?: boolean
    occurredAt?: boolean
    processedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paymentIntent?: boolean | ProviderEvent$paymentIntentArgs<ExtArgs>
  }, ExtArgs["result"]["providerEvent"]>

  export type ProviderEventSelectScalar = {
    id?: boolean
    provider?: boolean
    eventId?: boolean
    providerReference?: boolean
    paymentIntentId?: boolean
    status?: boolean
    signatureValid?: boolean
    rawPayload?: boolean
    occurredAt?: boolean
    processedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProviderEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "provider" | "eventId" | "providerReference" | "paymentIntentId" | "status" | "signatureValid" | "rawPayload" | "occurredAt" | "processedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["providerEvent"]>
  export type ProviderEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentIntent?: boolean | ProviderEvent$paymentIntentArgs<ExtArgs>
  }
  export type ProviderEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentIntent?: boolean | ProviderEvent$paymentIntentArgs<ExtArgs>
  }
  export type ProviderEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentIntent?: boolean | ProviderEvent$paymentIntentArgs<ExtArgs>
  }

  export type $ProviderEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProviderEvent"
    objects: {
      paymentIntent: Prisma.$PaymentIntentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: string
      eventId: string
      providerReference: string | null
      paymentIntentId: string | null
      status: string | null
      signatureValid: boolean
      rawPayload: Prisma.JsonValue
      occurredAt: Date | null
      processedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["providerEvent"]>
    composites: {}
  }

  type ProviderEventGetPayload<S extends boolean | null | undefined | ProviderEventDefaultArgs> = $Result.GetResult<Prisma.$ProviderEventPayload, S>

  type ProviderEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProviderEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProviderEventCountAggregateInputType | true
    }

  export interface ProviderEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProviderEvent'], meta: { name: 'ProviderEvent' } }
    /**
     * Find zero or one ProviderEvent that matches the filter.
     * @param {ProviderEventFindUniqueArgs} args - Arguments to find a ProviderEvent
     * @example
     * // Get one ProviderEvent
     * const providerEvent = await prisma.providerEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProviderEventFindUniqueArgs>(args: SelectSubset<T, ProviderEventFindUniqueArgs<ExtArgs>>): Prisma__ProviderEventClient<$Result.GetResult<Prisma.$ProviderEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProviderEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProviderEventFindUniqueOrThrowArgs} args - Arguments to find a ProviderEvent
     * @example
     * // Get one ProviderEvent
     * const providerEvent = await prisma.providerEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProviderEventFindUniqueOrThrowArgs>(args: SelectSubset<T, ProviderEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProviderEventClient<$Result.GetResult<Prisma.$ProviderEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProviderEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderEventFindFirstArgs} args - Arguments to find a ProviderEvent
     * @example
     * // Get one ProviderEvent
     * const providerEvent = await prisma.providerEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProviderEventFindFirstArgs>(args?: SelectSubset<T, ProviderEventFindFirstArgs<ExtArgs>>): Prisma__ProviderEventClient<$Result.GetResult<Prisma.$ProviderEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProviderEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderEventFindFirstOrThrowArgs} args - Arguments to find a ProviderEvent
     * @example
     * // Get one ProviderEvent
     * const providerEvent = await prisma.providerEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProviderEventFindFirstOrThrowArgs>(args?: SelectSubset<T, ProviderEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProviderEventClient<$Result.GetResult<Prisma.$ProviderEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProviderEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProviderEvents
     * const providerEvents = await prisma.providerEvent.findMany()
     * 
     * // Get first 10 ProviderEvents
     * const providerEvents = await prisma.providerEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const providerEventWithIdOnly = await prisma.providerEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProviderEventFindManyArgs>(args?: SelectSubset<T, ProviderEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProviderEvent.
     * @param {ProviderEventCreateArgs} args - Arguments to create a ProviderEvent.
     * @example
     * // Create one ProviderEvent
     * const ProviderEvent = await prisma.providerEvent.create({
     *   data: {
     *     // ... data to create a ProviderEvent
     *   }
     * })
     * 
     */
    create<T extends ProviderEventCreateArgs>(args: SelectSubset<T, ProviderEventCreateArgs<ExtArgs>>): Prisma__ProviderEventClient<$Result.GetResult<Prisma.$ProviderEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProviderEvents.
     * @param {ProviderEventCreateManyArgs} args - Arguments to create many ProviderEvents.
     * @example
     * // Create many ProviderEvents
     * const providerEvent = await prisma.providerEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProviderEventCreateManyArgs>(args?: SelectSubset<T, ProviderEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProviderEvents and returns the data saved in the database.
     * @param {ProviderEventCreateManyAndReturnArgs} args - Arguments to create many ProviderEvents.
     * @example
     * // Create many ProviderEvents
     * const providerEvent = await prisma.providerEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProviderEvents and only return the `id`
     * const providerEventWithIdOnly = await prisma.providerEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProviderEventCreateManyAndReturnArgs>(args?: SelectSubset<T, ProviderEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProviderEvent.
     * @param {ProviderEventDeleteArgs} args - Arguments to delete one ProviderEvent.
     * @example
     * // Delete one ProviderEvent
     * const ProviderEvent = await prisma.providerEvent.delete({
     *   where: {
     *     // ... filter to delete one ProviderEvent
     *   }
     * })
     * 
     */
    delete<T extends ProviderEventDeleteArgs>(args: SelectSubset<T, ProviderEventDeleteArgs<ExtArgs>>): Prisma__ProviderEventClient<$Result.GetResult<Prisma.$ProviderEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProviderEvent.
     * @param {ProviderEventUpdateArgs} args - Arguments to update one ProviderEvent.
     * @example
     * // Update one ProviderEvent
     * const providerEvent = await prisma.providerEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProviderEventUpdateArgs>(args: SelectSubset<T, ProviderEventUpdateArgs<ExtArgs>>): Prisma__ProviderEventClient<$Result.GetResult<Prisma.$ProviderEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProviderEvents.
     * @param {ProviderEventDeleteManyArgs} args - Arguments to filter ProviderEvents to delete.
     * @example
     * // Delete a few ProviderEvents
     * const { count } = await prisma.providerEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProviderEventDeleteManyArgs>(args?: SelectSubset<T, ProviderEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProviderEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProviderEvents
     * const providerEvent = await prisma.providerEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProviderEventUpdateManyArgs>(args: SelectSubset<T, ProviderEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProviderEvents and returns the data updated in the database.
     * @param {ProviderEventUpdateManyAndReturnArgs} args - Arguments to update many ProviderEvents.
     * @example
     * // Update many ProviderEvents
     * const providerEvent = await prisma.providerEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProviderEvents and only return the `id`
     * const providerEventWithIdOnly = await prisma.providerEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProviderEventUpdateManyAndReturnArgs>(args: SelectSubset<T, ProviderEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProviderEvent.
     * @param {ProviderEventUpsertArgs} args - Arguments to update or create a ProviderEvent.
     * @example
     * // Update or create a ProviderEvent
     * const providerEvent = await prisma.providerEvent.upsert({
     *   create: {
     *     // ... data to create a ProviderEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProviderEvent we want to update
     *   }
     * })
     */
    upsert<T extends ProviderEventUpsertArgs>(args: SelectSubset<T, ProviderEventUpsertArgs<ExtArgs>>): Prisma__ProviderEventClient<$Result.GetResult<Prisma.$ProviderEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProviderEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderEventCountArgs} args - Arguments to filter ProviderEvents to count.
     * @example
     * // Count the number of ProviderEvents
     * const count = await prisma.providerEvent.count({
     *   where: {
     *     // ... the filter for the ProviderEvents we want to count
     *   }
     * })
    **/
    count<T extends ProviderEventCountArgs>(
      args?: Subset<T, ProviderEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProviderEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProviderEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProviderEventAggregateArgs>(args: Subset<T, ProviderEventAggregateArgs>): Prisma.PrismaPromise<GetProviderEventAggregateType<T>>

    /**
     * Group by ProviderEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProviderEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProviderEventGroupByArgs['orderBy'] }
        : { orderBy?: ProviderEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProviderEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProviderEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProviderEvent model
   */
  readonly fields: ProviderEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProviderEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProviderEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    paymentIntent<T extends ProviderEvent$paymentIntentArgs<ExtArgs> = {}>(args?: Subset<T, ProviderEvent$paymentIntentArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProviderEvent model
   */
  interface ProviderEventFieldRefs {
    readonly id: FieldRef<"ProviderEvent", 'String'>
    readonly provider: FieldRef<"ProviderEvent", 'String'>
    readonly eventId: FieldRef<"ProviderEvent", 'String'>
    readonly providerReference: FieldRef<"ProviderEvent", 'String'>
    readonly paymentIntentId: FieldRef<"ProviderEvent", 'String'>
    readonly status: FieldRef<"ProviderEvent", 'String'>
    readonly signatureValid: FieldRef<"ProviderEvent", 'Boolean'>
    readonly rawPayload: FieldRef<"ProviderEvent", 'Json'>
    readonly occurredAt: FieldRef<"ProviderEvent", 'DateTime'>
    readonly processedAt: FieldRef<"ProviderEvent", 'DateTime'>
    readonly createdAt: FieldRef<"ProviderEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"ProviderEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProviderEvent findUnique
   */
  export type ProviderEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderEvent
     */
    select?: ProviderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderEvent
     */
    omit?: ProviderEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderEventInclude<ExtArgs> | null
    /**
     * Filter, which ProviderEvent to fetch.
     */
    where: ProviderEventWhereUniqueInput
  }

  /**
   * ProviderEvent findUniqueOrThrow
   */
  export type ProviderEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderEvent
     */
    select?: ProviderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderEvent
     */
    omit?: ProviderEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderEventInclude<ExtArgs> | null
    /**
     * Filter, which ProviderEvent to fetch.
     */
    where: ProviderEventWhereUniqueInput
  }

  /**
   * ProviderEvent findFirst
   */
  export type ProviderEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderEvent
     */
    select?: ProviderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderEvent
     */
    omit?: ProviderEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderEventInclude<ExtArgs> | null
    /**
     * Filter, which ProviderEvent to fetch.
     */
    where?: ProviderEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProviderEvents to fetch.
     */
    orderBy?: ProviderEventOrderByWithRelationInput | ProviderEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProviderEvents.
     */
    cursor?: ProviderEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProviderEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProviderEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProviderEvents.
     */
    distinct?: ProviderEventScalarFieldEnum | ProviderEventScalarFieldEnum[]
  }

  /**
   * ProviderEvent findFirstOrThrow
   */
  export type ProviderEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderEvent
     */
    select?: ProviderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderEvent
     */
    omit?: ProviderEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderEventInclude<ExtArgs> | null
    /**
     * Filter, which ProviderEvent to fetch.
     */
    where?: ProviderEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProviderEvents to fetch.
     */
    orderBy?: ProviderEventOrderByWithRelationInput | ProviderEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProviderEvents.
     */
    cursor?: ProviderEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProviderEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProviderEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProviderEvents.
     */
    distinct?: ProviderEventScalarFieldEnum | ProviderEventScalarFieldEnum[]
  }

  /**
   * ProviderEvent findMany
   */
  export type ProviderEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderEvent
     */
    select?: ProviderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderEvent
     */
    omit?: ProviderEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderEventInclude<ExtArgs> | null
    /**
     * Filter, which ProviderEvents to fetch.
     */
    where?: ProviderEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProviderEvents to fetch.
     */
    orderBy?: ProviderEventOrderByWithRelationInput | ProviderEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProviderEvents.
     */
    cursor?: ProviderEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProviderEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProviderEvents.
     */
    skip?: number
    distinct?: ProviderEventScalarFieldEnum | ProviderEventScalarFieldEnum[]
  }

  /**
   * ProviderEvent create
   */
  export type ProviderEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderEvent
     */
    select?: ProviderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderEvent
     */
    omit?: ProviderEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderEventInclude<ExtArgs> | null
    /**
     * The data needed to create a ProviderEvent.
     */
    data: XOR<ProviderEventCreateInput, ProviderEventUncheckedCreateInput>
  }

  /**
   * ProviderEvent createMany
   */
  export type ProviderEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProviderEvents.
     */
    data: ProviderEventCreateManyInput | ProviderEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProviderEvent createManyAndReturn
   */
  export type ProviderEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderEvent
     */
    select?: ProviderEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderEvent
     */
    omit?: ProviderEventOmit<ExtArgs> | null
    /**
     * The data used to create many ProviderEvents.
     */
    data: ProviderEventCreateManyInput | ProviderEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProviderEvent update
   */
  export type ProviderEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderEvent
     */
    select?: ProviderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderEvent
     */
    omit?: ProviderEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderEventInclude<ExtArgs> | null
    /**
     * The data needed to update a ProviderEvent.
     */
    data: XOR<ProviderEventUpdateInput, ProviderEventUncheckedUpdateInput>
    /**
     * Choose, which ProviderEvent to update.
     */
    where: ProviderEventWhereUniqueInput
  }

  /**
   * ProviderEvent updateMany
   */
  export type ProviderEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProviderEvents.
     */
    data: XOR<ProviderEventUpdateManyMutationInput, ProviderEventUncheckedUpdateManyInput>
    /**
     * Filter which ProviderEvents to update
     */
    where?: ProviderEventWhereInput
    /**
     * Limit how many ProviderEvents to update.
     */
    limit?: number
  }

  /**
   * ProviderEvent updateManyAndReturn
   */
  export type ProviderEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderEvent
     */
    select?: ProviderEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderEvent
     */
    omit?: ProviderEventOmit<ExtArgs> | null
    /**
     * The data used to update ProviderEvents.
     */
    data: XOR<ProviderEventUpdateManyMutationInput, ProviderEventUncheckedUpdateManyInput>
    /**
     * Filter which ProviderEvents to update
     */
    where?: ProviderEventWhereInput
    /**
     * Limit how many ProviderEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProviderEvent upsert
   */
  export type ProviderEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderEvent
     */
    select?: ProviderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderEvent
     */
    omit?: ProviderEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderEventInclude<ExtArgs> | null
    /**
     * The filter to search for the ProviderEvent to update in case it exists.
     */
    where: ProviderEventWhereUniqueInput
    /**
     * In case the ProviderEvent found by the `where` argument doesn't exist, create a new ProviderEvent with this data.
     */
    create: XOR<ProviderEventCreateInput, ProviderEventUncheckedCreateInput>
    /**
     * In case the ProviderEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProviderEventUpdateInput, ProviderEventUncheckedUpdateInput>
  }

  /**
   * ProviderEvent delete
   */
  export type ProviderEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderEvent
     */
    select?: ProviderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderEvent
     */
    omit?: ProviderEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderEventInclude<ExtArgs> | null
    /**
     * Filter which ProviderEvent to delete.
     */
    where: ProviderEventWhereUniqueInput
  }

  /**
   * ProviderEvent deleteMany
   */
  export type ProviderEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProviderEvents to delete
     */
    where?: ProviderEventWhereInput
    /**
     * Limit how many ProviderEvents to delete.
     */
    limit?: number
  }

  /**
   * ProviderEvent.paymentIntent
   */
  export type ProviderEvent$paymentIntentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    where?: PaymentIntentWhereInput
  }

  /**
   * ProviderEvent without action
   */
  export type ProviderEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderEvent
     */
    select?: ProviderEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderEvent
     */
    omit?: ProviderEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderEventInclude<ExtArgs> | null
  }


  /**
   * Model MessageThread
   */

  export type AggregateMessageThread = {
    _count: MessageThreadCountAggregateOutputType | null
    _min: MessageThreadMinAggregateOutputType | null
    _max: MessageThreadMaxAggregateOutputType | null
  }

  export type MessageThreadMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    bookingId: string | null
    subject: string | null
    guestFullName: string | null
    guestEmail: string | null
    status: $Enums.MessageThreadStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    lastMessageAt: Date | null
  }

  export type MessageThreadMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    bookingId: string | null
    subject: string | null
    guestFullName: string | null
    guestEmail: string | null
    status: $Enums.MessageThreadStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    lastMessageAt: Date | null
  }

  export type MessageThreadCountAggregateOutputType = {
    id: number
    propertyId: number
    bookingId: number
    subject: number
    guestFullName: number
    guestEmail: number
    status: number
    createdAt: number
    updatedAt: number
    lastMessageAt: number
    _all: number
  }


  export type MessageThreadMinAggregateInputType = {
    id?: true
    propertyId?: true
    bookingId?: true
    subject?: true
    guestFullName?: true
    guestEmail?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    lastMessageAt?: true
  }

  export type MessageThreadMaxAggregateInputType = {
    id?: true
    propertyId?: true
    bookingId?: true
    subject?: true
    guestFullName?: true
    guestEmail?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    lastMessageAt?: true
  }

  export type MessageThreadCountAggregateInputType = {
    id?: true
    propertyId?: true
    bookingId?: true
    subject?: true
    guestFullName?: true
    guestEmail?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    lastMessageAt?: true
    _all?: true
  }

  export type MessageThreadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageThread to aggregate.
     */
    where?: MessageThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageThreads to fetch.
     */
    orderBy?: MessageThreadOrderByWithRelationInput | MessageThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageThreads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageThreads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MessageThreads
    **/
    _count?: true | MessageThreadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageThreadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageThreadMaxAggregateInputType
  }

  export type GetMessageThreadAggregateType<T extends MessageThreadAggregateArgs> = {
        [P in keyof T & keyof AggregateMessageThread]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessageThread[P]>
      : GetScalarType<T[P], AggregateMessageThread[P]>
  }




  export type MessageThreadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageThreadWhereInput
    orderBy?: MessageThreadOrderByWithAggregationInput | MessageThreadOrderByWithAggregationInput[]
    by: MessageThreadScalarFieldEnum[] | MessageThreadScalarFieldEnum
    having?: MessageThreadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageThreadCountAggregateInputType | true
    _min?: MessageThreadMinAggregateInputType
    _max?: MessageThreadMaxAggregateInputType
  }

  export type MessageThreadGroupByOutputType = {
    id: string
    propertyId: string
    bookingId: string | null
    subject: string | null
    guestFullName: string
    guestEmail: string
    status: $Enums.MessageThreadStatus
    createdAt: Date
    updatedAt: Date
    lastMessageAt: Date | null
    _count: MessageThreadCountAggregateOutputType | null
    _min: MessageThreadMinAggregateOutputType | null
    _max: MessageThreadMaxAggregateOutputType | null
  }

  type GetMessageThreadGroupByPayload<T extends MessageThreadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageThreadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageThreadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageThreadGroupByOutputType[P]>
            : GetScalarType<T[P], MessageThreadGroupByOutputType[P]>
        }
      >
    >


  export type MessageThreadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    subject?: boolean
    guestFullName?: boolean
    guestEmail?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastMessageAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | MessageThread$bookingArgs<ExtArgs>
    messages?: boolean | MessageThread$messagesArgs<ExtArgs>
    auditLogs?: boolean | MessageThread$auditLogsArgs<ExtArgs>
    _count?: boolean | MessageThreadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageThread"]>

  export type MessageThreadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    subject?: boolean
    guestFullName?: boolean
    guestEmail?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastMessageAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | MessageThread$bookingArgs<ExtArgs>
  }, ExtArgs["result"]["messageThread"]>

  export type MessageThreadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    subject?: boolean
    guestFullName?: boolean
    guestEmail?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastMessageAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | MessageThread$bookingArgs<ExtArgs>
  }, ExtArgs["result"]["messageThread"]>

  export type MessageThreadSelectScalar = {
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    subject?: boolean
    guestFullName?: boolean
    guestEmail?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastMessageAt?: boolean
  }

  export type MessageThreadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "propertyId" | "bookingId" | "subject" | "guestFullName" | "guestEmail" | "status" | "createdAt" | "updatedAt" | "lastMessageAt", ExtArgs["result"]["messageThread"]>
  export type MessageThreadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | MessageThread$bookingArgs<ExtArgs>
    messages?: boolean | MessageThread$messagesArgs<ExtArgs>
    auditLogs?: boolean | MessageThread$auditLogsArgs<ExtArgs>
    _count?: boolean | MessageThreadCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MessageThreadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | MessageThread$bookingArgs<ExtArgs>
  }
  export type MessageThreadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | MessageThread$bookingArgs<ExtArgs>
  }

  export type $MessageThreadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MessageThread"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
      booking: Prisma.$BookingPayload<ExtArgs> | null
      messages: Prisma.$MessagePayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      bookingId: string | null
      subject: string | null
      guestFullName: string
      guestEmail: string
      status: $Enums.MessageThreadStatus
      createdAt: Date
      updatedAt: Date
      lastMessageAt: Date | null
    }, ExtArgs["result"]["messageThread"]>
    composites: {}
  }

  type MessageThreadGetPayload<S extends boolean | null | undefined | MessageThreadDefaultArgs> = $Result.GetResult<Prisma.$MessageThreadPayload, S>

  type MessageThreadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageThreadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageThreadCountAggregateInputType | true
    }

  export interface MessageThreadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MessageThread'], meta: { name: 'MessageThread' } }
    /**
     * Find zero or one MessageThread that matches the filter.
     * @param {MessageThreadFindUniqueArgs} args - Arguments to find a MessageThread
     * @example
     * // Get one MessageThread
     * const messageThread = await prisma.messageThread.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageThreadFindUniqueArgs>(args: SelectSubset<T, MessageThreadFindUniqueArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MessageThread that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageThreadFindUniqueOrThrowArgs} args - Arguments to find a MessageThread
     * @example
     * // Get one MessageThread
     * const messageThread = await prisma.messageThread.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageThreadFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageThreadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageThread that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageThreadFindFirstArgs} args - Arguments to find a MessageThread
     * @example
     * // Get one MessageThread
     * const messageThread = await prisma.messageThread.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageThreadFindFirstArgs>(args?: SelectSubset<T, MessageThreadFindFirstArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageThread that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageThreadFindFirstOrThrowArgs} args - Arguments to find a MessageThread
     * @example
     * // Get one MessageThread
     * const messageThread = await prisma.messageThread.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageThreadFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageThreadFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MessageThreads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageThreadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MessageThreads
     * const messageThreads = await prisma.messageThread.findMany()
     * 
     * // Get first 10 MessageThreads
     * const messageThreads = await prisma.messageThread.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageThreadWithIdOnly = await prisma.messageThread.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageThreadFindManyArgs>(args?: SelectSubset<T, MessageThreadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MessageThread.
     * @param {MessageThreadCreateArgs} args - Arguments to create a MessageThread.
     * @example
     * // Create one MessageThread
     * const MessageThread = await prisma.messageThread.create({
     *   data: {
     *     // ... data to create a MessageThread
     *   }
     * })
     * 
     */
    create<T extends MessageThreadCreateArgs>(args: SelectSubset<T, MessageThreadCreateArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MessageThreads.
     * @param {MessageThreadCreateManyArgs} args - Arguments to create many MessageThreads.
     * @example
     * // Create many MessageThreads
     * const messageThread = await prisma.messageThread.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageThreadCreateManyArgs>(args?: SelectSubset<T, MessageThreadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MessageThreads and returns the data saved in the database.
     * @param {MessageThreadCreateManyAndReturnArgs} args - Arguments to create many MessageThreads.
     * @example
     * // Create many MessageThreads
     * const messageThread = await prisma.messageThread.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MessageThreads and only return the `id`
     * const messageThreadWithIdOnly = await prisma.messageThread.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageThreadCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageThreadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MessageThread.
     * @param {MessageThreadDeleteArgs} args - Arguments to delete one MessageThread.
     * @example
     * // Delete one MessageThread
     * const MessageThread = await prisma.messageThread.delete({
     *   where: {
     *     // ... filter to delete one MessageThread
     *   }
     * })
     * 
     */
    delete<T extends MessageThreadDeleteArgs>(args: SelectSubset<T, MessageThreadDeleteArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MessageThread.
     * @param {MessageThreadUpdateArgs} args - Arguments to update one MessageThread.
     * @example
     * // Update one MessageThread
     * const messageThread = await prisma.messageThread.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageThreadUpdateArgs>(args: SelectSubset<T, MessageThreadUpdateArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MessageThreads.
     * @param {MessageThreadDeleteManyArgs} args - Arguments to filter MessageThreads to delete.
     * @example
     * // Delete a few MessageThreads
     * const { count } = await prisma.messageThread.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageThreadDeleteManyArgs>(args?: SelectSubset<T, MessageThreadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageThreads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageThreadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MessageThreads
     * const messageThread = await prisma.messageThread.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageThreadUpdateManyArgs>(args: SelectSubset<T, MessageThreadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageThreads and returns the data updated in the database.
     * @param {MessageThreadUpdateManyAndReturnArgs} args - Arguments to update many MessageThreads.
     * @example
     * // Update many MessageThreads
     * const messageThread = await prisma.messageThread.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MessageThreads and only return the `id`
     * const messageThreadWithIdOnly = await prisma.messageThread.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageThreadUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageThreadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MessageThread.
     * @param {MessageThreadUpsertArgs} args - Arguments to update or create a MessageThread.
     * @example
     * // Update or create a MessageThread
     * const messageThread = await prisma.messageThread.upsert({
     *   create: {
     *     // ... data to create a MessageThread
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MessageThread we want to update
     *   }
     * })
     */
    upsert<T extends MessageThreadUpsertArgs>(args: SelectSubset<T, MessageThreadUpsertArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MessageThreads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageThreadCountArgs} args - Arguments to filter MessageThreads to count.
     * @example
     * // Count the number of MessageThreads
     * const count = await prisma.messageThread.count({
     *   where: {
     *     // ... the filter for the MessageThreads we want to count
     *   }
     * })
    **/
    count<T extends MessageThreadCountArgs>(
      args?: Subset<T, MessageThreadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageThreadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MessageThread.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageThreadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageThreadAggregateArgs>(args: Subset<T, MessageThreadAggregateArgs>): Prisma.PrismaPromise<GetMessageThreadAggregateType<T>>

    /**
     * Group by MessageThread.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageThreadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageThreadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageThreadGroupByArgs['orderBy'] }
        : { orderBy?: MessageThreadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageThreadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageThreadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MessageThread model
   */
  readonly fields: MessageThreadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MessageThread.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageThreadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    booking<T extends MessageThread$bookingArgs<ExtArgs> = {}>(args?: Subset<T, MessageThread$bookingArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    messages<T extends MessageThread$messagesArgs<ExtArgs> = {}>(args?: Subset<T, MessageThread$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends MessageThread$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, MessageThread$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MessageThread model
   */
  interface MessageThreadFieldRefs {
    readonly id: FieldRef<"MessageThread", 'String'>
    readonly propertyId: FieldRef<"MessageThread", 'String'>
    readonly bookingId: FieldRef<"MessageThread", 'String'>
    readonly subject: FieldRef<"MessageThread", 'String'>
    readonly guestFullName: FieldRef<"MessageThread", 'String'>
    readonly guestEmail: FieldRef<"MessageThread", 'String'>
    readonly status: FieldRef<"MessageThread", 'MessageThreadStatus'>
    readonly createdAt: FieldRef<"MessageThread", 'DateTime'>
    readonly updatedAt: FieldRef<"MessageThread", 'DateTime'>
    readonly lastMessageAt: FieldRef<"MessageThread", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MessageThread findUnique
   */
  export type MessageThreadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageThreadInclude<ExtArgs> | null
    /**
     * Filter, which MessageThread to fetch.
     */
    where: MessageThreadWhereUniqueInput
  }

  /**
   * MessageThread findUniqueOrThrow
   */
  export type MessageThreadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageThreadInclude<ExtArgs> | null
    /**
     * Filter, which MessageThread to fetch.
     */
    where: MessageThreadWhereUniqueInput
  }

  /**
   * MessageThread findFirst
   */
  export type MessageThreadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageThreadInclude<ExtArgs> | null
    /**
     * Filter, which MessageThread to fetch.
     */
    where?: MessageThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageThreads to fetch.
     */
    orderBy?: MessageThreadOrderByWithRelationInput | MessageThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageThreads.
     */
    cursor?: MessageThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageThreads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageThreads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageThreads.
     */
    distinct?: MessageThreadScalarFieldEnum | MessageThreadScalarFieldEnum[]
  }

  /**
   * MessageThread findFirstOrThrow
   */
  export type MessageThreadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageThreadInclude<ExtArgs> | null
    /**
     * Filter, which MessageThread to fetch.
     */
    where?: MessageThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageThreads to fetch.
     */
    orderBy?: MessageThreadOrderByWithRelationInput | MessageThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageThreads.
     */
    cursor?: MessageThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageThreads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageThreads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageThreads.
     */
    distinct?: MessageThreadScalarFieldEnum | MessageThreadScalarFieldEnum[]
  }

  /**
   * MessageThread findMany
   */
  export type MessageThreadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageThreadInclude<ExtArgs> | null
    /**
     * Filter, which MessageThreads to fetch.
     */
    where?: MessageThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageThreads to fetch.
     */
    orderBy?: MessageThreadOrderByWithRelationInput | MessageThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MessageThreads.
     */
    cursor?: MessageThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageThreads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageThreads.
     */
    skip?: number
    distinct?: MessageThreadScalarFieldEnum | MessageThreadScalarFieldEnum[]
  }

  /**
   * MessageThread create
   */
  export type MessageThreadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageThreadInclude<ExtArgs> | null
    /**
     * The data needed to create a MessageThread.
     */
    data: XOR<MessageThreadCreateInput, MessageThreadUncheckedCreateInput>
  }

  /**
   * MessageThread createMany
   */
  export type MessageThreadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MessageThreads.
     */
    data: MessageThreadCreateManyInput | MessageThreadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MessageThread createManyAndReturn
   */
  export type MessageThreadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * The data used to create many MessageThreads.
     */
    data: MessageThreadCreateManyInput | MessageThreadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageThreadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MessageThread update
   */
  export type MessageThreadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageThreadInclude<ExtArgs> | null
    /**
     * The data needed to update a MessageThread.
     */
    data: XOR<MessageThreadUpdateInput, MessageThreadUncheckedUpdateInput>
    /**
     * Choose, which MessageThread to update.
     */
    where: MessageThreadWhereUniqueInput
  }

  /**
   * MessageThread updateMany
   */
  export type MessageThreadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MessageThreads.
     */
    data: XOR<MessageThreadUpdateManyMutationInput, MessageThreadUncheckedUpdateManyInput>
    /**
     * Filter which MessageThreads to update
     */
    where?: MessageThreadWhereInput
    /**
     * Limit how many MessageThreads to update.
     */
    limit?: number
  }

  /**
   * MessageThread updateManyAndReturn
   */
  export type MessageThreadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * The data used to update MessageThreads.
     */
    data: XOR<MessageThreadUpdateManyMutationInput, MessageThreadUncheckedUpdateManyInput>
    /**
     * Filter which MessageThreads to update
     */
    where?: MessageThreadWhereInput
    /**
     * Limit how many MessageThreads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageThreadIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MessageThread upsert
   */
  export type MessageThreadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageThreadInclude<ExtArgs> | null
    /**
     * The filter to search for the MessageThread to update in case it exists.
     */
    where: MessageThreadWhereUniqueInput
    /**
     * In case the MessageThread found by the `where` argument doesn't exist, create a new MessageThread with this data.
     */
    create: XOR<MessageThreadCreateInput, MessageThreadUncheckedCreateInput>
    /**
     * In case the MessageThread was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageThreadUpdateInput, MessageThreadUncheckedUpdateInput>
  }

  /**
   * MessageThread delete
   */
  export type MessageThreadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageThreadInclude<ExtArgs> | null
    /**
     * Filter which MessageThread to delete.
     */
    where: MessageThreadWhereUniqueInput
  }

  /**
   * MessageThread deleteMany
   */
  export type MessageThreadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageThreads to delete
     */
    where?: MessageThreadWhereInput
    /**
     * Limit how many MessageThreads to delete.
     */
    limit?: number
  }

  /**
   * MessageThread.booking
   */
  export type MessageThread$bookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
  }

  /**
   * MessageThread.messages
   */
  export type MessageThread$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * MessageThread.auditLogs
   */
  export type MessageThread$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * MessageThread without action
   */
  export type MessageThreadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageThreadInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    threadId: string | null
    senderRole: $Enums.Role | null
    senderUserId: string | null
    senderName: string | null
    body: string | null
    isInternalNote: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    threadId: string | null
    senderRole: $Enums.Role | null
    senderUserId: string | null
    senderName: string | null
    body: string | null
    isInternalNote: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    threadId: number
    senderRole: number
    senderUserId: number
    senderName: number
    body: number
    isInternalNote: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    threadId?: true
    senderRole?: true
    senderUserId?: true
    senderName?: true
    body?: true
    isInternalNote?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    threadId?: true
    senderRole?: true
    senderUserId?: true
    senderName?: true
    body?: true
    isInternalNote?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    threadId?: true
    senderRole?: true
    senderUserId?: true
    senderName?: true
    body?: true
    isInternalNote?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    threadId: string
    senderRole: $Enums.Role
    senderUserId: string | null
    senderName: string | null
    body: string
    isInternalNote: boolean
    createdAt: Date
    updatedAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    senderRole?: boolean
    senderUserId?: boolean
    senderName?: boolean
    body?: boolean
    isInternalNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    thread?: boolean | MessageThreadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    senderRole?: boolean
    senderUserId?: boolean
    senderName?: boolean
    body?: boolean
    isInternalNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    thread?: boolean | MessageThreadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    senderRole?: boolean
    senderUserId?: boolean
    senderName?: boolean
    body?: boolean
    isInternalNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    thread?: boolean | MessageThreadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    threadId?: boolean
    senderRole?: boolean
    senderUserId?: boolean
    senderName?: boolean
    body?: boolean
    isInternalNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "threadId" | "senderRole" | "senderUserId" | "senderName" | "body" | "isInternalNote" | "createdAt" | "updatedAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    thread?: boolean | MessageThreadDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    thread?: boolean | MessageThreadDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    thread?: boolean | MessageThreadDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      thread: Prisma.$MessageThreadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      threadId: string
      senderRole: $Enums.Role
      senderUserId: string | null
      senderName: string | null
      body: string
      isInternalNote: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    thread<T extends MessageThreadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MessageThreadDefaultArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly threadId: FieldRef<"Message", 'String'>
    readonly senderRole: FieldRef<"Message", 'Role'>
    readonly senderUserId: FieldRef<"Message", 'String'>
    readonly senderName: FieldRef<"Message", 'String'>
    readonly body: FieldRef<"Message", 'String'>
    readonly isInternalNote: FieldRef<"Message", 'Boolean'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly updatedAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    bookingId: string | null
    messageThreadId: string | null
    actorRole: $Enums.Role | null
    actorUserId: string | null
    actorEmail: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    requestId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    bookingId: string | null
    messageThreadId: string | null
    actorRole: $Enums.Role | null
    actorUserId: string | null
    actorEmail: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    requestId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    propertyId: number
    bookingId: number
    messageThreadId: number
    actorRole: number
    actorUserId: number
    actorEmail: number
    action: number
    entityType: number
    entityId: number
    requestId: number
    ipAddress: number
    userAgent: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    propertyId?: true
    bookingId?: true
    messageThreadId?: true
    actorRole?: true
    actorUserId?: true
    actorEmail?: true
    action?: true
    entityType?: true
    entityId?: true
    requestId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    propertyId?: true
    bookingId?: true
    messageThreadId?: true
    actorRole?: true
    actorUserId?: true
    actorEmail?: true
    action?: true
    entityType?: true
    entityId?: true
    requestId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    propertyId?: true
    bookingId?: true
    messageThreadId?: true
    actorRole?: true
    actorUserId?: true
    actorEmail?: true
    action?: true
    entityType?: true
    entityId?: true
    requestId?: true
    ipAddress?: true
    userAgent?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    propertyId: string
    bookingId: string | null
    messageThreadId: string | null
    actorRole: $Enums.Role
    actorUserId: string | null
    actorEmail: string | null
    action: string
    entityType: string
    entityId: string | null
    requestId: string | null
    ipAddress: string | null
    userAgent: string | null
    metadata: JsonValue | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    messageThreadId?: boolean
    actorRole?: boolean
    actorUserId?: boolean
    actorEmail?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    requestId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | AuditLog$bookingArgs<ExtArgs>
    messageThread?: boolean | AuditLog$messageThreadArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    messageThreadId?: boolean
    actorRole?: boolean
    actorUserId?: boolean
    actorEmail?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    requestId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | AuditLog$bookingArgs<ExtArgs>
    messageThread?: boolean | AuditLog$messageThreadArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    messageThreadId?: boolean
    actorRole?: boolean
    actorUserId?: boolean
    actorEmail?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    requestId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | AuditLog$bookingArgs<ExtArgs>
    messageThread?: boolean | AuditLog$messageThreadArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    messageThreadId?: boolean
    actorRole?: boolean
    actorUserId?: boolean
    actorEmail?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    requestId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "propertyId" | "bookingId" | "messageThreadId" | "actorRole" | "actorUserId" | "actorEmail" | "action" | "entityType" | "entityId" | "requestId" | "ipAddress" | "userAgent" | "metadata" | "createdAt", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | AuditLog$bookingArgs<ExtArgs>
    messageThread?: boolean | AuditLog$messageThreadArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | AuditLog$bookingArgs<ExtArgs>
    messageThread?: boolean | AuditLog$messageThreadArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    booking?: boolean | AuditLog$bookingArgs<ExtArgs>
    messageThread?: boolean | AuditLog$messageThreadArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
      booking: Prisma.$BookingPayload<ExtArgs> | null
      messageThread: Prisma.$MessageThreadPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      bookingId: string | null
      messageThreadId: string | null
      actorRole: $Enums.Role
      actorUserId: string | null
      actorEmail: string | null
      action: string
      entityType: string
      entityId: string | null
      requestId: string | null
      ipAddress: string | null
      userAgent: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    booking<T extends AuditLog$bookingArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$bookingArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    messageThread<T extends AuditLog$messageThreadArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$messageThreadArgs<ExtArgs>>): Prisma__MessageThreadClient<$Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly propertyId: FieldRef<"AuditLog", 'String'>
    readonly bookingId: FieldRef<"AuditLog", 'String'>
    readonly messageThreadId: FieldRef<"AuditLog", 'String'>
    readonly actorRole: FieldRef<"AuditLog", 'Role'>
    readonly actorUserId: FieldRef<"AuditLog", 'String'>
    readonly actorEmail: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entityType: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly requestId: FieldRef<"AuditLog", 'String'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly metadata: FieldRef<"AuditLog", 'Json'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog.booking
   */
  export type AuditLog$bookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
  }

  /**
   * AuditLog.messageThread
   */
  export type AuditLog$messageThreadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageThread
     */
    select?: MessageThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageThread
     */
    omit?: MessageThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageThreadInclude<ExtArgs> | null
    where?: MessageThreadWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PropertyScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    name: 'name',
    description: 'description',
    city: 'city',
    country: 'country',
    addressLine1: 'addressLine1',
    addressLine2: 'addressLine2',
    postalCode: 'postalCode',
    timezone: 'timezone',
    defaultCurrency: 'defaultCurrency',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PropertyScalarFieldEnum = (typeof PropertyScalarFieldEnum)[keyof typeof PropertyScalarFieldEnum]


  export const UnitTypeScalarFieldEnum: {
    id: 'id',
    propertyId: 'propertyId',
    slug: 'slug',
    name: 'name',
    description: 'description',
    coverImageUrl: 'coverImageUrl',
    galleryImageUrls: 'galleryImageUrls',
    estimatedRating: 'estimatedRating',
    status: 'status',
    maxGuests: 'maxGuests',
    basePriceMinor: 'basePriceMinor',
    currency: 'currency',
    displayOrder: 'displayOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UnitTypeScalarFieldEnum = (typeof UnitTypeScalarFieldEnum)[keyof typeof UnitTypeScalarFieldEnum]


  export const UnitScalarFieldEnum: {
    id: 'id',
    propertyId: 'propertyId',
    unitTypeId: 'unitTypeId',
    code: 'code',
    name: 'name',
    floor: 'floor',
    status: 'status',
    isBookable: 'isBookable',
    isPublished: 'isPublished',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UnitScalarFieldEnum = (typeof UnitScalarFieldEnum)[keyof typeof UnitScalarFieldEnum]


  export const BookingScalarFieldEnum: {
    id: 'id',
    propertyId: 'propertyId',
    unitId: 'unitId',
    idempotencyKey: 'idempotencyKey',
    status: 'status',
    paymentStatus: 'paymentStatus',
    checkInDate: 'checkInDate',
    checkOutDate: 'checkOutDate',
    guestFullName: 'guestFullName',
    guestEmail: 'guestEmail',
    guestPhone: 'guestPhone',
    adultsCount: 'adultsCount',
    childrenCount: 'childrenCount',
    currency: 'currency',
    totalAmountMinor: 'totalAmountMinor',
    notes: 'notes',
    cancelledAt: 'cancelledAt',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const PriceSnapshotScalarFieldEnum: {
    id: 'id',
    propertyId: 'propertyId',
    bookingId: 'bookingId',
    currency: 'currency',
    nightsCount: 'nightsCount',
    nightlyRateMinor: 'nightlyRateMinor',
    subtotalMinor: 'subtotalMinor',
    discountsMinor: 'discountsMinor',
    taxesMinor: 'taxesMinor',
    feesMinor: 'feesMinor',
    totalAmountMinor: 'totalAmountMinor',
    pricingVersion: 'pricingVersion',
    promotionCode: 'promotionCode',
    capturedAt: 'capturedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PriceSnapshotScalarFieldEnum = (typeof PriceSnapshotScalarFieldEnum)[keyof typeof PriceSnapshotScalarFieldEnum]


  export const PaymentIntentScalarFieldEnum: {
    id: 'id',
    propertyId: 'propertyId',
    bookingId: 'bookingId',
    amountMinor: 'amountMinor',
    currency: 'currency',
    method: 'method',
    provider: 'provider',
    status: 'status',
    providerIntentRef: 'providerIntentRef',
    providerCustomerRef: 'providerCustomerRef',
    idempotencyKey: 'idempotencyKey',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentIntentScalarFieldEnum = (typeof PaymentIntentScalarFieldEnum)[keyof typeof PaymentIntentScalarFieldEnum]


  export const PaymentTransactionScalarFieldEnum: {
    id: 'id',
    paymentIntentId: 'paymentIntentId',
    status: 'status',
    amountMinor: 'amountMinor',
    currency: 'currency',
    providerTxnRef: 'providerTxnRef',
    externalReference: 'externalReference',
    message: 'message',
    rawPayload: 'rawPayload',
    sequence: 'sequence',
    occurredAt: 'occurredAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentTransactionScalarFieldEnum = (typeof PaymentTransactionScalarFieldEnum)[keyof typeof PaymentTransactionScalarFieldEnum]


  export const ProviderEventScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    eventId: 'eventId',
    providerReference: 'providerReference',
    paymentIntentId: 'paymentIntentId',
    status: 'status',
    signatureValid: 'signatureValid',
    rawPayload: 'rawPayload',
    occurredAt: 'occurredAt',
    processedAt: 'processedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProviderEventScalarFieldEnum = (typeof ProviderEventScalarFieldEnum)[keyof typeof ProviderEventScalarFieldEnum]


  export const MessageThreadScalarFieldEnum: {
    id: 'id',
    propertyId: 'propertyId',
    bookingId: 'bookingId',
    subject: 'subject',
    guestFullName: 'guestFullName',
    guestEmail: 'guestEmail',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastMessageAt: 'lastMessageAt'
  };

  export type MessageThreadScalarFieldEnum = (typeof MessageThreadScalarFieldEnum)[keyof typeof MessageThreadScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    threadId: 'threadId',
    senderRole: 'senderRole',
    senderUserId: 'senderUserId',
    senderName: 'senderName',
    body: 'body',
    isInternalNote: 'isInternalNote',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    propertyId: 'propertyId',
    bookingId: 'bookingId',
    messageThreadId: 'messageThreadId',
    actorRole: 'actorRole',
    actorUserId: 'actorUserId',
    actorEmail: 'actorEmail',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    requestId: 'requestId',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Currency'
   */
  export type EnumCurrencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Currency'>
    


  /**
   * Reference to a field of type 'Currency[]'
   */
  export type ListEnumCurrencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Currency[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'UnitTypeStatus'
   */
  export type EnumUnitTypeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UnitTypeStatus'>
    


  /**
   * Reference to a field of type 'UnitTypeStatus[]'
   */
  export type ListEnumUnitTypeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UnitTypeStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'UnitStatus'
   */
  export type EnumUnitStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UnitStatus'>
    


  /**
   * Reference to a field of type 'UnitStatus[]'
   */
  export type ListEnumUnitStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UnitStatus[]'>
    


  /**
   * Reference to a field of type 'BookingStatus'
   */
  export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>
    


  /**
   * Reference to a field of type 'BookingStatus[]'
   */
  export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentMethod'
   */
  export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>
    


  /**
   * Reference to a field of type 'PaymentMethod[]'
   */
  export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>
    


  /**
   * Reference to a field of type 'PaymentProvider'
   */
  export type EnumPaymentProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentProvider'>
    


  /**
   * Reference to a field of type 'PaymentProvider[]'
   */
  export type ListEnumPaymentProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentProvider[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'MessageThreadStatus'
   */
  export type EnumMessageThreadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageThreadStatus'>
    


  /**
   * Reference to a field of type 'MessageThreadStatus[]'
   */
  export type ListEnumMessageThreadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageThreadStatus[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    
  /**
   * Deep Input Types
   */


  export type PropertyWhereInput = {
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    id?: StringFilter<"Property"> | string
    slug?: StringFilter<"Property"> | string
    name?: StringFilter<"Property"> | string
    description?: StringNullableFilter<"Property"> | string | null
    city?: StringFilter<"Property"> | string
    country?: StringFilter<"Property"> | string
    addressLine1?: StringNullableFilter<"Property"> | string | null
    addressLine2?: StringNullableFilter<"Property"> | string | null
    postalCode?: StringNullableFilter<"Property"> | string | null
    timezone?: StringFilter<"Property"> | string
    defaultCurrency?: EnumCurrencyFilter<"Property"> | $Enums.Currency
    isActive?: BoolFilter<"Property"> | boolean
    createdAt?: DateTimeFilter<"Property"> | Date | string
    updatedAt?: DateTimeFilter<"Property"> | Date | string
    unitTypes?: UnitTypeListRelationFilter
    units?: UnitListRelationFilter
    bookings?: BookingListRelationFilter
    priceSnapshots?: PriceSnapshotListRelationFilter
    paymentIntents?: PaymentIntentListRelationFilter
    messageThreads?: MessageThreadListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type PropertyOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    city?: SortOrder
    country?: SortOrder
    addressLine1?: SortOrderInput | SortOrder
    addressLine2?: SortOrderInput | SortOrder
    postalCode?: SortOrderInput | SortOrder
    timezone?: SortOrder
    defaultCurrency?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    unitTypes?: UnitTypeOrderByRelationAggregateInput
    units?: UnitOrderByRelationAggregateInput
    bookings?: BookingOrderByRelationAggregateInput
    priceSnapshots?: PriceSnapshotOrderByRelationAggregateInput
    paymentIntents?: PaymentIntentOrderByRelationAggregateInput
    messageThreads?: MessageThreadOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type PropertyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    name?: StringFilter<"Property"> | string
    description?: StringNullableFilter<"Property"> | string | null
    city?: StringFilter<"Property"> | string
    country?: StringFilter<"Property"> | string
    addressLine1?: StringNullableFilter<"Property"> | string | null
    addressLine2?: StringNullableFilter<"Property"> | string | null
    postalCode?: StringNullableFilter<"Property"> | string | null
    timezone?: StringFilter<"Property"> | string
    defaultCurrency?: EnumCurrencyFilter<"Property"> | $Enums.Currency
    isActive?: BoolFilter<"Property"> | boolean
    createdAt?: DateTimeFilter<"Property"> | Date | string
    updatedAt?: DateTimeFilter<"Property"> | Date | string
    unitTypes?: UnitTypeListRelationFilter
    units?: UnitListRelationFilter
    bookings?: BookingListRelationFilter
    priceSnapshots?: PriceSnapshotListRelationFilter
    paymentIntents?: PaymentIntentListRelationFilter
    messageThreads?: MessageThreadListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "slug">

  export type PropertyOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    city?: SortOrder
    country?: SortOrder
    addressLine1?: SortOrderInput | SortOrder
    addressLine2?: SortOrderInput | SortOrder
    postalCode?: SortOrderInput | SortOrder
    timezone?: SortOrder
    defaultCurrency?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PropertyCountOrderByAggregateInput
    _max?: PropertyMaxOrderByAggregateInput
    _min?: PropertyMinOrderByAggregateInput
  }

  export type PropertyScalarWhereWithAggregatesInput = {
    AND?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    OR?: PropertyScalarWhereWithAggregatesInput[]
    NOT?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Property"> | string
    slug?: StringWithAggregatesFilter<"Property"> | string
    name?: StringWithAggregatesFilter<"Property"> | string
    description?: StringNullableWithAggregatesFilter<"Property"> | string | null
    city?: StringWithAggregatesFilter<"Property"> | string
    country?: StringWithAggregatesFilter<"Property"> | string
    addressLine1?: StringNullableWithAggregatesFilter<"Property"> | string | null
    addressLine2?: StringNullableWithAggregatesFilter<"Property"> | string | null
    postalCode?: StringNullableWithAggregatesFilter<"Property"> | string | null
    timezone?: StringWithAggregatesFilter<"Property"> | string
    defaultCurrency?: EnumCurrencyWithAggregatesFilter<"Property"> | $Enums.Currency
    isActive?: BoolWithAggregatesFilter<"Property"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Property"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Property"> | Date | string
  }

  export type UnitTypeWhereInput = {
    AND?: UnitTypeWhereInput | UnitTypeWhereInput[]
    OR?: UnitTypeWhereInput[]
    NOT?: UnitTypeWhereInput | UnitTypeWhereInput[]
    id?: StringFilter<"UnitType"> | string
    propertyId?: StringFilter<"UnitType"> | string
    slug?: StringFilter<"UnitType"> | string
    name?: StringFilter<"UnitType"> | string
    description?: StringNullableFilter<"UnitType"> | string | null
    coverImageUrl?: StringNullableFilter<"UnitType"> | string | null
    galleryImageUrls?: StringNullableListFilter<"UnitType">
    estimatedRating?: FloatFilter<"UnitType"> | number
    status?: EnumUnitTypeStatusFilter<"UnitType"> | $Enums.UnitTypeStatus
    maxGuests?: IntFilter<"UnitType"> | number
    basePriceMinor?: IntFilter<"UnitType"> | number
    currency?: EnumCurrencyFilter<"UnitType"> | $Enums.Currency
    displayOrder?: IntFilter<"UnitType"> | number
    createdAt?: DateTimeFilter<"UnitType"> | Date | string
    updatedAt?: DateTimeFilter<"UnitType"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    units?: UnitListRelationFilter
  }

  export type UnitTypeOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    coverImageUrl?: SortOrderInput | SortOrder
    galleryImageUrls?: SortOrder
    estimatedRating?: SortOrder
    status?: SortOrder
    maxGuests?: SortOrder
    basePriceMinor?: SortOrder
    currency?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
    units?: UnitOrderByRelationAggregateInput
  }

  export type UnitTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    propertyId_slug?: UnitTypePropertyIdSlugCompoundUniqueInput
    AND?: UnitTypeWhereInput | UnitTypeWhereInput[]
    OR?: UnitTypeWhereInput[]
    NOT?: UnitTypeWhereInput | UnitTypeWhereInput[]
    propertyId?: StringFilter<"UnitType"> | string
    slug?: StringFilter<"UnitType"> | string
    name?: StringFilter<"UnitType"> | string
    description?: StringNullableFilter<"UnitType"> | string | null
    coverImageUrl?: StringNullableFilter<"UnitType"> | string | null
    galleryImageUrls?: StringNullableListFilter<"UnitType">
    estimatedRating?: FloatFilter<"UnitType"> | number
    status?: EnumUnitTypeStatusFilter<"UnitType"> | $Enums.UnitTypeStatus
    maxGuests?: IntFilter<"UnitType"> | number
    basePriceMinor?: IntFilter<"UnitType"> | number
    currency?: EnumCurrencyFilter<"UnitType"> | $Enums.Currency
    displayOrder?: IntFilter<"UnitType"> | number
    createdAt?: DateTimeFilter<"UnitType"> | Date | string
    updatedAt?: DateTimeFilter<"UnitType"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    units?: UnitListRelationFilter
  }, "id" | "propertyId_slug">

  export type UnitTypeOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    coverImageUrl?: SortOrderInput | SortOrder
    galleryImageUrls?: SortOrder
    estimatedRating?: SortOrder
    status?: SortOrder
    maxGuests?: SortOrder
    basePriceMinor?: SortOrder
    currency?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UnitTypeCountOrderByAggregateInput
    _avg?: UnitTypeAvgOrderByAggregateInput
    _max?: UnitTypeMaxOrderByAggregateInput
    _min?: UnitTypeMinOrderByAggregateInput
    _sum?: UnitTypeSumOrderByAggregateInput
  }

  export type UnitTypeScalarWhereWithAggregatesInput = {
    AND?: UnitTypeScalarWhereWithAggregatesInput | UnitTypeScalarWhereWithAggregatesInput[]
    OR?: UnitTypeScalarWhereWithAggregatesInput[]
    NOT?: UnitTypeScalarWhereWithAggregatesInput | UnitTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UnitType"> | string
    propertyId?: StringWithAggregatesFilter<"UnitType"> | string
    slug?: StringWithAggregatesFilter<"UnitType"> | string
    name?: StringWithAggregatesFilter<"UnitType"> | string
    description?: StringNullableWithAggregatesFilter<"UnitType"> | string | null
    coverImageUrl?: StringNullableWithAggregatesFilter<"UnitType"> | string | null
    galleryImageUrls?: StringNullableListFilter<"UnitType">
    estimatedRating?: FloatWithAggregatesFilter<"UnitType"> | number
    status?: EnumUnitTypeStatusWithAggregatesFilter<"UnitType"> | $Enums.UnitTypeStatus
    maxGuests?: IntWithAggregatesFilter<"UnitType"> | number
    basePriceMinor?: IntWithAggregatesFilter<"UnitType"> | number
    currency?: EnumCurrencyWithAggregatesFilter<"UnitType"> | $Enums.Currency
    displayOrder?: IntWithAggregatesFilter<"UnitType"> | number
    createdAt?: DateTimeWithAggregatesFilter<"UnitType"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UnitType"> | Date | string
  }

  export type UnitWhereInput = {
    AND?: UnitWhereInput | UnitWhereInput[]
    OR?: UnitWhereInput[]
    NOT?: UnitWhereInput | UnitWhereInput[]
    id?: StringFilter<"Unit"> | string
    propertyId?: StringFilter<"Unit"> | string
    unitTypeId?: StringFilter<"Unit"> | string
    code?: StringFilter<"Unit"> | string
    name?: StringNullableFilter<"Unit"> | string | null
    floor?: StringNullableFilter<"Unit"> | string | null
    status?: EnumUnitStatusFilter<"Unit"> | $Enums.UnitStatus
    isBookable?: BoolFilter<"Unit"> | boolean
    isPublished?: BoolFilter<"Unit"> | boolean
    createdAt?: DateTimeFilter<"Unit"> | Date | string
    updatedAt?: DateTimeFilter<"Unit"> | Date | string
    bookings?: BookingListRelationFilter
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    unitType?: XOR<UnitTypeScalarRelationFilter, UnitTypeWhereInput>
  }

  export type UnitOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    unitTypeId?: SortOrder
    code?: SortOrder
    name?: SortOrderInput | SortOrder
    floor?: SortOrderInput | SortOrder
    status?: SortOrder
    isBookable?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bookings?: BookingOrderByRelationAggregateInput
    property?: PropertyOrderByWithRelationInput
    unitType?: UnitTypeOrderByWithRelationInput
  }

  export type UnitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    propertyId_code?: UnitPropertyIdCodeCompoundUniqueInput
    AND?: UnitWhereInput | UnitWhereInput[]
    OR?: UnitWhereInput[]
    NOT?: UnitWhereInput | UnitWhereInput[]
    propertyId?: StringFilter<"Unit"> | string
    unitTypeId?: StringFilter<"Unit"> | string
    code?: StringFilter<"Unit"> | string
    name?: StringNullableFilter<"Unit"> | string | null
    floor?: StringNullableFilter<"Unit"> | string | null
    status?: EnumUnitStatusFilter<"Unit"> | $Enums.UnitStatus
    isBookable?: BoolFilter<"Unit"> | boolean
    isPublished?: BoolFilter<"Unit"> | boolean
    createdAt?: DateTimeFilter<"Unit"> | Date | string
    updatedAt?: DateTimeFilter<"Unit"> | Date | string
    bookings?: BookingListRelationFilter
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    unitType?: XOR<UnitTypeScalarRelationFilter, UnitTypeWhereInput>
  }, "id" | "propertyId_code">

  export type UnitOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    unitTypeId?: SortOrder
    code?: SortOrder
    name?: SortOrderInput | SortOrder
    floor?: SortOrderInput | SortOrder
    status?: SortOrder
    isBookable?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UnitCountOrderByAggregateInput
    _max?: UnitMaxOrderByAggregateInput
    _min?: UnitMinOrderByAggregateInput
  }

  export type UnitScalarWhereWithAggregatesInput = {
    AND?: UnitScalarWhereWithAggregatesInput | UnitScalarWhereWithAggregatesInput[]
    OR?: UnitScalarWhereWithAggregatesInput[]
    NOT?: UnitScalarWhereWithAggregatesInput | UnitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Unit"> | string
    propertyId?: StringWithAggregatesFilter<"Unit"> | string
    unitTypeId?: StringWithAggregatesFilter<"Unit"> | string
    code?: StringWithAggregatesFilter<"Unit"> | string
    name?: StringNullableWithAggregatesFilter<"Unit"> | string | null
    floor?: StringNullableWithAggregatesFilter<"Unit"> | string | null
    status?: EnumUnitStatusWithAggregatesFilter<"Unit"> | $Enums.UnitStatus
    isBookable?: BoolWithAggregatesFilter<"Unit"> | boolean
    isPublished?: BoolWithAggregatesFilter<"Unit"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Unit"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Unit"> | Date | string
  }

  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: StringFilter<"Booking"> | string
    propertyId?: StringFilter<"Booking"> | string
    unitId?: StringFilter<"Booking"> | string
    idempotencyKey?: StringNullableFilter<"Booking"> | string | null
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFilter<"Booking"> | $Enums.PaymentStatus
    checkInDate?: DateTimeFilter<"Booking"> | Date | string
    checkOutDate?: DateTimeFilter<"Booking"> | Date | string
    guestFullName?: StringFilter<"Booking"> | string
    guestEmail?: StringFilter<"Booking"> | string
    guestPhone?: StringFilter<"Booking"> | string
    adultsCount?: IntFilter<"Booking"> | number
    childrenCount?: IntFilter<"Booking"> | number
    currency?: EnumCurrencyFilter<"Booking"> | $Enums.Currency
    totalAmountMinor?: IntFilter<"Booking"> | number
    notes?: StringNullableFilter<"Booking"> | string | null
    cancelledAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    priceSnapshot?: XOR<PriceSnapshotNullableScalarRelationFilter, PriceSnapshotWhereInput> | null
    paymentIntents?: PaymentIntentListRelationFilter
    messageThreads?: MessageThreadListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    unit?: XOR<UnitScalarRelationFilter, UnitWhereInput>
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    unitId?: SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    checkInDate?: SortOrder
    checkOutDate?: SortOrder
    guestFullName?: SortOrder
    guestEmail?: SortOrder
    guestPhone?: SortOrder
    adultsCount?: SortOrder
    childrenCount?: SortOrder
    currency?: SortOrder
    totalAmountMinor?: SortOrder
    notes?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    priceSnapshot?: PriceSnapshotOrderByWithRelationInput
    paymentIntents?: PaymentIntentOrderByRelationAggregateInput
    messageThreads?: MessageThreadOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
    property?: PropertyOrderByWithRelationInput
    unit?: UnitOrderByWithRelationInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idempotencyKey?: string
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    propertyId?: StringFilter<"Booking"> | string
    unitId?: StringFilter<"Booking"> | string
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFilter<"Booking"> | $Enums.PaymentStatus
    checkInDate?: DateTimeFilter<"Booking"> | Date | string
    checkOutDate?: DateTimeFilter<"Booking"> | Date | string
    guestFullName?: StringFilter<"Booking"> | string
    guestEmail?: StringFilter<"Booking"> | string
    guestPhone?: StringFilter<"Booking"> | string
    adultsCount?: IntFilter<"Booking"> | number
    childrenCount?: IntFilter<"Booking"> | number
    currency?: EnumCurrencyFilter<"Booking"> | $Enums.Currency
    totalAmountMinor?: IntFilter<"Booking"> | number
    notes?: StringNullableFilter<"Booking"> | string | null
    cancelledAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    priceSnapshot?: XOR<PriceSnapshotNullableScalarRelationFilter, PriceSnapshotWhereInput> | null
    paymentIntents?: PaymentIntentListRelationFilter
    messageThreads?: MessageThreadListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    unit?: XOR<UnitScalarRelationFilter, UnitWhereInput>
  }, "id" | "idempotencyKey">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    unitId?: SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    checkInDate?: SortOrder
    checkOutDate?: SortOrder
    guestFullName?: SortOrder
    guestEmail?: SortOrder
    guestPhone?: SortOrder
    adultsCount?: SortOrder
    childrenCount?: SortOrder
    currency?: SortOrder
    totalAmountMinor?: SortOrder
    notes?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookingCountOrderByAggregateInput
    _avg?: BookingAvgOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
    _sum?: BookingSumOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    OR?: BookingScalarWhereWithAggregatesInput[]
    NOT?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Booking"> | string
    propertyId?: StringWithAggregatesFilter<"Booking"> | string
    unitId?: StringWithAggregatesFilter<"Booking"> | string
    idempotencyKey?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    status?: EnumBookingStatusWithAggregatesFilter<"Booking"> | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusWithAggregatesFilter<"Booking"> | $Enums.PaymentStatus
    checkInDate?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    checkOutDate?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    guestFullName?: StringWithAggregatesFilter<"Booking"> | string
    guestEmail?: StringWithAggregatesFilter<"Booking"> | string
    guestPhone?: StringWithAggregatesFilter<"Booking"> | string
    adultsCount?: IntWithAggregatesFilter<"Booking"> | number
    childrenCount?: IntWithAggregatesFilter<"Booking"> | number
    currency?: EnumCurrencyWithAggregatesFilter<"Booking"> | $Enums.Currency
    totalAmountMinor?: IntWithAggregatesFilter<"Booking"> | number
    notes?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    cancelledAt?: DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
  }

  export type PriceSnapshotWhereInput = {
    AND?: PriceSnapshotWhereInput | PriceSnapshotWhereInput[]
    OR?: PriceSnapshotWhereInput[]
    NOT?: PriceSnapshotWhereInput | PriceSnapshotWhereInput[]
    id?: StringFilter<"PriceSnapshot"> | string
    propertyId?: StringFilter<"PriceSnapshot"> | string
    bookingId?: StringFilter<"PriceSnapshot"> | string
    currency?: EnumCurrencyFilter<"PriceSnapshot"> | $Enums.Currency
    nightsCount?: IntFilter<"PriceSnapshot"> | number
    nightlyRateMinor?: IntFilter<"PriceSnapshot"> | number
    subtotalMinor?: IntFilter<"PriceSnapshot"> | number
    discountsMinor?: IntFilter<"PriceSnapshot"> | number
    taxesMinor?: IntFilter<"PriceSnapshot"> | number
    feesMinor?: IntFilter<"PriceSnapshot"> | number
    totalAmountMinor?: IntFilter<"PriceSnapshot"> | number
    pricingVersion?: IntFilter<"PriceSnapshot"> | number
    promotionCode?: StringNullableFilter<"PriceSnapshot"> | string | null
    capturedAt?: DateTimeFilter<"PriceSnapshot"> | Date | string
    createdAt?: DateTimeFilter<"PriceSnapshot"> | Date | string
    updatedAt?: DateTimeFilter<"PriceSnapshot"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
  }

  export type PriceSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    currency?: SortOrder
    nightsCount?: SortOrder
    nightlyRateMinor?: SortOrder
    subtotalMinor?: SortOrder
    discountsMinor?: SortOrder
    taxesMinor?: SortOrder
    feesMinor?: SortOrder
    totalAmountMinor?: SortOrder
    pricingVersion?: SortOrder
    promotionCode?: SortOrderInput | SortOrder
    capturedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
    booking?: BookingOrderByWithRelationInput
  }

  export type PriceSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookingId?: string
    AND?: PriceSnapshotWhereInput | PriceSnapshotWhereInput[]
    OR?: PriceSnapshotWhereInput[]
    NOT?: PriceSnapshotWhereInput | PriceSnapshotWhereInput[]
    propertyId?: StringFilter<"PriceSnapshot"> | string
    currency?: EnumCurrencyFilter<"PriceSnapshot"> | $Enums.Currency
    nightsCount?: IntFilter<"PriceSnapshot"> | number
    nightlyRateMinor?: IntFilter<"PriceSnapshot"> | number
    subtotalMinor?: IntFilter<"PriceSnapshot"> | number
    discountsMinor?: IntFilter<"PriceSnapshot"> | number
    taxesMinor?: IntFilter<"PriceSnapshot"> | number
    feesMinor?: IntFilter<"PriceSnapshot"> | number
    totalAmountMinor?: IntFilter<"PriceSnapshot"> | number
    pricingVersion?: IntFilter<"PriceSnapshot"> | number
    promotionCode?: StringNullableFilter<"PriceSnapshot"> | string | null
    capturedAt?: DateTimeFilter<"PriceSnapshot"> | Date | string
    createdAt?: DateTimeFilter<"PriceSnapshot"> | Date | string
    updatedAt?: DateTimeFilter<"PriceSnapshot"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
  }, "id" | "bookingId">

  export type PriceSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    currency?: SortOrder
    nightsCount?: SortOrder
    nightlyRateMinor?: SortOrder
    subtotalMinor?: SortOrder
    discountsMinor?: SortOrder
    taxesMinor?: SortOrder
    feesMinor?: SortOrder
    totalAmountMinor?: SortOrder
    pricingVersion?: SortOrder
    promotionCode?: SortOrderInput | SortOrder
    capturedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PriceSnapshotCountOrderByAggregateInput
    _avg?: PriceSnapshotAvgOrderByAggregateInput
    _max?: PriceSnapshotMaxOrderByAggregateInput
    _min?: PriceSnapshotMinOrderByAggregateInput
    _sum?: PriceSnapshotSumOrderByAggregateInput
  }

  export type PriceSnapshotScalarWhereWithAggregatesInput = {
    AND?: PriceSnapshotScalarWhereWithAggregatesInput | PriceSnapshotScalarWhereWithAggregatesInput[]
    OR?: PriceSnapshotScalarWhereWithAggregatesInput[]
    NOT?: PriceSnapshotScalarWhereWithAggregatesInput | PriceSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PriceSnapshot"> | string
    propertyId?: StringWithAggregatesFilter<"PriceSnapshot"> | string
    bookingId?: StringWithAggregatesFilter<"PriceSnapshot"> | string
    currency?: EnumCurrencyWithAggregatesFilter<"PriceSnapshot"> | $Enums.Currency
    nightsCount?: IntWithAggregatesFilter<"PriceSnapshot"> | number
    nightlyRateMinor?: IntWithAggregatesFilter<"PriceSnapshot"> | number
    subtotalMinor?: IntWithAggregatesFilter<"PriceSnapshot"> | number
    discountsMinor?: IntWithAggregatesFilter<"PriceSnapshot"> | number
    taxesMinor?: IntWithAggregatesFilter<"PriceSnapshot"> | number
    feesMinor?: IntWithAggregatesFilter<"PriceSnapshot"> | number
    totalAmountMinor?: IntWithAggregatesFilter<"PriceSnapshot"> | number
    pricingVersion?: IntWithAggregatesFilter<"PriceSnapshot"> | number
    promotionCode?: StringNullableWithAggregatesFilter<"PriceSnapshot"> | string | null
    capturedAt?: DateTimeWithAggregatesFilter<"PriceSnapshot"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PriceSnapshot"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PriceSnapshot"> | Date | string
  }

  export type PaymentIntentWhereInput = {
    AND?: PaymentIntentWhereInput | PaymentIntentWhereInput[]
    OR?: PaymentIntentWhereInput[]
    NOT?: PaymentIntentWhereInput | PaymentIntentWhereInput[]
    id?: StringFilter<"PaymentIntent"> | string
    propertyId?: StringFilter<"PaymentIntent"> | string
    bookingId?: StringFilter<"PaymentIntent"> | string
    amountMinor?: IntFilter<"PaymentIntent"> | number
    currency?: EnumCurrencyFilter<"PaymentIntent"> | $Enums.Currency
    method?: EnumPaymentMethodFilter<"PaymentIntent"> | $Enums.PaymentMethod
    provider?: EnumPaymentProviderFilter<"PaymentIntent"> | $Enums.PaymentProvider
    status?: EnumPaymentStatusFilter<"PaymentIntent"> | $Enums.PaymentStatus
    providerIntentRef?: StringNullableFilter<"PaymentIntent"> | string | null
    providerCustomerRef?: StringNullableFilter<"PaymentIntent"> | string | null
    idempotencyKey?: StringNullableFilter<"PaymentIntent"> | string | null
    metadata?: JsonNullableFilter<"PaymentIntent">
    createdAt?: DateTimeFilter<"PaymentIntent"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentIntent"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
    transactions?: PaymentTransactionListRelationFilter
    providerEvents?: ProviderEventListRelationFilter
  }

  export type PaymentIntentOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    method?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    providerIntentRef?: SortOrderInput | SortOrder
    providerCustomerRef?: SortOrderInput | SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
    booking?: BookingOrderByWithRelationInput
    transactions?: PaymentTransactionOrderByRelationAggregateInput
    providerEvents?: ProviderEventOrderByRelationAggregateInput
  }

  export type PaymentIntentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idempotencyKey?: string
    provider_providerIntentRef?: PaymentIntentProviderProviderIntentRefCompoundUniqueInput
    AND?: PaymentIntentWhereInput | PaymentIntentWhereInput[]
    OR?: PaymentIntentWhereInput[]
    NOT?: PaymentIntentWhereInput | PaymentIntentWhereInput[]
    propertyId?: StringFilter<"PaymentIntent"> | string
    bookingId?: StringFilter<"PaymentIntent"> | string
    amountMinor?: IntFilter<"PaymentIntent"> | number
    currency?: EnumCurrencyFilter<"PaymentIntent"> | $Enums.Currency
    method?: EnumPaymentMethodFilter<"PaymentIntent"> | $Enums.PaymentMethod
    provider?: EnumPaymentProviderFilter<"PaymentIntent"> | $Enums.PaymentProvider
    status?: EnumPaymentStatusFilter<"PaymentIntent"> | $Enums.PaymentStatus
    providerIntentRef?: StringNullableFilter<"PaymentIntent"> | string | null
    providerCustomerRef?: StringNullableFilter<"PaymentIntent"> | string | null
    metadata?: JsonNullableFilter<"PaymentIntent">
    createdAt?: DateTimeFilter<"PaymentIntent"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentIntent"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
    transactions?: PaymentTransactionListRelationFilter
    providerEvents?: ProviderEventListRelationFilter
  }, "id" | "provider_providerIntentRef" | "idempotencyKey">

  export type PaymentIntentOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    method?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    providerIntentRef?: SortOrderInput | SortOrder
    providerCustomerRef?: SortOrderInput | SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentIntentCountOrderByAggregateInput
    _avg?: PaymentIntentAvgOrderByAggregateInput
    _max?: PaymentIntentMaxOrderByAggregateInput
    _min?: PaymentIntentMinOrderByAggregateInput
    _sum?: PaymentIntentSumOrderByAggregateInput
  }

  export type PaymentIntentScalarWhereWithAggregatesInput = {
    AND?: PaymentIntentScalarWhereWithAggregatesInput | PaymentIntentScalarWhereWithAggregatesInput[]
    OR?: PaymentIntentScalarWhereWithAggregatesInput[]
    NOT?: PaymentIntentScalarWhereWithAggregatesInput | PaymentIntentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PaymentIntent"> | string
    propertyId?: StringWithAggregatesFilter<"PaymentIntent"> | string
    bookingId?: StringWithAggregatesFilter<"PaymentIntent"> | string
    amountMinor?: IntWithAggregatesFilter<"PaymentIntent"> | number
    currency?: EnumCurrencyWithAggregatesFilter<"PaymentIntent"> | $Enums.Currency
    method?: EnumPaymentMethodWithAggregatesFilter<"PaymentIntent"> | $Enums.PaymentMethod
    provider?: EnumPaymentProviderWithAggregatesFilter<"PaymentIntent"> | $Enums.PaymentProvider
    status?: EnumPaymentStatusWithAggregatesFilter<"PaymentIntent"> | $Enums.PaymentStatus
    providerIntentRef?: StringNullableWithAggregatesFilter<"PaymentIntent"> | string | null
    providerCustomerRef?: StringNullableWithAggregatesFilter<"PaymentIntent"> | string | null
    idempotencyKey?: StringNullableWithAggregatesFilter<"PaymentIntent"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"PaymentIntent">
    createdAt?: DateTimeWithAggregatesFilter<"PaymentIntent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PaymentIntent"> | Date | string
  }

  export type PaymentTransactionWhereInput = {
    AND?: PaymentTransactionWhereInput | PaymentTransactionWhereInput[]
    OR?: PaymentTransactionWhereInput[]
    NOT?: PaymentTransactionWhereInput | PaymentTransactionWhereInput[]
    id?: StringFilter<"PaymentTransaction"> | string
    paymentIntentId?: StringFilter<"PaymentTransaction"> | string
    status?: EnumPaymentStatusFilter<"PaymentTransaction"> | $Enums.PaymentStatus
    amountMinor?: IntFilter<"PaymentTransaction"> | number
    currency?: EnumCurrencyFilter<"PaymentTransaction"> | $Enums.Currency
    providerTxnRef?: StringNullableFilter<"PaymentTransaction"> | string | null
    externalReference?: StringNullableFilter<"PaymentTransaction"> | string | null
    message?: StringNullableFilter<"PaymentTransaction"> | string | null
    rawPayload?: JsonNullableFilter<"PaymentTransaction">
    sequence?: IntFilter<"PaymentTransaction"> | number
    occurredAt?: DateTimeFilter<"PaymentTransaction"> | Date | string
    createdAt?: DateTimeFilter<"PaymentTransaction"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentTransaction"> | Date | string
    paymentIntent?: XOR<PaymentIntentScalarRelationFilter, PaymentIntentWhereInput>
  }

  export type PaymentTransactionOrderByWithRelationInput = {
    id?: SortOrder
    paymentIntentId?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    providerTxnRef?: SortOrderInput | SortOrder
    externalReference?: SortOrderInput | SortOrder
    message?: SortOrderInput | SortOrder
    rawPayload?: SortOrderInput | SortOrder
    sequence?: SortOrder
    occurredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paymentIntent?: PaymentIntentOrderByWithRelationInput
  }

  export type PaymentTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    providerTxnRef?: string
    paymentIntentId_sequence?: PaymentTransactionPaymentIntentIdSequenceCompoundUniqueInput
    AND?: PaymentTransactionWhereInput | PaymentTransactionWhereInput[]
    OR?: PaymentTransactionWhereInput[]
    NOT?: PaymentTransactionWhereInput | PaymentTransactionWhereInput[]
    paymentIntentId?: StringFilter<"PaymentTransaction"> | string
    status?: EnumPaymentStatusFilter<"PaymentTransaction"> | $Enums.PaymentStatus
    amountMinor?: IntFilter<"PaymentTransaction"> | number
    currency?: EnumCurrencyFilter<"PaymentTransaction"> | $Enums.Currency
    externalReference?: StringNullableFilter<"PaymentTransaction"> | string | null
    message?: StringNullableFilter<"PaymentTransaction"> | string | null
    rawPayload?: JsonNullableFilter<"PaymentTransaction">
    sequence?: IntFilter<"PaymentTransaction"> | number
    occurredAt?: DateTimeFilter<"PaymentTransaction"> | Date | string
    createdAt?: DateTimeFilter<"PaymentTransaction"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentTransaction"> | Date | string
    paymentIntent?: XOR<PaymentIntentScalarRelationFilter, PaymentIntentWhereInput>
  }, "id" | "paymentIntentId_sequence" | "providerTxnRef">

  export type PaymentTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    paymentIntentId?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    providerTxnRef?: SortOrderInput | SortOrder
    externalReference?: SortOrderInput | SortOrder
    message?: SortOrderInput | SortOrder
    rawPayload?: SortOrderInput | SortOrder
    sequence?: SortOrder
    occurredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentTransactionCountOrderByAggregateInput
    _avg?: PaymentTransactionAvgOrderByAggregateInput
    _max?: PaymentTransactionMaxOrderByAggregateInput
    _min?: PaymentTransactionMinOrderByAggregateInput
    _sum?: PaymentTransactionSumOrderByAggregateInput
  }

  export type PaymentTransactionScalarWhereWithAggregatesInput = {
    AND?: PaymentTransactionScalarWhereWithAggregatesInput | PaymentTransactionScalarWhereWithAggregatesInput[]
    OR?: PaymentTransactionScalarWhereWithAggregatesInput[]
    NOT?: PaymentTransactionScalarWhereWithAggregatesInput | PaymentTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PaymentTransaction"> | string
    paymentIntentId?: StringWithAggregatesFilter<"PaymentTransaction"> | string
    status?: EnumPaymentStatusWithAggregatesFilter<"PaymentTransaction"> | $Enums.PaymentStatus
    amountMinor?: IntWithAggregatesFilter<"PaymentTransaction"> | number
    currency?: EnumCurrencyWithAggregatesFilter<"PaymentTransaction"> | $Enums.Currency
    providerTxnRef?: StringNullableWithAggregatesFilter<"PaymentTransaction"> | string | null
    externalReference?: StringNullableWithAggregatesFilter<"PaymentTransaction"> | string | null
    message?: StringNullableWithAggregatesFilter<"PaymentTransaction"> | string | null
    rawPayload?: JsonNullableWithAggregatesFilter<"PaymentTransaction">
    sequence?: IntWithAggregatesFilter<"PaymentTransaction"> | number
    occurredAt?: DateTimeWithAggregatesFilter<"PaymentTransaction"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PaymentTransaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PaymentTransaction"> | Date | string
  }

  export type ProviderEventWhereInput = {
    AND?: ProviderEventWhereInput | ProviderEventWhereInput[]
    OR?: ProviderEventWhereInput[]
    NOT?: ProviderEventWhereInput | ProviderEventWhereInput[]
    id?: StringFilter<"ProviderEvent"> | string
    provider?: StringFilter<"ProviderEvent"> | string
    eventId?: StringFilter<"ProviderEvent"> | string
    providerReference?: StringNullableFilter<"ProviderEvent"> | string | null
    paymentIntentId?: StringNullableFilter<"ProviderEvent"> | string | null
    status?: StringNullableFilter<"ProviderEvent"> | string | null
    signatureValid?: BoolFilter<"ProviderEvent"> | boolean
    rawPayload?: JsonFilter<"ProviderEvent">
    occurredAt?: DateTimeNullableFilter<"ProviderEvent"> | Date | string | null
    processedAt?: DateTimeNullableFilter<"ProviderEvent"> | Date | string | null
    createdAt?: DateTimeFilter<"ProviderEvent"> | Date | string
    updatedAt?: DateTimeFilter<"ProviderEvent"> | Date | string
    paymentIntent?: XOR<PaymentIntentNullableScalarRelationFilter, PaymentIntentWhereInput> | null
  }

  export type ProviderEventOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    eventId?: SortOrder
    providerReference?: SortOrderInput | SortOrder
    paymentIntentId?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    signatureValid?: SortOrder
    rawPayload?: SortOrder
    occurredAt?: SortOrderInput | SortOrder
    processedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paymentIntent?: PaymentIntentOrderByWithRelationInput
  }

  export type ProviderEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_eventId?: ProviderEventProviderEventIdCompoundUniqueInput
    AND?: ProviderEventWhereInput | ProviderEventWhereInput[]
    OR?: ProviderEventWhereInput[]
    NOT?: ProviderEventWhereInput | ProviderEventWhereInput[]
    provider?: StringFilter<"ProviderEvent"> | string
    eventId?: StringFilter<"ProviderEvent"> | string
    providerReference?: StringNullableFilter<"ProviderEvent"> | string | null
    paymentIntentId?: StringNullableFilter<"ProviderEvent"> | string | null
    status?: StringNullableFilter<"ProviderEvent"> | string | null
    signatureValid?: BoolFilter<"ProviderEvent"> | boolean
    rawPayload?: JsonFilter<"ProviderEvent">
    occurredAt?: DateTimeNullableFilter<"ProviderEvent"> | Date | string | null
    processedAt?: DateTimeNullableFilter<"ProviderEvent"> | Date | string | null
    createdAt?: DateTimeFilter<"ProviderEvent"> | Date | string
    updatedAt?: DateTimeFilter<"ProviderEvent"> | Date | string
    paymentIntent?: XOR<PaymentIntentNullableScalarRelationFilter, PaymentIntentWhereInput> | null
  }, "id" | "provider_eventId">

  export type ProviderEventOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    eventId?: SortOrder
    providerReference?: SortOrderInput | SortOrder
    paymentIntentId?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    signatureValid?: SortOrder
    rawPayload?: SortOrder
    occurredAt?: SortOrderInput | SortOrder
    processedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProviderEventCountOrderByAggregateInput
    _max?: ProviderEventMaxOrderByAggregateInput
    _min?: ProviderEventMinOrderByAggregateInput
  }

  export type ProviderEventScalarWhereWithAggregatesInput = {
    AND?: ProviderEventScalarWhereWithAggregatesInput | ProviderEventScalarWhereWithAggregatesInput[]
    OR?: ProviderEventScalarWhereWithAggregatesInput[]
    NOT?: ProviderEventScalarWhereWithAggregatesInput | ProviderEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProviderEvent"> | string
    provider?: StringWithAggregatesFilter<"ProviderEvent"> | string
    eventId?: StringWithAggregatesFilter<"ProviderEvent"> | string
    providerReference?: StringNullableWithAggregatesFilter<"ProviderEvent"> | string | null
    paymentIntentId?: StringNullableWithAggregatesFilter<"ProviderEvent"> | string | null
    status?: StringNullableWithAggregatesFilter<"ProviderEvent"> | string | null
    signatureValid?: BoolWithAggregatesFilter<"ProviderEvent"> | boolean
    rawPayload?: JsonWithAggregatesFilter<"ProviderEvent">
    occurredAt?: DateTimeNullableWithAggregatesFilter<"ProviderEvent"> | Date | string | null
    processedAt?: DateTimeNullableWithAggregatesFilter<"ProviderEvent"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProviderEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProviderEvent"> | Date | string
  }

  export type MessageThreadWhereInput = {
    AND?: MessageThreadWhereInput | MessageThreadWhereInput[]
    OR?: MessageThreadWhereInput[]
    NOT?: MessageThreadWhereInput | MessageThreadWhereInput[]
    id?: StringFilter<"MessageThread"> | string
    propertyId?: StringFilter<"MessageThread"> | string
    bookingId?: StringNullableFilter<"MessageThread"> | string | null
    subject?: StringNullableFilter<"MessageThread"> | string | null
    guestFullName?: StringFilter<"MessageThread"> | string
    guestEmail?: StringFilter<"MessageThread"> | string
    status?: EnumMessageThreadStatusFilter<"MessageThread"> | $Enums.MessageThreadStatus
    createdAt?: DateTimeFilter<"MessageThread"> | Date | string
    updatedAt?: DateTimeFilter<"MessageThread"> | Date | string
    lastMessageAt?: DateTimeNullableFilter<"MessageThread"> | Date | string | null
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    booking?: XOR<BookingNullableScalarRelationFilter, BookingWhereInput> | null
    messages?: MessageListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type MessageThreadOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrderInput | SortOrder
    subject?: SortOrderInput | SortOrder
    guestFullName?: SortOrder
    guestEmail?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastMessageAt?: SortOrderInput | SortOrder
    property?: PropertyOrderByWithRelationInput
    booking?: BookingOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type MessageThreadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageThreadWhereInput | MessageThreadWhereInput[]
    OR?: MessageThreadWhereInput[]
    NOT?: MessageThreadWhereInput | MessageThreadWhereInput[]
    propertyId?: StringFilter<"MessageThread"> | string
    bookingId?: StringNullableFilter<"MessageThread"> | string | null
    subject?: StringNullableFilter<"MessageThread"> | string | null
    guestFullName?: StringFilter<"MessageThread"> | string
    guestEmail?: StringFilter<"MessageThread"> | string
    status?: EnumMessageThreadStatusFilter<"MessageThread"> | $Enums.MessageThreadStatus
    createdAt?: DateTimeFilter<"MessageThread"> | Date | string
    updatedAt?: DateTimeFilter<"MessageThread"> | Date | string
    lastMessageAt?: DateTimeNullableFilter<"MessageThread"> | Date | string | null
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    booking?: XOR<BookingNullableScalarRelationFilter, BookingWhereInput> | null
    messages?: MessageListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id">

  export type MessageThreadOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrderInput | SortOrder
    subject?: SortOrderInput | SortOrder
    guestFullName?: SortOrder
    guestEmail?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastMessageAt?: SortOrderInput | SortOrder
    _count?: MessageThreadCountOrderByAggregateInput
    _max?: MessageThreadMaxOrderByAggregateInput
    _min?: MessageThreadMinOrderByAggregateInput
  }

  export type MessageThreadScalarWhereWithAggregatesInput = {
    AND?: MessageThreadScalarWhereWithAggregatesInput | MessageThreadScalarWhereWithAggregatesInput[]
    OR?: MessageThreadScalarWhereWithAggregatesInput[]
    NOT?: MessageThreadScalarWhereWithAggregatesInput | MessageThreadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MessageThread"> | string
    propertyId?: StringWithAggregatesFilter<"MessageThread"> | string
    bookingId?: StringNullableWithAggregatesFilter<"MessageThread"> | string | null
    subject?: StringNullableWithAggregatesFilter<"MessageThread"> | string | null
    guestFullName?: StringWithAggregatesFilter<"MessageThread"> | string
    guestEmail?: StringWithAggregatesFilter<"MessageThread"> | string
    status?: EnumMessageThreadStatusWithAggregatesFilter<"MessageThread"> | $Enums.MessageThreadStatus
    createdAt?: DateTimeWithAggregatesFilter<"MessageThread"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MessageThread"> | Date | string
    lastMessageAt?: DateTimeNullableWithAggregatesFilter<"MessageThread"> | Date | string | null
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    threadId?: StringFilter<"Message"> | string
    senderRole?: EnumRoleFilter<"Message"> | $Enums.Role
    senderUserId?: StringNullableFilter<"Message"> | string | null
    senderName?: StringNullableFilter<"Message"> | string | null
    body?: StringFilter<"Message"> | string
    isInternalNote?: BoolFilter<"Message"> | boolean
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    thread?: XOR<MessageThreadScalarRelationFilter, MessageThreadWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    threadId?: SortOrder
    senderRole?: SortOrder
    senderUserId?: SortOrderInput | SortOrder
    senderName?: SortOrderInput | SortOrder
    body?: SortOrder
    isInternalNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    thread?: MessageThreadOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    threadId?: StringFilter<"Message"> | string
    senderRole?: EnumRoleFilter<"Message"> | $Enums.Role
    senderUserId?: StringNullableFilter<"Message"> | string | null
    senderName?: StringNullableFilter<"Message"> | string | null
    body?: StringFilter<"Message"> | string
    isInternalNote?: BoolFilter<"Message"> | boolean
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    thread?: XOR<MessageThreadScalarRelationFilter, MessageThreadWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    threadId?: SortOrder
    senderRole?: SortOrder
    senderUserId?: SortOrderInput | SortOrder
    senderName?: SortOrderInput | SortOrder
    body?: SortOrder
    isInternalNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    threadId?: StringWithAggregatesFilter<"Message"> | string
    senderRole?: EnumRoleWithAggregatesFilter<"Message"> | $Enums.Role
    senderUserId?: StringNullableWithAggregatesFilter<"Message"> | string | null
    senderName?: StringNullableWithAggregatesFilter<"Message"> | string | null
    body?: StringWithAggregatesFilter<"Message"> | string
    isInternalNote?: BoolWithAggregatesFilter<"Message"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    propertyId?: StringFilter<"AuditLog"> | string
    bookingId?: StringNullableFilter<"AuditLog"> | string | null
    messageThreadId?: StringNullableFilter<"AuditLog"> | string | null
    actorRole?: EnumRoleFilter<"AuditLog"> | $Enums.Role
    actorUserId?: StringNullableFilter<"AuditLog"> | string | null
    actorEmail?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    requestId?: StringNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    booking?: XOR<BookingNullableScalarRelationFilter, BookingWhereInput> | null
    messageThread?: XOR<MessageThreadNullableScalarRelationFilter, MessageThreadWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrderInput | SortOrder
    messageThreadId?: SortOrderInput | SortOrder
    actorRole?: SortOrder
    actorUserId?: SortOrderInput | SortOrder
    actorEmail?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    requestId?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
    booking?: BookingOrderByWithRelationInput
    messageThread?: MessageThreadOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    propertyId?: StringFilter<"AuditLog"> | string
    bookingId?: StringNullableFilter<"AuditLog"> | string | null
    messageThreadId?: StringNullableFilter<"AuditLog"> | string | null
    actorRole?: EnumRoleFilter<"AuditLog"> | $Enums.Role
    actorUserId?: StringNullableFilter<"AuditLog"> | string | null
    actorEmail?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    requestId?: StringNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    booking?: XOR<BookingNullableScalarRelationFilter, BookingWhereInput> | null
    messageThread?: XOR<MessageThreadNullableScalarRelationFilter, MessageThreadWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrderInput | SortOrder
    messageThreadId?: SortOrderInput | SortOrder
    actorRole?: SortOrder
    actorUserId?: SortOrderInput | SortOrder
    actorEmail?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    requestId?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    propertyId?: StringWithAggregatesFilter<"AuditLog"> | string
    bookingId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    messageThreadId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    actorRole?: EnumRoleWithAggregatesFilter<"AuditLog"> | $Enums.Role
    actorUserId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    actorEmail?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entityType?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    requestId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"AuditLog">
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type PropertyCreateInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    city: string
    country: string
    addressLine1?: string | null
    addressLine2?: string | null
    postalCode?: string | null
    timezone?: string
    defaultCurrency?: $Enums.Currency
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    unitTypes?: UnitTypeCreateNestedManyWithoutPropertyInput
    units?: UnitCreateNestedManyWithoutPropertyInput
    bookings?: BookingCreateNestedManyWithoutPropertyInput
    priceSnapshots?: PriceSnapshotCreateNestedManyWithoutPropertyInput
    paymentIntents?: PaymentIntentCreateNestedManyWithoutPropertyInput
    messageThreads?: MessageThreadCreateNestedManyWithoutPropertyInput
    auditLogs?: AuditLogCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    city: string
    country: string
    addressLine1?: string | null
    addressLine2?: string | null
    postalCode?: string | null
    timezone?: string
    defaultCurrency?: $Enums.Currency
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    unitTypes?: UnitTypeUncheckedCreateNestedManyWithoutPropertyInput
    units?: UnitUncheckedCreateNestedManyWithoutPropertyInput
    bookings?: BookingUncheckedCreateNestedManyWithoutPropertyInput
    priceSnapshots?: PriceSnapshotUncheckedCreateNestedManyWithoutPropertyInput
    paymentIntents?: PaymentIntentUncheckedCreateNestedManyWithoutPropertyInput
    messageThreads?: MessageThreadUncheckedCreateNestedManyWithoutPropertyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unitTypes?: UnitTypeUpdateManyWithoutPropertyNestedInput
    units?: UnitUpdateManyWithoutPropertyNestedInput
    bookings?: BookingUpdateManyWithoutPropertyNestedInput
    priceSnapshots?: PriceSnapshotUpdateManyWithoutPropertyNestedInput
    paymentIntents?: PaymentIntentUpdateManyWithoutPropertyNestedInput
    messageThreads?: MessageThreadUpdateManyWithoutPropertyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unitTypes?: UnitTypeUncheckedUpdateManyWithoutPropertyNestedInput
    units?: UnitUncheckedUpdateManyWithoutPropertyNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutPropertyNestedInput
    priceSnapshots?: PriceSnapshotUncheckedUpdateManyWithoutPropertyNestedInput
    paymentIntents?: PaymentIntentUncheckedUpdateManyWithoutPropertyNestedInput
    messageThreads?: MessageThreadUncheckedUpdateManyWithoutPropertyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateManyInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    city: string
    country: string
    addressLine1?: string | null
    addressLine2?: string | null
    postalCode?: string | null
    timezone?: string
    defaultCurrency?: $Enums.Currency
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PropertyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UnitTypeCreateInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    coverImageUrl?: string | null
    galleryImageUrls?: UnitTypeCreategalleryImageUrlsInput | string[]
    estimatedRating?: number
    status?: $Enums.UnitTypeStatus
    maxGuests: number
    basePriceMinor: number
    currency?: $Enums.Currency
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutUnitTypesInput
    units?: UnitCreateNestedManyWithoutUnitTypeInput
  }

  export type UnitTypeUncheckedCreateInput = {
    id?: string
    propertyId: string
    slug: string
    name: string
    description?: string | null
    coverImageUrl?: string | null
    galleryImageUrls?: UnitTypeCreategalleryImageUrlsInput | string[]
    estimatedRating?: number
    status?: $Enums.UnitTypeStatus
    maxGuests: number
    basePriceMinor: number
    currency?: $Enums.Currency
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    units?: UnitUncheckedCreateNestedManyWithoutUnitTypeInput
  }

  export type UnitTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    galleryImageUrls?: UnitTypeUpdategalleryImageUrlsInput | string[]
    estimatedRating?: FloatFieldUpdateOperationsInput | number
    status?: EnumUnitTypeStatusFieldUpdateOperationsInput | $Enums.UnitTypeStatus
    maxGuests?: IntFieldUpdateOperationsInput | number
    basePriceMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutUnitTypesNestedInput
    units?: UnitUpdateManyWithoutUnitTypeNestedInput
  }

  export type UnitTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    galleryImageUrls?: UnitTypeUpdategalleryImageUrlsInput | string[]
    estimatedRating?: FloatFieldUpdateOperationsInput | number
    status?: EnumUnitTypeStatusFieldUpdateOperationsInput | $Enums.UnitTypeStatus
    maxGuests?: IntFieldUpdateOperationsInput | number
    basePriceMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    units?: UnitUncheckedUpdateManyWithoutUnitTypeNestedInput
  }

  export type UnitTypeCreateManyInput = {
    id?: string
    propertyId: string
    slug: string
    name: string
    description?: string | null
    coverImageUrl?: string | null
    galleryImageUrls?: UnitTypeCreategalleryImageUrlsInput | string[]
    estimatedRating?: number
    status?: $Enums.UnitTypeStatus
    maxGuests: number
    basePriceMinor: number
    currency?: $Enums.Currency
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UnitTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    galleryImageUrls?: UnitTypeUpdategalleryImageUrlsInput | string[]
    estimatedRating?: FloatFieldUpdateOperationsInput | number
    status?: EnumUnitTypeStatusFieldUpdateOperationsInput | $Enums.UnitTypeStatus
    maxGuests?: IntFieldUpdateOperationsInput | number
    basePriceMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UnitTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    galleryImageUrls?: UnitTypeUpdategalleryImageUrlsInput | string[]
    estimatedRating?: FloatFieldUpdateOperationsInput | number
    status?: EnumUnitTypeStatusFieldUpdateOperationsInput | $Enums.UnitTypeStatus
    maxGuests?: IntFieldUpdateOperationsInput | number
    basePriceMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UnitCreateInput = {
    id?: string
    code: string
    name?: string | null
    floor?: string | null
    status?: $Enums.UnitStatus
    isBookable?: boolean
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutUnitInput
    property: PropertyCreateNestedOneWithoutUnitsInput
    unitType: UnitTypeCreateNestedOneWithoutUnitsInput
  }

  export type UnitUncheckedCreateInput = {
    id?: string
    propertyId: string
    unitTypeId: string
    code: string
    name?: string | null
    floor?: string | null
    status?: $Enums.UnitStatus
    isBookable?: boolean
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutUnitInput
  }

  export type UnitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUnitStatusFieldUpdateOperationsInput | $Enums.UnitStatus
    isBookable?: BoolFieldUpdateOperationsInput | boolean
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutUnitNestedInput
    property?: PropertyUpdateOneRequiredWithoutUnitsNestedInput
    unitType?: UnitTypeUpdateOneRequiredWithoutUnitsNestedInput
  }

  export type UnitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    unitTypeId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUnitStatusFieldUpdateOperationsInput | $Enums.UnitStatus
    isBookable?: BoolFieldUpdateOperationsInput | boolean
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutUnitNestedInput
  }

  export type UnitCreateManyInput = {
    id?: string
    propertyId: string
    unitTypeId: string
    code: string
    name?: string | null
    floor?: string | null
    status?: $Enums.UnitStatus
    isBookable?: boolean
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UnitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUnitStatusFieldUpdateOperationsInput | $Enums.UnitStatus
    isBookable?: BoolFieldUpdateOperationsInput | boolean
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UnitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    unitTypeId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUnitStatusFieldUpdateOperationsInput | $Enums.UnitStatus
    isBookable?: BoolFieldUpdateOperationsInput | boolean
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateInput = {
    id?: string
    idempotencyKey?: string | null
    status?: $Enums.BookingStatus
    paymentStatus?: $Enums.PaymentStatus
    checkInDate: Date | string
    checkOutDate: Date | string
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount?: number
    currency?: $Enums.Currency
    totalAmountMinor: number
    notes?: string | null
    cancelledAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    priceSnapshot?: PriceSnapshotCreateNestedOneWithoutBookingInput
    paymentIntents?: PaymentIntentCreateNestedManyWithoutBookingInput
    messageThreads?: MessageThreadCreateNestedManyWithoutBookingInput
    auditLogs?: AuditLogCreateNestedManyWithoutBookingInput
    property: PropertyCreateNestedOneWithoutBookingsInput
    unit: UnitCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateInput = {
    id?: string
    propertyId: string
    unitId: string
    idempotencyKey?: string | null
    status?: $Enums.BookingStatus
    paymentStatus?: $Enums.PaymentStatus
    checkInDate: Date | string
    checkOutDate: Date | string
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount?: number
    currency?: $Enums.Currency
    totalAmountMinor: number
    notes?: string | null
    cancelledAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    priceSnapshot?: PriceSnapshotUncheckedCreateNestedOneWithoutBookingInput
    paymentIntents?: PaymentIntentUncheckedCreateNestedManyWithoutBookingInput
    messageThreads?: MessageThreadUncheckedCreateNestedManyWithoutBookingInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceSnapshot?: PriceSnapshotUpdateOneWithoutBookingNestedInput
    paymentIntents?: PaymentIntentUpdateManyWithoutBookingNestedInput
    messageThreads?: MessageThreadUpdateManyWithoutBookingNestedInput
    auditLogs?: AuditLogUpdateManyWithoutBookingNestedInput
    property?: PropertyUpdateOneRequiredWithoutBookingsNestedInput
    unit?: UnitUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceSnapshot?: PriceSnapshotUncheckedUpdateOneWithoutBookingNestedInput
    paymentIntents?: PaymentIntentUncheckedUpdateManyWithoutBookingNestedInput
    messageThreads?: MessageThreadUncheckedUpdateManyWithoutBookingNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingCreateManyInput = {
    id?: string
    propertyId: string
    unitId: string
    idempotencyKey?: string | null
    status?: $Enums.BookingStatus
    paymentStatus?: $Enums.PaymentStatus
    checkInDate: Date | string
    checkOutDate: Date | string
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount?: number
    currency?: $Enums.Currency
    totalAmountMinor: number
    notes?: string | null
    cancelledAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceSnapshotCreateInput = {
    id?: string
    currency: $Enums.Currency
    nightsCount: number
    nightlyRateMinor: number
    subtotalMinor: number
    discountsMinor?: number
    taxesMinor?: number
    feesMinor?: number
    totalAmountMinor: number
    pricingVersion?: number
    promotionCode?: string | null
    capturedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutPriceSnapshotsInput
    booking: BookingCreateNestedOneWithoutPriceSnapshotInput
  }

  export type PriceSnapshotUncheckedCreateInput = {
    id?: string
    propertyId: string
    bookingId: string
    currency: $Enums.Currency
    nightsCount: number
    nightlyRateMinor: number
    subtotalMinor: number
    discountsMinor?: number
    taxesMinor?: number
    feesMinor?: number
    totalAmountMinor: number
    pricingVersion?: number
    promotionCode?: string | null
    capturedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    nightsCount?: IntFieldUpdateOperationsInput | number
    nightlyRateMinor?: IntFieldUpdateOperationsInput | number
    subtotalMinor?: IntFieldUpdateOperationsInput | number
    discountsMinor?: IntFieldUpdateOperationsInput | number
    taxesMinor?: IntFieldUpdateOperationsInput | number
    feesMinor?: IntFieldUpdateOperationsInput | number
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    pricingVersion?: IntFieldUpdateOperationsInput | number
    promotionCode?: NullableStringFieldUpdateOperationsInput | string | null
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutPriceSnapshotsNestedInput
    booking?: BookingUpdateOneRequiredWithoutPriceSnapshotNestedInput
  }

  export type PriceSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    nightsCount?: IntFieldUpdateOperationsInput | number
    nightlyRateMinor?: IntFieldUpdateOperationsInput | number
    subtotalMinor?: IntFieldUpdateOperationsInput | number
    discountsMinor?: IntFieldUpdateOperationsInput | number
    taxesMinor?: IntFieldUpdateOperationsInput | number
    feesMinor?: IntFieldUpdateOperationsInput | number
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    pricingVersion?: IntFieldUpdateOperationsInput | number
    promotionCode?: NullableStringFieldUpdateOperationsInput | string | null
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceSnapshotCreateManyInput = {
    id?: string
    propertyId: string
    bookingId: string
    currency: $Enums.Currency
    nightsCount: number
    nightlyRateMinor: number
    subtotalMinor: number
    discountsMinor?: number
    taxesMinor?: number
    feesMinor?: number
    totalAmountMinor: number
    pricingVersion?: number
    promotionCode?: string | null
    capturedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    nightsCount?: IntFieldUpdateOperationsInput | number
    nightlyRateMinor?: IntFieldUpdateOperationsInput | number
    subtotalMinor?: IntFieldUpdateOperationsInput | number
    discountsMinor?: IntFieldUpdateOperationsInput | number
    taxesMinor?: IntFieldUpdateOperationsInput | number
    feesMinor?: IntFieldUpdateOperationsInput | number
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    pricingVersion?: IntFieldUpdateOperationsInput | number
    promotionCode?: NullableStringFieldUpdateOperationsInput | string | null
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    nightsCount?: IntFieldUpdateOperationsInput | number
    nightlyRateMinor?: IntFieldUpdateOperationsInput | number
    subtotalMinor?: IntFieldUpdateOperationsInput | number
    discountsMinor?: IntFieldUpdateOperationsInput | number
    taxesMinor?: IntFieldUpdateOperationsInput | number
    feesMinor?: IntFieldUpdateOperationsInput | number
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    pricingVersion?: IntFieldUpdateOperationsInput | number
    promotionCode?: NullableStringFieldUpdateOperationsInput | string | null
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentIntentCreateInput = {
    id?: string
    amountMinor: number
    currency: $Enums.Currency
    method: $Enums.PaymentMethod
    provider?: $Enums.PaymentProvider
    status?: $Enums.PaymentStatus
    providerIntentRef?: string | null
    providerCustomerRef?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutPaymentIntentsInput
    booking: BookingCreateNestedOneWithoutPaymentIntentsInput
    transactions?: PaymentTransactionCreateNestedManyWithoutPaymentIntentInput
    providerEvents?: ProviderEventCreateNestedManyWithoutPaymentIntentInput
  }

  export type PaymentIntentUncheckedCreateInput = {
    id?: string
    propertyId: string
    bookingId: string
    amountMinor: number
    currency: $Enums.Currency
    method: $Enums.PaymentMethod
    provider?: $Enums.PaymentProvider
    status?: $Enums.PaymentStatus
    providerIntentRef?: string | null
    providerCustomerRef?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: PaymentTransactionUncheckedCreateNestedManyWithoutPaymentIntentInput
    providerEvents?: ProviderEventUncheckedCreateNestedManyWithoutPaymentIntentInput
  }

  export type PaymentIntentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    providerIntentRef?: NullableStringFieldUpdateOperationsInput | string | null
    providerCustomerRef?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutPaymentIntentsNestedInput
    booking?: BookingUpdateOneRequiredWithoutPaymentIntentsNestedInput
    transactions?: PaymentTransactionUpdateManyWithoutPaymentIntentNestedInput
    providerEvents?: ProviderEventUpdateManyWithoutPaymentIntentNestedInput
  }

  export type PaymentIntentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    providerIntentRef?: NullableStringFieldUpdateOperationsInput | string | null
    providerCustomerRef?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: PaymentTransactionUncheckedUpdateManyWithoutPaymentIntentNestedInput
    providerEvents?: ProviderEventUncheckedUpdateManyWithoutPaymentIntentNestedInput
  }

  export type PaymentIntentCreateManyInput = {
    id?: string
    propertyId: string
    bookingId: string
    amountMinor: number
    currency: $Enums.Currency
    method: $Enums.PaymentMethod
    provider?: $Enums.PaymentProvider
    status?: $Enums.PaymentStatus
    providerIntentRef?: string | null
    providerCustomerRef?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentIntentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    providerIntentRef?: NullableStringFieldUpdateOperationsInput | string | null
    providerCustomerRef?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentIntentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    providerIntentRef?: NullableStringFieldUpdateOperationsInput | string | null
    providerCustomerRef?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentTransactionCreateInput = {
    id?: string
    status: $Enums.PaymentStatus
    amountMinor: number
    currency: $Enums.Currency
    providerTxnRef?: string | null
    externalReference?: string | null
    message?: string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    sequence: number
    occurredAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentIntent: PaymentIntentCreateNestedOneWithoutTransactionsInput
  }

  export type PaymentTransactionUncheckedCreateInput = {
    id?: string
    paymentIntentId: string
    status: $Enums.PaymentStatus
    amountMinor: number
    currency: $Enums.Currency
    providerTxnRef?: string | null
    externalReference?: string | null
    message?: string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    sequence: number
    occurredAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    providerTxnRef?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    sequence?: IntFieldUpdateOperationsInput | number
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentIntent?: PaymentIntentUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type PaymentTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    providerTxnRef?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    sequence?: IntFieldUpdateOperationsInput | number
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentTransactionCreateManyInput = {
    id?: string
    paymentIntentId: string
    status: $Enums.PaymentStatus
    amountMinor: number
    currency: $Enums.Currency
    providerTxnRef?: string | null
    externalReference?: string | null
    message?: string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    sequence: number
    occurredAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    providerTxnRef?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    sequence?: IntFieldUpdateOperationsInput | number
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    providerTxnRef?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    sequence?: IntFieldUpdateOperationsInput | number
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderEventCreateInput = {
    id?: string
    provider: string
    eventId: string
    providerReference?: string | null
    status?: string | null
    signatureValid: boolean
    rawPayload: JsonNullValueInput | InputJsonValue
    occurredAt?: Date | string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentIntent?: PaymentIntentCreateNestedOneWithoutProviderEventsInput
  }

  export type ProviderEventUncheckedCreateInput = {
    id?: string
    provider: string
    eventId: string
    providerReference?: string | null
    paymentIntentId?: string | null
    status?: string | null
    signatureValid: boolean
    rawPayload: JsonNullValueInput | InputJsonValue
    occurredAt?: Date | string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProviderEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    providerReference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    signatureValid?: BoolFieldUpdateOperationsInput | boolean
    rawPayload?: JsonNullValueInput | InputJsonValue
    occurredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentIntent?: PaymentIntentUpdateOneWithoutProviderEventsNestedInput
  }

  export type ProviderEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    providerReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    signatureValid?: BoolFieldUpdateOperationsInput | boolean
    rawPayload?: JsonNullValueInput | InputJsonValue
    occurredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderEventCreateManyInput = {
    id?: string
    provider: string
    eventId: string
    providerReference?: string | null
    paymentIntentId?: string | null
    status?: string | null
    signatureValid: boolean
    rawPayload: JsonNullValueInput | InputJsonValue
    occurredAt?: Date | string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProviderEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    providerReference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    signatureValid?: BoolFieldUpdateOperationsInput | boolean
    rawPayload?: JsonNullValueInput | InputJsonValue
    occurredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    providerReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    signatureValid?: BoolFieldUpdateOperationsInput | boolean
    rawPayload?: JsonNullValueInput | InputJsonValue
    occurredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageThreadCreateInput = {
    id?: string
    subject?: string | null
    guestFullName: string
    guestEmail: string
    status?: $Enums.MessageThreadStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string | null
    property: PropertyCreateNestedOneWithoutMessageThreadsInput
    booking?: BookingCreateNestedOneWithoutMessageThreadsInput
    messages?: MessageCreateNestedManyWithoutThreadInput
    auditLogs?: AuditLogCreateNestedManyWithoutMessageThreadInput
  }

  export type MessageThreadUncheckedCreateInput = {
    id?: string
    propertyId: string
    bookingId?: string | null
    subject?: string | null
    guestFullName: string
    guestEmail: string
    status?: $Enums.MessageThreadStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string | null
    messages?: MessageUncheckedCreateNestedManyWithoutThreadInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutMessageThreadInput
  }

  export type MessageThreadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageThreadStatusFieldUpdateOperationsInput | $Enums.MessageThreadStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property?: PropertyUpdateOneRequiredWithoutMessageThreadsNestedInput
    booking?: BookingUpdateOneWithoutMessageThreadsNestedInput
    messages?: MessageUpdateManyWithoutThreadNestedInput
    auditLogs?: AuditLogUpdateManyWithoutMessageThreadNestedInput
  }

  export type MessageThreadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageThreadStatusFieldUpdateOperationsInput | $Enums.MessageThreadStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUncheckedUpdateManyWithoutThreadNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutMessageThreadNestedInput
  }

  export type MessageThreadCreateManyInput = {
    id?: string
    propertyId: string
    bookingId?: string | null
    subject?: string | null
    guestFullName: string
    guestEmail: string
    status?: $Enums.MessageThreadStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string | null
  }

  export type MessageThreadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageThreadStatusFieldUpdateOperationsInput | $Enums.MessageThreadStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MessageThreadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageThreadStatusFieldUpdateOperationsInput | $Enums.MessageThreadStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MessageCreateInput = {
    id?: string
    senderRole: $Enums.Role
    senderUserId?: string | null
    senderName?: string | null
    body: string
    isInternalNote?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    thread: MessageThreadCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    threadId: string
    senderRole: $Enums.Role
    senderUserId?: string | null
    senderName?: string | null
    body: string
    isInternalNote?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    senderUserId?: NullableStringFieldUpdateOperationsInput | string | null
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isInternalNote?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thread?: MessageThreadUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    senderRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    senderUserId?: NullableStringFieldUpdateOperationsInput | string | null
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isInternalNote?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    threadId: string
    senderRole: $Enums.Role
    senderUserId?: string | null
    senderName?: string | null
    body: string
    isInternalNote?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    senderUserId?: NullableStringFieldUpdateOperationsInput | string | null
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isInternalNote?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    senderRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    senderUserId?: NullableStringFieldUpdateOperationsInput | string | null
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isInternalNote?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    actorRole: $Enums.Role
    actorUserId?: string | null
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    requestId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    property: PropertyCreateNestedOneWithoutAuditLogsInput
    booking?: BookingCreateNestedOneWithoutAuditLogsInput
    messageThread?: MessageThreadCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    propertyId: string
    bookingId?: string | null
    messageThreadId?: string | null
    actorRole: $Enums.Role
    actorUserId?: string | null
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    requestId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutAuditLogsNestedInput
    booking?: BookingUpdateOneWithoutAuditLogsNestedInput
    messageThread?: MessageThreadUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    messageThreadId?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    propertyId: string
    bookingId?: string | null
    messageThreadId?: string | null
    actorRole: $Enums.Role
    actorUserId?: string | null
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    requestId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    messageThreadId?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumCurrencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | EnumCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyFilter<$PrismaModel> | $Enums.Currency
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UnitTypeListRelationFilter = {
    every?: UnitTypeWhereInput
    some?: UnitTypeWhereInput
    none?: UnitTypeWhereInput
  }

  export type UnitListRelationFilter = {
    every?: UnitWhereInput
    some?: UnitWhereInput
    none?: UnitWhereInput
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type PriceSnapshotListRelationFilter = {
    every?: PriceSnapshotWhereInput
    some?: PriceSnapshotWhereInput
    none?: PriceSnapshotWhereInput
  }

  export type PaymentIntentListRelationFilter = {
    every?: PaymentIntentWhereInput
    some?: PaymentIntentWhereInput
    none?: PaymentIntentWhereInput
  }

  export type MessageThreadListRelationFilter = {
    every?: MessageThreadWhereInput
    some?: MessageThreadWhereInput
    none?: MessageThreadWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UnitTypeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UnitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PriceSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentIntentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageThreadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertyCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    city?: SortOrder
    country?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    postalCode?: SortOrder
    timezone?: SortOrder
    defaultCurrency?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertyMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    city?: SortOrder
    country?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    postalCode?: SortOrder
    timezone?: SortOrder
    defaultCurrency?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertyMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    city?: SortOrder
    country?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    postalCode?: SortOrder
    timezone?: SortOrder
    defaultCurrency?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumCurrencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | EnumCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyWithAggregatesFilter<$PrismaModel> | $Enums.Currency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCurrencyFilter<$PrismaModel>
    _max?: NestedEnumCurrencyFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumUnitTypeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UnitTypeStatus | EnumUnitTypeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UnitTypeStatus[] | ListEnumUnitTypeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UnitTypeStatus[] | ListEnumUnitTypeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUnitTypeStatusFilter<$PrismaModel> | $Enums.UnitTypeStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PropertyScalarRelationFilter = {
    is?: PropertyWhereInput
    isNot?: PropertyWhereInput
  }

  export type UnitTypePropertyIdSlugCompoundUniqueInput = {
    propertyId: string
    slug: string
  }

  export type UnitTypeCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    coverImageUrl?: SortOrder
    galleryImageUrls?: SortOrder
    estimatedRating?: SortOrder
    status?: SortOrder
    maxGuests?: SortOrder
    basePriceMinor?: SortOrder
    currency?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UnitTypeAvgOrderByAggregateInput = {
    estimatedRating?: SortOrder
    maxGuests?: SortOrder
    basePriceMinor?: SortOrder
    displayOrder?: SortOrder
  }

  export type UnitTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    coverImageUrl?: SortOrder
    estimatedRating?: SortOrder
    status?: SortOrder
    maxGuests?: SortOrder
    basePriceMinor?: SortOrder
    currency?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UnitTypeMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    coverImageUrl?: SortOrder
    estimatedRating?: SortOrder
    status?: SortOrder
    maxGuests?: SortOrder
    basePriceMinor?: SortOrder
    currency?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UnitTypeSumOrderByAggregateInput = {
    estimatedRating?: SortOrder
    maxGuests?: SortOrder
    basePriceMinor?: SortOrder
    displayOrder?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumUnitTypeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UnitTypeStatus | EnumUnitTypeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UnitTypeStatus[] | ListEnumUnitTypeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UnitTypeStatus[] | ListEnumUnitTypeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUnitTypeStatusWithAggregatesFilter<$PrismaModel> | $Enums.UnitTypeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUnitTypeStatusFilter<$PrismaModel>
    _max?: NestedEnumUnitTypeStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumUnitStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UnitStatus | EnumUnitStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UnitStatus[] | ListEnumUnitStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UnitStatus[] | ListEnumUnitStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUnitStatusFilter<$PrismaModel> | $Enums.UnitStatus
  }

  export type UnitTypeScalarRelationFilter = {
    is?: UnitTypeWhereInput
    isNot?: UnitTypeWhereInput
  }

  export type UnitPropertyIdCodeCompoundUniqueInput = {
    propertyId: string
    code: string
  }

  export type UnitCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    unitTypeId?: SortOrder
    code?: SortOrder
    name?: SortOrder
    floor?: SortOrder
    status?: SortOrder
    isBookable?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UnitMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    unitTypeId?: SortOrder
    code?: SortOrder
    name?: SortOrder
    floor?: SortOrder
    status?: SortOrder
    isBookable?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UnitMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    unitTypeId?: SortOrder
    code?: SortOrder
    name?: SortOrder
    floor?: SortOrder
    status?: SortOrder
    isBookable?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumUnitStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UnitStatus | EnumUnitStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UnitStatus[] | ListEnumUnitStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UnitStatus[] | ListEnumUnitStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUnitStatusWithAggregatesFilter<$PrismaModel> | $Enums.UnitStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUnitStatusFilter<$PrismaModel>
    _max?: NestedEnumUnitStatusFilter<$PrismaModel>
  }

  export type EnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PriceSnapshotNullableScalarRelationFilter = {
    is?: PriceSnapshotWhereInput | null
    isNot?: PriceSnapshotWhereInput | null
  }

  export type UnitScalarRelationFilter = {
    is?: UnitWhereInput
    isNot?: UnitWhereInput
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    unitId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    checkInDate?: SortOrder
    checkOutDate?: SortOrder
    guestFullName?: SortOrder
    guestEmail?: SortOrder
    guestPhone?: SortOrder
    adultsCount?: SortOrder
    childrenCount?: SortOrder
    currency?: SortOrder
    totalAmountMinor?: SortOrder
    notes?: SortOrder
    cancelledAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingAvgOrderByAggregateInput = {
    adultsCount?: SortOrder
    childrenCount?: SortOrder
    totalAmountMinor?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    unitId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    checkInDate?: SortOrder
    checkOutDate?: SortOrder
    guestFullName?: SortOrder
    guestEmail?: SortOrder
    guestPhone?: SortOrder
    adultsCount?: SortOrder
    childrenCount?: SortOrder
    currency?: SortOrder
    totalAmountMinor?: SortOrder
    notes?: SortOrder
    cancelledAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    unitId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    checkInDate?: SortOrder
    checkOutDate?: SortOrder
    guestFullName?: SortOrder
    guestEmail?: SortOrder
    guestPhone?: SortOrder
    adultsCount?: SortOrder
    childrenCount?: SortOrder
    currency?: SortOrder
    totalAmountMinor?: SortOrder
    notes?: SortOrder
    cancelledAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingSumOrderByAggregateInput = {
    adultsCount?: SortOrder
    childrenCount?: SortOrder
    totalAmountMinor?: SortOrder
  }

  export type EnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BookingScalarRelationFilter = {
    is?: BookingWhereInput
    isNot?: BookingWhereInput
  }

  export type PriceSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    currency?: SortOrder
    nightsCount?: SortOrder
    nightlyRateMinor?: SortOrder
    subtotalMinor?: SortOrder
    discountsMinor?: SortOrder
    taxesMinor?: SortOrder
    feesMinor?: SortOrder
    totalAmountMinor?: SortOrder
    pricingVersion?: SortOrder
    promotionCode?: SortOrder
    capturedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceSnapshotAvgOrderByAggregateInput = {
    nightsCount?: SortOrder
    nightlyRateMinor?: SortOrder
    subtotalMinor?: SortOrder
    discountsMinor?: SortOrder
    taxesMinor?: SortOrder
    feesMinor?: SortOrder
    totalAmountMinor?: SortOrder
    pricingVersion?: SortOrder
  }

  export type PriceSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    currency?: SortOrder
    nightsCount?: SortOrder
    nightlyRateMinor?: SortOrder
    subtotalMinor?: SortOrder
    discountsMinor?: SortOrder
    taxesMinor?: SortOrder
    feesMinor?: SortOrder
    totalAmountMinor?: SortOrder
    pricingVersion?: SortOrder
    promotionCode?: SortOrder
    capturedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    currency?: SortOrder
    nightsCount?: SortOrder
    nightlyRateMinor?: SortOrder
    subtotalMinor?: SortOrder
    discountsMinor?: SortOrder
    taxesMinor?: SortOrder
    feesMinor?: SortOrder
    totalAmountMinor?: SortOrder
    pricingVersion?: SortOrder
    promotionCode?: SortOrder
    capturedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceSnapshotSumOrderByAggregateInput = {
    nightsCount?: SortOrder
    nightlyRateMinor?: SortOrder
    subtotalMinor?: SortOrder
    discountsMinor?: SortOrder
    taxesMinor?: SortOrder
    feesMinor?: SortOrder
    totalAmountMinor?: SortOrder
    pricingVersion?: SortOrder
  }

  export type EnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type EnumPaymentProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentProvider | EnumPaymentProviderFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentProvider[] | ListEnumPaymentProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentProvider[] | ListEnumPaymentProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentProviderFilter<$PrismaModel> | $Enums.PaymentProvider
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PaymentTransactionListRelationFilter = {
    every?: PaymentTransactionWhereInput
    some?: PaymentTransactionWhereInput
    none?: PaymentTransactionWhereInput
  }

  export type ProviderEventListRelationFilter = {
    every?: ProviderEventWhereInput
    some?: ProviderEventWhereInput
    none?: ProviderEventWhereInput
  }

  export type PaymentTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProviderEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentIntentProviderProviderIntentRefCompoundUniqueInput = {
    provider: $Enums.PaymentProvider
    providerIntentRef: string
  }

  export type PaymentIntentCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    method?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    providerIntentRef?: SortOrder
    providerCustomerRef?: SortOrder
    idempotencyKey?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentIntentAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type PaymentIntentMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    method?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    providerIntentRef?: SortOrder
    providerCustomerRef?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentIntentMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    method?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    providerIntentRef?: SortOrder
    providerCustomerRef?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentIntentSumOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type EnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type EnumPaymentProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentProvider | EnumPaymentProviderFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentProvider[] | ListEnumPaymentProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentProvider[] | ListEnumPaymentProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentProviderWithAggregatesFilter<$PrismaModel> | $Enums.PaymentProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentProviderFilter<$PrismaModel>
    _max?: NestedEnumPaymentProviderFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type PaymentIntentScalarRelationFilter = {
    is?: PaymentIntentWhereInput
    isNot?: PaymentIntentWhereInput
  }

  export type PaymentTransactionPaymentIntentIdSequenceCompoundUniqueInput = {
    paymentIntentId: string
    sequence: number
  }

  export type PaymentTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    paymentIntentId?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    providerTxnRef?: SortOrder
    externalReference?: SortOrder
    message?: SortOrder
    rawPayload?: SortOrder
    sequence?: SortOrder
    occurredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentTransactionAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
    sequence?: SortOrder
  }

  export type PaymentTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    paymentIntentId?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    providerTxnRef?: SortOrder
    externalReference?: SortOrder
    message?: SortOrder
    sequence?: SortOrder
    occurredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    paymentIntentId?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    providerTxnRef?: SortOrder
    externalReference?: SortOrder
    message?: SortOrder
    sequence?: SortOrder
    occurredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentTransactionSumOrderByAggregateInput = {
    amountMinor?: SortOrder
    sequence?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PaymentIntentNullableScalarRelationFilter = {
    is?: PaymentIntentWhereInput | null
    isNot?: PaymentIntentWhereInput | null
  }

  export type ProviderEventProviderEventIdCompoundUniqueInput = {
    provider: string
    eventId: string
  }

  export type ProviderEventCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    eventId?: SortOrder
    providerReference?: SortOrder
    paymentIntentId?: SortOrder
    status?: SortOrder
    signatureValid?: SortOrder
    rawPayload?: SortOrder
    occurredAt?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProviderEventMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    eventId?: SortOrder
    providerReference?: SortOrder
    paymentIntentId?: SortOrder
    status?: SortOrder
    signatureValid?: SortOrder
    occurredAt?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProviderEventMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    eventId?: SortOrder
    providerReference?: SortOrder
    paymentIntentId?: SortOrder
    status?: SortOrder
    signatureValid?: SortOrder
    occurredAt?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumMessageThreadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageThreadStatus | EnumMessageThreadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MessageThreadStatus[] | ListEnumMessageThreadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageThreadStatus[] | ListEnumMessageThreadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageThreadStatusFilter<$PrismaModel> | $Enums.MessageThreadStatus
  }

  export type BookingNullableScalarRelationFilter = {
    is?: BookingWhereInput | null
    isNot?: BookingWhereInput | null
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageThreadCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    subject?: SortOrder
    guestFullName?: SortOrder
    guestEmail?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastMessageAt?: SortOrder
  }

  export type MessageThreadMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    subject?: SortOrder
    guestFullName?: SortOrder
    guestEmail?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastMessageAt?: SortOrder
  }

  export type MessageThreadMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    subject?: SortOrder
    guestFullName?: SortOrder
    guestEmail?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastMessageAt?: SortOrder
  }

  export type EnumMessageThreadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageThreadStatus | EnumMessageThreadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MessageThreadStatus[] | ListEnumMessageThreadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageThreadStatus[] | ListEnumMessageThreadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageThreadStatusWithAggregatesFilter<$PrismaModel> | $Enums.MessageThreadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageThreadStatusFilter<$PrismaModel>
    _max?: NestedEnumMessageThreadStatusFilter<$PrismaModel>
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type MessageThreadScalarRelationFilter = {
    is?: MessageThreadWhereInput
    isNot?: MessageThreadWhereInput
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    senderRole?: SortOrder
    senderUserId?: SortOrder
    senderName?: SortOrder
    body?: SortOrder
    isInternalNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    senderRole?: SortOrder
    senderUserId?: SortOrder
    senderName?: SortOrder
    body?: SortOrder
    isInternalNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    senderRole?: SortOrder
    senderUserId?: SortOrder
    senderName?: SortOrder
    body?: SortOrder
    isInternalNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type MessageThreadNullableScalarRelationFilter = {
    is?: MessageThreadWhereInput | null
    isNot?: MessageThreadWhereInput | null
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    messageThreadId?: SortOrder
    actorRole?: SortOrder
    actorUserId?: SortOrder
    actorEmail?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    requestId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    messageThreadId?: SortOrder
    actorRole?: SortOrder
    actorUserId?: SortOrder
    actorEmail?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    requestId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    messageThreadId?: SortOrder
    actorRole?: SortOrder
    actorUserId?: SortOrder
    actorEmail?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    requestId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type UnitTypeCreateNestedManyWithoutPropertyInput = {
    create?: XOR<UnitTypeCreateWithoutPropertyInput, UnitTypeUncheckedCreateWithoutPropertyInput> | UnitTypeCreateWithoutPropertyInput[] | UnitTypeUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: UnitTypeCreateOrConnectWithoutPropertyInput | UnitTypeCreateOrConnectWithoutPropertyInput[]
    createMany?: UnitTypeCreateManyPropertyInputEnvelope
    connect?: UnitTypeWhereUniqueInput | UnitTypeWhereUniqueInput[]
  }

  export type UnitCreateNestedManyWithoutPropertyInput = {
    create?: XOR<UnitCreateWithoutPropertyInput, UnitUncheckedCreateWithoutPropertyInput> | UnitCreateWithoutPropertyInput[] | UnitUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: UnitCreateOrConnectWithoutPropertyInput | UnitCreateOrConnectWithoutPropertyInput[]
    createMany?: UnitCreateManyPropertyInputEnvelope
    connect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutPropertyInput = {
    create?: XOR<BookingCreateWithoutPropertyInput, BookingUncheckedCreateWithoutPropertyInput> | BookingCreateWithoutPropertyInput[] | BookingUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutPropertyInput | BookingCreateOrConnectWithoutPropertyInput[]
    createMany?: BookingCreateManyPropertyInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type PriceSnapshotCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PriceSnapshotCreateWithoutPropertyInput, PriceSnapshotUncheckedCreateWithoutPropertyInput> | PriceSnapshotCreateWithoutPropertyInput[] | PriceSnapshotUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PriceSnapshotCreateOrConnectWithoutPropertyInput | PriceSnapshotCreateOrConnectWithoutPropertyInput[]
    createMany?: PriceSnapshotCreateManyPropertyInputEnvelope
    connect?: PriceSnapshotWhereUniqueInput | PriceSnapshotWhereUniqueInput[]
  }

  export type PaymentIntentCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PaymentIntentCreateWithoutPropertyInput, PaymentIntentUncheckedCreateWithoutPropertyInput> | PaymentIntentCreateWithoutPropertyInput[] | PaymentIntentUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PaymentIntentCreateOrConnectWithoutPropertyInput | PaymentIntentCreateOrConnectWithoutPropertyInput[]
    createMany?: PaymentIntentCreateManyPropertyInputEnvelope
    connect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
  }

  export type MessageThreadCreateNestedManyWithoutPropertyInput = {
    create?: XOR<MessageThreadCreateWithoutPropertyInput, MessageThreadUncheckedCreateWithoutPropertyInput> | MessageThreadCreateWithoutPropertyInput[] | MessageThreadUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: MessageThreadCreateOrConnectWithoutPropertyInput | MessageThreadCreateOrConnectWithoutPropertyInput[]
    createMany?: MessageThreadCreateManyPropertyInputEnvelope
    connect?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutPropertyInput = {
    create?: XOR<AuditLogCreateWithoutPropertyInput, AuditLogUncheckedCreateWithoutPropertyInput> | AuditLogCreateWithoutPropertyInput[] | AuditLogUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPropertyInput | AuditLogCreateOrConnectWithoutPropertyInput[]
    createMany?: AuditLogCreateManyPropertyInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type UnitTypeUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<UnitTypeCreateWithoutPropertyInput, UnitTypeUncheckedCreateWithoutPropertyInput> | UnitTypeCreateWithoutPropertyInput[] | UnitTypeUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: UnitTypeCreateOrConnectWithoutPropertyInput | UnitTypeCreateOrConnectWithoutPropertyInput[]
    createMany?: UnitTypeCreateManyPropertyInputEnvelope
    connect?: UnitTypeWhereUniqueInput | UnitTypeWhereUniqueInput[]
  }

  export type UnitUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<UnitCreateWithoutPropertyInput, UnitUncheckedCreateWithoutPropertyInput> | UnitCreateWithoutPropertyInput[] | UnitUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: UnitCreateOrConnectWithoutPropertyInput | UnitCreateOrConnectWithoutPropertyInput[]
    createMany?: UnitCreateManyPropertyInputEnvelope
    connect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<BookingCreateWithoutPropertyInput, BookingUncheckedCreateWithoutPropertyInput> | BookingCreateWithoutPropertyInput[] | BookingUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutPropertyInput | BookingCreateOrConnectWithoutPropertyInput[]
    createMany?: BookingCreateManyPropertyInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type PriceSnapshotUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PriceSnapshotCreateWithoutPropertyInput, PriceSnapshotUncheckedCreateWithoutPropertyInput> | PriceSnapshotCreateWithoutPropertyInput[] | PriceSnapshotUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PriceSnapshotCreateOrConnectWithoutPropertyInput | PriceSnapshotCreateOrConnectWithoutPropertyInput[]
    createMany?: PriceSnapshotCreateManyPropertyInputEnvelope
    connect?: PriceSnapshotWhereUniqueInput | PriceSnapshotWhereUniqueInput[]
  }

  export type PaymentIntentUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PaymentIntentCreateWithoutPropertyInput, PaymentIntentUncheckedCreateWithoutPropertyInput> | PaymentIntentCreateWithoutPropertyInput[] | PaymentIntentUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PaymentIntentCreateOrConnectWithoutPropertyInput | PaymentIntentCreateOrConnectWithoutPropertyInput[]
    createMany?: PaymentIntentCreateManyPropertyInputEnvelope
    connect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
  }

  export type MessageThreadUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<MessageThreadCreateWithoutPropertyInput, MessageThreadUncheckedCreateWithoutPropertyInput> | MessageThreadCreateWithoutPropertyInput[] | MessageThreadUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: MessageThreadCreateOrConnectWithoutPropertyInput | MessageThreadCreateOrConnectWithoutPropertyInput[]
    createMany?: MessageThreadCreateManyPropertyInputEnvelope
    connect?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<AuditLogCreateWithoutPropertyInput, AuditLogUncheckedCreateWithoutPropertyInput> | AuditLogCreateWithoutPropertyInput[] | AuditLogUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPropertyInput | AuditLogCreateOrConnectWithoutPropertyInput[]
    createMany?: AuditLogCreateManyPropertyInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumCurrencyFieldUpdateOperationsInput = {
    set?: $Enums.Currency
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UnitTypeUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<UnitTypeCreateWithoutPropertyInput, UnitTypeUncheckedCreateWithoutPropertyInput> | UnitTypeCreateWithoutPropertyInput[] | UnitTypeUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: UnitTypeCreateOrConnectWithoutPropertyInput | UnitTypeCreateOrConnectWithoutPropertyInput[]
    upsert?: UnitTypeUpsertWithWhereUniqueWithoutPropertyInput | UnitTypeUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: UnitTypeCreateManyPropertyInputEnvelope
    set?: UnitTypeWhereUniqueInput | UnitTypeWhereUniqueInput[]
    disconnect?: UnitTypeWhereUniqueInput | UnitTypeWhereUniqueInput[]
    delete?: UnitTypeWhereUniqueInput | UnitTypeWhereUniqueInput[]
    connect?: UnitTypeWhereUniqueInput | UnitTypeWhereUniqueInput[]
    update?: UnitTypeUpdateWithWhereUniqueWithoutPropertyInput | UnitTypeUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: UnitTypeUpdateManyWithWhereWithoutPropertyInput | UnitTypeUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: UnitTypeScalarWhereInput | UnitTypeScalarWhereInput[]
  }

  export type UnitUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<UnitCreateWithoutPropertyInput, UnitUncheckedCreateWithoutPropertyInput> | UnitCreateWithoutPropertyInput[] | UnitUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: UnitCreateOrConnectWithoutPropertyInput | UnitCreateOrConnectWithoutPropertyInput[]
    upsert?: UnitUpsertWithWhereUniqueWithoutPropertyInput | UnitUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: UnitCreateManyPropertyInputEnvelope
    set?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    disconnect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    delete?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    connect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    update?: UnitUpdateWithWhereUniqueWithoutPropertyInput | UnitUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: UnitUpdateManyWithWhereWithoutPropertyInput | UnitUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: UnitScalarWhereInput | UnitScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<BookingCreateWithoutPropertyInput, BookingUncheckedCreateWithoutPropertyInput> | BookingCreateWithoutPropertyInput[] | BookingUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutPropertyInput | BookingCreateOrConnectWithoutPropertyInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutPropertyInput | BookingUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: BookingCreateManyPropertyInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutPropertyInput | BookingUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutPropertyInput | BookingUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type PriceSnapshotUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PriceSnapshotCreateWithoutPropertyInput, PriceSnapshotUncheckedCreateWithoutPropertyInput> | PriceSnapshotCreateWithoutPropertyInput[] | PriceSnapshotUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PriceSnapshotCreateOrConnectWithoutPropertyInput | PriceSnapshotCreateOrConnectWithoutPropertyInput[]
    upsert?: PriceSnapshotUpsertWithWhereUniqueWithoutPropertyInput | PriceSnapshotUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PriceSnapshotCreateManyPropertyInputEnvelope
    set?: PriceSnapshotWhereUniqueInput | PriceSnapshotWhereUniqueInput[]
    disconnect?: PriceSnapshotWhereUniqueInput | PriceSnapshotWhereUniqueInput[]
    delete?: PriceSnapshotWhereUniqueInput | PriceSnapshotWhereUniqueInput[]
    connect?: PriceSnapshotWhereUniqueInput | PriceSnapshotWhereUniqueInput[]
    update?: PriceSnapshotUpdateWithWhereUniqueWithoutPropertyInput | PriceSnapshotUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PriceSnapshotUpdateManyWithWhereWithoutPropertyInput | PriceSnapshotUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PriceSnapshotScalarWhereInput | PriceSnapshotScalarWhereInput[]
  }

  export type PaymentIntentUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PaymentIntentCreateWithoutPropertyInput, PaymentIntentUncheckedCreateWithoutPropertyInput> | PaymentIntentCreateWithoutPropertyInput[] | PaymentIntentUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PaymentIntentCreateOrConnectWithoutPropertyInput | PaymentIntentCreateOrConnectWithoutPropertyInput[]
    upsert?: PaymentIntentUpsertWithWhereUniqueWithoutPropertyInput | PaymentIntentUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PaymentIntentCreateManyPropertyInputEnvelope
    set?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    disconnect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    delete?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    connect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    update?: PaymentIntentUpdateWithWhereUniqueWithoutPropertyInput | PaymentIntentUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PaymentIntentUpdateManyWithWhereWithoutPropertyInput | PaymentIntentUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PaymentIntentScalarWhereInput | PaymentIntentScalarWhereInput[]
  }

  export type MessageThreadUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<MessageThreadCreateWithoutPropertyInput, MessageThreadUncheckedCreateWithoutPropertyInput> | MessageThreadCreateWithoutPropertyInput[] | MessageThreadUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: MessageThreadCreateOrConnectWithoutPropertyInput | MessageThreadCreateOrConnectWithoutPropertyInput[]
    upsert?: MessageThreadUpsertWithWhereUniqueWithoutPropertyInput | MessageThreadUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: MessageThreadCreateManyPropertyInputEnvelope
    set?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
    disconnect?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
    delete?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
    connect?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
    update?: MessageThreadUpdateWithWhereUniqueWithoutPropertyInput | MessageThreadUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: MessageThreadUpdateManyWithWhereWithoutPropertyInput | MessageThreadUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: MessageThreadScalarWhereInput | MessageThreadScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<AuditLogCreateWithoutPropertyInput, AuditLogUncheckedCreateWithoutPropertyInput> | AuditLogCreateWithoutPropertyInput[] | AuditLogUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPropertyInput | AuditLogCreateOrConnectWithoutPropertyInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutPropertyInput | AuditLogUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: AuditLogCreateManyPropertyInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutPropertyInput | AuditLogUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutPropertyInput | AuditLogUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UnitTypeUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<UnitTypeCreateWithoutPropertyInput, UnitTypeUncheckedCreateWithoutPropertyInput> | UnitTypeCreateWithoutPropertyInput[] | UnitTypeUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: UnitTypeCreateOrConnectWithoutPropertyInput | UnitTypeCreateOrConnectWithoutPropertyInput[]
    upsert?: UnitTypeUpsertWithWhereUniqueWithoutPropertyInput | UnitTypeUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: UnitTypeCreateManyPropertyInputEnvelope
    set?: UnitTypeWhereUniqueInput | UnitTypeWhereUniqueInput[]
    disconnect?: UnitTypeWhereUniqueInput | UnitTypeWhereUniqueInput[]
    delete?: UnitTypeWhereUniqueInput | UnitTypeWhereUniqueInput[]
    connect?: UnitTypeWhereUniqueInput | UnitTypeWhereUniqueInput[]
    update?: UnitTypeUpdateWithWhereUniqueWithoutPropertyInput | UnitTypeUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: UnitTypeUpdateManyWithWhereWithoutPropertyInput | UnitTypeUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: UnitTypeScalarWhereInput | UnitTypeScalarWhereInput[]
  }

  export type UnitUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<UnitCreateWithoutPropertyInput, UnitUncheckedCreateWithoutPropertyInput> | UnitCreateWithoutPropertyInput[] | UnitUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: UnitCreateOrConnectWithoutPropertyInput | UnitCreateOrConnectWithoutPropertyInput[]
    upsert?: UnitUpsertWithWhereUniqueWithoutPropertyInput | UnitUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: UnitCreateManyPropertyInputEnvelope
    set?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    disconnect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    delete?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    connect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    update?: UnitUpdateWithWhereUniqueWithoutPropertyInput | UnitUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: UnitUpdateManyWithWhereWithoutPropertyInput | UnitUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: UnitScalarWhereInput | UnitScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<BookingCreateWithoutPropertyInput, BookingUncheckedCreateWithoutPropertyInput> | BookingCreateWithoutPropertyInput[] | BookingUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutPropertyInput | BookingCreateOrConnectWithoutPropertyInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutPropertyInput | BookingUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: BookingCreateManyPropertyInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutPropertyInput | BookingUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutPropertyInput | BookingUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type PriceSnapshotUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PriceSnapshotCreateWithoutPropertyInput, PriceSnapshotUncheckedCreateWithoutPropertyInput> | PriceSnapshotCreateWithoutPropertyInput[] | PriceSnapshotUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PriceSnapshotCreateOrConnectWithoutPropertyInput | PriceSnapshotCreateOrConnectWithoutPropertyInput[]
    upsert?: PriceSnapshotUpsertWithWhereUniqueWithoutPropertyInput | PriceSnapshotUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PriceSnapshotCreateManyPropertyInputEnvelope
    set?: PriceSnapshotWhereUniqueInput | PriceSnapshotWhereUniqueInput[]
    disconnect?: PriceSnapshotWhereUniqueInput | PriceSnapshotWhereUniqueInput[]
    delete?: PriceSnapshotWhereUniqueInput | PriceSnapshotWhereUniqueInput[]
    connect?: PriceSnapshotWhereUniqueInput | PriceSnapshotWhereUniqueInput[]
    update?: PriceSnapshotUpdateWithWhereUniqueWithoutPropertyInput | PriceSnapshotUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PriceSnapshotUpdateManyWithWhereWithoutPropertyInput | PriceSnapshotUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PriceSnapshotScalarWhereInput | PriceSnapshotScalarWhereInput[]
  }

  export type PaymentIntentUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PaymentIntentCreateWithoutPropertyInput, PaymentIntentUncheckedCreateWithoutPropertyInput> | PaymentIntentCreateWithoutPropertyInput[] | PaymentIntentUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PaymentIntentCreateOrConnectWithoutPropertyInput | PaymentIntentCreateOrConnectWithoutPropertyInput[]
    upsert?: PaymentIntentUpsertWithWhereUniqueWithoutPropertyInput | PaymentIntentUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PaymentIntentCreateManyPropertyInputEnvelope
    set?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    disconnect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    delete?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    connect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    update?: PaymentIntentUpdateWithWhereUniqueWithoutPropertyInput | PaymentIntentUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PaymentIntentUpdateManyWithWhereWithoutPropertyInput | PaymentIntentUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PaymentIntentScalarWhereInput | PaymentIntentScalarWhereInput[]
  }

  export type MessageThreadUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<MessageThreadCreateWithoutPropertyInput, MessageThreadUncheckedCreateWithoutPropertyInput> | MessageThreadCreateWithoutPropertyInput[] | MessageThreadUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: MessageThreadCreateOrConnectWithoutPropertyInput | MessageThreadCreateOrConnectWithoutPropertyInput[]
    upsert?: MessageThreadUpsertWithWhereUniqueWithoutPropertyInput | MessageThreadUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: MessageThreadCreateManyPropertyInputEnvelope
    set?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
    disconnect?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
    delete?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
    connect?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
    update?: MessageThreadUpdateWithWhereUniqueWithoutPropertyInput | MessageThreadUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: MessageThreadUpdateManyWithWhereWithoutPropertyInput | MessageThreadUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: MessageThreadScalarWhereInput | MessageThreadScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<AuditLogCreateWithoutPropertyInput, AuditLogUncheckedCreateWithoutPropertyInput> | AuditLogCreateWithoutPropertyInput[] | AuditLogUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPropertyInput | AuditLogCreateOrConnectWithoutPropertyInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutPropertyInput | AuditLogUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: AuditLogCreateManyPropertyInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutPropertyInput | AuditLogUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutPropertyInput | AuditLogUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UnitTypeCreategalleryImageUrlsInput = {
    set: string[]
  }

  export type PropertyCreateNestedOneWithoutUnitTypesInput = {
    create?: XOR<PropertyCreateWithoutUnitTypesInput, PropertyUncheckedCreateWithoutUnitTypesInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutUnitTypesInput
    connect?: PropertyWhereUniqueInput
  }

  export type UnitCreateNestedManyWithoutUnitTypeInput = {
    create?: XOR<UnitCreateWithoutUnitTypeInput, UnitUncheckedCreateWithoutUnitTypeInput> | UnitCreateWithoutUnitTypeInput[] | UnitUncheckedCreateWithoutUnitTypeInput[]
    connectOrCreate?: UnitCreateOrConnectWithoutUnitTypeInput | UnitCreateOrConnectWithoutUnitTypeInput[]
    createMany?: UnitCreateManyUnitTypeInputEnvelope
    connect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
  }

  export type UnitUncheckedCreateNestedManyWithoutUnitTypeInput = {
    create?: XOR<UnitCreateWithoutUnitTypeInput, UnitUncheckedCreateWithoutUnitTypeInput> | UnitCreateWithoutUnitTypeInput[] | UnitUncheckedCreateWithoutUnitTypeInput[]
    connectOrCreate?: UnitCreateOrConnectWithoutUnitTypeInput | UnitCreateOrConnectWithoutUnitTypeInput[]
    createMany?: UnitCreateManyUnitTypeInputEnvelope
    connect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
  }

  export type UnitTypeUpdategalleryImageUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumUnitTypeStatusFieldUpdateOperationsInput = {
    set?: $Enums.UnitTypeStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PropertyUpdateOneRequiredWithoutUnitTypesNestedInput = {
    create?: XOR<PropertyCreateWithoutUnitTypesInput, PropertyUncheckedCreateWithoutUnitTypesInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutUnitTypesInput
    upsert?: PropertyUpsertWithoutUnitTypesInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutUnitTypesInput, PropertyUpdateWithoutUnitTypesInput>, PropertyUncheckedUpdateWithoutUnitTypesInput>
  }

  export type UnitUpdateManyWithoutUnitTypeNestedInput = {
    create?: XOR<UnitCreateWithoutUnitTypeInput, UnitUncheckedCreateWithoutUnitTypeInput> | UnitCreateWithoutUnitTypeInput[] | UnitUncheckedCreateWithoutUnitTypeInput[]
    connectOrCreate?: UnitCreateOrConnectWithoutUnitTypeInput | UnitCreateOrConnectWithoutUnitTypeInput[]
    upsert?: UnitUpsertWithWhereUniqueWithoutUnitTypeInput | UnitUpsertWithWhereUniqueWithoutUnitTypeInput[]
    createMany?: UnitCreateManyUnitTypeInputEnvelope
    set?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    disconnect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    delete?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    connect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    update?: UnitUpdateWithWhereUniqueWithoutUnitTypeInput | UnitUpdateWithWhereUniqueWithoutUnitTypeInput[]
    updateMany?: UnitUpdateManyWithWhereWithoutUnitTypeInput | UnitUpdateManyWithWhereWithoutUnitTypeInput[]
    deleteMany?: UnitScalarWhereInput | UnitScalarWhereInput[]
  }

  export type UnitUncheckedUpdateManyWithoutUnitTypeNestedInput = {
    create?: XOR<UnitCreateWithoutUnitTypeInput, UnitUncheckedCreateWithoutUnitTypeInput> | UnitCreateWithoutUnitTypeInput[] | UnitUncheckedCreateWithoutUnitTypeInput[]
    connectOrCreate?: UnitCreateOrConnectWithoutUnitTypeInput | UnitCreateOrConnectWithoutUnitTypeInput[]
    upsert?: UnitUpsertWithWhereUniqueWithoutUnitTypeInput | UnitUpsertWithWhereUniqueWithoutUnitTypeInput[]
    createMany?: UnitCreateManyUnitTypeInputEnvelope
    set?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    disconnect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    delete?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    connect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    update?: UnitUpdateWithWhereUniqueWithoutUnitTypeInput | UnitUpdateWithWhereUniqueWithoutUnitTypeInput[]
    updateMany?: UnitUpdateManyWithWhereWithoutUnitTypeInput | UnitUpdateManyWithWhereWithoutUnitTypeInput[]
    deleteMany?: UnitScalarWhereInput | UnitScalarWhereInput[]
  }

  export type BookingCreateNestedManyWithoutUnitInput = {
    create?: XOR<BookingCreateWithoutUnitInput, BookingUncheckedCreateWithoutUnitInput> | BookingCreateWithoutUnitInput[] | BookingUncheckedCreateWithoutUnitInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUnitInput | BookingCreateOrConnectWithoutUnitInput[]
    createMany?: BookingCreateManyUnitInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type PropertyCreateNestedOneWithoutUnitsInput = {
    create?: XOR<PropertyCreateWithoutUnitsInput, PropertyUncheckedCreateWithoutUnitsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutUnitsInput
    connect?: PropertyWhereUniqueInput
  }

  export type UnitTypeCreateNestedOneWithoutUnitsInput = {
    create?: XOR<UnitTypeCreateWithoutUnitsInput, UnitTypeUncheckedCreateWithoutUnitsInput>
    connectOrCreate?: UnitTypeCreateOrConnectWithoutUnitsInput
    connect?: UnitTypeWhereUniqueInput
  }

  export type BookingUncheckedCreateNestedManyWithoutUnitInput = {
    create?: XOR<BookingCreateWithoutUnitInput, BookingUncheckedCreateWithoutUnitInput> | BookingCreateWithoutUnitInput[] | BookingUncheckedCreateWithoutUnitInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUnitInput | BookingCreateOrConnectWithoutUnitInput[]
    createMany?: BookingCreateManyUnitInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type EnumUnitStatusFieldUpdateOperationsInput = {
    set?: $Enums.UnitStatus
  }

  export type BookingUpdateManyWithoutUnitNestedInput = {
    create?: XOR<BookingCreateWithoutUnitInput, BookingUncheckedCreateWithoutUnitInput> | BookingCreateWithoutUnitInput[] | BookingUncheckedCreateWithoutUnitInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUnitInput | BookingCreateOrConnectWithoutUnitInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutUnitInput | BookingUpsertWithWhereUniqueWithoutUnitInput[]
    createMany?: BookingCreateManyUnitInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutUnitInput | BookingUpdateWithWhereUniqueWithoutUnitInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutUnitInput | BookingUpdateManyWithWhereWithoutUnitInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type PropertyUpdateOneRequiredWithoutUnitsNestedInput = {
    create?: XOR<PropertyCreateWithoutUnitsInput, PropertyUncheckedCreateWithoutUnitsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutUnitsInput
    upsert?: PropertyUpsertWithoutUnitsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutUnitsInput, PropertyUpdateWithoutUnitsInput>, PropertyUncheckedUpdateWithoutUnitsInput>
  }

  export type UnitTypeUpdateOneRequiredWithoutUnitsNestedInput = {
    create?: XOR<UnitTypeCreateWithoutUnitsInput, UnitTypeUncheckedCreateWithoutUnitsInput>
    connectOrCreate?: UnitTypeCreateOrConnectWithoutUnitsInput
    upsert?: UnitTypeUpsertWithoutUnitsInput
    connect?: UnitTypeWhereUniqueInput
    update?: XOR<XOR<UnitTypeUpdateToOneWithWhereWithoutUnitsInput, UnitTypeUpdateWithoutUnitsInput>, UnitTypeUncheckedUpdateWithoutUnitsInput>
  }

  export type BookingUncheckedUpdateManyWithoutUnitNestedInput = {
    create?: XOR<BookingCreateWithoutUnitInput, BookingUncheckedCreateWithoutUnitInput> | BookingCreateWithoutUnitInput[] | BookingUncheckedCreateWithoutUnitInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUnitInput | BookingCreateOrConnectWithoutUnitInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutUnitInput | BookingUpsertWithWhereUniqueWithoutUnitInput[]
    createMany?: BookingCreateManyUnitInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutUnitInput | BookingUpdateWithWhereUniqueWithoutUnitInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutUnitInput | BookingUpdateManyWithWhereWithoutUnitInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type PriceSnapshotCreateNestedOneWithoutBookingInput = {
    create?: XOR<PriceSnapshotCreateWithoutBookingInput, PriceSnapshotUncheckedCreateWithoutBookingInput>
    connectOrCreate?: PriceSnapshotCreateOrConnectWithoutBookingInput
    connect?: PriceSnapshotWhereUniqueInput
  }

  export type PaymentIntentCreateNestedManyWithoutBookingInput = {
    create?: XOR<PaymentIntentCreateWithoutBookingInput, PaymentIntentUncheckedCreateWithoutBookingInput> | PaymentIntentCreateWithoutBookingInput[] | PaymentIntentUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: PaymentIntentCreateOrConnectWithoutBookingInput | PaymentIntentCreateOrConnectWithoutBookingInput[]
    createMany?: PaymentIntentCreateManyBookingInputEnvelope
    connect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
  }

  export type MessageThreadCreateNestedManyWithoutBookingInput = {
    create?: XOR<MessageThreadCreateWithoutBookingInput, MessageThreadUncheckedCreateWithoutBookingInput> | MessageThreadCreateWithoutBookingInput[] | MessageThreadUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: MessageThreadCreateOrConnectWithoutBookingInput | MessageThreadCreateOrConnectWithoutBookingInput[]
    createMany?: MessageThreadCreateManyBookingInputEnvelope
    connect?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutBookingInput = {
    create?: XOR<AuditLogCreateWithoutBookingInput, AuditLogUncheckedCreateWithoutBookingInput> | AuditLogCreateWithoutBookingInput[] | AuditLogUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutBookingInput | AuditLogCreateOrConnectWithoutBookingInput[]
    createMany?: AuditLogCreateManyBookingInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type PropertyCreateNestedOneWithoutBookingsInput = {
    create?: XOR<PropertyCreateWithoutBookingsInput, PropertyUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutBookingsInput
    connect?: PropertyWhereUniqueInput
  }

  export type UnitCreateNestedOneWithoutBookingsInput = {
    create?: XOR<UnitCreateWithoutBookingsInput, UnitUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UnitCreateOrConnectWithoutBookingsInput
    connect?: UnitWhereUniqueInput
  }

  export type PriceSnapshotUncheckedCreateNestedOneWithoutBookingInput = {
    create?: XOR<PriceSnapshotCreateWithoutBookingInput, PriceSnapshotUncheckedCreateWithoutBookingInput>
    connectOrCreate?: PriceSnapshotCreateOrConnectWithoutBookingInput
    connect?: PriceSnapshotWhereUniqueInput
  }

  export type PaymentIntentUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<PaymentIntentCreateWithoutBookingInput, PaymentIntentUncheckedCreateWithoutBookingInput> | PaymentIntentCreateWithoutBookingInput[] | PaymentIntentUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: PaymentIntentCreateOrConnectWithoutBookingInput | PaymentIntentCreateOrConnectWithoutBookingInput[]
    createMany?: PaymentIntentCreateManyBookingInputEnvelope
    connect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
  }

  export type MessageThreadUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<MessageThreadCreateWithoutBookingInput, MessageThreadUncheckedCreateWithoutBookingInput> | MessageThreadCreateWithoutBookingInput[] | MessageThreadUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: MessageThreadCreateOrConnectWithoutBookingInput | MessageThreadCreateOrConnectWithoutBookingInput[]
    createMany?: MessageThreadCreateManyBookingInputEnvelope
    connect?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<AuditLogCreateWithoutBookingInput, AuditLogUncheckedCreateWithoutBookingInput> | AuditLogCreateWithoutBookingInput[] | AuditLogUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutBookingInput | AuditLogCreateOrConnectWithoutBookingInput[]
    createMany?: AuditLogCreateManyBookingInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PriceSnapshotUpdateOneWithoutBookingNestedInput = {
    create?: XOR<PriceSnapshotCreateWithoutBookingInput, PriceSnapshotUncheckedCreateWithoutBookingInput>
    connectOrCreate?: PriceSnapshotCreateOrConnectWithoutBookingInput
    upsert?: PriceSnapshotUpsertWithoutBookingInput
    disconnect?: PriceSnapshotWhereInput | boolean
    delete?: PriceSnapshotWhereInput | boolean
    connect?: PriceSnapshotWhereUniqueInput
    update?: XOR<XOR<PriceSnapshotUpdateToOneWithWhereWithoutBookingInput, PriceSnapshotUpdateWithoutBookingInput>, PriceSnapshotUncheckedUpdateWithoutBookingInput>
  }

  export type PaymentIntentUpdateManyWithoutBookingNestedInput = {
    create?: XOR<PaymentIntentCreateWithoutBookingInput, PaymentIntentUncheckedCreateWithoutBookingInput> | PaymentIntentCreateWithoutBookingInput[] | PaymentIntentUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: PaymentIntentCreateOrConnectWithoutBookingInput | PaymentIntentCreateOrConnectWithoutBookingInput[]
    upsert?: PaymentIntentUpsertWithWhereUniqueWithoutBookingInput | PaymentIntentUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: PaymentIntentCreateManyBookingInputEnvelope
    set?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    disconnect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    delete?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    connect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    update?: PaymentIntentUpdateWithWhereUniqueWithoutBookingInput | PaymentIntentUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: PaymentIntentUpdateManyWithWhereWithoutBookingInput | PaymentIntentUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: PaymentIntentScalarWhereInput | PaymentIntentScalarWhereInput[]
  }

  export type MessageThreadUpdateManyWithoutBookingNestedInput = {
    create?: XOR<MessageThreadCreateWithoutBookingInput, MessageThreadUncheckedCreateWithoutBookingInput> | MessageThreadCreateWithoutBookingInput[] | MessageThreadUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: MessageThreadCreateOrConnectWithoutBookingInput | MessageThreadCreateOrConnectWithoutBookingInput[]
    upsert?: MessageThreadUpsertWithWhereUniqueWithoutBookingInput | MessageThreadUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: MessageThreadCreateManyBookingInputEnvelope
    set?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
    disconnect?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
    delete?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
    connect?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
    update?: MessageThreadUpdateWithWhereUniqueWithoutBookingInput | MessageThreadUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: MessageThreadUpdateManyWithWhereWithoutBookingInput | MessageThreadUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: MessageThreadScalarWhereInput | MessageThreadScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutBookingNestedInput = {
    create?: XOR<AuditLogCreateWithoutBookingInput, AuditLogUncheckedCreateWithoutBookingInput> | AuditLogCreateWithoutBookingInput[] | AuditLogUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutBookingInput | AuditLogCreateOrConnectWithoutBookingInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutBookingInput | AuditLogUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: AuditLogCreateManyBookingInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutBookingInput | AuditLogUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutBookingInput | AuditLogUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type PropertyUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<PropertyCreateWithoutBookingsInput, PropertyUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutBookingsInput
    upsert?: PropertyUpsertWithoutBookingsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutBookingsInput, PropertyUpdateWithoutBookingsInput>, PropertyUncheckedUpdateWithoutBookingsInput>
  }

  export type UnitUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<UnitCreateWithoutBookingsInput, UnitUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UnitCreateOrConnectWithoutBookingsInput
    upsert?: UnitUpsertWithoutBookingsInput
    connect?: UnitWhereUniqueInput
    update?: XOR<XOR<UnitUpdateToOneWithWhereWithoutBookingsInput, UnitUpdateWithoutBookingsInput>, UnitUncheckedUpdateWithoutBookingsInput>
  }

  export type PriceSnapshotUncheckedUpdateOneWithoutBookingNestedInput = {
    create?: XOR<PriceSnapshotCreateWithoutBookingInput, PriceSnapshotUncheckedCreateWithoutBookingInput>
    connectOrCreate?: PriceSnapshotCreateOrConnectWithoutBookingInput
    upsert?: PriceSnapshotUpsertWithoutBookingInput
    disconnect?: PriceSnapshotWhereInput | boolean
    delete?: PriceSnapshotWhereInput | boolean
    connect?: PriceSnapshotWhereUniqueInput
    update?: XOR<XOR<PriceSnapshotUpdateToOneWithWhereWithoutBookingInput, PriceSnapshotUpdateWithoutBookingInput>, PriceSnapshotUncheckedUpdateWithoutBookingInput>
  }

  export type PaymentIntentUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<PaymentIntentCreateWithoutBookingInput, PaymentIntentUncheckedCreateWithoutBookingInput> | PaymentIntentCreateWithoutBookingInput[] | PaymentIntentUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: PaymentIntentCreateOrConnectWithoutBookingInput | PaymentIntentCreateOrConnectWithoutBookingInput[]
    upsert?: PaymentIntentUpsertWithWhereUniqueWithoutBookingInput | PaymentIntentUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: PaymentIntentCreateManyBookingInputEnvelope
    set?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    disconnect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    delete?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    connect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    update?: PaymentIntentUpdateWithWhereUniqueWithoutBookingInput | PaymentIntentUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: PaymentIntentUpdateManyWithWhereWithoutBookingInput | PaymentIntentUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: PaymentIntentScalarWhereInput | PaymentIntentScalarWhereInput[]
  }

  export type MessageThreadUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<MessageThreadCreateWithoutBookingInput, MessageThreadUncheckedCreateWithoutBookingInput> | MessageThreadCreateWithoutBookingInput[] | MessageThreadUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: MessageThreadCreateOrConnectWithoutBookingInput | MessageThreadCreateOrConnectWithoutBookingInput[]
    upsert?: MessageThreadUpsertWithWhereUniqueWithoutBookingInput | MessageThreadUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: MessageThreadCreateManyBookingInputEnvelope
    set?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
    disconnect?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
    delete?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
    connect?: MessageThreadWhereUniqueInput | MessageThreadWhereUniqueInput[]
    update?: MessageThreadUpdateWithWhereUniqueWithoutBookingInput | MessageThreadUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: MessageThreadUpdateManyWithWhereWithoutBookingInput | MessageThreadUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: MessageThreadScalarWhereInput | MessageThreadScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<AuditLogCreateWithoutBookingInput, AuditLogUncheckedCreateWithoutBookingInput> | AuditLogCreateWithoutBookingInput[] | AuditLogUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutBookingInput | AuditLogCreateOrConnectWithoutBookingInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutBookingInput | AuditLogUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: AuditLogCreateManyBookingInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutBookingInput | AuditLogUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutBookingInput | AuditLogUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type PropertyCreateNestedOneWithoutPriceSnapshotsInput = {
    create?: XOR<PropertyCreateWithoutPriceSnapshotsInput, PropertyUncheckedCreateWithoutPriceSnapshotsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutPriceSnapshotsInput
    connect?: PropertyWhereUniqueInput
  }

  export type BookingCreateNestedOneWithoutPriceSnapshotInput = {
    create?: XOR<BookingCreateWithoutPriceSnapshotInput, BookingUncheckedCreateWithoutPriceSnapshotInput>
    connectOrCreate?: BookingCreateOrConnectWithoutPriceSnapshotInput
    connect?: BookingWhereUniqueInput
  }

  export type PropertyUpdateOneRequiredWithoutPriceSnapshotsNestedInput = {
    create?: XOR<PropertyCreateWithoutPriceSnapshotsInput, PropertyUncheckedCreateWithoutPriceSnapshotsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutPriceSnapshotsInput
    upsert?: PropertyUpsertWithoutPriceSnapshotsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutPriceSnapshotsInput, PropertyUpdateWithoutPriceSnapshotsInput>, PropertyUncheckedUpdateWithoutPriceSnapshotsInput>
  }

  export type BookingUpdateOneRequiredWithoutPriceSnapshotNestedInput = {
    create?: XOR<BookingCreateWithoutPriceSnapshotInput, BookingUncheckedCreateWithoutPriceSnapshotInput>
    connectOrCreate?: BookingCreateOrConnectWithoutPriceSnapshotInput
    upsert?: BookingUpsertWithoutPriceSnapshotInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutPriceSnapshotInput, BookingUpdateWithoutPriceSnapshotInput>, BookingUncheckedUpdateWithoutPriceSnapshotInput>
  }

  export type PropertyCreateNestedOneWithoutPaymentIntentsInput = {
    create?: XOR<PropertyCreateWithoutPaymentIntentsInput, PropertyUncheckedCreateWithoutPaymentIntentsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutPaymentIntentsInput
    connect?: PropertyWhereUniqueInput
  }

  export type BookingCreateNestedOneWithoutPaymentIntentsInput = {
    create?: XOR<BookingCreateWithoutPaymentIntentsInput, BookingUncheckedCreateWithoutPaymentIntentsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutPaymentIntentsInput
    connect?: BookingWhereUniqueInput
  }

  export type PaymentTransactionCreateNestedManyWithoutPaymentIntentInput = {
    create?: XOR<PaymentTransactionCreateWithoutPaymentIntentInput, PaymentTransactionUncheckedCreateWithoutPaymentIntentInput> | PaymentTransactionCreateWithoutPaymentIntentInput[] | PaymentTransactionUncheckedCreateWithoutPaymentIntentInput[]
    connectOrCreate?: PaymentTransactionCreateOrConnectWithoutPaymentIntentInput | PaymentTransactionCreateOrConnectWithoutPaymentIntentInput[]
    createMany?: PaymentTransactionCreateManyPaymentIntentInputEnvelope
    connect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
  }

  export type ProviderEventCreateNestedManyWithoutPaymentIntentInput = {
    create?: XOR<ProviderEventCreateWithoutPaymentIntentInput, ProviderEventUncheckedCreateWithoutPaymentIntentInput> | ProviderEventCreateWithoutPaymentIntentInput[] | ProviderEventUncheckedCreateWithoutPaymentIntentInput[]
    connectOrCreate?: ProviderEventCreateOrConnectWithoutPaymentIntentInput | ProviderEventCreateOrConnectWithoutPaymentIntentInput[]
    createMany?: ProviderEventCreateManyPaymentIntentInputEnvelope
    connect?: ProviderEventWhereUniqueInput | ProviderEventWhereUniqueInput[]
  }

  export type PaymentTransactionUncheckedCreateNestedManyWithoutPaymentIntentInput = {
    create?: XOR<PaymentTransactionCreateWithoutPaymentIntentInput, PaymentTransactionUncheckedCreateWithoutPaymentIntentInput> | PaymentTransactionCreateWithoutPaymentIntentInput[] | PaymentTransactionUncheckedCreateWithoutPaymentIntentInput[]
    connectOrCreate?: PaymentTransactionCreateOrConnectWithoutPaymentIntentInput | PaymentTransactionCreateOrConnectWithoutPaymentIntentInput[]
    createMany?: PaymentTransactionCreateManyPaymentIntentInputEnvelope
    connect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
  }

  export type ProviderEventUncheckedCreateNestedManyWithoutPaymentIntentInput = {
    create?: XOR<ProviderEventCreateWithoutPaymentIntentInput, ProviderEventUncheckedCreateWithoutPaymentIntentInput> | ProviderEventCreateWithoutPaymentIntentInput[] | ProviderEventUncheckedCreateWithoutPaymentIntentInput[]
    connectOrCreate?: ProviderEventCreateOrConnectWithoutPaymentIntentInput | ProviderEventCreateOrConnectWithoutPaymentIntentInput[]
    createMany?: ProviderEventCreateManyPaymentIntentInputEnvelope
    connect?: ProviderEventWhereUniqueInput | ProviderEventWhereUniqueInput[]
  }

  export type EnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod
  }

  export type EnumPaymentProviderFieldUpdateOperationsInput = {
    set?: $Enums.PaymentProvider
  }

  export type PropertyUpdateOneRequiredWithoutPaymentIntentsNestedInput = {
    create?: XOR<PropertyCreateWithoutPaymentIntentsInput, PropertyUncheckedCreateWithoutPaymentIntentsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutPaymentIntentsInput
    upsert?: PropertyUpsertWithoutPaymentIntentsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutPaymentIntentsInput, PropertyUpdateWithoutPaymentIntentsInput>, PropertyUncheckedUpdateWithoutPaymentIntentsInput>
  }

  export type BookingUpdateOneRequiredWithoutPaymentIntentsNestedInput = {
    create?: XOR<BookingCreateWithoutPaymentIntentsInput, BookingUncheckedCreateWithoutPaymentIntentsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutPaymentIntentsInput
    upsert?: BookingUpsertWithoutPaymentIntentsInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutPaymentIntentsInput, BookingUpdateWithoutPaymentIntentsInput>, BookingUncheckedUpdateWithoutPaymentIntentsInput>
  }

  export type PaymentTransactionUpdateManyWithoutPaymentIntentNestedInput = {
    create?: XOR<PaymentTransactionCreateWithoutPaymentIntentInput, PaymentTransactionUncheckedCreateWithoutPaymentIntentInput> | PaymentTransactionCreateWithoutPaymentIntentInput[] | PaymentTransactionUncheckedCreateWithoutPaymentIntentInput[]
    connectOrCreate?: PaymentTransactionCreateOrConnectWithoutPaymentIntentInput | PaymentTransactionCreateOrConnectWithoutPaymentIntentInput[]
    upsert?: PaymentTransactionUpsertWithWhereUniqueWithoutPaymentIntentInput | PaymentTransactionUpsertWithWhereUniqueWithoutPaymentIntentInput[]
    createMany?: PaymentTransactionCreateManyPaymentIntentInputEnvelope
    set?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    disconnect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    delete?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    connect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    update?: PaymentTransactionUpdateWithWhereUniqueWithoutPaymentIntentInput | PaymentTransactionUpdateWithWhereUniqueWithoutPaymentIntentInput[]
    updateMany?: PaymentTransactionUpdateManyWithWhereWithoutPaymentIntentInput | PaymentTransactionUpdateManyWithWhereWithoutPaymentIntentInput[]
    deleteMany?: PaymentTransactionScalarWhereInput | PaymentTransactionScalarWhereInput[]
  }

  export type ProviderEventUpdateManyWithoutPaymentIntentNestedInput = {
    create?: XOR<ProviderEventCreateWithoutPaymentIntentInput, ProviderEventUncheckedCreateWithoutPaymentIntentInput> | ProviderEventCreateWithoutPaymentIntentInput[] | ProviderEventUncheckedCreateWithoutPaymentIntentInput[]
    connectOrCreate?: ProviderEventCreateOrConnectWithoutPaymentIntentInput | ProviderEventCreateOrConnectWithoutPaymentIntentInput[]
    upsert?: ProviderEventUpsertWithWhereUniqueWithoutPaymentIntentInput | ProviderEventUpsertWithWhereUniqueWithoutPaymentIntentInput[]
    createMany?: ProviderEventCreateManyPaymentIntentInputEnvelope
    set?: ProviderEventWhereUniqueInput | ProviderEventWhereUniqueInput[]
    disconnect?: ProviderEventWhereUniqueInput | ProviderEventWhereUniqueInput[]
    delete?: ProviderEventWhereUniqueInput | ProviderEventWhereUniqueInput[]
    connect?: ProviderEventWhereUniqueInput | ProviderEventWhereUniqueInput[]
    update?: ProviderEventUpdateWithWhereUniqueWithoutPaymentIntentInput | ProviderEventUpdateWithWhereUniqueWithoutPaymentIntentInput[]
    updateMany?: ProviderEventUpdateManyWithWhereWithoutPaymentIntentInput | ProviderEventUpdateManyWithWhereWithoutPaymentIntentInput[]
    deleteMany?: ProviderEventScalarWhereInput | ProviderEventScalarWhereInput[]
  }

  export type PaymentTransactionUncheckedUpdateManyWithoutPaymentIntentNestedInput = {
    create?: XOR<PaymentTransactionCreateWithoutPaymentIntentInput, PaymentTransactionUncheckedCreateWithoutPaymentIntentInput> | PaymentTransactionCreateWithoutPaymentIntentInput[] | PaymentTransactionUncheckedCreateWithoutPaymentIntentInput[]
    connectOrCreate?: PaymentTransactionCreateOrConnectWithoutPaymentIntentInput | PaymentTransactionCreateOrConnectWithoutPaymentIntentInput[]
    upsert?: PaymentTransactionUpsertWithWhereUniqueWithoutPaymentIntentInput | PaymentTransactionUpsertWithWhereUniqueWithoutPaymentIntentInput[]
    createMany?: PaymentTransactionCreateManyPaymentIntentInputEnvelope
    set?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    disconnect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    delete?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    connect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    update?: PaymentTransactionUpdateWithWhereUniqueWithoutPaymentIntentInput | PaymentTransactionUpdateWithWhereUniqueWithoutPaymentIntentInput[]
    updateMany?: PaymentTransactionUpdateManyWithWhereWithoutPaymentIntentInput | PaymentTransactionUpdateManyWithWhereWithoutPaymentIntentInput[]
    deleteMany?: PaymentTransactionScalarWhereInput | PaymentTransactionScalarWhereInput[]
  }

  export type ProviderEventUncheckedUpdateManyWithoutPaymentIntentNestedInput = {
    create?: XOR<ProviderEventCreateWithoutPaymentIntentInput, ProviderEventUncheckedCreateWithoutPaymentIntentInput> | ProviderEventCreateWithoutPaymentIntentInput[] | ProviderEventUncheckedCreateWithoutPaymentIntentInput[]
    connectOrCreate?: ProviderEventCreateOrConnectWithoutPaymentIntentInput | ProviderEventCreateOrConnectWithoutPaymentIntentInput[]
    upsert?: ProviderEventUpsertWithWhereUniqueWithoutPaymentIntentInput | ProviderEventUpsertWithWhereUniqueWithoutPaymentIntentInput[]
    createMany?: ProviderEventCreateManyPaymentIntentInputEnvelope
    set?: ProviderEventWhereUniqueInput | ProviderEventWhereUniqueInput[]
    disconnect?: ProviderEventWhereUniqueInput | ProviderEventWhereUniqueInput[]
    delete?: ProviderEventWhereUniqueInput | ProviderEventWhereUniqueInput[]
    connect?: ProviderEventWhereUniqueInput | ProviderEventWhereUniqueInput[]
    update?: ProviderEventUpdateWithWhereUniqueWithoutPaymentIntentInput | ProviderEventUpdateWithWhereUniqueWithoutPaymentIntentInput[]
    updateMany?: ProviderEventUpdateManyWithWhereWithoutPaymentIntentInput | ProviderEventUpdateManyWithWhereWithoutPaymentIntentInput[]
    deleteMany?: ProviderEventScalarWhereInput | ProviderEventScalarWhereInput[]
  }

  export type PaymentIntentCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<PaymentIntentCreateWithoutTransactionsInput, PaymentIntentUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: PaymentIntentCreateOrConnectWithoutTransactionsInput
    connect?: PaymentIntentWhereUniqueInput
  }

  export type PaymentIntentUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<PaymentIntentCreateWithoutTransactionsInput, PaymentIntentUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: PaymentIntentCreateOrConnectWithoutTransactionsInput
    upsert?: PaymentIntentUpsertWithoutTransactionsInput
    connect?: PaymentIntentWhereUniqueInput
    update?: XOR<XOR<PaymentIntentUpdateToOneWithWhereWithoutTransactionsInput, PaymentIntentUpdateWithoutTransactionsInput>, PaymentIntentUncheckedUpdateWithoutTransactionsInput>
  }

  export type PaymentIntentCreateNestedOneWithoutProviderEventsInput = {
    create?: XOR<PaymentIntentCreateWithoutProviderEventsInput, PaymentIntentUncheckedCreateWithoutProviderEventsInput>
    connectOrCreate?: PaymentIntentCreateOrConnectWithoutProviderEventsInput
    connect?: PaymentIntentWhereUniqueInput
  }

  export type PaymentIntentUpdateOneWithoutProviderEventsNestedInput = {
    create?: XOR<PaymentIntentCreateWithoutProviderEventsInput, PaymentIntentUncheckedCreateWithoutProviderEventsInput>
    connectOrCreate?: PaymentIntentCreateOrConnectWithoutProviderEventsInput
    upsert?: PaymentIntentUpsertWithoutProviderEventsInput
    disconnect?: PaymentIntentWhereInput | boolean
    delete?: PaymentIntentWhereInput | boolean
    connect?: PaymentIntentWhereUniqueInput
    update?: XOR<XOR<PaymentIntentUpdateToOneWithWhereWithoutProviderEventsInput, PaymentIntentUpdateWithoutProviderEventsInput>, PaymentIntentUncheckedUpdateWithoutProviderEventsInput>
  }

  export type PropertyCreateNestedOneWithoutMessageThreadsInput = {
    create?: XOR<PropertyCreateWithoutMessageThreadsInput, PropertyUncheckedCreateWithoutMessageThreadsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutMessageThreadsInput
    connect?: PropertyWhereUniqueInput
  }

  export type BookingCreateNestedOneWithoutMessageThreadsInput = {
    create?: XOR<BookingCreateWithoutMessageThreadsInput, BookingUncheckedCreateWithoutMessageThreadsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutMessageThreadsInput
    connect?: BookingWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutThreadInput = {
    create?: XOR<MessageCreateWithoutThreadInput, MessageUncheckedCreateWithoutThreadInput> | MessageCreateWithoutThreadInput[] | MessageUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutThreadInput | MessageCreateOrConnectWithoutThreadInput[]
    createMany?: MessageCreateManyThreadInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutMessageThreadInput = {
    create?: XOR<AuditLogCreateWithoutMessageThreadInput, AuditLogUncheckedCreateWithoutMessageThreadInput> | AuditLogCreateWithoutMessageThreadInput[] | AuditLogUncheckedCreateWithoutMessageThreadInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutMessageThreadInput | AuditLogCreateOrConnectWithoutMessageThreadInput[]
    createMany?: AuditLogCreateManyMessageThreadInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutThreadInput = {
    create?: XOR<MessageCreateWithoutThreadInput, MessageUncheckedCreateWithoutThreadInput> | MessageCreateWithoutThreadInput[] | MessageUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutThreadInput | MessageCreateOrConnectWithoutThreadInput[]
    createMany?: MessageCreateManyThreadInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutMessageThreadInput = {
    create?: XOR<AuditLogCreateWithoutMessageThreadInput, AuditLogUncheckedCreateWithoutMessageThreadInput> | AuditLogCreateWithoutMessageThreadInput[] | AuditLogUncheckedCreateWithoutMessageThreadInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutMessageThreadInput | AuditLogCreateOrConnectWithoutMessageThreadInput[]
    createMany?: AuditLogCreateManyMessageThreadInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type EnumMessageThreadStatusFieldUpdateOperationsInput = {
    set?: $Enums.MessageThreadStatus
  }

  export type PropertyUpdateOneRequiredWithoutMessageThreadsNestedInput = {
    create?: XOR<PropertyCreateWithoutMessageThreadsInput, PropertyUncheckedCreateWithoutMessageThreadsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutMessageThreadsInput
    upsert?: PropertyUpsertWithoutMessageThreadsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutMessageThreadsInput, PropertyUpdateWithoutMessageThreadsInput>, PropertyUncheckedUpdateWithoutMessageThreadsInput>
  }

  export type BookingUpdateOneWithoutMessageThreadsNestedInput = {
    create?: XOR<BookingCreateWithoutMessageThreadsInput, BookingUncheckedCreateWithoutMessageThreadsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutMessageThreadsInput
    upsert?: BookingUpsertWithoutMessageThreadsInput
    disconnect?: BookingWhereInput | boolean
    delete?: BookingWhereInput | boolean
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutMessageThreadsInput, BookingUpdateWithoutMessageThreadsInput>, BookingUncheckedUpdateWithoutMessageThreadsInput>
  }

  export type MessageUpdateManyWithoutThreadNestedInput = {
    create?: XOR<MessageCreateWithoutThreadInput, MessageUncheckedCreateWithoutThreadInput> | MessageCreateWithoutThreadInput[] | MessageUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutThreadInput | MessageCreateOrConnectWithoutThreadInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutThreadInput | MessageUpsertWithWhereUniqueWithoutThreadInput[]
    createMany?: MessageCreateManyThreadInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutThreadInput | MessageUpdateWithWhereUniqueWithoutThreadInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutThreadInput | MessageUpdateManyWithWhereWithoutThreadInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutMessageThreadNestedInput = {
    create?: XOR<AuditLogCreateWithoutMessageThreadInput, AuditLogUncheckedCreateWithoutMessageThreadInput> | AuditLogCreateWithoutMessageThreadInput[] | AuditLogUncheckedCreateWithoutMessageThreadInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutMessageThreadInput | AuditLogCreateOrConnectWithoutMessageThreadInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutMessageThreadInput | AuditLogUpsertWithWhereUniqueWithoutMessageThreadInput[]
    createMany?: AuditLogCreateManyMessageThreadInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutMessageThreadInput | AuditLogUpdateWithWhereUniqueWithoutMessageThreadInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutMessageThreadInput | AuditLogUpdateManyWithWhereWithoutMessageThreadInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutThreadNestedInput = {
    create?: XOR<MessageCreateWithoutThreadInput, MessageUncheckedCreateWithoutThreadInput> | MessageCreateWithoutThreadInput[] | MessageUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutThreadInput | MessageCreateOrConnectWithoutThreadInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutThreadInput | MessageUpsertWithWhereUniqueWithoutThreadInput[]
    createMany?: MessageCreateManyThreadInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutThreadInput | MessageUpdateWithWhereUniqueWithoutThreadInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutThreadInput | MessageUpdateManyWithWhereWithoutThreadInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutMessageThreadNestedInput = {
    create?: XOR<AuditLogCreateWithoutMessageThreadInput, AuditLogUncheckedCreateWithoutMessageThreadInput> | AuditLogCreateWithoutMessageThreadInput[] | AuditLogUncheckedCreateWithoutMessageThreadInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutMessageThreadInput | AuditLogCreateOrConnectWithoutMessageThreadInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutMessageThreadInput | AuditLogUpsertWithWhereUniqueWithoutMessageThreadInput[]
    createMany?: AuditLogCreateManyMessageThreadInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutMessageThreadInput | AuditLogUpdateWithWhereUniqueWithoutMessageThreadInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutMessageThreadInput | AuditLogUpdateManyWithWhereWithoutMessageThreadInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type MessageThreadCreateNestedOneWithoutMessagesInput = {
    create?: XOR<MessageThreadCreateWithoutMessagesInput, MessageThreadUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: MessageThreadCreateOrConnectWithoutMessagesInput
    connect?: MessageThreadWhereUniqueInput
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type MessageThreadUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<MessageThreadCreateWithoutMessagesInput, MessageThreadUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: MessageThreadCreateOrConnectWithoutMessagesInput
    upsert?: MessageThreadUpsertWithoutMessagesInput
    connect?: MessageThreadWhereUniqueInput
    update?: XOR<XOR<MessageThreadUpdateToOneWithWhereWithoutMessagesInput, MessageThreadUpdateWithoutMessagesInput>, MessageThreadUncheckedUpdateWithoutMessagesInput>
  }

  export type PropertyCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<PropertyCreateWithoutAuditLogsInput, PropertyUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutAuditLogsInput
    connect?: PropertyWhereUniqueInput
  }

  export type BookingCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<BookingCreateWithoutAuditLogsInput, BookingUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutAuditLogsInput
    connect?: BookingWhereUniqueInput
  }

  export type MessageThreadCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<MessageThreadCreateWithoutAuditLogsInput, MessageThreadUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: MessageThreadCreateOrConnectWithoutAuditLogsInput
    connect?: MessageThreadWhereUniqueInput
  }

  export type PropertyUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<PropertyCreateWithoutAuditLogsInput, PropertyUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutAuditLogsInput
    upsert?: PropertyUpsertWithoutAuditLogsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutAuditLogsInput, PropertyUpdateWithoutAuditLogsInput>, PropertyUncheckedUpdateWithoutAuditLogsInput>
  }

  export type BookingUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<BookingCreateWithoutAuditLogsInput, BookingUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutAuditLogsInput
    upsert?: BookingUpsertWithoutAuditLogsInput
    disconnect?: BookingWhereInput | boolean
    delete?: BookingWhereInput | boolean
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutAuditLogsInput, BookingUpdateWithoutAuditLogsInput>, BookingUncheckedUpdateWithoutAuditLogsInput>
  }

  export type MessageThreadUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<MessageThreadCreateWithoutAuditLogsInput, MessageThreadUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: MessageThreadCreateOrConnectWithoutAuditLogsInput
    upsert?: MessageThreadUpsertWithoutAuditLogsInput
    disconnect?: MessageThreadWhereInput | boolean
    delete?: MessageThreadWhereInput | boolean
    connect?: MessageThreadWhereUniqueInput
    update?: XOR<XOR<MessageThreadUpdateToOneWithWhereWithoutAuditLogsInput, MessageThreadUpdateWithoutAuditLogsInput>, MessageThreadUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumCurrencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | EnumCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyFilter<$PrismaModel> | $Enums.Currency
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumCurrencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | EnumCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyWithAggregatesFilter<$PrismaModel> | $Enums.Currency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCurrencyFilter<$PrismaModel>
    _max?: NestedEnumCurrencyFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumUnitTypeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UnitTypeStatus | EnumUnitTypeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UnitTypeStatus[] | ListEnumUnitTypeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UnitTypeStatus[] | ListEnumUnitTypeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUnitTypeStatusFilter<$PrismaModel> | $Enums.UnitTypeStatus
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumUnitTypeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UnitTypeStatus | EnumUnitTypeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UnitTypeStatus[] | ListEnumUnitTypeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UnitTypeStatus[] | ListEnumUnitTypeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUnitTypeStatusWithAggregatesFilter<$PrismaModel> | $Enums.UnitTypeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUnitTypeStatusFilter<$PrismaModel>
    _max?: NestedEnumUnitTypeStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumUnitStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UnitStatus | EnumUnitStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UnitStatus[] | ListEnumUnitStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UnitStatus[] | ListEnumUnitStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUnitStatusFilter<$PrismaModel> | $Enums.UnitStatus
  }

  export type NestedEnumUnitStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UnitStatus | EnumUnitStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UnitStatus[] | ListEnumUnitStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UnitStatus[] | ListEnumUnitStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUnitStatusWithAggregatesFilter<$PrismaModel> | $Enums.UnitStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUnitStatusFilter<$PrismaModel>
    _max?: NestedEnumUnitStatusFilter<$PrismaModel>
  }

  export type NestedEnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type NestedEnumPaymentProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentProvider | EnumPaymentProviderFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentProvider[] | ListEnumPaymentProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentProvider[] | ListEnumPaymentProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentProviderFilter<$PrismaModel> | $Enums.PaymentProvider
  }

  export type NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type NestedEnumPaymentProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentProvider | EnumPaymentProviderFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentProvider[] | ListEnumPaymentProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentProvider[] | ListEnumPaymentProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentProviderWithAggregatesFilter<$PrismaModel> | $Enums.PaymentProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentProviderFilter<$PrismaModel>
    _max?: NestedEnumPaymentProviderFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumMessageThreadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageThreadStatus | EnumMessageThreadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MessageThreadStatus[] | ListEnumMessageThreadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageThreadStatus[] | ListEnumMessageThreadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageThreadStatusFilter<$PrismaModel> | $Enums.MessageThreadStatus
  }

  export type NestedEnumMessageThreadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageThreadStatus | EnumMessageThreadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MessageThreadStatus[] | ListEnumMessageThreadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageThreadStatus[] | ListEnumMessageThreadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageThreadStatusWithAggregatesFilter<$PrismaModel> | $Enums.MessageThreadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageThreadStatusFilter<$PrismaModel>
    _max?: NestedEnumMessageThreadStatusFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type UnitTypeCreateWithoutPropertyInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    coverImageUrl?: string | null
    galleryImageUrls?: UnitTypeCreategalleryImageUrlsInput | string[]
    estimatedRating?: number
    status?: $Enums.UnitTypeStatus
    maxGuests: number
    basePriceMinor: number
    currency?: $Enums.Currency
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    units?: UnitCreateNestedManyWithoutUnitTypeInput
  }

  export type UnitTypeUncheckedCreateWithoutPropertyInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    coverImageUrl?: string | null
    galleryImageUrls?: UnitTypeCreategalleryImageUrlsInput | string[]
    estimatedRating?: number
    status?: $Enums.UnitTypeStatus
    maxGuests: number
    basePriceMinor: number
    currency?: $Enums.Currency
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    units?: UnitUncheckedCreateNestedManyWithoutUnitTypeInput
  }

  export type UnitTypeCreateOrConnectWithoutPropertyInput = {
    where: UnitTypeWhereUniqueInput
    create: XOR<UnitTypeCreateWithoutPropertyInput, UnitTypeUncheckedCreateWithoutPropertyInput>
  }

  export type UnitTypeCreateManyPropertyInputEnvelope = {
    data: UnitTypeCreateManyPropertyInput | UnitTypeCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type UnitCreateWithoutPropertyInput = {
    id?: string
    code: string
    name?: string | null
    floor?: string | null
    status?: $Enums.UnitStatus
    isBookable?: boolean
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutUnitInput
    unitType: UnitTypeCreateNestedOneWithoutUnitsInput
  }

  export type UnitUncheckedCreateWithoutPropertyInput = {
    id?: string
    unitTypeId: string
    code: string
    name?: string | null
    floor?: string | null
    status?: $Enums.UnitStatus
    isBookable?: boolean
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutUnitInput
  }

  export type UnitCreateOrConnectWithoutPropertyInput = {
    where: UnitWhereUniqueInput
    create: XOR<UnitCreateWithoutPropertyInput, UnitUncheckedCreateWithoutPropertyInput>
  }

  export type UnitCreateManyPropertyInputEnvelope = {
    data: UnitCreateManyPropertyInput | UnitCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutPropertyInput = {
    id?: string
    idempotencyKey?: string | null
    status?: $Enums.BookingStatus
    paymentStatus?: $Enums.PaymentStatus
    checkInDate: Date | string
    checkOutDate: Date | string
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount?: number
    currency?: $Enums.Currency
    totalAmountMinor: number
    notes?: string | null
    cancelledAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    priceSnapshot?: PriceSnapshotCreateNestedOneWithoutBookingInput
    paymentIntents?: PaymentIntentCreateNestedManyWithoutBookingInput
    messageThreads?: MessageThreadCreateNestedManyWithoutBookingInput
    auditLogs?: AuditLogCreateNestedManyWithoutBookingInput
    unit: UnitCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutPropertyInput = {
    id?: string
    unitId: string
    idempotencyKey?: string | null
    status?: $Enums.BookingStatus
    paymentStatus?: $Enums.PaymentStatus
    checkInDate: Date | string
    checkOutDate: Date | string
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount?: number
    currency?: $Enums.Currency
    totalAmountMinor: number
    notes?: string | null
    cancelledAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    priceSnapshot?: PriceSnapshotUncheckedCreateNestedOneWithoutBookingInput
    paymentIntents?: PaymentIntentUncheckedCreateNestedManyWithoutBookingInput
    messageThreads?: MessageThreadUncheckedCreateNestedManyWithoutBookingInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutPropertyInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutPropertyInput, BookingUncheckedCreateWithoutPropertyInput>
  }

  export type BookingCreateManyPropertyInputEnvelope = {
    data: BookingCreateManyPropertyInput | BookingCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type PriceSnapshotCreateWithoutPropertyInput = {
    id?: string
    currency: $Enums.Currency
    nightsCount: number
    nightlyRateMinor: number
    subtotalMinor: number
    discountsMinor?: number
    taxesMinor?: number
    feesMinor?: number
    totalAmountMinor: number
    pricingVersion?: number
    promotionCode?: string | null
    capturedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    booking: BookingCreateNestedOneWithoutPriceSnapshotInput
  }

  export type PriceSnapshotUncheckedCreateWithoutPropertyInput = {
    id?: string
    bookingId: string
    currency: $Enums.Currency
    nightsCount: number
    nightlyRateMinor: number
    subtotalMinor: number
    discountsMinor?: number
    taxesMinor?: number
    feesMinor?: number
    totalAmountMinor: number
    pricingVersion?: number
    promotionCode?: string | null
    capturedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceSnapshotCreateOrConnectWithoutPropertyInput = {
    where: PriceSnapshotWhereUniqueInput
    create: XOR<PriceSnapshotCreateWithoutPropertyInput, PriceSnapshotUncheckedCreateWithoutPropertyInput>
  }

  export type PriceSnapshotCreateManyPropertyInputEnvelope = {
    data: PriceSnapshotCreateManyPropertyInput | PriceSnapshotCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type PaymentIntentCreateWithoutPropertyInput = {
    id?: string
    amountMinor: number
    currency: $Enums.Currency
    method: $Enums.PaymentMethod
    provider?: $Enums.PaymentProvider
    status?: $Enums.PaymentStatus
    providerIntentRef?: string | null
    providerCustomerRef?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    booking: BookingCreateNestedOneWithoutPaymentIntentsInput
    transactions?: PaymentTransactionCreateNestedManyWithoutPaymentIntentInput
    providerEvents?: ProviderEventCreateNestedManyWithoutPaymentIntentInput
  }

  export type PaymentIntentUncheckedCreateWithoutPropertyInput = {
    id?: string
    bookingId: string
    amountMinor: number
    currency: $Enums.Currency
    method: $Enums.PaymentMethod
    provider?: $Enums.PaymentProvider
    status?: $Enums.PaymentStatus
    providerIntentRef?: string | null
    providerCustomerRef?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: PaymentTransactionUncheckedCreateNestedManyWithoutPaymentIntentInput
    providerEvents?: ProviderEventUncheckedCreateNestedManyWithoutPaymentIntentInput
  }

  export type PaymentIntentCreateOrConnectWithoutPropertyInput = {
    where: PaymentIntentWhereUniqueInput
    create: XOR<PaymentIntentCreateWithoutPropertyInput, PaymentIntentUncheckedCreateWithoutPropertyInput>
  }

  export type PaymentIntentCreateManyPropertyInputEnvelope = {
    data: PaymentIntentCreateManyPropertyInput | PaymentIntentCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type MessageThreadCreateWithoutPropertyInput = {
    id?: string
    subject?: string | null
    guestFullName: string
    guestEmail: string
    status?: $Enums.MessageThreadStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string | null
    booking?: BookingCreateNestedOneWithoutMessageThreadsInput
    messages?: MessageCreateNestedManyWithoutThreadInput
    auditLogs?: AuditLogCreateNestedManyWithoutMessageThreadInput
  }

  export type MessageThreadUncheckedCreateWithoutPropertyInput = {
    id?: string
    bookingId?: string | null
    subject?: string | null
    guestFullName: string
    guestEmail: string
    status?: $Enums.MessageThreadStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string | null
    messages?: MessageUncheckedCreateNestedManyWithoutThreadInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutMessageThreadInput
  }

  export type MessageThreadCreateOrConnectWithoutPropertyInput = {
    where: MessageThreadWhereUniqueInput
    create: XOR<MessageThreadCreateWithoutPropertyInput, MessageThreadUncheckedCreateWithoutPropertyInput>
  }

  export type MessageThreadCreateManyPropertyInputEnvelope = {
    data: MessageThreadCreateManyPropertyInput | MessageThreadCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutPropertyInput = {
    id?: string
    actorRole: $Enums.Role
    actorUserId?: string | null
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    requestId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    booking?: BookingCreateNestedOneWithoutAuditLogsInput
    messageThread?: MessageThreadCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutPropertyInput = {
    id?: string
    bookingId?: string | null
    messageThreadId?: string | null
    actorRole: $Enums.Role
    actorUserId?: string | null
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    requestId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutPropertyInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutPropertyInput, AuditLogUncheckedCreateWithoutPropertyInput>
  }

  export type AuditLogCreateManyPropertyInputEnvelope = {
    data: AuditLogCreateManyPropertyInput | AuditLogCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type UnitTypeUpsertWithWhereUniqueWithoutPropertyInput = {
    where: UnitTypeWhereUniqueInput
    update: XOR<UnitTypeUpdateWithoutPropertyInput, UnitTypeUncheckedUpdateWithoutPropertyInput>
    create: XOR<UnitTypeCreateWithoutPropertyInput, UnitTypeUncheckedCreateWithoutPropertyInput>
  }

  export type UnitTypeUpdateWithWhereUniqueWithoutPropertyInput = {
    where: UnitTypeWhereUniqueInput
    data: XOR<UnitTypeUpdateWithoutPropertyInput, UnitTypeUncheckedUpdateWithoutPropertyInput>
  }

  export type UnitTypeUpdateManyWithWhereWithoutPropertyInput = {
    where: UnitTypeScalarWhereInput
    data: XOR<UnitTypeUpdateManyMutationInput, UnitTypeUncheckedUpdateManyWithoutPropertyInput>
  }

  export type UnitTypeScalarWhereInput = {
    AND?: UnitTypeScalarWhereInput | UnitTypeScalarWhereInput[]
    OR?: UnitTypeScalarWhereInput[]
    NOT?: UnitTypeScalarWhereInput | UnitTypeScalarWhereInput[]
    id?: StringFilter<"UnitType"> | string
    propertyId?: StringFilter<"UnitType"> | string
    slug?: StringFilter<"UnitType"> | string
    name?: StringFilter<"UnitType"> | string
    description?: StringNullableFilter<"UnitType"> | string | null
    coverImageUrl?: StringNullableFilter<"UnitType"> | string | null
    galleryImageUrls?: StringNullableListFilter<"UnitType">
    estimatedRating?: FloatFilter<"UnitType"> | number
    status?: EnumUnitTypeStatusFilter<"UnitType"> | $Enums.UnitTypeStatus
    maxGuests?: IntFilter<"UnitType"> | number
    basePriceMinor?: IntFilter<"UnitType"> | number
    currency?: EnumCurrencyFilter<"UnitType"> | $Enums.Currency
    displayOrder?: IntFilter<"UnitType"> | number
    createdAt?: DateTimeFilter<"UnitType"> | Date | string
    updatedAt?: DateTimeFilter<"UnitType"> | Date | string
  }

  export type UnitUpsertWithWhereUniqueWithoutPropertyInput = {
    where: UnitWhereUniqueInput
    update: XOR<UnitUpdateWithoutPropertyInput, UnitUncheckedUpdateWithoutPropertyInput>
    create: XOR<UnitCreateWithoutPropertyInput, UnitUncheckedCreateWithoutPropertyInput>
  }

  export type UnitUpdateWithWhereUniqueWithoutPropertyInput = {
    where: UnitWhereUniqueInput
    data: XOR<UnitUpdateWithoutPropertyInput, UnitUncheckedUpdateWithoutPropertyInput>
  }

  export type UnitUpdateManyWithWhereWithoutPropertyInput = {
    where: UnitScalarWhereInput
    data: XOR<UnitUpdateManyMutationInput, UnitUncheckedUpdateManyWithoutPropertyInput>
  }

  export type UnitScalarWhereInput = {
    AND?: UnitScalarWhereInput | UnitScalarWhereInput[]
    OR?: UnitScalarWhereInput[]
    NOT?: UnitScalarWhereInput | UnitScalarWhereInput[]
    id?: StringFilter<"Unit"> | string
    propertyId?: StringFilter<"Unit"> | string
    unitTypeId?: StringFilter<"Unit"> | string
    code?: StringFilter<"Unit"> | string
    name?: StringNullableFilter<"Unit"> | string | null
    floor?: StringNullableFilter<"Unit"> | string | null
    status?: EnumUnitStatusFilter<"Unit"> | $Enums.UnitStatus
    isBookable?: BoolFilter<"Unit"> | boolean
    isPublished?: BoolFilter<"Unit"> | boolean
    createdAt?: DateTimeFilter<"Unit"> | Date | string
    updatedAt?: DateTimeFilter<"Unit"> | Date | string
  }

  export type BookingUpsertWithWhereUniqueWithoutPropertyInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutPropertyInput, BookingUncheckedUpdateWithoutPropertyInput>
    create: XOR<BookingCreateWithoutPropertyInput, BookingUncheckedCreateWithoutPropertyInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutPropertyInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutPropertyInput, BookingUncheckedUpdateWithoutPropertyInput>
  }

  export type BookingUpdateManyWithWhereWithoutPropertyInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutPropertyInput>
  }

  export type BookingScalarWhereInput = {
    AND?: BookingScalarWhereInput | BookingScalarWhereInput[]
    OR?: BookingScalarWhereInput[]
    NOT?: BookingScalarWhereInput | BookingScalarWhereInput[]
    id?: StringFilter<"Booking"> | string
    propertyId?: StringFilter<"Booking"> | string
    unitId?: StringFilter<"Booking"> | string
    idempotencyKey?: StringNullableFilter<"Booking"> | string | null
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFilter<"Booking"> | $Enums.PaymentStatus
    checkInDate?: DateTimeFilter<"Booking"> | Date | string
    checkOutDate?: DateTimeFilter<"Booking"> | Date | string
    guestFullName?: StringFilter<"Booking"> | string
    guestEmail?: StringFilter<"Booking"> | string
    guestPhone?: StringFilter<"Booking"> | string
    adultsCount?: IntFilter<"Booking"> | number
    childrenCount?: IntFilter<"Booking"> | number
    currency?: EnumCurrencyFilter<"Booking"> | $Enums.Currency
    totalAmountMinor?: IntFilter<"Booking"> | number
    notes?: StringNullableFilter<"Booking"> | string | null
    cancelledAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
  }

  export type PriceSnapshotUpsertWithWhereUniqueWithoutPropertyInput = {
    where: PriceSnapshotWhereUniqueInput
    update: XOR<PriceSnapshotUpdateWithoutPropertyInput, PriceSnapshotUncheckedUpdateWithoutPropertyInput>
    create: XOR<PriceSnapshotCreateWithoutPropertyInput, PriceSnapshotUncheckedCreateWithoutPropertyInput>
  }

  export type PriceSnapshotUpdateWithWhereUniqueWithoutPropertyInput = {
    where: PriceSnapshotWhereUniqueInput
    data: XOR<PriceSnapshotUpdateWithoutPropertyInput, PriceSnapshotUncheckedUpdateWithoutPropertyInput>
  }

  export type PriceSnapshotUpdateManyWithWhereWithoutPropertyInput = {
    where: PriceSnapshotScalarWhereInput
    data: XOR<PriceSnapshotUpdateManyMutationInput, PriceSnapshotUncheckedUpdateManyWithoutPropertyInput>
  }

  export type PriceSnapshotScalarWhereInput = {
    AND?: PriceSnapshotScalarWhereInput | PriceSnapshotScalarWhereInput[]
    OR?: PriceSnapshotScalarWhereInput[]
    NOT?: PriceSnapshotScalarWhereInput | PriceSnapshotScalarWhereInput[]
    id?: StringFilter<"PriceSnapshot"> | string
    propertyId?: StringFilter<"PriceSnapshot"> | string
    bookingId?: StringFilter<"PriceSnapshot"> | string
    currency?: EnumCurrencyFilter<"PriceSnapshot"> | $Enums.Currency
    nightsCount?: IntFilter<"PriceSnapshot"> | number
    nightlyRateMinor?: IntFilter<"PriceSnapshot"> | number
    subtotalMinor?: IntFilter<"PriceSnapshot"> | number
    discountsMinor?: IntFilter<"PriceSnapshot"> | number
    taxesMinor?: IntFilter<"PriceSnapshot"> | number
    feesMinor?: IntFilter<"PriceSnapshot"> | number
    totalAmountMinor?: IntFilter<"PriceSnapshot"> | number
    pricingVersion?: IntFilter<"PriceSnapshot"> | number
    promotionCode?: StringNullableFilter<"PriceSnapshot"> | string | null
    capturedAt?: DateTimeFilter<"PriceSnapshot"> | Date | string
    createdAt?: DateTimeFilter<"PriceSnapshot"> | Date | string
    updatedAt?: DateTimeFilter<"PriceSnapshot"> | Date | string
  }

  export type PaymentIntentUpsertWithWhereUniqueWithoutPropertyInput = {
    where: PaymentIntentWhereUniqueInput
    update: XOR<PaymentIntentUpdateWithoutPropertyInput, PaymentIntentUncheckedUpdateWithoutPropertyInput>
    create: XOR<PaymentIntentCreateWithoutPropertyInput, PaymentIntentUncheckedCreateWithoutPropertyInput>
  }

  export type PaymentIntentUpdateWithWhereUniqueWithoutPropertyInput = {
    where: PaymentIntentWhereUniqueInput
    data: XOR<PaymentIntentUpdateWithoutPropertyInput, PaymentIntentUncheckedUpdateWithoutPropertyInput>
  }

  export type PaymentIntentUpdateManyWithWhereWithoutPropertyInput = {
    where: PaymentIntentScalarWhereInput
    data: XOR<PaymentIntentUpdateManyMutationInput, PaymentIntentUncheckedUpdateManyWithoutPropertyInput>
  }

  export type PaymentIntentScalarWhereInput = {
    AND?: PaymentIntentScalarWhereInput | PaymentIntentScalarWhereInput[]
    OR?: PaymentIntentScalarWhereInput[]
    NOT?: PaymentIntentScalarWhereInput | PaymentIntentScalarWhereInput[]
    id?: StringFilter<"PaymentIntent"> | string
    propertyId?: StringFilter<"PaymentIntent"> | string
    bookingId?: StringFilter<"PaymentIntent"> | string
    amountMinor?: IntFilter<"PaymentIntent"> | number
    currency?: EnumCurrencyFilter<"PaymentIntent"> | $Enums.Currency
    method?: EnumPaymentMethodFilter<"PaymentIntent"> | $Enums.PaymentMethod
    provider?: EnumPaymentProviderFilter<"PaymentIntent"> | $Enums.PaymentProvider
    status?: EnumPaymentStatusFilter<"PaymentIntent"> | $Enums.PaymentStatus
    providerIntentRef?: StringNullableFilter<"PaymentIntent"> | string | null
    providerCustomerRef?: StringNullableFilter<"PaymentIntent"> | string | null
    idempotencyKey?: StringNullableFilter<"PaymentIntent"> | string | null
    metadata?: JsonNullableFilter<"PaymentIntent">
    createdAt?: DateTimeFilter<"PaymentIntent"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentIntent"> | Date | string
  }

  export type MessageThreadUpsertWithWhereUniqueWithoutPropertyInput = {
    where: MessageThreadWhereUniqueInput
    update: XOR<MessageThreadUpdateWithoutPropertyInput, MessageThreadUncheckedUpdateWithoutPropertyInput>
    create: XOR<MessageThreadCreateWithoutPropertyInput, MessageThreadUncheckedCreateWithoutPropertyInput>
  }

  export type MessageThreadUpdateWithWhereUniqueWithoutPropertyInput = {
    where: MessageThreadWhereUniqueInput
    data: XOR<MessageThreadUpdateWithoutPropertyInput, MessageThreadUncheckedUpdateWithoutPropertyInput>
  }

  export type MessageThreadUpdateManyWithWhereWithoutPropertyInput = {
    where: MessageThreadScalarWhereInput
    data: XOR<MessageThreadUpdateManyMutationInput, MessageThreadUncheckedUpdateManyWithoutPropertyInput>
  }

  export type MessageThreadScalarWhereInput = {
    AND?: MessageThreadScalarWhereInput | MessageThreadScalarWhereInput[]
    OR?: MessageThreadScalarWhereInput[]
    NOT?: MessageThreadScalarWhereInput | MessageThreadScalarWhereInput[]
    id?: StringFilter<"MessageThread"> | string
    propertyId?: StringFilter<"MessageThread"> | string
    bookingId?: StringNullableFilter<"MessageThread"> | string | null
    subject?: StringNullableFilter<"MessageThread"> | string | null
    guestFullName?: StringFilter<"MessageThread"> | string
    guestEmail?: StringFilter<"MessageThread"> | string
    status?: EnumMessageThreadStatusFilter<"MessageThread"> | $Enums.MessageThreadStatus
    createdAt?: DateTimeFilter<"MessageThread"> | Date | string
    updatedAt?: DateTimeFilter<"MessageThread"> | Date | string
    lastMessageAt?: DateTimeNullableFilter<"MessageThread"> | Date | string | null
  }

  export type AuditLogUpsertWithWhereUniqueWithoutPropertyInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutPropertyInput, AuditLogUncheckedUpdateWithoutPropertyInput>
    create: XOR<AuditLogCreateWithoutPropertyInput, AuditLogUncheckedCreateWithoutPropertyInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutPropertyInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutPropertyInput, AuditLogUncheckedUpdateWithoutPropertyInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutPropertyInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutPropertyInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    propertyId?: StringFilter<"AuditLog"> | string
    bookingId?: StringNullableFilter<"AuditLog"> | string | null
    messageThreadId?: StringNullableFilter<"AuditLog"> | string | null
    actorRole?: EnumRoleFilter<"AuditLog"> | $Enums.Role
    actorUserId?: StringNullableFilter<"AuditLog"> | string | null
    actorEmail?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    requestId?: StringNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type PropertyCreateWithoutUnitTypesInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    city: string
    country: string
    addressLine1?: string | null
    addressLine2?: string | null
    postalCode?: string | null
    timezone?: string
    defaultCurrency?: $Enums.Currency
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    units?: UnitCreateNestedManyWithoutPropertyInput
    bookings?: BookingCreateNestedManyWithoutPropertyInput
    priceSnapshots?: PriceSnapshotCreateNestedManyWithoutPropertyInput
    paymentIntents?: PaymentIntentCreateNestedManyWithoutPropertyInput
    messageThreads?: MessageThreadCreateNestedManyWithoutPropertyInput
    auditLogs?: AuditLogCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutUnitTypesInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    city: string
    country: string
    addressLine1?: string | null
    addressLine2?: string | null
    postalCode?: string | null
    timezone?: string
    defaultCurrency?: $Enums.Currency
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    units?: UnitUncheckedCreateNestedManyWithoutPropertyInput
    bookings?: BookingUncheckedCreateNestedManyWithoutPropertyInput
    priceSnapshots?: PriceSnapshotUncheckedCreateNestedManyWithoutPropertyInput
    paymentIntents?: PaymentIntentUncheckedCreateNestedManyWithoutPropertyInput
    messageThreads?: MessageThreadUncheckedCreateNestedManyWithoutPropertyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutUnitTypesInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutUnitTypesInput, PropertyUncheckedCreateWithoutUnitTypesInput>
  }

  export type UnitCreateWithoutUnitTypeInput = {
    id?: string
    code: string
    name?: string | null
    floor?: string | null
    status?: $Enums.UnitStatus
    isBookable?: boolean
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutUnitInput
    property: PropertyCreateNestedOneWithoutUnitsInput
  }

  export type UnitUncheckedCreateWithoutUnitTypeInput = {
    id?: string
    propertyId: string
    code: string
    name?: string | null
    floor?: string | null
    status?: $Enums.UnitStatus
    isBookable?: boolean
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutUnitInput
  }

  export type UnitCreateOrConnectWithoutUnitTypeInput = {
    where: UnitWhereUniqueInput
    create: XOR<UnitCreateWithoutUnitTypeInput, UnitUncheckedCreateWithoutUnitTypeInput>
  }

  export type UnitCreateManyUnitTypeInputEnvelope = {
    data: UnitCreateManyUnitTypeInput | UnitCreateManyUnitTypeInput[]
    skipDuplicates?: boolean
  }

  export type PropertyUpsertWithoutUnitTypesInput = {
    update: XOR<PropertyUpdateWithoutUnitTypesInput, PropertyUncheckedUpdateWithoutUnitTypesInput>
    create: XOR<PropertyCreateWithoutUnitTypesInput, PropertyUncheckedCreateWithoutUnitTypesInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutUnitTypesInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutUnitTypesInput, PropertyUncheckedUpdateWithoutUnitTypesInput>
  }

  export type PropertyUpdateWithoutUnitTypesInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    units?: UnitUpdateManyWithoutPropertyNestedInput
    bookings?: BookingUpdateManyWithoutPropertyNestedInput
    priceSnapshots?: PriceSnapshotUpdateManyWithoutPropertyNestedInput
    paymentIntents?: PaymentIntentUpdateManyWithoutPropertyNestedInput
    messageThreads?: MessageThreadUpdateManyWithoutPropertyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutUnitTypesInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    units?: UnitUncheckedUpdateManyWithoutPropertyNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutPropertyNestedInput
    priceSnapshots?: PriceSnapshotUncheckedUpdateManyWithoutPropertyNestedInput
    paymentIntents?: PaymentIntentUncheckedUpdateManyWithoutPropertyNestedInput
    messageThreads?: MessageThreadUncheckedUpdateManyWithoutPropertyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type UnitUpsertWithWhereUniqueWithoutUnitTypeInput = {
    where: UnitWhereUniqueInput
    update: XOR<UnitUpdateWithoutUnitTypeInput, UnitUncheckedUpdateWithoutUnitTypeInput>
    create: XOR<UnitCreateWithoutUnitTypeInput, UnitUncheckedCreateWithoutUnitTypeInput>
  }

  export type UnitUpdateWithWhereUniqueWithoutUnitTypeInput = {
    where: UnitWhereUniqueInput
    data: XOR<UnitUpdateWithoutUnitTypeInput, UnitUncheckedUpdateWithoutUnitTypeInput>
  }

  export type UnitUpdateManyWithWhereWithoutUnitTypeInput = {
    where: UnitScalarWhereInput
    data: XOR<UnitUpdateManyMutationInput, UnitUncheckedUpdateManyWithoutUnitTypeInput>
  }

  export type BookingCreateWithoutUnitInput = {
    id?: string
    idempotencyKey?: string | null
    status?: $Enums.BookingStatus
    paymentStatus?: $Enums.PaymentStatus
    checkInDate: Date | string
    checkOutDate: Date | string
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount?: number
    currency?: $Enums.Currency
    totalAmountMinor: number
    notes?: string | null
    cancelledAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    priceSnapshot?: PriceSnapshotCreateNestedOneWithoutBookingInput
    paymentIntents?: PaymentIntentCreateNestedManyWithoutBookingInput
    messageThreads?: MessageThreadCreateNestedManyWithoutBookingInput
    auditLogs?: AuditLogCreateNestedManyWithoutBookingInput
    property: PropertyCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutUnitInput = {
    id?: string
    propertyId: string
    idempotencyKey?: string | null
    status?: $Enums.BookingStatus
    paymentStatus?: $Enums.PaymentStatus
    checkInDate: Date | string
    checkOutDate: Date | string
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount?: number
    currency?: $Enums.Currency
    totalAmountMinor: number
    notes?: string | null
    cancelledAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    priceSnapshot?: PriceSnapshotUncheckedCreateNestedOneWithoutBookingInput
    paymentIntents?: PaymentIntentUncheckedCreateNestedManyWithoutBookingInput
    messageThreads?: MessageThreadUncheckedCreateNestedManyWithoutBookingInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutUnitInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutUnitInput, BookingUncheckedCreateWithoutUnitInput>
  }

  export type BookingCreateManyUnitInputEnvelope = {
    data: BookingCreateManyUnitInput | BookingCreateManyUnitInput[]
    skipDuplicates?: boolean
  }

  export type PropertyCreateWithoutUnitsInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    city: string
    country: string
    addressLine1?: string | null
    addressLine2?: string | null
    postalCode?: string | null
    timezone?: string
    defaultCurrency?: $Enums.Currency
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    unitTypes?: UnitTypeCreateNestedManyWithoutPropertyInput
    bookings?: BookingCreateNestedManyWithoutPropertyInput
    priceSnapshots?: PriceSnapshotCreateNestedManyWithoutPropertyInput
    paymentIntents?: PaymentIntentCreateNestedManyWithoutPropertyInput
    messageThreads?: MessageThreadCreateNestedManyWithoutPropertyInput
    auditLogs?: AuditLogCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutUnitsInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    city: string
    country: string
    addressLine1?: string | null
    addressLine2?: string | null
    postalCode?: string | null
    timezone?: string
    defaultCurrency?: $Enums.Currency
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    unitTypes?: UnitTypeUncheckedCreateNestedManyWithoutPropertyInput
    bookings?: BookingUncheckedCreateNestedManyWithoutPropertyInput
    priceSnapshots?: PriceSnapshotUncheckedCreateNestedManyWithoutPropertyInput
    paymentIntents?: PaymentIntentUncheckedCreateNestedManyWithoutPropertyInput
    messageThreads?: MessageThreadUncheckedCreateNestedManyWithoutPropertyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutUnitsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutUnitsInput, PropertyUncheckedCreateWithoutUnitsInput>
  }

  export type UnitTypeCreateWithoutUnitsInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    coverImageUrl?: string | null
    galleryImageUrls?: UnitTypeCreategalleryImageUrlsInput | string[]
    estimatedRating?: number
    status?: $Enums.UnitTypeStatus
    maxGuests: number
    basePriceMinor: number
    currency?: $Enums.Currency
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutUnitTypesInput
  }

  export type UnitTypeUncheckedCreateWithoutUnitsInput = {
    id?: string
    propertyId: string
    slug: string
    name: string
    description?: string | null
    coverImageUrl?: string | null
    galleryImageUrls?: UnitTypeCreategalleryImageUrlsInput | string[]
    estimatedRating?: number
    status?: $Enums.UnitTypeStatus
    maxGuests: number
    basePriceMinor: number
    currency?: $Enums.Currency
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UnitTypeCreateOrConnectWithoutUnitsInput = {
    where: UnitTypeWhereUniqueInput
    create: XOR<UnitTypeCreateWithoutUnitsInput, UnitTypeUncheckedCreateWithoutUnitsInput>
  }

  export type BookingUpsertWithWhereUniqueWithoutUnitInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutUnitInput, BookingUncheckedUpdateWithoutUnitInput>
    create: XOR<BookingCreateWithoutUnitInput, BookingUncheckedCreateWithoutUnitInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutUnitInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutUnitInput, BookingUncheckedUpdateWithoutUnitInput>
  }

  export type BookingUpdateManyWithWhereWithoutUnitInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutUnitInput>
  }

  export type PropertyUpsertWithoutUnitsInput = {
    update: XOR<PropertyUpdateWithoutUnitsInput, PropertyUncheckedUpdateWithoutUnitsInput>
    create: XOR<PropertyCreateWithoutUnitsInput, PropertyUncheckedCreateWithoutUnitsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutUnitsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutUnitsInput, PropertyUncheckedUpdateWithoutUnitsInput>
  }

  export type PropertyUpdateWithoutUnitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unitTypes?: UnitTypeUpdateManyWithoutPropertyNestedInput
    bookings?: BookingUpdateManyWithoutPropertyNestedInput
    priceSnapshots?: PriceSnapshotUpdateManyWithoutPropertyNestedInput
    paymentIntents?: PaymentIntentUpdateManyWithoutPropertyNestedInput
    messageThreads?: MessageThreadUpdateManyWithoutPropertyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutUnitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unitTypes?: UnitTypeUncheckedUpdateManyWithoutPropertyNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutPropertyNestedInput
    priceSnapshots?: PriceSnapshotUncheckedUpdateManyWithoutPropertyNestedInput
    paymentIntents?: PaymentIntentUncheckedUpdateManyWithoutPropertyNestedInput
    messageThreads?: MessageThreadUncheckedUpdateManyWithoutPropertyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type UnitTypeUpsertWithoutUnitsInput = {
    update: XOR<UnitTypeUpdateWithoutUnitsInput, UnitTypeUncheckedUpdateWithoutUnitsInput>
    create: XOR<UnitTypeCreateWithoutUnitsInput, UnitTypeUncheckedCreateWithoutUnitsInput>
    where?: UnitTypeWhereInput
  }

  export type UnitTypeUpdateToOneWithWhereWithoutUnitsInput = {
    where?: UnitTypeWhereInput
    data: XOR<UnitTypeUpdateWithoutUnitsInput, UnitTypeUncheckedUpdateWithoutUnitsInput>
  }

  export type UnitTypeUpdateWithoutUnitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    galleryImageUrls?: UnitTypeUpdategalleryImageUrlsInput | string[]
    estimatedRating?: FloatFieldUpdateOperationsInput | number
    status?: EnumUnitTypeStatusFieldUpdateOperationsInput | $Enums.UnitTypeStatus
    maxGuests?: IntFieldUpdateOperationsInput | number
    basePriceMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutUnitTypesNestedInput
  }

  export type UnitTypeUncheckedUpdateWithoutUnitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    galleryImageUrls?: UnitTypeUpdategalleryImageUrlsInput | string[]
    estimatedRating?: FloatFieldUpdateOperationsInput | number
    status?: EnumUnitTypeStatusFieldUpdateOperationsInput | $Enums.UnitTypeStatus
    maxGuests?: IntFieldUpdateOperationsInput | number
    basePriceMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceSnapshotCreateWithoutBookingInput = {
    id?: string
    currency: $Enums.Currency
    nightsCount: number
    nightlyRateMinor: number
    subtotalMinor: number
    discountsMinor?: number
    taxesMinor?: number
    feesMinor?: number
    totalAmountMinor: number
    pricingVersion?: number
    promotionCode?: string | null
    capturedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutPriceSnapshotsInput
  }

  export type PriceSnapshotUncheckedCreateWithoutBookingInput = {
    id?: string
    propertyId: string
    currency: $Enums.Currency
    nightsCount: number
    nightlyRateMinor: number
    subtotalMinor: number
    discountsMinor?: number
    taxesMinor?: number
    feesMinor?: number
    totalAmountMinor: number
    pricingVersion?: number
    promotionCode?: string | null
    capturedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceSnapshotCreateOrConnectWithoutBookingInput = {
    where: PriceSnapshotWhereUniqueInput
    create: XOR<PriceSnapshotCreateWithoutBookingInput, PriceSnapshotUncheckedCreateWithoutBookingInput>
  }

  export type PaymentIntentCreateWithoutBookingInput = {
    id?: string
    amountMinor: number
    currency: $Enums.Currency
    method: $Enums.PaymentMethod
    provider?: $Enums.PaymentProvider
    status?: $Enums.PaymentStatus
    providerIntentRef?: string | null
    providerCustomerRef?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutPaymentIntentsInput
    transactions?: PaymentTransactionCreateNestedManyWithoutPaymentIntentInput
    providerEvents?: ProviderEventCreateNestedManyWithoutPaymentIntentInput
  }

  export type PaymentIntentUncheckedCreateWithoutBookingInput = {
    id?: string
    propertyId: string
    amountMinor: number
    currency: $Enums.Currency
    method: $Enums.PaymentMethod
    provider?: $Enums.PaymentProvider
    status?: $Enums.PaymentStatus
    providerIntentRef?: string | null
    providerCustomerRef?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: PaymentTransactionUncheckedCreateNestedManyWithoutPaymentIntentInput
    providerEvents?: ProviderEventUncheckedCreateNestedManyWithoutPaymentIntentInput
  }

  export type PaymentIntentCreateOrConnectWithoutBookingInput = {
    where: PaymentIntentWhereUniqueInput
    create: XOR<PaymentIntentCreateWithoutBookingInput, PaymentIntentUncheckedCreateWithoutBookingInput>
  }

  export type PaymentIntentCreateManyBookingInputEnvelope = {
    data: PaymentIntentCreateManyBookingInput | PaymentIntentCreateManyBookingInput[]
    skipDuplicates?: boolean
  }

  export type MessageThreadCreateWithoutBookingInput = {
    id?: string
    subject?: string | null
    guestFullName: string
    guestEmail: string
    status?: $Enums.MessageThreadStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string | null
    property: PropertyCreateNestedOneWithoutMessageThreadsInput
    messages?: MessageCreateNestedManyWithoutThreadInput
    auditLogs?: AuditLogCreateNestedManyWithoutMessageThreadInput
  }

  export type MessageThreadUncheckedCreateWithoutBookingInput = {
    id?: string
    propertyId: string
    subject?: string | null
    guestFullName: string
    guestEmail: string
    status?: $Enums.MessageThreadStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string | null
    messages?: MessageUncheckedCreateNestedManyWithoutThreadInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutMessageThreadInput
  }

  export type MessageThreadCreateOrConnectWithoutBookingInput = {
    where: MessageThreadWhereUniqueInput
    create: XOR<MessageThreadCreateWithoutBookingInput, MessageThreadUncheckedCreateWithoutBookingInput>
  }

  export type MessageThreadCreateManyBookingInputEnvelope = {
    data: MessageThreadCreateManyBookingInput | MessageThreadCreateManyBookingInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutBookingInput = {
    id?: string
    actorRole: $Enums.Role
    actorUserId?: string | null
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    requestId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    property: PropertyCreateNestedOneWithoutAuditLogsInput
    messageThread?: MessageThreadCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutBookingInput = {
    id?: string
    propertyId: string
    messageThreadId?: string | null
    actorRole: $Enums.Role
    actorUserId?: string | null
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    requestId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutBookingInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutBookingInput, AuditLogUncheckedCreateWithoutBookingInput>
  }

  export type AuditLogCreateManyBookingInputEnvelope = {
    data: AuditLogCreateManyBookingInput | AuditLogCreateManyBookingInput[]
    skipDuplicates?: boolean
  }

  export type PropertyCreateWithoutBookingsInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    city: string
    country: string
    addressLine1?: string | null
    addressLine2?: string | null
    postalCode?: string | null
    timezone?: string
    defaultCurrency?: $Enums.Currency
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    unitTypes?: UnitTypeCreateNestedManyWithoutPropertyInput
    units?: UnitCreateNestedManyWithoutPropertyInput
    priceSnapshots?: PriceSnapshotCreateNestedManyWithoutPropertyInput
    paymentIntents?: PaymentIntentCreateNestedManyWithoutPropertyInput
    messageThreads?: MessageThreadCreateNestedManyWithoutPropertyInput
    auditLogs?: AuditLogCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutBookingsInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    city: string
    country: string
    addressLine1?: string | null
    addressLine2?: string | null
    postalCode?: string | null
    timezone?: string
    defaultCurrency?: $Enums.Currency
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    unitTypes?: UnitTypeUncheckedCreateNestedManyWithoutPropertyInput
    units?: UnitUncheckedCreateNestedManyWithoutPropertyInput
    priceSnapshots?: PriceSnapshotUncheckedCreateNestedManyWithoutPropertyInput
    paymentIntents?: PaymentIntentUncheckedCreateNestedManyWithoutPropertyInput
    messageThreads?: MessageThreadUncheckedCreateNestedManyWithoutPropertyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutBookingsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutBookingsInput, PropertyUncheckedCreateWithoutBookingsInput>
  }

  export type UnitCreateWithoutBookingsInput = {
    id?: string
    code: string
    name?: string | null
    floor?: string | null
    status?: $Enums.UnitStatus
    isBookable?: boolean
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutUnitsInput
    unitType: UnitTypeCreateNestedOneWithoutUnitsInput
  }

  export type UnitUncheckedCreateWithoutBookingsInput = {
    id?: string
    propertyId: string
    unitTypeId: string
    code: string
    name?: string | null
    floor?: string | null
    status?: $Enums.UnitStatus
    isBookable?: boolean
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UnitCreateOrConnectWithoutBookingsInput = {
    where: UnitWhereUniqueInput
    create: XOR<UnitCreateWithoutBookingsInput, UnitUncheckedCreateWithoutBookingsInput>
  }

  export type PriceSnapshotUpsertWithoutBookingInput = {
    update: XOR<PriceSnapshotUpdateWithoutBookingInput, PriceSnapshotUncheckedUpdateWithoutBookingInput>
    create: XOR<PriceSnapshotCreateWithoutBookingInput, PriceSnapshotUncheckedCreateWithoutBookingInput>
    where?: PriceSnapshotWhereInput
  }

  export type PriceSnapshotUpdateToOneWithWhereWithoutBookingInput = {
    where?: PriceSnapshotWhereInput
    data: XOR<PriceSnapshotUpdateWithoutBookingInput, PriceSnapshotUncheckedUpdateWithoutBookingInput>
  }

  export type PriceSnapshotUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    nightsCount?: IntFieldUpdateOperationsInput | number
    nightlyRateMinor?: IntFieldUpdateOperationsInput | number
    subtotalMinor?: IntFieldUpdateOperationsInput | number
    discountsMinor?: IntFieldUpdateOperationsInput | number
    taxesMinor?: IntFieldUpdateOperationsInput | number
    feesMinor?: IntFieldUpdateOperationsInput | number
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    pricingVersion?: IntFieldUpdateOperationsInput | number
    promotionCode?: NullableStringFieldUpdateOperationsInput | string | null
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutPriceSnapshotsNestedInput
  }

  export type PriceSnapshotUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    nightsCount?: IntFieldUpdateOperationsInput | number
    nightlyRateMinor?: IntFieldUpdateOperationsInput | number
    subtotalMinor?: IntFieldUpdateOperationsInput | number
    discountsMinor?: IntFieldUpdateOperationsInput | number
    taxesMinor?: IntFieldUpdateOperationsInput | number
    feesMinor?: IntFieldUpdateOperationsInput | number
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    pricingVersion?: IntFieldUpdateOperationsInput | number
    promotionCode?: NullableStringFieldUpdateOperationsInput | string | null
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentIntentUpsertWithWhereUniqueWithoutBookingInput = {
    where: PaymentIntentWhereUniqueInput
    update: XOR<PaymentIntentUpdateWithoutBookingInput, PaymentIntentUncheckedUpdateWithoutBookingInput>
    create: XOR<PaymentIntentCreateWithoutBookingInput, PaymentIntentUncheckedCreateWithoutBookingInput>
  }

  export type PaymentIntentUpdateWithWhereUniqueWithoutBookingInput = {
    where: PaymentIntentWhereUniqueInput
    data: XOR<PaymentIntentUpdateWithoutBookingInput, PaymentIntentUncheckedUpdateWithoutBookingInput>
  }

  export type PaymentIntentUpdateManyWithWhereWithoutBookingInput = {
    where: PaymentIntentScalarWhereInput
    data: XOR<PaymentIntentUpdateManyMutationInput, PaymentIntentUncheckedUpdateManyWithoutBookingInput>
  }

  export type MessageThreadUpsertWithWhereUniqueWithoutBookingInput = {
    where: MessageThreadWhereUniqueInput
    update: XOR<MessageThreadUpdateWithoutBookingInput, MessageThreadUncheckedUpdateWithoutBookingInput>
    create: XOR<MessageThreadCreateWithoutBookingInput, MessageThreadUncheckedCreateWithoutBookingInput>
  }

  export type MessageThreadUpdateWithWhereUniqueWithoutBookingInput = {
    where: MessageThreadWhereUniqueInput
    data: XOR<MessageThreadUpdateWithoutBookingInput, MessageThreadUncheckedUpdateWithoutBookingInput>
  }

  export type MessageThreadUpdateManyWithWhereWithoutBookingInput = {
    where: MessageThreadScalarWhereInput
    data: XOR<MessageThreadUpdateManyMutationInput, MessageThreadUncheckedUpdateManyWithoutBookingInput>
  }

  export type AuditLogUpsertWithWhereUniqueWithoutBookingInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutBookingInput, AuditLogUncheckedUpdateWithoutBookingInput>
    create: XOR<AuditLogCreateWithoutBookingInput, AuditLogUncheckedCreateWithoutBookingInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutBookingInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutBookingInput, AuditLogUncheckedUpdateWithoutBookingInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutBookingInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutBookingInput>
  }

  export type PropertyUpsertWithoutBookingsInput = {
    update: XOR<PropertyUpdateWithoutBookingsInput, PropertyUncheckedUpdateWithoutBookingsInput>
    create: XOR<PropertyCreateWithoutBookingsInput, PropertyUncheckedCreateWithoutBookingsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutBookingsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutBookingsInput, PropertyUncheckedUpdateWithoutBookingsInput>
  }

  export type PropertyUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unitTypes?: UnitTypeUpdateManyWithoutPropertyNestedInput
    units?: UnitUpdateManyWithoutPropertyNestedInput
    priceSnapshots?: PriceSnapshotUpdateManyWithoutPropertyNestedInput
    paymentIntents?: PaymentIntentUpdateManyWithoutPropertyNestedInput
    messageThreads?: MessageThreadUpdateManyWithoutPropertyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unitTypes?: UnitTypeUncheckedUpdateManyWithoutPropertyNestedInput
    units?: UnitUncheckedUpdateManyWithoutPropertyNestedInput
    priceSnapshots?: PriceSnapshotUncheckedUpdateManyWithoutPropertyNestedInput
    paymentIntents?: PaymentIntentUncheckedUpdateManyWithoutPropertyNestedInput
    messageThreads?: MessageThreadUncheckedUpdateManyWithoutPropertyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type UnitUpsertWithoutBookingsInput = {
    update: XOR<UnitUpdateWithoutBookingsInput, UnitUncheckedUpdateWithoutBookingsInput>
    create: XOR<UnitCreateWithoutBookingsInput, UnitUncheckedCreateWithoutBookingsInput>
    where?: UnitWhereInput
  }

  export type UnitUpdateToOneWithWhereWithoutBookingsInput = {
    where?: UnitWhereInput
    data: XOR<UnitUpdateWithoutBookingsInput, UnitUncheckedUpdateWithoutBookingsInput>
  }

  export type UnitUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUnitStatusFieldUpdateOperationsInput | $Enums.UnitStatus
    isBookable?: BoolFieldUpdateOperationsInput | boolean
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutUnitsNestedInput
    unitType?: UnitTypeUpdateOneRequiredWithoutUnitsNestedInput
  }

  export type UnitUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    unitTypeId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUnitStatusFieldUpdateOperationsInput | $Enums.UnitStatus
    isBookable?: BoolFieldUpdateOperationsInput | boolean
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyCreateWithoutPriceSnapshotsInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    city: string
    country: string
    addressLine1?: string | null
    addressLine2?: string | null
    postalCode?: string | null
    timezone?: string
    defaultCurrency?: $Enums.Currency
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    unitTypes?: UnitTypeCreateNestedManyWithoutPropertyInput
    units?: UnitCreateNestedManyWithoutPropertyInput
    bookings?: BookingCreateNestedManyWithoutPropertyInput
    paymentIntents?: PaymentIntentCreateNestedManyWithoutPropertyInput
    messageThreads?: MessageThreadCreateNestedManyWithoutPropertyInput
    auditLogs?: AuditLogCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutPriceSnapshotsInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    city: string
    country: string
    addressLine1?: string | null
    addressLine2?: string | null
    postalCode?: string | null
    timezone?: string
    defaultCurrency?: $Enums.Currency
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    unitTypes?: UnitTypeUncheckedCreateNestedManyWithoutPropertyInput
    units?: UnitUncheckedCreateNestedManyWithoutPropertyInput
    bookings?: BookingUncheckedCreateNestedManyWithoutPropertyInput
    paymentIntents?: PaymentIntentUncheckedCreateNestedManyWithoutPropertyInput
    messageThreads?: MessageThreadUncheckedCreateNestedManyWithoutPropertyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutPriceSnapshotsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutPriceSnapshotsInput, PropertyUncheckedCreateWithoutPriceSnapshotsInput>
  }

  export type BookingCreateWithoutPriceSnapshotInput = {
    id?: string
    idempotencyKey?: string | null
    status?: $Enums.BookingStatus
    paymentStatus?: $Enums.PaymentStatus
    checkInDate: Date | string
    checkOutDate: Date | string
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount?: number
    currency?: $Enums.Currency
    totalAmountMinor: number
    notes?: string | null
    cancelledAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentIntents?: PaymentIntentCreateNestedManyWithoutBookingInput
    messageThreads?: MessageThreadCreateNestedManyWithoutBookingInput
    auditLogs?: AuditLogCreateNestedManyWithoutBookingInput
    property: PropertyCreateNestedOneWithoutBookingsInput
    unit: UnitCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutPriceSnapshotInput = {
    id?: string
    propertyId: string
    unitId: string
    idempotencyKey?: string | null
    status?: $Enums.BookingStatus
    paymentStatus?: $Enums.PaymentStatus
    checkInDate: Date | string
    checkOutDate: Date | string
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount?: number
    currency?: $Enums.Currency
    totalAmountMinor: number
    notes?: string | null
    cancelledAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentIntents?: PaymentIntentUncheckedCreateNestedManyWithoutBookingInput
    messageThreads?: MessageThreadUncheckedCreateNestedManyWithoutBookingInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutPriceSnapshotInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutPriceSnapshotInput, BookingUncheckedCreateWithoutPriceSnapshotInput>
  }

  export type PropertyUpsertWithoutPriceSnapshotsInput = {
    update: XOR<PropertyUpdateWithoutPriceSnapshotsInput, PropertyUncheckedUpdateWithoutPriceSnapshotsInput>
    create: XOR<PropertyCreateWithoutPriceSnapshotsInput, PropertyUncheckedCreateWithoutPriceSnapshotsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutPriceSnapshotsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutPriceSnapshotsInput, PropertyUncheckedUpdateWithoutPriceSnapshotsInput>
  }

  export type PropertyUpdateWithoutPriceSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unitTypes?: UnitTypeUpdateManyWithoutPropertyNestedInput
    units?: UnitUpdateManyWithoutPropertyNestedInput
    bookings?: BookingUpdateManyWithoutPropertyNestedInput
    paymentIntents?: PaymentIntentUpdateManyWithoutPropertyNestedInput
    messageThreads?: MessageThreadUpdateManyWithoutPropertyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutPriceSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unitTypes?: UnitTypeUncheckedUpdateManyWithoutPropertyNestedInput
    units?: UnitUncheckedUpdateManyWithoutPropertyNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutPropertyNestedInput
    paymentIntents?: PaymentIntentUncheckedUpdateManyWithoutPropertyNestedInput
    messageThreads?: MessageThreadUncheckedUpdateManyWithoutPropertyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type BookingUpsertWithoutPriceSnapshotInput = {
    update: XOR<BookingUpdateWithoutPriceSnapshotInput, BookingUncheckedUpdateWithoutPriceSnapshotInput>
    create: XOR<BookingCreateWithoutPriceSnapshotInput, BookingUncheckedCreateWithoutPriceSnapshotInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutPriceSnapshotInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutPriceSnapshotInput, BookingUncheckedUpdateWithoutPriceSnapshotInput>
  }

  export type BookingUpdateWithoutPriceSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentIntents?: PaymentIntentUpdateManyWithoutBookingNestedInput
    messageThreads?: MessageThreadUpdateManyWithoutBookingNestedInput
    auditLogs?: AuditLogUpdateManyWithoutBookingNestedInput
    property?: PropertyUpdateOneRequiredWithoutBookingsNestedInput
    unit?: UnitUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutPriceSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentIntents?: PaymentIntentUncheckedUpdateManyWithoutBookingNestedInput
    messageThreads?: MessageThreadUncheckedUpdateManyWithoutBookingNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type PropertyCreateWithoutPaymentIntentsInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    city: string
    country: string
    addressLine1?: string | null
    addressLine2?: string | null
    postalCode?: string | null
    timezone?: string
    defaultCurrency?: $Enums.Currency
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    unitTypes?: UnitTypeCreateNestedManyWithoutPropertyInput
    units?: UnitCreateNestedManyWithoutPropertyInput
    bookings?: BookingCreateNestedManyWithoutPropertyInput
    priceSnapshots?: PriceSnapshotCreateNestedManyWithoutPropertyInput
    messageThreads?: MessageThreadCreateNestedManyWithoutPropertyInput
    auditLogs?: AuditLogCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutPaymentIntentsInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    city: string
    country: string
    addressLine1?: string | null
    addressLine2?: string | null
    postalCode?: string | null
    timezone?: string
    defaultCurrency?: $Enums.Currency
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    unitTypes?: UnitTypeUncheckedCreateNestedManyWithoutPropertyInput
    units?: UnitUncheckedCreateNestedManyWithoutPropertyInput
    bookings?: BookingUncheckedCreateNestedManyWithoutPropertyInput
    priceSnapshots?: PriceSnapshotUncheckedCreateNestedManyWithoutPropertyInput
    messageThreads?: MessageThreadUncheckedCreateNestedManyWithoutPropertyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutPaymentIntentsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutPaymentIntentsInput, PropertyUncheckedCreateWithoutPaymentIntentsInput>
  }

  export type BookingCreateWithoutPaymentIntentsInput = {
    id?: string
    idempotencyKey?: string | null
    status?: $Enums.BookingStatus
    paymentStatus?: $Enums.PaymentStatus
    checkInDate: Date | string
    checkOutDate: Date | string
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount?: number
    currency?: $Enums.Currency
    totalAmountMinor: number
    notes?: string | null
    cancelledAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    priceSnapshot?: PriceSnapshotCreateNestedOneWithoutBookingInput
    messageThreads?: MessageThreadCreateNestedManyWithoutBookingInput
    auditLogs?: AuditLogCreateNestedManyWithoutBookingInput
    property: PropertyCreateNestedOneWithoutBookingsInput
    unit: UnitCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutPaymentIntentsInput = {
    id?: string
    propertyId: string
    unitId: string
    idempotencyKey?: string | null
    status?: $Enums.BookingStatus
    paymentStatus?: $Enums.PaymentStatus
    checkInDate: Date | string
    checkOutDate: Date | string
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount?: number
    currency?: $Enums.Currency
    totalAmountMinor: number
    notes?: string | null
    cancelledAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    priceSnapshot?: PriceSnapshotUncheckedCreateNestedOneWithoutBookingInput
    messageThreads?: MessageThreadUncheckedCreateNestedManyWithoutBookingInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutPaymentIntentsInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutPaymentIntentsInput, BookingUncheckedCreateWithoutPaymentIntentsInput>
  }

  export type PaymentTransactionCreateWithoutPaymentIntentInput = {
    id?: string
    status: $Enums.PaymentStatus
    amountMinor: number
    currency: $Enums.Currency
    providerTxnRef?: string | null
    externalReference?: string | null
    message?: string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    sequence: number
    occurredAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentTransactionUncheckedCreateWithoutPaymentIntentInput = {
    id?: string
    status: $Enums.PaymentStatus
    amountMinor: number
    currency: $Enums.Currency
    providerTxnRef?: string | null
    externalReference?: string | null
    message?: string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    sequence: number
    occurredAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentTransactionCreateOrConnectWithoutPaymentIntentInput = {
    where: PaymentTransactionWhereUniqueInput
    create: XOR<PaymentTransactionCreateWithoutPaymentIntentInput, PaymentTransactionUncheckedCreateWithoutPaymentIntentInput>
  }

  export type PaymentTransactionCreateManyPaymentIntentInputEnvelope = {
    data: PaymentTransactionCreateManyPaymentIntentInput | PaymentTransactionCreateManyPaymentIntentInput[]
    skipDuplicates?: boolean
  }

  export type ProviderEventCreateWithoutPaymentIntentInput = {
    id?: string
    provider: string
    eventId: string
    providerReference?: string | null
    status?: string | null
    signatureValid: boolean
    rawPayload: JsonNullValueInput | InputJsonValue
    occurredAt?: Date | string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProviderEventUncheckedCreateWithoutPaymentIntentInput = {
    id?: string
    provider: string
    eventId: string
    providerReference?: string | null
    status?: string | null
    signatureValid: boolean
    rawPayload: JsonNullValueInput | InputJsonValue
    occurredAt?: Date | string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProviderEventCreateOrConnectWithoutPaymentIntentInput = {
    where: ProviderEventWhereUniqueInput
    create: XOR<ProviderEventCreateWithoutPaymentIntentInput, ProviderEventUncheckedCreateWithoutPaymentIntentInput>
  }

  export type ProviderEventCreateManyPaymentIntentInputEnvelope = {
    data: ProviderEventCreateManyPaymentIntentInput | ProviderEventCreateManyPaymentIntentInput[]
    skipDuplicates?: boolean
  }

  export type PropertyUpsertWithoutPaymentIntentsInput = {
    update: XOR<PropertyUpdateWithoutPaymentIntentsInput, PropertyUncheckedUpdateWithoutPaymentIntentsInput>
    create: XOR<PropertyCreateWithoutPaymentIntentsInput, PropertyUncheckedCreateWithoutPaymentIntentsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutPaymentIntentsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutPaymentIntentsInput, PropertyUncheckedUpdateWithoutPaymentIntentsInput>
  }

  export type PropertyUpdateWithoutPaymentIntentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unitTypes?: UnitTypeUpdateManyWithoutPropertyNestedInput
    units?: UnitUpdateManyWithoutPropertyNestedInput
    bookings?: BookingUpdateManyWithoutPropertyNestedInput
    priceSnapshots?: PriceSnapshotUpdateManyWithoutPropertyNestedInput
    messageThreads?: MessageThreadUpdateManyWithoutPropertyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutPaymentIntentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unitTypes?: UnitTypeUncheckedUpdateManyWithoutPropertyNestedInput
    units?: UnitUncheckedUpdateManyWithoutPropertyNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutPropertyNestedInput
    priceSnapshots?: PriceSnapshotUncheckedUpdateManyWithoutPropertyNestedInput
    messageThreads?: MessageThreadUncheckedUpdateManyWithoutPropertyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type BookingUpsertWithoutPaymentIntentsInput = {
    update: XOR<BookingUpdateWithoutPaymentIntentsInput, BookingUncheckedUpdateWithoutPaymentIntentsInput>
    create: XOR<BookingCreateWithoutPaymentIntentsInput, BookingUncheckedCreateWithoutPaymentIntentsInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutPaymentIntentsInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutPaymentIntentsInput, BookingUncheckedUpdateWithoutPaymentIntentsInput>
  }

  export type BookingUpdateWithoutPaymentIntentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceSnapshot?: PriceSnapshotUpdateOneWithoutBookingNestedInput
    messageThreads?: MessageThreadUpdateManyWithoutBookingNestedInput
    auditLogs?: AuditLogUpdateManyWithoutBookingNestedInput
    property?: PropertyUpdateOneRequiredWithoutBookingsNestedInput
    unit?: UnitUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutPaymentIntentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceSnapshot?: PriceSnapshotUncheckedUpdateOneWithoutBookingNestedInput
    messageThreads?: MessageThreadUncheckedUpdateManyWithoutBookingNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type PaymentTransactionUpsertWithWhereUniqueWithoutPaymentIntentInput = {
    where: PaymentTransactionWhereUniqueInput
    update: XOR<PaymentTransactionUpdateWithoutPaymentIntentInput, PaymentTransactionUncheckedUpdateWithoutPaymentIntentInput>
    create: XOR<PaymentTransactionCreateWithoutPaymentIntentInput, PaymentTransactionUncheckedCreateWithoutPaymentIntentInput>
  }

  export type PaymentTransactionUpdateWithWhereUniqueWithoutPaymentIntentInput = {
    where: PaymentTransactionWhereUniqueInput
    data: XOR<PaymentTransactionUpdateWithoutPaymentIntentInput, PaymentTransactionUncheckedUpdateWithoutPaymentIntentInput>
  }

  export type PaymentTransactionUpdateManyWithWhereWithoutPaymentIntentInput = {
    where: PaymentTransactionScalarWhereInput
    data: XOR<PaymentTransactionUpdateManyMutationInput, PaymentTransactionUncheckedUpdateManyWithoutPaymentIntentInput>
  }

  export type PaymentTransactionScalarWhereInput = {
    AND?: PaymentTransactionScalarWhereInput | PaymentTransactionScalarWhereInput[]
    OR?: PaymentTransactionScalarWhereInput[]
    NOT?: PaymentTransactionScalarWhereInput | PaymentTransactionScalarWhereInput[]
    id?: StringFilter<"PaymentTransaction"> | string
    paymentIntentId?: StringFilter<"PaymentTransaction"> | string
    status?: EnumPaymentStatusFilter<"PaymentTransaction"> | $Enums.PaymentStatus
    amountMinor?: IntFilter<"PaymentTransaction"> | number
    currency?: EnumCurrencyFilter<"PaymentTransaction"> | $Enums.Currency
    providerTxnRef?: StringNullableFilter<"PaymentTransaction"> | string | null
    externalReference?: StringNullableFilter<"PaymentTransaction"> | string | null
    message?: StringNullableFilter<"PaymentTransaction"> | string | null
    rawPayload?: JsonNullableFilter<"PaymentTransaction">
    sequence?: IntFilter<"PaymentTransaction"> | number
    occurredAt?: DateTimeFilter<"PaymentTransaction"> | Date | string
    createdAt?: DateTimeFilter<"PaymentTransaction"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentTransaction"> | Date | string
  }

  export type ProviderEventUpsertWithWhereUniqueWithoutPaymentIntentInput = {
    where: ProviderEventWhereUniqueInput
    update: XOR<ProviderEventUpdateWithoutPaymentIntentInput, ProviderEventUncheckedUpdateWithoutPaymentIntentInput>
    create: XOR<ProviderEventCreateWithoutPaymentIntentInput, ProviderEventUncheckedCreateWithoutPaymentIntentInput>
  }

  export type ProviderEventUpdateWithWhereUniqueWithoutPaymentIntentInput = {
    where: ProviderEventWhereUniqueInput
    data: XOR<ProviderEventUpdateWithoutPaymentIntentInput, ProviderEventUncheckedUpdateWithoutPaymentIntentInput>
  }

  export type ProviderEventUpdateManyWithWhereWithoutPaymentIntentInput = {
    where: ProviderEventScalarWhereInput
    data: XOR<ProviderEventUpdateManyMutationInput, ProviderEventUncheckedUpdateManyWithoutPaymentIntentInput>
  }

  export type ProviderEventScalarWhereInput = {
    AND?: ProviderEventScalarWhereInput | ProviderEventScalarWhereInput[]
    OR?: ProviderEventScalarWhereInput[]
    NOT?: ProviderEventScalarWhereInput | ProviderEventScalarWhereInput[]
    id?: StringFilter<"ProviderEvent"> | string
    provider?: StringFilter<"ProviderEvent"> | string
    eventId?: StringFilter<"ProviderEvent"> | string
    providerReference?: StringNullableFilter<"ProviderEvent"> | string | null
    paymentIntentId?: StringNullableFilter<"ProviderEvent"> | string | null
    status?: StringNullableFilter<"ProviderEvent"> | string | null
    signatureValid?: BoolFilter<"ProviderEvent"> | boolean
    rawPayload?: JsonFilter<"ProviderEvent">
    occurredAt?: DateTimeNullableFilter<"ProviderEvent"> | Date | string | null
    processedAt?: DateTimeNullableFilter<"ProviderEvent"> | Date | string | null
    createdAt?: DateTimeFilter<"ProviderEvent"> | Date | string
    updatedAt?: DateTimeFilter<"ProviderEvent"> | Date | string
  }

  export type PaymentIntentCreateWithoutTransactionsInput = {
    id?: string
    amountMinor: number
    currency: $Enums.Currency
    method: $Enums.PaymentMethod
    provider?: $Enums.PaymentProvider
    status?: $Enums.PaymentStatus
    providerIntentRef?: string | null
    providerCustomerRef?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutPaymentIntentsInput
    booking: BookingCreateNestedOneWithoutPaymentIntentsInput
    providerEvents?: ProviderEventCreateNestedManyWithoutPaymentIntentInput
  }

  export type PaymentIntentUncheckedCreateWithoutTransactionsInput = {
    id?: string
    propertyId: string
    bookingId: string
    amountMinor: number
    currency: $Enums.Currency
    method: $Enums.PaymentMethod
    provider?: $Enums.PaymentProvider
    status?: $Enums.PaymentStatus
    providerIntentRef?: string | null
    providerCustomerRef?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    providerEvents?: ProviderEventUncheckedCreateNestedManyWithoutPaymentIntentInput
  }

  export type PaymentIntentCreateOrConnectWithoutTransactionsInput = {
    where: PaymentIntentWhereUniqueInput
    create: XOR<PaymentIntentCreateWithoutTransactionsInput, PaymentIntentUncheckedCreateWithoutTransactionsInput>
  }

  export type PaymentIntentUpsertWithoutTransactionsInput = {
    update: XOR<PaymentIntentUpdateWithoutTransactionsInput, PaymentIntentUncheckedUpdateWithoutTransactionsInput>
    create: XOR<PaymentIntentCreateWithoutTransactionsInput, PaymentIntentUncheckedCreateWithoutTransactionsInput>
    where?: PaymentIntentWhereInput
  }

  export type PaymentIntentUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: PaymentIntentWhereInput
    data: XOR<PaymentIntentUpdateWithoutTransactionsInput, PaymentIntentUncheckedUpdateWithoutTransactionsInput>
  }

  export type PaymentIntentUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    providerIntentRef?: NullableStringFieldUpdateOperationsInput | string | null
    providerCustomerRef?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutPaymentIntentsNestedInput
    booking?: BookingUpdateOneRequiredWithoutPaymentIntentsNestedInput
    providerEvents?: ProviderEventUpdateManyWithoutPaymentIntentNestedInput
  }

  export type PaymentIntentUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    providerIntentRef?: NullableStringFieldUpdateOperationsInput | string | null
    providerCustomerRef?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    providerEvents?: ProviderEventUncheckedUpdateManyWithoutPaymentIntentNestedInput
  }

  export type PaymentIntentCreateWithoutProviderEventsInput = {
    id?: string
    amountMinor: number
    currency: $Enums.Currency
    method: $Enums.PaymentMethod
    provider?: $Enums.PaymentProvider
    status?: $Enums.PaymentStatus
    providerIntentRef?: string | null
    providerCustomerRef?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutPaymentIntentsInput
    booking: BookingCreateNestedOneWithoutPaymentIntentsInput
    transactions?: PaymentTransactionCreateNestedManyWithoutPaymentIntentInput
  }

  export type PaymentIntentUncheckedCreateWithoutProviderEventsInput = {
    id?: string
    propertyId: string
    bookingId: string
    amountMinor: number
    currency: $Enums.Currency
    method: $Enums.PaymentMethod
    provider?: $Enums.PaymentProvider
    status?: $Enums.PaymentStatus
    providerIntentRef?: string | null
    providerCustomerRef?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: PaymentTransactionUncheckedCreateNestedManyWithoutPaymentIntentInput
  }

  export type PaymentIntentCreateOrConnectWithoutProviderEventsInput = {
    where: PaymentIntentWhereUniqueInput
    create: XOR<PaymentIntentCreateWithoutProviderEventsInput, PaymentIntentUncheckedCreateWithoutProviderEventsInput>
  }

  export type PaymentIntentUpsertWithoutProviderEventsInput = {
    update: XOR<PaymentIntentUpdateWithoutProviderEventsInput, PaymentIntentUncheckedUpdateWithoutProviderEventsInput>
    create: XOR<PaymentIntentCreateWithoutProviderEventsInput, PaymentIntentUncheckedCreateWithoutProviderEventsInput>
    where?: PaymentIntentWhereInput
  }

  export type PaymentIntentUpdateToOneWithWhereWithoutProviderEventsInput = {
    where?: PaymentIntentWhereInput
    data: XOR<PaymentIntentUpdateWithoutProviderEventsInput, PaymentIntentUncheckedUpdateWithoutProviderEventsInput>
  }

  export type PaymentIntentUpdateWithoutProviderEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    providerIntentRef?: NullableStringFieldUpdateOperationsInput | string | null
    providerCustomerRef?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutPaymentIntentsNestedInput
    booking?: BookingUpdateOneRequiredWithoutPaymentIntentsNestedInput
    transactions?: PaymentTransactionUpdateManyWithoutPaymentIntentNestedInput
  }

  export type PaymentIntentUncheckedUpdateWithoutProviderEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    providerIntentRef?: NullableStringFieldUpdateOperationsInput | string | null
    providerCustomerRef?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: PaymentTransactionUncheckedUpdateManyWithoutPaymentIntentNestedInput
  }

  export type PropertyCreateWithoutMessageThreadsInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    city: string
    country: string
    addressLine1?: string | null
    addressLine2?: string | null
    postalCode?: string | null
    timezone?: string
    defaultCurrency?: $Enums.Currency
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    unitTypes?: UnitTypeCreateNestedManyWithoutPropertyInput
    units?: UnitCreateNestedManyWithoutPropertyInput
    bookings?: BookingCreateNestedManyWithoutPropertyInput
    priceSnapshots?: PriceSnapshotCreateNestedManyWithoutPropertyInput
    paymentIntents?: PaymentIntentCreateNestedManyWithoutPropertyInput
    auditLogs?: AuditLogCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutMessageThreadsInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    city: string
    country: string
    addressLine1?: string | null
    addressLine2?: string | null
    postalCode?: string | null
    timezone?: string
    defaultCurrency?: $Enums.Currency
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    unitTypes?: UnitTypeUncheckedCreateNestedManyWithoutPropertyInput
    units?: UnitUncheckedCreateNestedManyWithoutPropertyInput
    bookings?: BookingUncheckedCreateNestedManyWithoutPropertyInput
    priceSnapshots?: PriceSnapshotUncheckedCreateNestedManyWithoutPropertyInput
    paymentIntents?: PaymentIntentUncheckedCreateNestedManyWithoutPropertyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutMessageThreadsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutMessageThreadsInput, PropertyUncheckedCreateWithoutMessageThreadsInput>
  }

  export type BookingCreateWithoutMessageThreadsInput = {
    id?: string
    idempotencyKey?: string | null
    status?: $Enums.BookingStatus
    paymentStatus?: $Enums.PaymentStatus
    checkInDate: Date | string
    checkOutDate: Date | string
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount?: number
    currency?: $Enums.Currency
    totalAmountMinor: number
    notes?: string | null
    cancelledAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    priceSnapshot?: PriceSnapshotCreateNestedOneWithoutBookingInput
    paymentIntents?: PaymentIntentCreateNestedManyWithoutBookingInput
    auditLogs?: AuditLogCreateNestedManyWithoutBookingInput
    property: PropertyCreateNestedOneWithoutBookingsInput
    unit: UnitCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutMessageThreadsInput = {
    id?: string
    propertyId: string
    unitId: string
    idempotencyKey?: string | null
    status?: $Enums.BookingStatus
    paymentStatus?: $Enums.PaymentStatus
    checkInDate: Date | string
    checkOutDate: Date | string
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount?: number
    currency?: $Enums.Currency
    totalAmountMinor: number
    notes?: string | null
    cancelledAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    priceSnapshot?: PriceSnapshotUncheckedCreateNestedOneWithoutBookingInput
    paymentIntents?: PaymentIntentUncheckedCreateNestedManyWithoutBookingInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutMessageThreadsInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutMessageThreadsInput, BookingUncheckedCreateWithoutMessageThreadsInput>
  }

  export type MessageCreateWithoutThreadInput = {
    id?: string
    senderRole: $Enums.Role
    senderUserId?: string | null
    senderName?: string | null
    body: string
    isInternalNote?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUncheckedCreateWithoutThreadInput = {
    id?: string
    senderRole: $Enums.Role
    senderUserId?: string | null
    senderName?: string | null
    body: string
    isInternalNote?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutThreadInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutThreadInput, MessageUncheckedCreateWithoutThreadInput>
  }

  export type MessageCreateManyThreadInputEnvelope = {
    data: MessageCreateManyThreadInput | MessageCreateManyThreadInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutMessageThreadInput = {
    id?: string
    actorRole: $Enums.Role
    actorUserId?: string | null
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    requestId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    property: PropertyCreateNestedOneWithoutAuditLogsInput
    booking?: BookingCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutMessageThreadInput = {
    id?: string
    propertyId: string
    bookingId?: string | null
    actorRole: $Enums.Role
    actorUserId?: string | null
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    requestId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutMessageThreadInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutMessageThreadInput, AuditLogUncheckedCreateWithoutMessageThreadInput>
  }

  export type AuditLogCreateManyMessageThreadInputEnvelope = {
    data: AuditLogCreateManyMessageThreadInput | AuditLogCreateManyMessageThreadInput[]
    skipDuplicates?: boolean
  }

  export type PropertyUpsertWithoutMessageThreadsInput = {
    update: XOR<PropertyUpdateWithoutMessageThreadsInput, PropertyUncheckedUpdateWithoutMessageThreadsInput>
    create: XOR<PropertyCreateWithoutMessageThreadsInput, PropertyUncheckedCreateWithoutMessageThreadsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutMessageThreadsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutMessageThreadsInput, PropertyUncheckedUpdateWithoutMessageThreadsInput>
  }

  export type PropertyUpdateWithoutMessageThreadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unitTypes?: UnitTypeUpdateManyWithoutPropertyNestedInput
    units?: UnitUpdateManyWithoutPropertyNestedInput
    bookings?: BookingUpdateManyWithoutPropertyNestedInput
    priceSnapshots?: PriceSnapshotUpdateManyWithoutPropertyNestedInput
    paymentIntents?: PaymentIntentUpdateManyWithoutPropertyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutMessageThreadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unitTypes?: UnitTypeUncheckedUpdateManyWithoutPropertyNestedInput
    units?: UnitUncheckedUpdateManyWithoutPropertyNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutPropertyNestedInput
    priceSnapshots?: PriceSnapshotUncheckedUpdateManyWithoutPropertyNestedInput
    paymentIntents?: PaymentIntentUncheckedUpdateManyWithoutPropertyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type BookingUpsertWithoutMessageThreadsInput = {
    update: XOR<BookingUpdateWithoutMessageThreadsInput, BookingUncheckedUpdateWithoutMessageThreadsInput>
    create: XOR<BookingCreateWithoutMessageThreadsInput, BookingUncheckedCreateWithoutMessageThreadsInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutMessageThreadsInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutMessageThreadsInput, BookingUncheckedUpdateWithoutMessageThreadsInput>
  }

  export type BookingUpdateWithoutMessageThreadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceSnapshot?: PriceSnapshotUpdateOneWithoutBookingNestedInput
    paymentIntents?: PaymentIntentUpdateManyWithoutBookingNestedInput
    auditLogs?: AuditLogUpdateManyWithoutBookingNestedInput
    property?: PropertyUpdateOneRequiredWithoutBookingsNestedInput
    unit?: UnitUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutMessageThreadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceSnapshot?: PriceSnapshotUncheckedUpdateOneWithoutBookingNestedInput
    paymentIntents?: PaymentIntentUncheckedUpdateManyWithoutBookingNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type MessageUpsertWithWhereUniqueWithoutThreadInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutThreadInput, MessageUncheckedUpdateWithoutThreadInput>
    create: XOR<MessageCreateWithoutThreadInput, MessageUncheckedCreateWithoutThreadInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutThreadInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutThreadInput, MessageUncheckedUpdateWithoutThreadInput>
  }

  export type MessageUpdateManyWithWhereWithoutThreadInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutThreadInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    threadId?: StringFilter<"Message"> | string
    senderRole?: EnumRoleFilter<"Message"> | $Enums.Role
    senderUserId?: StringNullableFilter<"Message"> | string | null
    senderName?: StringNullableFilter<"Message"> | string | null
    body?: StringFilter<"Message"> | string
    isInternalNote?: BoolFilter<"Message"> | boolean
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutMessageThreadInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutMessageThreadInput, AuditLogUncheckedUpdateWithoutMessageThreadInput>
    create: XOR<AuditLogCreateWithoutMessageThreadInput, AuditLogUncheckedCreateWithoutMessageThreadInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutMessageThreadInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutMessageThreadInput, AuditLogUncheckedUpdateWithoutMessageThreadInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutMessageThreadInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutMessageThreadInput>
  }

  export type MessageThreadCreateWithoutMessagesInput = {
    id?: string
    subject?: string | null
    guestFullName: string
    guestEmail: string
    status?: $Enums.MessageThreadStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string | null
    property: PropertyCreateNestedOneWithoutMessageThreadsInput
    booking?: BookingCreateNestedOneWithoutMessageThreadsInput
    auditLogs?: AuditLogCreateNestedManyWithoutMessageThreadInput
  }

  export type MessageThreadUncheckedCreateWithoutMessagesInput = {
    id?: string
    propertyId: string
    bookingId?: string | null
    subject?: string | null
    guestFullName: string
    guestEmail: string
    status?: $Enums.MessageThreadStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string | null
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutMessageThreadInput
  }

  export type MessageThreadCreateOrConnectWithoutMessagesInput = {
    where: MessageThreadWhereUniqueInput
    create: XOR<MessageThreadCreateWithoutMessagesInput, MessageThreadUncheckedCreateWithoutMessagesInput>
  }

  export type MessageThreadUpsertWithoutMessagesInput = {
    update: XOR<MessageThreadUpdateWithoutMessagesInput, MessageThreadUncheckedUpdateWithoutMessagesInput>
    create: XOR<MessageThreadCreateWithoutMessagesInput, MessageThreadUncheckedCreateWithoutMessagesInput>
    where?: MessageThreadWhereInput
  }

  export type MessageThreadUpdateToOneWithWhereWithoutMessagesInput = {
    where?: MessageThreadWhereInput
    data: XOR<MessageThreadUpdateWithoutMessagesInput, MessageThreadUncheckedUpdateWithoutMessagesInput>
  }

  export type MessageThreadUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageThreadStatusFieldUpdateOperationsInput | $Enums.MessageThreadStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property?: PropertyUpdateOneRequiredWithoutMessageThreadsNestedInput
    booking?: BookingUpdateOneWithoutMessageThreadsNestedInput
    auditLogs?: AuditLogUpdateManyWithoutMessageThreadNestedInput
  }

  export type MessageThreadUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageThreadStatusFieldUpdateOperationsInput | $Enums.MessageThreadStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auditLogs?: AuditLogUncheckedUpdateManyWithoutMessageThreadNestedInput
  }

  export type PropertyCreateWithoutAuditLogsInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    city: string
    country: string
    addressLine1?: string | null
    addressLine2?: string | null
    postalCode?: string | null
    timezone?: string
    defaultCurrency?: $Enums.Currency
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    unitTypes?: UnitTypeCreateNestedManyWithoutPropertyInput
    units?: UnitCreateNestedManyWithoutPropertyInput
    bookings?: BookingCreateNestedManyWithoutPropertyInput
    priceSnapshots?: PriceSnapshotCreateNestedManyWithoutPropertyInput
    paymentIntents?: PaymentIntentCreateNestedManyWithoutPropertyInput
    messageThreads?: MessageThreadCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    city: string
    country: string
    addressLine1?: string | null
    addressLine2?: string | null
    postalCode?: string | null
    timezone?: string
    defaultCurrency?: $Enums.Currency
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    unitTypes?: UnitTypeUncheckedCreateNestedManyWithoutPropertyInput
    units?: UnitUncheckedCreateNestedManyWithoutPropertyInput
    bookings?: BookingUncheckedCreateNestedManyWithoutPropertyInput
    priceSnapshots?: PriceSnapshotUncheckedCreateNestedManyWithoutPropertyInput
    paymentIntents?: PaymentIntentUncheckedCreateNestedManyWithoutPropertyInput
    messageThreads?: MessageThreadUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutAuditLogsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutAuditLogsInput, PropertyUncheckedCreateWithoutAuditLogsInput>
  }

  export type BookingCreateWithoutAuditLogsInput = {
    id?: string
    idempotencyKey?: string | null
    status?: $Enums.BookingStatus
    paymentStatus?: $Enums.PaymentStatus
    checkInDate: Date | string
    checkOutDate: Date | string
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount?: number
    currency?: $Enums.Currency
    totalAmountMinor: number
    notes?: string | null
    cancelledAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    priceSnapshot?: PriceSnapshotCreateNestedOneWithoutBookingInput
    paymentIntents?: PaymentIntentCreateNestedManyWithoutBookingInput
    messageThreads?: MessageThreadCreateNestedManyWithoutBookingInput
    property: PropertyCreateNestedOneWithoutBookingsInput
    unit: UnitCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    propertyId: string
    unitId: string
    idempotencyKey?: string | null
    status?: $Enums.BookingStatus
    paymentStatus?: $Enums.PaymentStatus
    checkInDate: Date | string
    checkOutDate: Date | string
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount?: number
    currency?: $Enums.Currency
    totalAmountMinor: number
    notes?: string | null
    cancelledAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    priceSnapshot?: PriceSnapshotUncheckedCreateNestedOneWithoutBookingInput
    paymentIntents?: PaymentIntentUncheckedCreateNestedManyWithoutBookingInput
    messageThreads?: MessageThreadUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutAuditLogsInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutAuditLogsInput, BookingUncheckedCreateWithoutAuditLogsInput>
  }

  export type MessageThreadCreateWithoutAuditLogsInput = {
    id?: string
    subject?: string | null
    guestFullName: string
    guestEmail: string
    status?: $Enums.MessageThreadStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string | null
    property: PropertyCreateNestedOneWithoutMessageThreadsInput
    booking?: BookingCreateNestedOneWithoutMessageThreadsInput
    messages?: MessageCreateNestedManyWithoutThreadInput
  }

  export type MessageThreadUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    propertyId: string
    bookingId?: string | null
    subject?: string | null
    guestFullName: string
    guestEmail: string
    status?: $Enums.MessageThreadStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string | null
    messages?: MessageUncheckedCreateNestedManyWithoutThreadInput
  }

  export type MessageThreadCreateOrConnectWithoutAuditLogsInput = {
    where: MessageThreadWhereUniqueInput
    create: XOR<MessageThreadCreateWithoutAuditLogsInput, MessageThreadUncheckedCreateWithoutAuditLogsInput>
  }

  export type PropertyUpsertWithoutAuditLogsInput = {
    update: XOR<PropertyUpdateWithoutAuditLogsInput, PropertyUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<PropertyCreateWithoutAuditLogsInput, PropertyUncheckedCreateWithoutAuditLogsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutAuditLogsInput, PropertyUncheckedUpdateWithoutAuditLogsInput>
  }

  export type PropertyUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unitTypes?: UnitTypeUpdateManyWithoutPropertyNestedInput
    units?: UnitUpdateManyWithoutPropertyNestedInput
    bookings?: BookingUpdateManyWithoutPropertyNestedInput
    priceSnapshots?: PriceSnapshotUpdateManyWithoutPropertyNestedInput
    paymentIntents?: PaymentIntentUpdateManyWithoutPropertyNestedInput
    messageThreads?: MessageThreadUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCurrency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unitTypes?: UnitTypeUncheckedUpdateManyWithoutPropertyNestedInput
    units?: UnitUncheckedUpdateManyWithoutPropertyNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutPropertyNestedInput
    priceSnapshots?: PriceSnapshotUncheckedUpdateManyWithoutPropertyNestedInput
    paymentIntents?: PaymentIntentUncheckedUpdateManyWithoutPropertyNestedInput
    messageThreads?: MessageThreadUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type BookingUpsertWithoutAuditLogsInput = {
    update: XOR<BookingUpdateWithoutAuditLogsInput, BookingUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<BookingCreateWithoutAuditLogsInput, BookingUncheckedCreateWithoutAuditLogsInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutAuditLogsInput, BookingUncheckedUpdateWithoutAuditLogsInput>
  }

  export type BookingUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceSnapshot?: PriceSnapshotUpdateOneWithoutBookingNestedInput
    paymentIntents?: PaymentIntentUpdateManyWithoutBookingNestedInput
    messageThreads?: MessageThreadUpdateManyWithoutBookingNestedInput
    property?: PropertyUpdateOneRequiredWithoutBookingsNestedInput
    unit?: UnitUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceSnapshot?: PriceSnapshotUncheckedUpdateOneWithoutBookingNestedInput
    paymentIntents?: PaymentIntentUncheckedUpdateManyWithoutBookingNestedInput
    messageThreads?: MessageThreadUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type MessageThreadUpsertWithoutAuditLogsInput = {
    update: XOR<MessageThreadUpdateWithoutAuditLogsInput, MessageThreadUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<MessageThreadCreateWithoutAuditLogsInput, MessageThreadUncheckedCreateWithoutAuditLogsInput>
    where?: MessageThreadWhereInput
  }

  export type MessageThreadUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: MessageThreadWhereInput
    data: XOR<MessageThreadUpdateWithoutAuditLogsInput, MessageThreadUncheckedUpdateWithoutAuditLogsInput>
  }

  export type MessageThreadUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageThreadStatusFieldUpdateOperationsInput | $Enums.MessageThreadStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property?: PropertyUpdateOneRequiredWithoutMessageThreadsNestedInput
    booking?: BookingUpdateOneWithoutMessageThreadsNestedInput
    messages?: MessageUpdateManyWithoutThreadNestedInput
  }

  export type MessageThreadUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageThreadStatusFieldUpdateOperationsInput | $Enums.MessageThreadStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUncheckedUpdateManyWithoutThreadNestedInput
  }

  export type UnitTypeCreateManyPropertyInput = {
    id?: string
    slug: string
    name: string
    description?: string | null
    coverImageUrl?: string | null
    galleryImageUrls?: UnitTypeCreategalleryImageUrlsInput | string[]
    estimatedRating?: number
    status?: $Enums.UnitTypeStatus
    maxGuests: number
    basePriceMinor: number
    currency?: $Enums.Currency
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UnitCreateManyPropertyInput = {
    id?: string
    unitTypeId: string
    code: string
    name?: string | null
    floor?: string | null
    status?: $Enums.UnitStatus
    isBookable?: boolean
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateManyPropertyInput = {
    id?: string
    unitId: string
    idempotencyKey?: string | null
    status?: $Enums.BookingStatus
    paymentStatus?: $Enums.PaymentStatus
    checkInDate: Date | string
    checkOutDate: Date | string
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount?: number
    currency?: $Enums.Currency
    totalAmountMinor: number
    notes?: string | null
    cancelledAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceSnapshotCreateManyPropertyInput = {
    id?: string
    bookingId: string
    currency: $Enums.Currency
    nightsCount: number
    nightlyRateMinor: number
    subtotalMinor: number
    discountsMinor?: number
    taxesMinor?: number
    feesMinor?: number
    totalAmountMinor: number
    pricingVersion?: number
    promotionCode?: string | null
    capturedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentIntentCreateManyPropertyInput = {
    id?: string
    bookingId: string
    amountMinor: number
    currency: $Enums.Currency
    method: $Enums.PaymentMethod
    provider?: $Enums.PaymentProvider
    status?: $Enums.PaymentStatus
    providerIntentRef?: string | null
    providerCustomerRef?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageThreadCreateManyPropertyInput = {
    id?: string
    bookingId?: string | null
    subject?: string | null
    guestFullName: string
    guestEmail: string
    status?: $Enums.MessageThreadStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string | null
  }

  export type AuditLogCreateManyPropertyInput = {
    id?: string
    bookingId?: string | null
    messageThreadId?: string | null
    actorRole: $Enums.Role
    actorUserId?: string | null
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    requestId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type UnitTypeUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    galleryImageUrls?: UnitTypeUpdategalleryImageUrlsInput | string[]
    estimatedRating?: FloatFieldUpdateOperationsInput | number
    status?: EnumUnitTypeStatusFieldUpdateOperationsInput | $Enums.UnitTypeStatus
    maxGuests?: IntFieldUpdateOperationsInput | number
    basePriceMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    units?: UnitUpdateManyWithoutUnitTypeNestedInput
  }

  export type UnitTypeUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    galleryImageUrls?: UnitTypeUpdategalleryImageUrlsInput | string[]
    estimatedRating?: FloatFieldUpdateOperationsInput | number
    status?: EnumUnitTypeStatusFieldUpdateOperationsInput | $Enums.UnitTypeStatus
    maxGuests?: IntFieldUpdateOperationsInput | number
    basePriceMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    units?: UnitUncheckedUpdateManyWithoutUnitTypeNestedInput
  }

  export type UnitTypeUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    galleryImageUrls?: UnitTypeUpdategalleryImageUrlsInput | string[]
    estimatedRating?: FloatFieldUpdateOperationsInput | number
    status?: EnumUnitTypeStatusFieldUpdateOperationsInput | $Enums.UnitTypeStatus
    maxGuests?: IntFieldUpdateOperationsInput | number
    basePriceMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UnitUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUnitStatusFieldUpdateOperationsInput | $Enums.UnitStatus
    isBookable?: BoolFieldUpdateOperationsInput | boolean
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutUnitNestedInput
    unitType?: UnitTypeUpdateOneRequiredWithoutUnitsNestedInput
  }

  export type UnitUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitTypeId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUnitStatusFieldUpdateOperationsInput | $Enums.UnitStatus
    isBookable?: BoolFieldUpdateOperationsInput | boolean
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutUnitNestedInput
  }

  export type UnitUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitTypeId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUnitStatusFieldUpdateOperationsInput | $Enums.UnitStatus
    isBookable?: BoolFieldUpdateOperationsInput | boolean
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceSnapshot?: PriceSnapshotUpdateOneWithoutBookingNestedInput
    paymentIntents?: PaymentIntentUpdateManyWithoutBookingNestedInput
    messageThreads?: MessageThreadUpdateManyWithoutBookingNestedInput
    auditLogs?: AuditLogUpdateManyWithoutBookingNestedInput
    unit?: UnitUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceSnapshot?: PriceSnapshotUncheckedUpdateOneWithoutBookingNestedInput
    paymentIntents?: PaymentIntentUncheckedUpdateManyWithoutBookingNestedInput
    messageThreads?: MessageThreadUncheckedUpdateManyWithoutBookingNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceSnapshotUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    nightsCount?: IntFieldUpdateOperationsInput | number
    nightlyRateMinor?: IntFieldUpdateOperationsInput | number
    subtotalMinor?: IntFieldUpdateOperationsInput | number
    discountsMinor?: IntFieldUpdateOperationsInput | number
    taxesMinor?: IntFieldUpdateOperationsInput | number
    feesMinor?: IntFieldUpdateOperationsInput | number
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    pricingVersion?: IntFieldUpdateOperationsInput | number
    promotionCode?: NullableStringFieldUpdateOperationsInput | string | null
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutPriceSnapshotNestedInput
  }

  export type PriceSnapshotUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    nightsCount?: IntFieldUpdateOperationsInput | number
    nightlyRateMinor?: IntFieldUpdateOperationsInput | number
    subtotalMinor?: IntFieldUpdateOperationsInput | number
    discountsMinor?: IntFieldUpdateOperationsInput | number
    taxesMinor?: IntFieldUpdateOperationsInput | number
    feesMinor?: IntFieldUpdateOperationsInput | number
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    pricingVersion?: IntFieldUpdateOperationsInput | number
    promotionCode?: NullableStringFieldUpdateOperationsInput | string | null
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceSnapshotUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    nightsCount?: IntFieldUpdateOperationsInput | number
    nightlyRateMinor?: IntFieldUpdateOperationsInput | number
    subtotalMinor?: IntFieldUpdateOperationsInput | number
    discountsMinor?: IntFieldUpdateOperationsInput | number
    taxesMinor?: IntFieldUpdateOperationsInput | number
    feesMinor?: IntFieldUpdateOperationsInput | number
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    pricingVersion?: IntFieldUpdateOperationsInput | number
    promotionCode?: NullableStringFieldUpdateOperationsInput | string | null
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentIntentUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    providerIntentRef?: NullableStringFieldUpdateOperationsInput | string | null
    providerCustomerRef?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutPaymentIntentsNestedInput
    transactions?: PaymentTransactionUpdateManyWithoutPaymentIntentNestedInput
    providerEvents?: ProviderEventUpdateManyWithoutPaymentIntentNestedInput
  }

  export type PaymentIntentUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    providerIntentRef?: NullableStringFieldUpdateOperationsInput | string | null
    providerCustomerRef?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: PaymentTransactionUncheckedUpdateManyWithoutPaymentIntentNestedInput
    providerEvents?: ProviderEventUncheckedUpdateManyWithoutPaymentIntentNestedInput
  }

  export type PaymentIntentUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    providerIntentRef?: NullableStringFieldUpdateOperationsInput | string | null
    providerCustomerRef?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageThreadUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageThreadStatusFieldUpdateOperationsInput | $Enums.MessageThreadStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    booking?: BookingUpdateOneWithoutMessageThreadsNestedInput
    messages?: MessageUpdateManyWithoutThreadNestedInput
    auditLogs?: AuditLogUpdateManyWithoutMessageThreadNestedInput
  }

  export type MessageThreadUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageThreadStatusFieldUpdateOperationsInput | $Enums.MessageThreadStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUncheckedUpdateManyWithoutThreadNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutMessageThreadNestedInput
  }

  export type MessageThreadUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageThreadStatusFieldUpdateOperationsInput | $Enums.MessageThreadStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuditLogUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneWithoutAuditLogsNestedInput
    messageThread?: MessageThreadUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    messageThreadId?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    messageThreadId?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UnitCreateManyUnitTypeInput = {
    id?: string
    propertyId: string
    code: string
    name?: string | null
    floor?: string | null
    status?: $Enums.UnitStatus
    isBookable?: boolean
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UnitUpdateWithoutUnitTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUnitStatusFieldUpdateOperationsInput | $Enums.UnitStatus
    isBookable?: BoolFieldUpdateOperationsInput | boolean
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutUnitNestedInput
    property?: PropertyUpdateOneRequiredWithoutUnitsNestedInput
  }

  export type UnitUncheckedUpdateWithoutUnitTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUnitStatusFieldUpdateOperationsInput | $Enums.UnitStatus
    isBookable?: BoolFieldUpdateOperationsInput | boolean
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutUnitNestedInput
  }

  export type UnitUncheckedUpdateManyWithoutUnitTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUnitStatusFieldUpdateOperationsInput | $Enums.UnitStatus
    isBookable?: BoolFieldUpdateOperationsInput | boolean
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyUnitInput = {
    id?: string
    propertyId: string
    idempotencyKey?: string | null
    status?: $Enums.BookingStatus
    paymentStatus?: $Enums.PaymentStatus
    checkInDate: Date | string
    checkOutDate: Date | string
    guestFullName: string
    guestEmail: string
    guestPhone: string
    adultsCount: number
    childrenCount?: number
    currency?: $Enums.Currency
    totalAmountMinor: number
    notes?: string | null
    cancelledAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateWithoutUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceSnapshot?: PriceSnapshotUpdateOneWithoutBookingNestedInput
    paymentIntents?: PaymentIntentUpdateManyWithoutBookingNestedInput
    messageThreads?: MessageThreadUpdateManyWithoutBookingNestedInput
    auditLogs?: AuditLogUpdateManyWithoutBookingNestedInput
    property?: PropertyUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceSnapshot?: PriceSnapshotUncheckedUpdateOneWithoutBookingNestedInput
    paymentIntents?: PaymentIntentUncheckedUpdateManyWithoutBookingNestedInput
    messageThreads?: MessageThreadUncheckedUpdateManyWithoutBookingNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    checkInDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: StringFieldUpdateOperationsInput | string
    adultsCount?: IntFieldUpdateOperationsInput | number
    childrenCount?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    totalAmountMinor?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentIntentCreateManyBookingInput = {
    id?: string
    propertyId: string
    amountMinor: number
    currency: $Enums.Currency
    method: $Enums.PaymentMethod
    provider?: $Enums.PaymentProvider
    status?: $Enums.PaymentStatus
    providerIntentRef?: string | null
    providerCustomerRef?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageThreadCreateManyBookingInput = {
    id?: string
    propertyId: string
    subject?: string | null
    guestFullName: string
    guestEmail: string
    status?: $Enums.MessageThreadStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string | null
  }

  export type AuditLogCreateManyBookingInput = {
    id?: string
    propertyId: string
    messageThreadId?: string | null
    actorRole: $Enums.Role
    actorUserId?: string | null
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    requestId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PaymentIntentUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    providerIntentRef?: NullableStringFieldUpdateOperationsInput | string | null
    providerCustomerRef?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutPaymentIntentsNestedInput
    transactions?: PaymentTransactionUpdateManyWithoutPaymentIntentNestedInput
    providerEvents?: ProviderEventUpdateManyWithoutPaymentIntentNestedInput
  }

  export type PaymentIntentUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    providerIntentRef?: NullableStringFieldUpdateOperationsInput | string | null
    providerCustomerRef?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: PaymentTransactionUncheckedUpdateManyWithoutPaymentIntentNestedInput
    providerEvents?: ProviderEventUncheckedUpdateManyWithoutPaymentIntentNestedInput
  }

  export type PaymentIntentUncheckedUpdateManyWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    provider?: EnumPaymentProviderFieldUpdateOperationsInput | $Enums.PaymentProvider
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    providerIntentRef?: NullableStringFieldUpdateOperationsInput | string | null
    providerCustomerRef?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageThreadUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageThreadStatusFieldUpdateOperationsInput | $Enums.MessageThreadStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property?: PropertyUpdateOneRequiredWithoutMessageThreadsNestedInput
    messages?: MessageUpdateManyWithoutThreadNestedInput
    auditLogs?: AuditLogUpdateManyWithoutMessageThreadNestedInput
  }

  export type MessageThreadUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageThreadStatusFieldUpdateOperationsInput | $Enums.MessageThreadStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUncheckedUpdateManyWithoutThreadNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutMessageThreadNestedInput
  }

  export type MessageThreadUncheckedUpdateManyWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    guestFullName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    status?: EnumMessageThreadStatusFieldUpdateOperationsInput | $Enums.MessageThreadStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuditLogUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutAuditLogsNestedInput
    messageThread?: MessageThreadUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    messageThreadId?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    messageThreadId?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentTransactionCreateManyPaymentIntentInput = {
    id?: string
    status: $Enums.PaymentStatus
    amountMinor: number
    currency: $Enums.Currency
    providerTxnRef?: string | null
    externalReference?: string | null
    message?: string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    sequence: number
    occurredAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProviderEventCreateManyPaymentIntentInput = {
    id?: string
    provider: string
    eventId: string
    providerReference?: string | null
    status?: string | null
    signatureValid: boolean
    rawPayload: JsonNullValueInput | InputJsonValue
    occurredAt?: Date | string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentTransactionUpdateWithoutPaymentIntentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    providerTxnRef?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    sequence?: IntFieldUpdateOperationsInput | number
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentTransactionUncheckedUpdateWithoutPaymentIntentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    providerTxnRef?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    sequence?: IntFieldUpdateOperationsInput | number
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentTransactionUncheckedUpdateManyWithoutPaymentIntentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    amountMinor?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    providerTxnRef?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    sequence?: IntFieldUpdateOperationsInput | number
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderEventUpdateWithoutPaymentIntentInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    providerReference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    signatureValid?: BoolFieldUpdateOperationsInput | boolean
    rawPayload?: JsonNullValueInput | InputJsonValue
    occurredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderEventUncheckedUpdateWithoutPaymentIntentInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    providerReference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    signatureValid?: BoolFieldUpdateOperationsInput | boolean
    rawPayload?: JsonNullValueInput | InputJsonValue
    occurredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderEventUncheckedUpdateManyWithoutPaymentIntentInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    providerReference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    signatureValid?: BoolFieldUpdateOperationsInput | boolean
    rawPayload?: JsonNullValueInput | InputJsonValue
    occurredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyThreadInput = {
    id?: string
    senderRole: $Enums.Role
    senderUserId?: string | null
    senderName?: string | null
    body: string
    isInternalNote?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateManyMessageThreadInput = {
    id?: string
    propertyId: string
    bookingId?: string | null
    actorRole: $Enums.Role
    actorUserId?: string | null
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    requestId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MessageUpdateWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    senderUserId?: NullableStringFieldUpdateOperationsInput | string | null
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isInternalNote?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    senderUserId?: NullableStringFieldUpdateOperationsInput | string | null
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isInternalNote?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    senderUserId?: NullableStringFieldUpdateOperationsInput | string | null
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isInternalNote?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutMessageThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutAuditLogsNestedInput
    booking?: BookingUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutMessageThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutMessageThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}