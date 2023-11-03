//all verbs which from the quiz is going to be created (checked level)
var verForQuiz;
//which question (verb) is displayed at the moment  
var fs_cntr = 0;
//information how many questions are in the current quiz
var fs_qty = 0;
//how many questions are going to be in the quiz 
var quizQuan = 0;
//table with all verbs that are going to be used in the quiz
var arrayForQuiz = document.createElement('table');
//table with all user amswers
var arrUserInput = document.createElement('table');
//if questions are going to be randomized
var ifRandom = true;
//node to be moved to the showing results view
var th = QSA("#verbstable thead")[0].cloneNode(true);
