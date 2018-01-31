'use strict';

$('.modal-toggle1').on('click', function(e) {
    e.preventDefault();
    $('#modal1').toggleClass('is-visible');
});

$('.modal-toggle2').on('click', function(e) {
    e.preventDefault();
    $('#modal2').toggleClass('is-visible');
});