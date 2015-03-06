describe('Controller: <%= fileName %>', function() {
    var scope, httpBackend, $location, <%= componentName %> ;

    beforeEach(module('<%= ngModule %>'));

    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, _$location_) {
        $location = _$location_;
        httpBackend = _$httpBackend_;
        scope = $rootScope.$new();

        /* Uncomment following line and provide dummy value for scope variables that's been used and not injected by generator
         e.g. -> TypeError: 'undefined' is not an object (evaluating '$scope.someDummy.someKey... )*/
        scope.staticText = {
            week: "someValue"
        };

        <%=
        componentName %> = $controller('<%= componentName %>', {
            $scope: scope
        });
    }));

    //If your controller is not using any http calls you can remove this test entirely . 
    it('should run the Test to get the link data from the backend', function() {

        var controller = scope.$new( <%= componentName %> );

        //this sets the expectation that , which http calls the controller gonna make , 
        // and what response does it expects .
        httpBackend.when('GET', '/api/salesdata/dashboarddropdown')
            .respond({
                viewLevel: 'resp.viewLevels',
                products: 'resp.products',
                roles: 'resp.roles',
                offices: 'resp.offices'
            });

        //this sets the expectation that , which http calls the controller gonna make , 
        // and what response does it expects .
        httpBackend.expect('GET', '/api/salesdata/dashboarddropdown')
            .respond({
                viewLevel: 'resp.viewLevels',
                products: 'resp.products',
                roles: 'resp.roles',
                offices: 'resp.offices'
            });

        httpBackend.flush();

        /* test here the the value that getting changes in the 
         actual controller once the response received */
        expect(scope.products).toEqual('resp.products');

        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    //
    it('should have a method to check the routes', function() {
        $location.path('/replaceWithRelatedUrl');
        expect($location.path()).toBe('/replaceWithRelatedUrl');
    });

    <%
    _.forEach(scopeVariables, function(scopeVariable) { %>
        it('scope.<%= scopeVariable %> should exhibit desired behavior', function() { <%
            if (scopeFunctions.indexOf(scopeVariable) > -1) { %>
                scope. <%= scopeVariable %> (); <%
            } %>
            expect(scope. <%= scopeVariable %> ).toBeDefined();
        }); <%
    }); %>

});
