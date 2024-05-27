import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { inputError } from 'projeto-aspiras-app/utils/input-handler';


export default class AuthenticatedPerfilEditController extends Controller {
  @service router;
  @service store;

  @action
  verificar() {
    const user = this.model;
    if(user.validate()){
     this.editUser();
    }else{
    }
  }

  @action
   async editUser() {
    try{
      await this.model.save();
       this.router.transitionTo('authenticated.perfil');
     }catch (error){
    
     }
  }

  @action
  setInput(tipo, event) {
    set(this.model, tipo, event.target.value);
    inputError(event)
  }
}
