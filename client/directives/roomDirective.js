app.directive('roomDirective',function()
  {
    return{
        restrict: 'E',
        scope: {
          room: '=',
          button: '&',
          messagesRoom: '=',
        },
        templateUrl: 'template/room.html',
        controller: function($scope) {
          $scope.sendMessageToChannel = $scope.$eval($scope.button);

        }
    }
});
