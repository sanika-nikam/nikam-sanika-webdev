(function() {
    angular
      .module("WebAppMaker")
      .factory("WidgetService", WidgetService);


function WidgetService() {

  var widgets = [
  //user jannunzi
  { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 1, "text": "GIZMODO"},
  { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 3, "text": "Us Senate Reaches Compromise on Emergency Zika Funding"},
  { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    "url": "http://www.thoughtmechanics.com/wp-content/uploads/2015/10/websitedesign.jpg"},
  { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": " <h4>Contrary to popular belief, Richard McClintock, a Latin <b>professor at Hampden-Sydney College in Virginia</b>,</a>looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature</h4>"},
  { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "Man in a wingsuit flies straight Through a ring of fire"},
  { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    "url": "https://www.youtube.com/embed/jJ2ht5DDgp4" },
  { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},

  //user alice
  { "_id": "1231", "widgetType": "HEADER", "pageId": "3221", "size": 1, "text": "GIZMODO"},
  { "_id": "2341", "widgetType": "HEADER", "pageId": "3221", "size": 3, "text": "Us Senate Reaches Compromise on Emergency Zika Funding"},
  { "_id": "3451", "widgetType": "IMAGE", "pageId": "3221", "width": "100%",
    "url": "http://www.thoughtmechanics.com/wp-content/uploads/2015/10/websitedesign.jpg"},
  { "_id": "4561", "widgetType": "HTML", "pageId": "3221", "text": " <h4>Contrary to popular belief, Richard McClintock, a Latin <b>professor at Hampden-Sydney College in Virginia</b>,</a>looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature</h4>"},
  { "_id": "5671", "widgetType": "HEADER", "pageId": "3221", "size": 2, "text": "Man in a wingsuit flies straight Through a ring of fire"},
  { "_id": "6781", "widgetType": "YOUTUBE", "pageId": "3221", "width": "100%",
    "url": "https://www.youtube.com/embed/jJ2ht5DDgp4" },
  { "_id": "7891", "widgetType": "HTML", "pageId": "3221", "text": "<p>Lorem ipsum</p>"},

  //user
  { "_id": "1232", "widgetType": "HEADER", "pageId": "4312", "size": 1, "text": "GIZMODO"},
  { "_id": "2342", "widgetType": "HEADER", "pageId": "4312", "size": 3, "text": "Us Senate Reaches Compromise on Emergency Zika Funding"},
  { "_id": "3452", "widgetType": "IMAGE", "pageId": "4312", "width": "100%",
    "url": "http://www.thoughtmechanics.com/wp-content/uploads/2015/10/websitedesign.jpg"},
  { "_id": "4562", "widgetType": "HTML", "pageId": "4312", "text": " <h4>Contrary to popular belief, Richard McClintock, a Latin <b>professor at Hampden-Sydney College in Virginia</b>,</a>looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature</h4>"},
  { "_id": "5672", "widgetType": "HEADER", "pageId": "4312", "size": 2, "text": "Man in a wingsuit flies straight Through a ring of fire"},
  { "_id": "6782", "widgetType": "YOUTUBE", "pageId": "4312", "width": "100%",
    "url": "https://www.youtube.com/embed/jJ2ht5DDgp4" },
  { "_id": "7892", "widgetType": "HTML", "pageId": "4312", "text": "<p>Lorem ipsum</p>"}
  

];


	var api = {
	"createWidget"   : createWidget,
	"findWidgetId" : findWidgetById,
  "findWidgetByPageId" : findWidgetByPageId,
  "updateWidget" :updateWidget,
  "deleteWidget" : deleteWidget
	};
  return api;

  function createWidget(pageId,widget) {
    if(!widget ===  null){
      widget.pageId = pageId.toString();
      widgets.push(widget);
    }
  }

  function findWidgetByPageId(pageId) {
    var requiredWidgets=[];
    for( var w in widgets){
      if(widgets[w].pageId === pageId.toString()){
        requiredWidgets.push(widgets[w]);
      }
    }
    return requiredWidgets;
  }

  function findWidgetById(widgetId){
    var widget;
    for( var w in widgets){
      if(widgets[w]._id === widgetId.toString()){
        widget = widgets[w];
        break;
      }
    }
    return widget;
  }

  function updateWidget(widgetId,widget){

    for( var w in widgets){
      if(widgets[w]._id === widgetId.toString()){
        widgets[w] = widget;
        break;
      }
    }
  }

  function deleteWidget(widgetId){

    for( var w in widgets){
      if(widgets[w]._id === widgetId.toString()){
        if(w > -1)
          widgets.splice(w,1);
        break;
      }
    }
  }

  
}




})();
