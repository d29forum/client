'use strict';

(function(module) {
    const subforumView = {};

    subforumView.init = function(ctx, next) {
        $('.view').addClass('hidden').find('*').off();
        $('.threadsContainer').empty();
        $('.subforumView').removeClass('hidden');
        next();
    }
    
    module.subforumView = subforumView;
})(app);
