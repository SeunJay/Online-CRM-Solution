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

    // creating new customer on the Sign Up form
    $('form#customerForm').on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serializeObject();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/contact',
            data: JSON.stringify(formData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            success: function(data) {
                location.reload();
            },
            error: function(err) {
                console.log(err);
            }
        })
    })
})
