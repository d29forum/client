'use strict';

(function(module) {
    const userView = {};

    userView.init = function(ctx, next) {
        $('.view').addClass('hidden').find('*').off();
        $('.userView').removeClass('hidden');
        next();
    }
    
    module.userView = userView;
})(app);
