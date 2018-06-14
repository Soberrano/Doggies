webApp.factory("ProfileService", [
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
            createDocument :function (forDocument) {
                return requestPromise(
                    {
                        method: "POST",
                        url: "/api/user/CreateDocument",
                        data: forDocument,
                        params: {
                            dogId: forDocument.dogName,
                            eventId: forDocument.eventName

                        }
                    }
                );
            },
            fillDogsAndEventsLists : function () {
                //if (!$rootScope.IsAuthorized) return null;
                return requestPromise(
                    {
                        method: "POST",
                        url: "/api/user/FillDogsAndEventsLists",
                    }
                );
            },
            newUserInfo : function (UserName, UserSurname, UserPatronymic, Region, City, Address) {
                return requestPromise(
                    {
                        method: "POST",
                        url: "/api/user/newUserInfo",
                        data: {
                            UserName: UserName,
                            UserSurname: UserSurname,
                            UserPatronymic: UserPatronymic,
                            Region: Region,
                            City: City,
                            Address: Address
                        }
                    }
                );
            }

        };

        return service;
    }]);