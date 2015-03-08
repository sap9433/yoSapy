'use strict';


angular.module('MyApp')
    .controller('MultiplecomparisonCtrl', function($scope, $http, $rootScope, dashboardService) {
        $scope.tobeCompared = [];
        var parentScope = $scope.$parent;
        var filters = parentScope.filter;


        var loadMultiEntity = function() {
            if (filters.view_level === 1) {
                dashboardService.getSalePersons(filters.branch_id || filters.local_hq || filters.region_id, filters.role).then(function(data) {
                    $scope.entireList = data;
                });
            } else if (filters.view_level === 2) {
                if (filters.local_hq) {
                    $scope.entireList = _.filter(parentScope.offices, function(office) {
                        return office.parentOfficeBranchCode === filters.local_hq;
                    });
                } else if (filters.region_id) {
                    
                    var subordinateLocahHq = _.filter(parentScope.offices, function(office) {
                        return office.parentOfficeBranchCode === filters.region_id;
                    });
                    var locahHqBranchCodes = _.pluck(subordinateLocahHq, 'branchCode');
                    $scope.entireList = _.filter(parentScope.offices, function(office) {
                        return locahHqBranchCodes.indexOf(office.parentOfficeBranchCode) > -1;
                    });
                } else {
                    $scope.entireList = _.filter(parentScope.offices, function(office) {
                        return office.officeType.id === 4;
                    });
                }

            } else if (filters.view_level === 3) {
                if (filters.region_id) {
                    $scope.entireList = _.filter(parentScope.offices, function(office) {
                        return (office.parentOfficeBranchCode === filters.region_id) && (office.officeType.id === 3);
                    });
                } else {
                    $scope.entireList = _.filter(parentScope.offices, function(office) {
                
                        return office.officeType.id === 3;
                    });
                }

            } else if (filters.view_level === 4) {
                $scope.entireList = _.filter(parentScope.offices, function(office) {
                    
                    return office.officeType.id === 2;
                });
            }
        };

        loadMultiEntity();

        $scope.addtoCompare = function(employeeId, branchCode, name, localHqId, localHqName, regionHqId, regionHqName) {
            var event = window.event;
            var eventTarget = $(event.target || event.srcElement);
            var target = eventTarget.closest('.eachEntity').find('.comaprePin');
            var alreadyExixts;
            if (filters.view_level === 1) {
                alreadyExixts = _.find($scope.tobeCompared, {
                    'employeeId': employeeId
                });
                if (alreadyExixts) {
                    _.remove($scope.tobeCompared, function(item) {
                        return item.employeeId === employeeId;
                    });
                } else {
                    if (_.size($scope.tobeCompared) === 5) {
                        $rootScope.serverErrors = 'Maximum 5 entity can be compared';
                        $('#errorModal').modal('show');
                        return;
                    }
                    $scope.tobeCompared.push({
                        name: name,
                        employeeId: employeeId
                    });
                }
                target.toggleClass('green');
            } else {
                alreadyExixts = _.find($scope.tobeCompared, {
                    'branchCode': branchCode
                });
                if (alreadyExixts) {
                    _.remove($scope.tobeCompared, function(item) {
                        return item.branchCode === branchCode;
                    });
                } else {
                    if (_.size($scope.tobeCompared) === 5) {
                        $rootScope.serverErrors = 'Maximum 5 entity can be compared';
                        $('#errorModal').modal('show');
                        return;
                    }
                    $scope.tobeCompared.push({
                        name: name,
                        branchCode: branchCode,
                        localHqId: localHqId,
                        localHqName: localHqName,
                        regionHqId: regionHqId,
                        regionHqName: regionHqName
                    });
                }
                target.toggleClass('green');
            }
        };

        $scope.doneComparing = function(actionName) {
            $rootScope.$broadcast('doneComparing', {
                'actionName': actionName,
                'tobeCompared': $scope.tobeCompared
            });
        };

        $scope.removeFromCompare = function(employeeId, branchCode) {
            if (filters.view_level === 1) {
                $('.eachEntity > .j-emp-' + employeeId).prev('.comaprePin').removeClass('green');
                _.remove($scope.tobeCompared, function(item) {
                    return item.employeeId === employeeId;
                });
            } else {
                $('.eachEntity > .j-branch-' + branchCode).prev('.comaprePin').removeClass('green');
                
                _.remove($scope.tobeCompared, function(item) {
                    return item.branchCode === branchCode;
                });
            }
        };
    });
