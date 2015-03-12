describe('Controller: <%= fileName %>', function() {
    var scope, httpBackend, $location, <%= componentName %> ;

    beforeEach(module('<%= ngModule %>'));

    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, _$location_) {
        $location = _$location_;
        httpBackend = _$httpBackend_;
        scope = $rootScope.$new();

        <%
        if (undefinedScopreVar) { %>
            /* Following line and provides mock value for scope variables 's been used and  not injected. 
            You will get following kind of error otherwise
            TypeError: 'undefined' is not an object (evaluating '$scope.someDummy.someKey... )*/
            <%
        } %>
        <%
        _.forEach(undefinedScopreVar, function(eachVar) { %>
            scope. <%= eachVar %> = {
                someKey: "someValue"
            }; <%
        }); %>
        <%=
        componentName %> = $controller('<%= componentName %>', {
            $scope: scope
        });
    }));

    //If your controller is not using any http calls you can remove this test entirely .
    it('should get expected data from backend', function() {

        var controller = scope.$new( <%= componentName %> );

        //this sets the expectation that , which http calls the controller gonna make , 
        // and what response does it expects .
        httpBackend.when('GET', '/apiThat/isBeenCalled/inYourCode')
            .respond({
                someKey1: 'someValue',
                someKey2: ['ele1', 'ele2']
            });

        //this sets the expectation that , which http calls the controller gonna make , 
        // and what response does it expects .
        httpBackend.expect('GET', '/api/salesdata/dashboarddropdown')
            .respond({
                someKey1: 'someValue',
                someKey2: ['ele1', 'ele2']
            });

        httpBackend.flush();

        /* test here the the value that getting changes in the 
         actual controller once the response received */
        expect(scope.someKey1).toEqual('someValue');

        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    //If there's is no action to be tested based on $location in your controller yo can remove this test entirely.
    it('should have a method to check the routes', function() {
        $location.path('/replaceWithRelatedUrl');
        expect($location.path()).toBe('/replaceWithRelatedUrl');
    });

    <%
    _.forEach(scopeVariables, function(scopeVariable) { %>
        it('scope.<%= scopeVariable %> should exhibit desired behavior', function() { <%
            if (scopeFunctions.indexOf(scopeVariable) > -1) { %>
                scope. <%= scopeVariable %> ( <%= methodArguments[scopeVariable] %> ); <%
            } %>
            expect(scope. <%= scopeVariable %> ).toBeDefined();
        }); <%
    }); %>

});
