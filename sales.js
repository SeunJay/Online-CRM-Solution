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
        $('.fWrapper').toggleClass('hidden');
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
                $("#clearUserForm").trigger('click');
            },
            error: function(err) {
                console.log(err);
            }
        })
    })



     // displaying all created sales 
     $("#getSales").click(function(event){
        event.preventDefault();
        
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/sales',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            success: function(data) {
                console.log(data)
                displaySalesResult(data);
                
            },
            error: function(err) {
                console.log(err);
            }
        })
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

    // function to enumerate created products 
    function displaySalesResult(data) { 
        $('.salesView').empty()

        var $list = $('<ul>');

        if(data.length) {
            data.forEach(item => {
                var $listItem = $('<li>')
                var $editButton = $(`<button id="editBtn" onClick="editSales(${item.id})">Edit Sales</button>`)
                var $deleteButton = $(`<button id="delBtn" onClick="deleteSales(${item.id})">Delete Sales</button>`)
                $listItem.append(item.id + '. ' + item.name + ' ' + item.product + ' ' + item.quantity + ' ' + item.total);
                $listItem.append($editButton);
                $listItem.append($deleteButton);
                $list.append($listItem);
            });
    
        } else {
            var $listItem = $('<li>')
            $listItem.append('No user added yet');
            $list.append($listItem);     
        }

        $('.salesView').append($list); 
    }


    // clear form upon clicking
    $("#clearSalesForm").click(function(e){
        e.preventDefault()
        $("#salesForm")[0].reset();
    })

});


// deleting a sales using his id
function deleteSales(id) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/sales/${id}`,
        success: function() {
            console.log('success');
            $("#getSales").trigger('click');
        },
        error: function (err) {
            console.log(err);
        }
    })
}



// editing a sales using using his id
function editSales(id) {
    $('.EWrapper').toggleClass('hidden');
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