var mode_chooser, home_card, start_btn, outer, home_btn;

document.addEventListener('DOMContentLoaded', function(){
    initialize();
  })

var initialize = function(){
  outer = document.querySelector('.outer');
  home_card = document.querySelector('.home_card');
  mode_chooser = document.querySelector('#mode_chooser');
  start_btn = document.querySelector('#start_btn');
  home_btn = document.querySelector('#home_btn');
  back_to_home();

  start_btn.onclick = function(){
    start();
  }

  home_btn.onclick = function () {
    back_to_home();
  }
}

var start = function () {
  if (mode_chooser.options[mode_chooser.selectedIndex].value == 'exercise'){
    start_exercise();
  }
  else{
    start_add();
  }
}

var load_html = function (page) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', page, false);
  xmlhttp.send()
  return xmlhttp.responseText;
}

var start_exercise = function () {
  var exercise_page = document.createElement('html');
  exercise_page.innerHTML = load_html('sub/exercise.html');
  var exercise_card = exercise_page.querySelector('.exercise_card');
  outer.replaceChild(exercise_card, outer.childNodes[2]);
  enter_exercise_mode();
}

var start_add = function () {
  var add_page = document.createElement('html');
  add_page.innerHTML = load_html('sub/add.html');
  var add_card = add_page.querySelector('.add_card');
  outer.replaceChild(add_card, outer.childNodes[2]);
  enter_add_mode();
}

var back_to_home = function () {
  //console.log('0 = ', outer.childNodes[0], '1 = ', outer.childNodes[1], '2 = ', outer.childNodes[2]);
  outer.replaceChild(home_card, outer.childNodes[2]);
}

var trigger_empty_warning = function () {
  document.querySelector('.empty_warning').hidden = false;
}

var hide_empty_warning = function () {
  document.querySelector('.empty_warning').hidden = true;
}