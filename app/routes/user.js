import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UserRoute extends Route {
  @service session;
  @service router;
  @service store;

  beforeModel() {
    if (!this.session.isAuthenticated) {
      this.router.transitionTo('user');
    }
  }

  model() {
    return this.store.createRecord('user')
  }
}
