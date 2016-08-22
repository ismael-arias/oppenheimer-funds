define(['jquery'],function($){
	var obj = {
		name : "TestLib",
		testMethod : function(){
			return $('.section1').attr("tracking");
		}
	};
	return obj;
});