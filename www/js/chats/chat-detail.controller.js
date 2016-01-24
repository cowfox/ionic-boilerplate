/**
 * @created Lei)Leo) SHI <foxshee@gmail.com>
 * @date 1/23/16
 */

'use strict';

function chatDetailController($scope, $stateParams, chatsFactory) {

    'ngInject';

    $scope.chat = chatsFactory.get($stateParams.chatId);
}

module.exports = {
    name: 'chatDetailController',
    type: "controller",
    func: chatDetailController
};