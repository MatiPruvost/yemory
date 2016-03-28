'use strict';

/**
 * @ngdoc service
 * @name core.Services.LsService
 * @description LsService Service
 */
angular
    .module('core')
    .service('LsService', [

        function() {

            /**
             * @ngdoc function
             * @name core.Services.LsService#add
             * @methodOf core.Services.LsService
             * @return {boolean} Returns the added element
             */
            var add = function(element) {
                var elements = get();
                elements.push(element);
                localStorage.setItem(
                    "yemory.elements",
                    JSON.stringify(elements)
                );
                return element;
            };

            /**
             * @ngdoc function
             * @name core.Services.LsService#get
             * @methodOf core.Services.LsService
             * @return {boolean} Returns all elements
             */
            var get = function() {
                var elements = JSON.parse(
                  localStorage.getItem("yemory.elements")
                );
                if (elements){
                  return elements;
                }
                else{
                  return [];
                }
            };

            /**
             * @ngdoc function
             * @name core.Services.LsService#remove
             * @methodOf core.Services.LsService
             * @return {boolean} Returns the removed element
             */
            var remove = function(element) {
                var elements = JSON.parse(localStorage.getItem("yemory.elements"));
                var index = elements.indexOf(element);
                if (index > -1) {
                    elements.splice(index, 1);
                    localStorage.setItem(
                        "yemory.elements",
                        JSON.stringify(elements)
                    );
                    return element;
                }
                return null;
            };

            return{
                add: add,
                get: get,
                remove: remove
            }

        }
    ]);
