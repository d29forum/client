'use strict';

(function(module) {
    const editUserView = {};

    editUserView.init = function(ctx, next) {
        $('.view').hide();
        $('.editUserView').show();
        next();
    }
    
    module.editUserView = editUserView;
})(app);