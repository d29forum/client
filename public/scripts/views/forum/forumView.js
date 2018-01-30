'use strict';
var app = app || {};

(function(module) {
    const forumView = {};

    forumView.init = function(ctx, next) {
        $('.view').addClass('hidden').find('*').off();
        $('.forumView').removeClass('hidden');
        next();
    }
    
    module.forumView = forumView;
})(app);
