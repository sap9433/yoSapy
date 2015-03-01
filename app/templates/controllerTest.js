describe('Controller: <%= fileName %>', function() {
    var scope, $location, createController;

    beforeEach(module('<%= ngModule %>'));

    beforeEach(inject(function($rootScope, $controller, _$location_) {
        $location = _$location_;
        scope = $rootScope.$new();

        /* Uncomment following line and provide dummy value for scope variables that's been used and not injected by generator
         e.g. -> TypeError: 'undefined' is not an object (evaluating '$scope.someDummy.someKey... )*/
        // scope.someDummy = {someKey: "someValue"};

        createController = function() {
            return $controller('<%= componentName %>', {
                '$scope': scope
            });
        };
    }));

    it('should have a method to check <your text goes here>', function() {
        expect(3).toBe(3);
    });


    
    <% _.forEach(scopeVariables, function(user) { %>
        '<li>'
            <%- user %>
        '</li>' 
    <% }); %>
    
});
