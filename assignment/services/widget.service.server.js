module.exports = function(app,model){
  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
	var widgets = [
 /* //user jannunzi
  { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 1, "text": "GIZMODO"},
  //{ "_id": "234", "widgetType": "HEADER", "pageId": "3221", "size": 3, "text": "Us Senate Reaches Compromise on Emergency Zika Funding"},
  { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    "url": "http://wallpapercave.com/wp/ZxV8qRo.jpg"},
  //{ "_id": "456", "widgetType": "HTML", "pageId": "3221", "text": " <h4>Contrary to popular belief, Richard McClintock, a Latin <b>professor at Hampden-Sydney College in Virginia</b>,</a>looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature</h4>"},
  { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "Man in a wingsuit flies straight Through a ring of fire"},
  { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    "url": "https://www.youtube.com/embed/6UntuZiKM14" },
  //{ "_id": "789", "widgetType": "HTML", "pageId": "3221", "text": "<p>Lorem ipsum</p>"},
*/
 //user alice
  { "_id": "1231", "widgetType": "HEADER", "pageId": "3221", "size": 1, "text": "GIZMODO"},
  { "_id": "2341", "widgetType": "HEADER", "pageId": "3221", "size": 3, "text": "Us Senate Reaches Compromise on Emergency Zika Funding"},
  { "_id": "3451", "widgetType": "IMAGE", "pageId": "3221", "width": "100%",
    "url": "http://www.thoughtmechanics.com/wp-content/uploads/2015/10/websitedesign.jpg"},
  { "_id": "4561", "widgetType": "HTML", "pageId": "3221", "text": " <h4>Contrary to popular belief, Richard McClintock, a Latin <b>professor at Hampden-Sydney College in Virginia</b>,</a>looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature</h4>"},
  { "_id": "5671", "widgetType": "HEADER", "pageId": "3221", "size": 2, "text": "Man in a wingsuit flies straight Through a ring of fire"},
  { "_id": "6781", "widgetType": "YOUTUBE", "pageId": "3221", "width": "100%",
    "url": "https://www.youtube.com/embed/jJ2ht5DDgp4" },
  { "_id": "7891", "widgetType": "HTML", "pageId": "3221", "text": "<p>Lorem ipsum</p>"},

 /* //user
  { "_id": "1232", "widgetType": "HEADER", "pageId": "4312", "size": 1, "text": "GIZMODO"},
  { "_id": "2342", "widgetType": "HEADER", "pageId": "4312", "size": 3, "text": "Us Senate Reaches Compromise on Emergency Zika Funding"},
  { "_id": "3452", "widgetType": "IMAGE", "pageId": "4312", "width": "100%",
    "url": "http://www.thoughtmechanics.com/wp-content/uploads/2015/10/websitedesign.jpg"},
  { "_id": "4562", "widgetType": "HTML", "pageId": "4312", "text": " <h4>Contrary to popular belief, Richard McClintock, a Latin <b>professor at Hampden-Sydney College in Virginia</b>,</a>looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature</h4>"},
  { "_id": "5672", "widgetType": "HEADER", "pageId": "4312", "size": 2, "text": "Man in a wingsuit flies straight Through a ring of fire"},
  { "_id": "6782", "widgetType": "YOUTUBE", "pageId": "4312", "width": "100%",
    "url": "https://www.youtube.com/embed/jJ2ht5DDgp4" },
  { "_id": "7892", "widgetType": "HTML", "pageId": "4312", "text": "<p>Lorem ipsum</p>"}
  */

];


	app.post('/api/page/:pageId/widget',createWidget);
  app.post("/api/upload", upload.single('myFile'), uploadImage);
	app.get('/api/page/:pageId/widget',findAllWidgetsForPage);
	app.get('/api/widget/:widgetId',findWidgetById);
	app.put('/api/widget/:widgetId',updateWidget);
	app.delete('/api/widget/:widgetId',deleteWidget);
  app.put('/api/page/:pid/widget',sortWidget);

  function sortWidget(req,res){
    console.log("reached sortwidget api");
    var pageId = req.params.pid;
    var start = parseInt(req.query.start);
    var end = parseInt(req.query.end);
    //widgets.splice(end,0,widgets.splice(start,1)[0]);
    //res.send(widgets);
    //console.log(widgets);
     console.log("Page ID from service: " + pageId);
   model.widgetModel.reorderWidget(pageId,start,end);
   res.sendStatus(200);
        
  }

	function createWidget(req,res){
		var widget = req.body;
		var pageId = req.params.pageId;

		// var id = (Math.floor(100000 + Math.random() * 900000)).toString();
  //       id = id.substring(-2);
  //       widget._id = id;
		// widget.pageId = pageId.toString();
  //     	widgets.push(widget);
  //     	res.send(widget);

    model.widgetModel.createWidget(pageId,widget)
        .then(function(widget){
          //console.log("Widget");
          //console.log(widget);
          res.json(widget);
        },
        function(error){
          res.statusCode(400).send(error);
        });
	}

	function findAllWidgetsForPage(req,res){
		pageId  = req.params.pageId;
		var requiredWidgets=[];
    	// for( var w in widgets){
     //  	if(widgets[w].pageId === pageId.toString()){
     //    	requiredWidgets.push(widgets[w]);
     //  	}
    	// }
    	// res.json (requiredWidgets);
      // model.widgetModel.findAllWidgetsForPage(pageId)
      //       .then(function(widgets){
      //        // console.log(widgets);
      //         res.json(widgets);
      //       },
      //       function(error){
      //         res.statusCode(400).send(error);
      //       });

      model.pageModel.findAllWidgetsForPage(pageId)
            .then(function(response){
              //console.log("in widget server service");
              //console.log(response.widgets);
              res.json(response.widgets);
            });
	}

	function findWidgetById(req,res){
		var widget;
    var widgetId = req.params.widgetId;
    // 	for( var w in widgets){
    //   		if(widgets[w]._id === widgetId.toString()){
    //    			 widget = widgets[w];
    //     		 res.send(widget);
    //   }
    // }
    //res.send('0');
    model.widgetModel.findWidgetById(widgetId)
          .then(function(widget){
            //console.log(widget);
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
		 // for( var w in widgets){
   //    if(widgets[w]._id === widgetId.toString()){

   //      if(widget.widgetType == 'HEADER'){

   //        widgets[w].text = widget.text;
   //        widgets[w].size = widget.size;
   //        res.send(widgets[w].pageId);
   //      }

   //      else if(widget.widgetType == 'IMAGE' || widget.widgetType == 'YOUTUBE'){
   //        widgets[w].text = widget.text;
   //        widgets[w].url = widget.url;
   //        widgets[w].width = widget.width;
   //        res.send(widgets[w].pageId);
   //      }

   //    }

   //  }
    //res.send('0');
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
		// for( var w in widgets){
  //     if(widgets[w]._id === widgetId.toString()){
  //     	  var pageId = widgets[w].pageId;
  //         widgets.splice(w,1);
  //         res.send(pageId);
  //     }
  //   }
  //   res.send('0');
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

        // for (var w in widgets){
        //   if(widgets[w]._id == widgetId){
        //     widgets[w].width = width;
        //     widgets[w].url = "/assignment/uploads/" + filename;

        //     var pageId = widgets[w].pageId;

        //     res.redirect("/assignment/#/user/" + userId + "/website/"+ websiteId + "/page/" + pageId + "/widget/" + widgetId);
        //   }
        // }
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