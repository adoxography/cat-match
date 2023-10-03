export type ValueOf<K> = K[keyof K]

type Payload = Record<string, unknown>;

type PayloadActions<TMap extends Payload | null> = ValueOf<{
  [TKey in keyof TMap]: TMap[TKey] extends Payload
    ? {
      type: TKey;
      payload: TMap[TKey];
    }
    : never;
}>;

type NonPayloadActions<TMap extends Payload | null> = ValueOf<{
  [TKey in keyof TMap]: TMap[TKey] extends Payload
    ? never
    : {
      type: TKey;
      payload?: never;
    };
}>;

export type ReducerAction<TMap extends Payload | null> =
  | PayloadActions<TMap>
  | NonPayloadActions<TMap>;
