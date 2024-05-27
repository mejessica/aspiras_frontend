import Model, { attr, belongsTo } from '@ember-data/model';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';
import 'moment/locale/pt-br';
import moment from 'moment';
import { modelValidator } from 'ember-model-validator';

@modelValidator
export default class HoraModel extends Model {
  @attr('string') data;
  @attr('string') entrada1;
  @attr('string') saida1;
  @attr('string') entrada2;
  @attr('string') saida2;
  @attr('string') dia_da_semana;
  @belongsTo('configuration', { inverse: 'horas' }) configuration;

  validations = {
    entrada1: {
      presence: true
    },
    saida1: {
      presence: true
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

  @computed('entrada1', 'saida1', 'entrada2', 'saida2', 'data', 'dia_da_semana', 'configuration')
  get total() {

    const entrada1 = moment.duration(this.entrada1);
    const saida1 = moment.duration(this.saida1);
    const entrada2 = moment.duration(this.entrada2);
    const saida2 = moment.duration(this.saida2);

    const diff1 = saida1.subtract(entrada1);
    const diff2 = saida2.subtract(entrada2);

    const totalMinutos = diff1.asMinutes() + diff2.asMinutes();

    if (totalMinutos > 0) {
      const horas = Math.floor(totalMinutos / 60);
      const minutos = totalMinutos % 60;
      const horasFormatadas = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
   
      return horasFormatadas;
    }else{
      return '00:00'
    }

  }

  @computed('configuration.{seg,ter,qua,qui,sex,sab,dom}','entrada1', 'saida1', 'entrada2', 'saida2',)
  get devidas() {

    const horas = get(this.configuration, moment(this.data).format('ddd'))
    const config = moment.duration(horas);

    const total = moment.duration(this.total)

    if (total < config) {
      const devidas = config.subtract(total)
      const totalHoras = devidas.asMinutes()
      const horas = Math.floor(totalHoras / 60);
      const minutos = totalHoras % 60;
      const horasFormatadas = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

      return horasFormatadas
    } else {
      return '00:00'
    }

  }


  @computed('configuration.{seg,ter,qua,qui,sex,sab,dom}', 'entrada1', 'saida1', 'entrada2', 'saida2',)
  get extras() {

    const horas = get(this.configuration, moment(this.data).format('ddd'));
    const config = moment.duration(horas);
    const total = moment.duration(this.total)

    if (total > config) {
      const extras = total.subtract(config)
      const totalHoras = extras.asMinutes()
      const horas = Math.floor(totalHoras / 60);
      const minutos = totalHoras % 60;
      const horasFormatadas = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

      return horasFormatadas
    } else {
      return '00:00'
    }

  }

}
