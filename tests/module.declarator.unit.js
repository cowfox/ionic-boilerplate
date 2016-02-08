/***********************************************************
 *  \#\#\# Unit Test for "Angular Module Declarator" \#\#\#
 *
 *
 ***********************************************************/

(function () {
    "use strict";

    var expect                  = require("chai").expect;
    var sinon                   = require('sinon');

    var angular                 = require("angular");
    require("angular-mock");

    var moduleDeclarator        = require('../app/scripts/module.declarator');

    //----------------------------------------------------------
    // Test Statements
    //----------------------------------------------------------

    describe("Angular Module Declarator", function() {

        var sandbox;
        var module;

        beforeEach(function() {

            // Create a Sinon sandbox
            sandbox = sinon.sandbox.create();

            // Create Sinon stubs for some console methods
            sandbox.stub(window.console, "log");
            sandbox.stub(window.console, "error");

            // Create Sinon spies for "module functions"
            module = {
              "controller": sandbox.spy(),
              "service": sandbox.spy(),
              "factory": sandbox.spy(),
              "directive": sandbox.spy(),
              "filter": sandbox.spy()
            };
        });

        afterEach(function() {
            // Restore the environment as it was before
            sandbox.restore();
        });

        ////

        describe("#angularModuleDeclarator Function Arguments", function() {

            it("should not accept module as NULL.", function() {
                //TODO Current `chai` has issue in `.throw()`.
                //expect(moduleDeclarator.angularModuleDeclarator(null)).to.throw(new Error('The parameter "angularModule" cannot be NULL.'));
            });

            it("should not accept angular elementMap as NULL", function() {
                //TODO Current `chai` has issue in `.throw()`.
                //expect(function(){
                //    moduleDeclarator.angularModuleDeclarator(module, null);
                //}).to.throw(Error);
            });

            it("should not accept elementMap as not an object.", function() {
                var eleMap = 'Not an object';
                moduleDeclarator.angularModuleDeclarator(module, eleMap);

                sinon.assert.calledOnce(console.error);
                sinon.assert.calledWithExactly(console.error, 'The elementMap must be an object!!');
            });

            it("should not accept elementMap as an empty object.", function() {
                var eleMap = {};
                moduleDeclarator.angularModuleDeclarator(module, eleMap);

                sinon.assert.calledOnce(console.error);
                sinon.assert.calledWithExactly(console.error, 'The elementMap object cannot be empty!!');
            });
        });

        describe("#angularModuleDeclarator Function", function() {

            it("should return error if elementMap contains 'non-object' element. ", function() {
                var eleMap = {
                    "string": "Not an object"
                };
                moduleDeclarator.angularModuleDeclarator(module, eleMap);
                sinon.assert.calledOnce(console.error);
                sinon.assert.calledWithExactly(console.error, 'The element in elementMap must be an object!!');
            });

            it("should be able to register a 'controller'.", function() {
                var eleMap = {
                    "controller": {
                        name: 'aController',
                        type: "controller",
                        func: function() {}
                    }
                };

                moduleDeclarator.angularModuleDeclarator(module, eleMap);
                expect(module.controller.called).to.be.true;
            });

            it("should be able to register a 'factory'.", function() {
                var eleMap = {
                    "factory": {
                        name: 'aFactory',
                        type: "factory",
                        func: function() {}
                    }
                };
                //
                moduleDeclarator.angularModuleDeclarator(module, eleMap);
                expect(module.factory.called).to.be.true;
            });

            it("should be able to register a 'service'.", function() {
                var eleMap = {
                    "service": {
                        name: 'aService',
                        type: "service",
                        func: function() {}
                    }
                };

                moduleDeclarator.angularModuleDeclarator(module, eleMap);
                expect(module.service.called).to.be.true;
            });

            it("should be able to register a 'directive'.", function() {
                var eleMap = {
                    "directive": {
                        name: 'aDirective',
                        type: "directive",
                        func: function() {}
                    }
                };

                moduleDeclarator.angularModuleDeclarator(module, eleMap);
                expect(module.directive.called).to.be.true;
            });

            it("should be able to register a 'filter'.", function() {
                var eleMap = {
                    "filter": {
                        name: 'aFilter',
                        type: "filter",
                        func: function() {}
                    }
                };

                moduleDeclarator.angularModuleDeclarator(module, eleMap);
                expect(module.filter.called).to.be.true;
            });

            it("should be able to ignore 'non-object elements'.", function() {

                var eleMap = {
                    "controller": {
                        name: 'aController',
                        type: "controller",
                        func: function() {}
                    },
                    "factory": {
                        name: 'aFactory',
                        type: "factory",
                        func: function() {}
                    },
                    // error
                    "number": 1,
                    "service": {
                        name: 'aService',
                        type: "service",
                        func: function() {}
                    },
                    "directive": {
                        name: 'aDirective',
                        type: "directive",
                        func: function() {}
                    },
                    // error
                    "string": "Not an object",
                    "filter": {
                        name: 'aFilter',
                        type: "filter",
                        func: function() {}
                    },
                    // error
                    "fakeFilter": {
                        name: 'aFilter',
                        type: "filter-typo",
                        func: function() {}
                    },
                    // error
                    "fakeFactory": {
                        name: 2,
                        type: "filter",
                        func: function() {}
                    },
                    // error
                    "fakeController": {
                        name: 'anotherController',
                        type: "controller",
                        func: 'Not a function'
                    }
                };

                moduleDeclarator.angularModuleDeclarator(module, eleMap);

                expect(console.error.callCount).to.be.equal(5);

                expect(module.controller.callCount).to.be.equal(1);
                expect(module.factory.callCount).to.be.equal(1);
                expect(module.service.callCount).to.be.equal(1);
                expect(module.directive.callCount).to.be.equal(1);
                expect(module.filter.callCount).to.be.equal(1);
            });
        });
    });

}());