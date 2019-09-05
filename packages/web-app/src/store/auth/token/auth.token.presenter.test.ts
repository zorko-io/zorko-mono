import { AuthTokenPresenter } from './auth.token.presenter';
import { TokenDto } from '@zorko/dto';

describe('AuthTokenPresenter', () => {

  let presenter: AuthTokenPresenter;
  let nextToken: TokenDto;

  beforeEach(()=> {
    presenter = AuthTokenPresenter.create();
    nextToken = { accessKey: 'zzzzzz', userId:'dfdfdf' };
  });

  it('creates presenter with defaults', () => {
    let expected = presenter.toJS();
    expect(expected).toMatchSnapshot();
    expect(presenter.toImmutable().toJS()).toEqual(expected);
  });

  it('checks token absence', () => {
    expect(presenter.hasToken()).toBeFalsy();
    expect(AuthTokenPresenter.hasToken(presenter.toImmutable())).toBeFalsy();
  });

  it('checks token existence', () => {
    presenter = presenter.setAccessKey(nextToken.accessKey).runMutations();

    expect(presenter.hasToken()).toBeTruthy();
    expect(AuthTokenPresenter.hasToken(presenter.toImmutable())).toBeTruthy();
  });

  it('updates token', () => {
    presenter = presenter
      .setAccessKey(nextToken.accessKey)
      .setUserId(nextToken.userId);

    let expected = presenter.toJS();

    expect(expected).toMatchSnapshot();
    expect(presenter.toImmutable().toJS()).toEqual(expected);
  });
});
