(function() {
    angular
      .module("WebAppMaker")
      .factory("PageService", PageService);


function PageService() {

  var pages = [
  { "_id": "321", "name": "Post 1", "websiteId": "456" ,"description": "Lorem"},
  { "_id": "432", "name": "Post 2", "websiteId": "456","description": "Lorem" },
  { "_id": "543", "name": "Post 3", "websiteId": "456","description": "Lorem" },
  { "_id": "323", "name": "Post 1", "websiteId": "234","description": "Lorem"},
  { "_id": "4322", "name": "Post 2", "websiteId": "234","description": "Lorem"},
  { "_id": "5431", "name": "Post 3", "websiteId": "234","description": "Lorem"},
  { "_id": "3221", "name": "Post 1", "websiteId": "567","description": "Lorem" },
  { "_id": "4312", "name": "Post 2", "websiteId": "567","description": "Lorem"},
  { "_id": "5453", "name": "Post 3", "websiteId": "567","description": "Lorem" }

];


	var api = {
	"createPage"   : createPage,
	"findPageById" : findPageById,
  "findPageByWebsiteId" : findPageByWebsiteId,
  "updatePage" :updatePage,
  "deletePage" : deletePage
	};
  return api;

  function createPage(websiteId,page) {
    
      page.websiteId = websiteId.toString();
      console.log(page);
      pages.push(page);
    
  }

  function findPageByWebsiteId(websiteId) {
    var requiredPages=[];
    for( var p in pages){
      if(pages[p].websiteId === websiteId.toString()){
        requiredPages.push(pages[p]);
      }
    }
    return requiredPages;
  }

  function findPageById(pageId){
    var page;
    for( var p in pages){
      if(pages[p]._id === pageId.toString()){
        page = pages[w];
        break;
      }
    }
    return page;
  }

  function updatePage(pageId,page){

    for( var p in pages){
      if(pages[p]._id === pageId.toString()){
        pages[p].name = page.name;
        pages[p].description = page.description;
        break;
      }
    }
  }

  function deletePage(pageId){

    for( var p in pages){
      if(pages[p]._id === pageId.toString()){
        pages.splice(p,1);
        break;
      }
    }
  }

  
}




})();
