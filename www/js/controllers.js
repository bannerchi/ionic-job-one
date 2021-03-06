angular.module('starter.controllers', [])

.controller('NewTitleCtrl', function($scope, $timeout, NewBookList, CONFIG, $state) {
        $scope.items = [];
        $scope.config = CONFIG;
        NewBookList.getBookList.then(function(res){
            var booklist = res.data.newBookList;
            $scope.items = booklist;

        },function(error){
            console.log(error.data);
        });

        $scope.loadMoreData = function() {
                NewBookList.getBookList.then(function(res){
                    var tmpItems = $scope.items,
                        newBookList = res.data.addBookList;
                    $timeout(function(){
                        $scope.items = tmpItems.concat(newBookList);
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    },1000);

                },function(error){
                    console.log(error.data);
                });

        };

        $scope.$on('$stateChangeSuccess', function() {
            $scope.loadMoreData();
        });
        $scope.moreDataCanBeLoaded = function(){
            if($scope.items.length >= 20){
                return false;
            } else {
                return true;
            }
        };
        $scope.mark = function(id){
            alert(id);
        };
        $scope.go = function(id){
            $state.go('tab.detail', {id:id});
        };
        //$scope.doRefresh = function(){
        //  $timeout( function() {
        //    //simulate async response
        //    $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);
        //
        //    //Stop the ion-refresher from spinning
        //    $scope.$broadcast('scroll.refreshComplete');
        //
        //  }, 1000);
        //};
})

.controller('BookmarksCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('DetailCtrl', function($scope, $state, $ionicModal, $ionicPopup) {
        var id = $state.params.id;
        $scope.items = [
            {
                "id":1,
                "author":"test1",
                "createTime":'2016.01.02 23:00:00',
                "content":"alskhdklasjdlkasjl,asdjal;sja;lkjsd,asdkljalksjd,asl;djkasl"
            },
            {
                "id":2,
                "author":"test1",
                "createTime":'2016.01.02 23:00:00',
                "content":"alskhdklasjdlkasjl,asdjal;sja;lkjsd,asdkljalksjd,asl;djkasl"
            },
            {
                "id":3,
                "author":"test1",
                "createTime":'2016.01.02 23:00:00',
                "content":"alskhdklasjdlkasjl,asdjal;sja;lkjsd,asdkljalksjd,asl;djkasl"
            },
            {
                "id":4,
                "author":"test1",
                "createTime":'2016.01.02 23:00:00',
                "content":"alskhdklasjdlkasjl,asdjal;sja;lkjsd,asdkljalksjd,asl;djkasl"
            },
            {
                "id":5,
                "author":"test1",
                "createTime":'2016.01.02 23:00:00',
                "content":"alskhdklasjdlkasjl,asdjal;sja;lkjsd,asdkljalksjd,asl;djkasl"
            }
        ];
        $scope.title = 'sdf;slkl;k;slkd;flk3;lkslkldslkllkslk,sdfoojslkls.';
        $scope.bgColor = "rgba(71, 175, 205, 0.15)";
        $scope.date = '2016.01.09';

        $scope.addArticle = function(){
            // TODO Add user auth check
            // TODO Add if already write check
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.aid = '5';
                $scope.parentArticle = "bulabulabula...";
                $scope.modal.show();
            });
        };

        $scope.createArticle = function(article){
            // TODO check words count
            if(article === undefined){
                var alertPopup = $ionicPopup.alert({
                    title: '请确认',
                    template: '确认你有写东西哦！',
                    okText:'知道了',
                    okType:'button-calm'
                });
            }
        };


});
