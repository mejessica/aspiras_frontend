import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service session;
  @service store;

  async beforeModel() {
    await this.session.setup();
    super.beforeModel(...arguments);
  }

  model() {}
}
