import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { modelValidator } from 'ember-model-validator';

@modelValidator
export default class TodoModel extends Model {
  @attr('string') nome;
  @attr('string') dataTermino;
  @belongsTo('user', { inverse: null, async: true }) user;
  @hasMany('item') item;

  validations={
    nome:{
      presence:true
    },
    dataTermino:{
      presence:true
    },
    user:{
      relations: ['belongsTo']
    },
    item:{
      relations: ['hasMany']
    },
  }
}
