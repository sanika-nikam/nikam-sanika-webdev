(function() {
    angular
      .module("WebAppMaker")
      .factory("UserService", UserService);


  function UserService() {
    var users = [
      {_id: "123", username: "alice",  email:"alice@gmail.com", password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
      {_id: "234", username: "bob",    email:"bob@gmail.com",  password: "bob",      firstName: "Bob",    lastName: "Marley"  },
      {_id: "345", username: "charly",  email:"charly@gmail.com", password: "charly",   firstName: "Charly", lastName: "Garcia"  },
      {_id: "456", username: "jannunzi", email:"jannunzi@gmail.com", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

	   var api = {
	     "createUser"   : createUser,
	     "findUserById" : findUserById,
       "findUserByUsername" : findUserByUsername,
       "findUserByCredentials" :findUserByCredentials,
       "updateUser" :updateUser,
       "deleteUser" : deleteUser
	   };
    return api;

  function createUser(user) {
   
      users.push(user);
    
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
        users[u].username = user.username;
        users[u].email = user.email;
        users[u].firstName =user.firstname;
        users[u].lastName =user.lastName;
       
        break;
      }
    }
  }

  function deleteUser(userId){

    for( var u in users){
      if(users[u]._id === userId.toString()){
          console.log("deleting user "+ users[u]);
          users.splice(u,1);
        break;
      }
    }
  }

  
}




})();
