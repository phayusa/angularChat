  app.directive('formDirective',function()
    {
      return{
          restrict: 'E',
          scope: {
            name: '=',
            submit: '&',
            buttons: '=',
            submitText: '='
          },
          templateUrl: 'template/form.html'

      }
  });
