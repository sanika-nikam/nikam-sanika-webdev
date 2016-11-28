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
		//reorderWidget : reorderWidget,
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
		return WidgetModel.find({_page : pageId});
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
		return WidgetModel.remove({_id :widgetId});
	}
};