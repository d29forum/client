'use strict';

(function(module) {
    const editCommentView = {};

    editCommentView.init = function(ctx, next) {
        console.log('hi');
        $('.view').hide();
        $('.editCommentView').show();
        next();
    }
    
    module.editCommentView = editCommentView;
})(window);