module.exports = function(app){
	var users = [
      {_id: "123", username: "alice",  email:"alice@gmail.com", password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
      {_id: "234", username: "bob",    email:"bob@gmail.com",  password: "bob",      firstName: "Bob",    lastName: "Marley"  },
      {_id: "345", username: "charly",  email:"charly@gmail.com", password: "charly",   firstName: "Charly", lastName: "Garcia"  },
      {_id: "456", username: "jannunzi", email:"jannunzi@gmail.com", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.get('/api/user', findUser);
    app.get('/api/user/:userId',findUserById);
    app.post('/api/user',createUser);
    app.put('/api/user/:userId',updateUser);
    app.delete('/api/user/:userId',deleteUser);


    function findUserByUsername(req,res){
      var user,username;
      username = req.query.username;
      for( var u in users){
          if(users[u].username === username){
            user = users[u];
            res.send(user);
            return;
          }
      }
      res.send('0');
    }

    function findUserByCredentials(req,res){
      var user,username,password;
      username = req.query.username;
      password = req.query.password;
      for( var u in users){
        if(users[u].username === username && users[u].password === password){
            user = users[u];
            res.send(user);
            return;
          }
      }
      res.send('0');
    }

    function findUserById(req,res){
      var userId = req.params.userId;
      for( var u in users){
      if(users[u]._id === userId.toString()){
        user = users[u];
        res.send(user);
      }
    }
   // res.send('0');
    }

    function createUser(req,res){
      var user = req.body;
      var id = (Math.floor(100000 + Math.random() * 900000)).toString();
        id = id.substring(-2);
        user._id = id;
        users.push(user);
        res.send(user._id);
    }

    function updateUser(req,res){

      var user = req.body;
      var userId = req.params.userId;
      for (var u in users){
        if(users[u]._id == userId.toString()){
          users[u] = user;
          res.send(user);
        }
      }
      res.send('0');
    }

    function deleteUser(req,res){
      var userId = req.params.userId;
      for( var u in users){
      if(users[u]._id === userId.toString()){
          users.splice(u,1);
          res.send(200);
      }
    }
    res.send('0');
  }

    

    function findUser(req,res){
    	var query = req.query;
    	if(query.username && query.password){
    		findUserByCredentials(req,res);
    	}
    	else if(query.username){
    		findUserByUsername(req,res);
    	}
    }

    

    
};