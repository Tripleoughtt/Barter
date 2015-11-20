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