import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'projeto-aspiras-app/config/environment';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { modalError } from 'projeto-aspiras-app/utils/modal-handler';

const { APP } = ENV;
const { host, namespace } = APP;

export default class ApplicationAdapter extends JSONAPIAdapter {
  host;
  namespace;

  @service session;
  @service router;

  constructor() {
    super(...arguments);
    this.host = host;
    this.namespace = namespace;
  }

  @computed('session.isAuthenticated', 'session.data.authenticated.token')
  get headers() {
    if (this.session.isAuthenticated) {
      return {
        Authorization: `Bearer ${this.session.data.authenticated.token}`,
      };
    } else {
      return {};
    }
  }

  handleResponse(status) {
    if (status === 401 && this.session.isAuthenticated) {
      this.session.invalidate();
    }
    if (status === 422) {
      alert('não permitido carga horária em feriados')
      this.router.transitionTo('authenticated.horario.editarFeriado');
      return
    }
    if (status === 500 && this.session.isAuthenticated) {
      alert('Primeiro forneça uma configuração')
      this.router.transitionTo('authenticated.horario.configuration');
      return
    }
    if (status === 500){
      alert('Já existe uma conta com esse endereço de email')
      this.router.transitionTo('user');
      return 
    }
    if (status === 409) {
      alert('O e-mail fornecido já está em uso.');
    }
    return super.handleResponse(...arguments);
  }
}
