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
	"createWebsite"   : createWebsite,
	"findWebsiteById" : findWebsiteById,
  "findWebsiteByUser" : findWebsiteByUser,
  "updateWebsite" :updateWebsite,
  "deleteWebsite" : deleteWebsite
	};
  return api;

  function createWebsite(userId,website) {
      website.developerId = userId.toString();
      websites.push(website);
  }

  function findWebsiteByUser(userId) {
    var url = "/api/user/"+userId+"/website";
    return $http.get(url);
    // var requiredWebsites=[];
    // for( var w in websites){
    //   if(websites[w].developerId === userId.toString()){
    //     requiredWebsites.push(websites[w]);
    //   }
    // }
    // return requiredWebsites;
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
        websites[w].name = website.name;
        websites[w].description = website.description;
        //console.log(websites[w]);
        break;
      }
    }
  }

  function deleteWebsite(websiteId){
    console.log(websiteId);
    for( var w in websites){
      if(websites[w]._id === websiteId.toString()){
        console.log(websites[w]);
        websites.splice(w,1);
        console.log(websites);
        break;
      }
    }
  }

  
}




})();
