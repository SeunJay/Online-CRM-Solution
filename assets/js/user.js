$(function () {
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
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

    // ******************************   USERS FUNCTIONALITY   ******************************** //

    // creating new user on the user form
    $('form#userForm').on('submit', function (e) {
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

            success: function (data) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    onClose: function () {
                        window.location.reload();
                    }
                });
                Toast.fire({
                    type: 'success',
                    title: 'Added successfully'
                })
            },
            error: function (err) {
                console.log(err);
            }
        })
    })

    // clear user form upon clicking
    $("#clearUserForm").click(function (e) {
        e.preventDefault()
        $("#userForm")[0].reset();
    })



    // displaying all created users 

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/users',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).done(function (data) {
        var $tableBody = $('tbody');
        $tableBody.empty();


        // function to enumerate created users
        if (data.length) {
            data.forEach(item => {
                var $row = $('<tr>')

                var $userId = $('<td>')
                var $fullname = $('<td>');
                var $email = $('<td>');
                var $phone = $('<td>');
                var $editAction = $(`<td><button id="editBtn" data-toggle="modal" data-target="#editUser" class="btn btn-outline-primary" onClick="editUser(${item.id})">Edit</button></td>`)
                var $delAction = $(`<td><button id="delBtn" class="btn btn-outline-danger" onClick="deleteUser(${item.id})">Delete</button></td>`)
                $userId.append(item.id + ' .');
                $fullname.append(item.fullname);
                $email.append(item.email);
                $phone.append(item.phone)
                $row.append($userId)
                    .append($fullname)
                    .append($email)
                    .append($phone)
                    .append($editAction)
                    .append($delAction)
                    .appendTo($tableBody);
            });

        } else {
            $tableBody.append('No user added yet');
        }

    });



    // clear edit form upon clicking
    $("#clearUserEditForm").click(function (e) {
        e.preventDefault()
        $("#userEditForm")[0].reset();
    })
})


// editing a user using using his id
function editUser(id) {

    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/users/${id}`,

        success: function (data) {
            $.each(data, function (key, value) {
                $('[name=' + key + ']', '#userEditForm').val(value);
            });
        },
        error: function (err) {
            console.log(err);
        }
    })

    // editing a user

    $('form#userEditForm').on('submit', function (e) {
        e.preventDefault();
        var formData = $(this).serializeObject();

        $.ajax({
            type: 'PUT',
            url: `http://localhost:3000/users/${id}`,
            data: JSON.stringify(formData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function (data) {
                $('.EWrapper').toggleClass('hidden');
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    onClose: function () {
                        window.location.reload();
                    }
                });
                Toast.fire({
                    type: 'success',
                    title: 'Updated successfully'
                })
            },
            error: function (err) {
                console.log(err);
            }
        })
    })
}


// deleting a user using his id
function deleteUser(id) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/users/${id}`,
        success: function () {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                onClose: function () {
                    window.location.reload();
                }
            });

            Toast.fire({
                type: 'success',
                title: 'Deleted successfully'
            })
        },
        error: function (err) {
            console.log(err);
        }
    })
}


