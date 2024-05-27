import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class AuthenticatedHorarioIndexController extends Controller {
  @tracked currentMonth = moment().format('YYYY-MM');

  queryParams = ['year', 'month']

  @service store;
  @service router;
  @service session;

  @tracked year = moment().format('YYYY')
  @tracked month = moment().month()

  @action
  getData(e) {
      this.currentMonth = moment(e.target.value).format('YYYY-MM');
      this.year = moment(e.target.value).format('YYYY');
      this.month = moment(e.target.value).month();
    }

  @computed('model.@each.total')
  get total() {
    const acc = moment.duration()

    this.model.forEach(item =>{
      acc.add(moment.duration(item.total))
    })
    const horas = Math.floor(acc.asHours());
    const minutos = acc.minutes();
    const totalFormatado = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    return totalFormatado

    // return this.model.reduce((acc, item) => {
    //   return acc += item.total;
    // }, 0);
  }

  @computed('model.@each.devidas')
  get devidas() {
    const acc = moment.duration()

    this.model.forEach(item =>{
      acc.add(moment.duration(item.devidas))
    })
    const horas = Math.floor(acc.asHours());
    const minutos = acc.minutes();
    const totalFormatado = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    return totalFormatado

    // return this.model.reduce((acc, item) => {
    //   return acc += item.devidas;
    // }, 0);
  }

  @computed('model.@each.extras')
  get extras() {
    const acc = moment.duration()
    this.model.forEach(item=>{
      acc.add(moment.duration(item.extras))
    })
    const horas = Math.floor(acc.asHours());
    const minutos = acc.minutes()
    const totalFormatado = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    return totalFormatado

    // return this.model.reduce((acc, item) => {
    //   return acc += item.extras;
    // }, 0);
  }

  get diasDoMes() {
    const dataInicial = moment(`${this.year}-${this.month}-01`, 'YYYY-MM-DD');
    const dataFinal = dataInicial.clone().endOf('month');
    const diasDoMes = [];

    dataInicial.startOf('month'); 
    while (dataInicial.isSameOrBefore(dataFinal)) {
      diasDoMes.push({
        data: dataInicial.format('DD'),
        diaDaSemana: dataInicial.format('ddd')
      });
      dataInicial.add(1, 'day'); 
    }
    return diasDoMes;
  }

}
