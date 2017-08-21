(function() {
	'use strict';

	angular
        .module('ssceexamsuiApp')
		.factory('ConfigService', ConfigService);

		// ConfigService.$inject = ['$rootScope'];
		var urlPath = '../getUser.json';

		/* @ngInject */
		function ConfigService($rootScope) {

			return {
				getapi: getapi,
				setUrl: setUrl,
				getApiBaseRoute: getApiBaseRoute,
				getUserId: getUserId,
				getUrlPath: getUrlPath
			};

			function getapi() {;
				return 'http://34.225.120.20:8066';
			};

			function setUrl(val) {
				var devurlset = 'http://10.255.211.124:6045';
				var qaurlset = 'https://150.250.242.52:6040';
				var qaapiset = 'http://150.250.242.52:36095';

				if(val === 'dev') {
					$rootScope.url = devurlset;
				} else if(val === 'qa') {
					$rootScope.url = qaurlset;
				} else {
					return devurlset;
				}

				return $rootScope.url;
			}

			function getApiBaseRoute() {
				var nonWsealApi = 'http://10.255.211.124:37021/';
				if (($(location).attr('href').search('localhost:8030')) !== -1) {
					$rootScope.baseApiRoute = nonWsealApi;
				} else if(($(location).attr('href').search($rootScope.junctionpath)) !== -1) {
					// console.log('Found the Wseal Route...');
					$rootScope.baseApiRoute = 'https://' + location.host + '/' + $rootScope.junctionpath + '/';
				} else {
					$rootScope.baseApiRoute = nonWsealApi;
				}

				return $rootScope.baseApiRoute;        
            }

	        function getUserId() {
	        	return $rootScope.userId;
	        }

	        function getUrlPath() {
	        	return urlPath;
	        }
		}
})();
