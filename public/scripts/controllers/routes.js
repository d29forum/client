'use strict';

// page('/', function(){ page.redirect('/client');});
// page('/client/', homeView.init, app.Book.fetchAll, app.Book.loadAll, app.Book.renderAll);
// page('/client/new', newBookView.init);
// page('/client/book/:book_id', singleBookView.init, app.Book.fetchSingle, app.Book.loadSingle, app.Book.renderSingle, app.Book.prototype.deleteRecord);
// page('/client/*', errorView.init);
// page('/client/*/*', errorView.init);
// page('/client/*/*/*', errorView.init);


// page('/', homeView.init, app.Book.fetchAll, app.Book.loadAll, app.Book.renderAll);
// page('/new', newBookView.init);
// page('/book/:book_id', singleBookView.init, app.Book.fetchSingle, app.Book.loadSingle, app.Book.renderSingle, app.Book.prototype.deleteRecord);
// page('/book/:book_id/edit', editBookView.init, app.Book.fetchSingle, app.Book.loadSingle, app.Book.renderEditSingle, app.Book.prototype.updateRecord);
page('/login', loginUserView.init);
page('/signup', newUserView.init);
page('/*', errorView.init);
page('/*/*', errorView.init);
page('/*/*/*', errorView.init);


page();