module.exports = function(app,model){
  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });




	app.post('/api/page/:pageId/widget',createWidget);
  app.post("/api/upload", upload.single('myFile'), uploadImage);
	app.get('/api/page/:pageId/widget',findAllWidgetsForPage);
	app.get('/api/widget/:widgetId',findWidgetById);
	app.put('/api/widget/:widgetId',updateWidget);
	app.delete('/api/widget/:widgetId',deleteWidget);
  app.put('/api/page/:pid/widget',sortWidget);

  function sortWidget(req,res){
    
    var pageId = req.params.pid;
    var start = parseInt(req.query.start);
    var end = parseInt(req.query.end);
    
   model.widgetModel.reorderWidget(pageId,start,end);
   res.sendStatus(200);
        
  }

	function createWidget(req,res){
		var widget = req.body;
		var pageId = req.params.pageId;

    model.widgetModel.createWidget(pageId,widget)
        .then(function(widget){
          res.json(widget);
        },
        function(error){
          res.statusCode(400).send(error);
        });
	}

	function findAllWidgetsForPage(req,res){
		pageId  = req.params.pageId;
		var requiredWidgets=[];
    	model.pageModel.findAllWidgetsForPage(pageId)
            .then(function(response){
              res.json(response.widgets);
            });
	}

	function findWidgetById(req,res){
		var widget;
    var widgetId = req.params.widgetId;
   
    model.widgetModel.findWidgetById(widgetId)
          .then(function(widget){
              res.json(widget);
          },
          function(error){
            res.statusCode(400).send(error);
          });

	}

	function updateWidget(req,res){
    console.log("in update widget function");
    var widgetId = req.params.widgetId;
		var widget = req.body;
	
    model.widgetModel.updateWidget(widgetId,widget)
          .then(function(status){
              res.send(200);
          },
          function(error){
              res.statusCode(400).send(error);
          });
	}

	function deleteWidget(req,res){
    var widgetId = req.params.widgetId;
    model.widgetModel.deleteWidget(widgetId)
          .then(function(status){
            res.send(200);
          },
          function(error){
            res.statusCode(400).send(error);
          });
	}

  function uploadImage(req, res) {

      console.log("Entered upload img");
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        
        model.widgetModel.findWidgetById(widgetId)
              .then(function(widget){
                widget.width = width;
                widget.url = "/assignment/uploads/" + filename;
                model.widgetModel.updateWidget(widgetId,widget)
                  .then(function(status){
                    res.redirect("/assignment/#/user/" + userId + "/website/"+ websiteId + "/page/" + widget._page + "/widget/" + widgetId);
                  },
                  function(error){
                    res.statusCode(400).send(error);
                  });
                
              },
              function(error){
                res.statusCode(400).send(error);
              });

    }


};