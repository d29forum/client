'use strict';

(function(module) {
    const loginUserView = {};

    loginUserView.init = function(ctx, next) {
        $('.view').hide();
        $('.loginUserView').show();
        next();
    }
    
    module.loginUserView = loginUserView;
})(app);