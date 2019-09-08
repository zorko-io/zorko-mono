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

  it('update access key', () => {
    presenter = presenter.setAccessKey(nextToken.accessKey);

    let expected = presenter.toJS();

    expect(expected).toMatchSnapshot();
    checkImmutableAndJS(presenter)
  });

  it('update user id', () => {
    presenter = presenter.setUserId(nextToken.userId);

    let expected = presenter.toJS();

    expect(expected).toMatchSnapshot();
    checkImmutableAndJS(presenter)
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
