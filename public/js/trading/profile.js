'use strict';

$(document).ready(init);

function init() {
  $('#profile').on('click', openProfileModal);
  $('#edit').on('click', editBio);
  $('#saveBioEdit').on('click', saveBioEdit);
}

function openProfileModal() {
  $('#profileModal').modal('show');
}

function editBio() {
  $('#bio').hide();
  $('#editBio').show();
}

// backend for this was not created
function saveBioEdit() {
  var bio = $('#editBio').val(); 
  $.post('/userProfile', bio)
  .done(function(done) {
    console.log('profile updated');
  })
  .fail(function(err) {
    console.error(err);
    $('#emptyFormWarn').show();
  })
}