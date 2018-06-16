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
				/*UserId,*/ DogId, OrganizationId,EventId) {

				return requestPromise(
					{
						method: "POST",
						url: "/api/request/SendRequest",
						params: {

							//UserId: UserId,//придет id текущего пользователя в RequestController
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

		},

			GetNotParticipantsDogs: function (/*userId,*/ eventId) {
				return requestPromise(
					{
						method: "POST",
						url: "/api/request/GetNotParticipantsDogs",
						params: {
							/*userId: userId,*///придет id текущего пользователя в RequestController
							eventId: eventId,

						}

					});

			}
		};

		
		return service;
	}]);