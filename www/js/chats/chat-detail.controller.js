/**
 * @created Lei)Leo) SHI <foxshee@gmail.com>
 * @date 1/23/16
 */

'use strict';

// Load Angular Module Processor
var processor = require('../app.module.processor');

function chatDetailController($scope, $stateParams, chatsFactory) {

    'ngInject';

    $scope.chat = chatsFactory.get($stateParams.chatId);
}

module.exports = {
    name: 'chatDetailController',
    type: processor.elementType.CONTROLLER,
    func: chatDetailController
};