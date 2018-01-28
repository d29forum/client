'use strict';

(function(module) {
    const subforumView = {};

    subforumView.init = function(ctx, next) {
        console.log('hi');
        $('.view').hide();
        $('.subforumView').show();
        // next();
    }
    
    module.subforumView = subforumView;
})(app);