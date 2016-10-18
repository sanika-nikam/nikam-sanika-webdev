(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        //.controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams,WidgetService,$sce) {
    	var vm = this;
      vm.userId = $routeParams.uid;
      vm.websiteId = $routeParams.wid;
      vm.pageId = $routeParams["pid"];
      vm.checkSafeHtml = checkSafeHtml;
      vm.checkSafeYoutubeUrl = checkSafeYoutubeUrl;
      vm.checkSafeImageUrl = checkSafeImageUrl;

      function init(){
        vm.widgets = WidgetService.findWidgetByPageId(vm.pageId);
        //console.log(vm.widgets);
      }
      init();

      function checkSafeHtml(html){
        return $sce.trustAsHtml(html);
      }

      function checkSafeYoutubeUrl(url){
        var parts = url.split('/');

        var id = parts[parts.length-1];

        console.log(id);

        url = "https://www.youtube.com/embed/"+id;

        console.log(url);

        return $sce.trustAsResourceUrl(url);
      }

      function checkSafeImageUrl(url){
        return $sce.trustAsResourceUrl(url);
      }
    }

    /*function NewWidgetController() {
    	var vm = this;
    }*/

   	function EditWidgetController($routeParams,WidgetService){
   		var vm = this;
      vm.userId = $routeParams.uid;
      vm.websiteId = $routeParams.wid;
      vm.pageId = $routeParams["pid"];
      vm.widgetId = $routeParams.wgid;
      function init(){
        vm.widgets = WidgetService.findWidgetByPageId(vm.pageId);
        //console.log(vm.widgets);
      }
      init();
   	}
   	
})();