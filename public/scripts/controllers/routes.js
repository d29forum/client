'use strict';

page('/', app.User.currentUserCheck, app.forumView.init, app.Forum.fetchSubfora, app.Forum.loadCurrent, app.Forum.renderCurrent);
page('/login', app.User.currentUserCheck, app.loginUserView.init);
page('/signup', app.User.currentUserCheck, app.newUserView.init);
page('/user/:username/edit', app.User.currentUserCheck, app.editUserView.init, app.User.prototype.fetch, app.User.loadCurrent, app.User.updateProfileTemplate);
page('/user/:username', app.User.currentUserCheck, app.userView.init, app.User.prototype.fetch, app.User.loadCurrent, app.User.renderCurrent);
page('/subfora/:subforum_id', app.User.currentUserCheck, app.subforumView.init, app.Subforum.prototype.fetchThreads, app.Subforum.prototype.loadThreads, app.Subforum.prototype.render);
page('/subfora/:subforum_id/threads/new', app.User.currentUserCheck, app.newThreadView.init);
<<<<<<< HEAD
page('/subfora/:subforum_id/threads/:thread_id', app.threadView.init, app.Thread.prototype.fetchComments, app.Thread.prototype.loadComments, app.Thread.prototype.render);
page('/error', app.User.currentUserCheck, app.errorView.init);
=======
page('/subfora/:subforum_id/threads/:thread_id', app.User.currentUserCheck, app.threadView.init, app.Thread.prototype.fetchComments, app.Thread.prototype.loadComments, app.Thread.prototype.render);
>>>>>>> 3f30c45f9b7c5d671312daa5aa85c0936f182ffe
page('/*', app.User.currentUserCheck, app.errorView.init);
page('/*/*', app.User.currentUserCheck, app.errorView.init);
page('/*/*/*', app.User.currentUserCheck, app.errorView.init);

page();
