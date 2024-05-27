import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedTodoItemRoute extends Route {
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
  }
}
