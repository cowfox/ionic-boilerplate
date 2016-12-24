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
 *  - sub-folder
 *      - filter.js
 * ```
 * NOTE: The structure now support "sub folders"!!!
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


    // region -> Module Export <-
    // ----------

    module.exports = {
        angularModuleDeclarator: _angularModuleDeclarator
    };

    // ----------
    // endregion


    /////////////////////////////


    // region -> Interface Functions <-
    // ----------

    /**
     * The main interface to help register all Angular elements.
     *
     * @param angularModule The source Angular module that working on.
     * @param angularElements The contained Angular elements to be processed.
     */
    function _angularModuleDeclarator(angularModule, angularElements) {

        if (!angularModule) {
            throw new Error('The "angular Module" cannot be "null"!!');
        }

        if (!angularElements) {
            throw new Error('The "angular Elements" cannot be "null"!!');
        }

        if (!_isObject(angularElements)) {
            console.error("The elementMap must be an object!!");
            return;
        }

        if(Object.keys(angularElements).length === 0) {
            console.error("The elementMap object cannot be empty!!");
            return;
        }

        _declareRecursively(angularModule, angularElements);
    }

    // ----------
    // endregion



    /////////////////////////////


    // region -> Internal Variables <-
    // ----------

    /**
     * Types of `Angular Elements`.
     *
     */
    var _ANGULAR_REGISTRATION_TYPE = {
        CONTROLLER: "controller",
        SERVICE: "service",
        FACTORY: "factory",
        DIRECTIVE: "directive",
        FILTER: "filter",
        CONSTANT: "constant",
        CONFIG: "config"
    };

    var _REQUIRED_ELEMENTS = [
        'name',
        'type',
        'func'
    ];

    // ----------
    // endregion


    /////////////////////////////


    // region -> Internal Functions <-
    // ----------

    /**
     * Declare an "element" to an Angular module.
     *
     * Now it supports "recursive" declaration.
     *
     * @param module
     * @param elementsMap
     * @private
     */
    function _declareRecursively(module, elementsMap) {
        // Ignore when `elementsMap` is not an object
        if (!_isObject(elementsMap)) {
            return;
        }

        //
        for (var key in elementsMap) {
            if (!elementsMap.hasOwnProperty(key)) {
                continue;
            }

            // Get the element
            var element = elementsMap[key];

            // Check if element is an object.
            if (!_isObject(element)) {
                continue;
            }

            // Check if the `element` is a valid object to doing "Angular Registration".
            if(_isValidAngularRegistrationObject(element)) {
                // Doing Angular registration
                _angularRegistration(module, element);
            } else {
                // Pass down to check its child elements.
                _declareRecursively(module, element);
            }
        }
    }

    /**
     * Register the given item to Angular module.
     *
     * If the item's type is not supported, an error is emitted.
     *
     * @param module
     * @param regItem
     * @private
     */
    function _angularRegistration(module, regItem) {

        if(!_isValidAngularRegistrationObject(regItem)) {
            // Error here!!!
            console.error("The angular registration item is not an valid object to register. " + JSON.stringify(regItem));
        }

        //
        switch(regItem.type) {
            case _ANGULAR_REGISTRATION_TYPE.CONTROLLER:
                if (typeof module.controller === 'function') {
                    module.controller(regItem.name, regItem.func);
                }
                break;
            case _ANGULAR_REGISTRATION_TYPE.SERVICE:
                if (typeof module.service === 'function') {
                    module.service(regItem.name, regItem.func);
                }
                break;
            case _ANGULAR_REGISTRATION_TYPE.FACTORY:
                if (typeof module.factory === 'function') {
                    module.factory(regItem.name, regItem.func);
                }
                break;
            case _ANGULAR_REGISTRATION_TYPE.DIRECTIVE:
                if (typeof module.directive === 'function') {
                    module.directive(regItem.name, regItem.func);
                }
                break;
            case _ANGULAR_REGISTRATION_TYPE.FILTER:
                if (typeof module.filter === 'function') {
                    module.filter(regItem.name, regItem.func);
                }
                break;
            case _ANGULAR_REGISTRATION_TYPE.CONSTANT:
                if (typeof module.constant === 'function') {
                    module.constant(regItem.name, regItem.func);
                }
                break;
            case _ANGULAR_REGISTRATION_TYPE.CONFIG:
                if (typeof module.config === 'function') {
                    module.config(regItem.func);
                }
                break;
            default:
                console.error("The angular registration item's type is not supported. " + JSON.stringify(regItem));
                break;
        }
    }

    /**
     * Check if a given "item" is object.
     *
     * NOTE: Only using `typeof` is not enough, since an "array" is also showing "object"...
     *
     * @param item
     * @returns {*|boolean}
     * @private
     */
    function _isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
    }

    /**
     * Check if the given object is valid for doing "Angular Registration".
     *
     * Validation criteria:
     *
     * - Contain "required" elements inside the object.
     * - `name` is string and not empty.
     * - `type` is in the list of "registration type".
     * - `func` is a function or object (for "constant" registration).
     *
     * @param object
     * @returns {boolean}
     * @private
     */
    function _isValidAngularRegistrationObject(object) {
        var retBool = true;

        // - Contain "required" elements inside the object.
        var containAll = _REQUIRED_ELEMENTS.every(function(property) {return property in object;});
        if (!containAll) {
            retBool = false;
            return retBool;
        }

        // - `name` is string and not empty.
        if (typeof object.name != 'string' || object.name == '') {
            retBool = false;
            return retBool;
        }

        // - `type` is in the list of "registration type".
        if (!object.type in _ANGULAR_REGISTRATION_TYPE) {
            retBool = false;
            return retBool;
        }

        // - `func` is a function or object (for "constant" registration).
        if (!object.func || (typeof object.func != 'function' && !_isObject(object.func))) {
            retBool = false;
            return retBool;
        }

        // All passed!!!
        return retBool;
    }

    // ----------
    // endregion


    /////////////////////////////


    // region -> Deprecated Functions <-
    // ----------

    /**
     * The internal function to help register all Angular elements.
     *
     * @param module The source Angular module that working on.
     * @param elementsMap The object contains Angular elements to be processed.
     * @private
     * @deprecated
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
                    element.func && (typeof element.func === 'function' || typeof element.func === 'object')) {
                    switch(element.type) {
                        case _ANGULAR_REGISTRATION_TYPE.CONTROLLER:
                            if (typeof module.controller === 'function') {
                                module.controller(element.name, element.func);
                            }
                            break;
                        case _ANGULAR_REGISTRATION_TYPE.SERVICE:
                            if (typeof module.service === 'function') {
                                module.service(element.name, element.func);
                            }
                            break;
                        case _ANGULAR_REGISTRATION_TYPE.FACTORY:
                            if (typeof module.factory === 'function') {
                                module.factory(element.name, element.func);
                            }
                            break;
                        case _ANGULAR_REGISTRATION_TYPE.DIRECTIVE:
                            if (typeof module.directive === 'function') {
                                module.directive(element.name, element.func);
                            }
                            break;
                        case _ANGULAR_REGISTRATION_TYPE.FILTER:
                            if (typeof module.filter === 'function') {
                                module.filter(element.name, element.func);
                            }
                            break;
                        case _ANGULAR_REGISTRATION_TYPE.CONSTANT:
                            if (typeof module.constant === 'function') {
                                module.constant(element.name, element.func);
                            }
                            break;
                        default:
                            console.error("The element type does not indicate it is an Angular element!!");
                            break;
                    }
                } else {
                    // Element is not a valid element to be checked.
                    console.error("The element is not a valid one to be checked!!" + JSON.stringify(element));
                }
            }
        }
    }

    // ----------
    // endregion


}());

