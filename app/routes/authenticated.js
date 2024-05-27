import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedRoute extends Route {
  @service session;
  @service router;
  @service store;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
    if (!this.session.isAuthenticated) {
      this.router.transitionTo('login');
    } else {
      return super.beforeModel(transition);
    }
  }

  model() {
    if (this.session.isAuthenticated) {
      return this.store.query('user', { me: true }).then((users) => {
        if (users) {
          this.session.user = users[0];
        }
      });
    }
  }
}
