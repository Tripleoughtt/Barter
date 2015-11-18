'use strict';

$(document).ready(init);

function init() {
  $('#profile').on('click', openProfileModal);
  $('')
}

function openProfileModal() {
  $('#profileModal').modal('show');
}

// function save() {
//   var item = {};
//   item.name = $('#itemName').val(); 
//   item.description = $('#itemDescription').val(); 
//   if (item.name === '' || item.description === '') {
//     $('.message').hide();
//     $('#emptyFormWarn').show();
//   } else {
//     $('input').val('');
//     $('.message').hide();
//     $.post('/addItem')
//     .done(function(done) {
//       console.log('new item saved');
//     })
//     .fail(function(err) {
//       console.error(err);
//       $('#emptyFormWarn').show();
//     })
//   }
//   console.log(item);
// }