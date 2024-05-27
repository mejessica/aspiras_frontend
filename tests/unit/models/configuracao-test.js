import { module, test } from 'qunit';

import { setupTest } from 'projeto-aspiras-app/tests/helpers';

module('Unit | Model | configuracao', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('configuracao', {});
    assert.ok(model);
  });
});
