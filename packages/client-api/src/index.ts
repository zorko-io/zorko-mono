import { AxiosApiClientFacade } from './facade';

export * from './auth';
export * from './user';
export * from './repository';
export * from './facade';

const Api = new AxiosApiClientFacade();

export default Api;
