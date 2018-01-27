'use strict';

(function(module) {
    const newUserView = {};

    newUserView.init = function(ctx, next) {
        console.log('hi');
        $('.view').hide();
        $('.newUserView').show();
        $('#newUserForm').on('submit', newUserView.submit);
        next();
    }
    
    newUserView.submit = e => {
        e.preventDefault();
        let user = new app.User({
            title: $('#title').val(),
            author: $('#author').val(),
            isbn: $('#isbn').val(),
            image_url: $('#image_url').val(),
            description: $('#description').val(),
        });
        user.insertRecord();
    }

  module.newUserView = newUserView;
})(window);