

(function () {
    "use strict";

    var expect          = require("chai").expect;
    var angular         = require("angular");
    require("angular-mock");

    // Require "main" module file.
    require('../chats.module');

    describe('ChatsFactory', function() {

        var factory;

        beforeEach(function() {
            // instantiate the app module
            angular.mock.module('app.chats');

            // mock the service
            angular.mock.inject(function(chatsFactory) {
                factory = chatsFactory;
            });
        });

        it('should exist', function() {
            expect(factory).to.be.defined;
        });

        it('should retrieve 5 data entries', function() {
            var chats = factory.all();
            expect(Object.keys(chats).length).to.equal(5);
        });
    });

}());