$(function () {
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

    // displaying form for adding new user
    $("#addUser").click(function(event){
        event.preventDefault();
        $('.fWrapper').toggleClass('hidden');
    })


    // creating new user on the user form
    $('form#userForm').on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serializeObject();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/users',
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

    // clear user form upon clicking
    $("#clearUserForm").click(function(e){
        e.preventDefault()
        $("#userForm")[0].reset();
    })


    
    // displaying all created users 
    // $("#getUsers").click(function(event){
        // event.preventDefault();
        
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/users',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // success: function(data) {
            //     displayResult(data)
            // },
            // error: function(err) {
            //     console.log(err);
            // }
        }).done(function(data) {
            var $tableBody = $('tbody');
            $tableBody.empty();

       
            // function to enumerate created users
        if(data.length) {
            data.forEach(item => {
                var $row = $('<tr>')

                var $userId = $('<td>')
                var $fullname = $('<td>');
                var $email = $('<td>');
                var $phone = $('<td>');
                var $address = $('<td>');
                var $editAction = $(`<td><button id="editBtn" class="btn btn-outline-primary" onClick="editUser(${item.id})">Edit User</button></td>`)
                var $delAction = $(`<td><button id="delBtn" class="btn btn-outline-danger" onClick="deleteUser(${item.id})">Delete User</button></td>`)
                $userId.append(item.id +' .');
                $fullname.append(item.fullname);
                $email.append(item.email);
                $phone.append(item.phone)
                $address.append(item.$address)
                $row.append($userId)
                    .append($fullname)
                    .append($email)
                    .append($phone)
                    .append($address)
                    .append($editAction)
                    .append($delAction)
                    .appendTo($tableBody);
            });
    
        } else {
            $tableBody.append('No user added yet');    
        }
        });
    // })
     
    // function displayResult(data) { 
        


    // }


    // editing a user
    $('form#userEditForm').on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serializeObject();
        console.log(formData);
        

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:3000/users/'+formData.id,
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
    $("#clearUserEditForm").click(function(e){
        e.preventDefault()
        $("#userEditForm")[0].reset();
    })
    

})


// editing a user using using his id
function editUser(id) {
    $('.EWrapper').toggleClass('hidden');
     $('.fWrapper').hide();
    
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/users/${id}`,

        success: function(data) {           
           $.each(data, function(key, value){
            $('[name='+key+']', '#userEditForm').val(value);
          });
        },
        error: function (err) {
            console.log(err);
        }
    })
}


    // deleting a user using his id
    function deleteUser(id) {
        $.ajax({
            method: 'DELETE',
            url: `http://localhost:3000/users/${id}`,
            success: function() {
                console.log('success');
                $("#getUsers").trigger('click');
            },
            error: function (err) {
                console.log(err);
            }
        })
    }


