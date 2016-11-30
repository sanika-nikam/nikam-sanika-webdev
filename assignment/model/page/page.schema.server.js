module.exports = function() {
	var mongoose = require('mongoose');
	var WidgetSchema = require('../widget/widget.schema.server')();

	var PageSchema = mongoose.Schema({
	_website : {type : mongoose.Schema.Types.ObjectId, ref : 'WebsiteModel'},
	name : {type : String},
	title : {type : String},
	description : {type : String},
	widgets : [{type : mongoose.Schema.Types.ObjectId, ref : 'WidgetModel' }],
	dateCreated : {type : Date, default : Date.now()}
}, {collection : 'page'});

	return PageSchema;
};
