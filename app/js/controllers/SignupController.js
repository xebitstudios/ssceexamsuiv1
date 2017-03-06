(function() {
    'use strict';

    angular
        .module('ssceexamsuiApp')
        .controller('SignupController', SignupController);

    // SignupController.$inject = ['$scope', '$log', '$controller', '$rootScope', 'ConfigService', 'ApiService', 'growl', '$location'];

    /* @ngInject */
    function SignupController($scope, $log, $controller, $rootScope, ConfigService, ApiService, growl, $location) {

        $controller('BaseController', {$scope: $scope});
        var baseRoute = '';

        $scope.title = "Signup to SSCEexams";

        $scope.registerschoolclick = function() {
            console.log('Register School link clicked!');
            $location.path(baseRoute + 'registersch');
        };

        $scope.userdetails = {
            username: '',
            pword: '',
            usercode: '',
            usercity: '',
            usercountry: '',
            useremail: ''
        };

        $scope.submitForm = function() {
            console.log('$scope.userdetails.username is: ' + $scope.username);
            console.log('$scope.userdetails.pword is: ' + $scope.pword); 
            console.log('$scope.userdetails.usercode is: ' + $scope.usercode);
            console.log('$scope.userdetails.usercity is: ' + $scope.usercity); 
            console.log('$scope.userdetails.usercountry is: ' + $scope.usercountry); 
            console.log('$scope.userdetails.useremail is: ' + $scope.useremail); 

            console.log('New User Registeration form submitted!');
            ApiService.RegisterUser(userdetails);
            // $location.path(baseRoute);
        };
    }

     
})();
