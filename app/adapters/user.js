import ApplicationAdapter from './application';

export default class SignupAdapter extends ApplicationAdapter {
  urlForQuery(query) {
    if (query.me) {
      delete query.me;
      return this.urlPrefix() + '/user-profile';
    }
    return super.urlForQuery(...arguments);
  }
}
