'use strict';

(function(module) {
    const errorView = {};

    errorView.init = function(ctx, next) {
        $('.view').addClass('hidden').find('*').off();
        $('.errorView').removeClass('hidden');
        // next();
    }
    
    module.errorView = errorView;
})(app);
