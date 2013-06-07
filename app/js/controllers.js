'use strict';

/* Controllers */

var app = angular.module('tweed.controllers', []);

function Proofer($scope, Text) {
  $scope.Text = Text;
}

function Editor($scope, Text) {
  $scope.Text = Text;
}