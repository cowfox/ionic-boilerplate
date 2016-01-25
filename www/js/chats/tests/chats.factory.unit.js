'use strict';

describe('Unit: Chats Factory', function() {

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
        expect(factory).toBeDefined();
    });

    it('should retrieve data', function() {
        var chats = factory.all();
        expect(Object.keys(chats).length).toEqual(5);
    });
});