(function() {
	'use strict';

	angular
        .module('ssceexamsuiApp')
		.factory('TimerService', TimerService);

		// TimerService.$inject = ['window'];

		/* @ngInject */
		function TimerService(window) {

			return {
				getTime: getTime,
				gettimeLeft: gettimeLeft,
				getTL: getTL,
				getTimeSets: getTimeSets,
				getResult: getResult
			};

			function getTL(oldtime, totaltime) {
				console.log('inside getTL()');
				//return '' + (Math.floor(timepast/1000)%60) + '-' + (Math.floor(timepast/(60*1000))%60) + '-' + (Math.floor(timepast/(60*60*1000))%24) + '';
				return ((totaltime*60*1000) - (new Date().getTime() - oldtime));
			};

			function getResult(timepast) {
				var secss = Math.floor(timepast/1000)%60;
	            var minss = Math.floor(timepast/(60*1000))%60;
	            var hrss = Math.floor(timepast/(60*60*1000))%24;
	            // console.log('secss is: ' + secss);
	            // console.log('minss is: ' + minss);
	            // console.log('hrss is: ' + hrss);

	            return hrss + ' hrs ' + minss + ' mins ' + secss + ' secs';
			};

			function getTime(oldtime, totaltime) {
				console.log('getTime is called.');	
				// console.log('totaltime is: ' + totaltime);
				var timegone = new Date().getTime() - oldtime;
				var timeleft = (totaltime*60*1000) - timegone;
				var pctgone = (100*(timegone/(timegone + timeleft))).toFixed();

				// console.log('timegone is: ' + getResult(timegone));
				// console.log('timeleft is: ' + getResult(timeleft));
				// console.log('pctgone is: ' + pctgone + '%');

	            return [getResult(timegone), getResult(timeleft), pctgone];
			};

			function gettimeLeft() {
				if(window.sessionStorage.tmlft) {
					console.log('TimerService says: ' + window.sessionStorage.tmlft);
					return getTime(0, window.sessionStorage.tmlft);
				} else {
					console.log('TimerService says: 0');
					return '0';
				}				
			};

			function getTimeSets() {
				return [((5 * 60 * 1000) - window.sessionStorage.tmlft), window.sessionStorage.tmlft];
			};
		}
})();
