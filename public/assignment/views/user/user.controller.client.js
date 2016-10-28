(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location,UserService) {
    	var vm = this;
        vm.login = login;
        function login(username,password){
            var promise = UserService.findUserByCredentials(username,password);
            promise
                .success(function(user){
                    if(user === '0'){
                        vm.alert = "No such user";
                    }
                    else{
                        $location.url("user/" + user._id);
                    }
                })
                .error(function(){

                });
            // var user = UserService.findUserByCredentials(username,password);
            // //console.log([username,password]);
            // if(user){
            //     $location.url("user/" + user._id);
            // }
            // else{
            //     vm.alert = "No such user";
            // }
        }
    }

   function RegisterController($location,UserService) {
    	var vm = this;
        vm.createUser = createUser;

        function createUser(user){
            UserService
                .createUser(user)
                .success(function(userId){
                    $location.url("user/" + userId);
                })
                .error(function(){

                });
            // var id = (Math.floor(100000 + Math.random() * 900000)).toString();
            // id = id.substring(-2);
            // user._id = id;
            
            // UserService.createUser(user);
            // var newUser = UserService.findUserByCredentials(user.username,user.password);
            // $location.url("user/" + newUser._id);

        }

        
    }

    function ProfileController($routeParams,$location,UserService) {
    	var vm = this;
        vm.userId = $routeParams.uid;
        function init() {
           // vm.user = UserService.findUserById(vm.userId);
           var promise = UserService.findUserById(vm.userId);
           promise
            .success(function(user){
                if(user != '0'){
                    console.log(user);
                    console.log(user.email);
                    vm.user = user;

                }
            })
            .error(function(){

            });
        }
        init();

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function updateUser(userId,user){
            // UserService.updateUser(userId,user);
            // vm.user = UserService.findUserById(userId);
            
            var promise = UserService.updateUser(userId,user);
            promise
                .success(function(user){
                    if(user != '0'){
                        vm.user = user;

                    }
                    
                })
                .error(function(){

                });
            
        }

        function deleteUser(userId){
            // console.log("in delete user controler");
            // UserService.deleteUser(userId);
            // $location.url("/login");
            var promise = UserService.deleteUser(userId);

            promise
                .success(function(response){
                    if(response == 'OK'){
                        $location.url("/login");
                    }
                })
                .error(function(){

                });


        }
    }

})();