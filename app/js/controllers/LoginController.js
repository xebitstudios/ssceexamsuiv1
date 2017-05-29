(function() {
    'use strict';

    angular
        .module('ssceexamsuiApp')
        .controller('LoginController', LoginController);

    // LoginController.$inject = ['$scope', '$log', '$controller', '$rootScope', 'AuthService', 'growl', '$location', 'window'];

    /* @ngInject */
    function LoginController($scope, $log, $controller, $rootScope, $timeout, AuthService, ApiService, growl, $location, window) {

        $controller('BaseController', {$scope: $scope});

        $scope.title = "Login to SSCEexams";

        // implement pre-paid coupon code for specific durationlogin functionality

        $scope.username = '';
        $scope.pword = '';
        $rootScope.login = false;
        window.sessionStorage.act = '';
        $rootScope.token = '';

        $scope.disabletray = function() {
            $('#righttray ul').addClass("hide");
        };

        $scope.thelogin = function() {
            $('#signupcard').addClass('hide');
            $('#logincard').removeClass('hide');
            $('#forgotcard').addClass('hide');                        
        };

        $scope.thesignUp = function() {
            $('#signupcard').removeClass('hide');
            $('#logincard').addClass('hide');
            $('#forgotcard').addClass('hide');                        
        };

        $scope.theforgot = function() {
            $('#signupcard').addClass('hide');
            $('#logincard').addClass('hide');
            $('#forgotcard').removeClass('hide');  
            $scope.fpusername = '';
            $scope.fpemail = '';
        };

        $scope.gotoLogin = function() {
            $scope.thelogin();
        };

        $scope.loginFail = function() {
            $scope.userlogin = 'Username and Password Required to Log in!';
            $("#loginfail").removeClass("hide");
            $timeout(function(){
                $("#loginfail").addClass("hide");
            }, 5000);
        };

        $scope.fpwordFail = function(cmmt) {
            $scope.userforgot = cmmt;
            $("#forgotfail").removeClass("hide");
            $timeout(function(){
                $("#forgotfail").addClass("hide");
            }, 5000);
        };

        $scope.sendForgot = function() {
            if(($scope.fpusername == '') || ($scope.fpemail == '')) {
                $scope.fpwordFail('Username and Email are both Required!');
            } else if(!$scope.isEmail($scope.fpemail)) {
                $scope.fpwordFail('Enter a Valid Email!');
            } else {
                $scope.userForgotPassword();
            }
        };

        $scope.userLogin = function() {
            if(($scope.username == '') || ($scope.pword == '')) {
                $scope.loginFail();
            } else if(($scope.username == 'bawo') && ($scope.pword == 'oyowe')) {
            // if(($scope.username) && ($scope.pword)) {
                AuthService.postLoginForm({
                    uname: $scope.username, 
                    pwd: $scope.pword
                }).then(function(response) {
                    console.log('The Api response is: ');
                    console.log(response);
                    if(response.success) {
                        console.log('User Authenticated successfully.');
                        $rootScope.token = response.token;
                        if(!window.sessionStorage.act) { window.sessionStorage.act = response.token; }
                        if(!window.localStorage.act) { window.localStorage.act = response.token; }
                        $rootScope.login = true;
                        // var baseRoute = '';
                        // $location.path(baseRoute + 'dashboard');
                        $location.path('dashboard');
                        $('#righttray ul').removeClass("hide");
                    }
                }, function(error) {
                    // promise rejected, could log the error with: console.log('error', error);
                    console.log('error', error);
                    growl.error('Error: Invalid User Parameters!', { ttl: 3000 });
                });
            } else {
                growl.error('Error: Invalid User Parameters!', { ttl: 3000 });
                $('#righttray ul').addClass("hide");
            }
        };

        $scope.isEmail = function(email) {
          var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          return regex.test(email);
        };

        $scope.regFail = function() {
            $scope.userreg = 'Registration failed, Username Already Exists!';
            $("#regfail").removeClass("hide");
            $timeout(function(){
                $("#regfail").addClass("hide");
            }, 5000);
        };

        $scope.regPass = function() {
            $scope.userreg = 'Registration succeeded, Log In to proceed!';
            $("#regfail").removeClass("hide");
            $timeout(function(){
                $("#regfail").addClass("hide");
            }, 5000);
        };

        $scope.fpwdFail = function() {
            $scope.userforgot = 'Password Recovery Failed, Please Try Again!';
            $("#forgotfail").removeClass("hide");
            $timeout(function(){
                $("#forgotfail").addClass("hide");
            }, 5000);
        };

        $scope.fpwdPass = function() {
            $scope.userforgot = 'Password Recovery succeeded, Check your Email!';
            $("#forgotfail").removeClass("hide");
            $timeout(function(){
                $("#forgotfail").addClass("hide");
            }, 5000);
        };

        $scope.userRegister = function() {
            console.log('userRegister clicked with '); 
            if(!$scope.isEmail($scope.remail)) {
                $("#aremail").addClass('redborder'); 
            } else if($scope.rpword != $scope.rrpword) {
                console.log('Please confirm your password!');
                $(".ppword").addClass('redborder'); 
            } else {
                console.log('Username: ' + $scope.rusername);       
                console.log('Email: ' + $scope.remail);       
                console.log('Password: ' + $scope.rpword); 
                ApiService.registerUser({
                    uname: $scope.rusername,
                    email: $scope.remail,
                    pword: $scope.rpword
                });
                // $scope.regFail();
                $scope.regPass();
            }      
        };

        $scope.userForgotPassword = function() {
            console.log('userForgotPassword clicked with '); 
            console.log('Username: ' + $scope.fpusername);       
            console.log('Email: ' + $scope.fpemail);    
            ApiService.forgotpwdUser({
                uname: $scope.fpusername,
                email: $scope.fpemail
            });
            // $scope.fpwdFail();
            $scope.fpwdPass();
        };

        $scope.checkTxts = function() {
            if($scope.rpword === $scope.rrpword) {
                $(".ppword").removeClass('redborder'); 
            } else{
                $(".ppword").addClass('redborder');
            }
        };

        $scope.checkEml = function() {
            if(!$scope.isEmail($scope.remail)) {
                $("#aremail").addClass('redborder'); 
            } else {
                $("#aremail").removeClass('redborder'); 
            }
        };

        $('#aremail').on('keyup',function(e){
            // console.log('Email is: ' + $scope.remail); 
            $scope.checkEml();
        });

        $('#arrpword').on('keyup',function(e){
            // console.log('Password 2: ' + $scope.rrpword); 
            $scope.checkTxts();
        });

        $('#arpword').on('keyup',function(e){
            // console.log('Password 1: ' + $scope.rpword); 
            $scope.checkTxts();
        });

        $scope.userForgot = function() {
            console.log('userForgot clicked with ');
        };

        $scope.loginUser = function(u, p) {
            // send the username and password to the DB to check if this user is registered
            return AuthService.postLoginForm({
                uname: u, 
                pwd: p
            });
        };

        $scope.signupUser = function(u, p) {
            // send the username and password to the DB to check if this user is registered
            return AuthService.postLoginForm({
                uname: u, 
                pwd: p
            });
        };

        $scope.disabletray();          
    }
})();
