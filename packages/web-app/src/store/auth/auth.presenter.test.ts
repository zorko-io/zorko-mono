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
  });

  it('updates token', () => {
    let nextToken = { accessKey: 'zzzzzz', userId:'dfdfdf' };
    presenter = presenter.refreshToken(nextToken);

    let expected = presenter.toJS();
    expect(expected).toMatchSnapshot();
    expect(presenter.toImmutable().toJS()).toEqual(expected);
  });

  it('fail token refresh', () => {
    presenter = presenter.startRefresh().failRefresh(new Error('Boom!!!'));

    let expected = presenter.toJS();
    expect(expected).toMatchSnapshot();
    expect(presenter.toImmutable().toJS()).toEqual(expected);
  })
});
