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
            for(var w in vm.widgets){
              console.log(vm.widgets[w]);
            }
          })
          .error(function(){

          });

          //var widgets = $(".gizmodo").sortable();
      }
      init();

      function checkSafeHtml(html){
        return $sce.trustAsHtml(html);
      }

      function checkSafeYoutubeUrl(url){
        var parts = url.split('/');

        var id = parts[parts.length-1];

        //console.log(id);

        url = "https://www.youtube.com/embed/"+id;

        //console.log(url);

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
      //vm.widgetId = $routeParams.wgid;
      vm.createWidget = createWidget;
      //vm.widgets = WidgetService.findWidgetByPageId(vm.pageId);
      //console.log("First " + vm.widgets.length);

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
        var promise = WidgetService.createWidget(vm.pageId,widget);

        promise
          .success(function(widget){
            if(widget != null){
              $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+widget.pageId+"/widget/"+ widget._id);
            }
          })
          .error(function(){

          });
        // var id = (Math.floor(100000 + Math.random() * 900000)).toString();
        // id = id.substring(-2);
        // widget._id = id;
        // console.log("in create widget controller "+ widget.widgetType);
        // WidgetService.createWidget(vm.pageId,widget);
        // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+ widget._id);
      }

      //function init(){
        //vm.widgets = WidgetService.findWidgetByPageId(vm.pageId);

        //console.log(vm.widgets);
      //}
      //init();
    }

   	function EditWidgetController($routeParams,WidgetService,$location){
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
              vm.widget = widget;
            }
            
          })
          .error(function(){

          });
      }
      init();
      
      function updateWidget(widgetId,widget){
        console.log("In update widget controller");
        var promise = WidgetService.updateWidget(widgetId,widget);

        promise
          .success(function(pageId){
            if(pageId != '0'){
              $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+pageId+"/widget");
            }
          })
          .error(function(){

          });
      //   console.log("In update widget" + widgetId + " " + widget.widgetType);
      //   WidgetService.updateWidget(widgetId,widget);
      //   vm.widget = WidgetService.findWidgetById(vm.widgetId);
      //   vm.widgets=WidgetService.findWidgetByPageId(vm.pageId);
      //   for (var i in vm.widgets){
      //     console.log("Printing " + vm.widgets[i]._id);
      //   }
        
      //   $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
      }

      function deleteWidget(widgetId){
        var promise = WidgetService.deleteWidget(widgetId);

        promise
          .success(function(pageId){
            if(pageId != '0'){
              $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+pageId+"/widget");
            }
          })
          .error(function(){

          });
        // WidgetService.deleteWidget(widgetId);
        // vm.widgets=WidgetService.findWidgetByPageId(vm.pageId);
        // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
      }

   	}
   	
})();