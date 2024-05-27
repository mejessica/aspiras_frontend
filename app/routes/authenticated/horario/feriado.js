import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedHorarioFeriadoRoute extends Route {
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
    // let userId = this.session.user.id //o session disponibiliza o user.id
    // return this.store.query('configuration', {userId});
    // return this.store.findAll('feriado');
  }

  
}
