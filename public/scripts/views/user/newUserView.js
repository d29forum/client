'use strict';

(function(module) {
    const newUserView = {};

    newUserView.init = function(ctx, next) {
        console.log("new user view init");
        $('.view').addClass('hidden').find('*').off();
        $('.newUserView').removeClass('hidden');
        $('#newUserForm').on('submit', newUserView.submit);
        // next();
    }
    
    newUserView.submit = e => {
        e.preventDefault();
        let user = new app.User({
            username: $('#username').val(),
        });
        console.log('new user view submit', user);
        user.insert();
    }

  module.newUserView = newUserView;
})(app);
