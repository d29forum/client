'use strict';

(function(module) {
    const newThreadView = {};

    newThreadView.init = function(ctx, next) {
        $('.view').addClass('hidden').find('*').off();
        $('.view').addClass('hidden');
        $('.newThreadView').removeClass('hidden');
        next();
    }
    
    module.newThreadView = newThreadView;
})(app);
