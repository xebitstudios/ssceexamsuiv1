(function() {
    'use strict';

    angular
        .module('ssceexamsuiApp')
        .controller('ProfileController', ProfileController);

    // ProfileController.$inject = ['$scope', '$log', '$location', '$controller', '$rootScope', 'ConfigService', 'HeaderService', 'ApiService', 'growl', '$timeout', 'window'];

    /* @ngInject */
    function ProfileController($scope, $log, $location, $controller, $rootScope, ConfigService, HeaderService, ApiService, growl, $timeout, window, LoggingService) {

        $controller('BaseController', {$scope: $scope});
        $scope.logEvent = function() {
            LoggingService.postTrack('{synth,' + $scope.userid + ',' + new Date().getTime() + '}');
        };

        $rootScope.baseRoute = '';

        $scope.inProfile = function() {
            console.log('Now in the Profile page!');
            $scope.logEvent();
        };

        $scope.inProfile();

        $scope.username = 'xebitstudios';
        $scope.city_state = 'Egbeda, Lagos';
        $scope.fname_lname = 'Omobola Aderonye';
        $scope.street_address = '256 Kamuri Olasogo Street';
        $scope.country = 'Nigeria';
        $scope.user_tel = '8034567893';
        $scope.user_email = 'xebitstudios@yahoo.com';

        $scope.editProfile = function() {
            console.log('editProfile clicked!');
            $('.profile').prop('disabled', false);
        };

        $('.profile').prop('disabled', true);

        $scope.setProfile = function() {
            $scope.fname = $('#tfname').val();
            $scope.lname = $('#tlname').val();
            $scope.straddy = $('#tstraddy').val();
            $scope.city = $('#tcity').val();
            $scope.state = $('#tstate').val();
            $scope.country = $('#tcountry').val();
            $scope.tel = $('#tphone').val();
            $scope.email = $('#temail').val();
            $scope.about = $('#tnote').val();

            $scope.schnameaddy = $('#ytschname').val();
            $scope.schcity = $('#ytcity').val();
            $scope.schstate = $('#ytstate').val();
            $scope.schcountry = $('#ytcountry').val();
            $scope.schcontact = $('#tschcontct').val();
            $scope.schcontactphone = $('#ytphone').val();
            $scope.schphone = $('#ytschphone').val();            
            $scope.schemail = $('#ytemail').val();
            $scope.schabout = $('#ynote').val();
        };

        $scope.userprofile = {
            user: {
                fname: $scope.fname,
                lname: $scope.lname,
                straddy: $scope.straddy,
                city: $scope.city,
                state: $scope.state,
                country: $scope.country,
                tel: $scope.tel,
                email: $scope.email,
                about: $scope.about
            },
            sch: {
                schnameaddy: $scope.schnameaddy,
                schcity: $scope.schcity,
                schstate: $scope.schstate,
                schcountry: $scope.schcountry,
                schcontact: $scope.schcontact,
                schphone: $scope.schphone,
                schemail: $scope.schemail,
                schabout: $scope.schabout
            }
        };

        $scope.editUserProfile = function() {
            ApiService.editUserProfile({
                userid: $scope.userid,
                userdetails: $scope.userprofile.user
            });
        };

        $scope.editUserSchoolProfile = function() {
            ApiService.editUserSchoolProfile({
                userid: $scope.userid,
                schdetails: $scope.userprofile.sch
            });
        };

        $timeout(function(){
           HeaderService.setTab(3);
        }, 400);

    }
})();