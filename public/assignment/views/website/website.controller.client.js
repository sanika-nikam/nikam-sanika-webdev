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
      function init(){
        var promise = WebsiteService.findWebsiteByUser(vm.userId);

      promise
        .success(function(websites){
          vm.websites = websites;
        })
        .error(function(){

        });
      }
      init();
      
      //vm.websites = WebsiteService.findWebsiteByUser(vm.userId);

    }

    function NewWebsiteController($routeParams,$location,WebsiteService) {
    	var vm = this;
      vm.userId = $routeParams.uid;
      vm.websiteId = $routeParams.wid;
      //vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
      vm.create = create;

      function init(){
        var promise = WebsiteService.findWebsiteByUser(vm.userId);
        promise
        .success(function(websites){
          vm.websites = websites;
        })
        .error(function(){

        });
      }
      init();

      function create(userId,website){
        // var id = (Math.floor(100000 + Math.random() * 900000)).toString();
        // id = id.substring(-2);
        // website._id = id;
        console.log("In create controller function");
        var promise = WebsiteService.createWebsite(userId,website);
        promise
          .success(function(userId){
            $location.url("/user/"+userId+"/website");
          })
          .error(function(){

          });
        //vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
        
      }
    }

   	function EditWebsiteController($routeParams,$location,WebsiteService){
   		var vm = this;
      vm.userId = $routeParams.uid;
      vm.websiteId = $routeParams.wid;
      //vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
      vm.update = update;
      vm.deleteWebsite = deleteWebsite;

      function init(){
        var promise = WebsiteService.findWebsiteByUser(vm.userId);

      promise
        .success(function(websites){
          vm.websites = websites;
        })
        .error(function(){

        });
      }
      init();

      function update(wid,website){
        var promise = WebsiteService.updateWebsite(wid,website);
        promise
          .success(function(userId){
            if(userId != '0'){
              //console.log("In update controller"+ userId);
              $location.url("/user/"+userId+"/website");
            }
          })
          .error(function(){

          });
        // WebsiteService.updateWebsite(wid,website);
        // vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
        // $location.url("/user/"+vm.userId+"/website");
      }

      function deleteWebsite(wid){
        var promise = WebsiteService.deleteWebsite(wid);
        promise
          .success(function(userId){
            if(userId != '0'){
              $location.url("/user/"+userId+"/website");
            }
          })
          .error(function(){

          });
        
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