'use strict';

describe('E2E: Chats page', function(){

    var chats;

    beforeEach(function() {
        // Go to the page to be tested.
        browser.get('/#/tab/chats');
    });

    it('should list 5 items', function(){

        element.all(by.repeater('chat in chats')).then(function(items) {
            expect(items.length).toEqual(5);
        });
    });

});