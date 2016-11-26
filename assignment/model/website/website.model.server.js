module.exports = function(){
	var model  = {};
	var mongoose = require('mongoose');
	var WebsiteSchema = require ("./website.schema.server.js");
	var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

	var api ={
		createWebsite : createWebsite,
		findAllWebsitesForUser :findAllWebsitesForUser,
		findWebsiteById :findWebsiteById,
		updateWebsite :updateWebsite,
		deleteWebsite :deleteWebsite,
		setModel :setModel

	};
	return api;

	function setModel(_model){
		model = _model;
	}

	function createWebsiteForUser(userId,website){
		return WebsiteModel.create(website)
				.then(function(websiteObject){
					model.userModel
						 .findUserById(userId)
						 .then(function(userObject){
						 	websiteObject._user = userObject._id;
						 	websiteObject.save();
						 	userObject.websites.push(websiteObject);
						 	return userObject.save();
						 },
						 function(error){
						 	console.log(error);
						 });
				});
	}

	function findAllWebsitesForUser(userId){
		return model.userModel.findWebsitesForUser(userId);
	}

	function findWebsiteById(websiteId){
		return WebsiteModel.findById(websiteId);
	}

	function updateWebsite(websiteId,website){
		return Website.update(
			{_id : websiteId},
			{
				name : website.name,
				description : website.description
			}
		);
	}

	function deleteWebsite(websiteId){
		return WebsiteModel.remove(
			{_id : websiteId}
		);
	}


};