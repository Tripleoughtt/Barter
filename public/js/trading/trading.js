'use strict';

$(document).ready(init);

function init() {
  $('.cancel').on('click', cancel);
  $('#logout').on('click', logout);
  $('#trade').on('click', tradeInit);
  $('.acceptTrade').on('click', acceptTrade)
  $('.cancelTrade').on('click', cancelTrade)
  $('.deleteItem').on('click', removeItem)
}

function removeItem(){
  var itemName = ($(this).closest('tr').find('.myItem').text())
  $.post('/trading/removeItem', {itemName: itemName})
  .done(function(data){
    console.log(data)
  })
}

function cancel() {
  $('input').val('');
  $('.message').hide();
  $('#editBio').hide();
  $('.modal').modal('hide');
}

function tradeInit() {
  var data = {};
  data.requestedItem = $('.request:checked').closest('tr').find('.publicItemName').text();
  data.respondingUser = $('.request:checked').closest('tr').find('.publicItemOwner').text();
  data.offeredItem = $('.offer:checked').closest('tr').find('.myItem').text();
  console.log(data);
  $.post('/trading/newTrade', data)
  .done(function(tradeComplete){
    console.log(tradeComplete)
  })
  .fail(function(err){
    console.error(err);
  })
};

function cancelTrade(){
  var data = {_id: $(this).attr('id')}
  $.ajax({
    type: "POST",
    url: '/trading/deleteTrade',
    data: data
  })
  .done(function(data){
    console.log(data)
  })
}

function acceptTrade(){
  var id = ($(this).attr('id'));
  var data = {_id: id};
  $.post('/trading/makeTrade', data)
  .done(function(data){
    console.log(data)
  })
}

function logout() {
  $.post('/logout')
  .done(function(data) {
    if(data.redirect){
      window.location = data.redirect
    }
  });
}

setInterval(() => {
  if ($('.request:checked')[0] && $('.offer:checked')[0]){
    $('#trade').prop('disabled', false)
  } else {$('#trade').prop('disabled', true)}
}, 500)