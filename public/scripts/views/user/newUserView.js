'use strict';

(function(module) {
    const newUserView = {};

    newUserView.init = function(ctx, next) {
        $('.view').hide();
        $('.newUserView').show();
        $('#newUserForm').on('submit', newUserView.submit);
        // next();
    }
    
    newUserView.submit = e => {
        e.preventDefault();
        let user = new app.User({
            username: $('#username').val(),
        });
        user.insert();
    }

  module.newUserView = newUserView;
})(app);