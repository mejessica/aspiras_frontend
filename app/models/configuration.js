import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { modelValidator } from 'ember-model-validator';

@modelValidator

export default class ConfigurationModel extends Model {
  @attr('string') seg;
  @attr('string') ter;
  @attr('string') qua;
  @attr('string') qui;
  @attr('string') sex;
  @attr('string') sab;
  @attr('string') dom;
  @attr('string') feriado;
  @belongsTo('user') user;
  @hasMany('hora', {inverse: 'configuration'}) horas

  validations={
  horas:{
    relations: ['hasMany']
  },
  user:{
    relations: ['belongsTo']
  },
}
}
