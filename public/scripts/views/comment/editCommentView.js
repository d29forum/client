'use strict';

(function(module) {
    const editCommentView = {};

    editCommentView.init = function(ctx, next) {
        console.log('hi');
        $('.view').addClass('hidden');
        $('.editCommentView').removeClass('hidden');
        next();
    }
    
    module.editCommentView = editCommentView;
})(app);
