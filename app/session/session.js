import Session from 'ember-simple-auth/services/session';
import { tracked } from '@glimmer/tracking';

export default class SessionService extends Session {
  @tracked user = null;
}
