'use strict';

/**
 * @ngdoc object
 * @name home.Controllers.HomeController
 * @description HomeController shows elements and add a new element
 * @requires ng.$location
 * @requires ng.$scope
 * @requires DbService
*/
angular
    .module('home')
    .controller('HomeController', [
        '$location',
        '$scope',
        'LsService',
        function($location, $scope, LsService) {

            // Add a element on the list and the LS
            $scope.add = function(){
                if($scope.element){
                    LsService.add($scope.element);
                    getElements();
                    $scope.element = "";
                }
            };

            // Remove a element from the list and the LS
            $scope.remove = function(element){
                LsService.remove(element);
                getElements();
            };

            // Get all elements
            var getElements = function(){
                $scope.elements = LsService.get();
            };

            // Show added elements on the list
            getElements();

        }
]);
