/**
 * @created Lei)Leo) SHI <foxshee@gmail.com>
 * @date 1/24/16
 */

'use strict';

/* ***************************************************************************
 * ### General Module Processor of Angular Module ###
 *
 * This module is used to help process the **module registration** of "all" Angular elements (like controller, service, etc.)
 * under each module, adding something like the following:
 *
 * ```
 * angularModule.controller('controllerName', controllerFunc);
 * ```
 *
 * The "best" module structure that this processor supports is **functionality-based** such as:
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
 */

/**
 * Types of `Angular Elements`.
 *
 */
var elementType = {
    CONTROLLER: "controller",
    SERVICE: "service",
    FACTORY: "factory",
    DIRECTIVE: "directoy",
    FILTER: "filter"
};

/**
 * The main interface to help register all Angular elements.
 *
 * @param angularModule The source Angular module that working on.
 * @param angularElements The contained Angular elements to be processed.
 */
function angularModuleProcessor(angularModule, angularElements) {

    var bulk = require('bulk-require');

    if (!angularModule) {
        error('The parameter "angularModule" cannot be NULL. ');
    }

    declare(angularModule, angularElements);
}

module.exports = {
    elementType: elementType,
    angularModuleProcessor: angularModuleProcessor
};

/**
 * The internal function to help register all Angular elements.
 *
 * @param module The source Angular module that working on.
 * @param elementsMap The contained Angular elements to be processed.
 */
function declare(module, elementsMap) {

    angular.forEach(elementsMap, function(element, key) {

        if (!element || typeof element !== 'object') {
            return;
        }

        if (element.func && typeof element.func === 'function') {
            switch(element.type) {
                case elementType.CONTROLLER:
                    module.controller(element.name, element.func);
                    break;
                case elementType.SERVICE:
                    module.service(element.name, element.func);
                    break;
                case elementType.FACTORY:
                    module.factory(element.name, element.func);
                    break;
                case elementType.DIRECTIVE:
                    module.directive(element.name, element.func);
                    break;
                case elementType.FILTER:
                    module.filter(element.name, element.func);
                    break;
            }
        } else {
            // Not any Angular type we are looking for....
        }
    });

}


