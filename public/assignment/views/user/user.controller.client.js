(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location,$scope,$rootScope,UserService) {
    	var vm = this;
        vm.login = login;


        function login(username,password){
         
                if(!$scope.login.$invalid){
                var promise = UserService.login(username,password);
                promise
                .success(function(user){
                    console.log("In success");
                    if(user === '0'){
                        vm.alert = "No such user";
                    }
                    else{
                        $rootScope.currentUser = user;
                        $location.url("user/" + user._id);
                    }
                })
                .error(function(){
                    console.log("in error");
                    vm.alert = "No such user";
                });
            }
                
            
        }
    }

   function RegisterController($location,$scope,$rootScope,UserService) {
    	var vm = this;
        vm.createUser = createUser;
  
        console.log("Reached controller with ng submit");
        function createUser(user){

            if(!$scope.register.$invalid && vm.user.password == vm.user.confirmPassword){
                // if(user.password == user.verifyPassword){
                     console.log("going to execute register");
               UserService.register(user)
                .success(function(user){
                    $rootScope.currentUser = user;
                    $location.url("/user/"+ user._id);
                });
               
            }
            else{
                vm.verifyAlert = "Password and verify password must match";
            }
            
             
    
        }


        
    }

    function ProfileController($routeParams,$location,UserService) {
    	var vm = this;
        vm.logout = logout;

       // vm.userId = $routeParams.uid;
        function init() {
           // vm.user = UserService.findUserById(vm.userId);
           var promise = UserService.findCurrentUser();
           //.findUserById(vm.userId);
           promise
            .success(function(user){
                if(user != '0'){
                    console.log(user);
                    vm.user = user;

                }
            })
            .error(function(){

            });
        }
        init();

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function updateUser(){
            var promise = UserService.updateUser(vm.user);
            promise
                .success(function(user){
                    if(user != '0'){
                        console.log("form update controller");
                        console.log(user);
                        //vm.user = user;
                        $location.url("user/" + vm.user._id);

                    }
                    
                })
                .error(function(){

                });
            
        }

        function deleteUser(){
            var promise = UserService.deleteUser(vm.user._id);

            promise
                .success(function(response){
                    console.log(typeof (response));
                    console.log(response);
                    if(response == 'OK'){
                        $location.url("/login");
                    }
                })
                .error(function(){

                });


        }

        function logout(){
            UserService.logout()
                .success(function(){
                    //$rootScope.currentUser = null;
                    $location.url("/login");
                });
        }
    }

})();