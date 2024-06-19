export type LoadingState = {
  idle: boolean;
  loading: boolean;
  error: FetchingError | null;
};

type FetchingError = { message: string; status: number };
