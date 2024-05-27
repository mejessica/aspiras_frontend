import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedTodoNewlistRoute extends Route {
  @service session;
  @service router;
  @service store;

  beforeModel(transition) {
    if (!this.session.isAuthenticated) {
      this.router.transitionTo('login');
    } else {
      return super.beforeModel(transition);
    }
  }

  model() {
    return this.store.createRecord('todo')
  }

  deactivate() {
    const model = this.controller.model;
    if (model.isNew && !model.isSaving) {
      model.unloadRecord();
    }
  }
}
