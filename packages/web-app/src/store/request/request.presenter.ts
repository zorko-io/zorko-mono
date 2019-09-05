import _ from 'lodash';
import { Map, fromJS } from 'immutable';
import { Presenter } from '../presenter';

export interface RequestState {
  isPending: boolean
  isSucceed: boolean
  error: Error | null
}

const DEFAULT_REQUEST_STATE: RequestState = {
  isPending: false,
  isSucceed: false,
  error: null
};

export class RequestStateImmutable implements Presenter<RequestState> {
  private state: Map<string, any>;
  private mutations: Function[];

  static fromJS(state: Partial<RequestState>): RequestStateImmutable{
    return RequestStateImmutable.create(fromJS({
      ...DEFAULT_REQUEST_STATE,
      ...state,
    }));
  }

  static create(state?: Map<string, any>): RequestStateImmutable {
    return new RequestStateImmutable(state || fromJS(DEFAULT_REQUEST_STATE));
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

export class RequestPresenter {

  private immutable: Map<string, any>;

  static fromJS(state?: RequestState) {
    return new RequestPresenter(state ? fromJS(state) : state)
  }

  static create(state?: Map<string, any>) {
    return new RequestPresenter(state)
  }

  constructor(state?: Map<string, any>){
    if (!state){
      state = Map({
        isPending: false,
        isSucceed: false,
        error: null
      })
    }

    /// TODO: validation !!???

    this.immutable = state;
  }

  startRequest(){
    this.immutable = this.immutable.set('isPending', true);
    return this;
  }

  markSucceed () {
    this.immutable = this.immutable
        .set('isPending', false)
        .set('isSucceed', true);

    return this;
  }

  markFailure(error: Error) {
    this.immutable = this.immutable
      .set('isPending', false)
      .set('isSucceed', false)
      .set('error', fromJS(error));

    return this;
  }

  reset() {
    this.immutable = this.immutable
      .set('isPending', false)
      .set('isSucceed', false)
      .set('error', null);

    return this;
  }

  toJS(): RequestState {
    return this.immutable.toJS() as RequestState;
  }

  toImmutable(){
    return this.immutable;
  }


}
