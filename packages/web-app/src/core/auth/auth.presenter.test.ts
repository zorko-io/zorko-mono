import { AuthPresenter } from './auth.presenter';

describe('AuthPresenter', () => {

  let presenter: AuthPresenter;

  beforeEach(()=> {
    presenter = AuthPresenter.create();
  });

  it('creates presenter with defaults', () => {
    let expected = presenter.toJS();
    expect(expected).toMatchSnapshot();
    expect(presenter.toImmutable().toJS()).toEqual(expected);
  });

  it('starts refresh token', () => {
    presenter = presenter.startRefresh();

    let expected = presenter.toJS();
    expect(expected).toMatchSnapshot();
    expect(presenter.toImmutable().toJS()).toEqual(expected);
  })

  it('updates token', () => {
    let nextToken = { accessKey: 'zzzzzz', userId:'dfdfdf' };
    presenter = presenter.updateToken(nextToken);

    let expected = presenter.toJS();
    expect(expected).toMatchSnapshot();
    expect(presenter.toImmutable().toJS()).toEqual(expected);
  })
});