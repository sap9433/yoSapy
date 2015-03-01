describe('Controller: <%= fileName %>', function() {
    var scope, $location, createController;

    beforeEach(module('eikyoApp'));

    beforeEach(inject(function($rootScope, $controller, _$location_) {
        $location = _$location_;
        scope = $rootScope.$new();

        // Uncomment following line and provide dummy value for scope variable that's been used
        // TypeError: 'undefined' is not an object (evaluating '$scope.staticText
        scope.staticText = {week: "MyWeek"};

        createController = function() {
            return $controller('<%= "DashboardCtrl" %>', {
                '$scope': scope
            });
        };
    }));

    it('should have a method to check <your text goes here>', function() {
        expect(1).toBe(1);
    });
});
