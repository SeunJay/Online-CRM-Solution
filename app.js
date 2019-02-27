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
/******************SALES FUNCTIONALITY*******************/

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
                $("#clearForm").trigger('click');
            },
            error: function(err) {
                console.log(err);
            }
        })
    })


    
    // displaying all created users 
    $("#getUsers").click(function(event){
        event.preventDefault();
        
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/users',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            success: function(data) {
                displayResult(data)
            },
            error: function(err) {
                console.log(err);
            }
        })
    })


    // function to enumerate created users 
    function displayResult(data) { 
        $('.userView').empty()

        var $list = $('<ul>');

        if(data.length) {
            data.forEach(item => {
                var $listItem = $('<li>')
                var $editButton = $(`<button id="editBtn" onClick="editUser(${item.id})">Edit User</button>`)
                var $deleteButton = $(`<button id="delBtn" onClick="deleteUser(${item.id})">Delete User</button>`)
                $listItem.append(item.id + '. ' + item.fullname);
                $listItem.append($editButton);
                $listItem.append($deleteButton);
                $list.append($listItem);
            });
    
        } else {
            var $listItem = $('<li>')
            $listItem.append('No user added yet');
            $list.append($listItem);     
        }

        $('.userView').append($list); 
    }


    // editing a user
    $('form#userEditForm').on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serializeObject();

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:3000/users/' + formData.id,
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
    $("#saveUsers").click(function(e){
        e.preventDefault()
        $("#userForm")[0].reset();
    })

})


// editing a user using using his id
function editUser(id) {
    $('.EWrapper').toggleClass('hidden');
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/users/${id}`,
        success: function(data) {
           console.log(data);
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

