
const componentGenerator = require('./tpls/plop/component/prompt')
const viewGenerator = require('./tpls/plop/view/prompt')

module.exports = function(plop) {
  plop.setGenerator('view',viewGenerator)
  plop.setGenerator('component',componentGenerator)
}