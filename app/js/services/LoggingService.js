(function() {
	'use strict';

	angular
        .module('ssceexamsuiApp')
		.factory('LoggingService', LoggingService);

		// LoggingService.$inject = ['$window'];

		/* @ngInject */
		function LoggingService($window) {

			return {
				postTrack: postTrack
			};

			function httpPromise (vobj) {
				var deferred = $q.defer();
				$http(vobj)
					.success(function(response) {
						deferred.resolve(response);
					})
					.error(function() {
						deferred.reject();
					});
				return deferred.promise;
			};

			function getDate() {
				var myDate = new Date();
				return (myDate.getMonth() + 1) + ":" +
					 myDate.getDate() + ":" + 
					 myDate.getFullYear() + ':' + 
					 myDate.getHours() + ":" + 
					 myDate.getMinutes() + ":" + 
					 myDate.getSeconds() + ":" + 
					 myDate.getMilliseconds() + ';';
			};

			function postTrack(val) {
				// var myDate = new Date();
				if($window.sessionStorage.track) {
					console.log('$window.sessionStorage.track is: ' + $window.sessionStorage.track);
					var old = $window.sessionStorage.track;
					$window.sessionStorage.track = old + val;

					if (($window.sessionStorage.track.split('}{')).length > 4) {
						console.log("Sending this to the external Tracking Data Ingestor service = " + ($window.sessionStorage.track.split('}{')).length + ".");
						ingestLogs($window.sessionStorage.track);
						// $window.sessionStorage.setItem('track','');
					}
				} else {
					$window.sessionStorage.track = val;
				}
			};

			function ingestLogs(ulogs) {
				console.log('Ingesting logs: ' + ulogs);
				$window.sessionStorage.track = '-';
				var vObj = {
	            	method: 'POST',
	                url: '/api/ingestlogs',
	                data: {
	                	userid: '1452552',
	                    val: ulogs
	                },
	                headers: {
	                    'Content-Type': 'application/json',
	                    'Authorization': $rootScope.token || $window.sessionStorage.act
	                }
	            };
	            return httpPromise(vObj);
			};
		}
})();