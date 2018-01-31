'use strict';

page('/', app.User.currentUserCheck, app.forumView.init, app.Forum.fetchSubfora, app.Forum.loadCurrent, app.Forum.renderCurrent);
page('/login', app.User.currentUserCheck, app.loginUserView.init);
page('/signup', app.User.currentUserCheck, app.newUserView.init);
page('/user/:username/edit', app.User.currentUserCheck, app.editUserView.init, app.User.prototype.fetch, app.User.loadCurrent, app.User.updateProfileTemplate);
page('/user/:username', app.User.currentUserCheck, app.userView.init, app.User.prototype.fetch, app.User.loadCurrent, app.User.renderCurrent);
page('/subfora/:subforum_id', app.User.currentUserCheck, app.subforumView.init, app.Subforum.prototype.fetchThreads, app.Subforum.prototype.loadThreads, app.Subforum.prototype.render);
page('/subfora/:subforum_title/threads/new', app.User.currentUserCheck, app.newThreadView.init);
page('/error', app.User.currentUserCheck, app.errorView.init);
page('/subfora/:subforum_id/threads/:thread_id', app.User.currentUserCheck, app.threadView.init, app.Thread.prototype.fetchComments, app.Thread.prototype.loadComments, app.Thread.prototype.render);
page('/*', app.User.currentUserCheck, app.errorView.init);
page('/*/*', app.User.currentUserCheck, app.errorView.init);
page('/*/*/*', app.User.currentUserCheck, app.errorView.init);

page();
