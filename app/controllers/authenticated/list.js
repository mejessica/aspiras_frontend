import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AuthenticatedListController extends Controller {
  @service store;
  @service router;

  @action
  delete(model) {
    model.destroyRecord();
    this.router.transitionTo('authenticated.list');
  }

  @action
  setInput(model, tipo, event) {
    set(model, tipo, event.target.value);
  }
}
