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

export class RequestStateImmutable implements RequestState, Presenter<RequestState> {
  private state: Map<string, any>;

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
  }

  get isPending(): boolean {
    return this.state.get('isPending');
  }

  set isPending(value: boolean) {
    this.state = this.state.set('isPending', value);
  }

  get error (): Error | null {
    return this.state.get('error');
  }

  set error(value: Error | null) {
    // TODO: optimize with mutation
    this.state = this.state
      .set('isPending', false)
      .set('isSucceed', false)
      .set('error', fromJS(value));
  }

  get isSucceed () : boolean {
    return this.state.get('isSucceed');
  }

  set isSucceed(value: boolean) {
    // TODO: optimize with mutation
    this.state = this.state
      .set('isPending', false)
      .set('error', null)
      .set('isSucceed', value);
  }

  reset() {
    this.state = fromJS(DEFAULT_REQUEST_STATE);
  }

  toImmutable(): Map<string, any> {
    return this.state;
  }

  toJS(): RequestState {
    return {
      isPending: this.isPending,
      isSucceed: this.isSucceed,
      error: this.error
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
