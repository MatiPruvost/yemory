'use strict';

/**
 * @ngdoc service
 * @name core.Services.DbService
 * @description DbService Service
 */
angular
    .module('core')
    .service('DbService', ['$cordovaSQLite',
        '$q',

        function($cordovaSQLite, $q) {

            var db;

            var createSelectQuery = function(objectQuery){
                var query = "";
                var keys = [];
                var values = [];
                for (var key in objectQuery){
                    keys.push(key + "=?")
                    values.push(objectQuery[key])
                }
                query = "WHERE " + keys.join(" and ");
                return{
                    query: query,
                    values: values
                }
            };

            /**
             * @ngdoc function
             * @name core.Services.DbService#addElement
             * @methodOf core.Services.DbService
             * @return {number} Returns the inserted elemen's ID
             */
            var addElement = function(element) {
                var query = "INSERT INTO element_table (name, status) VALUES(?,?)";
                var deferred = $q.defer();
                $cordovaSQLite.execute(db, query, [element, "active"])
                .then(function(res) {
                    console.log("insertId: " + res.insertId);
                    deferred.resolve(res.insertId);
                }, function (err) {
                    console.error(err);
                    deferred.reject(err);
                });
                return deferred.promise;
            };

            /**
             * @ngdoc function
             * @name core.Services.DbService#drop
             * @methodOf core.Services.DbService
             * @return {object} Returns the Database object
             */
            var drop = function(table) {
                $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS " + table);
                return db;
            };

            /**
             * @ngdoc function
             * @name core.Services.DbService#getElement
             * @methodOf core.Services.DbService
             * @return {promise} Returns the inserted element's ID or an error
             */
            var getElement = function(id) {
                var query = "SELECT * FROM element_table WHERE rowid=?";
                var deferred = $q.defer();
                $cordovaSQLite.execute(db, query, [id]).then(function(res) {
                    console.log("selected object: " + id);
                    deferred.resolve(res.rows[0]);
                }, function (err) {
                    console.error(err);
                    deferred.reject(err);
                });
                return deferred.promise;
            };

            /**
             * @ngdoc function
             * @name core.Services.DbService#getElements
             * @methodOf core.Services.DbService
             * @return {promise} Returns inserted elements by query or an error
             */
            var getElements = function(objectQuery) {
                var objQuery = createSelectQuery(objectQuery)
                var query = "SELECT rowid, * FROM element_table " +
                    objQuery.query;
                var deferred = $q.defer();
                $cordovaSQLite.execute(db, query, objQuery.values)
                .then(function(res) {
                    console.log("selected objects: " + res.rows);
                    var pendingList = [];
                    for (var i = 0; i < res.rows.length; i++) {
                        pendingList.push(res.rows.item(i));
                    }
                    deferred.resolve(pendingList);
                }, function (err) {
                    console.error(err);
                    deferred.reject(err);
                });
                return deferred.promise;
            };

            /**
             * @ngdoc function
             * @name core.Services.DbService#open
             * @methodOf core.Services.DbService
             * @return {object} Returns the Database object
             */
            var open = function() {
                if (window.cordova) {
                    //device
                    db = $cordovaSQLite.openDB({ name: "yemory.db" });
                }else{
                    // browser
                    db = window.openDatabase("yemory.db", '1', 'yemory',
                        1024 * 1024 * 100);
                }
                $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS element_table (name, status)");
                return db;
            };

            /**
             * @ngdoc function
             * @name core.Services.DbService#removeElement
             * @methodOf core.Services.DbService
             * @return {promise} Returns the deleted element
             */
            var removeElement = function(id) {
                var query = "DELETE FROM element_table WHERE rowid = '" +
                    id + "'";
                var deferred = $q.defer();
                $cordovaSQLite.execute(db, query).then(function(res) {
                    console.log("Remove object: " + id);
                    deferred.resolve(res.rows);
                }, function (err) {
                    console.error(err);
                    deferred.reject(err);
                });
                return deferred.promise;
            };

            /**
             * @ngdoc function
             * @name core.Services.DbService#updateElement
             * @methodOf core.Services.DbService
             * @return {promise} Returns the updated element
             */
            var updateElement = function(id, status) {
                var query = "UPDATE element_table SET status = '" +
                    status + "' where rowid like '" + id + "'";
                var deferred = $q.defer();
                $cordovaSQLite.execute(db, query).then(function(res) {
                    console.log("Update object: " + id);
                    deferred.resolve(res.rows);
                }, function (err) {
                    console.error(err);
                    deferred.reject(err);
                });
                return deferred.promise;
            };

            return{
                addElement: addElement,
                drop: drop,
                getElement: getElement,
                getElements: getElements,
                open: open,
                removeElement: removeElement,
                updateElement: updateElement
            }

        }
    ]);
