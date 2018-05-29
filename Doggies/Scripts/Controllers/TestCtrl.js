webApp.controller("TestCtrl", ["$rootScope", "$scope", "RequestPromise", function ($rootScope, $scope, requestPromise) {
	$scope.insertInto = { value: "" };
	$scope.insertIntoTest = function () {
		console.log($scope.insertInto);
		return requestPromise(
			{
				method: "POST",
				url: "/api/test/InsertIntoTest",
				params: {

					value: $scope.insertInto.value
				}


			}
		);
	}

}]);