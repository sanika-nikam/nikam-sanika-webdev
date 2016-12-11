
module.exports = function(){


var mongoose = require('mongoose');

var WebsiteSchema = require("../website/website.schema.server.js");

var UserSchema = mongoose.Schema({
	username : String,
	password : String,
	firstName : String,
	lastName : String,
	email : String,
	phone :String,
	facebook : {
		id : String,
		token : String,
		email:String

	},
	role:{type:String, default:'STUDENT',enum: ['ADMIN','STUDENT','FACULTY']},
	websites : [{type : mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}], //--> ref should be name of the model we declare
	dateCreated : {type : Date, default: Date.now()}
}, {collection : 'user'});

	return UserSchema;

};

