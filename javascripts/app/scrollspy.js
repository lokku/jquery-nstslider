define(['jquery', 'templates', 'dotimeout', 'scrollTo'], 

    function($, templates, dotimeout, scrollTo) {

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

              $(window).scroll(function () {
                $.doTimeout('scroll', 250, function () {
                    var topOffset = $('#header').offset().top,
                        minDist = -1,
                        minEl;

                    // find closest to topOffset
                    $('h2')
                        .map(function (i, e) {
                            return { 
                                el : e,
                                top : $(e).offset().top
                            };
                        })
                        .each(function (i, e) {
                            var dist = e.top - topOffset;
                            if (dist > 0) {
                                if (minDist === -1) {
                                    minDist = dist;
                                    minEl = e.el;
                                }
                                else if (dist < minDist) {
                                    minDist = dist;
                                    minEl = e.el;
                                }
                            }
                        });

                    var id = $(minEl).parent().attr('id');
                    var $us = $('#li_' + id);

                    $('#header li').removeClass('selected');
                    $us.addClass('selected');
                    
                });
              });

              // $('h2')
              //     .on('scrollSpy:enter', function() {
              //         var $this = $(this);

              //         console.log('enter');

              //         // now set as previously selected all current selected items
              //         $('.scrollspy .selected')
              //           .removeClass('selected')
              //           .addClass('selected_prev');

              //         // highlight ourselves
              //         var id = $(this).parent().attr('id');
              //         var $us = $('#li_' + id);

              //         $us.addClass('selected_prev');

              //         // check which of the selected_prev is the closest to the top
              //         var minElement = $('.selected_prev')
              //           .map(function (i, e) { 
              //               return { 
              //                   'element' : e,
              //                   'top' : $(e).offset().top 
              //               };
              //           })
              //           .toArray()
              //           .reduce(function (p, c) { 
              //               return p.top < c.top ? p : c; 
              //           })
              //           .element;

              //         console.log('minElement' , minElement);

              //         $(minElement)
              //           .removeClass('selected_prev')
              //           .addClass('selected');
              //     })
              //     .on('scrollSpy:exit', function() {
              //         var id = $(this).parent().attr('id');
              //         $('#li_' + id).removeClass('selected selected_prev');
              //     })
              //     .scrollSpy();

          };

          return ScrollSpyView;

        })();

        return ScrollSpyView;
    }
);
