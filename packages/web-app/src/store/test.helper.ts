import { Presenter } from './presenter';
import { Map } from 'immutable';

export function checkImmutableAndJS<T>(state: Presenter<T, Map<string, any>>) {
  let map: Map<string, any> = state.toImmutable() as Map<string, any>;
  expect(map.toJS()).toEqual(state.toJS());
}
