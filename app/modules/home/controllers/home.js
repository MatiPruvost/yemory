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
        'DbService',
        function($location, $scope, DbService) {


            function onDeviceReady() {
              console.log("Ready")
                DbService.open();
                getElements("active");
            }
            document.addEventListener("deviceready", onDeviceReady, false);

            // DbService.open();

            // Add a element on DB
            $scope.add = function(){
                if($scope.element){
                    DbService.addElement($scope.element)
                    .then(function success(response){
                        $scope.element = "";
                        // Refresh shown elements
                        getElements("active");
                    }, function error(error){
                        console.error(error)
                    });
                }
            };

            // Set a element as deactivated and remove from list
            $scope.deactivate = function(id){
                DbService.updateElement(id, "deactivated")
                .then(function success(response){
                    // Refresh shown elements
                    getElements("active");
                }, function error(error){
                    console.error(error)
                });
            };

            // Remove a element from list and DB
            $scope.remove = function(id){
                DbService.removeElement(id)
                .then(function success(response){
                    // Refresh shown elements
                    getElements("active");
                }, function error(error){
                    console.error(error)
                });
            };

            // Get elements by status
            var getElements = function(status){
                var query = {
                    status: status
                };
                DbService.getElements(query)
                .then(function success(response){
                    $scope.elements = response;
                }, function error(error){
                    console.error(error)
                });
            };

            // getElements("active");

        }
]);
