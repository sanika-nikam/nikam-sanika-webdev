(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
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
        var promise = WidgetService.findWidgetByPageId(vm.pageId);

        promise
          .success(function(widgets){
            vm.widgets = widgets;

          })
          .error(function(){

          });
      }
      init();

      function checkSafeHtml(html){
        return $sce.trustAsHtml(html);
      }

      function checkSafeYoutubeUrl(url){
        var parts = url.split('/');

        var id = parts[parts.length-1];

       

        url = "https://www.youtube.com/embed/"+id;

       

        return $sce.trustAsResourceUrl(url);
      }

      function checkSafeImageUrl(url){
        return $sce.trustAsResourceUrl(url);
      }
    }

    function NewWidgetController($routeParams,$location,WidgetService) {
    	var vm = this;
      vm.userId = $routeParams.uid;
      vm.websiteId = $routeParams.wid;
      vm.pageId = $routeParams["pid"];
      vm.createWidget = createWidget;

      function init(){
        var promise = WidgetService.findWidgetById(vm.widgetId);

        promise
          .success(function(widget){
            if(widget != '0'){
              vm.widget = widget;
            }
            
          })
          .error(function(){

          });
      }
      init();

      function createWidget(widget){
        console.log("From create widget controller");
        console.log(widget);
        var promise = WidgetService.createWidget(vm.pageId,widget);

        promise
          .success(function(widget){
            if(widget != null){
              console.log(widget);
              $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+widget._page+"/widget/"+ widget._id);
            }
          })
          .error(function(){

          });
      }

     
    }

   	function EditWidgetController($routeParams,WidgetService,$location,$scope){
      var vm = this;
      vm.userId = $routeParams.uid;
      vm.websiteId = $routeParams.wid;
      vm.pageId = $routeParams["pid"];
      vm.widgetId = $routeParams.wgid;

      vm.updateWidget = updateWidget;
      vm.deleteWidget = deleteWidget;

      function init(){
        var promise = WidgetService.findWidgetById(vm.widgetId);

        promise
          .success(function(widget){
            if(widget != '0'){
              console.log("from controller");
              console.log(widget);
              vm.widget = widget;
            }
            
          })
          .error(function(){

          });
      }
      init();
      
      function updateWidget(widgetId,widget){
        console.log("In update widget controller");
        console.log(vm.widget.name);
       /* if($scope.widgetName.$invalid){
          vm.alert = "Name is required";
        }*/
        if(vm.widget == undefined){
          console.log("entered undefined checks");
            vm.alert = "Name is required";
          
        }
        else if(!vm.widget.name){
          console.log("entered name null check");
            vm.alert = "Name is required";
        }
        else{

          console.log("entered else");
        var promise = WidgetService.updateWidget(widgetId,widget);

        promise
          .success(function(pageId){
            if(pageId != '0'){
              $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
          })
          .error(function(){

          });
        }
      }

      function deleteWidget(widgetId){
        var promise = WidgetService.deleteWidget(widgetId);

        promise
          .success(function(pageId){
            if(pageId != '0'){
              $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
          })
          .error(function(){

          });
      }

   	}
   	
})();