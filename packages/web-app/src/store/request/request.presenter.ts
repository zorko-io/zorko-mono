import { fromJS, Map } from 'immutable';
import { RequestState } from './request.state';
import { AbstractImmutablePresenter } from '../abstract.immutable.presenter';

const DEFAULT_REQUEST_STATE: RequestState = {
  isPending: false,
  isSucceed: false,
  error: null
};

export class RequestPresenter extends AbstractImmutablePresenter<RequestState> {
  static fromJS(state: Partial<RequestState>): RequestPresenter{
    return RequestPresenter.create(fromJS({
      ...DEFAULT_REQUEST_STATE,
      ...state,
    }));
  }

  static create(state?: Map<string, any>): RequestPresenter {
    return new RequestPresenter(state || fromJS(DEFAULT_REQUEST_STATE));
  }

  isPending(): boolean {
    return this.immutable.get('isPending');
  }

  isSucceed(): boolean {
    return this.immutable.get('isSucceed');
  }

  getError (): Error | null {
    return this.immutable.get('error');
  }

  setPending(value: boolean) {
    return this.addMutation(
      (state: Map<string, any>) => state.set('isPending', value)
    );
  }

  setSucceed(value: boolean) {
    return this.addMutation(
      (state: Map<string, any>) => state
        .set('isPending', false)
        .set('error', null)
        .set('isSucceed', value)
    );
  }

  setError(value: Error | null) {
    return this.addMutation(
      (mutator: Map<string, any>) => mutator
        .set('isPending', false)
        .set('isSucceed', false)
        .set('error', fromJS(value))
    );
  }

  reset() {
    this.immutable = fromJS(DEFAULT_REQUEST_STATE);
    this.cleanMutations();
    return this;
  }

  asJS(): RequestState {
    return {
      isPending: this.isPending(),
      isSucceed: this.isSucceed(),
      error: this.getError()
    }
  }

}
