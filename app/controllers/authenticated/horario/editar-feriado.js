import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { displayInfo } from 'projeto-aspiras-app/utils/info-handler';
import { inputError } from 'projeto-aspiras-app/utils/input-handler';

export default class AuthenticatedHorarioEditarFeriadoController extends Controller {
  @service store;
  @service router;
  @service session;

  @tracked data;
  @tracked descricao;

  @action
  editFeriado(model) {
    if (model.validate()) {
      model.save();
       displayInfo('Salvo!', 'color-success')
    } else {
      displayInfo('Preencha todos os campos.', 'color-danger');
    }
  }

  @action
  delete(model) {
    model.destroyRecord();
  }

  @action
  setInput(model, tipo, event) {
    set(model, tipo, event.target.value);
    inputError(event)
  }
}
