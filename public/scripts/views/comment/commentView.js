'use strict';

(function(module) {
    const commentView = {};

    commentView.init = function(ctx, next) {
        console.log('hi');
        $('.view').hide();
        $('.commentView').show();
        next();
    }
    
    module.commentView = commentView;
})(window);