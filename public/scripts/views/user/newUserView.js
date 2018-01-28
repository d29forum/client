'use strict';

(function(module) {
    const newUserView = {};

    newUserView.init = function(ctx, next) {
        console.log('hi');
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
        console.log(user);
        user.insert();
    }

  module.newUserView = newUserView;
})(app);