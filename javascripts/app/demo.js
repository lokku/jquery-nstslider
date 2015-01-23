define(['jquery', 'nstSlider', 'templates', 'jsbeautify', 'prettify'], 

    function($, nstSlider, templates, js_beautify, prettyPrint) {
        var arrayToString = function (a) {
            return js_beautify.js_beautify(a.join(''));
        };

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

            return js_beautify.js_beautify('{' + str.join(',') + '}');
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
                  pluginClass: 'nstSlider',
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
              // No handle crossing
              //

              markup = templates.basicSliderMarkup();

              $(element).append(templates.demoSection({
                  id: 'no_crossing_grint',
                  title: 'Non-crossable Grips',
                  markup: markup,
                  markup_escaped: markup.replace(/</g,'&lt;').replace(/>/g, '&gt;'),
                  pluginClass: 'nstSlider',
                  pluginName: 'nstSlider',
                  pluginOptions: objectToString({
                      'crossable_handles' : false,
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
              // ARIA-enabled
              //

              markup = templates.accessibleSlider();

              $(element).append(templates.demoSection({
                  id: 'accessible_slider',
                  title: 'Aria-Enabled',
                  markup: markup,
                  markup_escaped: markup.replace(/</g,'&lt;').replace(/>/g, '&gt;'),
                  description: 'You can enable ARIA by setting the <code>data-aria_enabled="true"</code> attribute in the grips HTML. Aria- attributes will be set as the slider handles are dragged!',
                  pluginClass: 'nstSlider',
                  pluginName: 'nstSlider',
                  pluginOptions: objectToString({
                      'left_grip_selector' : '.leftGrip',
                      'right_grip_selector' : '.rightGrip',
                      'value_bar_selector' : '.bar',
                      'value_changed_callback' : function (cause, leftValue, rightValue, prevLeft, prevRight) {
                          var $grip = $(this).find('.leftGrip'),
                            whichGrip = 'left grip';
                            
                          if (leftValue === prevLeft) {
                              $grip = $(this).find('.rightGrip');
                              whichGrip = 'right grip';
                          }
                          var text = [];
                          text.push('<b>Moving ' + whichGrip + '</b>');
                          text.push('role: ' + $grip.attr('role'));
                          text.push('aria-valuemin: ' + $grip.attr('aria-valuemin'));
                          text.push('aria-valuenow: ' + $grip.attr('aria-valuenow'));
                          text.push('aria-valuemax: ' + $grip.attr('aria-valuemax'));
                          text.push('aria-disabled: ' + $grip.attr('aria-disabled'));

                          $('.ariaAttributesAsText').html(text.join('<br />'));

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
                  pluginClass: 'nstSlider',
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
                  pluginClass: 'nstSlider',
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

              //
              // Range Highlight
              //

              markup = templates.rangeHighlightMarkup();

              $(element).append(templates.demoSection({
                  id: 'range_highlight',
                  title: 'Range Highlight',
                  markup: markup,
                  markup_escaped: markup.replace(/</g,'&lt;').replace(/>/g, '&gt;'),
                  pluginClass: 'nstSlider',
                  pluginName: 'nstSlider',
                  description: '<p>jquery.nstSlider.js provides <code>highlight_range</code>, a method to highlight a sub-range of the slider.</p> <p>This may come handy if you were to display results that lie in a sub-range of the slider minimum/maximun range.</p> <p>Press the button below to highlight random sub-ranges of the slider!</p>',
                  pluginOptions: objectToString({
                      'left_grip_selector' : '.leftGrip',
                      'right_grip_selector' : '.rightGrip',
                      'value_bar_selector' : '.bar',
                      'value_changed_callback' : function (cause, leftValue, rightValue) {
                          var $container = $(this).parent();
                          $container.find('.leftLabel').text(leftValue);
                          $container.find('.rightLabel').text(rightValue);
                      },
                      'highlight' : {
                          'grip_class' : 'gripHighlighted',
                          'panel_selector' : '.highlightPanel'
                      }
                  }),
                  extraJavascript: arrayToString([
                      "$('#highlightRangeButton').click(function () {",
                         " var highlightMin = Math.random() * 20,",
                         "     highlightMax = highlightMin + Math.random() * 80;",
                          "$(__PLUGIN_CLASS__).nstSlider('highlight_range', highlightMin, highlightMax);",
                      "});"
                  ])
              }));

              //
              // Distribution-based increments
              //
              markup = templates.distributionBasedIncrementsMarkup();

              $(element).append(templates.demoSection({
                  id: 'histogram_based',
                  title: 'Histogram-Based Increment Steps',
                  description: '<p>With histogram-based increment step, the slider adjusts increments based on a certain input histogram.</p> <p>In this demo we use of a histogram that follows a normal distribution.</p> <p>As a result, more space of the slider is dedicated to let the central values of the range to be selected, and pixels towards the extremities of the slider will correspond to coarser increments.</p><p>This feature is really useful when you only have a few pixels to dedicate to the slider, but a broad range of values a user can select from!</p>',

                  markup: markup,
                  markup_escaped: markup.replace(/</g,'&lt;').replace(/>/g, '&gt;'),
                  pluginClass: 'nstSlider',
                  pluginName: 'nstSlider',
                  pluginOptions: objectToString({
                      'left_grip_selector' : '.leftGrip',
                      'right_grip_selector' : '.rightGrip',
                      'value_bar_selector' : '.bar',
                      'value_changed_callback' : function (cause, leftValue, rightValue) {
                          var $container = $(this).parent();
                          $container.find('.leftLabel').text(leftValue);
                          $container.find('.rightLabel').text(rightValue);
                      }
                  }),
                  extraJavascript: arrayToString([
                      "$('#changeStepIncrement').click(function () {",
                          "var $button = $(this);",
                          "if ($button.text().indexOf('Histogram') > -1) {",
                          "var histogram = [",
                              "4, 6, 3, 20, 30, 82, 107, 75, 82, 30, 20, 3 ,2 ,4 ,1",
                          "];",
                          "$(__PLUGIN_CLASS__).nstSlider('set_step_histogram', histogram);",
                          "$button.text('Use Linear Increment Step');",
                          "}",
                          "else {",
                          "$(__PLUGIN_CLASS__).nstSlider('unset_step_histogram');",
                          "$button.text('Use Histogram-Based Increment Step');",
                          "}",
                          "$(__PLUGIN_CLASS__).nstSlider('refresh');",
                      "});"
                  ])
              }));

              //
              // Rounded range values
              //
              markup = templates.roundingIncrementsMarkup();

              $(element).append(templates.demoSection({
                  id: 'rounding_based',
                  title: 'Rounded Increment Steps',
                  description: '<p>When your range involves big numbers you can ask jquery.nstSlider.js to round them for you.<br /><br />In this example, the <b>rounding</b> parameter is used to round the values of the slider to a certain digit. The rounding parameter is an object in which keys identify the <b>multiplier</b> used when rounding, and values identify the <b>interval</b> in which this multiplier should be applied.<br /><br />Below we are using a two digits multiplier of "100", for integers that fall in the interval [0, 999] (expressed with "1,000" in the "rounding" object). A three digits multiplier (i.e., "1,000") is used to round integers that fall in the interval [1,000, 9,999], and a 4 digits multiplier to round integers that range between 10,000 and 99,999.</p>',
                  markup: markup,
                  markup_escaped: markup.replace(/</g,'&lt;').replace(/>/g, '&gt;'),
                  pluginClass: 'nstSlider',
                  pluginName: 'nstSlider',
                  pluginOptions: objectToString({
                      'rounding' : {
                          '100' : '1000',
                          '1000' : '10000',
                          '10000' : '100000',
                      },
                      'left_grip_selector' : '.leftGrip',
                      'right_grip_selector' : '.rightGrip',
                      'value_bar_selector' : '.bar',
                      'value_changed_callback' : function (cause, leftValue, rightValue) {
                          var $container = $(this).parent();
                          $container.find('.leftLabel').text(leftValue);
                          $container.find('.rightLabel').text(rightValue);
                      }
                  })
              }));

              window.prettyPrint();
          };

          return DemoView;

        })();

        return DemoView;
    }
);
