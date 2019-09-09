import { AxiosRequestConfig } from 'axios';
import { AxiosApiClientFacade, createDefaultContext } from '../../src';
import { Server } from '../config';

export class ApiTestHelper {
  static create(config?: AxiosRequestConfig): AxiosApiClientFacade {
    const api = new AxiosApiClientFacade(
      config ? config : {baseURL: Server.baseUrl},
      createDefaultContext
    );

    api.setResponseInterceptors(response => response, error => {
      if (error.response) {
        if (error.response.status === 500) {
          // tslint:disable-next-line:no-console
          console.error(`Unexpected Error, #message: '${error.message}'`);
        } else if (error.response.status === 400) {
          // tslint:disable-next-line:no-console
          console.error(`Invalid Arguments, #message ${error.message}`);
        }
      }
      throw error;
    });

    return api;
  }
}

