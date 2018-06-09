webApp.controller("TestCtrl", ["$rootScope", "$scope", "RequestPromise", function ($rootScope,
	$scope, requestPromise) {

	//!!!!---уменьшить количество обрабатываемой информации

	$scope.helper = "";
	$scope.events=[];
	$scope.eventType =
		{
			challege: "",
			exhebition: "",
			competition: "",

		}
	//устанавливаем тип, выбранного на данный момент мероприятия 
	$scope.setEventType = function () {
	//обнуляем "смотрителя" мероприятий
			$scope.eventType.challege = "";
			$scope.eventType.exhebition = "";
		$scope.eventType.competition = "";
		
		if ($scope.events.length > 0) {

		

			// для каждого события
			$scope.events.forEach(function (ev) {
			
				//если id мероприятия совпадает с id выбоанного мероприятия (оно в $scope.helper)
				if (ev.EventId == $scope.helper)
				{
					//примитивная проверка на тип мероприятия
					//и поднятие флага
					if (ev.EventType == "состязание")
					{	
						$scope.eventType.challege = "1";
						
					}
					if (ev.EventType == "испытание") {
						$scope.eventType.competition = "1";
					}
					if (ev.EventType == "выставка") {
						$scope.eventType.exhebition = "1";
					}
				}
			})
			console.log($scope.eventType);
		}
		
	}
	///костыльный костыль....


	$scope.getNumber = function () {

		return new Array(1);
	}

	//........................



	$scope.IsEvent = function () {
		if ($scope.helper !== "") {
			return true;
		}
		else return false;
	}
	$scope.IsChallenge = function () {
		if ($scope.eventType.challege !== "") {
			return true;
		}
		else return false; };
	$scope.IsExhebition = function () {
		if ($scope.eventType.exhebition !== "") {
			return true;
		}
		else return false;};
	$scope.IsCompetition = function () {
		if ($scope.competition !== "") {
			return true;
		}
		else return false;};

	$scope.getAllEvents = function () {

		return requestPromise(
			{
				method: "POST",
				url: "/api/test/GetAllEvents",

			});
	}
	$scope.getAllEvents().then(

		function (data) {
			$scope.events = data;
			console.log(data);

		}

	);

	//после получения мероприятий 
	//найдем всех собак,  в нем участвующих 
	$scope.dogs = [];
	$scope.getDogsByEventId = function () {
		return requestPromise(
			{
				method: "POST",
				url: "/api/test/getDogsByEventId",
				params: { id: $scope.helper }

			});
	}
	//костыльно (
	$scope.getDogsByEventAndSetEventType = function () {// вызывается при выборе мероприятия
	
		$scope.setEventType();
		$scope.getDogsByEventId().then(function (data) {
			$scope.dogs = data;

			$scope.dogs.forEach(function (dog) {
				dog.Marks = [];
				//для каждой собаки
				for (var i = 0; i < 13; i++) {
					//в массив оценок засовываем объект со свойством mark и значением 0
					dog.Marks.push({ mark: 0 });
				}
			})
			console.log($scope.dogs);
		})
	}
	///------------------------------Территория Печенья--------------------------------
	$scope.CreateCookie = function () {

		$scope.cookieString = '';

		$scope.dogs.forEach(function (dog) {
			//$IdСобаки#45#44#4....$IdСобаки#12#14#55...
			$scope.cookieString = $scope.cookieString + "$" + dog.DogId;//предыдущая строка соединяеться с $ + имемя собаки
			dog["Marks"].forEach(function (mark, i, arr) {

				$scope.cookieString = $scope.cookieString + "#" + mark.mark;
				//alert("\\\\"+ mark.mark );
			})

		})
		$scope.cookieString = "ChallengeMarks=" + $scope.cookieString;
		document.cookie = $scope.cookieString;
		console.log(getCookie("ChallengeMarks"));
		//alert(document.cookie);
		devideCookie(getCookie("ChallengeMarks"));
		$scope.SaveAllChallengeValues();
	}
	// возвращает cookie с именем name, если есть, если нет, то undefined
	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	$scope.dogMass = [];
	//отлично! печенье есть, теперь разобьем его на части
	function devideCookie(cookie) {
		var dogsAndMarks = [];
		dogsAndMarks = cookie.split("$");




		dogsAndMarks.shift();//???????????может ли это быть проблемой?

		dogsAndMarks.forEach(
			function (d, i) {
				//в массиве собак создаем объект dogObject , в нем свойства: dogId и массив оценок marks
				$scope.dogMass.push({ dogId: "", marks: [] });

				$scope.dogMass[i].dogId = d.substring(0, 1);//IdСобаки#45#44#4 - берем IdСобаки
				$scope.dogMass[i].marks = (d.substring(1)).split("#");
				$scope.dogMass[i].marks.shift();
			}
		)
		console.log($scope.dogMass);
	}
	///-------------------------------Печенье--------------------------------

	//теперь занесем информацию  из печенюшного массива собак в базу 
	$scope.ch = { dId: "", chName: "", chVal: "" }//то, что нужно занести в базу
	$scope.setChallengeValue = function () {
		return requestPromise(
			{
				method: "POST",
				url: "/api/test/SetChallengeValue",
				params: {
					dId: $scope.ch.dId,
					chName: $scope.ch.chName,
					chValue: $scope.ch.chVal
				}

			});
	}
	///занести оценки по испытаниям в базу
	$scope.SaveAllChallengeValues = function () {
		console.log("z pltcm");
		//для каждой собаки
		$scope.dogMass.forEach(function (d, i) {
		
			//для каждого элемента массива оценок (для одной собаки)
			$scope.dogMass[i].marks.forEach(function (mark, j) {
				//меням значение свойств объекта $scope.ch
				$scope.ch.dId = $scope.dogMass[i].dogId;
				$scope.ch.chName = "" + j;
				$scope.ch.chVal = mark;
				//console.log($scope.ch);
				//и заносим их в базу
				//$scope.setChallengeValue( );
				
			});
		});
	$scope.setEventType();}
}]);