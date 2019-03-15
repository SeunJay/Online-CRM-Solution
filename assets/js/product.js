$(function () {
    // var db = low('db.json');
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || "");
            } else {
                o[this.name] = this.value || "";
            }
        });
        return o;
    };

    /********************** PRODUCT FUNCTIONALITY  *******************************/

    // creating new product on product form
    $("form#productForm").on("submit", function (e) {
        e.preventDefault();

        var formData = $(this).serializeObject();
        console.log(JSON.stringify(formData));

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/products",
            data: JSON.stringify(formData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            success: function (data) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    onClose: function () {
                        window.location.reload();
                    }
                });
                Toast.fire({
                    type: "success",
                    title: "Added successfully"
                });
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

    // clear product form Upon clicking
    $("#clearProductForm").click(function (e) {
        e.preventDefault();
        $("#productForm")[0].reset();
    });

    // displaying all created products
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/products",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        var $tableBody = $("tbody");
        $tableBody.empty();

        // function to enumerate created products
        if (data.length) {
            data.forEach(item => {
                var $row = $("<tr>");
                var $productId = $("<td>");
                var $productName = $("<td>");
                var $productQty = $("<td>");
                var $productPrice = $("<td>");
                var $editAction = $(
                    `<td><button id="editBtn" data-toggle="modal" data-target="#editProduct" class="btn btn-outline-primary" onClick="editProduct(${
                    item.id
                    })">Edit</button></td>`
                );
                var $delAction = $(
                    `<td><button id="delBtn" class="btn btn-outline-danger" onClick="deleteProduct(${
                    item.id
                    })">Delete</button></td>`
                );
                $productId.append(item.id + " .");
                $productName.append(item.productName);
                $productQty.append(item.productQty);
                $productPrice.append(item.productPrice);
                $row
                    .append($productId)
                    .append($productName)
                    .append($productQty)
                    .append($productPrice)
                    .append($editAction)
                    .append($delAction)
                    .appendTo($tableBody);
            });
        } else {
            $tableBody.append("No product added yet");
        }
    });

    // clear edit form upon clicking
    $("#clearProductEditForm").click(function (e) {
        e.preventDefault();
        $("#productEditForm")[0].reset();
    });
});

// editing a product using using its id
function editProduct(id) {
    $.ajax({
        method: "GET",
        url: `http://localhost:3000/products/${id}`,
        success: function (data) {
            $.each(data, function (key, value) {
                $("[name=" + key + "]", "#productEditForm").val(value);
            });
        },
        error: function (err) {
            console.log(err);
        }
    });

    // editing a product
    $("form#productEditForm").on("submit", function (e) {
        e.preventDefault();
        var formData = $(this).serializeObject();

        $.ajax({
            type: "PUT",
            url: `http://localhost:3000/products/${id}`,
            data: JSON.stringify(formData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },

            success: function (data) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    onClose: function () {
                        window.location.reload();
                    }
                });
                Toast.fire({
                    type: "success",
                    title: "Updated successfully"
                });
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
}

// deleting a product using its id
function deleteProduct(id) {
    $.ajax({
        method: "DELETE",
        url: `http://localhost:3000/products/${id}`,
        success: function () {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                onClose: function () {
                    window.location.reload();
                }
            });
            Toast.fire({
                type: "success",
                title: "Deleted successfully"
            });
        },
        error: function (err) {
            console.log(err);
        }
    });
}
