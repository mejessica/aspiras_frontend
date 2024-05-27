import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { displayInfo } from 'projeto-aspiras-app/utils/info-handler';
import { inputError } from 'projeto-aspiras-app/utils/input-handler';

export default class AuthenticatedTodoNewlistController extends Controller {
  @service store;
  @service session;
  @service router;
  
  @action 
  verificar(){
    const todo = this.model

    if (todo.validate()) {
      this.addTodo();
    }else{
      displayInfo('Preencha todos os campos.', 'color-danger');
    }
  }

  @action
  addTodo() {
    this.model.save();
    this.router.transitionTo('authenticated.list');
  }

  @action
  setInput(tipo, event) {
    set(this.model, tipo, event.target.value);
    inputError(event)
  }
}
