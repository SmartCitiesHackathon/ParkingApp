angular.module('parkingApp', [])

.service('handleRequest', ['$http', function ($http) {
  
  var url = "http://scpark1.tiesv.org/fid-parkingmanagement";
  var payload = "<Query><Find><Driver><Id><ne></ne></Id></Driver></Find></Query>";

  this.parseXML = function (xml) {
      var xmlDoc = xml.responseXML;
      document.getElementsByTagName("Query").innerHTML = 
      xmlDoc.getElementsByTagName("Driver")[0].childNodes[0].nodeValue;
  };

  this.sendPost = function (cb) {
    $http({
      method: 'POST',
      url: url,
      data: payload,
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-length': payload.length
      }
    }).then(function successCallback(response) {
    //On Success showing the result data in result Tab
      console.log("response inside sendPost is:", response);
      cb(response);
    }, function errorCallback(response) {
    //On error showing the error message
      console.log("error inside sendpost is:", response);
    });
    // // console.log("get request in process!");
    // $http.get('/')
    //   .then(function (data) {
    //     // console.log("data is", data);
    //   }, function (err) {
    //     // console.log("error is", err);
    // });
  };

  this.getPost = function (data, callback) {
    console.log("inside sending post to server");
    $http.post('/post', data) // update with http endpoint
    .then(function (result) {
      // console.log("response is ", result);
      callback(true);
    }, function (err) {
      // console.log("err from postRequest is", err);
      callback(false);
    });
  };

}])

.controller('parkingController', ['$scope', 'handleRequest', function ($scope, handleRequest) {
  // $scope.init = function () {
  //   console.log("controller");
  // };
  // $scope.test = "TEST";
  $scope.driver = {
    id: 'this is id',
    driver_id: '',
    parkedLostID: '',
    homeLocation: {
      latitude: '',
      longitude: ''
    },
    decision: '',
    lastUtilityFunction: '' ,
    timeParked: ''
  };

  $scope.sendPost = function () {
    handleRequest.sendPost(function (res) { // pass in data parameter
      // console.log("response inside controller:", JSON.stringify(res));
      console.log("response inside controller:", JSON.stringify(res));
      // $scope.driver.id = res.id;
    });
  };



  // $scope.getPost = function () {
  //   handleRequest.sendPost('', function (res) { // pass in data parameter
  //     console.log(data);
  //   });
  // };
  // $scope.init();
  $scope.sendPost();
}])
