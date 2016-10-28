module.exports = function(app){

var websites = [
  { "_id": "123", "name": "Facebook",    "developerId": "456" },
  { "_id": "234", "name": "Tweeter",     "developerId": "456" },
  { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
  { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
  { "_id": "678", "name": "Checkers",    "developerId": "123" },
  { "_id": "789", "name": "Chess",       "developerId": "234" }
];

app.get('/api/user/:userId/website',findAllWebsitesForUser);

function findAllWebsitesForUser(req,res){
	var requiredWebsites=[];
	var userId = req.params.userId;
    for( var w in websites){
      if(websites[w].developerId === userId.toString()){
        requiredWebsites.push(websites[w]);
      }
    }
    res.json(requiredWebsites);
}
};