import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { objectValidator } from 'ember-model-validator';
import { displayInfo } from 'projeto-aspiras-app/utils/info-handler';
import { inputError } from 'projeto-aspiras-app/utils/input-handler';

@objectValidator
export default class AuthenticatedTodoItemNewitemController extends Controller {
  @service store;
  @service router;

  @tracked descricao;
  @tracked prioridade;
  @tracked realizado;

  validations={
    descricao:{
      presence:true
    },
    prioridade:{
      presence:true
    },
    realizado:{
      presence:true
    }
  }

  @action
  async verificar() {
    const item = this
    if (item.validate()) {
      this.addTodo();
    } else {
      displayInfo('Preencha todos os campos.', 'color-danger');
    }
  }

  @action
  async addTodo() {
    let descricao = this.descricao;
    let e = document.getElementById('prioridade');
    let prioridade = e.options[e.selectedIndex].value;

    let todo = await this.store.findRecord('todo', this.model.id);

    let event = document.getElementById('realizado');
    let realizado = event.options[event.selectedIndex].value;

    let newTodoItem = this.store.createRecord('item', {
      descricao,
      prioridade,
      realizado,
      todo,
    });

   newTodoItem.save();
    this.router.transitionTo('authenticated.todo.item.index');
  }

  @action
  setInput(tipo, event) {
    set(this, tipo, event.target.value);
    inputError(event)
  }
}
