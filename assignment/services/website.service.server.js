
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
    model.websiteModel
    .findAllWebsitesForUser(userId)
    .then(function(websites){
      res.json(websites);
    },
    function(error){
      res.statusCode(400).send(error);
    });

}

function updateWebsite(req,res){

  var websiteId = req.params.websiteId;
  var website = req.body;
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
  model.websiteModel.deleteWebsite(websiteId)
        .then(function(data){
          res.send(200);
        },
        function(error){
          res.statusCode(400).send(error);
        });
}

};