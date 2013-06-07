'use strict';

/* Controllers */

var app = angular.module('tweed.controllers', []);

function Proofer($scope, Text) {
  $scope.Text = Text;

  $scope.next = function() {

  }

  $scope.prev = function() {

  }
}

function Editor($scope, Text) {
  $scope.Text = Text;
}