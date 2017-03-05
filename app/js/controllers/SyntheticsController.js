(function() {
    'use strict';

    angular
        .module('ssceexamsuiApp')
        .controller('SyntheticsController', SyntheticsController);

    // SyntheticsController.$inject = ['$scope', '$log', '$location', '$controller', '$rootScope', 'ConfigService', 'HeaderService', 'ApiService', 'growl', '$timeout', '$window'];

    /* @ngInject */
    function SyntheticsController($scope, $log, $location, $controller, $rootScope, ConfigService, HeaderService, ApiService, growl, $timeout, $window) {

        $controller('BaseController', {$scope: $scope});

        $rootScope.baseRoute = '';

        $scope.inSynthetics = function() {
            console.log('Now in the Synthetics page!');
        };

        $scope.inSynthetics();

        $timeout(function(){
           HeaderService.setTab(3);
        }, 100);

    }
})();