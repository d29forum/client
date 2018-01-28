'use strict';

(function(module) {
    const userView = {};

    userView.init = function(ctx, next) {
        $('.view').addClass('hidden');
        $('.userView').removeClass('hidden');
        next();
    }
    
    module.userView = userView;
})(app);
