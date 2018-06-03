webApp.controller("UserCtrl", ["$rootScope", "$scope", "RequestPromise", function ($rootScope, $scope, requestPromise) {
	//все, что должно попасть в документ
	$scope.forDocument = {
		orgName: "",
		eventName: "",// в первый раз сюда придет EventId
		eventDate: "",
		dogName: "",// в первый раз сюда придет DogId
		VPKOS: "",
		breed: "",
		color: "",
		dateOfBirth: "",
		gender: "",
		fatherName: "",
		fatherVPKOS: "",
		motherName: "",
		motherVPKOS: "",
		ownerFIO: "",
		address: "",
        leaderFIO: ""

	};

    $scope.UserId = "";
    $scope.UserName = "";
    $scope.UserSurname = "";
    $scope.UserPatronymic = "";
    $scope.Region = "";
    $scope.City = "";
    $scope.Adress = "";

	$scope.getInfoForDocument = function () {
		return requestPromise(
		{
				method: "POST",
				url: "/api/user/GetInfoForDocument"
		}
	);
	}
	$scope.createDocument = function () {
		console.log($scope.forDocument);
		
		//$scope.fillForDocument();
		return requestPromise(
			{
				method: "POST",
				url: "/api/user/CreateDocument",
				data: $scope.forDocument,
				params: {
					dogId: $scope.forDocument.dogName,
					eventId: $scope.forDocument.eventName

				}
			}
		);
		//$scope.getInfoForDocument();
		//console.log($scope.forDocument);
	}
	//вспомогательная штука для отображения select-а с собаками
	$scope.IsEvent = function () {
		getDogsForEvent();
		if ($scope.forDocument.eventName !== "") {
			return true;
		}
		else return false;
	}

	$scope.events = [];

	$scope.fillDogsAndEventsLists = function () {
		console.log("списки заполнены");
		return requestPromise(
			{
				method: "POST",
				url: "/api/user/FillDogsAndEventsLists",

			}

		);

	}
	$scope.profile;//здесь пользователь
	$scope.fillDogsAndEventsLists().then(
		function (data) {//получили пользователя(его вернул fillDogsAndEventsLists)
			$scope.profile = data;
			data.Dogs.forEach(function (dog) {//перебор всех собак пользователя
				if (dog.Events !== null) {//если список мероприятий собаки не пуст
					dog.Events.forEach(function (eve) {//перебор мероприятий

						if ($scope.events.length > 0) {//если в наш массив мероприятий ($scope.event) уже что-то занесено
							var isneed = true;
							$scope.events.forEach(function (scopeEvent) {//проверка
								if (scopeEvent.EventId === eve.EventId) {//на совпадение мероприятей в нашем $scope.event и в списке мероприятий у собаки
									isneed = false;
								}

							})
							if (isneed) {
								$scope.events.push(eve);
							}
						}
						else {
							$scope.events.push(eve);
						}
						//console.log(dog);
					})
				}
			})
			//console.log($scope.events);
		}
	);
	$scope.dogs = [];//все собаки для данного мероприятия
	function getDogsForEvent() {
		$scope.events.forEach(function (scopeEvent) {//перебор нашего массива мероприятий
			$scope.profile.Dogs.forEach(function (dog) {//переборсписка собак ползователя
				if (dog.Events !== null) {//если список мероприятий собаки не пуст
					dog.Events.forEach(function (eve) {//перебираем мероприятия собаки
						//если EventId нашего массива мероприятий совпадает с EventId в списке мероприятий данной собаки
						if (eve.EventId === scopeEvent.EventId) {
							var isneed = true;
							$scope.dogs.forEach(function (d) {//нужно поместить собаку в наш массив собак
								if (d.DogId === dog.DogId) {
									isneed = false;
								}

							})
							if (isneed) {
								$scope.dogs.push(dog);
							}
						}
					})
				}
			})
		});
		//console.log($scope.events[0].EventName);
    }

    $scope.newInfo = {};
    $scope.newUserInfo = function (UserName, UserSurname, UserPatronymic, Region, City, Address) {
        console.log($scope.newInfo);
        $scope.newInfo.UserName = UserName;
        $scope.newInfo.UserSurname = UserSurname;
        $scope.newInfo.UserPatronymic = UserPatronymic;
        $scope.newInfo.Region = Region;
        $scope.newInfo.City = City;
        $scope.newInfo.Address = Address;
        return requestPromise(
            {
                method: "POST",
                url: "/api/user/newUserInfo",
                data: $scope.newInfo
            }
        );
    }

    $scope.getUserById = function () {
        return requestPromise(
            {
                method: "POST",
                url: "/api/user/getUserById"
            }
        );
    }
}]);







