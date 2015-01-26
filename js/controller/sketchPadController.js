app.controller("SketchPadCtrl", function ($scope) {
    $scope.context = document.getElementById('sketch-pad').getContext("2d");

    $scope.dataUrl;
    $scope.imageData = {};

    $scope.image = new Image();

    $scope.docImageTest = new Image();
    $scope.docImageTest.src = "data:image/gif;base64,R0lGOD lhCwAOAMQfAP////7+/vj4+Hh4eHd3d/v7+/Dw8HV1dfLy8ubm5vX19e3t7fr 6+nl5edra2nZ2dnx8fMHBwYODg/b29np6eujo6JGRkeHh4eTk5LCwsN3d3dfX 13Jycp2dnevr6////yH5BAEAAB8ALAAAAAALAA4AAAVq4NFw1DNAX/o9imAsB tKpxKRd1+YEWUoIiUoiEWEAApIDMLGoRCyWiKThenkwDgeGMiggDLEXQkDoTh CKNLpQDgjeAsY7MHgECgx8YR8oHwNHfwADBACGh4EDA4iGAYAEBAcQIg0Dk gcEIQA7"

    $scope.displayData = function () {
        $scope.imageData.dataExists = true;
        $scope.imageData.dataSrc = document.getElementById('sketch-pad').toDataURL('image/png');
    }
});