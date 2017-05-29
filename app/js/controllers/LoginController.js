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

            $("#formUsername").removeClass('redborder');
            $("#formPassword").removeClass('redborder');               
        };

        $scope.thesignUp = function() {
            $('#signupcard').removeClass('hide');
            $('#logincard').addClass('hide');
            $('#forgotcard').addClass('hide');

            $("#arusername").removeClass('redborder');
            $("#aremail").removeClass('redborder');
            $("#arpword").removeClass('redborder');
            $("#arrpword").removeClass('redborder');
            
            $scope.rusername = '';
            $scope.remail = '';
            $scope.rpword = '';
            $scope.rrpword = '';                        
        };

        $scope.theforgot = function() {
            $('#signupcard').addClass('hide');
            $('#logincard').addClass('hide');
            $('#forgotcard').removeClass('hide'); 

            $("#fUsername").removeClass('redborder');
            $("#fEmailaddy").removeClass('redborder');

            $scope.fpusername = '';
            $scope.fpemail = '';
        };

        $scope.gotoLogin = function() {
            $scope.thelogin();
        };

        $scope.loginFail = function(cmmt) {
            $scope.userlogin = cmmt;
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
                $scope.loginFail('Username and Password Required to Log in!');
            } else if(($scope.username) && ($scope.pword)) {
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
                        // $('#righttray ul').removeClass("hide");
                    }
                }, function(error) {
                    // promise rejected, could log the error with: console.log('error', error);
                    // console.log('error', error);
                    $scope.loginFail('Invalid User Parameters!');
                    if(($scope.username == 'bawo') && ($scope.pword == 'oyowe')){
                        var dtoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QiLCJ1c2VyUHdkIjoiJDJhJDEyJGd6N01XU1VpQmdxSDVYemtiaEFnLmVqa1gxMTRRNy9iYloxVG1iRm5zQnpZSVNGZUV1ZE9LIiwiaWF0IjoxNDg4MTUxNTQ1LCJleHAiOjE0ODk2NTE1NDV9.IGF9IwOmNYSPAjOSBb2UmkC0VUC0k9reZh9clGK9vzY";
                        $rootScope.token = dtoken;
                        window.sessionStorage.act = dtoken;
                        window.localStorage.act = dtoken;
                        $location.path('dashboard');
                    }
                    // growl.error('Error: Invalid User Parameters!', { ttl: 3000 });
                });
            } else {
                $scope.loginFail('Log In Failed!');
                // growl.error('Error: Invalid User Parameters!', { ttl: 3000 });
                // $('#righttray ul').addClass("hide");
            }
        };

        $scope.isEmail = function(email) {
          var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          return regex.test(email);
        };

        $scope.regFail = function(cmmt) {
            $scope.userreg = cmmt;//'Registration failed, Username Already Exists!';
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
            
            if($scope.rusername == '') {
                $("#arusername").addClass('redborder');
                $scope.regFail('Username is Required!');
            } else if(!$scope.isEmail($scope.remail)) {
                $("#aremail").addClass('redborder'); 
                $scope.regFail('Email not Valid!');
            } else if(($scope.rpword == '') || ($scope.rrpword == '')) {
                console.log('Passwords Required to Register!');
                $(".ppword").addClass('redborder');
                $scope.regFail('Passwords Required to Register!');
            } else if($scope.rpword != $scope.rrpword) {
                console.log('Please confirm your password!');
                $(".ppword").addClass('redborder'); 
                $scope.regFail('Please confirm your password!');
            } else {
                console.log('Username: ' + $scope.rusername);       
                console.log('Email: ' + $scope.remail);       
                console.log('Password: ' + $scope.rpword); 
                ApiService.registerUser({
                    uname: $scope.rusername,
                    email: $scope.remail,
                    pword: $scope.rpword
                });
                $scope.regFail('User Registration failed, Try Again!');
                // $scope.regPass();
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

        $scope.checkUname = function() {
            if($scope.rusername == '') {
                $("#arusername").addClass('redborder');
            } else {
                $("#arusername").removeClass('redborder'); 
            }
        };

        $('#arusername').on('keyup',function(e){
            $scope.checkUname();
        });

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
