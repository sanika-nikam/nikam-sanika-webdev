module.exports = function(){
	var model ={};
	var mongoose = require("mongoose");
	var WidgetSchema = require("./widget.schema.server")();
	var WidgetModel = mongoose.model("WidgetModel",WidgetSchema);

	var api = {
		createWidget :createWidget,
		findAllWidgetsForPage : findAllWidgetsForPage,
		findWidgetById : findWidgetById,
		updateWidget : updateWidget,
		deleteWidget : deleteWidget,
		reorderWidget : reorderWidget,
		setModel : setModel
	};

	return api;

	function setModel(_model){
		model = _model;
	}

	function createWidget(pageId,widget){
		return WidgetModel.create(widget)
							.then(function(widgetObject){
								return model.pageModel.findPageById(pageId)
												.then(function(pageObject){
													widgetObject._page = pageObject._id;
													widgetObject.save();
													pageObject.widgets.push(widgetObject);
													pageObject.save();
													return widgetObject.save();

												},
												function(error){
													console.log(error);
												});
							});
	}

	function findAllWidgetsForPage(pageId){
		//return WidgetModel.find({_page : pageId});
		return model.pageModel.findAllWidgetsForPage(pageId);
	}

	function findWidgetById(widgetId){
		return WidgetModel.findById(widgetId);
	}

	function updateWidget(widgetId,widget){
		return WidgetModel.update(
			{_id : widgetId},
			{$set : widget}
			);
	}

	function deleteWidget(widgetId){
		//return WidgetModel.remove({_id :widgetId});
		return WidgetModel.findById(widgetId)
							.then(function(widgetObject){
								return model.pageModel.findPageById(widgetObject._page)
											.then(function(pageObject){
												//console.log("found page"); 
												//console.log(pageObject);
												for( var w in pageObject.widgets){
													//console.log("found widget"); 
													//console.log(pageObject.widgets[w]);
													if(pageObject.widgets[w] == widgetId.toString()){
       	  											
  	        											pageObject.widgets.splice(w,1);
  	        											pageObject.save();
  	        											break;
          											
      												}
 												}
 												return WidgetModel.remove({_id :widgetId});
											},
											function(error){
												console.log(error);
											});
							
							},
							function(error){
								console.log(error);
							});
	}

	function reorderWidget(pageId,start,end){

		console.log("reorder widget from model");
		console.log("PageID : "+pageId);
		
		/*return model.pageModel.findPageById(pageId)
            .then(function (page) {
        		console.log(page.widgets);
            	var widget = page.widgets.splice(start,1)[0];
            	page.save();
            	page.widgets.splice(end,0,widget);
            	page.save();
            	console.log(page.widgets);
            	return page.save();
            	},
           		function (error) {
            	   console.log(error);
            	});
		*/

		return model.pageModel.reorderWidgetForPage(pageId,start,end);
      }
		// console.log(pageId);
		// return model.pageModel.findPageById(pageId)
		// 		.then(function(page){
		// 			//var widgets = page.widgets
		// 			//.splice(start,1)[0];
		// 			page.widgets.splice(end,0,page.widgets.splice(start,1)[0]);
		// 			page.save();
		// 			//page.widgets.splice(end, 0, widget);
		// 			//page.save();
		// 			console.log(page);
		// 			return page.save();
		// 		},
		// 		function(error){
		// 			console.log(error);
		// 		});
		/*var widgets,pageWidgets = [];
		return model.pageModel.findPageById(pageId)
				.then(function(pageObject){
					widgets = page.widgets;
					console.log("previous widgets");
					console.log(widgets);
					widgets.splice(end,0,widgets.splice(start,1)[0]);
					console.log("widgets after splice");
					console.log(widgets);
					for(var w in widgets){
						pageWidgets.push(WidgetModel.findById(widgets[w]));
						WidgetModel.remove({_id:widgets[w]});
					}
					console.log("pageWidgets");
					console.log(pageWidgets);
					for (var w in pageWidgets){
						WidgetModel.create(pageWidgets[w]);
					}

					return WidgetModel.findAllWidgetsForPage(pageId);
				},
				function(error){
					console.log(error);
				});*/
	
};