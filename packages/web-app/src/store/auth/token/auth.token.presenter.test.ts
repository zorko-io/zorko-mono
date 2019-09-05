import { AuthTokenPresenter } from './auth.token.presenter';
import { TokenDto } from '@zorko/dto';
import { checkImmutableAndJS } from '../../test.helper';

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
    checkImmutableAndJS(presenter)
  });

  it('checks token absence', () => {
    expect(presenter.hasAccessKey()).toBeFalsy();
  });

  it('checks token existence if exist', () => {
    presenter = presenter.setAccessKey(nextToken.accessKey).runMutations();
    expect(presenter.hasAccessKey()).toBeTruthy();
  });

  it('checks token existence doesnt exist', () => {
    presenter = presenter.setAccessKey('').runMutations();
    expect(presenter.hasAccessKey()).toBeFalsy();
  });

  it('updates token', () => {
    presenter = presenter
      .setAccessKey(nextToken.accessKey)
      .setUserId(nextToken.userId);

    let expected = presenter.toJS();

    expect(expected).toMatchSnapshot();
    checkImmutableAndJS(presenter)
  });
});
