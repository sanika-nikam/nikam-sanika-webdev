module.exports = function(app){
	 var pages = [
  { "_id": "321", "name": "Post 1", "websiteId": "456" ,"description": "Lorem"},
  { "_id": "432", "name": "Post 2", "websiteId": "456","description": "Lorem" },
  { "_id": "543", "name": "Post 3", "websiteId": "456","description": "Lorem" },
  { "_id": "323", "name": "Post 1", "websiteId": "234","description": "Lorem"},
  { "_id": "4322", "name": "Post 2", "websiteId": "678","description": "Lorem"},
  { "_id": "5431", "name": "Post 3", "websiteId": "234","description": "Lorem"},
  { "_id": "3221", "name": "Post 1", "websiteId": "567","description": "Lorem" },
  { "_id": "4312", "name": "Post 2", "websiteId": "789","description": "Lorem"},
  { "_id": "5453", "name": "Post 3", "websiteId": "567","description": "Lorem" }

];
	app.post('/api/website/:websiteId/page', createPage);
	app.get('/api/website/:websiteId/page',findAllPagesForWebsite);
	app.get('/api/page/:pageId', findPageById);
	app.put('/api/page/:pageId', updatePage);
	app.delete('/api/page/:pageId', deletePage);

	function createPage(req,res){
		var page =req.body;
		var websiteId = req.params.websiteId;
		var id = (Math.floor(100000 + Math.random() * 900000)).toString();
        id = id.substring(-2);
        page._id = id;
        page.websiteId = websiteId;
        pages.push(page);
        res.send(websiteId);
	}

	function findAllPagesForWebsite(req,res){
		var websiteId = req.params.websiteId;
		var requiredPages=[];
    	for( var p in pages){
    		if(pages[p].websiteId === websiteId.toString()){
        	  requiredPages.push(pages[p]);
      		}
    	}
    	res.json(requiredPages);

	}

	function findPageById(req,res){
		var pageId = req.params.pageId;
		var page;
    	for( var p in pages){
      		if(pages[p]._id === pageId.toString()){
        		page = pages[w];
        		res.send(page);
      		}
    	}
    	res.send ('0');
	}

	function updatePage(req,res){
		var page = req.body;
		var pageId = req.params.pageId
		for( var p in pages){
      if(pages[p]._id === pageId.toString()){
        pages[p].name = page.name;
        pages[p].description = page.description;
        res.send(pages[p].websiteId);
      }
    }
    res.send('0');
	}

	function deletePage(req,res){
		var pageId = req.params.pageId;
		var websiteId;
		for( var p in pages){
      if(pages[p]._id === pageId.toString()){
      	websiteId = pages[p].websiteId;
        pages.splice(p,1);
        res.send(websiteId);
      }
    }
    res.send('0');
	}
};