import Model, { attr, belongsTo } from '@ember-data/model';
import { modelValidator } from 'ember-model-validator';

@modelValidator
export default class ItemModel extends Model {
  @attr('string') descricao;
  @attr('string') prioridade;
  @attr('string') realizado;
  @belongsTo('todo') todo;

  validations={
    descricao:{
      presence:true
    },
    prioridade:{
      presence:true
    },
    realizado:{
      presence:true
    }
  }

}
