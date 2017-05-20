(function() {
	'use strict';

	angular
        .module('ssceexamsuiApp')
		.factory('SaveexamService', SaveexamService);

		// SaveexamService.$inject = ['window'];

		/* @ngInject */
		function SaveexamService(window) {

			return {
				saveExam: saveExam,
				getToken: getToken,
				setToken: setToken
			};

			function saveExam(val) {	
				console.log("val.exmid + val.examyear is: " + val.exmid + ", " + val.examyear);	
				if(val.exmid == 'phy_B') {
					if(val.examyear=='1988') {
						window.localStorage.svdPhyB1988 = val.tmlft + '-' + val.exmid + '-' + val.examyear+ '-' + val.dt + val.qArry;
            			window.sessionStorage.svdPhyB1988 = val.tmlft + '-' + val.exmid + '-' + val.examyear+ '-' + val.dt + val.qArry;
					} else if(val.examyear=='1989') {
						window.localStorage.svdPhyB1989 = val.tmlft + '-' + val.exmid + '-' + val.examyear+ '-' + val.dt + val.qArry;
            			window.sessionStorage.svdPhyB1989 = val.tmlft + '-' + val.exmid + '-' + val.examyear+ '-' + val.dt + val.qArry;
					} else if(val.examyear=='1990') {
						window.localStorage.svdPhyB1990 = val.tmlft + '-' + val.exmid + '-' + val.examyear+ '-' + val.dt + val.qArry;
            			window.sessionStorage.svdPhyB1990 = val.tmlft + '-' + val.exmid + '-' + val.examyear+ '-' + val.dt + val.qArry;
					}
				}
            };

			function getToken() {
				if(window.sessionStorage.act) {
					return window.sessionStorage.act;
				} else {
					return '';
				}
			};

			function setToken(val) {
				window.sessionStorage.act = val;
			};		
		}
})();

// })();
