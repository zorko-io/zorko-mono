import { RequestGetter } from './request.getter';
import { fromJS, Map } from 'immutable';
import { DEFAULT_REQUEST_STATE } from './request.state';

describe('RequestGetter', () => {
  let getter: RequestGetter;
  let state: Map<string, any>;

  beforeEach(()=> {
     getter = RequestGetter.create();
    state = fromJS(DEFAULT_REQUEST_STATE);
  });

  it('gets pending', () => {
    expect(getter.isPending(state)).toEqual(false);
  });

  it('gets success', () => {
    expect(getter.isSucceed(state)).toEqual(false);
  });

  it('gets error as null', () => {
    expect(getter.getError(state)).toEqual(null);
  });

  it('gets error as object', () => {
    let error = new Error('BOOM!!');
    expect(getter.getError(fromJS({
      ...DEFAULT_REQUEST_STATE,
      error
    }))).toEqual(error);
  })
});
