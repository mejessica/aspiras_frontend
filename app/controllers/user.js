import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { inputError } from 'projeto-aspiras-app/utils/input-handler';

export default class UserController extends Controller {
  @service store;
  @service router;

  @action
  verificar() {
    const user = this.model;
    if (user.validate()) {
      this.addUser();
    } else {

    }
  }


  @action
  async addUser() {
    try {
      await this.model.save();
      this.router.transitionTo('login');
    } catch (error) {

    }
  }

  @action
  setInput(tipo, event) {
    set(this.model, tipo, event.target.value);
    inputError(event)
  }
}
