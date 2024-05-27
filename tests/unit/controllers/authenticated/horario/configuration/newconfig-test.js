import { module, test } from 'qunit';
import { setupTest } from 'projeto-aspiras-app/tests/helpers';

module(
  'Unit | Controller | authenticated/horario/configuration/newconfig',
  function (hooks) {
    setupTest(hooks);

    // TODO: Replace this with your real tests.
    test('it exists', function (assert) {
      let controller = this.owner.lookup(
        'controller:authenticated/horario/configuration/newconfig'
      );
      assert.ok(controller);
    });
  }
);
