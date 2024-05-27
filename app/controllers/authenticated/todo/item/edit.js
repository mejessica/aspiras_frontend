import Controller from '@ember/controller';
import { action,set } from '@ember/object';
import { inject as service } from '@ember/service';
import { displayInfo } from 'projeto-aspiras-app/utils/info-handler';
import { inputError } from 'projeto-aspiras-app/utils/input-handler';

export default class AuthenticatedTodoItemEditController extends Controller {
  @service router;
  @service store;

  @action
  verificar() {
    const item = this.model;
    
    if (item.validate()) {
      this.editItem();
    } else {
      displayInfo('Preencha todos os campos.', 'color-danger');
    }
  }

  @action
 editItem() {
    this.model.save();
    this.router.transitionTo('authenticated.todo.item.index');
  }
  

  @action
  deleteItem() {
    this.model.destroyRecord();
    this.router.transitionTo('authenticated.todo.item.index');
  }

  @action
  setInput(tipo, event) {
    set(this.model, tipo, event.target.value);
    inputError(event)
  }
}
