import Model, { attr, belongsTo } from '@ember-data/model';
import { modelValidator } from 'ember-model-validator';

@modelValidator
export default class FeriadoModel extends Model {
  @attr('string') data;
  @attr('string') descricao;
  @belongsTo('configuration') configuration;

  validations={
    data:{
      presence:true
    },
    descricao:{
      presence:true
    }
  }
}
