webApp.factory("RequestService", [
	"$rootScope",
	"HttpRequest",
	"RequestPromise",
	"Tools",
	function (
		$rootScope,
		httpRequest,
		requestPromise,
		tools
	) {

		var service = {
		
			SendRequest:function (
				UserId, DogId, OrganizationId) {

				return requestPromise(
					{
						method: "POST",
						url: "/api/request/SendRequest",
						params: {

							UserId: UserId,
							DogId: DogId,
							OrganizationId: OrganizationId,
							EventId:EventId
						}

					});
			},
		GetEventsForDecentAmountOfTime: function(dateStart,dateEnd)
		{
			return requestPromise(
				{
					method: "POST",
					url: "/api/request/GetEventsForDecentAmountOfTime",
					params: {
						dateStart: dateStart,
						dateEnd: dateEnd,
					
					}

				});

		}

		};

		
		return service;
	}]);