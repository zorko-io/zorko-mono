export interface RequestState {
  isPending: boolean
  isSucceed: boolean
  error: Error | null
}

export const DEFAULT_REQUEST_STATE: RequestState = {
  isPending: false,
  isSucceed: false,
  error: null
};
