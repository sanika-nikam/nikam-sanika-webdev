
module.exports = function(app,model){

var websites = [
  { "_id": "123", "name": "Facebook",    "developerId": "456" },
  { "_id": "234", "name": "Tweeter",     "developerId": "456" },
  { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
  { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
  { "_id": "678", "name": "Checkers",    "developerId": "123" },
  { "_id": "789", "name": "Chess",       "developerId": "234" }
];

app.get('/api/user/:userId/website',findAllWebsitesForUser);
app.post('/api/user/:userId/website',createWebsite);
app.get('/api/website/:websiteId',findWebsiteById);
app.put('/api/website/:websiteId',updateWebsite);
app.delete('/api/website/:websiteId',deleteWebsite);

function findWebsiteById(req,res){
var website;
var websiteId = req.params.websiteId;
    // for( var w in websites){
    //   if(websites[w]._id === websiteId.toString()){
    //     website = websites[w];
    //     res.send(website);
    //   }
    // }
    //res.send('0');
    model.websiteModel.findWebsiteById(websiteId)
          .then(function(website){
            res.send(website);
          },
          function(error){
            res.statusCode(400).send(error);
          });
}

function createWebsite(req,res){
  var website = req.body;
  var userId = req.params.userId;
  // var id = (Math.floor(100000 + Math.random() * 900000)).toString();
  // id = id.substring(-2);
  // website._id = id;
  // website.developerId = userId;
  // websites.push(website);
  model.websiteModel.createWebsiteForUser(userId,website)
                    .then(function(website){
                      console.log("Create website");
                      console.log(website);
                      res.json(website);
                    },
                    function(error){
                      res.statusCode(400).send(error);
                    });
  
}

function findAllWebsitesForUser(req,res){
	var requiredWebsites=[];
	var userId = req.params.userId;
    // for( var w in websites){
    //   if(websites[w].developerId === userId.toString()){
    //     requiredWebsites.push(websites[w]);
    //   }
    // }
    model.websiteModel
    .findAllWebsitesForUser(userId)
    .then(function(websites){
      res.json(websites);
    },
    function(error){
      res.statusCode(400).send(error);
    });

    

    //res.json(requiredWebsites);
}

function updateWebsite(req,res){

  var websiteId = req.params.websiteId;
  var website = req.body;
  // for( var w in websites){
  //     if(websites[w]._id == websiteId.toString()){
  //        websites[w].name = website.name;
  //        websites[w].description = website.description;
  //       res.send(websites[w].developerId);
  //     }
  //   }
  //   res.send('0');
  model.websiteModel.updateWebsite(websiteId,website)
        .then(function(data){
          res.send(200);
        },
        function(error){
          res.statusCode(400).send(error);
        });
}

function deleteWebsite(req,res){
  var websiteId = req.params.websiteId;
  // for( var w in websites){
  //     if(websites[w]._id === websiteId.toString()){
  //       console.log(websites[w]);
  //       var developerId = websites[w].developerId;
  //       websites.splice(w,1);
  //       res.send(developerId);
  //     }
  //   }
  //   res.send('0');
  model.websiteModel.deleteWebsite(websiteId)
        .then(function(data){
          res.send(200);
        },
        function(error){
          res.statusCode(400).send(error);
        });
}

};