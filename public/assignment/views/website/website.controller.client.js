(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams,WebsiteService) {
    	var vm = this;
      //var userId = $routeParams.uid;
      vm.userId = $routeParams.uid;
      //console.log(vm.userId);
      vm.websites = WebsiteService.findWebsiteByUser(vm.userId);

    }

    function NewWebsiteController($routeParams,$location,WebsiteService) {
    	var vm = this;
      vm.userId = $routeParams.uid;
      vm.websiteId = $routeParams.wid;
      vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
      vm.create = create;

      function create(userId,website){
        var id = (Math.floor(100000 + Math.random() * 900000)).toString();
        id = id.substring(-2);
        website._id = id;
        WebsiteService.createWebsite(userId,website);
        vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
        $location.url("/user/"+vm.userId+"/website");
      }
    }

   	function EditWebsiteController($routeParams,$location,WebsiteService){
   		var vm = this;
      vm.userId = $routeParams.uid;
      vm.websiteId = $routeParams.wid;
      vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
      vm.update = update;
      vm.deleteWebsite = deleteWebsite;

      function update(wid,website){
        WebsiteService.updateWebsite(wid,website);
        vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
        $location.url("/user/"+vm.userId+"/website");
      }

      function deleteWebsite(wid){
        WebsiteService.deleteWebsite(wid);
        vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
        $location.url("/user/"+vm.userId+"/website");
      }

      //vm.editWebsite = editWebsite;

      /*function editWebsite(userId,wid){
        console.log("inside edit website function");
        var website = WebsiteService.findWebsiteById(wid);
        if(website){
          $location.url("/user/" + userId + "/website" + wid);
      }

      }*/

      
      
   	}
   	
})();