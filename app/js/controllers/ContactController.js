(function() {
      'use strict';

      angular
        .module('ssceexamsuiApp')
        .controller('ContactController', ContactController);

      // ContactController.$inject = ['$scope', '$log', '$controller', '$rootScope', 'ConfigService', 'ApiService', 'growl', '$location', '$timeout', 'HeaderService'];

      /* @ngInject */
      function ContactController($scope, $log, $controller, $rootScope, ConfigService, ApiService, growl, $location, $timeout, HeaderService, LoggingService) {

            $controller('BaseController', {$scope: $scope});
            $rootScope.baseRoute = '';
            var baseRoute = '';
            $scope.logEvent = function() {
                  LoggingService.postTrack('{cntct,' + $scope.userid + ',' + new Date().getTime() + '}');
            };

            $scope.inContactUs = function() {
                  console.log('Now in the Contact Us page!');
                  $scope.logEvent();
            };

            $scope.inContactUs();

            $scope.sendForm = function() {
                  $log.info('Sending form details to server');
                  var msg = {
                        fname: $('#fname').val(),
                        lname: $('#lname').val(),
                        email: $('#email').val(),
                        phone: $('#phone').val(),
                        cname: $('#cname').val(),
                        country: $('#country').val(),
                        jtitle: $('#jtitle').val(),
                        note: $('#note').val()
                  };
                  console.log('msg is: ');
                  console.log(msg);
                  $scope.sendContactInfo(msg);
            };

            $scope.clearForm = function() {
                  $('#fname').val('');
                  $('#lname').val('');
                  $('#email').val('');
                  $('#phone').val('');
                  $('#cname').val('');
                  $('#country>option:eq(0)').prop('selected', true);
                  $('#jtitle').val('');
                  $('#note').val('');            
            };

            $timeout(function(){
                 HeaderService.setTab(4);
            }, 100);

            $scope.sendContactInfo = function(msg) {
                  ApiService.sendContactInfo(msg)
                        .then(function(response) {
                                console.log('Sending the contact us form details: ');
                                console.log(response);
                                console.log(response.data);
                                if(response.data) {
                                    console.log('call successful.');
                                    growl.info('Form submitted succesfully, we will contact you soon. Thanks.', { ttl: 3000 });
                                    $scope.clearForm();
                                }
                            }, function(error) {
                                console.log('error', error);
                                growl.error('Error: Form submission failed!', { ttl: 3000 });
                            }
                        );
            };
      };     
})();
