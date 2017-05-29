(function() {
    'use strict';

    angular
        .module('ssceexamsuiApp')
        .controller('SscephysicsbtemplateController', SscephysicsbtemplateController);

    // SscephysicsbtemplateController.$inject = ['$scope', '$log', '$interval', '$location', '$controller', '$rootScope', 'SaveexamService', 'ConfigService', 'HeaderService', 'ApiService', 'TimerService', 'LoggingService', 'growl', '$timeout'];

    /* @ngInject */
    function SscephysicsbtemplateController($scope, window, $log, $interval, $location, $controller, $rootScope, SaveexamService, ConfigService, HeaderService, ApiService, TimerService, LoggingService, growl, $timeout) {

        $controller('BaseController', {$scope: $scope});
        $rootScope.baseRoute = '';
        var baseRoute = '';
        $scope.exmid = 'phy_B';

        $scope.logEvent = function() {
            LoggingService.postTrack('{' + $scope.exmid + ',' + $scope.userid + ',' + $scope.examyear + ',' + $scope.qqt.Qval + ',' + new Date().getTime() + '}');
        };

        $scope.intab = function() {
            console.log('Now in the SSCE Physics_B Template page!');
        };

        $scope.intab();

        $timeout(function(){
           HeaderService.setTab(1);
        }, 100);

        $scope.pctused = 0;
        $scope.totaltimemins = 5;
        $scope.timegone = '0 hrs 0 mins 0 secs';
        $scope.timeleft = ' hrs 5 mins 0 secs';
        $scope.activeNav = 'Start';
        $scope.oldtime = 0;
        $scope.lefttime = 0;
        $scope.examyear = $rootScope.physics_selected_year;
        $scope.movedTime = false;
        $scope.timerStopped = false;

        $scope.themodal = {
            modalShown: false
        };
        $scope.passed = 0;
        $scope.wrong = 0;
        $scope.skipped = 0;
        $scope.skippedArray = [];

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

        $scope.getSkippedArray = function() {
            return $scope.skippedArray.join(',');
        };

        $scope.goToQst = function(val) {
            console.log('val is now: ' + $scope.skippedArray[val]);
            console.log('$scope.qtt is:...');
            console.log($scope.qtt);
            console.log(_.values($scope.qtt)[$scope.skippedArray[val] - 1]);
            // $scope.qqt = _.values($scope.qtt)[$scope.skippedArray[val] - 1];
            $scope.logscope();
            $scope.clearOptions($scope.getNum());
            $scope.qqt.Qval = $scope.skippedArray[val] - 1;
            $scope.qqt.Q = _.values($scope.qtt)[$scope.skippedArray[val] - 1];
            if(!$scope.qqt.Q.img) {
                $scope.clearImg();
            };
            $scope.checkSel($scope.qqt.Q);
            // $('.ng-modal-close').click();
            $scope.toggleModal(1);
        };

        $scope.getpassed = function() {
            $scope.passed = 0;
            $scope.wrong = 0;
            $scope.skipped = 0;
            $scope.skippedArray = [];
            // console.log('_.keys($scope.qtt).length is: ' + _.keys($scope.qtt).length);
            for(var i=0;i<_.keys($scope.qtt).length;i++) {
                if(_.values($scope.qtt)[i].sel == "") {
                    $scope.skipped = $scope.skipped + 1;
                    $scope.skippedArray.push(i);
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
            if(!$scope.timerStopped) {
                $interval(function () {
                $scope.updateTime();
                }, 5000);        
            }
        };

        $scope.updateTime = function() {
            if(!$scope.timerStopped) {
                $scope.timegoneleft = TimerService.getTime($scope.oldtime, $scope.totaltimemins);
                $scope.timegone = $scope.timegoneleft[0];
                $scope.timeleft = $scope.timegoneleft[1];
                $scope.pctused = ($scope.timegoneleft[2] > 100 ? 100 : $scope.timegoneleft[2]);
                if(!$scope.movedTime) { 
                    console.log('tick tock begins...');
                    $scope.movedTime = !$scope.movedTime;
                }
            }
        };

        $scope.setTimeLeft = function() {
            console.log('setting time left to: ' + $scope.timegoneleft);
            window.localStorage.tmlft = TimerService.getTL($scope.oldtime, $scope.totaltimemins);
            window.sessionStorage.tmlft = TimerService.getTL($scope.oldtime, $scope.totaltimemins);
        };

        $scope.getStartTime = function() {
            $scope.oldtime = new Date().getTime();
            console.log('start time is: ' + $scope.oldtime);
        };

        $scope.getNum = function() {
            return $scope.qqt.Qval;
        };

        $scope.colorBorder = function(qst, opt, reslt) {
            if($rootScope.rtscore) {
                // remove all the border colors on all options
                $(".div_phy_" + qst + " p").removeClass('redborder');
                $(".div_phy_" + qst + " p").removeClass('greenborder');
                // now set the specific border on the option selected
                if(reslt==true) {
                    $("#div_phy_" + qst + "_" + opt + " p").addClass('greenborder');
                } else {
                    $("#div_phy_" + qst + "_" + opt + " p").addClass('redborder');
                }
            }
        };

        $scope.checkSel = function(val) {
            // console.log('The $scope.qqt.Q.sel is now: ' + $scope.qqt.Q.sel);
            if($scope.qqt.Q.sel != "") {
                console.log("checking the options...");
                if($scope.qqt.Q.sel == "A") { 
                    console.log("A...");
                    //$('#phy_4_1').prop('checked', 'checked');
                    $(".phys:eq(0) input").prop('checked', 'checked');
                    if($rootScope.rtscore) {
                        if($scope.qqt.Q.sel == $scope.qqt.Q.ans) {
                           $(".phys:eq(0)").addClass('greenborder'); 
                        } else {
                            $(".phys:eq(0)").addClass('redborder');
                        }
                    }
                    // $(".phys:eq(0)").addClass('greenborder');
                } else if($scope.qqt.Q.sel == "B") { 
                    console.log("B...");
                    $(".phys:eq(1) input").prop('checked', 'checked');
                    if($rootScope.rtscore) {
                        if($scope.qqt.Q.sel == $scope.qqt.Q.ans) {
                           $(".phys:eq(1)").addClass('greenborder'); 
                        } else {
                            $(".phys:eq(1)").addClass('redborder');
                        }
                    }
                } else if($scope.qqt.Q.sel == "C") { 
                    console.log("C...");
                    $(".phys:eq(2) input").prop('checked', 'checked');
                    if($rootScope.rtscore) {
                        if($scope.qqt.Q.sel == $scope.qqt.Q.ans) {
                           $(".phys:eq(2)").addClass('greenborder'); 
                        } else {
                            $(".phys:eq(2)").addClass('redborder');
                        }
                    }
                } else if($scope.qqt.Q.sel == "D") { 
                    console.log("D...");
                    $(".phys:eq(3) input").prop('checked', 'checked');
                    if($rootScope.rtscore) {
                        if($scope.qqt.Q.sel == $scope.qqt.Q.ans) {
                           $(".phys:eq(3)").addClass('greenborder'); 
                        } else {
                            $(".phys:eq(3)").addClass('redborder');
                        }
                    }
                } else if($scope.qqt.Q.sel == "E") { 
                    console.log("E...");
                    $(".phys:eq(4) input").prop('checked', 'checked');
                    if($rootScope.rtscore) {
                        if($scope.qqt.Q.sel == $scope.qqt.Q.ans) {
                           $(".phys:eq(4)").addClass('greenborder'); 
                        } else {
                            $(".phys:eq(4)").addClass('redborder');
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
            console.log('element ID is: ' + 'phy' + "_" + val1 + "_" + val2);
            console.log('qst is: ' + val1 + ', opt is: ' + val2);
            $scope.selClickedOption(val1, val2);
        };

        $scope.clearOptions = function(val) {
            console.log('$scope.getNum() is: ' + val);
            if($("#phy_" + val + "_0").prop("checked")) { $scope.seloption = '0'; $scope.setScores(val + "-0"); }
            else if($("#phy_" + val + "_1").prop("checked")) { $scope.seloption = '1'; $scope.setScores(val + "-1"); }
            else if($("#phy_" + val + "_2").prop("checked")) { $scope.seloption = '2'; $scope.setScores(val + "-2"); }
            else if($("#phy_" + val + "_3").prop("checked")) { $scope.seloption = '3'; $scope.setScores(val + "-3"); }
            else if($("#phy_" + val + "_4").prop("checked")) { $scope.seloption = '4'; $scope.setScores(val + "-4"); }
            else {}

            $(".phy_" + val + "").prop("checked", false);
            $(".div_phy_" + val + " p").removeClass('redborder');
            $(".div_phy_" + val + " p").removeClass('greenborder');
            console.log('$scope.seloption is: ' + $scope.seloption);       
        };

        $scope.getStartTime();

        $scope.btnsList = _.pluck(_.values($scope.navbtns), 'title');

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

        $scope.setNum = function(val) {
            $scope.qqt.Qval = val;
        };

        $scope.clearImg = function() {
            $scope.qqt.Q.img = "";
        };

        $scope.logClear = function() {
            $scope.logscope();
            $scope.clearOptions($scope.getNum());
        };

        $scope.moveSetTime = function() {
            $scope.moveTime();
            // $scope.updateTime();
            $scope.setTimeLeft();
        };

        $scope.getNext = function() {
            if($scope.getNum() == 60) {
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
                    $scope.moveSetTime();
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
                $scope.moveSetTime();
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
            $scope.moveSetTime();
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
            $scope.moveSetTime();
        };

        $scope.getSave = function() {
            $scope.logscope();
            console.log('Save button was clicked!!!');
            console.log($scope.qtt);
            // $scope.qqt.Qval = _.keys($scope.qtt).length;
            // $scope.qqt.Q = _.values($scope.qtt)[_.keys($scope.qtt).length - 1];
            console.log($scope.qqt.Qval);
            console.log($scope.qqt.Q);
            var qArry = "";
            console.log('_.values($scope.qtt) is: ');
            // console.log(_.values($scope.qtt).sel);
            _.each(_.values($scope.qtt), function(obj) {
                if(obj.sel != "") {
                    qArry = qArry + obj.sel;
                } else {
                    qArry = qArry + "Z";
                }
                
            });
            // Save the current exam state to localStorage
            SaveexamService.saveExam({
                tmlft: TimerService.getTL($scope.oldtime, $scope.totaltimemins),
                exmid: $scope.exmid,
                examyear: $scope.examyear,
                dt: Date().split('(')[0],//.split('GMT')[0].replace(' ','-').replace(' ','-').replace(' ','-').replace(' ','-').replace(' ','-'),
                qArry: qArry
            });
            $scope.moveSetTime();
        };

        $scope.getLetter = function(val, indx) {
            if(val==undefined) {
                console.log('returning T...');
                return 'T';
            } else if(_.contains(val.split('img**'), 'xx*')) {
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
            if(_.contains(val.split('**'), 'xx*img')) { return true; };
            return (_.contains(val.split('**'), 'img'));
        };

        $scope.checkImage = function(val) {
            if(_.contains(val.split('**'), 'img')) {
                return '';
            } else {
                return val;
            }
        };

        $scope.showImage = function(val) {
            if(_.contains(val.split('**'), 'xx*img')) {
                return '/img/physics/' + val.slice(3,val.length).split('**')[1];
            }
            return '/img/physics/' + val.split('**')[1];
        };

        $scope.getImageLocation = function(val) {
            if(rr.split('**').length > 1) {
                return $scope.getImage("/img/physics/myimage.jpg");
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

        console.log('$rootScope.physics_selected_year is B: ' + $rootScope.physics_selected_year);

        // $scope.qtt = ApiService.getPhysicsSectionB($rootScope.physics_selected_year);
        ApiService.getPhysicsSectionB($rootScope.physics_selected_year)
            .then(function(response) {
                    console.log('The Api.getPhysicsSectionB() response is: ');
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
                    // growl.error('Error: Api.getPhysicsSectionB() failed!', { ttl: 3000 });
                }
            );
    }
})();
