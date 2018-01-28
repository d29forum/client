'use strict';

(function(module) {
    const loginUserView = {};

    loginUserView.init = function(ctx, next) {
        $('.view').addClass('hidden');
        $('.loginUserView').removeClass('hidden');
        next();
    }
    
    module.loginUserView = loginUserView;
})(app);
