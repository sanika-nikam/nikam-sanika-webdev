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
      vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
    }

    function NewPageController($routeParams,$location,PageService) {
    	var vm = this;
      vm.userId = $routeParams.uid;
      vm.websiteId = $routeParams.wid;
      vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
      vm.createPage = createPage;

      function createPage(websiteId,page){
        var id = (Math.floor(100000 + Math.random() * 900000)).toString();
        id = id.substring(-2);
        page._id = id;
        PageService.createPage(websiteId,page);
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
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

      function updatePage(pid,page){
        PageService.updatePage(pid,page);
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
      }

      function deletePage(pid){
        PageService.deletePage(pid);
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
      }

   	}
   	
})();