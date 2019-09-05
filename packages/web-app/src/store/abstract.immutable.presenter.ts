import { Map } from 'immutable';
import { Presenter } from './presenter';
import _ from 'lodash';

export abstract class AbstractImmutablePresenter<S> implements Presenter<S, Map<string, any>> {
  protected immutable: Map<string, any>;
  private mutations: Function[];

  protected constructor(state: Map<string, any>) {
    this.immutable = state;
    this.mutations = [];
  }

  runMutations() {
    this.immutable = this.immutable.withMutations(state => {
      this.mutations.forEach(mutation => {
        mutation(state);
      });
    });
    this.cleanMutations();
    return this;
  }

  protected cleanMutations(): this {
    this.mutations = [];
    return this;
  }

  protected runMutationsIfNotEmpty():this {
    if (!_.isEmpty(this.mutations)) {
      this.runMutations();
    }
    return this;
  }

  protected addMutation(func: Function): this {
    this.mutations.push(func);
    return this;
  }

  protected asJS(): S {
    return this.immutable.toJS() as S;
  }

  protected asImmutable(): Map<string, any> {
    return this.immutable;
  }

  toJS(): S {
    this.runMutationsIfNotEmpty();
    return this.asJS();
  }

  toImmutable(): Map<string, any> {
    this.runMutationsIfNotEmpty();
    return this.asImmutable();
  }
}
