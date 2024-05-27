import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default class AuthenticatedHorarioNewconfigController extends Controller {
  @service store;
  @service router;
  @service session;

  @action
  async addConfig() {
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
  }

  @action
  setInput(tipo, event) {
    set(this, tipo, event.target.value);
  }
}
