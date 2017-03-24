app.directive('roomDirective',function()
  {
    return{
        restrict: 'E',
        scope: {
          room: '=',
          button: '&',
          connect: '&',
        },
        templateUrl: 'template/room.html',
        controller: function($scope) {
          $scope.connectChannelFromRoom = $scope.$eval($scope.connect);
          $scope.sendMessageToChannel = $scope.$eval($scope.button);

        }
    }
});
