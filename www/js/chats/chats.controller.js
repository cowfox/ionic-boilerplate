/**
 * @created Lei)Leo) SHI <foxshee@gmail.com>
 * @date 1/23/16
 */

'use strict';

function chatsController($scope, chatsFactory) {

    'ngInject';

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = chatsFactory.all();
    $scope.remove = function(chat) {
        chatsFactory.remove(chat);
    };
}

module.exports = {
    name: 'chatsController',
    type: "controller",
    func: chatsController
};
