import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedHorarioEditarFeriadoRoute extends Route {
  @service store;
  @service session;
  @service router;

  beforeModel(transition) {
    if (!this.session.isAuthenticated) {
      this.router.transitionTo('login');
    } else {
      return super.beforeModel(transition);
    }
  }

  model() {
    return this.store.findAll('feriado');
  }

}
