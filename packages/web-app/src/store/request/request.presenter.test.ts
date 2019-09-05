import { RequestStateImmutable } from './request.presenter';
import { Presenter } from '../presenter';

function checkImmutableAndJS<T>(state: Presenter<T>) {
  expect(state.toImmutable().toJS()).toEqual(state.toJS());
}

describe('RequestPresenter', () => {
  let presenter: RequestStateImmutable;

  beforeEach(()=> {
     presenter = RequestStateImmutable.create();
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
    presenter = RequestStateImmutable.fromJS({
      isPending: true
    });

    expect(presenter.setSucceed(true).toJS()).toMatchSnapshot();
    checkImmutableAndJS(presenter);
  }) ;

  it('marks as error request', () => {
    presenter = RequestStateImmutable.fromJS({
      isPending: true
    });

    expect(presenter.setError(new Error('Boom!')).toJS()).toMatchSnapshot();
    checkImmutableAndJS(presenter);
  });

  it('resets to default', () => {
    presenter = RequestStateImmutable.fromJS({
      error: new Error('Boom!')
    });


    expect(presenter.reset().toJS()).toMatchSnapshot();
    checkImmutableAndJS(presenter);
  })

});
