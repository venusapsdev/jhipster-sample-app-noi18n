(function() {
    'use strict';

    angular
        .module('sampleNo18NApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('bank-account', {
            parent: 'entity',
            url: '/bank-account',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'BankAccounts'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/bank-account/bank-accounts.html',
                    controller: 'BankAccountController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('bank-account-detail', {
            parent: 'entity',
            url: '/bank-account/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'BankAccount'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/bank-account/bank-account-detail.html',
                    controller: 'BankAccountDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'BankAccount', function($stateParams, BankAccount) {
                    return BankAccount.get({id : $stateParams.id});
                }]
            }
        })
        .state('bank-account.new', {
            parent: 'bank-account',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/bank-account/bank-account-dialog.html',
                    controller: 'BankAccountDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                balance: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('bank-account', null, { reload: true });
                }, function() {
                    $state.go('bank-account');
                });
            }]
        })
        .state('bank-account.edit', {
            parent: 'bank-account',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/bank-account/bank-account-dialog.html',
                    controller: 'BankAccountDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['BankAccount', function(BankAccount) {
                            return BankAccount.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('bank-account', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('bank-account.delete', {
            parent: 'bank-account',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/bank-account/bank-account-delete-dialog.html',
                    controller: 'BankAccountDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['BankAccount', function(BankAccount) {
                            return BankAccount.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('bank-account', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();