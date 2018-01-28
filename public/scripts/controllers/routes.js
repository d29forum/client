'use strict';

page('/', app.User.currentUserCheck, app.subforumView.init);
page('/login', app.User.currentUserCheck, app.loginUserView.init);
page('/signup', app.User.currentUserCheck, app.newUserView.init);
page('/user/:username/edit', app.User.currentUserCheck, app.editUserView.init, app.User.prototype.fetch, app.User.loadCurrent, app.User.updateProfileTemplate);
page('/user/:username', app.User.currentUserCheck, app.userView.init, app.User.prototype.fetch, app.User.loadCurrent, app.User.renderCurrent);
page('/subfora/:id', app.Subforum.prototype.fetchThreads, app.Subforum.prototype.loadThreads, app.Subforum.prototype.render, app.subforumView.init);
page('/threads/:id', app.Thread.prototype.fetchComments, app.Thread.prototype.loadComments, app.Thread.prototype.render, app.threadView.init);
page('/*', app.User.currentUserCheck, app.errorView.init);
page('/*/*', app.User.currentUserCheck, app.errorView.init);
page('/*/*/*', app.User.currentUserCheck, app.errorView.init);

page();
