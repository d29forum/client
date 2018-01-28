'use strict';

page('/', app.User.currentUserCheck, app.subforumView.init);
page('/login', app.User.currentUserCheck, app.loginUserView.init);
page('/signup', app.User.currentUserCheck, app.newUserView.init);
page('/user/:username/edit', app.User.currentUserCheck, app.editUserView.init, app.User.prototype.fetch, app.User.loadCurrent, app.User.updateProfileTemplate, app.User.prototype.update);
page('/user/:username', app.User.currentUserCheck, app.userView.init, app.User.prototype.fetch, app.User.loadCurrent, app.User.prototype.delete, app.User.renderCurrent);
page('/*', app.User.currentUserCheck, app.errorView.init);
page('/*/*', app.User.currentUserCheck, app.errorView.init);
page('/*/*/*', app.User.currentUserCheck, app.errorView.init);

// page('/', app.User.loggedInCheck, app.subforumView.init);
// page('/login', app.User.loggedInCheck, app.loginUserView.init);
// page('/signup', app.User.loggedInCheck, app.newUserView.init);
// page('/user/:username/edit', app.User.loggedInCheck, app.editUserView.init);
// page('/user/:username', app.User.loggedInCheck, app.userView.init);
// page('/*', app.User.loggedInCheck, app.errorView.init);
// page('/*/*', app.User.loggedInCheck, app.errorView.init);
// page('/*/*/*', app.User.loggedInCheck, app.errorView.init);


page();