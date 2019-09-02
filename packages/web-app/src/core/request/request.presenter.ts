import { Map, fromJS } from 'immutable';

export interface RequestState {
  readonly isPending: boolean
  readonly isSucceed: boolean
  readonly error: Error | null
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