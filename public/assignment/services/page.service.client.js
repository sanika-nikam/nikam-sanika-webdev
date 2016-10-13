(function() {
    angular
      .module("WebAppMaker")
      .factory("PageService", PageService);


function PageService() {

  var pages = [
  { "_id": "321", "name": "Post 1", "websiteId": "456" },
  { "_id": "432", "name": "Post 2", "websiteId": "456" },
  { "_id": "543", "name": "Post 3", "websiteId": "456" }
];


	var api = {
	"createPage"   : "createPage",
	"findPageById" : "findPageById",
  "findPageByWebsiteId" : "findPageByWebsiteId",
  "updatePage" :"updatePage",
  "deletePage" : "deletePage"
	};
  return api;

  function createPage(websiteId,page) {
    if(!page ===  null){
      page.websiteId = websiteId.toString();
      pages.push(page);
    }
  }

  function findPageByWebsiteId(websiteId) {
    var requiredPages;
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
        pages[p] = page;
        break;
      }
    }
  }

  function deletePage(pageId){

    for( var p in pages){
      if(pages[p]._id === pageId.toString()){
        if(p > -1)
          pages.splice(p,1);
        break;
      }
    }
  }

  
}




})();
