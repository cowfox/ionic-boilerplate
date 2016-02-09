/**
 * @created Lei)Leo) SHI <foxshee@gmail.com>
 * @date 1/23/16
 */

'use strict';

function accountController($scope) {

    'ngInject';

    $scope.settings = {
        enableFriends: true
    };
}

module.exports = {
    name: 'accountController',
    type: "controller",
    func: accountController
};
