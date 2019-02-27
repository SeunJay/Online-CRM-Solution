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

    /********************** PRODUCT FUNCTIONALITY*******************************/

    // displaying form for adding products
    $("#addProduct").click(function(event){
        event.preventDefault();
        $('.fWrapper').toggleClass('hidden');
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
                $("#clearForm").trigger('click');
            },
            error: function(err) {
                console.log(err);
            }
        })
    })



     // displaying all created products 
     $("#getProduct").click(function(event){
        event.preventDefault();
        
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/products',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            success: function(data) {
                displayProductResult(data);
                
            },
            error: function(err) {
                console.log(err);
            }
        })
    })


    // function to enumerate created products 
    function displayProductResult(data) { 
        $('.productView').empty()

        var $list = $('<ul>');

        if(data.length) {
            data.forEach(item => {
                var $listItem = $('<li>')
                var $editButton = $(`<button id="editBtn" onClick="editProduct(${item.id})">Edit Product</button>`)
                var $deleteButton = $(`<button id="delBtn" onClick="deleteProduct(${item.id})">Delete Product</button>`)
                $listItem.append(item.id + '. ' + item.name + ' ' + item.price);
                $listItem.append($editButton);
                $listItem.append($deleteButton);
                $list.append($listItem);
            });
    
        } else {
            var $listItem = $('<li>')
            $listItem.append('No user added yet');
            $list.append($listItem);     
        }

        $('.productView').append($list); 
    }


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

    
    // clear form upon clicking
    $("#saveProduct").click(function(e){
        e.preventDefault()
        $("#productForm")[0].reset();
    })

})


// deleting a user using his id
function deleteProduct(id) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/products/${id}`,
        success: function() {
            console.log('success');
            $("#getProduct").trigger('click');
        },
        error: function (err) {
            console.log(err);
        }
    })
}



// editing a user using using his id
function editProduct(id) {
    $('.EWrapper').toggleClass('hidden');
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/sales/${id}`,
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
}i










