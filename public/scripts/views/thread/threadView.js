'use strict';

(function(module) {
    const threadView = {};

    threadView.init = function(ctx, next) {
        console.log('hi');
        $('.view').hide();
        $('.threadView').show();
        next();
    }
    
    module.threadView = threadView;
})(window);