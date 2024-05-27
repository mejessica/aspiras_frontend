import EmberRouter from '@ember/routing/router';
import config from 'projeto-aspiras-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login', { path: '/signin' });
  this.route('user', { path: '/signup' });
  this.route('authenticated', { path: '/' }, function () {
    this.route('perfil', { path: '/users' }, function () {
      this.route('edit', { path: '/:id/edit' });
    });
    this.route('list', { path: '/todolist' });
    this.route('todo', { path: '/list' }, function () {
      this.route('newlist', { path: '/new' });
      this.route('item', { path: '/item/:id' }, function () {
        this.route('newitem', { path: '/new' });
        this.route('edit', { path: '/edit/:item_id' });
      });
    });
    this.route('horario', { path: '/dailycontrol' }, function () {
      this.route('configuration');
      this.route('feriado');
      this.route('hora');
      this.route('editarFeriado', {path: '/editar'});
    });
  });
});
