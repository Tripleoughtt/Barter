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
  // itemInfo.item.description = $('#itemDescription').val(); 
  console.log(item);
  if (item.name === '') {
    $('.message').hide();
    $('#emptyFormWarn').show();
  } else {
    $('input').val('');
    $('.message').hide();
    $.post('trading/addItem', item)
    .done(function(done) {
      console.log('new item saved');
      $('#addModal').modal('hide');
    })
    .fail(function(err) {
      console.error(err);
      $('#emptyFormWarn').show();
    })
  }
}