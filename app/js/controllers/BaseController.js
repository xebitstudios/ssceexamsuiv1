(function() {
	'use strict';

	angular
        .module('ssceexamsuiApp')
		.controller('BaseController', BaseController);

	// BaseController.$inject = ['$scope', '$timeout'];//, '$rootScope', 'ConfigService', 'window', $location];

	/* @ngInject */
	function BaseController($scope, $timeout, window, $location, $rootScope, TimerService) {
		// , ConfigService) {
        // if(!window.act) {
        //     $location.path('/');
        // }
        $rootScope.theAPI = 'http://192.168.1.144:8066';

		//ConfigService.setUrl('dev'); // sets the appropriate URL depending on the environment, dev, qa, or prod
		// ConfigService.setUserId();

	    // console.log('user is: ' + $rootScope.userId);
      $rootScope.userid = '12345';
	    
	    $scope.navbtns = [
            {
                title: 'First',
                icon: 'fa fa-fast-backward fa-1'
            },
            {
                title: 'Previous',
                icon: 'fa fa-step-backward fa-1'
            },
            {
                title: 'Next',
                icon: 'fa fa-step-forward fa-1'
            },
            {
                title: 'Last',
                icon: 'fa fa-fast-forward fa-1'
            },
            {
                title: 'Start',
                icon: 'fa fa-hourglass-start fa-1'
            },
            {
                title: 'Pause',
                icon: 'fa fa-pause fa-1'
            },
            {
                title: 'Continue',
                icon: 'fa fa-arrow-right fa-1'
            },
            {
                title: 'Save',
                icon: 'fa fa-cloud fa-1'
            },
            {
                title: 'Finish',
                icon: 'fa fa-stop fa-1'
            },
            {
                title: 'Test Center',
                icon: 'fa fa-gg fa-1'
            }
        ];

        $scope.countrylist = [
                  { ctry: "default", name: "Nigeria" },   
                  { ctry: "Afghanistan", name: "Afghanistan" },           
                  { ctry: "Albania", name: "Albania" },           
                  { ctry: "Algeria", name: "Algeria" },           
                  { ctry: "Andorra", name: "Andorra" },           
                  { ctry: "Angola", name: "Angola" },
                  { ctry: "Antigua", name: "Antigua" },
                  { ctry: "Argentina", name: "Argentina" },
                  { ctry: "Armenia", name: "Armenia" },
                  { ctry: "Australia", name: "Australia" },
                  { ctry: "Austria", name: "Austria" },
                  { ctry: "Azerbaijan", name: "Azerbaijan" },
                  { ctry: "Bahamas", name: "Bahamas" },
                  { ctry: "Bahrain", name: "Bahrain" },
                  { ctry: "Bangladesh", name: "Bangladesh" },
                  { ctry: "Barbados", name: "Barbados" },
                  { ctry: "Belarus", name: "Belarus" },
                  { ctry: "Belgium", name: "Belgium" },
                  { ctry: "Belize", name: "Belize" },
                  { ctry: "Benin", name: "Benin" },
                  { ctry: "Bhutan", name: "Bhutan" },
                  { ctry: "Bolivia", name: "Bolivia" },
                  { ctry: "Bosnia Herzegovina", name: "Bosnia Herzegovina" },
                  { ctry: "Botswana", name: "Botswana" },
                  { ctry: "Brazil", name: "Brazil" },
                  { ctry: "Brunei", name: "Brunei" },
                  { ctry: "Bulgaria", name: "Bulgaria" },
                  { ctry: "Burkina", name: "Burkina" },
                  { ctry: "Burundi", name: "Burundi" },
                  { ctry: "Cambodia", name: "Cambodia" },
                  { ctry: "Cameroon", name: "Cameroon" },
                  { ctry: "Canada", name: "Canada" },
                  { ctry: "Cape Verde", name: "Cape Verde" },
                  { ctry: "Central African Rep", name: "Central African Rep" },
                  { ctry: "Chad", name: "Chad" },
                  { ctry: "Chile", name: "Chile" },
                  { ctry: "China", name: "China" },
                  { ctry: "Colombia", name: "Colombia" },
                  { ctry: "Comoros", name: "Comoros" },
                  { ctry: "Congo", name: "Congo" },
                  { ctry: "Congo (Democratic Rep)", name: "Congo (Democratic Rep)" },
                  { ctry: "Costa Rica", name: "Costa Rica" },
                  { ctry: "Croatia", name: "Croatia" },
                  { ctry: "Cuba", name: "Cuba" },
                  { ctry: "Cyprus", name: "Cyprus" },
                  { ctry: "Czech Republic", name: "Czech Republic" },
                  { ctry: "Denmark", name: "Denmark" },
                  { ctry: "Djibouti", name: "Djibouti" },
                  { ctry: "Dominica", name: "Dominica" },
                  { ctry: "Dominican Republic", name: "Dominican Republic" },
                  { ctry: "East Timor", name: "East Timor" },
                  { ctry: "Ecuador", name: "Ecuador" },
                  { ctry: "Egypt", name: "Egypt" },
                  { ctry: "El Salvador", name: "El Salvador" },
                  { ctry: "Equatorial Guinea", name: "Equatorial Guinea" },
                  { ctry: "Eritrea", name: "Eritrea" },
                  { ctry: "Estonia", name: "Estonia" },
                  { ctry: "Ethiopia", name: "Ethiopia" },
                  { ctry: "Fiji", name: "Fiji" },
                  { ctry: "Finland", name: "Finland" },
                  { ctry: "France", name: "France" },
                  { ctry: "Gabon", name: "Gabon" },
                  { ctry: "Gambia", name: "Gambia" },
                  { ctry: "Georgia", name: "Georgia" },
                  { ctry: "Germany", name: "Germany" },
                  { ctry: "Ghana", name: "Ghana" },
                  { ctry: "Greece", name: "Greece" },
                  { ctry: "Grenada", name: "Grenada" },
                  { ctry: "Guatemala", name: "Guatemala" },
                  { ctry: "Guinea", name: "Guinea" },
                  { ctry: "Guinea-Bissau", name: "Guinea-Bissau" },
                  { ctry: "Guyana", name: "Guyana" },
                  { ctry: "Haiti", name: "Haiti" },
                  { ctry: "Honduras", name: "Honduras" },
                  { ctry: "Hungary", name: "Hungary" },
                  { ctry: "Iceland", name: "Iceland" },
                  { ctry: "India", name: "India" },
                  { ctry: "Indonesia", name: "Indonesia" },
                  { ctry: "Iran", name: "Iran" },
                  { ctry: "Iraq", name: "Iraq" },
                  { ctry: "Ireland (Republic)", name: "Ireland (Republic)" },
                  { ctry: "Israel", name: "Israel" },
                  { ctry: "Italy", name: "Italy" },
                  { ctry: "Ivory Coast", name: "Ivory Coast" },
                  { ctry: "Jamaica", name: "Jamaica" },
                  { ctry: "Japan", name: "Japan" },
                  { ctry: "Jordan", name: "Jordan" },
                  { ctry: "Kazakhstan", name: "Kazakhstan" },
                  { ctry: "Kenya", name: "Kenya" },
                  { ctry: "Kiribati", name: "Kiribati" },
                  { ctry: "Korea North", name: "Korea North" },
                  { ctry: "Korea South", name: "Korea South" },
                  { ctry: "Kosovo", name: "Kosovo" },
                  { ctry: "Kuwait", name: "Kuwait" },
                  { ctry: "Kyrgyzstan", name: "Kyrgyzstan" },
                  { ctry: "Laos", name: "Laos" },
                  { ctry: "Latvia", name: "Latvia" },
                  { ctry: "Lebanon", name: "Lebanon" },
                  { ctry: "Lesotho", name: "Lesotho" },
                  { ctry: "Liberia", name: "Liberia" },
                  { ctry: "Libya", name: "Libya" },
                  { ctry: "Liechtenstein", name: "Liechtenstein" },
                  { ctry: "Lithuania", name: "Lithuania" },
                  { ctry: "Luxembourg", name: "Luxembourg" },
                  { ctry: "Macedonia", name: "Macedonia" },
                  { ctry: "Madagascar", name: "Madagascar" },
                  { ctry: "Malawi", name: "Malawi" },
                  { ctry: "Malaysia", name: "Malaysia" },
                  { ctry: "Maldives", name: "Maldives" },
                  { ctry: "Mali", name: "Mali" },
                  { ctry: "Malta", name: "Malta" },
                  { ctry: "Marshall Islands", name: "Marshall Islands" },
                  { ctry: "Mauritania", name: "Mauritania" },
                  { ctry: "Mauritius", name: "Mauritius" },
                  { ctry: "Mexico", name: "Mexico" },
                  { ctry: "Micronesia", name: "Micronesia" },
                  { ctry: "Moldova", name: "Moldova" },
                  { ctry: "Monaco", name: "Monaco" },
                  { ctry: "Mongolia", name: "Mongolia" },
                  { ctry: "Montenegro", name: "Montenegro" },
                  { ctry: "Morocco", name: "Morocco" },
                  { ctry: "Mozambique", name: "Mozambique" },
                  { ctry: "Myanmar (Burma)", name: "Myanmar (Burma)" },
                  { ctry: "Namibia", name: "Namibia" },
                  { ctry: "Nauru", name: "Nauru" },
                  { ctry: "Nepal", name: "Nepal" },
                  { ctry: "Netherlands", name: "Netherlands" },
                  { ctry: "New Zealand", name: "New Zealand" },
                  { ctry: "Nicaragua", name: "Nicaragua" },
                  { ctry: "Niger", name: "Niger" },
                  { ctry: "Nigeria", name: "Nigeria" },
                  { ctry: "Norway", name: "Norway" },
                  { ctry: "Oman", name: "Oman" },
                  { ctry: "Pakistan", name: "Pakistan" },
                  { ctry: "Palau", name: "Palau" },
                  { ctry: "Panama", name: "Panama" },
                  { ctry: "Papua New Guinea", name: "Papua New Guinea" },
                  { ctry: "Paraguay", name: "Paraguay" },
                  { ctry: "Peru", name: "Peru" },
                  { ctry: "Philippines", name: "Philippines" },
                  { ctry: "Poland", name: "Poland" },
                  { ctry: "Portugal", name: "Portugal" },
                  { ctry: "Qatar", name: "Qatar" },
                  { ctry: "Romania", name: "Romania" },
                  { ctry: "Russian Federation", name: "Russian Federation" },
                  { ctry: "Rwanda", name: "Rwanda" },
                  { ctry: "St Kitts &amp; Nevis", name: "St Kitts &amp; Nevis" },
                  { ctry: "St Lucia", name: "St Lucia" },
                  { ctry: "Saint Vincent &amp; the Grenadines", name: "Saint Vincent &amp; the Grenadines" },
                  { ctry: "Samoa", name: "Samoa" },
                  { ctry: "San Marino", name: "San Marino" },
                  { ctry: "Sao Tome &amp; Principe", name: "Sao Tome &amp; Principe" },
                  { ctry: "Saudi Arabia", name: "Saudi Arabia" },
                  { ctry: "Senegal", name: "Senegal" },
                  { ctry: "Serbia", name: "Serbia" },
                  { ctry: "Seychelles", name: "Seychelles" },
                  { ctry: "Sierra Leone", name: "Sierra Leone" },
                  { ctry: "Singapore", name: "Singapore" },
                  { ctry: "Slovakia", name: "Slovakia" },
                  { ctry: "Slovenia", name: "Slovenia" },
                  { ctry: "Solomon Islands", name: "Solomon Islands" },
                  { ctry: "Somalia", name: "Somalia" },
                  { ctry: "South Africa", name: "South Africa" },
                  { ctry: "South Sudan", name: "South Sudan" },
                  { ctry: "Spain", name: "Spain" },
                  { ctry: "Sri Lanka", name: "Sri Lanka" },
                  { ctry: "Sudan", name: "Sudan" },
                  { ctry: "Suriname", name: "Suriname" },
                  { ctry: "Swaziland", name: "Swaziland" },
                  { ctry: "Sweden", name: "Sweden" },
                  { ctry: "Switzerland", name: "Switzerland" },
                  { ctry: "Syria", name: "Syria" },
                  { ctry: "Taiwan", name: "Taiwan" },
                  { ctry: "Tajikistan", name: "Tajikistan" },
                  { ctry: "Tanzania", name: "Tanzania" },
                  { ctry: "Thailand", name: "Thailand" },
                  { ctry: "Togo", name: "Togo" },
                  { ctry: "Tonga", name: "Tonga" },
                  { ctry: "Trinidad &amp; Tobago", name: "Trinidad &amp; Tobago" },
                  { ctry: "Tunisia", name: "Tunisia" },
                  { ctry: "Turkey", name: "Turkey" },
                  { ctry: "Turkmenistan", name: "Turkmenistan" },
                  { ctry: "Tuvalu", name: "Tuvalu" },
                  { ctry: "Uganda", name: "Uganda" },
                  { ctry: "Ukraine", name: "Ukraine" },
                  { ctry: "United Arab Emirates", name: "United Arab Emirates" },
                  { ctry: "United Kingdom", name: "United Kingdom" },
                  { ctry: "United States", name: "United States" },
                  { ctry: "Uruguay", name: "Uruguay" },
                  { ctry: "Uzbekistan", name: "Uzbekistan" },
                  { ctry: "Vanuatu", name: "Vanuatu" },
                  { ctry: "Vatican City", name: "Vatican City" },
                  { ctry: "Venezuela", name: "Venezuela" },
                  { ctry: "Vietnam", name: "Vietnam" },
                  { ctry: "Yemen", name: "Yemen" },
                  { ctry: "Zambia", name: "Zambia" },
                  { ctry: "Zimbabwe", name: "Zimbabwe" }
            ];

        $scope.setScores = function(val, subj) {
            console.log('subj is: ' + subj);
            // if(window.sessionStorage.econB) {
            //     console.log('window.sessionStorage.econB is: ' + window.sessionStorage.econB);
            //     var old = window.sessionStorage.econB;
            //     window.sessionStorage.econB = old + "," + val;

            //     if ((window.sessionStorage.econB.split('}{')).length > 4) {
            //         console.log("Sending this to the external Tracking Data Ingestor service = " + (window.sessionStorage.econB.split('}{')).length + ".");
            //         ingestLogs(window.sessionStorage.econB);
            //         window.sessionStorage.econB = "x";
            //     }
            // } else {
            //     window.sessionStorage.econB = val;
            // }
        };

        $scope.btnclick = function(val) {
            //console.log('btn clicked is: ' + $scope.btnsList[val]);
            console.log('You clicked: ' + $scope.btnsList[val]);
            if($scope.btnsList[val]=='Next'){
                $scope.getNext();
            } else if($scope.btnsList[val]=='Previous'){
                $scope.getPrev();
            } else if($scope.btnsList[val]=='First'){
                $scope.getFirst();
            } else if($scope.btnsList[val]=='Last'){
                $scope.getLast();
            } else if($scope.btnsList[val]=='Pause'){
                $scope.lefttime = TimerService.getTime($scope.oldtime, $scope.totaltimemins)[1];
                console.log('$scope.lefttime is: ' + $scope.lefttime);
                console.log('Pause time is: ');
                $scope.oldtime = new Date().getTime();
                $scope.timerStopped = true;
            } else if($scope.btnsList[val]=='Continue'){
                $scope.timerStopped = false; // unfreeze the Timer
                $scope.timegone = TimerService.gettime(0, window.sessionStorage.tmlft)[0];
                $scope.timeleft = TimerService.gettime(0, window.sessionStorage.tmlft)[1];
                $scope.pctgone = TimerService.gettime(0, window.sessionStorage.tmlft)[2];
                // $scope.timeleft = TimerService.getResult(TimerService.getTimeSets()[1]);                
                console.log('$scope.timegone is: ' + $scope.timegone);
                console.log('$scope.timeleft is: ' + $scope.timeleft);
                console.log('$scope.pctgone is: ' + $scope.pctgone);
                $scope.oldtime = 0;
            } else if($scope.btnsList[val]=='Save'){
                $scope.getSave();
            } else if($scope.btnsList[val]=='Test Center'){
                $location.path($scope.baseRoute + '/testcenter');
            } else if($scope.btnsList[val]=='Finish') {
                $scope.timerStopped = true; // freeze the Timer from counting before showing the Finish modal
                $scope.toggleModal(1);
            }
            // 
            if(!$scope.timerStopped) {
                $scope.timegoneleft = TimerService.getTime($scope.oldtime, $scope.totaltimemins);
                $scope.timegone = $scope.timegoneleft[0];
                $scope.timeleft = $scope.timegoneleft[1];
                $scope.pctused = ($scope.timegoneleft[2] > 100 ? 100 : $scope.timegoneleft[2]);
            }
        };

	    $scope.aval = 'yes';
	    
	    $scope.getDate = function() {
	        var dte = Date();
	        return dte;
	    };

		$scope.footable = function() {
			$('.footable').footable();
		};

		$scope.footable();

		$timeout(function() {
			$('.footable').trigger('footable_redraw');
			if(window.sessionStorage.act) {
		    	$('#logouttab').removeClass('hide');
		    	$('#logintab').addClass('hide');
		    } else {
		    	$location.path("/");
		    	$('#logintab').removeClass('hide');
		    	$('#logouttab').addClass('hide');
		    }
		}, 50);
        
	}
})();
