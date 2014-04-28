define(['jquery', 'templates'], 

    function($, templates) {

        var SettingsView = (function() {

          function SettingsView() {}

          SettingsView.prototype.render = function(element) {

              $(element).append(templates.pluginSettings({
                  'settings' : [
                      {
                        'name' : 'animating_css_class',
                        'type' : 'string',
                        'default' : 'nst-animating',
                        'description' : 'the css class to be used when the slider is to be animated (this happens when a certain min/max value is being set for example).'
                      },
                      {
                        'name' : 'touch_tolerance_value_bar_x',
                        'type' : 'number',
                        'default' : '15',
                        'description' : 'the horizontal tolerance in pixels by which a handle of the slider should be grabbed if the user touches outside the slider bar area.'
                      },
                      {
                        'name' : 'touch_tolerance_value_bar_y',
                        'type' : 'number',
                        'default' : '30',
                        'description' : 'the vertical tolerance in pixels by which a handle of the slider should be grabbed if the user touches outside the slider bar area.'
                      },
                      {
                        'name' : 'left_grip_selector',
                        'type' : 'string',
                        'default' : '.nst-slider-grip-left',
                        'description' : 'the selector of the left grip handle. The left grip element <b>must</b> exist in the page when the slider is initialized.'
                      },
                      {
                        'name' : 'right_grip_selector',
                        'type' : 'string',
                        'default' : 'undefined',
                        'description' : 'the selector of the right grip handle. This is optional. A single handler bar is assumed if this selector is not specified.'
                      },
                      {
                        'name' : 'value_bar_selector',
                        'type' : 'string',
                        'default' : 'undefined',
                        'description' : 'the selector of the value bar. If not specified assumes a value bar representing the selection is not wanted.'
                      },
                      {
                        'name' : 'rounding',
                        'type' : 'object or number',
                        'default' : 1,
                        'description' : "the rounding for a certain value displayed on the slider. It can be a fixed number or an object like: <pre> { '1' : '100', '10' : '1000', '50' : '10000' } </pre>"
                      },
                      {
                        'name' : 'value_changed_callback',
                        'type' : 'function', 
                        'default' : 'function(cause, vmin, vmax) { return; }',
                        'description' : 'a callback called whenever the user drags one of the handles.'
                      },
                      {
                        'name' : 'user_mouseup_callback',
                        'type' : 'function',
                        'default' : 'function(vmin, vmax, left_grip_moved) { return; }',
                        'description' : 'a callback called whenever the mouse button pressed while dragging a slider grip is released'
                      },
                      {
                        'name' : 'user_drag_start_callback',
                        'type' : 'function',
                        'default' : 'function () { return; }',
                        'description' : 'a callback called before the user drags one of the handles'
                      }
                ]
              }));
          };

          // Specify highlight like this if you want to highlight a range
          // in the slider.
          //
          // 'highlight' : {
          //     'grip_class' : '.nsti-slider-hi',
          //     'panel_selector' : '.nst-slider-highlight-panel'
          // },
          // 'highlight' : undefined,

          return SettingsView;

        })();

        return SettingsView;
    }
);
