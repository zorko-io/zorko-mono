import { AuthTokenPresenter } from './auth.token.presenter';

describe('AuthTokenPresenter', () => {

  let presenter: AuthTokenPresenter;

  beforeEach(()=> {
    presenter = AuthTokenPresenter.create();
  });

  it('creates presenter with defaults', () => {
    let expected = presenter.toJS();
    expect(expected).toMatchSnapshot();
    expect(presenter.toImmutable().toJS()).toEqual(expected);
  });

  it('updates token', () => {
    let nextToken = { accessKey: 'zzzzzz', userId:'dfdfdf' };
    presenter = presenter.update(nextToken);

    let expected = presenter.toJS();
    expect(expected).toMatchSnapshot();
    expect(presenter.toImmutable().toJS()).toEqual(expected);
  });
});
