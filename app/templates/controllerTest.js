describe('Controller: <%= fileName %>', function() {
    var scope, $location, <%= componentName %> ;

    beforeEach(module('<%= ngModule %>'));

    beforeEach(inject(function($rootScope, $controller, _$location_) {
        $location = _$location_;
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

    <%
    _.forEach(scopeVariables, function(scopeVariable) { %>
        it('scope.<%= scopeVariable %> should exhibit desired behavior', function() { <%
            if (scopeFunctions.indexOf(scopeVariable) > -1) { %>
                scope. <%= scopeVariable %> ();
                <%
            } %>
            expect(scope. <%= scopeVariable %> ).toBeDefined();
        }); <%
    }); %>

});
