'use strict';

(function(module) {
    const errorView = {};

    errorView.init = function(ctx, next) {
        $('.view').hide();
        $('.errorView').show();
        next();
    }
    
    module.errorView = errorView;
})(app);