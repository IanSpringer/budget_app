var $total;
var total = 0;
var $status;
var totalDue = 0;
var totalDeposits = 0;
var balance = 0;
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
        console.log("Bills total is " + total)
        var unPaid = [];
        for(var i = 0; i < data.length; i++){
          if (data[i].paid === false){
            unPaid.push(data[i].amount)
          }
        }
        for(var i = 0; i < unPaid.length; i++){
          totalDue = totalDue + unPaid[i];
        }
        console.log("amount still due is " + totalDue);
        $('#amountTotal').append("$" + total)
        $('#amountDue').append("$" + totalDue)



        data.forEach(function(bill){
        var tr = $('<tr>')
        var $bill = $('<td>').text(bill.billName)
        var $amount = $('<td>').text("$" + bill.amount)
        $status1 = $('<td>').text($status)


        if (bill.paid){
          $bill.css("text-decoration", "line-Through")
          $status = $('<p>&#9989</p>')
        }else{
          $status = $('<p>&#10060</p>')
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

                console.log(status)
              }else{

                console.log(status)
              }

            })
          })
        })

          $.ajax({
            url: '/api/deposits',
            method: 'GET'
          })
            .done(function(data){
              console.log(data[0].deposit);
              for(var i = 0; i < data.length; i++){
                totalDeposits = totalDeposits + data[i].deposit;
              }
              console.log('total deposits is ' + totalDeposits);
              balance = totalDeposits - total;
              console.log(balance)
              data.forEach(function(deposit){
                var tr = $('<tr>')
                deposit.date
                console.log(deposit.deposit)
                var $date = $('<td>').text(deposit.date)
                var $deposit = $('<td>').text("$" + deposit.deposit).css("color", "green")
                tr.append($date)
                tr.append($deposit)
                $('#tbody1').append(tr)

              })
                $('#depositTotal').append(totalDeposits)
                $('#balanceAmount').append(balance)
            })
          })
  })









