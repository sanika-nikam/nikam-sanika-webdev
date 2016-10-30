(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams,PageService) {
    	var vm = this;
       vm.userId = $routeParams.uid;
      vm.websiteId = $routeParams.wid;
     //  vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
     function init(){
        var promise = PageService.findPageByWebsiteId(vm.websiteId);
        promise
          .success(function(pages){
            vm.pages = pages;
          })
          .error(function(){

          })
     }
     init();
    }

    function NewPageController($routeParams,$location,PageService) {
    	var vm = this;
      vm.userId = $routeParams.uid;
      vm.websiteId = $routeParams.wid;
      vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
      vm.createPage = createPage;

      function init(){
        var promise = PageService.findPageByWebsiteId(vm.websiteId);
        promise
          .success(function(pages){
            vm.pages = pages;
          })
          .error(function(){

          })
     }
     init();

      function createPage(websiteId,page){
        var promise = PageService.createPage(websiteId,page);
        promise
          .success(function(websiteId){
            if(websiteId != ''){
              $location.url("/user/"+vm.userId+"/website/"+websiteId+"/page");
            }
          })
          .error(function(){

          });
        // var id = (Math.floor(100000 + Math.random() * 900000)).toString();
        // id = id.substring(-2);
        // page._id = id;
        // PageService.createPage(websiteId,page);
        // vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
      }
    }

   	function EditPageController($routeParams,$location,PageService){
   		var vm = this;
      vm.userId = $routeParams.uid;
      vm.websiteId = $routeParams.wid;
      vm.pageId = $routeParams.pid
      vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
      vm.updatePage = updatePage;
      vm.deletePage = deletePage;

      function init(){
        var promise = PageService.findPageByWebsiteId(vm.websiteId);
        promise
          .success(function(pages){
            vm.pages = pages;
          })
          .error(function(){

          })
     }
     init();

      function updatePage(pid,page){
        var promise = PageService.updatePage(pid,page);
        promise
          .success(function(websiteId){
            if(websiteId != '0'){
              $location.url("/user/"+vm.userId+"/website/"+websiteId+"/page");
            }
           })
          .error(function(){

          });
        // PageService.updatePage(pid,page);
        // vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
      }

      function deletePage(pid){
        var promise = PageService.deletePage(pid);

        promise
          .success(function(websiteId){
            if(websiteId != '0'){
              $location.url("/user/"+vm.userId+"/website/"+websiteId+"/page");
            }
          })
          .error(function(){

          });
        // PageService.deletePage(pid);
        // vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
      }

   	}
   	
})();