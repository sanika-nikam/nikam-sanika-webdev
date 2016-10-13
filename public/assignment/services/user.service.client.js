(function() {
    angular
      .module("WebAppMaker")
      .factory("UserService", UserService);


function UserService() {
  var users = [
{_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
{_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
{_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
{_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

	var api = {
	"createUser"   : "createUser",
	"findUserById" : "findUserById",
  "findUserByUsername" : "findUserByUsername",
  "findUserByCredentials" :"findUserByCredentials",
  "updateUser" :"updateUser",
  "deleteUser" : "deleteUser"
	};
  return api;

  function createUser(user) {
    if(!user ===  null){
      users.push(user);
    }
  }

  function findUserById(id) {
    var user;
    for( var u in users){
      if(users[u]._id === id.toString()){
        user = users[u];
        break;
      }
    }
    return user;
  }

  function findUserByUsername(username){
    var user;
    for( var u in users){
      if(users[u].username === username){
        user = users[u];
        break;
      }
    }
    return user;
  }

  function findUserByCredentials(username,password){
    var user;
    for( var u in users){
      if(users[u].username === username && users[u].password === password){
        user = users[u];
        break;
      }
    }
    return user;
  }

  function updateUser(userId,user){

    for( var u in users){
      if(users[u]._id === user._id){
        users[u] = user;
        break;
      }
    }
  }

  function deleteUser(userId){

    for( var u in users){
      if(users[u]._id === userId.toString()){
        if(u > -1)
          users.splice(u,1);
        break;
      }
    }
  }

  
}




})();