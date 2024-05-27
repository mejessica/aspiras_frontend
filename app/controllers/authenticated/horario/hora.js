import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';
import { objectValidator } from 'ember-model-validator';
import { displayInfo } from 'projeto-aspiras-app/utils/info-handler';
import { inputError } from 'projeto-aspiras-app/utils/input-handler';

@objectValidator
export default class AuthenticatedHorarioHoraController extends Controller {
  queryParams = ['day', 'month', 'data']

  @service store;
  @service router;
  @service session;

  @tracked day = moment().format('DD')
  @tracked month = moment().month()
  @tracked data = moment().format('YYYY-MM-DD')

  @tracked entrada1;
  @tracked saida1;
  @tracked entrada2;
  @tracked saida2;


  validations = {
    entrada1: {
      presence: true
    },
    saida1: {
      presence: true,
    },
    entrada2: {
      presence: true
    },
    saida2: {
      presence: true
    },
    validacao: {
      custom: [
        {
          validation: function (key, value, model) {
            return model.get('entrada1') < model.get('saida1') ? true : false
          },
          message: 'Horário de entrada maior que o horário de saída'
        },
        {
          validation: function (key, value, model) {
            return model.get('entrada2') > model.get('saida1') ? true : false
          },
          message: 'Horário de entrada maior que o horário de saída'
        },
        {
          validation: function (key, value, model) {
            return model.get('entrada2') < model.get('saida2') ? true : false
          },
          message: 'Horário de entrada maior que o horário de saída'
        },

      ]
    }

  }

  @action
  verificar() {
    const hora = this
    if (hora.validate()) {
      this.addHoras();
    } else {
      console.log({ errors: hora.get('errors') });
      displayInfo('Verifique seus horários\n -> Campo em branco ou \n -> Horário de entrada maior que o horário de saída', 'color-danger');
    }
  }

  @action
  getData(e) {
    let selectedDate = moment(e.target.value);

    this.day = selectedDate.format('DD');
    this.month = selectedDate.month();
    this.data = selectedDate.format('YYYY-MM-DD');

  }

  @action
  async addHoras() {

    let userId = this.session.user.id; //o session disponibiliza o user.id
    let configuration = await this.store.queryRecord('configuration', {
      userId,
    });

    if (configuration) {

      let diaSemana = moment(this.data).format('ddd')
      let configuracaoDiaSemana = configuration[diaSemana]

      if (configuracaoDiaSemana) {
        let newHora = this.store.createRecord('hora', {
          data: this.data,
          entrada1: this.entrada1,
          saida1: this.saida1,
          entrada2: this.entrada2,
          saida2: this.saida2,
          configuration
        });

        try {
          await newHora.save();
          this.router.transitionTo('authenticated.horario.index');
        } catch (error) {

        }

      } else {
        alert('Não existe configuração para esse dia')
      }
    } else {
      alert('Primeiro forneça uma configuração')
      this.router.transitionTo('authenticated.horario.configuration');
    }

  }

  @action
  async saveHoras(model) {

    if (model.validate()) {
      await model.save();
      this.router.transitionTo('authenticated.horario.index');

    } else {
      displayInfo('Verifique seus horários\n -> Campo em branco ou \n -> Horário de entrada maior que o horário de saída', 'color-danger');

    }
  }

  @action
  setInput(tipo, event) {
    set(this, tipo, event.target.value);
    inputError(event)
  }

  @action
  setInputEdit(model, tipo, event) {
    set(model.firstObject, tipo, event.target.value);
    inputError(event)
  }

}