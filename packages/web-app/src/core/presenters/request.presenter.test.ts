import { RequestPresenter } from './request.presenter';

describe('RequestPresenter', () => {

  let presenter: RequestPresenter;

  beforeEach(()=> {
     presenter = RequestPresenter.create();
  });

  it('creates presenter with defaults', () => {
    let expected = presenter.toJS();
    expect(expected).toMatchSnapshot();
    expect(presenter.toImmutable().toJS()).toEqual(expected);
  });

  it('starts request', () => {
    let actual = presenter.startRequest();

    expect(presenter).toBe(actual);

    let expected = actual.toJS();
    expect(expected).toMatchSnapshot();
    expect(actual.toImmutable().toJS()).toEqual(expected);
  });

  it('marks as succeed request', () => {
    let actual = presenter.startRequest().markSucceed();

    expect(presenter).toBe(actual);
    let expected = actual.toJS();
    expect(expected).toMatchSnapshot();
    expect(actual.toImmutable().toJS()).toEqual(expected);
  }) ;

  it('marks as error request', () => {
    let actual = presenter
      .startRequest()
      .markFailure(new Error('Boom!'));

    expect(presenter).toBe(actual);
    let expected = actual.toJS();
    expect(expected).toMatchSnapshot();
    expect(actual.toImmutable().toJS()).toEqual(expected);
  });

  it('resets to default', () => {
    let actual = presenter
      .startRequest()
      .markFailure(new Error('Boom!'))
      .reset();

    expect(presenter).toBe(actual);
    let expected = actual.toJS();
    expect(expected).toMatchSnapshot();
    expect(actual.toImmutable().toJS()).toEqual(expected);
  })

});
