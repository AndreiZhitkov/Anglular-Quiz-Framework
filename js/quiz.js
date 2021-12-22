(function(){

	var app = angular.module( 'musQuiz',[]);
	
	app.controller('QuizController', ['$scope', '$http', '$sce',  function ( $scope, $http, $sce ){
	
	$scope.score = 0;
	$scope.activeQuestion = -1;
	$scope.activeQuestionAnswered = 0;
	$scope.persentage = 0;
	$scope.correctClass = Array ();
	
	$http.get('quiz_data.json').then ( function (quizData) {
	$scope.myQuestions = quizData.data;
	$scope.totalQuestions = $scope.myQuestions.length;
	});
	 $scope.selectAnswer = function (qIndex, aIndex) {
		var questionState = $scope.myQuestions[qIndex].questionState;
		if ( questionState != 'answered' ){
			$scope.myQuestions[qIndex].selectedAnswer = aIndex;
			var correctAnswer = $scope.myQuestions[qIndex].correct;
			 $scope.myQuestions[qIndex].correctAnswer = correctAnswer;

			if (aIndex === correctAnswer ){
				$scope.myQuestions[qIndex].correctness = 'correct';
				$scope.score += 1;
				$scope.correctClass.push ( 'correct' );
			}else{
				$scope.myQuestions[qIndex].correctness = 'incorrect';
				$scope.correctClass.push ( 'incorrect' );
			}
			$scope.myQuestions[qIndex].questionState = 'answered';
		}
		$scope.persentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(1);
	}
	
	$scope.isSelected = function (qIndex, aIndex) {
		return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
	}
	$scope.isCorrect = function (qIndex, aIndex) {
		return $scope.myQuestions[qIndex].correctAnswer === aIndex;
	}
	$scope.selectContinue = function () {
		return $scope.activeQuestion += 1;
	}
	$scope.createShareLinks = function (persentage) {
		var url = window.location.href;
		var facebookLink = '<div class="fb-share-button btn" data-href="http://www.avidforum.com/apps/music_quiz/beethoven_quiz/" data-layout="button" data-size="large" data-mobile-iframe="false"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.avidforum.com%2Fapps%2Fmusic_quiz%2Fbeethoven_quiz/index.html&amp;src=sdkpreparse">Challenge your friends</a></div>';
		var emailLink = '<a class="btn email" href="mailto:?subject=Try to beat my score!&amp;body=I scored '+persentage+'% on my Beethoven quiz! Try to beat my score at '+url+' ">Send by e-mail</a>';
		var twitterLink = '<a class="btn twitter" target="_blank" href="http://twitter.com/share?url='+url+'&amp;text=I scored '+persentage+'%25 on this Beethoven quiz. Try to top this at&amp;hashtags=BeethovenQuiz">Bragg on Twitter.</a>';
		var newMarkup = facebookLink + twitterLink + emailLink;
		return $sce.trustAsHtml(newMarkup);
	}
	$scope.playAudio = function () {
	whichPlayer = '#player';
	whichPlayer = whichPlayer + $scope.activeQuestion;
      	$scope.player =  document.querySelector(whichPlayer) ; 
      	      	$scope.player.play();
	}
	}]);

})();