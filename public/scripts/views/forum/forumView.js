'use strict';
var app = app || {};

(function(module) {
    const forumView = {};

    forumView.init = function(ctx, next) {
        $('.view').addClass('hidden');
        $('.forumView').removeClass('hidden');
    }
    
    module.forumView = forumView;
})(app);
