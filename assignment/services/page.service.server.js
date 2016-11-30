module.exports = function(app,model){
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
    model.pageModel.createPage(websiteId,page)
          .then(function(website){
            res.json(website);
          },
          function(error){
            res.sendStatus(400).send(error);
          });

	}

	function findAllPagesForWebsite(req,res){
		var websiteId = req.params.websiteId;
		var requiredPages=[];
      model.pageModel.findAllPagesForWebsite(websiteId)
            .then(function(websites){
              res.json(websites);
            },
            function(error){
              res.sendStatus(400).send(error);
            });

	}

	function findPageById(req,res){
		var pageId = req.params.pageId;
		var page;
      model.pageModel.findPageById(pageId)
          .then(function(page){
            res.json(page);
          },
          function(error){
            res.sendStatus(400).send(error);
          });
	}

	function updatePage(req,res){
		var page = req.body;
		var pageId = req.params.pageId;
    model.pageModel.updatePage(pageId,page)
          .then(function(status){
            res.send(200);
          },
          function(error){
            res.sendStatus(400).send(error);
          });
	}

	function deletePage(req,res){
		var pageId = req.params.pageId;
		var websiteId;
    model.pageModel.deletePage(pageId)
          .then(function(status){
            res.send(200);
          },
          function(error){
            res.sendStatus(400).send(error);
          });
	}
};