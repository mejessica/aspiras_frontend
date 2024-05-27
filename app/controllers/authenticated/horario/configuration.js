import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { inputError } from 'projeto-aspiras-app/utils/input-handler';

export default class AuthenticatedHorarioConfigurationController extends Controller {
  @service store;
  @service router;
  @service session;

  @action
  addConfig() {
    let newConfig = this.store.createRecord('configuration', {
      seg: this.seg,
      ter: this.ter,
      qua: this.qua,
      qui: this.qui,
      sex: this.sex,
      sab: this.sab,
      dom: this.dom,
      feriado: this.feriado,
    });

    newConfig.save();
    this.router.transitionTo('authenticated.horario.hora');
  }

  @action
   editConfig() {
    this.model.save();
    this.router.transitionTo('authenticated.horario.index');
  }

  @action
  setInput(tipo, event) {
    set(this, tipo, event.target.value);
    inputError(event)
  }

  @action
  setInputEdit(tipo, event) {
    set(this.model, tipo, event.target.value);
    inputError(event)
  }
}
