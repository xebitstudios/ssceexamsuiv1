(function() {
    'use strict';

    angular
        .module('constantsModule')
        .constant('_', _)
        .constant('constant', {
            APP_NAME: 'SSCE Exams UI',
            API_HOST: 'http://localhost:8065',
            API_URI: 'http://34.225.120.20:8066'
        });

})();
