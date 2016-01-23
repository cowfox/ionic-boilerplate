/**
 * @created Lei)Leo) SHI <foxshee@gmail.com>
 * @date 1/23/16
 */


appModule.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
});