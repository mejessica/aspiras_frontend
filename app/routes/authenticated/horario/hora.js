import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action} from '@ember/object';

export default class AuthenticatedHorarioHoraRoute extends Route {
  @service store;
  @service router;
  @service session;

  queryParams = {
    data: {
        refreshModel:true
    }, 
    month:{
        refreshModel:true
    },
    day:{
        refreshModel:true
    }
  }

  beforeModel(transition) {
    if (!this.session.isAuthenticated) {
      this.router.transitionTo('login');
    } else {
      return super.beforeModel(transition);
    }
  }

  model(params) {
    return this.store.query('hora', params);
  }

  deactivate(params) {
    const param = params.from.queryParams;
    const model = this.controller.model;
    if(param != model.isSaving){
        this.router.transitionTo({ queryParams: { data: null, day: null } });
    }
  }
 
}
