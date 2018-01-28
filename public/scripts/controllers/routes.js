'use strict';

page('/', app.subforumView.init);
page('/login', app.loginUserView.init);
page('/signup', app.newUserView.init);
page('/user/:username/edit', app.editUserView.init);
page('/user/:username', app.userView.init);
page('/subfora/:id', app.Subforum.prototype.fetchThreads, app.Subforum.prototype.loadThreads, app.Subforum.renderThreads, app.subforumView.init);
page('/subfora/:subforum_id/threads/:thread_id', app.Thread.prototype.fetchComments, app.Thread.prototype.loadComments, app.Thread.prototype.renderComments, app.threadView.init);
page('/*', app.errorView.init);
page('/*/*', app.errorView.init);
page('/*/*/*', app.errorView.init);


page();
