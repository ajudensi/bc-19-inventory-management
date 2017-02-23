$(document).ready(function() {
      $('#keyword').on('input', function() {
      var searchKeyword = $(this).val();
      console.log(searchKeyword);
        if (searchKeyword.length >= 3) {
          $.post('/users', { keywords: searchKeyword }, function(data) {
          $('ul#content').empty()
          $.each(data, function() {
          $('p#result').append('<a href="#">' + this.email + '</a>');
          });
          }, 'json');
        }
      });
    });