import { module, test } from 'qunit';
import { setupTest } from 'projeto-aspiras-app/tests/helpers';

module(
  'Unit | Route | authenticated/horario/newconfig/feriado',
  function (hooks) {
    setupTest(hooks);

    test('it exists', function (assert) {
      let route = this.owner.lookup(
        'route:authenticated/horario/newconfig/feriado'
      );
      assert.ok(route);
    });
  }
);
