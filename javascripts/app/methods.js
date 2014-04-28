define(['jquery', 'templates'], 

    function($, templates) {

        var MethodsView = (function() {

          function MethodsView() {}

          MethodsView.prototype.render = function(element) {

              $(element).append(templates.pluginMethods({
                  'methods' : [
                      {
                        'name' : 'get_range_min',
                        'arguments' : 'None',
                        'description' : 'return the current minimum range of the slider'
                      },
                      {
                        'name' : 'get_range_max',
                        'arguments' : 'None',
                        'description' : 'return the current maximum range of the slider'
                      },
                      {
                        'name' : 'get_current_min_value',
                        'arguments' : 'None',
                        'description' : 'return the current minimum value of the slider'
                      },
                      {
                        'name' : 'get_current_max_value',
                        'arguments' : 'None',
                        'description' : 'return the current maximum value of the slider'
                      },
                      {
                        'name' : 'is_handle_to_left_extreme',
                        'arguments' : 'None',
                        'description' : 'return a boolean indicating whether or not the left handler is moved all the way to the left'
                      },
                      {
                        'name' : 'is_handle_to_right_extreme',
                        'arguments' : 'None',
                        'description' : 'return a boolean indicating whether or not the right handler is moved all the way to the right'
                      },
                      {
                        'name' : 'refresh',
                        'arguments' : 'None',
                        'description' : 'force a refresh of the slider'
                      },
                      {
                        'name' : 'disable',
                        'arguments' : 'None',
                        'description' : 'disable the slider (i.e., user cannot move the handles)'
                      },
                      {
                        'name' : 'enable',
                        'arguments' : 'None',
                        'description' : 'enable the slider (i.e., user can move the handles)'
                      },
                      {
                        'name' : 'is_enabled',
                        'arguments' : 'None',
                        'description' : 'return a boolean indicating whether or not the slider can be moved by the user'
                      },
                      {
                        'name' : 'set_position',
                        'arguments' : ['min: number', 'max: number' ],
                        'description' : 'set the handles at the specified min and max values'
                      },
                      {
                        'name' : 'set_step_histogram',
                        'arguments' : 'histogram : array of numbers',
                        'description' : 'use a non-linear step increment for the slider that is stretched where the histogram provided counts more items'
                      },
                      {
                        'name' : 'unset_step_histogram',
                        'arguments' : 'None',
                        'description' : 'use a linear scale of increments for the slider'
                      },
                      {
                        'name' : 'set_range',
                        'arguments' : ['rangeMin : number', 'rangeMax : number'],
                        'description' : 'set the minimum and the maximum range of values the slider'
                      },
                      {
                        'name' : 'set_rounding',
                        'arguments' : 'rounding: number or object',
                        'description' : 'set the rounding for the slider'
                      },
                      {
                        'name' : 'get_rounding',
                        'arguments' : 'None',
                        'description' : 'return the current rounding of the slider'
                      },
                      {
                        'name' : 'teardown',
                        'arguments' : 'None',
                        'description' : 'remove all data stored in the slider'
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

          return MethodsView;

        })();

        return MethodsView;
    }
);
