angular.module('form-demo', ['ngRoute', 'ngui-form-component'])
      .config(function ($routeProvider, $locationProvider) {
            $routeProvider
            .when('/form', {
                templateUrl: '/demo/form/view.html',
                controller: FormCtrl,
                page:'form'
            })
      })

      .run(['$rootScope', '$route', function ($rootScope, $route) {
            $rootScope.$on('$routeChangeSuccess', function () {
              $rootScope.$pageName = document.title = $route.current.page;
            });
      }])
;

angular.module('ngui-form-component', [
        'ngui-form'
])
.config(function ($nguiFormConfigProvider) {
        $nguiFormConfigProvider.setBaseTemplateUrl('/template');
})
;
