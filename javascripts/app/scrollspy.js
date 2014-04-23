define(['jquery', 'templates', 'scrollspy', 'scrollTo'], 

    function($, templates, scrollspy, scrollTo) {

        var ScrollSpyView = (function() {

          function ScrollSpyView() {}

          ScrollSpyView.prototype.render = function(element) {

              // first thing, enumerate all ids and populate the template
              var titlesCollection = $('.demo h2')
                .map(function (i, e) {
                  var $e = $(e);
                  return {
                     'id' : 'li_' + $e.parent().attr('id'),
                     'name' : $e.text()
                  };
                });

              markup = templates.scrollSpy({ items: titlesCollection });
              $(element).append(markup);

              // add click on scrollspys menus
              $('.scrollspy li').bind('click', function (e) {

                  var $this = $(this),
                      offset = -160;

                  $('body').scrollTo(
                      '#' + $this.attr('id').replace(/^li_/,''), {
                          'duration' : 500,
                          'offset' : { top: offset, left: '0' }
                      }
                  );

                  e.preventDefault();
                  return false;
              });

              $('h1, .demo h2').on('scrollSpy:enter', function() {
                      var $this = $(this);
                      // now set as previously selected all current selected items
                      $('.scrollspy .selected')
                        .removeClass('selected')
                        .addClass('selected_prev');

                      // highlight ourselves
                      var id = $(this).parent().attr('id');
                      var $us = $('#li_' + id);
                      $us.addClass('selected');
                  })
                  .on('scrollSpy:exit', function() {
                      var id = $(this).parent().attr('id');
                      $('#li_' + id).removeClass('selected selected_prev');
                  })
                  .scrollSpy();

          };

          return ScrollSpyView;

        })();

        return ScrollSpyView;
    }
);
