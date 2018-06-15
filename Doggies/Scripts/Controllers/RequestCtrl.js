webApp.controller("RequestCtrl", ["$rootScope", "$scope", "RequestPromise", "Security", "RequestService", function ($rootScope, $scope, requestPromise, security,RequestService) {
	$scope.selectedEvent;
	///передать текущего пользователя!!!!!!!!!!!
	//RequestService.SendRequest(1,7776, 6,2).then(console.log("я вызвалась"));
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!подставить нужные даты
	$scope.events=[];
	RequestService.GetEventsForDecentAmountOfTime('11.12.2015', '11.02.2019').then(
		function (data) {
			$scope.events=data
			console.log($scope.events)
			}
		//приходит полноценное мероприятие (не надо так)
		)
	//выбрать собак которые не участвуют в мероприятии и не подали заювку на это мероприятие

	//нужно как-то отображать запись собаки на мероприятие или рассмотрение заявки....
}]);