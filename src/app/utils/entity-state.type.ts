export type FetchingError = { status: number; message: string };

// idle - initial
type IdleState = {
  state: ENTITY_STATE_VALUE["IDLE"];
};
// loading
type LoadingState = {
  state: ENTITY_STATE_VALUE["LOADING"];
};
// success
type SuccessState<T> = {
  state: ENTITY_STATE_VALUE["SUCCESS"];
  value: T;
};
// error
type ErrorState = {
  state: ENTITY_STATE_VALUE["ERROR"];
  error: FetchingError;
};

type ENTITY_STATE_VALUE = typeof ENTITY_STATE_VALUE;

export const ENTITY_STATE_VALUE = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
} as const;

export type EntityStateValue = keyof typeof ENTITY_STATE_VALUE;

export type EntityState<T> = IdleState | LoadingState | SuccessState<T> | ErrorState;
