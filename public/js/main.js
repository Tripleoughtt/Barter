'use strict';

$(document).ready(init);


function init() {
  $('#register').on('click', register) 
  $('#registerNewUser').on('click', registerNewUser)
  $('#login').on('click', login) 
  $('#loginUser').on('click', loginUser)  
  $('#logout').on('click', logout)
}

var loggedInUser;



// // check if user is already logged in
// if (document.cookie) {
//   var cookies = document.cookie;
//   $.get('/users/login', 'testing')
//   .done(function(user) {
//     console.log('main.js ', user);
//     // loggedInUser = user;
//     // fillCustomProfile(loggedInUser);
//   })
//   .fail(function(err) {
//     console.error(err);
//   });
// }

// function fillCustomProfile(user) {
//   $('#logout').show();
//   $('#register').hide();
//   $('#login').text('Welcome ' + loggedInUser.username);
//   $('#viewProfile').show();
// }

// register new user
function register() {
  $('.success').hide();
  $('#registration').modal('show');
}

function registerNewUser() {
  var user = {};
  user.username = $('#username').val();
  user.password = $('#password').val();
  var confirmPassword = $('#confirmPassword').val();

  if (user.username === '' || user.password === '') {
    $('.message').hide();
    clearForm();
    $('#registerEmptyFormWarn').show();
  } else if (user.password !== confirmPassword) {
    $('.message').hide();
    clearForm();
    $('#passwordMatchWarn').show();
  } else {
    $('.message').hide();
    $.post('users/register', user)
    .done(function(registeredUser) {
      $('#success').show();
      setTimeout(function() {
        $('#registration').modal('hide')
      }, 1500)
      clearForm();
    })
    .fail(function(err) {
      console.error(err);
    });
  }
}

function clearForm() {
  $('#username').val('');
  $('#password').val('');
  $('#confirmPassword').val('');
  $('#loginUsername').val('');
  $('#loginPassword').val('');
}

// login user
function login() {
  $('.message').hide();
  $('#loginUser').modal('show');
}
function loginUser() {
  var user = {};
  user.username = $('#loginUsername').val();
  user.password = $('#loginPassword').val();
  if (user.username === '' || user.password === '') {
    $('#loginEmptyFormWarn').show();
  } else {
    $.post('users/login', user)
    .done(function(user) {
      loggedInUser = user;
      $('#loginUser').modal('hide');
      clearForm();
      fillCustomProfile(loggedInUser);
    })
    .fail(function(err) {
      $('#username').val('');
      $('#password').val('');
      console.error(err);
    });
  }
}



// logout user
function logout() {
  $.post('/users/logout')
  .done(function() {
    $('#viewProfile').hide();
    $('#register').show();
    $('#logout').hide();
    $('#login').text('Login');
  });
}




