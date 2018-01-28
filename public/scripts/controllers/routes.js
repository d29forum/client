'use strict';

page('/', app.subforumView.init);
page('/login', app.loginUserView.init);
page('/signup', app.newUserView.init);
page('/user/:username/edit', app.editUserView.init);
page('/user/:username', app.userView.init);
page('/*', app.errorView.init);
page('/*/*', app.errorView.init);
page('/*/*/*', app.errorView.init);


page();