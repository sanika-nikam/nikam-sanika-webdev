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
		return PageModel.remove({_id : pageId});
	}
};