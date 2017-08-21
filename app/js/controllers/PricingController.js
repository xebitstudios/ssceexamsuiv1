(function() {
    'use strict';

    angular
        .module('ssceexamsuiApp')
        .controller('PricingController', PricingController);

    // PricingController.$inject = ['$scope', '$log', '$controller', '$rootScope', 'ConfigService', 'ApiService', 'growl', '$location', '$timeout', 'HeaderService'];

    /* @ngInject */
    function PricingController($scope, $log, $controller, $rootScope, ConfigService, ApiService, growl, $location, $timeout, HeaderService) {

        $controller('BaseController', {$scope: $scope});
        $rootScope.baseRoute = '';
        var baseRoute = '';

        $scope.inTestcenter = function() {
            console.log('Now in the Pricing page!');
        };

        $scope.inTestcenter();

        $timeout(function(){
           HeaderService.setTab(5);
        }, 100);

        $scope.gotoExam = function(subj, url) {
            $rootScope.currentSubject = subj;
            console.log('Sscetemplate link for ' + subj + ' clicked!');
            console.log('baseRoute + url is: ' + baseRoute + url);
            $location.path(baseRoute + url);
        };

        $scope.pricehref = function(val) {
            $log.info('User subscription clicked: ' + val);
            $location.path(baseRoute + '/signup');
        };

        $scope.modaltxt = {
            free: {
                txt: 'Already Free!',
                perks: 'Offers 3 Examinations years from 1988 to 1990',
                note: 'Free after Joining SSCEexams',
                clr: 'ccc'
            },
            standard: {
                txt: 'Confirm Standard Upgrade',
                perks: 'Offers 12 Examinations years from 1988 to 1999',
                note: 'CODE is STANDARD1',
                clr: '2ab27b'
            },
            premium: {
                txt: 'Confirm Premium Upgrade',
                perks: 'Offers All 28 Examinations years from 1988 to 2015',
                note: 'CODE is PREMIUM2',
                clr: 'f6b63f'
            },
            school: {
                txt: 'Request School Upgrade',
                perks: 'Offers Examinations years based on school subscription',
                note: 'Please contact your School administartor for the School issued CODE',
                clr: '5D6D7E'
            },
            inst: 'Check your email for payment instructions within the next 24 hours.'
        };

        $scope.themodal = {
            modalShown: false
        };

        $scope.toggleModal = function(val) {
            console.log('$scope.toggleModal called, val is: ' + val);
            if(val == 'standardprice') {
                $scope.mtxt = $scope.modaltxt.standard;
            } else if(val == 'premiumprice') {
                $scope.mtxt = $scope.modaltxt.premium;
            } else if(val == 'schoolprice') {
                $scope.mtxt = $scope.modaltxt.school;
            } else {
                $scope.mtxt = $scope.modaltxt.free;
            }
            $scope.themodal.modalShown = !$scope.themodal.modalShown;
            // $scope.logscope();
        };

        $scope.confirmUpgrade = function(val) {
            if(val !== 'Already Free!'){
                console.log('Upgrade Selected is: ' + val);
                ApiService.confirmUpgrade($rootScope.userid, val);
            }
        };

        $scope.examsubjects = [
          {
            name: 'Free',
            btnval: 'Free at Sign up',
            href: 'freeprice',
            price: 'N0',
            btncolor: "btn-free",
            notes: 'Practice a limited number of real examinations questions covering any 6 subjects over 2 years, view your study progress and see analytics to showing how well you are progressing in your preparations.',
            side: 'Free for students as part of the SSCE examinations Student Preparatory Pack program',
            icn: 'fa fa-users fa-lg'
          },
          {
            name: 'Standard',
            btnval: 'Upgrade to standard',
            href: 'standardprice',
            price: 'N1000',
            btncolor: "btn-standard",
            notes: 'Practice real examinations questions spanning a period of 10 years over all 13 major subjects, view your study progress and see comprehensive analytics showing how well you are progressing in preparations.',
            side: 'This package allows you access to standard student metrics generator and a basic analytics dashboard',
            icn: 'fa fa-bar-chart fa-lg'
          },
          {
            name: 'Premium',
            btnval: 'Upgrade to premium',
            href: 'premiumprice',
            price: 'N2500',
            btncolor: "btn-premium",
            notes: 'Practice real examinations questions spanning a period of 28 years over all 13 major subjects, view your study progress, see and generate comprehensive analytics and progress reports showing how well you are progressing.',
            side: 'This package includes the metrics generator and a comprehensive, 360 degree analytics dashboard',
            icn: 'fa fa-tachometer fa-lg'
          },
          {
            name: 'School',
            btnval: 'Start a free School trial',
            href: 'schoolprice',
            price: 'N500',
            btncolor: "btn-school",
            notes: 'As a member of your school subscription, you can practice all available 28 years of real examinations over all 13 major subjects. View your progress reports and allow your instructors see how well you are preparing and which areas you might need some extra help.',
            side: 'Sold to School organizations in packs of 50 student seats and billed annually',
            icn: 'fa fa-graduation-cap fa-lg'
          }
        ];
    }

     
})();
