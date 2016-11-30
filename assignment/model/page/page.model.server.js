module.exports = function(){
	var model = {};
	var mongoose = require("mongoose");
	var PageSchema = require("./page.schema.server")();
	var PageModel = mongoose.model("PageModel", PageSchema);

	var api = {
		createPage :createPage,
		findAllPagesForWebsite :findAllPagesForWebsite,
		findPageById : findPageById,
		updatePage :updatePage,
		deletePage :deletePage,
		reorderWidgetForPage :reorderWidgetForPage,
		findAllWidgetsForPage : findAllWidgetsForPage,
		addWidgetToPage : addWidgetToPage,
		setModel : setModel
	};

	return api;

	function setModel(_model){
		model = _model;
	}

	function createPage(websiteId,page){
		return PageModel.create(page)
						.then(function(pageObject){
							model.websiteModel
								.findWebsiteById(websiteId)
								.then(function(websiteObject){
									pageObject._website = websiteObject._id;
									pageObject.save();
									websiteObject.pages.push(pageObject);
									return websiteObject.save();
								},
								function(error){
									console.log(error);
								});
						});
	}

	function findAllPagesForWebsite(websiteId){
		return PageModel.find({_website :websiteId});
	}

	function findPageById(pageId){
		return PageModel.findById(pageId);
	}

	function updatePage(pageId,page){
		return PageModel.update(
			{_id : pageId},
			{
				name :page.name,
				description : page.description

			});
	}

	function deletePage(pageId){
		return PageModel.findById(pageId)
							.then(function(pageObject){
								return model.websiteModel.findWebsiteById(pageObject._website)
											.then(function(websiteObject){
												for( var w in websiteObject.pages){
													if(websiteObject.pages[w] == pageId.toString()){
       	  											
  	        											websiteObject.pages.splice(w,1);
  	        											websiteObject.save();
  	        											break;
          											
      												}
 												}
 												return PageModel.remove({_id :pageId});
											},
											function(error){
												console.log(error);
											});
							
							},
							function(error){
								console.log(error);
							});

	}

	function reorderWidgetForPage(pageId, start, end){
		
		return PageModel.findById(pageId)
				.then(function(page){
					if(page){
						var pageWidgets = page.widgets;
						pageWidgets.splice(end,0,pageWidgets.splice(start,1)[0]);
						return PageModel.update({_id : pageId},{widgets : pageWidgets});
					}
				});

	}

	function findAllWidgetsForPage(pageId){
		return PageModel.findById(pageId)
            .populate("widgets")
            .exec();
	}

	function addWidgetToPage(pageId, widgetId) {
       	return PageModel.update({_id: pageId},{$push:{widgets: widgetId}});
    }

};