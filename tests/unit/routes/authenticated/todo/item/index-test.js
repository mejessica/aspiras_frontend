import { module, test } from 'qunit';
import { setupTest } from 'projeto-aspiras-app/tests/helpers';

module('Unit | Route | authenticated/todo/item/5', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:authenticated/todo/item/index');
    assert.ok(route);
  });
});
