    var $total;
    var total = 0;
    var status1;
    var $status;
$( document ).ready(function() {
    console.log( "ready!" );

    $.ajax({
      url: '/api/bills',
      method: 'GET'
    })
    .done(function(data){
      console.log(data)
        for(var i = 0; i < data.length; i++){
          total = total + data[i].amount
        }
          console.log("total owed is " + total)
        $('#amountTotal').append(total)
        data.forEach(function(bill){
        var tr = $('<tr>')
        var $bill = $('<td>').text(bill.billName)
        var $amount = $('<td>').text(bill.amount)
        $status1 = $('<td>').text($status)

        if (bill.paid){
          $bill.css("text-decoration", "line-Through")
          $status = "Paid"
        }else{
          $status = "Unpaid"
        }
        tr.append($bill)
        tr.append($amount)
        tr.append($status)
        tr.append($total)

        $('#tbody').append(tr)



        tr.on('click', function(){
          console.log('editing ' + bill.billName)
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
                // $status.html("Unpaid")
             }else{
                $bill.css("text-decoration", "line-Through")
                // $status.html("Paid")
             }
            }
          })
            .done(function(){
              if(bill.paid){
                $status.text("Paid")
                console.log(status.text)
              }else{
                $status1.text("Unpaid")
              }
            })



      })
    })

   })
})




