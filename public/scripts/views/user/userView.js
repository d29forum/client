'use strict';

(function(module) {
    const userView = {};

    userView.init = function(ctx, next) {
        $('.view').hide();
        $('.userView').show();
        next();
    }
    
    module.userView = userView;
})(app);