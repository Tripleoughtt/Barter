'use strict';

$(document).ready(init);

function init() {
  $('.cancel').on('click', cancel);
}

function cancel() {
  $('input').val('');
  $('.message').hide();
  $('#editBio').hide();
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