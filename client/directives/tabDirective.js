app.directive("tabDirective", function ()
{
    return{
        restrict: 'E',
        scope: {
          headers:'=headers',
          data: '=data',
          headToFilter: '=filter',
          buttons: '=buttons'
        },
        // transclude = true,
        // controller:function($scope,$sce){
        //   $scope.getButton = function(button){
        //     var htmlButton = '<input type="'+button["type"]+'" ng-click="'+button["ng-click"]+'" value="'+button["value"]+'">';
        //     return $sce.trustAsHtml(htmlButton);
        //   };
        // },
        templateUrl: 'templates/tabCustom.html'

    }
});
