var enter_exercise_mode = function () {
  if(localStorage.length != 0){
    var random_query_word = localStorage.key(Math.floor((Math.random() * localStorage.length-1) + 1));
    document.querySelector('#query_word').innerHTML = random_query_word;
    var answer_word = document.querySelector('#answer_word');
    answer_word.focus();
    answer_word.onkeydown = function (event) {
      if(event.key === 'Enter'){
	evaluate_answer(random_query_word, answer_word.value);
      }
    }
  }
  else{
    no_vocabulary_found();
  }
}

var no_vocabulary_found = function () {
  var no_vocabulary_page = document.createElement('html');
  no_vocabulary_page.innerHTML = load_html('sub/no_vocabulary.html');
  var no_vocabulary_card = no_vocabulary_page.querySelector('.no_vocabulary_card');
  outer.replaceChild(no_vocabulary_card, outer.childNodes[2]);
  var to_add_btn = document.querySelector('#to_add_btn');
  to_add_btn.onclick = start_add;
}

var evaluate_answer = function (query, answer) {
  correct_answer = localStorage.getItem(query)
  if( answer == correct_answer){
    show_correct_page();
  }
  else if (answer == '') {
    trigger_empty_warning();
  }
  else{
    show_wrong_page(correct_answer);
  }
}

var show_correct_page = function () {
  var correct_page = document.createElement('html');
  correct_page.innerHTML = load_html('sub/correct.html');
  var correct_card = correct_page.querySelector('.correct_card');
  outer.replaceChild(correct_card, outer.childNodes[2]);
  document.querySelector('.continue_btn').onclick = start_exercise;
  correct_card.focus();
  correct_card.onkeydown = function (event) {
    if(event.key == 'Enter'){
      start_exercise();
    }
  }
}

var show_wrong_page = function (correct_answer) {
  var wrong_page = document.createElement('html');
  wrong_page.innerHTML = load_html('sub/wrong.html');
  var wrong_card = wrong_page.querySelector('.wrong_card');
  outer.replaceChild(wrong_card, outer.childNodes[2]);
  document.querySelector('#correct_answer').innerHTML = correct_answer;
  document.querySelector('.continue_btn').onclick = start_exercise;
  wrong_card.focus();
  wrong_card.onkeydown = function (event) {
    if(event.key == 'Enter'){
      start_exercise();
    }
  }
}