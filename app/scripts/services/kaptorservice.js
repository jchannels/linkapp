'use strict';

/**
 * @ngdoc service
 * @name linkApp.kaptorService
 * @description
 * # kaptorService
 * Service in the linkApp.
 */
angular.module('linkApp').service('kaptorService', function ($http, $q,ENV) {
        
    var service = {
        kaptors : [],
        searchResult: [],
        getUserKaptor: getUserKaptor,
        addNewKaptor : addNewKaptor,
        editKaptor:editKaptor,
        searchKaptors:searchKaptors,
        deleteKaptor:deleteKaptor,
        subscribeKaptor:subscribeKaptor,
        unsubscribeKaptor:unsubscribeKaptor,
        addLink:addLink,
        deleteLink:deleteLink,
        editLink:editLink
    };
    return service;

    function getUserKaptor(username) {
        var def = $q.defer();

        $http.get(ENV.apiEndpoint + "/index.php/users/"+username+"/kaptors")
            .success(function(data) {
                service.kaptors = data.kaptors;
                def.resolve(data);
            })
            .error(function() {
                def.reject("Failed to get kaptors");
            });
        return def.promise;
    }

    function addNewKaptor(username,kaptor) {
        var def = $q.defer();

        $http.post(ENV.apiEndpoint + '/index.php/users/'+username+'/kaptors',kaptor)
            .success(function(data) {
                var k = data;
                k.mode = 'edit';
                service.kaptors.push(k);
                def.resolve(data);
            })
            .error(function() {
                def.reject("Failed to get kaptors");
            });

        return def.promise;
    }
    
    function editKaptor(kaptor) {
        
        var def = $q.defer();

        $http.put(ENV.apiEndpoint + '/index.php/kaptors/' + kaptor.id,kaptor)
            .success(function(data) {

            })
            .error(function() {
                def.reject("Failed");
            });

        return def.promise;
    }

    function deleteKaptor(kaptor) {
        var def = $q.defer();

          $http.delete(ENV.apiEndpoint + "/index.php/kaptors/" + kaptor.id)
            .success(function(data) {
                     var index =  service.kaptors.indexOf(kaptor);
                     service.kaptors.splice(index, 1);     

                    def.resolve(data);
            })
            .error(function() {
                def.reject("Failed to get kaptors");
            });
        return def.promise;
    }

    function searchKaptors(query) {
        var def = $q.defer();

        $http.get(ENV.apiEndpoint + "/index.php/kaptors?search=" + query)
            .success(function(data) {
                service.searchResult = data.kaptors;
                def.resolve(data);
            })
            .error(function() {
                def.reject("Failed searching kaptors");
            });
        return def.promise;
    }
    
    function subscribeKaptor(username,kaptor) {
        var def = $q.defer();
         var subscription ={'username':username, 'kaptorId': kaptor.id};
         
         $http.post(ENV.apiEndpoint + '/index.php/users/'+username+'/subscriptions',subscription)
				.success(function(data) {
                    kaptor.mode = 'view';
					service.kaptors.push(kaptor);
                    def.resolve(data);
				});

        return def.promise;
    }
    
    function unsubscribeKaptor(kaptor) {
        var def = $q.defer();

		$http.delete(ENV.apiEndpoint + '/index.php/subscriptions/' + kaptor.subscription_id)
				.success(function(data) {
                    var index =  service.kaptors.indexOf(kaptor);
                    service.kaptors.splice(index, 1);    
					def.resolve(data);
				});

        return def.promise;
    }
    
    function addLink(kaptor, link) {

        var def = $q.defer();
		$http.post(ENV.apiEndpoint + '/index.php/kaptors/' + kaptor.id + '/links', link)
				.success(function(data) {
                   kaptor.links.push(data);
				});

        return def.promise;
    }
    
    function editLink(link) {

        var def = $q.defer();
			$http.put(ENV.apiEndpoint + '/index.php/links/' + link.id, link)
				.success(function(data) {
                  
				});

        return def.promise;
    }  

    function deleteLink(kaptor, link) {

        var def = $q.defer();
        
		$http.delete(ENV.apiEndpoint + '/index.php/links/' + link.id )
				.success(function(data) {
                    var index =  kaptor.links.indexOf(link);
                     kaptor.links.splice(index, 1);     
				});

        return def.promise;
    }
});