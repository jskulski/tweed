'use strict';

/* Controllers */

var app = angular.module('tweed.controllers', []);

function Proofer($scope, Text) {
  $scope.Text = Text;

  $scope.current = function TextCurrent() {
    return Text.current();
  }
}

function Editor($scope, Text) {
  $scope.Text = Text;

  $scope.save = function EditorSave() {
    Text.setText(Text.inEditor);
    debugger;
  }
}