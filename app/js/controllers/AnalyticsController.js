(function() {
    'use strict';

    angular
        .module('ssceexamsuiApp')
        .controller('AnalyticsController', AnalyticsController);

    // AnalyticsController.$inject = ['$scope', '$log', '$location', '$controller', '$rootScope', 'ConfigService', 'ApiService', 'HeaderService', 'growl', '$timeout'];

    /* @ngInject */
    function AnalyticsController($scope, $log, $location, $controller, $rootScope, ConfigService, ApiService, HeaderService, growl, $timeout) {

        $controller('BaseController', {$scope: $scope});
        $rootScope.baseRoute = '';
        $scope.activeTab = 'usersInProgress';
        $scope.pgwidth = true;
        $scope.currentpage = 1;
        
        $scope.hide = [
            { hideval: '' },
            { hideval: '' },
            { hideval: '' },
            { hideval: '' },
            { hideval: '' },
            { hideval: '' },
            { hideval: '' },
            { hideval: '' },
            { hideval: '' }
        ];

        $scope.fclick = function() {
            if($scope.currentpage !== 1) {
                $scope.currentpage = 1;
                $scope.moveon($scope.currentpage);
            }
        };

        $scope.lclick = function() {
            if($scope.currentpage !== 9) {
                $scope.currentpage = 9;
                $scope.moveon($scope.currentpage);
            }
        };

        $scope.nclick = function() {
            if($scope.currentpage !== 9) {
                $scope.currentpage++;
                $scope.moveon($scope.currentpage);
            }
        };

        $scope.pclick = function() {
            if($scope.currentpage !== 1) {
                $scope.currentpage--;
                $scope.moveon($scope.currentpage);
            }
        };

        $scope.recentexams = {};
        $scope.toprow = [];
        $scope.examscores = {};

        // $scope.recentexams = {
        //     name: "Johnson Smith",
        //     subjscores: [
        //         {
        //             subj: 'Mathematics',
        //             year: '1988',
        //             pct: '100',
        //             examday: '1/27/2017',
        //             examtime: '10.52',
        //             daysection: 'a.m',
        //             colr: 'info'
        //         },
        //         {
        //             subj: 'Mathematics',
        //             year: '1993',
        //             pct: '69',
        //             examday: '6/12/2016',
        //             examtime: '3.29',
        //             daysection: 'p.m',
        //             colr: 'warning'
        //         },
        //         {
        //             subj: 'Physics',
        //             year: '1994',
        //             pct: '54',
        //             examday: '3/29/2016',
        //             examtime: '9.23',
        //             daysection: 'p.m',
        //             colr: 'danger'
        //         },
        //         {
        //             subj: 'English',
        //             year: '1989',
        //             pct: '89',
        //             examday: '5/23/2016',
        //             examtime: '8.33',
        //             daysection: 'p.m',
        //             colr: 'success'
        //         },
        //         {
        //             subj: 'Biology',
        //             year: '1993',
        //             pct: '100',
        //             examday: '4/10/2016',
        //             examtime: '11.29',
        //             daysection: 'a.m',
        //             colr: 'success'
        //         },
        //         {
        //             subj: 'Economics',
        //             year: '1993',
        //             pct: '79',
        //             examday: '9/23/2016',
        //             examtime: '8.30',
        //             daysection: 'p.m',
        //             colr: 'info'
        //         },
        //         {
        //             subj: 'Chemistry',
        //             year: '1998',
        //             pct: '65',
        //             examday: '3/19/2016',
        //             examtime: '9.42',
        //             daysection: 'a.m',
        //             colr: 'warning'
        //         }
        //     ]
        // };

        // $scope.toprow = [
        //     {
        //         rowtitle: 'Available Subjects Count for Subscription',
        //         vall: '8',
        //         ind: 'analy1'
        //     },
        //     {
        //         rowtitle: 'Attempted Subjects Count (Last 1 week)',
        //         vall: '32',
        //         ind: 'analy2'
        //     },
        //     {
        //         rowtitle: 'Avg. Daily Sesssion (hrs)',
        //         vall: '6.8',
        //         ind: 'analy3'
        //     },
        //     {
        //         rowtitle: 'User Improvement Ranking',
        //         vall: '82.6',
        //         ind: 'analy4'
        //     }
        // ];

        // $scope.examscores = {
        //     results: [
        //         {
        //             name: 'Mathematics',
        //             attempts: '25',
        //             avgscore: '78%',
        //             noticeval: 'notice-success',
        //             iconval: 'fa-area-chart'
        //         },
        //         {
        //             name: 'Physics',
        //             attempts: '48',
        //             avgscore: '92%',
        //             noticeval: 'notice-warning',
        //             iconval: 'fa-spinner'
        //         },
        //         {
        //             name: 'Chemistry',
        //             attempts: '17',
        //             avgscore: '72%',
        //             noticeval: 'notice-info',
        //             iconval: 'fa-times'
        //         },
        //         {
        //             name: 'Economics',
        //             attempts: '12',
        //             avgscore: '86%',
        //             noticeval: 'notice-danger',
        //             iconval: 'fa-check'
        //         }
        //     ],
        //     summary: {}
        // };

        $scope.inAnalytics = function() {
            console.log('Now in the Analytics page!');
        };

        $scope.inAnalytics();

        $scope.closeme = function (val) {
            console.log("val is: " + val);
            $('#hideme' + val + '').hide("slow");
            $('#' + val + '').hide("slow");
        };

        $scope.moveon = function(val) {
            if($scope.pgwidth) {
                for(var e=0;e<9;e++) {
                    $scope.hide[e].hideval = 'hide';
                }
                if(val==1) { $scope.hide[0].hideval = ''; }
                if(val==2) { $scope.hide[1].hideval = ''; }
                if(val==3) { $scope.hide[2].hideval = ''; }
                if(val==4) { $scope.hide[3].hideval = ''; }
                if(val==5) { $scope.hide[4].hideval = ''; }
                if(val==6) { $scope.hide[5].hideval = ''; }
                if(val==7) { $scope.hide[6].hideval = ''; }
                if(val==8) { $scope.hide[7].hideval = ''; }
                if(val==9) { $scope.hide[8].hideval = ''; }
            }
        };

        $scope.subjmonth = [
            { code: "", name: "Month" },
            { code: "Jan", name: "Jan" },
            { code: "Feb", name: "Feb" },
            { code: "Mar", name: "Mar" },           
            { code: "Apr", name: "Apr" },
            { code: "May", name: "May" },
            { code: "Jun", name: "Jun" },
            { code: "Jul", name: "Jul" },
            { code: "Aug", name: "Aug" },
            { code: "Sep", name: "Sep" },
            { code: "Oct", name: "Oct" },
            { code: "Nov", name: "Nov" },
            { code: "Dec", name: "Dec" }
        ];

        $scope.subjnumber = [
            { code: "", name: "Top #" },
            { code: "t3", name: "Top 3" },
            { code: "t5", name: "Top 5" },
            { code: "t0", name: "All" }
        ];

        $scope.subjlist = [
            { code: "", name: "Subject" },
            { code: "Phy", name: "Physics" },
            { code: "Chem", name: "Chemistry" },
            { code: "Maths", name: "Mathematics" },           
            { code: "Econ", name: "Economics" },
            { code: "Bio", name: "Biology" },
            { code: "Eng", name: "English" },
            { code: "Geo", name: "Geography" },
            { code: "Lit", name: "Lit. in English" },
            { code: "Com", name: "Commerce" },
            { code: "AgSci", name: "Agric Sci" },
            { code: "Gov", name: "Government" }
        ];

        $scope.subjyear = [
            { code: "", name: "Year" },
            { code: "1988", name: "1988" },
            { code: "1989", name: "1989" },
            { code: "1990", name: "1990" },           
            { code: "1991", name: "1991" },
            { code: "1992", name: "1992" },
            { code: "1993", name: "1993" },
            { code: "1994", name: "1994" },
            { code: "1995", name: "1995" },
            { code: "1996", name: "1996" },
            { code: "1997", name: "1997" },
            { code: "1998", name: "1998" },
            { code: "1999", name: "1999" },
            { code: "2000", name: "2000" },           
            { code: "2001", name: "2001" },
            { code: "2002", name: "2002" },
            { code: "2003", name: "2003" },
            { code: "2004", name: "2004" },
            { code: "2005", name: "2005" },
            { code: "2006", name: "2006" },
            { code: "2007", name: "2007" },
            { code: "2008", name: "2008" },
            { code: "2009", name: "2009" },
            { code: "2010", name: "2010" },           
            { code: "2011", name: "2011" },
            { code: "2012", name: "2012" },
            { code: "2013", name: "2013" },
            { code: "2014", name: "2014" },
            { code: "2015", name: "2015" }
        ];

        $scope.chart1Data = {};
        $scope.chart2Data = {};
        $scope.chart3Data = {};
        $scope.chart4Data = {};
        $scope.chart5Data = {};
        $scope.chart6Data = {};
        // $scope.chart2Data = {
        //     typee: 'areaspline',
        //     titlee: 'Economics 2008, Objective Tests',
        //     subtitle: 'Average response time in seconds',
        //     data1xlabel: 'Average User',
        //     data1: [12, 10, 14, 20, 30, 45, 36, 19, 15, 20, 24, 27, 29],
        //     color1: '#58d68d',
        //     data2xlabel: 'You',
        //     data1ylabel: 'Response Time (s)',
        //     data2: [8, 14, 17, 24, 28, 53, 31, 23, 18, 26, 29, 22, 19],
        //     color2: '#edbb99'
        // };

        $scope.setChart1 = function() {
            $('#chart1').highcharts({
                chart: {
                    type: $scope.chart1Data.typee
                },
                title: {
                    text: $scope.chart1Data.titlee,
                    x: -10 //center
                },

                credits: false,

                subtitle: {
                    text: $scope.chart1Data.subtitle,
                    x: -10
                },
                xAxis: {
                    categories: $scope.chart1Data.data1xlabel
                },
                yAxis: {
                    title: {
                        text: $scope.chart1Data.data1ylabel
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: ' (SSCE)'
                },
                series: [
                    {
                        name: $scope.chart1Data.datapts[0].data1val,
                        data: $scope.chart1Data.datapts[0].data1
                    }, 
                    {
                        name: $scope.chart1Data.datapts[1].data2val,
                        data: $scope.chart1Data.datapts[1].data2
                    }, 
                    {
                        name: $scope.chart1Data.datapts[2].data3val,
                        data: $scope.chart1Data.datapts[2].data3
                    }, 
                    {
                        name: $scope.chart1Data.datapts[3].data4val,
                        data: $scope.chart1Data.datapts[3].data4
                    }
                ]
            });
        };

        $scope.setChart2 = function() {
            $('#chart2').highcharts({
                chart: {
                    type: $scope.chart2Data.typee
                },
                title: {
                    text: $scope.chart2Data.titlee
                },
                subtitle: {
                    text: '<b>' + $scope.chart2Data.subtitle + '</b>'
                },
                xAxis: {
                    allowDecimals: false,
                    labels: {
                        formatter: function () {
                            return this.value; // clean, unformatted number for year
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: $scope.chart2Data.data1ylabel
                    },
                    labels: {
                        formatter: function () {
                            return this.value ;
                        }
                    }
                },
                tooltip: {
                    pointFormat: '{series.name} spent <b>{point.y:,.0f}</b> seconds<br/>more than the average tester'
                },
                plotOptions: {
                    area: {
                        pointStart: 1988,
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: $scope.chart2Data.data1xlabel,
                    data: $scope.chart2Data.data1,
                    color: $scope.chart2Data.color1
                }, {
                    name: $scope.chart2Data.data2xlabel,
                    data: $scope.chart2Data.data2,
                    color: $scope.chart2Data.color2
                }]
            });
        };

        $scope.setChart3 = function() {
            $('#chart3').highcharts({
                chart: {
                    type: $scope.chart3Data.typee
                },
                title: {
                    text: $scope.chart3Data.titlee
                },
                subtitle: {
                    text: $scope.chart3Data.subtitle
                },
                xAxis: {
                    categories: $scope.chart3Data.data2xlabel
                },
                yAxis: {
                    title: {
                        text: $scope.chart3Data.data1ylabel
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{
                    name: 'You',
                    data: $scope.chart3Data.data1,
                    color: $scope.chart3Data.color1
                }, {
                    name: 'Average User',
                    data: $scope.chart3Data.data2,
                    color: $scope.chart3Data.color2
                }]
            });
        };           

        $scope.setChart4 = function() {
            $('#chart4').highcharts({
                chart: {
                    type: $scope.chart4Data.typee
                },
                title: {
                    text: $scope.chart4Data.titlee
                },
                subtitle: {
                    text: $scope.chart4Data.subtitle
                },
                xAxis: {
                    categories: $scope.chart4Data.data1xlabel,
                    tickmarkPlacement: 'on',
                    title: {
                        enabled: false
                    }
                },
                yAxis: {
                    title: {
                        text: $scope.chart4Data.data1ylabel
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} attempts)<br/>',
                    split: true
                },
                plotOptions: {
                    area: {
                        stacking: 'percent',
                        lineColor: '#ffffff',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#ffffff'
                        }
                    }
                },
                series: [
                    {
                        name: $scope.chart4Data.datapts[0].dataval,
                        data: $scope.chart4Data.datapts[0].dataa,
                        color: $scope.chart4Data.datapts[0].colorr
                    },
                    {
                        name: $scope.chart4Data.datapts[1].dataval,
                        data: $scope.chart4Data.datapts[1].dataa,
                        color: $scope.chart4Data.datapts[1].colorr
                    },
                    {
                        name: $scope.chart4Data.datapts[2].dataval,
                        data: $scope.chart4Data.datapts[2].dataa,
                        color: $scope.chart4Data.datapts[2].colorr
                    },
                    {
                        name: $scope.chart4Data.datapts[3].dataval,
                        data: $scope.chart4Data.datapts[3].dataa,
                        color: $scope.chart4Data.datapts[3].colorr
                    },
                    {
                        name: $scope.chart4Data.datapts[4].dataval,
                        data: $scope.chart4Data.datapts[4].dataa,
                        color: $scope.chart4Data.datapts[4].colorr
                    }
                ]
            }); 
        };

        $scope.setChart5 = function() {
            $('#chart5').highcharts({
                chart: {
                    type: $scope.chart5Data.typee,
                    inverted: true
                },
                title: {
                    text: $scope.chart5Data.titlee
                },
                subtitle: {
                    text: $scope.chart5Data.subtitle,
                    style: {
                        position: 'absolute',
                        right: '0px',
                        bottom: '10px',
                        color: '#000'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -20,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: '#FFFFFF'
                },
                xAxis: {
                    categories: $scope.chart5Data.data1ylabel
                },
                yAxis: {
                    title: {
                        text: $scope.chart5Data.data0xlabel
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    },
                    min: 0
                },
                plotOptions: {
                    area: {
                        fillOpacity: 0.5
                    }
                },
                series: [{
                    name: $scope.chart5Data.data2xlabel,
                    data: $scope.chart5Data.data1,
                    color: $scope.chart5Data.color1
                }, {
                    name: $scope.chart5Data.data1xlabel,
                    data: $scope.chart5Data.data2,
                    color: $scope.chart5Data.color2
                }]
            });
        };

        var categories = [' < 1996', '1996', '1997', '1998',
            '1999', '2000', '2001', '2002', '2003',
            '2004', '2005', '2006', '2007', '2008',
            '2009', '2010', '2011', '2012', '2013',
            '2014', '2015'];

        // $scope.chart6Data = {
        //     typee: 'bar',
        //     titlee: 'Subject Comparison with Average User',
        //     subtitle: 'Mathematics, 1988 - 2015',
        //     data1xlabel: 'Average User',
        //     data1: [2.1, 2.0, 2.2, 2.4, 2.6, 3.0, 3.1, 2.9, 3.1, 4.1, 4.3, 3.6, 3.4, 2.6, 2.9, 2.9, 1.8, 1.2, 0.6, 0.1, 0.0],
        //     color1: '#58d68d',
        //     data2xlabel: 'You',
        //     data1ylabel: 'Response Time (s)',
        //     data2: [-2.2, -2.2, -2.3, -2.5, -2.7, -3.1, -3.2, -3.0, -3.2, -4.3, -4.4, -3.6, -3.1, -2.4, -2.5, -2.3, -1.2, -0.6, -0.2, -0.0, -0.0],
        //     color2: '#edbb99'
        // };

        $scope.setChart6 = function() {
            $('#chart6').highcharts({
                chart: {
                    type: $scope.chart6Data.typee
                },
                title: {
                    text: $scope.chart6Data.titlee
                },
                subtitle: {
                    text: $scope.chart6Data.subtitle
                },
                xAxis: [
                    {
                        categories: categories,
                        reversed: false,
                        labels: {
                            step: 1
                        }
                    }, { // mirror axis on right side
                        opposite: true,
                        reversed: false,
                        categories: categories,
                        linkedTo: 0,
                        labels: {
                            step: 1
                        }
                    }
                ],
                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        formatter: function () {
                            return Math.abs(this.value) + '%';
                        }
                    }
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + ', year ' + this.point.category + '</b><br/>' +
                            'Score: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                    }
                },
                series: [{
                    name: $scope.chart6Data.data2xlabel,
                    data: $scope.chart6Data.data2
                }, {
                    name: $scope.chart6Data.data1xlabel,
                    data: $scope.chart6Data.data1
                }]
            });
        };

        $scope.getAnalyticsdata = function(userid) {
            ApiService.getAnalyticsdata(userid)
                .then(function successCallback(response) {
                    $log.debug('Getting the latest analytics data for user: 25526');
                    if(response.data != null) {
                        $log.debug('Analytics retrieval: ' + response.data.reason);
                        $scope.recentexams = response.data.recentexams;
                        $scope.toprow = response.data.toprow;
                        $scope.examscores = response.data.examscores;
                        $scope.chart1Data = response.data.chart1Data;
                        $scope.chart2Data = response.data.chart2Data;
                        $scope.chart3Data = response.data.chart3Data;
                        $scope.chart4Data = response.data.chart4Data;
                        $scope.chart5Data = response.data.chart5Data;
                        $scope.chart6Data = response.data.chart6Data;
                        $scope.setChart1();
                        $scope.setChart2();
                        $scope.setChart3();
                        $scope.setChart4();
                        $scope.setChart5();
                        $scope.setChart6();
                    }
                }, function errorCallback(response) {
                    if (response.status != 200 && response.data === null) {
                        $log.error('Error occured, Analytics retrieval failed, data not saved!');
                        growl.error('Error occured, Analytics retrieval failed, data not saved!', { ttl: 3000 });
                    }
                });
        };

        $scope.getAnalyticsdata('12345');

        $scope.chart1Update = function() {
            var mth = $('#subjmth1').val();
            var yr = $('#subjyr2').val();
            var userid = $scope.userid;
            $log.debug('userid: ' + userid + ', mth: ' + mth + ', yr: ' + yr);
            ApiService.chart1Update(mth, yr, userid)
                .then(function successCallback(response) {
                    $log.debug('Getting the latest chart 1 analytics data for user: 25526');
                    if(response.data != null) {
                        $log.debug('Analytics retrieval, done');
                        $scope.chart1Data = response.data.chart1Data;
                        $scope.setChart1();
                        growl.success('<b>Chart Updated Successfully</b>', { ttl: 3000 });
                    }
                }, function errorCallback(response) {
                    if (response.status != 200 && response.data === null) {
                        $log.error('Error occured, Chart2 Update failed');
                        growl.error('Error occured, Chart2 Update failed!', { ttl: 3000 });
                    }
                });
        };

        $scope.chart2Update = function() {
            var subj = $('#subjlst1').val();
            var yr = $('#subjyr1').val();
            var userid = $scope.userid;
            $log.debug('userid: ' + userid + ', subj: ' + subj + ', yr: ' + yr);
            ApiService.chart2Update(subj, yr, userid)
                .then(function successCallback(response) {
                    $log.debug('Getting the latest chart 2 analytics data for user: 25526');
                    if(response.data != null) {
                        $log.debug('Analytics retrieval, done');
                        $scope.chart2Data = response.data.chart2Data;
                        $scope.setChart2();
                        growl.success('<b>Chart Updated Successfully</b>', { ttl: 3000 });
                    }
                }, function errorCallback(response) {
                    if (response.status != 200 && response.data === null) {
                        $log.error('Error occured, Chart2 Update failed');
                        growl.error('Error occured, Chart2 Update failed!', { ttl: 3000 });
                    }
                });
        };

        $scope.chart3Update = function() {
            var yr = $('#subjyr3').val();
            var userid = $scope.userid;
            $log.debug('userid: ' + userid + ', yr: ' + yr);
            ApiService.chart3Update(yr, userid)
                .then(function successCallback(response) {
                    $log.debug('Getting the latest chart 3 analytics data for user: 25526');
                    if(response.data != null) {
                        $log.debug('Analytics retrieval, done ');
                        $scope.chart3Data = response.data.chart3Data;
                        $scope.setChart3();
                        growl.success('<b>Chart Updated Successfully</b>', { ttl: 3000 });
                    }
                }, function errorCallback(response) {
                    if (response.status != 200 && response.data === null) {
                        $log.error('Error occured, Chart3 Update failed');
                        growl.error('Error occured, Chart3 Update failed!', { ttl: 3000 });
                    }
                });
        };

        $scope.chart4Update = function() {
            var num = $('#subjnum').val();
            var userid = $scope.userid;
            $log.debug('userid: ' + userid + ', num: ' + num);
            ApiService.chart4Update(num, userid)
                .then(function successCallback(response) {
                    $log.debug('Getting the latest chart 4 analytics data for user: 25526');
                    if(response.data != null) {
                        $log.debug('Analytics retrieval, done ');
                        $scope.chart4Data = response.data.chart4Data;
                        $scope.setChart4();
                        growl.success('<b>Chart Updated Successfully</b>', { ttl: 3000 });
                    }
                }, function errorCallback(response) {
                    if (response.status != 200 && response.data === null) {
                        $log.error('Error occured, Chart4 Update failed');
                        growl.error('Error occured, Chart4 Update failed!', { ttl: 3000 });
                    }
                });
        };

        $scope.chart5Update = function() {
            var subj = $('#subjlst2').val();
            var userid = $scope.userid;
            $log.debug('userid: ' + userid + ', subj: ' + subj);
            ApiService.chart5Update(subj, userid)
                .then(function successCallback(response) {
                    $log.debug('Getting the latest chart 5 analytics data for user: 25526');
                    if(response.data != null) {
                        $log.debug('Analytics retrieval, done ');
                        $scope.chart5Data = response.data.chart5Data;
                        $scope.setChart5();
                        growl.success('<b>Chart Updated Successfully</b>', { ttl: 3000 });
                    }
                }, function errorCallback(response) {
                    if (response.status != 200 && response.data === null) {
                        $log.error('Error occured, Chart5 Update failed');
                        growl.error('Error occured, Chart5 Update failed!', { ttl: 3000 });
                    }
                });
        };

        $scope.chart6Update = function() {
            var subj = $('#subjlst3').val();
            var userid = $scope.userid;
            $log.debug('userid: ' + userid + ', subj: ' + subj);
            ApiService.chart6Update(subj, userid)
                .then(function successCallback(response) {
                    $log.debug('Getting the latest chart 6 analytics data for user: 25526');
                    if(response.data != null) {
                        $log.debug('Analytics retrieval, done ');
                        $scope.chart6Data = response.data.chart6Data;
                        $scope.setChart6();
                        growl.success('<b>Chart Updated Successfully</b>', { ttl: 3000 });
                    }
                }, function errorCallback(response) {
                    if (response.status != 200 && response.data === null) {
                        $log.error('Error occured, Chart6 Update failed');
                        growl.error('Error occured, Chart6 Update failed!', { ttl: 3000 });
                    }
                });
        };

        $timeout(function(){
            HeaderService.setTab(2);
            $('div svg text:contains("Highcharts.com")').addClass('hide');

            if ($('body').width() < 600) {
              $scope.pgwidth = true;
              $scope.moveon(1);
            } else {
              $scope.pgwidth = false;
            }
            console.log('$scope.pgwidth is: ' + $scope.pgwidth);
        }, 100);

    }
})();