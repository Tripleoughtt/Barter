'use strict';

$(document).ready(init);

function init() {
  $('.cancel').on('click', cancel);
  $('#logout').on('click', logout);
  $('#trade').on('click', tradeInit);
}

function cancel() {
  $('input').val('');
  $('.message').hide();
  $('#editBio').hide();
  $('.modal').modal('hide');
}

function tradeInit() {
  if ($('.request:checked') && $('.offer:checked')){
    
  }
};

function logout() {
  $.post('/logout')
  .done(function(data) {
    if(data.redirect){
      window.location = data.redirect
    }
    // $('#viewProfile').hide();
    // $('#register').show();
    // $('#logout').hide();
    // $('#login').text('Login');
  });
}

setInterval(() => {
  if ($('.request:checked')[0] && $('.offer:checked')[0]){
    $('#trade').prop('disabled', false)
  } else {$('#trade').prop('disabled', true)}
}, 500)