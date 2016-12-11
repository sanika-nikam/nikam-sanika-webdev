module.exports = function(app){
	app.get("ejs/form",renderAllForms);

	function renderAllForms(req,res){
		res.render("ejs/form/form-list.view.server.ejs");
	}
};