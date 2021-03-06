(function() {
    'use strict';

    angular
        .module('gpmrApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('pet-category', {
            parent: 'entity',
            url: '/pet-category',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'PetCategories'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pet-category/pet-categories.html',
                    controller: 'PetCategoryController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('pet-category-detail', {
            parent: 'entity',
            url: '/pet-category/{petCategoryId}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'PetCategory'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pet-category/pet-category-detail.html',
                    controller: 'PetCategoryDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'PetCategory', function($stateParams, PetCategory) {
                    return PetCategory.get({petCategoryId : $stateParams.petCategoryId});
                }]
            }
        })
        .state('pet-category.new', {
            parent: 'pet-category',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pet-category/pet-category-dialog.html',
                    controller: 'PetCategoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                petCategoryId: null,
                                name: null,
                                speed: null,
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('pet-category', null, { reload: true });
                }, function() {
                    $state.go('pet-category');
                });
            }]
        })
        .state('pet-category.edit', {
            parent: 'pet-category',
            url: '/{petCategoryId}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pet-category/pet-category-dialog.html',
                    controller: 'PetCategoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['PetCategory', function(PetCategory) {
                            return PetCategory.get({petCategoryId : $stateParams.petCategoryId});
                        }]
                    }
                }).result.then(function() {
                    $state.go('pet-category', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('pet-category.delete', {
            parent: 'pet-category',
            url: '/{petCategoryId}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pet-category/pet-category-delete-dialog.html',
                    controller: 'PetCategoryDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['PetCategory', function(PetCategory) {
                            return PetCategory.get({petCategoryId : $stateParams.petCategoryId});
                        }]
                    }
                }).result.then(function() {
                    $state.go('pet-category', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
