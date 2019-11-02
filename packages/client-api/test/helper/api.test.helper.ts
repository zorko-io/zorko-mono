import { AxiosRequestConfig } from 'axios';
import { AxiosApiClientFacade } from '../../src';
import { Server, Users } from '../config';
import { User } from '@zorko/dto';

export class ApiTestHelper {
  static create(config?: AxiosRequestConfig): AxiosApiClientFacade {
    const api = new AxiosApiClientFacade(
      config ? config : {baseURL: Server.baseUrl}
    );

    // TODO: provide other way to plug in logger
    //  (for example file logger for integration tests and browser/logrocks for UI)
    // api.setResponseInterceptors(response => response, error => {
    //   if (error.response) {
    //     if (error.response.status === 500) {
    //       // tslint:disable-next-line:no-console
    //       console.error(`Unexpected Error, #message: '${error.message}'`);
    //     } else if (error.response.status === 400) {
    //       // tslint:disable-next-line:no-console
    //       console.error(`Invalid Arguments, #message ${error.message}`);
    //     }
    //   }
    //   throw error;
    // });

    return api;
  }

  static async loginAs(user: any) {
    let Api = ApiTestHelper.create();
    Api = await Api.loginAs({
      email: user.email,
      password: user.password
    });
    return Api;
  }
}

