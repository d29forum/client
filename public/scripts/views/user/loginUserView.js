'use strict';

(function(module) {
    const loginUserView = {};

    loginUserView.init = function(ctx, next) {
        if (localStorage.waitingComment) page.show(localStorage.waitingThread);
        $('.view').addClass('hidden');
        $('.loginUserView').removeClass('hidden');
        next();
    }
    
    module.loginUserView = loginUserView;
})(app);
