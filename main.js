var mode_chooser, home_card, start_btn, outer, home_btn, import_btn, export_btn;

document.addEventListener('DOMContentLoaded', function(){
    initialize();
  })

var initialize = function(){
  outer = document.querySelector('.outer');
  home_card = document.querySelector('.home_card');
  mode_chooser = document.querySelector('#mode_chooser');
  start_btn = document.querySelector('#start_btn');
  home_btn = document.querySelector('#home_btn');
  import_btn = document.querySelector('#import_btn');
  export_btn = document.querySelector('#export_btn');
  back_to_home();

  start_btn.onclick = start;
  home_btn.onclick = back_to_home;
  export_btn.onclick = export_localstorage;
  import_btn.onclick = import_as_localstorage;
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

var export_localstorage = function () {
  var localstorage_json = JSON.stringify(localStorage);
  var download_link = document.createElement('a');
  download_link.setAttribute('href', 'data:application/json;charset=utf-8,'
                              + encodeURIComponent(localstorage_json));
  download_link.setAttribute('download', 'vocabulary.json');
  download_link.setAttribute('style', 'display:none');
  download_link.click();
}

var import_as_localstorage = function () {
  var file_chooser = document.createElement('input');
  file_chooser.setAttribute('type', 'file');
  file_chooser.setAttribute('style', 'display:none');
  file_chooser.setAttribute('accept', '.json');

  file_chooser.onchange = function (event) {
    var input = event.target;
    var file_reader = new FileReader();

    file_reader.onload = function () {
      var localstorage_json = file_reader.result;
      localstorage_json = JSON.parse(localstorage_json);
      for (var key in localstorage_json) {
        localStorage.setItem(key, localstorage_json[key]);
      }
    }
    file_reader.readAsText(input.files[0]);
  }
  file_chooser.click();
}

var trigger_empty_warning = function () {
  document.querySelector('.empty_warning').hidden = false;
}

var hide_empty_warning = function () {
  document.querySelector('.empty_warning').hidden = true;
}