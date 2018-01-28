'use strict';

(function(module) {
    const editUserView = {};

    editUserView.init = function(ctx, next) {
        console.log('hi');
        $('.view').hide();
        $('.editUserView').show();
        next();
    }
    
    module.editUserView = editUserView;
})(app);