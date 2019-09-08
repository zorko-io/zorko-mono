import { fromJS, Map } from 'immutable';
import { DEFAULT_REQUEST_STATE, RequestState } from './request.state';
import { AbstractImmutablePresenter } from '../abstract.immutable.presenter';
import { RequestGetter } from './request.getter';

export class RequestPresenter extends AbstractImmutablePresenter<RequestState, RequestGetter> {
  static fromJS(state: Partial<RequestState>): RequestPresenter{
    return RequestPresenter.create(fromJS({
      ...DEFAULT_REQUEST_STATE,
      ...state,
    }));
  }

  static create(state?: Map<string, any>): RequestPresenter {
    const getter = RequestGetter.create();
    return new RequestPresenter(state || fromJS(DEFAULT_REQUEST_STATE), getter);
  }

  setPending(value: boolean) {
    return this.addMutation(
      (state: Map<string, any>) =>
        state.set(this.getter.isPendingPath, value)
    );
  }

  setSucceed(value: boolean) {
    let getter = this.getter;
    return this.addMutation(
      (state: Map<string, any>) => state
        .set(getter.isPendingPath, false)
        .set(getter.errorPath, null)
        .set(getter.isSucceedPath, value)
    );
  }

  setError(value: Error | null) {
    let getter = this.getter;

    return this.addMutation(
      (mutator: Map<string, any>) => mutator
        .set(getter.isPendingPath, false)
        .set(getter.isSucceedPath, false)
        .set(getter.errorPath, fromJS(value))
    );
  }

  reset() {
    this.immutable = fromJS(DEFAULT_REQUEST_STATE);
    this.cleanMutations();
    return this;
  }
}
