import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { objectValidator } from 'ember-model-validator';
import { displayInfo } from 'projeto-aspiras-app/utils/info-handler';
import { inputError } from 'projeto-aspiras-app/utils/input-handler';

@objectValidator
export default class AuthenticatedHorarioFeriadoController extends Controller {
  @service store;
  @service router;
  @service session;

  @tracked descricao;
  @tracked data;

  validations = {
    data: {
      presence: true
    },
    descricao: {
      presence: true
    }
  }

  @action
  verificar() {
    const feriado = this
    if (feriado.validate()) {
      this.addFeriado();
    } else {
      displayInfo('Preencha todos os campos.', 'color-danger');
    }
  }

  @action
  async addFeriado() {
    let newFeriado
    try {
      let userId = this.session.user.id; //o session disponibiliza o user.id
      let configuration = await this.store.queryRecord('configuration', {
        userId,
      });

      newFeriado = this.store.createRecord('feriado', {
        data: this.data,
        descricao: this.descricao,
        configuration,
      });

      await newFeriado.save();
      this.router.transitionTo('authenticated.horario.editarFeriado');
      
    } catch (error) {
      newFeriado.rollbackAttributes();
    }
  }

  @action
  setInput(tipo, event) {
    set(this, tipo, event.target.value);
    inputError(event)
  }
}
