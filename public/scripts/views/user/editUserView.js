'use strict';

(function(module) {
    const editUserView = {};

    editUserView.init = function(ctx, next) {
        $('.view').addClass('hidden');
        $('.editUserView').removeClass('hidden');
        $('#deleteProfileButton').on('click', app.User.prototype.delete);
        $('#editButton').on('click', app.User.prototype.update);
        next();
    }
    
    module.editUserView = editUserView;
})(app);
