'use strict';

(function(module) {
    const commentView = {};

    commentView.init = function(ctx, next) {
        $('.view').addClass('hidden');
        $('.commentView').removeClass('hidden');
        next();
    }
    
    module.commentView = commentView;
})(app);
