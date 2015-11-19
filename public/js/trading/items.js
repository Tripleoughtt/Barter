'use strict';

$(document).ready(init);

function init() {
  $('#myItemsTable').on('click', '.deleteItem', removeItem);
  $('#trade').on('click', tradeInit);
  $('#myItemsTable').on('click', '.cancelTrade', cancelTrade);
  $('#myItemsTable').on('click', '.acceptTrade', acceptTrade);
  $('#myItemsTable').on('click', '.forTrade', changeTradeStatus)
}
function changeTradeStatus() {
  var item = {}
  item.itemName = ($(this).closest('tr').find('.myItem').text());
  $.post('trading/notForTrade', item)
  .done(function(changedTradeStatus) {
  })
  .fail(function(err) {
    console.error(err);
  })
}

function removeItem(){
  var $toRemove = $(this).closest('tr');
  var itemName = $toRemove.find('.myItem').text();
  $.post('/trading/removeItem', {itemName: itemName})
  .done(function(data){
    console.log(data);
    $toRemove.remove();
  })
}

function tradeInit() {
  var data = {};
  data.requestedItem = $('.request:checked').closest('tr').find('.publicItemName').text();
  data.respondingUser = $('.request:checked').closest('tr').find('.publicItemOwner').text();
  data.offeredItem = $('.offer:checked').closest('tr').find('.myItem').text();
  console.log(data);
  $.post('/trading/newTrade', data)
  .done(function(tradeComplete){
    console.log('trade complete', tradeComplete);

    var $cancel = $('<div>').addClass('btn btn-responsive btn-info cancelTrade pull-right').


    // var $thisRow = $('<div class="row"><h4 class="col-md-10 statement"><div class="col md 1"><div class="btn btn-responsive btn-info cancelTrade pull-right">Cancel?</div></div></h4></div>')
    // $thisRow.prependTo('#pendings')
    // $('.statement').text(`Test string`)
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

setInterval(() => {
  if ($('.request:checked')[0] && $('.offer:checked')[0]){
    $('#trade').prop('disabled', false)
  } else {$('#trade').prop('disabled', true)}
}, 500)