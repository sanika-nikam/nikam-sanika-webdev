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
            var user = UserService.findUserByCredentials(username,password);
            //console.log([username,password]);
            if(user){
                $location.url("user/" + user._id);
            }
            else{
                vm.alert = "Unable to login";
            }
        }
    }

   function RegisterController($location,UserService) {
    	var vm = this;
        vm.register = register;

        function register(user){
            if(user){
                //user._id = "897"
                UserService.createUser(user);

                //var createdUser = UserService.findUserById(userId.substring(2,4))
                $location.url("/user/" + user._id);

            }
            else{
                vm.alert = "Please try again";
            }
            
        }
    }

    function ProfileController($routeParams,UserService) {
    	var vm = this;
        vm.userId = $routeParams.uid;
        function init() {
            vm.user = UserService.findUserById(vm.userId);

        }
        init();
    }

})();