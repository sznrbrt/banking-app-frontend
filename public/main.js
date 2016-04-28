'use strict';

var app = angular.module('myApp', []);

app.controller('mainCtrl', function($scope) {

  $scope.transactions = [];

  getBalance();

  $scope.addEntry = () => {
    var newTransaction = {
      "date": $scope.date,
      "description": $scope.description,
      "note": $scope.note,
      "dr": 0,
      "cr": 0,
      "entry": $scope.entry
    };
    console.log($scope.entry === 'Credit');
    if($scope.entry === 'Credit'){
      newTransaction.cr = $scope.entryValue;
      newTransaction.dr = 0;
      $scope.transactions.push(newTransaction);
      var newTransaction = {};
    } else {
      newTransaction.cr = 0;
      newTransaction.dr = $scope.entryValue;
      $scope.transactions.push(newTransaction);
      var newTransaction = {};
    }

    getBalance();
  }

  $scope.clearInput = ()=>{
    $scope.note = "";
    $scope.description = "";
    $scope.date = undefined;
    $scope.entryValue = 0;
  }

  $scope.deleteEntry = (transaction) => {
    var index = $scope.transactions.indexOf(transaction);
    $scope.transactions.splice(index, 1);

    getBalance();
  };

  $scope.openEditEntry = (transaction) => {
    $('.modal').modal('show');

    var index = $scope.transactions.indexOf(transaction);
    var underEdit = $scope.transactions[index];

    $scope.modalDescription = underEdit.description;
    $scope.modalDate = underEdit.date;
    $scope.modalEntry = underEdit.entry;
    $scope.modalEntryValue = underEdit.cr || underEdit.dr;
    $scope.modalNote = underEdit.note;
    $scope.underEditIndex = index;
  };

  $scope.editEntry = () => {
    var index = $scope.underEditIndex;
    var edited = {};
    edited.description = $scope.modalDescription;
    edited.date = $scope.modalDate;
    edited.entry = $scope.modalEntry;
    if(edited.entry === 'Debit') {
      edited.dr = $scope.modalEntryValue;
      edited.cr = 0;
    }
    if(edited.entry === 'Credit') {
      edited.cr = $scope.modalEntryValue;
      edited.dr = 0;
    }
    edited.note = $scope.modalNote;
    $scope.transactions[index] = edited;
    $('.modal').modal('hide');
  };

  $scope.sortBy = (order) => {
    if($scope.sortOrder === order) {
      $scope.sortOrder = "-" + order;
    } else {
      $scope.sortOrder = order;
    }
  };

  function getBalance() {
    $scope.totalDebit = $scope.transactions.reduce(function(acc, transaction){
      return acc + transaction.dr;
    }, 0);
    $scope.totalCredit = $scope.transactions.reduce(function(acc, transaction){
      return acc + transaction.cr;
    }, 0);
    $scope.totalBalance = $scope.totalCredit - $scope.totalDebit;
  }

});
