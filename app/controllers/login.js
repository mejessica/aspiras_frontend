import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { displayInfo } from 'projeto-aspiras-app/utils/info-handler';

export default class LoginController extends Controller {
  @service session;
  @tracked email;
  @tracked password;

  @action
  authenticate() {
    const credentials = { email: this.email, password: this.password };
    const authenticator = 'authenticator:token';

    this.session.authenticate(authenticator, credentials)
      .catch((error) => {
        displayInfo('Ocorreu um erro durante a autenticação. Por favor, tente novamente.', 'color-danger')
      });

  }
  @action
  setInput(tipo, event) {
    set(this, tipo, event.target.value);
  }
}
