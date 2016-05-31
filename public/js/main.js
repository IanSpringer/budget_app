
$( document ).ready(function() {
    console.log( "ready!" );
    var $status;

    $.ajax({
      url: '/api/bills',
      method: 'GET'
    })
    .done(function(data){
      console.log(data)
      data.forEach(function(bill){
        var tr = $('<tr>')
        var $bill = $('<td>').text(bill.billName)
        var $amount = $('<td>').text(bill.amount)
        if (bill.paid){
          $bill.css("text-decoration", "line-Through")
          $status = "Paid"
        }else{
          $status = "Unpaid"
        }
      tr.append($bill)
      tr.append($amount)
      tr.append($status)
      $('#tbody').append(tr)

      tr.on('click', function(){
        console.log('editing' + bill.billName)
        // if(bill.paid === true){
        //   $bill.css("text-decoration", "none")
        // }
        // $bill.css("text-decoration", "line-Through")
        $.ajax({
          url: '/api/bills/' + bill._id,
          method: 'PUT',
          success: function(){
            if(bill.paid === true){
              $bill.css("text-decoration", "none")
              $status = "Unpaid"
           }else{
              $bill.css("text-decoration", "line-Through")
              $status = "Paid"
           }
          }
        })
          .done(function(){

          })



      })
    })

   })
})




