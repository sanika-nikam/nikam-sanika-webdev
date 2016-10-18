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
                vm.alert = "No such user";
            }
        }
    }

   function RegisterController($location,UserService) {
    	var vm = this;
        vm.createUser = createUser;

        function createUser(user){
            var id = (Math.floor(100000 + Math.random() * 900000)).toString();
            id = id.substring(-2);
            user._id = id;
            
            UserService.createUser(user);
            var newUser = UserService.findUserByCredentials(user.username,user.password);
            $location.url("user/" + newUser._id);

        }

        
    }

    function ProfileController($routeParams,$location,UserService) {
    	var vm = this;
        vm.userId = $routeParams.uid;
        function init() {
            vm.user = UserService.findUserById(vm.userId);

        }
        init();
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function updateUser(userId,user){
            UserService.updateUser(userId,user);
            vm.user = UserService.findUserById(userId);
        }

        function deleteUser(userId){
            console.log("in delete user controler");
            UserService.deleteUser(userId);
            $location.url("/login");

        }
    }

})();