'use strict';

var chai     = require('chai');
var promised = require('chai-as-promised');
chai.use(promised);
var expect   = chai.expect;

describe('E2E: Chats page', function(){

    var chats;

    beforeEach(function() {

        //browser.wait(function() {
        //    return browser.executeScript('return !!window.angular');
        //}, 5000); // 5000 is the timeout in millis

        // Go to the page to be tested.
        browser.get('/#/tab/chats');
    });

    it('should list 5 items', function(){

        chats = element.all(by.repeater('chat in chats'));
        expect(chats.count()).to.eventually.eq(5);
    });

});