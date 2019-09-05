import { Map } from 'immutable';
import { RequestPresenter } from './request.presenter';
import { Presenter } from '../presenter';

function checkImmutableAndJS<T>(state: Presenter<T, Map<string, any>>) {
  let map: Map<string, any> = state.toImmutable() as Map<string, any>;
  expect(map.toJS()).toEqual(state.toJS());
}

describe('RequestPresenter', () => {
  let presenter: RequestPresenter;

  beforeEach(()=> {
     presenter = RequestPresenter.create();
  });

  it('creates presenter with defaults', () => {
    expect(presenter.toJS()).toMatchSnapshot();
    checkImmutableAndJS(presenter)
  });

  it('starts request', () => {
    expect(presenter.setPending(true).toJS()).toMatchSnapshot();
    checkImmutableAndJS(presenter);
  });

  it('marks as succeed request', () => {
    presenter = RequestPresenter.fromJS({
      isPending: true
    });

    expect(presenter.setSucceed(true).toJS()).toMatchSnapshot();
    checkImmutableAndJS(presenter);
  }) ;

  it('marks as error request', () => {
    presenter = RequestPresenter.fromJS({
      isPending: true
    });

    expect(presenter.setError(new Error('Boom!')).toJS()).toMatchSnapshot();
    checkImmutableAndJS(presenter);
  });

  it('resets to default', () => {
    presenter = RequestPresenter.fromJS({
      error: new Error('Boom!')
    });


    expect(presenter.reset().toJS()).toMatchSnapshot();
    checkImmutableAndJS(presenter);
  })

});
