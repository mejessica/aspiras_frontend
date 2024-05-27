import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import {hash} from 'rsvp';

export default class AuthenticatedTodoItemNewitemRoute extends Route {
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

  async model() {
    let id = this.paramsFor('authenticated.todo.item');
    return id
  }
}
