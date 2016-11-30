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
		return WidgetModel.findById(widgetId)
							.then(function(widgetObject){
								return model.pageModel.findPageById(widgetObject._page)
											.then(function(pageObject){
												for( var w in pageObject.widgets){
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

		return model.pageModel.reorderWidgetForPage(pageId,start,end);
     }
		
	
};