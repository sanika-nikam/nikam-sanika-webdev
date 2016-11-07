(function(){
	angular
		.module("utility",[])
		.directive("sortable",sortable);

		function sortable(){
			console.log("hello from sortable");
			function linker(scope,element,attributes){
				console.log("hello from linker");
				var start = -1;
				var end = -1;
					element.sortable({
					start : function(event,ui){
						start = $(ui.item).index();
					},
					stop : function(event,ui){
						end = $(ui.item).index();
						scope.sortableController.sort(start,end);
					}
					});
				
			}
			return{
				scope : {},
				restrict : 'C',
				link : linker,
				controller : sortableController,
				controllerAs : 'sortableController'

			}

			function sortableController(WidgetService){
				var vm = this;
				vm.sort = sort;

				function sort(start,end){
					
					 WidgetService.sort(start,end);
					
				}
			}
		}
})();