'use strict';

(function(module) {
    const loginUserView = {};

    loginUserView.init = function(ctx, next) {
        console.log('hi');
        $('.view').hide();
        $('.loginUserView').show();
        next();
    }
    
    module.loginUserView = loginUserView;
})(window);