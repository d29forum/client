'use strict';

(function(module) {
    const editUserView = {};

    editUserView.init = function(ctx, next) {
        $('.view').hide();
        $('.editUserView').show();
        $('#deleteProfileButton').on('click', app.User.prototype.delete);
        $('#editButton').on('click', app.User.prototype.update);
        next();
    }
    
    module.editUserView = editUserView;
})(app);