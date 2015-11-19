'use strict';

$(document).ready(init);

function init() {
  $('#add').on('click', openAddModal);
  $('#saveNewItem').on('click', saveNewItem);
}

function openAddModal() {
  console.log('add modal clicked')
  $('#addModal').modal('show');
}

function saveNewItem() {
  var item = {};
  item.name = $('#itemName').val(); 
  item.description = $('#itemDescription').val(); 
  if (item.name === '' || item.description === '') {
    $('.message').hide();
    $('#emptyFormWarn').show();
  } else {
    $('input').val('');
    $('.message').hide();
    $.post('/addItem', item)
    .done(function(done) {
      console.log('new item saved');
    })
    .fail(function(err) {
      console.error(err);
      $('#emptyFormWarn').show();
    })
  }
  console.log(item);
}