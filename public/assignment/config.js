(function(){
angular
	.module('WebAppMaker')
	.config(Config);

function Config($routeProvider,$httpProvider){
	$routeProvider
		.when('/admin',{
			templateUrl : "/assignment/views/admin/user-list.view.client.html",
			controller : "LoginController",
			controllerAs : "model",
			resolve : {
				checkAdmin : checkAdmin
			}
		})
		.when('/login',{
			templateUrl : "/assignment/views/user/login.view.client.html",
			controller : "LoginController",
			controllerAs : "model"
		})
		.when('/register',{
			templateUrl : "/assignment/views/user/register.view.client.html",
			controller : "RegisterController",
			controllerAs : "model"
		})
		.when('/user/:uid',{
			templateUrl : "/assignment/views/user/profile.view.client.html",
			controller : "ProfileController",
			controllerAs : "model",
			resolve : {
				checkLogin: checkLogin
			}
		})
		.when('/user',{
			templateUrl : "/assignment/views/user/profile.view.client.html",
			controller : "ProfileController",
			controllerAs : "model",
			/*resolve : {
				checkLogin : checkLogin
			}*/
		})
		.when('/user/:uid/website',{
			templateUrl : "/assignment/views/website/website-list.view.client.html",
			controller : "WebsiteListController",
			controllerAs : "model"
		})
		.when('/user/:uid/website/new',{
			templateUrl : "/assignment/views/website/website-new.view.client.html",
			controller : "NewWebsiteController",
			controllerAs : "model"
		})
		.when('/user/:uid/website/:wid',{
			templateUrl : "/assignment/views/website/website-edit.view.client.html",
			controller : "EditWebsiteController",
			controllerAs : "model"
		})
		.when('/user/:uid/website/:wid/page',{
			templateUrl : "/assignment/views/page/page-list.view.client.html",
			controller : "PageListController",
			controllerAs : "model"
		})
		.when('/user/:uid/website/:wid/page/new',{
			templateUrl : "/assignment/views/page/page-new.view.client.html",
			controller : "NewPageController",
			controllerAs : "model"
		})
		.when('/user/:uid/website/:wid/page/:pid',{
			templateUrl : "/assignment/views/page/page-edit.view.client.html",
			controller : "EditPageController",
			controllerAs : "model"
		})
		.when('/user/:uid/website/:wid/page/:pid/widget',{
			templateUrl : "/assignment/views/widget/widget-list.view.client.html",
			controller : "WidgetListController",
			controllerAs : "model"
		})
		.when('/user/:uid/website/:wid/page/:pid/widget/new',{
			templateUrl : "/assignment/views/widget/widget-chooser.view.client.html",
			controller : "NewWidgetController",
			controllerAs : "model"
		})
		.when('/user/:uid/website/:wid/page/:pid/widget/:wgid',{
			templateUrl : "/assignment/views/widget/widget-edit.view.client.html",
			controller : "EditWidgetController",
			controllerAs : "model"
		})
		.otherwise({
			redirectTo : "/login"
		});

		function checkLogin($q, UserService, $location) {

            var deferred = $q.defer();

            UserService
                .checkLogin()
                .success(
                    function (user) {
                        if(user != '0') {
                            deferred.resolve();
                        }
                        else {
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );

            return deferred.promise;
        }

		function checkAdmin($q, UserService, $location) {

            var deferred = $q.defer();

            UserService
                .checkAdmin()
                .success(
                    function (user) {
                        if(user != '0') {
                            deferred.resolve();
                        }
                        else {
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );

            return deferred.promise;
        }


}

})();