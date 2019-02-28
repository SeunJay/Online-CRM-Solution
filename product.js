$(function() {
    // var db = low('db.json');
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

    /********************** PRODUCT FUNCTIONALITY  *******************************/

    // displaying form for adding products
    $("#addProduct").click(function(event) {
        event.preventDefault();
        $('.fWrapper').animate({
            height: "toggle",
            opacity: "toggle"
        }, "slow")
        $('.fWrapper').toggleClass('hidden');
        $('.EWrapper').hide();
    })


    // creating new product on product form

    $('form#productForm').on('submit', function(e) {
        e.preventDefault();

        var formData = $(this).serializeObject();
        console.log(JSON.stringify(formData));

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/products',
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
                $("#clearProductForm").trigger('click');
            },
            error: function(err) {
                console.log(err);
            }
        })
    })

    $("#clearProductForm").click(function(e){
        e.preventDefault()
        $("#productForm")[0].reset();
    })



     // displaying all created products 
        
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/products',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            
            // function to enumerate created products

        }).done(function(data) {
            var $tableBody = $('tbody');
        $tableBody.empty();

        
        if(data.length) {
            data.forEach(item => {

            var $row = $('<tr>')
                var $productId = $('<td>');
                var $productName = $('<td>');
                var $productQty = $('<td>');
                var $productPrice = $('<td>');
                var $editAction = $(`<td><button id="editBtn" class="btn btn-outline-primary" onClick="editProduct(${item.id})">Edit Product</button></td>`)
                var $delAction = $(`<td><button id="delBtn" class="btn btn-outline-danger" onClick="deleteProduct(${item.id})">Delete Product</button></td>`)
                $productId.append(item.id +' .');
                $productName.append(item.productName);
                $productQty.append(item.productQty);
                $productPrice.append(item.productPrice)
                $row.append($productId)
                    .append($productName)
                    .append($productQty)
                    .append($productPrice)
                    .append($editAction)
                    .append($delAction)
                    .appendTo($tableBody);
            });
    
        } else {
            $tableBody.append('No product added yet');     
        }
        });
    // })


     
    // function displayProductResult(data) { 
        

        
    // }


    // editing a product
    $('form#productEditForm').on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serializeObject();

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:3000/products/' + formData.id,
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

    
    // clear edit form upon clicking
    $("#clearProductEditForm").click(function(e){
        e.preventDefault()
        $("#productEditForm")[0].reset();
    })


    // deleting a product using his id
    
    
})

function deleteProduct(id) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/products/${id}`,
        success: function() {
            console.log('success');
            location.reload();
            $("#getProduct").trigger('click');
        },
        error: function (err) {
            console.log(err);
        }
    })
}

    // editing a product using using its id
    
    function editProduct(id) {
        $('.EWrapper').animate({
            height: "toggle",
            opacity: "toggle"
        }, "slow")
        $('.EWrapper').toggleClass('hidden');
        $('.fWrapper').hide();

        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/products/${id}`, // returns undefined and doesnt put to db 
            success: function(data) {
            console.log(data);
            $.each(data, function(key, value){
                $('[name='+key+']', '#productEditForm').val(value);
            });
            },
            error: function (err) {
                console.log(err);
            }
        })
    }







