'use strict';

(function(module) {
    const loginUserView = {};

    loginUserView.init = function(ctx, next) {
        if (localStorage.waitingComment) page.show(localStorage.waitingThread)
        $('.view').addClass('hidden').find('*').off();
        $('.loginUserView').removeClass('hidden');
        $('#userLoginForm').on('submit', loginUserView.submit);
    }

    loginUserView.submit = e => {
        e.preventDefault();
        let user = {
            username: e.target.usernameLogin.value,
        };
        // console.log(user);
        app.User.login(user);
    }
    
    module.loginUserView = loginUserView;
})(app);


