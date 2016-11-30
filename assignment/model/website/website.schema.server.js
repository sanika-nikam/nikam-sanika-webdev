module.exports = function(){
	
	var mongoose = require('mongoose');
	var PageSchema = require('../page/page.schema.server');
	var WebsiteSchema = mongoose.Schema({
		_user : {type : mongoose.Schema.Types.ObjectId, ref : 'UserModel'},
		name : {type : String},
		description : {type :String},
		pages : [{type : mongoose.Schema.Types.ObjectId, ref : 'PageModel'}],
		dateCreated : {type : Date , default : Date.now()}
	}, {collection : 'website'});

	return WebsiteSchema;
};
