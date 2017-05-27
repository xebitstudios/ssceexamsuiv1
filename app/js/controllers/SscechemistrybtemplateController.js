(function() {
    'use strict';

    angular
        .module('ssceexamsuiApp')
        .controller('SscechemistrybtemplateController', SscechemistrybtemplateController);

    // SscechemistrybtemplateController.$inject = ['$scope', '$log', '$location', '$controller', '$rootScope', 'ConfigService', 'HeaderService', 'ApiService', 'TimerService', 'growl', '$timeout'];

    /* @ngInject */
    function SscechemistrybtemplateController($scope, $log, $location, $controller, $rootScope, ConfigService, HeaderService, ApiService, TimerService, growl, $timeout, LoggingService) {

        $controller('BaseController', {$scope: $scope});
        $rootScope.baseRoute = '';
        var baseRoute = '';
        $scope.exmid = 'chem_B';

        $scope.logEvent = function() {
            LoggingService.postTrack('{' + $scope.exmid + ',' + $scope.userid + ',' + $scope.examyear + ',' + $scope.qqt.Qval + ',' + new Date().getTime() + '}');
        };

        $scope.intab = function() {
            console.log('Now in the SSCE Chemistry_B Template page!');
        };

        $scope.intab();

        $timeout(function(){
           HeaderService.setTab(1);
        }, 100);

        $scope.pctused = 0;
        $scope.totaltimemins = 20;
        $scope.timegone = '0 hrs 0 mins 0 secs';
        $scope.timeleft = ' hrs 20 mins 0 secs';
        $scope.activeNav = 'Start';
        $scope.oldtime = 0;
        $scope.lefttime = 0;
        $scope.examyear = $rootScope.chemistry_selected_year;
        $scope.movedTime = false;

        $scope.themodal = {
            modalShown: false
        };
        $scope.passed = 0;
        $scope.wrong = 0;
        $scope.skipped = 0;

        $scope.toggleModal = function(val) {
            console.log('$scope.toggleModal called.');
            (val == 1) ? ($scope.themodal.modalShown = !$scope.themodal.modalShown) : (console.log('modal not selected!'));
            $scope.logscope();
        };

        $scope.logscope = function() {
            console.log('$scope.qtt is: ');
            console.log($scope.qtt);
        };

        $scope.gotoTC = function() {
            $scope.themodal.modalShown = false;
            $location.path(baseRoute + 'testcenter');
        };

        $scope.qstlength = function() {
            return _.keys($scope.qtt).length;
        };

        $scope.getpassed = function() {
            $scope.passed = 0;
            $scope.wrong = 0;
            $scope.skipped = 0;
            for(var i=0;i<_.keys($scope.qtt).length;i++) {
                if(_.values($scope.qtt)[i].sel == "") {
                    $scope.skipped = $scope.skipped + 1;
                } else if(_.values($scope.qtt)[i].ans == _.values($scope.qtt)[i].sel) {
                    $scope.passed = $scope.passed + 1;
                } else {
                    $scope.wrong = $scope.wrong + 1;
                }
            }
            return $scope.passed;
        };

        $scope.getpctscore = function() {
            return (($scope.passed/($scope.passed + $scope.wrong)) * 100).toFixed(2);
        };

        $scope.moveTime = function() {
            // $interval(function () {
            // $scope.updateTime();
            // }, 2000);
        };

        $scope.updateTime = function() {
            $scope.timegoneleft = TimerService.getTime($scope.oldtime, $scope.totaltimemins);
            $scope.timegone = $scope.timegoneleft[0];
            $scope.timeleft = $scope.timegoneleft[1];
            $scope.pctused = ($scope.timegoneleft[2] > 100 ? 100 : $scope.timegoneleft[2]);
            if(!$scope.movedTime) { 
                console.log('tick tock begins...');
                $scope.moveTime();
                $scope.movedTime = !$scope.movedTime;
            }
        };

        $scope.getStartTime = function() {
            $scope.oldtime = new Date().getTime();
            console.log('start time is: ' + $scope.oldtime);
        };

        $scope.getStartTime();

        $scope.currentqst = 1;

        $scope.btnsList = _.pluck(_.values($scope.navbtns), 'title');
        
        $scope.qtt = {};

        $scope.qqt = {
            "Qval": 1,
            "Q": {
                "qs": "1. Which of the units of the following physical quantities are derived? I. Area II. Thrust III. Pressure IV. Mass ",
                "opts": {
                    "q0": "A. I, II, III and IV",
                    "q1": "B. I, II and III only",
                    "q2": "C. I, II and IV only",
                    "q3": "D. I, and III only",
                    "q4": "E. I and IV only"
                },
                "ans": "B"
            }
        };

        $scope.getNum = function() {
            return $scope.qqt.Qval;
        };

        $scope.setNum = function(val) {
            $scope.qqt.Qval = val;
        };

        $scope.clearImg = function() {
            $scope.qqt.Q.img = "";
        };

        $scope.getNext = function() {
            if($scope.getNum() == 50) {
                $scope.toggleModal(1);
            } else {
                $scope.logscope();
                $scope.clearOptions($scope.getNum());
                if((_.keys($scope.qtt).length > $scope.qqt.Qval)) {
                    $scope.qqt.Qval = (parseInt($scope.qqt.Qval) + 1);
                    $scope.qqt.Q = _.values($scope.qtt)[$scope.qqt.Qval - 1];
                    if(!$scope.qqt.Q.img) {
                        $scope.clearImg();
                    };
                    $scope.checkSel($scope.qqt.Q);
                }
            }
            $scope.logEvent();
        };

        $scope.getPrev = function() {
            $scope.logscope();
            $scope.clearOptions($scope.getNum());
            if(($scope.qqt.Qval > 1)) {
                $scope.qqt.Qval = (parseInt($scope.qqt.Qval) - 1);
                $scope.qqt.Q = _.values($scope.qtt)[$scope.qqt.Qval - 1];
                if(!$scope.qqt.Q.img) {
                    $scope.clearImg();
                };
                $scope.checkSel($scope.qqt.Q);
            }
        };

        $scope.getFirst = function() {
            $scope.logscope();
            $scope.clearOptions($scope.getNum());
            $scope.qqt.Qval = 1;
            $scope.qqt.Q = _.values($scope.qtt)[0];
            if(!$scope.qqt.Q.img) {
                $scope.clearImg();
            };
            $scope.checkSel($scope.qqt.Q);
        };

        $scope.getLast = function() {
            $scope.logscope();
            $scope.clearOptions($scope.getNum());
            $scope.qqt.Qval = _.keys($scope.qtt).length;
            $scope.qqt.Q = _.values($scope.qtt)[_.keys($scope.qtt).length - 1];
            if(!$scope.qqt.Q.img) {
                $scope.clearImg();
            };
            $scope.checkSel($scope.qqt.Q);
        };

        $scope.getLetter = function(val, indx) {
            if(_.contains(val.split('img**'), 'xx*')) {
                return '-';
            } else if(_.contains(val.split('**'), 'img')) {
                if(indx == '0'){ return 'A'; }
                if(indx == '1'){ return 'B'; }
                if(indx == '2'){ return 'C'; }
                if(indx == '3'){ return 'D'; }
                if(indx == '4'){ return 'E'; }
                if(indx == '5'){ return 'F'; }
                if(indx == '6'){ return 'G'; }
                if(indx == '7'){ return 'H'; }
                if(indx == '8'){ return 'I'; }
                if(indx == '9'){ return 'J'; }
            }  else {
                return val;
            }
        };

        $scope.getImage = function(val) {
            if(_.contains(val.split('**'), 'img')) { return true; };
            return (_.contains(val.split('**'), 'img'));
        };

        $scope.checkImage = function(val) {
            if(_.contains(val.split('**'), 'img')) {
                return '';
            } else {
                return val;
            }
        };

        $scope.colorBorder = function(qst, opt, reslt) {
            if($rootScope.rtscore) {
                // remove all the border colors on all options
                $(".div_chem_" + qst + " p").removeClass('redborder');
                $(".div_chem_" + qst + " p").removeClass('greenborder');
                // now set the specific border on the option selected
                if(reslt==true) {
                    $("#div_chem_" + qst + "_" + opt + " p").addClass('greenborder');
                } else {
                    $("#div_chem_" + qst + "_" + opt + " p").addClass('redborder');
                }
            }
        };

        $scope.checkSel = function(val) {
            // console.log('The $scope.qqt.Q.sel is now: ' + $scope.qqt.Q.sel);
            if($scope.qqt.Q.sel != "") {
                console.log("checking the options...");
                if($scope.qqt.Q.sel == "A") { 
                    console.log("A...");
                    //$('#chem_4_1').prop('checked', 'checked');
                    $(".chems:eq(0) input").prop('checked', 'checked');
                    if($rootScope.rtscore) {
                        if($scope.qqt.Q.sel == $scope.qqt.Q.ans) {
                           $(".chems:eq(0)").addClass('greenborder'); 
                        } else {
                            $(".chems:eq(0)").addClass('redborder');
                        }
                    }
                    // $(".chems:eq(0)").addClass('greenborder');
                } else if($scope.qqt.Q.sel == "B") { 
                    console.log("B...");
                    $(".chems:eq(1) input").prop('checked', 'checked');
                    if($rootScope.rtscore) {
                        if($scope.qqt.Q.sel == $scope.qqt.Q.ans) {
                           $(".chems:eq(1)").addClass('greenborder'); 
                        } else {
                            $(".chems:eq(1)").addClass('redborder');
                        }
                    }
                } else if($scope.qqt.Q.sel == "C") { 
                    console.log("C...");
                    $(".chems:eq(2) input").prop('checked', 'checked');
                    if($rootScope.rtscore) {
                        if($scope.qqt.Q.sel == $scope.qqt.Q.ans) {
                           $(".chems:eq(2)").addClass('greenborder'); 
                        } else {
                            $(".chems:eq(2)").addClass('redborder');
                        }
                    }
                } else if($scope.qqt.Q.sel == "D") { 
                    console.log("D...");
                    $(".chems:eq(3) input").prop('checked', 'checked');
                    if($rootScope.rtscore) {
                        if($scope.qqt.Q.sel == $scope.qqt.Q.ans) {
                           $(".chems:eq(3)").addClass('greenborder'); 
                        } else {
                            $(".chems:eq(3)").addClass('redborder');
                        }
                    }
                } else if($scope.qqt.Q.sel == "E") { 
                    console.log("E...");
                    $(".chems:eq(4) input").prop('checked', 'checked');
                    if($rootScope.rtscore) {
                        if($scope.qqt.Q.sel == $scope.qqt.Q.ans) {
                           $(".chems:eq(4)").addClass('greenborder'); 
                        } else {
                            $(".chems:eq(4)").addClass('redborder');
                        }
                    }
                } else {}
            }
        };

        $scope.selClickedOption = function(val1, val2) {
            if(val2==0) { 
                console.log('checkbox A clicked!');
                $scope.qqt.Q.sel = 'A';
                if($scope.qqt.Q.ans == 'A') {
                    $scope.colorBorder(val1, val2, true);
                } else {
                    $scope.colorBorder(val1, val2, false);
                }
            }
            else if(val2==1) { 
                console.log('checkbox B clicked!');
                $scope.qqt.Q.sel = 'B';
                if($scope.qqt.Q.ans == 'B') {
                    $scope.colorBorder(val1, val2, true);
                } else {
                    $scope.colorBorder(val1, val2, false);
                }
            }
            else if(val2==2) { 
                console.log('checkbox C clicked!');
                $scope.qqt.Q.sel = 'C';
                if($scope.qqt.Q.ans == 'C') {
                    $scope.colorBorder(val1, val2, true);
                } else {
                    $scope.colorBorder(val1, val2, false);
                }
            }
            else if(val2==3) { 
                console.log('checkbox D clicked!');
                $scope.qqt.Q.sel = 'D';
                if($scope.qqt.Q.ans == 'D') {
                    $scope.colorBorder(val1, val2, true);
                } else {
                    $scope.colorBorder(val1, val2, false);
                }
            }
            else if(val2==4) { 
                console.log('checkbox E clicked!');
                $scope.qqt.Q.sel = 'E';
                if($scope.qqt.Q.ans == 'E') {
                    $scope.colorBorder(val1, val2, true);
                } else {
                    $scope.colorBorder(val1, val2, false);
                }
            }
            else {}
        };

    $scope.optClick = function(val1, val2) {
            console.log('element ID is: ' + 'chem' + "_" + val1 + "_" + val2);
            // $("#phy_1_2").prop("checked") = true;
            console.log('qst is: ' + val1 + ', opt is: ' + val2);
            $scope.selClickedOption(val1, val2);
            console.log('$scope.qqt.Q.sel is: ' + $scope.qqt.Q.sel);
        };

        // $scope.optClick = function(val1, val2) {
        //     console.log('element ID is: ' + 'chem' + "_" + val1 + "_" + val2);
        //     // $("#chem_1_2").prop("checked") = true
        //     console.log('qst is: ' + val1 + ', opt is: ' + val2);
        //     if(val2==0) { 
        //         console.log('checkbox A clicked!');
        //         if($scope.qqt.Q.ans == 'A') {
        //             $scope.colorBorder(val1, val2, true);
        //         } else {
        //             $scope.colorBorder(val1, val2, false);
        //         }
        //     }
        //     if(val2==1) { 
        //         console.log('checkbox B clicked!');
        //         if($scope.qqt.Q.ans == 'B') {
        //             $scope.colorBorder(val1, val2, true);
        //         } else {
        //             $scope.colorBorder(val1, val2, false);
        //         }
        //     }
        //     if(val2==2) { 
        //         console.log('checkbox C clicked!');
        //         if($scope.qqt.Q.ans == 'C') {
        //             $scope.colorBorder(val1, val2, true);
        //         } else {
        //             $scope.colorBorder(val1, val2, false);
        //         }
        //     }
        //     if(val2==3) { 
        //         console.log('checkbox D clicked!');
        //         if($scope.qqt.Q.ans == 'D') {
        //             $scope.colorBorder(val1, val2, true);
        //         } else {
        //             $scope.colorBorder(val1, val2, false);
        //         }
        //     }
        //     if(val2==4) { 
        //         console.log('checkbox E clicked!');
        //         if($scope.qqt.Q.ans == 'E') {
        //             $scope.colorBorder(val1, val2, true);
        //         } else {
        //             $scope.colorBorder(val1, val2, false);
        //         }
        //     }
        // };

        $scope.clearOptions = function(val) {
            console.log('$scope.getNum() is: ' + val);
            if($("#chem_" + val + "_0").prop("checked")) { $scope.seloption = '0'; $scope.setScores(val + "-0"); };
            if($("#chem_" + val + "_1").prop("checked")) { $scope.seloption = '1'; $scope.setScores(val + "-1"); };
            if($("#chem_" + val + "_2").prop("checked")) { $scope.seloption = '2'; $scope.setScores(val + "-2"); };
            if($("#chem_" + val + "_3").prop("checked")) { $scope.seloption = '3'; $scope.setScores(val + "-3"); };
            if($("#chem_" + val + "_4").prop("checked")) { $scope.seloption = '4'; $scope.setScores(val + "-4"); };

            $(".chem_" + val + "").prop("checked", false);
            $(".div_chem_" + val + " p").removeClass('redborder');
            $(".div_chem_" + val + " p").removeClass('greenborder');
            console.log('$scope.seloption is: ' + $scope.seloption);       
        };

        $scope.showImage = function(val) {
            if(_.contains(val.split('**'), 'img')) {
                return '/img/chemistry/' + val.slice(3,val.length).split('**')[1];
            }
            return '/img/chemistry/' + val.split('**')[1];
        };

        $scope.getImageLocation = function(val) {
            if(rr.split('**').length > 1) {
                return $scope.getImage("/img/chemistry/myimage.jpg");
            } else {
                return '';
            }
        };

        $scope.navclick = function(navtitle) {
            $scope.activeNav = navtitle;
        };

        $scope.dresults = {
            correct: 0,
            wrong: 0,
            ishide: 'hide',
            hidebtn1: ''
        };

        $scope.seeresults = function() {
            console.log('$scope.seeresults clicked!');
            $scope.dresults.correct = 36;
            $scope.dresults.wrong = 24;
            $scope.dresults.ishide = '';
            $scope.hidebtn1 = 'hide';
            $scope.hidebtn2 = '';
            $scope.dskipped.ishide = 'hide';
        };

        $scope.viewskipped = function() {
            console.log('$scope.viewskipped clicked!');
            $scope.dskipped.ishide = '';
            $scope.dskipped.arry = [3, 14, 48];
            $scope.hidebtn1 = '';
            $scope.dresults.ishide = 'hide';
            $scope.hidebtn2 = 'hide';
        };

        $scope.dskipped = {
            ishide: 'hide',
            arry: []
        };
        
        $scope.restart = function() {
            console.log('$scope.restart clicked!');
        };

        console.log('$rootScope.chemistry_selected_year is A: ' + $rootScope.chemistry_selected_year);

        ApiService.getChemistrySectionB($rootScope.chemistry_selected_year)
            .then(function(response) {
                    console.log('The Api.getChemistrySectionB() response is: ');
                    console.log(response);
                    console.log(response.data);
                    if(response.data) {
                        console.log('call successful.');
                        $scope.qtt = response.data;

                        $scope.qqt.Qval = 1;
                        $scope.qqt.Q.qs = $scope.qtt.Q1.qs;
                        $scope.qqt.Q.opts = $scope.qtt.Q1.opts;
                        $scope.qqt.Q.ans = $scope.qtt.Q1.ans; 
                        
                        $scope.getFirst(); 
                    }
                }, function(error) {
                    console.log('error', error);
                    // growl.error('Error: Api.getChemistrySectionB() failed!', { ttl: 3000 });
                }
            );
    }
})();
