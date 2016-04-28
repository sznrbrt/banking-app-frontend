'use strict';

var app = angular.module('myApp', []);

app.controller('mainCtrl', function($scope) {
  $scope.transactions = [
    {
      "date": '15/04/1992',
      "description": "Oculus Rift",
      "dr": 700,
      "cr": 0,
      "note": "This is some note."
    }
  ];

  console.log($scope.transactions);
});
