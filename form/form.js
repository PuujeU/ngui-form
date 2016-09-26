(function () {
    'use strict';
    /* global angular */
    var app = angular.module('ngui-form', ['ngMessages']);
    app.directive('nguiFormField', ['$nguiFormConfig',
        function ($nguiFormConfig) {
            return {
                require: ['^form'],
                restrict: 'A',
                replace: true,
                transclude: true,
                scope: {
                    field: '=nguiFormField',
                    label: "@", labelVar: "="
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiFormConfig.baseTemplateUrl + '/field.htm';
                },
                link: function ($scope, $element, $attrs, controllersArr) {
                    var frm = controllersArr[0];
                    $scope.$data = {
                        get label() {
                            return $scope.labelVar || $scope.label;
                        },
                        get field() {
                            return $scope.field;
                        },
                        get showError() {
                            var $field = $scope.field;
                            return $field && $field.$invalid && ($field.$touched || frm.$submitted);
                        },
                        get errorMessages() {
                            return $nguiFormConfig.messages;
                        },
                    };
                }
            };
        }
    ]);

    app.provider("$nguiFormConfig", function () {
        var _messages = {
            required: 'Please enter a value for this field',
            email: 'This field must be a valid email address.',
            maxlength: 'This field can be at most 15 characters long.'
        };
        var baseTemplateUrl = "/ngui-modal";

        return {
            put: function (key, message) {
                _messages[key] = message;
            },
            setBaseTemplateUrl: function (url) {
              baseTemplateUrl = url;
            },

            $get: function () {
                return {
                    get messages() {
                        return _messages;
                    },
                    get baseTemplateUrl() {
                      return baseTemplateUrl;
                    }
                };
            }
        };
    });

})();
