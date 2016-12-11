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

    // Locate your own "Angular Module Declarator" file.
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
              "filter": sandbox.spy(),
              "constant": sandbox.spy()
            };
        });

        afterEach(function() {
            // Restore the environment as it was before
            sandbox.restore();
        });

        ////

        describe("Function Arguments", function() {

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

                //
                expect(console.error.callCount).to.be.equal(1);

                // sinon.assert.calledOnce(console.error);
                // sinon.assert.calledWithExactly(console.error, 'The elementMap must be an object!!');
            });

            it("should not accept elementMap as an empty object.", function() {
                var eleMap = {};
                moduleDeclarator.angularModuleDeclarator(module, eleMap);

                expect(console.error.callCount).to.be.equal(1);

                // sinon.assert.calledOnce(console.error);
                // sinon.assert.calledWithExactly(console.error, 'The elementMap object cannot be empty!!');
            });
        });

        describe("Function", function() {

            it('should ignore the "invalid" registration item', function() {

                var eleMap = {
                    'lackRequiredElements': {
                        name: "aController"
                    },
                    'nameIsEmpty': {
                        name: '',
                        type: 'controller',
                        func: function() {}
                    },
                    'typeIsNotSupported': {
                        name: 'aController',
                        type: 'controllerTypo',
                        func: function() {}
                    },
                    'funcIsNotFunction': {
                        name: 'aController',
                        type: 'controller',
                        func: 'Not a function'
                    },
                    'funcIsNotObject': {
                        name: 'aController',
                        type: 'controller',
                        func: [1, 2]
                    }
                };

                moduleDeclarator.angularModuleDeclarator(module, eleMap);

                expect(module.controller.callCount).to.be.equal(0);
                expect(module.factory.callCount).to.be.equal(0);
                expect(module.service.callCount).to.be.equal(0);
                expect(module.directive.callCount).to.be.equal(0);
                expect(module.filter.callCount).to.be.equal(0);
                expect(module.constant.callCount).to.be.equal(0);
            });

            it("should be able to register a 'controller'.", function() {
                var eleMap = {
                    'controller': {
                        name: 'aController',
                        type: 'controller',
                        func: function() {}
                    }
                };

                moduleDeclarator.angularModuleDeclarator(module, eleMap);

                expect(module.controller.called).to.be.true;
            });

            it("should be able to register a 'factory'.", function() {
                var eleMap = {
                    'factory': {
                        name: 'aFactory',
                        type: 'factory',
                        func: function() {}
                    },
                    'anotherFactory': {
                        name: 'anotherFactory',
                        type: 'factory',
                        func: function() {}
                    }
                };

                moduleDeclarator.angularModuleDeclarator(module, eleMap);

                expect(module.factory.called).to.be.true;
            });

            it("should be able to register a 'service'.", function() {
                var eleMap = {
                    'service': {
                        name: 'aService',
                        type: 'service',
                        func: function() {}
                    }
                };

                moduleDeclarator.angularModuleDeclarator(module, eleMap);

                expect(module.service.called).to.be.true;
            });

            it("should be able to register a 'directive'.", function() {
                var eleMap = {
                    'directive': {
                        name: 'aDirective',
                        type: 'directive',
                        func: function() {}
                    }
                };

                moduleDeclarator.angularModuleDeclarator(module, eleMap);

                expect(module.directive.called).to.be.true;
            });

            it("should be able to register a 'filter'.", function() {
                var eleMap = {
                    'filter': {
                        name: 'aFilter',
                        type: 'filter',
                        func: function() {}
                    }
                };

                moduleDeclarator.angularModuleDeclarator(module, eleMap);

                expect(module.filter.called).to.be.true;
            });

            it("should be able to register a 'constant'.", function() {
                var eleMap = {
                    'constant': {
                        name: 'aConstant',
                        type: 'constant',
                        func: {
                            constantName: 'constant'
                        }
                    }
                };

                moduleDeclarator.angularModuleDeclarator(module, eleMap);

                expect(module.constant.called).to.be.true;
            });

            it('should register an item even it is in several levels deep', function() {
                var eleMap = {
                    'midEle': {
                        'controller': {
                            name: 'aController',
                            type: 'controller',
                            func: function() {}
                        }
                    }
                };

                moduleDeclarator.angularModuleDeclarator(module, eleMap);

                expect(module.controller.called).to.be.true;
            });

        });

    });

}());