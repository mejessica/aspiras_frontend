import Model, { attr } from '@ember-data/model';
import { modelValidator } from 'ember-model-validator';

@modelValidator

export default class UserModel extends Model {
  @attr('string') email;
  @attr('string') nome;
  @attr('string') dataNasc;
  @attr('string') endereco;
  @attr('string') bairro;
  @attr('string') cidade;
  @attr('string') estado;
  @attr('string') pais;
  @attr('string') password;
  @attr('string') confirm;

  get validations() {

    let validation = {
      email: {
        email: {
          presence: true,
          message: 'Por favor, insira um endereço de e-mail válido.'
        }
      },
      nome: {
        presence: {
          message: 'Por favor, insira seu nome.'
        }
      },
      dataNasc: {
        date: {
          before: new Date(),
          after: '01-01-1900',
          message: 'A data de nascimento deve estar entre 01-01-1900 e hoje.'
        }
      },
      endereco: {
        presence: {
          message: 'Por favor, insira seu endereço.'
        }
      },
      bairro: {
        presence: {
          message: 'Por favor, insira seu bairro.'
        }
      },
      cidade: {
        presence: {
          message: 'Por favor, insira sua cidade.'
        }
      },
      estado: {
        presence: {
          message: 'Por favor, insira seu estado.'
        }
      },
      pais: {
        presence: {
          message: 'Por favor, insira seu país.'
        }
      },
    }


    if (this.changedAttributes().password || !this.id) {

      validation.password = {
        format: {
          with: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>?]).{8,}$/,
          message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'
        },
        presence: {
          message: 'Por favor, insira sua senha.'
        },
        mustContainCapital: {
          message: 'A senha deve conter pelo menos uma letra maiúscula.'
        },
        mustContainLower: {
          message: 'A senha deve conter pelo menos uma letra minúscula.'
        },
        mustContainNumber: {
          message: 'A senha deve conter pelo menos um número.'
        },
        mustContainSpecial: {
          message: 'A senha deve conter pelo menos um caractere especial.',
          acceptableChars: '-+_!@#$%^&*.,?()'
        },
        length: {
          minimum: {
            value: 8,
            message: 'A senha deve ter no mínimo 8 caracteres.'
          }
        },
        match: {
          attr: 'confirm',
          message: 'As senhas não correspondem',
        },
      }
    }

    return validation

  }

}


