'use strict';

(function(module) {
    const newThreadView = {};

    newThreadView.init = function(ctx, next) {
        console.log('hi');
        $('.view').hide();
        $('.newThreadView').show();
        next();
    }
    
    module.newThreadView = newThreadView;
})(window);