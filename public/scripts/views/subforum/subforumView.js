'use strict';

(function(module) {
    const subforumView = {};

    subforumView.init = function(ctx, next) {
        $('.view').addClass('hidden');
        $('.subforumView').removeClass('hidden');
        // next();
    }
    
    module.subforumView = subforumView;
})(app);
