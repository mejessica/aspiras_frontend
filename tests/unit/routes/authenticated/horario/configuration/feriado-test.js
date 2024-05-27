import { module, test } from 'qunit';
import { setupTest } from 'projeto-aspiras-app/tests/helpers';

module(
  'Unit | Route | authenticated/horario/configuration/feriado',
  function (hooks) {
    setupTest(hooks);

    test('it exists', function (assert) {
      let route = this.owner.lookup(
        'route:authenticated/horario/configuration/feriado'
      );
      assert.ok(route);
    });
  }
);
