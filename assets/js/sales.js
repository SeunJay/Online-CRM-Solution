        $(function() {
            $.fn.serializeObject = function() {
                var o = {};
                var a = this.serializeArray();
                $.each(a, function() {
                    if (o[this.name]) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
            };

            /********************** SALES FUNCTIONALITY*******************************/

            // displaying form for adding sales
            $("#addSales").click(function(event){
                event.preventDefault();
                $('.fWrapper').animate({
                    height: "toggle",
                    opacity: "toggle"
                }, "slow") 
                $('.fWrapper').toggleClass('hidden');
                $('.EWrapper').hide();
                
            })


            // creating new sales on sales form
            $('form#salesForm').on('submit', function(e) {
                e.preventDefault();

                var formData = $(this).serializeObject();
                console.log(JSON.stringify(formData));

                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:3000/sales',
                    data: JSON.stringify(formData),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },

                    success: function(data) {
                        location.reload();
                        $('.fWrapper').animate({
                            height: "toggle",
                            opacity: "toggle"
                        }, "slow")
                        $("#clearUserForm").trigger('click');
                    },
                    error: function(err) {
                        console.log(err);
                    }
                })
            })

                    // clear form upon clicking
                    $("#clearSalesForm").click(function(e){
                        e.preventDefault()
                        $("#salesForm")[0].reset();
                    })



            // displaying all created sales 

                
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:3000/sales',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                
            }).done(function(data) {
                var $tableBody = $('tbody');
                $tableBody.empty();

        
                // function to enumerate created sales

            if(data.length) {
                data.forEach(item => {
                    var $row = $('<tr>')

                    var $salesId = $('<td>')
                    var $custname = $('<td>');
                    var $product = $('<td>');
                    var $quantity = $('<td>');
                    var $price = $('<td>');
                    var $editAction = $(`<td><button id="editBtn" class="btn btn-outline-primary" onClick="editSales(${item.id})">Edit Sales</button></td>`)
                    var $delAction = $(`<td><button id="delBtn" class="btn btn-outline-danger" onClick="deleteSales(${item.id})">Delete Sales</button></td>`)
                    $salesId.append(item.id +' .');
                    $custname.append(item.custname);
                    $product.append(item.product);
                    $quantity.append(item.quantity)
                    $price.append(item.price)
                    $row.append($salesId)
                        .append($custname)
                        .append($product)
                        .append($quantity)
                        .append($price)
                        .append($editAction)
                        .append($delAction)
                        .appendTo($tableBody);
                });

            } else {
                $tableBody.append('No user added yet');    
            }
            });

            // clear edit form upon clicking
            $("#clearSalesEditForm").click(function(e){
                e.preventDefault()
                $("#salesEditForm")[0].reset();
            })

            


            // editing a sales
            $('form#salesEditForm').on('submit', function(e) {
                e.preventDefault();
                var formData = $(this).serializeObject();

                $.ajax({
                    type: 'PUT',
                    url: 'http://localhost:3000/sales/' + formData.id,
                    data: JSON.stringify(formData),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },

                    success: function(data) {
                        $('.EWrapper').toggleClass('hidden');
                    },
                    error: function(err) {
                        console.log(err);
                    }
                })
            })
        

        });


        // deleting a sales using his id
        function deleteSales(id) {
            $.ajax({
                method: 'DELETE',
                url: `http://localhost:3000/sales/${id}`,
                success: function() {
                    console.log('success');
                    location.reload();
                    $("#getSales").trigger('click');
                },
                error: function (err) {
                    console.log(err);
                }
            })
        }



                // editing a sales using using his id
                function editSales(id) {
                    $('.EWrapper').animate({
                        height: "toggle",
                        opacity: "toggle"
                    }, "slow")
                    $('.EWrapper').toggleClass('hidden');
                    $('.fWrapper').hide();
                    
                    $.ajax({
                        method: 'GET',
                        url: `http://localhost:3000/sales/${id}`,
                        success: function(data) {
                        console.log(data);
                        $.each(data, function(key, value){
                            $('[name='+key+']', '#salesEditForm').val(value);
                        });
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    })
                }