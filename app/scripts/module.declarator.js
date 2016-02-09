/***********************************************************
 * ### General Module Declarator of Angular Modules ###
 *
 * This module is used to help process the **module registration** of "all" Angular elements (like controller, service, etc.)
 * under each module, adding the declaration like the following:
 *
 * ```
 * angularModule.controller('controllerName', controllerFunc);
 * ```
 *
 * The "best" module structure that this **helper** supports is **functionality-based** modularization, such as:
 *
 * ```
 * module
 *  - controller.js
 *  - service.js
 *  - factory.js
 *  - directive.js
 *  - filter.js
 * ```
 *
 * In each Angular element definition, the `module.exports` must be the like the following format:
 *
 * ```
 * module.exports = {
     name: 'controllerName',
     type: elementType, // such as "controller", "service", etc.
     func: controllerFunc
     };
 * ```
 *
 * - The `name` is the **name** that to be regitered.
 * - `type` is used to let **Declarator** know which type should register to.
 * - `func` is the object that is passed as the `function` when doing the registraiton.
 *
 ***********************************************************/

(function () {
    "use strict";

    module.exports = {
        angularModuleDeclarator: angularModuleDeclarator
    };

    //----------------------------------------------------------
    // Interface Functions
    //----------------------------------------------------------

    /**
     * The main interface to help register all Angular elements.
     *
     * @param angularModule The source Angular module that working on.
     * @param angularElements The contained Angular elements to be processed.
     */
    function angularModuleDeclarator(angularModule, angularElements) {

        if (!angularModule) {
            throw new Error('The "angularModule" cannot be NULL!!');
        }

        if (!angularElements) {
            throw new Error('The "angularElements" cannot be NULL!!');
        }

        if (typeof angularElements !== 'object') {
            console.error("The elementMap must be an object!!");
            return;
        }

        if(Object.keys(angularElements).length === 0) {
            console.error("The elementMap object cannot be empty!!");
            return;
        }

        _declare(angularModule, angularElements);
    }

    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

    /**
     * Types of `Angular Elements`.
     *
     */
    var elementType = {
        CONTROLLER: "controller",
        SERVICE: "service",
        FACTORY: "factory",
        DIRECTIVE: "directive",
        FILTER: "filter"
    };

    /**
     * The internal function to help register all Angular elements.
     *
     * @param module The source Angular module that working on.
     * @param elementsMap The object contains Angular elements to be processed.
     * @private
     */
    function _declare(module, elementsMap) {

        for (var key in elementsMap) {
            if (elementsMap.hasOwnProperty(key)) {
                var element = elementsMap[key];

                if (!element || typeof element !== 'object') {
                    console.error("The element in elementMap must be an object!!");
                    continue;
                }

                if (typeof element.name === 'string' && element.name !== '' &&
                    element.func && typeof element.func === 'function') {
                    switch(element.type) {
                        case elementType.CONTROLLER:
                            if (typeof module.controller === 'function') {
                                module.controller(element.name, element.func);
                            }
                            break;
                        case elementType.SERVICE:
                            if (typeof module.service === 'function') {
                                module.service(element.name, element.func);
                            }
                            break;
                        case elementType.FACTORY:
                            if (typeof module.factory === 'function') {
                                module.factory(element.name, element.func);
                            }
                            break;
                        case elementType.DIRECTIVE:
                            if (typeof module.directive === 'function') {
                                module.directive(element.name, element.func);
                            }
                            break;
                        case elementType.FILTER:
                            if (typeof module.filter === 'function') {
                                module.filter(element.name, element.func);
                            }
                            break;
                        default:
                            console.error("The element type does not indicate it is an Angular element!!");
                            break;
                    }
                } else {
                    // Element is not a valid element to be checked.
                    console.error("The element is not a valid one to be checked!!");
                    continue;
                }
            }
        }
    }

}());

