import _ from 'lodash';
import { fromJS, Map } from 'immutable';
import { Presenter } from '../presenter';
import { RequestState } from './request.state';

const DEFAULT_REQUEST_STATE: RequestState = {
  isPending: false,
  isSucceed: false,
  error: null
};

export class RequestPresenter implements Presenter<RequestState> {
  private state: Map<string, any>;
  private mutations: Function[];

  static fromJS(state: Partial<RequestState>): RequestPresenter{
    return RequestPresenter.create(fromJS({
      ...DEFAULT_REQUEST_STATE,
      ...state,
    }));
  }

  static create(state?: Map<string, any>): RequestPresenter {
    return new RequestPresenter(state || fromJS(DEFAULT_REQUEST_STATE));
  }

  constructor(state: Map<string, any>) {
    this.state = state;
    this.mutations = [];
  }

  isPending(): boolean {
    return this.state.get('isPending');
  }

  isSucceed(): boolean {
    return this.state.get('isSucceed');
  }

  getError (): Error | null {
    return this.state.get('error');
  }

  setPending(value: boolean) {
    this.mutations.push((state: Map<string, any>) => state.set('isPending', value));
    return this;
  }

  setSucceed(value: boolean) {
    this.mutations.push(
      (state: Map<string, any>) => state
        .set('isPending', false)
        .set('error', null)
        .set('isSucceed', value)
    );
    return this;
  }

  runMutations () {
    this.state = this.state.withMutations(state => {
        this.mutations.forEach(mutation => {
          mutation(state);
        })
    });
    this.mutations = [];
    return this;
  }

  setError(value: Error | null) {
    this.mutations.push(
      (state: Map<string, any>) => state
        .set('isPending', false)
        .set('isSucceed', false)
        .set('error', fromJS(value))
    );

    return this;
  }

  reset() {
    this.state = fromJS(DEFAULT_REQUEST_STATE);
    this.mutations = [];

    return this;
  }

  toImmutable(): Map<string, any> {
    if (!_.isEmpty(this.mutations)){
      this.runMutations();
    }

    return this.state;
  }

  toJS(): RequestState {
    if (!_.isEmpty(this.mutations)){
      this.runMutations();
    }

    return {
      isPending: this.isPending(),
      isSucceed: this.isSucceed(),
      error: this.getError()
    }
  }

}
