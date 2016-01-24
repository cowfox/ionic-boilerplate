/**
 * @created Lei)Leo) SHI <foxshee@gmail.com>
 * @date 1/23/16
 */

'use strict';

// Load Angular Module Processor
var processor = require('../app.module.processor');

function accountController($scope) {

    'ngInject';

    $scope.settings = {
        enableFriends: true
    };
}

module.exports = {
    name: 'accountController',
    type: processor.elementType.CONTROLLER,
    func: accountController
};
