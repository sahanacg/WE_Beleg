var enter_add_mode = function () {
  document.querySelector('#input_word').focus();
  var add_btn = document.querySelector('#add_btn');
  add_btn.onclick = function () {
    var word = document.querySelector('#input_word').value;
    var translation = document.querySelector('#input_translation').value;
    if(word != '' || translation != ''){
      localStorage.setItem(word, translation);
      localStorage.setItem(translation, word);
      console.log(input_word.value, input_translation.value);
      add_notify();
      clear_input_fields();
      hide_empty_warning();
      document.querySelector('#input_word').focus();
    }
    else{
      console.log('at least one field is empty');
      trigger_empty_warning();
    }
  }
}

var add_notify = function () {
  show_add_notify();
  setTimeout(function () {
    hide_add_notify();
  }, 400);
}

var show_add_notify = function () {
  document.querySelector('#overlay').hidden = false;
  document.querySelector('#overlay_msg').hidden = false;
}

var hide_add_notify = function () {
  document.querySelector('#overlay').hidden = true;
  document.querySelector('#overlay_msg').hidden = true;
}

var clear_input_fields = function () {
  document.querySelector('#input_word').value = '';
  document.querySelector('#input_translation').value = '';
}