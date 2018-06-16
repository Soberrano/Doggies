webApp.controller("RequestCtrl", ["$rootScope", "$scope", "RequestPromise", "Security", "RequestService", function ($rootScope, $scope, requestPromise, security,RequestService) {
	$scope.selectedEvent;
	///передать текущего пользователя!!!!!!!!!!!
	//RequestService.SendRequest(9595959, 6,2).then(console.log("я вызвалась"));//
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!подставить нужные даты
	$scope.IsEvent = function () {
		if ($scope.selectedEvent == "") {
			console.log("нет мероприятий");
			return false;
		}
		else return true;
	}
	$scope.IsDog = function () {
		if ($scope.selectedDog == "") {
			console.log("нет cj,fr");
			return false;
		}
		else return true;
	}
	$scope.selectedEvent = "";
	$scope.selectedDog = "";
	$scope.events = [];
	$scope.dogs = [];
	RequestService.GetEventsForDecentAmountOfTime('11.12.2015', '11.02.2019').then(
		function (data) {
			$scope.events = data

			console.log($scope.events)
			}
		//приходит полноценное мероприятие (не надо так)
		)
	//выбрать собак которые не участвуют в мероприятии и не подали заювку на это мероприятие
	$scope.GetDogs = function () {
		RequestService.GetNotParticipantsDogs($scope.selectedEvent).then(function (data) { $scope.dogs = data });
		console.log($scope.selectedEvent);
	}

	$scope.SendRequest = function ()
	{
		RequestService.SendRequest($scope.selectedDog, $scope.selectedEvent, $scope.selectedEvent).then(
		)
	
	}
	$scope.AddDog = function (dogId) {
		$scope.selectedDog = dogId;
		console.log(dogId);
	}
	//нужно как-то отображать запись собаки на мероприятие или рассмотрение заявки....
}]);