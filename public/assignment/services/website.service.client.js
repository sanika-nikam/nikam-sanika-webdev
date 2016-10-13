(function() {
    angular
      .module("WebAppMaker")
      .factory("WebsiteService", WebsiteService);


function WebsiteService() {

  var websites = [
  { "_id": "123", "name": "Facebook",    "developerId": "456" },
  { "_id": "234", "name": "Tweeter",     "developerId": "456" },
  { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
  { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
  { "_id": "678", "name": "Checkers",    "developerId": "123" },
  { "_id": "789", "name": "Chess",       "developerId": "234" }
];


	var api = {
	"createWebsite"   : "createWebsite",
	"findWebsiteById" : "findWebsiteById",
  "findWebsiteByUser" : "findWebsiteByUser",
  "updateWebsite" :"updateWebiste",
  "deleteWebsite" : "deleteWebsite"
	};
  return api;

  function createWebsite(userId,website) {
    if(!website ===  null){
      website.developerId = userId.toString();
      websites.push(website);
    }
  }

  function findWebsiteByUser(userId) {
    var requiredWebsites;
    for( var w in websites){
      if(websites[w].developerId === userId.toString()){
        requiredWebsites.push(websites[w]);
      }
    }
    return requiredWebsites;
  }

  function findWebsiteById(websiteId){
    var website;
    for( var w in websites){
      if(websites[w]._id === websiteId.toString()){
        website = websites[w];
        break;
      }
    }
    return website;
  }

  function updateWebsite(websiteId,website){

    for( var w in websites){
      if(websites[w]._id === websiteId.toString()){
        websites[w] = website
        break;
      }
    }
  }

  function deleteWebsite(websiteId){

    for( var w in websites){
      if(websites[w]._id === websiteId.toString()){
        if(w > -1)
          websites.splice(w,1);
        break;
      }
    }
  }

  
}




})();
