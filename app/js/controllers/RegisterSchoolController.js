(function() {
    'use strict';

    angular
        .module('ssceexamsuiApp')
        .controller('RegisterSchoolController', RegisterSchoolController);

    // RegisterSchoolController.$inject = ['$scope', '$log', '$controller', '$rootScope', 'ConfigService', 'ApiService', 'growl', '$location'];

    /* @ngInject */
    function RegisterSchoolController($scope, $log, $controller, $rootScope, $timeout, ConfigService, ApiService, HeaderService, growl, $location) {

        $controller('BaseController', {$scope: $scope});

        $scope.title = "Register your School to SSCEexams";

        $scope.schRegShow = function(cmmt) {
            $scope.schregval = cmmt;
            $("#schregval").removeClass("hide");
            $timeout(function(){
                $("#schregval").addClass("hide");
            }, 5000);
        };

        $scope.registernewschool = function() {
            console.log('$scope.schname is: ' + $scope.schname);
            console.log('$scope.schooladdy is: ' + $scope.schooladdy); 
            console.log('$scope.schuname is: ' + $scope.schuname);
            console.log('$scope.schpwd is: ' + $scope.schpwd); 
            console.log('$scope.schctperson is: ' + $scope.schctperson);
            console.log('$scope.schemail is: ' + $scope.schemail); 
            console.log('$scope.schctphone is: ' + $scope.schctphone);
            console.log('$scope.schadd is: ' + $scope.schadd);
            console.log($('#prek').is(':checked'));
            console.log($('#kdgrt').is(':checked'));
            console.log($('#nandp').is(':checked'));
            console.log($('#secon').is(':checked'));
            console.log($('#tert').is(':checked'));
            console.log($('#schfree').is(':checked'));
            console.log($('#schbasic').is(':checked'));
            console.log($('#schprm').is(':checked'));

            console.log('Register form submitted!');
            ApiService.registerSchool({
                schname: $scope.schname,
                schooladdy: $scope.schooladdy,
                schuname: $scope.schuname,
                schpwd: $scope.schpwd,
                schctperson: $scope.schctperson,
                schemail: $scope.schemail,
                schctphone: $scope.schctphone,
                schadd: $scope.schadd,
                prek: $('#prek').is(':checked'),
                kdgrt: $('#kdgrt').is(':checked'),
                nandp: $('#nandp').is(':checked'),
                secon: $('#secon').is(':checked'),
                tert: $('#tert').is(':checked'),
                schfree: $('#schfree').is(':checked'),
                schbasic: $('#schbasic').is(':checked'),
                schprm: $('#schprm').is(':checked')
            }).then(function(response) {
                if(response.success) {
                    console.log('Application Submitted Successfully, We will Contact You Soon.');
                    $scope.schRegShow('Application Submitted Successfully, We will Contact You Soon.');
                    // $location.path('dashboard');
                }
            }, function(error) {
                $scope.schRegShow('School Application Failed, Please Try Again!');
            });
        };

        $timeout(function(){
            HeaderService.setTab(6);
        }, 300);
    }

     
})();
