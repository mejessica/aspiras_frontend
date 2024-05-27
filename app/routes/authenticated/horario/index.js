import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedHorarioIndexRoute extends Route {
  @service store
  @service session;
  @service router;

  queryParams = {
    month: {
      refreshModel: true
    },
    year: {
      refreshModel: true
    }
  }

  beforeModel(transition) {
    if (!this.session.isAuthenticated) {
      this.router.transitionTo('login');
    } else {
      return super.beforeModel(transition);
    }
  }

  model(params) {
    return this.store.query('hora', params);
  }

}
