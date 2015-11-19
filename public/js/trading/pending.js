'use strict';

$(document).ready(init);

function init() {
  $('#pending').on('click', openPendingModal);
  // $('#edit').on('click', editBio);
  // $('#sameBioEdit').on('click', saveBioEdit);
}

function openPendingModal() {
  console.log('pending clicked');
  $('#pendingModal').modal('show');
}

// function editBio() {
//   $('#bio').hide();
//   $('#editBio').show();
// }

// function saveBioEdit() {
//   var bio = $('#editBio').val(); 
//   $.post('/userProfile', bio)
//   .done(function(done) {
//     console.log('profile updated');
//   })
//   .fail(function(err) {
//     console.error(err);
//     $('#emptyFormWarn').show();
//   })
// }