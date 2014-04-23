define(['jquery', 'nstSlider', 'templates', 'jsbeautify', 'prettify'], 

    function($, nstSlider, templates, js_beautify, prettyPrint) {

        var objectToString = function (o) {
            var str = [];
            for (var k in o) {
                if (o.hasOwnProperty(k)) {
                  var v = o[k];

                  if (typeof v === 'function') {
                      v = v.toString()
                          .replace(/\n/g, '')
                          .replace(/^"/,'')
                          .replace(/"$/,'')
                      ;
                  }
                  else {
                      v = JSON.stringify(v);
                  }
                  
                  str.push('\"' + k + '\":' + v);
                }
            }

            return js_beautify('{' + str.join(',') + '}');
        };

        var DemoView = (function() {

          function DemoView() {}

          DemoView.prototype.render = function(element) {

              //
              // Basic Slider
              //

              markup = templates.basicSliderMarkup();

              $(element).append(templates.demoSection({
                  id: 'basic_slider',
                  title: 'Basic Slider',
                  markup: markup,
                  markup_escaped: markup.replace(/</g,'&lt;').replace(/>/g, '&gt;'),
                  pluginClass: 'slider',
                  pluginName: 'nstSlider',
                  pluginOptions: objectToString({
                      'left_grip_selector' : '.leftGrip',
                      'right_grip_selector' : '.rightGrip',
                      'value_bar_selector' : '.bar',
                      'value_changed_callback' : function (cause, leftValue, rightValue) {
                          $(this).parent().find('.leftLabel').text(leftValue);
                          $(this).parent().find('.rightLabel').text(rightValue);
                      }
                  })
              }));

              //
              // Single Handler Slider - no bar
              //

              markup = templates.singleHandlerSlider();

              $(element).append(templates.demoSection({
                  id: 'single_handler_slider_nobar',
                  title: 'Single Handle - no bar',
                  markup: markup,
                  markup_escaped: markup.replace(/</g,'&lt;').replace(/>/g, '&gt;'),
                  pluginClass: 'slider',
                  pluginName: 'nstSlider',
                  pluginOptions: objectToString({
                      'left_grip_selector' : '.leftGrip',
                      'value_changed_callback' : function (cause, leftValue, rightValue) {
                          $(this).parent().find('.leftLabel').text(leftValue);
                      }
                  })
              }));

              //
              // Single Handler Slider - fixed bar
              //

              markup = templates.singleHandlerSliderFixedBar();

              $(element).append(templates.demoSection({
                  id: 'single_handler_slider_fixedbar',
                  title: 'Single Handle - fixed bar position',
                  markup: markup,
                  markup_escaped: markup.replace(/</g,'&lt;').replace(/>/g, '&gt;'),
                  pluginClass: 'slider',
                  pluginName: 'nstSlider',
                  pluginOptions: objectToString({
                      'left_grip_selector' : '.leftGrip',
                      'value_bar_selector' : '.bar',
                      'value_changed_callback' : function (cause, leftValue, rightValue) {
                          var $container = $(this).parent(),
                              g = 255 - 127 + leftValue,
                              r = 255 - g,
                              b = 0;

                          $container.find('.leftLabel').text(leftValue);

                          $(this).find('.bar')
                            .css('background', 'rgb(' + [r,g,b].join(',') + ')');

                      }
                  })
              }));


              prettyPrint.prettyPrint();
          };

          return DemoView;

        })();

        return DemoView;
    }
);
