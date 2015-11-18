'use strict';

$(document).ready(init);

function init() {
  $('.cancel').on('click', cancel);
  $('#saveNewItem').on('click', save);
}

function cancel() {
  $('input').val('');
  $('.message').hide();
  $('.modal').modal('hide');
}

function logout() {
  $.post('/logout')
  .done(function() {
    // $('#viewProfile').hide();
    // $('#register').show();
    // $('#logout').hide();
    // $('#login').text('Login');
  });
}