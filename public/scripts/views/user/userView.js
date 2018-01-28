'use strict';

(function(module) {
    const userView = {};

    userView.init = function(ctx, next) {
        console.log('hi');
        $('.view').hide();
        $('.userView').show();
        // next();
    }
    
    module.userView = userView;
})(app);