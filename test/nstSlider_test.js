(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  /*
   * some helpers...
   */
  var getBoundEventList = function ($element) {
      var allBoundEvents = $._data($element[0], 'events');
      var list = [];

      for (var e in allBoundEvents) {
        if (allBoundEvents.hasOwnProperty(e)) {
            list.push(e);
        }
      }

      return list;
  },
  getCssWidth = function ($element) {
    return parseInt($element.css('width').replace('px', ''), 10);
  },
  getCssLeft = function ($element) {
    return parseInt($element.css('left').replace('px', ''), 10);
  },
  getBoundEventNamespaces = function ($element) {
        var namespaces = [];
        var eventsCollectionObj = $._data($element[0], "events");

        var eventType;
        for (eventType in eventsCollectionObj) {
            if (eventsCollectionObj.hasOwnProperty(eventType)) {

                var eventsArray = eventsCollectionObj[eventType];
                for (var i=0; i<eventsArray.length; i++) {
                    var evt = eventsArray[i];
                    var evtNamespace = evt.namespace;

                    if (-1 === namespaces.indexOf(evtNamespace)) {
                        namespaces.push(evtNamespace);
                    }
                }
            }
        }

        return namespaces;
  },
  countElementBoundEvents = function ($element) {
      return getBoundEventList($element).length;
  },
  buildSlider = function ($sliderDom, sliderDataAttributes, options) {
      if (typeof options === 'undefined') {
          options = {};
      }

      var attribute;
      for (attribute in sliderDataAttributes) {
          if (sliderDataAttributes.hasOwnProperty(attribute)) {

              notEqual(typeof $sliderDom.attr('data-' + attribute), 'undefined', 'buildSlider attribute ' + attribute + ' exists in markup');

              $sliderDom.attr('data-' + attribute, sliderDataAttributes[attribute]);
              $sliderDom.data(attribute, sliderDataAttributes[attribute]);
          }
      }

      return $sliderDom.nstSlider(options);
  };

  var _initialEventsBoundToDocument = getBoundEventList($(document));
  var _initialNumberOfEventsBoundToDocument = _initialEventsBoundToDocument.length;

  module('jQuery#nstSlider', {
    // This will run before each test in this module.
    setup: function() {
      // save original implementation of jquery
      this.originalFn = {
         'width' : $.fn.width,
         'outerWidth': $.fn.outerWidth
         // add more here as they become needed...
      };
      this.sliders = {
          manyBasicSliders: $('#manyBasicSliders').children(),
          basicSliderWithParameters: $('#basicSliderWithParameters'),
          basicSliderWithNoParameters: $('#basicSliderWithNoParameters'),
          basicSliderWithParametersAndNonDefaultLeftGrip: $('#basicSliderWithParametersAndNonDefaultLeftGrip'),
          basicSliderWithParametersAndNonDefaultRightGrip: $('#basicSliderWithParametersAndNonDefaultRightGrip'),
          basicSliderWithCrossingLimits: $('#basicSliderWithCrossingLimits'),
          sliderWithNoBarAndLabels: $('#sliderWithNoBarAndLabels'),
          sliderWithRounding: $('#sliderWithRounding'),
          sliderWithLimitsAndRounding: $('#sliderWithLimitsAndRounding'),
          sliderWithBar: $('#sliderWithBar'),
          sliderWithBarAndHighlight: $('#sliderWithBarAndHighlight'),
          accessibleSlider: $('#accessibleSlider'),
          mouseupTestSliderA: $('#mouseupTestSliderA'),
          mouseupTestSliderB: $('#mouseupTestSliderB'),
          sliderSingleBarLeft: $("#sliderSingleBarLeft"),
          sliderSingleBarRight: $("#sliderSingleBarRight"),
          sliderSingleBarMiddle: $("#sliderSingleBarMiddle")
      };
    },
    // This will run after each test in this module.
    teardown : function () {
      //
      // restore original implementations of jQuery that may have been
      // overridden in the tests
      //
      for (var impl in this.originalFn) {
        if (this.originalFn.hasOwnProperty(impl)) {
            $.fn[impl] = this.originalFn[impl];
        }
      }

      // tear down all plugins initialized on the various elements

      var countBeforeTearDown = countElementBoundEvents($(document));

      var slider;
      for (slider in this.sliders) {

        if (typeof slider === 'string' && this.sliders.hasOwnProperty(slider)) {

            var $slider = this.sliders[slider];

            if (typeof $slider.data('initialized') !== 'undefined') {

                $slider.nstSlider('teardown');

                var totalAttr = 0;
                var totalData = 0;

                var gotData = $slider.data();
                if (typeof gotData !== 'undefined') {
                    // check that all existing data after the teardown are the one
                    // specified in the markup
                    for (var k in gotData) {
                        if (gotData.hasOwnProperty(k)) {
                            totalData++;
                            if (typeof $slider.attr('data-' + k) !== 'undefined') {
                                // check the value is the same
                                if ("" + gotData[k] === $slider.attr('data-' + k)) {
                                    totalAttr++;
                                }
                                else {
                                    ok(false, 'failed to tear down slider ' + slider + ' data attribute ' + k + ' should have the expected value ' + $slider.attr('data-' + k) + ' as per markup');
                                }
                            }
                        }
                    }
                }

                // if the values returned by .data() can be found in markup,
                // with the same values, then we can say the slider is teared
                // down.
                ok(totalAttr <= totalData, slider + ' slider was teared down');
            }
        }
      }

      var countAfterTearDown = countElementBoundEvents($(document));

      // make sure no event is bound to the document
      equal(countAfterTearDown, _initialNumberOfEventsBoundToDocument,
        'test cleans up events bound to the document. From ' + countBeforeTearDown + ' to ' + countAfterTearDown
      );
    }
  });

  test('is chainable', function() {
    ok(this.sliders.manyBasicSliders.nstSlider().addClass('ourSlider'), 'add class from chaining');
    equal(this.sliders.manyBasicSliders.hasClass('ourSlider'), true, 'class was added from chaining');
  });

  test('validates input parameters', function () {
      var that = this;

      // throws an error on a slider with no parametes
      var sliderThatThrowsErrors = this.sliders.basicSliderWithNoParameters;
      throws(function () {
         sliderThatThrowsErrors.nstSlider();
      }, /data-/, 'throws data- related exception if no parameters are provided');

      // does not throw an error on a basic slider with all the required data-
      // parameters specified
      try {
          this.sliders.basicSliderWithParameters.nstSlider();
          ok(true, "did not throw an exception with necessary data- parameters specified");
      } catch(e) {
          ok(false, "an exception was thrown with necessary data- parameters specified: " + e);
      }


      /*
       * Now test that validation is performed until ALL the required data-
       * attributes are added to the slider on which the error was thrown.
       */
      var sliderDataAttributes = {
          'rounding' : 10,
          'range_min' : 10,
          'range_max' : 110,
          'cur_min' : 20
      };

      var required_attributes = [
          'rounding', 'range_min', 'range_max', 'cur_min'
      ];

      // throw an exception until all parameters are set
      var total = required_attributes.length;
      var mayThrowErrorFunc = function () {
          $(sliderThatThrowsErrors).nstSlider();
      };
      for (var i=0; i<total; i++) {

          throws(mayThrowErrorFunc, /data-/, 'throws a data- related exception ' + (i+1) + '/' + (total));

          // add a parameter
          var req_attr = required_attributes[i];
          $(sliderThatThrowsErrors).attr('data-' +  req_attr, sliderDataAttributes[req_attr]);
      }

      // now shouldn't throw an error anymore - as all attributes have been added
      try {
          $(sliderThatThrowsErrors).nstSlider();
          ok(true, "did not throw an exception with all necessary data- parameters specified");
      } catch(e) {
          ok(false, "an exception was thrown with necessary data- parameters specified: " + e);
      }

      //
      // Check for more exception messages
      //

      throws(function (){
          $(that.sliders.basicSliderWithParametersAndNonDefaultLeftGrip).nstSlider({
              left_grip_selector : '.not-existing-selector'
          });
      }, /.not-existing-selector/, 'throws exception related to left grip');

      try {
          $(that.sliders.basicSliderWithParametersAndNonDefaultLeftGrip).nstSlider({
              left_grip_selector : '.the-left-grip'
          });
          ok(true, 'did not throw exception when selector was specified');
      }
      catch (e) {
          ok(false, 'did throw exception when selector was specified');
      }

      throws(function (){
          $(that.sliders.basicSliderWithParametersAndNonDefaultRightGrip).nstSlider({
              right_grip_selector : '.not-existing-selector'
          });
      }, /.not-existing-selector/, 'throws exception related to right grip');


      throws(function () {
          $(that.sliders.basicSliderWithParameters).nstSlider({
              value_bar_selector: '.not-existing-selector'
          });
      }, /value_bar_selector/, 'throws exception when value_bar_selector is specified but not existing');


      throws(function () {
          $(that.sliders.basicSliderWithCrossingLimits).nstSlider();
      }, /Invalid data-lower-limit or data-upper-limit/, 'throws error on crossing upper/lower limits');
  });


  test('event binding is performed correctly', function () {
    // initially no events are bound to the document
    var $document = $(document);
    var boundEventList = getBoundEventList($document);

    if (boundEventList.length === 0) {
        ok(true, 'no events bound to the document');
    }
    else {
        ok(false, 'no events bound to the document, but got ' +
            boundEventList.join(', '));
    }

    // if a slider is created, then the events get bound to the document
    this.sliders.basicSliderWithParameters.nstSlider();

    equal(getBoundEventList($document).length, 2, 'some events are bound to the document');

    // check all events bound are namespaced
    var nss = getBoundEventNamespaces($document);
    equal(nss.length, 1, 'only one namespace was found for the events');
    equal(nss[0], 'nstSlider', 'namespace is nstSlider');

  });

  test('can get ranges', function () {
    var $slider = buildSlider(this.sliders.sliderWithRounding, {
        'rounding' : 10, 'range_min' : 5, 'range_max' : 95,
        'cur_min' : 30, 'cur_max' : 60
    });

    equal($slider.nstSlider('get_range_min'), 5);
    equal($slider.nstSlider('get_range_max'), 95);
  });

  test('can get values', function () {

    var $slider = buildSlider(this.sliders.sliderWithRounding, {
        'rounding' : 10, 'range_min' : 5, 'range_max' : 95,
        'cur_min' : 30, 'cur_max' : 60
    });

    equal($slider.nstSlider('get_current_min_value'), 30);
    equal($slider.nstSlider('get_current_max_value'), 60);
  });

  test("tells limits are not reached when handles are far away from extremities", function () {
      // no limits defined
      var $slider = buildSlider(this.sliders.sliderWithRounding, {
          'rounding' : 10,
          'range_min' : 5,
          'range_max' : 95,
          'cur_min' : 30,
          'cur_max' : 60
      });
      equal($slider.nstSlider('is_handle_to_left_extreme'), false);
      equal($slider.nstSlider('is_handle_to_right_extreme'), false);
  });

  test("tells left limit reached, not right as only left slider is stuck to min value", function () {
        // no limits defined
        var $slider = buildSlider(this.sliders.sliderWithRounding, {
            'rounding' : 5,
            'range_min' : 5,
            'range_max' : 95,
            'cur_min' : 5,
            'cur_max' : 60
        });
        equal($slider.nstSlider('is_handle_to_left_extreme'), true);

  });

  test("tells right limit is reached, not left, as right handle is stuck to the right extreme", function () {
      // no limits defined
      var $slider = buildSlider(this.sliders.sliderWithRounding, {
          'rounding' : 1,
          'range_min' : 5,
          'range_max' : 95,
          'cur_min' : 6,
          'cur_max' : 95
      });

      equal($slider.nstSlider('is_handle_to_left_extreme'), false);
      equal($slider.nstSlider('is_handle_to_right_extreme'), true);
  });


  test("tells you when upper limit hasn't been reached", function () {

      // no limits defined
      var $slider = buildSlider(this.sliders.sliderWithRounding, {
          'rounding' : 5,
          'range_min' : 5,
          'range_max' : 95,
          'cur_min' : 30,
          'cur_max' : 60
      });
      equal($slider.nstSlider('is_handle_to_right_extreme'), false);

      $slider.nstSlider('teardown');

      // no limits defined
      $slider = buildSlider($slider, {
          'rounding' : 5,
          'range_min' : 5,
          'range_max' : 95,
          'cur_min' : 5,
          'cur_max' : 95
      });
      equal($slider.nstSlider('is_handle_to_right_extreme'), true);
  });

  test("detects limits for non exact roundings", function () {
      // no limits defined
      var $slider = buildSlider(this.sliders.sliderWithRounding, {
          'rounding' : 7,
          'range_min' : 2,
          'range_max' : 10,
          'cur_min' : 2,
          'cur_max' : 10
      });
      equal($slider.nstSlider('is_handle_to_right_extreme'), true);
      equal($slider.nstSlider('is_handle_to_left_extreme'), true);
  });


  test("lets you access min/max range", function () {
      var $slider = buildSlider(this.sliders.sliderWithLimitsAndRounding, {
          'rounding' : 10,
          'range_min' : 5, 'range_max' : 95,
          'cur_min' : 30,  'cur_max' : 60,
          'upper-limit' : 100, 'lower-limit' : 1
      });

      equal($slider.nstSlider('get_range_min'), 5);
      equal($slider.nstSlider('get_range_max'), 95);
  });

  test("lets you access current min/max values", function () {
      var $slider = buildSlider(this.sliders.sliderWithLimitsAndRounding, {
          'rounding' : 10,
          'range_min' : 5, 'range_max' : 95,
          'cur_min' : 30,  'cur_max' : 60,
          'upper-limit' : 100, 'lower-limit' : 1
      });

      equal($slider.nstSlider('get_current_min_value'), 30);
      equal($slider.nstSlider('get_current_max_value'), 60);

      $slider.nstSlider('teardown');
  });

  test("tells you when lower limit hasn't been reached", function () {
      var $slider = buildSlider(this.sliders.sliderWithLimitsAndRounding, {
          'rounding' : 10,
          'range_min' : 5,
          'range_max' : 95,
          'cur_min' : 30,
          'cur_max' : 60,
          'upper-limit' : 100,
          'lower-limit' : 1
      });
      equal($slider.nstSlider('is_handle_to_left_extreme'), false);

      // teardown
      $slider.nstSlider('teardown');

      buildSlider(($slider), {
          'rounding' : 5,
          'range_min' : 5,
          'range_max' : 95,
          'cur_min' : 5,
          'cur_max' : 60,
          'upper-limit' : 100,
          'lower-limit' : 1
      });
      equal($slider.nstSlider('get_current_min_value'), 1);
      equal($slider.nstSlider('is_handle_to_left_extreme'), true);

      $slider.nstSlider('teardown');
  });

  test("tells you when upper limit hasn't been reached", function () {
      var $slider = buildSlider(this.sliders.sliderWithLimitsAndRounding, {
          'rounding' : 5,
          'range_min' : 5,
          'range_max' : 95,
          'cur_min' : 30,
          'cur_max' : 60,
          'upper-limit' : 100,
          'lower-limit' : 1
      });
      equal($slider.nstSlider('is_handle_to_right_extreme'), false);

      $slider.nstSlider('teardown');

      buildSlider(this.sliders.sliderWithLimitsAndRounding, {
          'rounding' : 5,
          'range_min' : 5,
          'range_max' : 95,
          'cur_min' : 5,
          'cur_max' : 95,
          'upper-limit' : 1000,
          'lower-limit' : 1
      });

      equal($slider.nstSlider('is_handle_to_right_extreme'), true);
      equal($slider.nstSlider('get_current_max_value'), 1000);

      $slider.nstSlider('teardown');
  });

  test("detects limits for non exact roundings", function () {
      var $slider = buildSlider(this.sliders.sliderWithLimitsAndRounding, {
          'rounding' : 7,
          'range_min' : 2,
          'range_max' : 10,
          'cur_min' : 2,
          'cur_max' : 10,
          'upper-limit' : 100,
          'lower-limit' : 1
      });
      equal($slider.nstSlider('is_handle_to_right_extreme'), true);
      equal($slider.nstSlider('is_handle_to_left_extreme'), true);

      $slider.nstSlider('teardown');
  });

  test("rounds the position of the slider to the closest integer according to the rounding", function () {
      var $slider = buildSlider(this.sliders.sliderWithRounding, {
          'rounding' : 100,
          'range_min' : 0,
          'range_max' : 1000,
          'cur_min' : 10,
          'cur_max' : 500
      },{
          right_grip_selector : '.nst-slider-grip-right'
      });

      $slider.nstSlider('set_position', 150, 400.1);

      equal($slider.nstSlider('get_current_min_value'), 100);
      equal($slider.nstSlider('get_current_max_value'), 400);

      $slider.nstSlider('teardown');
  });

  test("rounds the position of the slider to the next integer according to the rounding", function () {
      var $slider = buildSlider(this.sliders.sliderWithRounding, {
          'rounding' : 100,
          'range_min' : 0,
          'range_max' : 1000,
          'cur_min' : 10,
          'cur_max' : 500
      },{
          right_grip_selector : '.nst-slider-grip-right'
      });

      $slider.nstSlider('set_position', 151, 560);

      equal($slider.nstSlider('get_current_min_value'), 200);
      equal($slider.nstSlider('get_current_max_value'), 600);

      $slider.nstSlider('teardown');
  });

  test("rounds the position of the slider to minRange for values close to it", function () {
      var $slider = buildSlider(this.sliders.sliderWithRounding, {
          'rounding' : 100,
          'range_min' : 0,
          'range_max' : 1000,
          'cur_min' : 10,
          'cur_max' : 500
      },{
          right_grip_selector : '.nst-slider-grip-right'
      });

      $slider.nstSlider('set_position', 2, 7);

      equal($slider.nstSlider('get_current_min_value'), 0);
      equal($slider.nstSlider('get_current_max_value'), 0);

      $slider.nstSlider('teardown');
  });
  test("performs rounding only for values in the middle of the range", function () {
      var $slider = buildSlider(this.sliders.sliderWithRounding, {
          'rounding' : 10,
          'range_min' : 3,
          'range_max' : 37,
          'cur_min' : 3,
          'cur_max' : 3
      },{
          right_grip_selector : '.nst-slider-grip-right'
      });

      // initial state
      equal($slider.nstSlider('get_current_min_value'), 3);
      equal($slider.nstSlider('get_current_max_value'), 3);

      $slider.nstSlider('set_position', 3, 37);

      // can select min max
      equal($slider.nstSlider('get_current_min_value'), 3);
      equal($slider.nstSlider('get_current_max_value'), 37);

      $slider.nstSlider('set_position', 10, 30);

      // can select a value rounded according to rounding
      equal($slider.nstSlider('get_current_min_value'), 10);
      equal($slider.nstSlider('get_current_max_value'), 30);

      $slider.nstSlider('set_position', 15, 23);

      // values are rounded according to rounding regardless odd min/max range
      equal($slider.nstSlider('get_current_min_value'), 10);
      equal($slider.nstSlider('get_current_max_value'), 20);
  });
  test ("keeps the handles within the range handles are moved too far apart", function () {
      var $slider = buildSlider(this.sliders.sliderWithRounding, {
          'rounding' : 100,
          'range_min' : 100,
          'range_max' : 1000,
          'cur_min' : 10,
          'cur_max' : 500
      },{
          right_grip_selector : '.nst-slider-grip-right'
      });

      $slider.nstSlider('set_position', 50, 2000);

      equal($slider.nstSlider('get_current_min_value'), 100);
      equal($slider.nstSlider('get_current_max_value'), 1000);
  });
  test ("keeps the handles within the limits if they are moved too far apart", function () {
      var $slider = buildSlider(this.sliders.sliderWithLimitsAndRounding, {
          'rounding' : 100,
          'range_min' : 100,
          'range_max' : 1000,
          'cur_min' : 10,
          'cur_max' : 500,
          'lower-limit' : 80,
          'upper-limit' : 1100
      },{
          right_grip_selector : '.nst-slider-grip-right'
      });

      $slider.nstSlider('set_position', 50, 2000);

      equal($slider.nstSlider('get_current_min_value'), 80);
      equal($slider.nstSlider('get_current_max_value'), 1100);
  });
  test ("accepts that grips can cross (i.e., max/min values can swap)", function() {
      var $slider = buildSlider(this.sliders.sliderWithLimitsAndRounding, {
          'rounding' : 100,
          'range_min' : 100,
          'range_max' : 1000,
          'cur_min' : 10,
          'cur_max' : 500,
          'lower-limit' : 80,
          'upper-limit' : 1100
      },{
          right_grip_selector : '.nst-slider-grip-right'
      });

      // note: swap max with min
      $slider.nstSlider('set_position', 2000, 50);

      equal($slider.nstSlider('get_current_min_value'), 80);
      equal($slider.nstSlider('get_current_max_value'), 1100);

      // another movement, within the range
      $slider.nstSlider('set_position', 500, 200);
  });

  test("changes the position of the handles based on the range", function () {

      var $slider = buildSlider(this.sliders.sliderWithRounding, {
          'rounding' : 100,
          'range_min' : 500,
          'range_max' : 800,
          'cur_min' : 500,
          'cur_max' : 800
      });

      var expectCause = 'init';

      $slider.nstSlider({
          value_changed_callback : function (cause/*, minV, maxV */) {
              equal(cause, expectCause, "Got expected cause " + cause + " in value_changed_callback");
          }
      });

      var checkInitialState = function () {
          equal($slider.nstSlider('get_current_min_value'), 500);
          equal($slider.nstSlider('get_current_max_value'), 800);
          equal($slider.nstSlider('get_range_min'), 500);
          equal($slider.nstSlider('get_range_max'), 800);
      };

      checkInitialState();

      // ** from now on we will be calling set range **
      expectCause = 'set_range';

      $slider.nstSlider('set_range', 0, 1000);

      equal($slider.nstSlider('get_range_min'), 0);
      equal($slider.nstSlider('get_range_max'), 1000);
      equal($slider.nstSlider('get_current_min_value'), 500);
      equal($slider.nstSlider('get_current_max_value'), 800);

      $slider.nstSlider('set_range', 500, 800);

      checkInitialState();

      $slider.nstSlider('set_range', 700, 800);

      equal($slider.nstSlider('get_range_min'), 700);
      equal($slider.nstSlider('get_range_max'), 800);
      equal($slider.nstSlider('get_current_min_value'), 700);
      equal($slider.nstSlider('get_current_max_value'), 800);
  });
  test("detects constrained values since construction", function () {

      var expectCause = 'init';

      var $slider = buildSlider(this.sliders.sliderWithRounding, {
          'rounding' : 100,
          'range_min' : 500,
          'range_max' : 800,
          'cur_min' : 500,
          'cur_max' : 1000
      });

      $slider.nstSlider({
          value_changed_callback : function (cause/* , vMin, vMax */) {
             equal(cause, expectCause, "Got expected cause " + cause + " in value_changed_callback");
          }
      });

      equal($slider.nstSlider('get_range_min'), 500);
      equal($slider.nstSlider('get_range_max'), 800);
      equal($slider.nstSlider('get_current_min_value'), 500);
      equal($slider.nstSlider('get_current_max_value'), 800);
  });

  test("detects constrained values within callback", function () {

      var expectCause = 'init';

      var $slider = buildSlider(this.sliders.sliderWithRounding, {
          'rounding' : 20,
          'range_min' : 750,
          'range_max' : 1395,
          'cur_min' : 750,
          'cur_max' : 1395
      });

      $slider.nstSlider({
          value_changed_callback : function (cause/*, vMin, vMax*/) {
             equal(cause, expectCause, "Got expected cause " + cause + " in value_changed_callback");
          }
      });

      // check initial state
      equal($slider.nstSlider('get_range_min'), 750);
      equal($slider.nstSlider('get_range_max'), 1395);
      equal($slider.nstSlider('get_current_min_value'), 750);
      equal($slider.nstSlider('get_current_max_value'), 1395);

      // now prepare for next interaction in which we reduce the range...

      expectCause = 'set_range';

      $slider.nstSlider('set_range', 795, 1250);
  });

  test("notifies when slider is constructed", function () {

      var $slider = buildSlider(this.sliders.sliderWithRounding, {
          'rounding' : 100,
          'range_min' : 500,
          'range_max' : 800,
          'cur_min' : 500,
          'cur_max' : 800
      });

      $slider.nstSlider({
          value_changed_callback : function (cause, vMin, vMax) {
             equal(cause, 'init', "callback called with init cause");
             equal(vMin, 500, "Got notified with correct min value");
             equal(vMax, 800, "Got notified with correct min value");
          }
      });
  });

  test("Step-based value rounding", function () {

      var $slider = buildSlider(this.sliders.sliderWithRounding, {
          'rounding' : 10,
          'range_min' : 3,
          'range_max' : 1000,
          'cur_min' : 3,
          'cur_max' : 1000
      });

      equal($slider.nstSlider('get_rounding'), 10);

      equal($slider.nstSlider('round_value_according_to_rounding', 5), 0);
      equal($slider.nstSlider('round_value_according_to_rounding', 6), 10);
      equal($slider.nstSlider('round_value_according_to_rounding', 9), 10);
      equal($slider.nstSlider('round_value_according_to_rounding', 10), 10);
      equal($slider.nstSlider('round_value_according_to_rounding', 22), 20);
      equal($slider.nstSlider('round_value_according_to_rounding', 35), 30);
      equal($slider.nstSlider('round_value_according_to_rounding', 999), 1000);
      equal($slider.nstSlider('round_value_according_to_rounding', 1000), 1000);
  });

  test("Rounds correctly with variable roundings", function () {
      var rounding = {
          '1' : '10',  // round with rounding 1 if the value is less than 10
          '10': '50',  // round with rounding 10 if value is less than 99
          '20': '500',
          '100' : '1000'
      };
      var $slider = buildSlider(this.sliders.sliderWithRounding, {
          'range_min' : 3,
          'range_max' : 1000,
          'cur_min' : 3,
          'cur_max' : 1000,
          'rounding' : rounding
      });

      deepEqual($slider.nstSlider('get_rounding'), rounding);

      equal($slider.nstSlider('round_value_according_to_rounding', 1), 1);
      equal($slider.nstSlider('round_value_according_to_rounding', 5), 5);
      equal($slider.nstSlider('round_value_according_to_rounding', 6), 6);
      equal($slider.nstSlider('round_value_according_to_rounding', 9), 9);
      equal($slider.nstSlider('round_value_according_to_rounding', 10), 10);
      equal($slider.nstSlider('round_value_according_to_rounding', 22), 20);
      equal($slider.nstSlider('round_value_according_to_rounding', 35), 30);
      equal($slider.nstSlider('round_value_according_to_rounding', 999), 1000);
      equal($slider.nstSlider('round_value_according_to_rounding', 450), 440);
      equal($slider.nstSlider('round_value_according_to_rounding', 300), 300);
      equal($slider.nstSlider('round_value_according_to_rounding', 923), 900);
      equal($slider.nstSlider('round_value_according_to_rounding', 4436), 4400);
  });

  test("Can set histogram when the slider with is not integer", function () {
      var that = this;
      var $sliderWithBar = $(this.sliders.sliderWithBar);
      
      //
      // we want to test what happens when these methods return floating point
      // values. Hence we mock.
      //
      $.fn.outerWidth = function () {
          var $this = this;
          if      ($this.hasClass('left') ) { return 34.33;   }
          else if ($this.hasClass('right')) { return 34.33;   }
          else {
              // fall back on the original method
              return that.originalFn.outerWidth.apply($this, arguments);
          }
      };
      $.fn.width = function () {
          var $this = this;
          if ($this.attr('id') === 'sliderWithBar') { return 123.343; }
          else {
              // fall back on the original method
              return that.originalFn.width.apply($this, arguments);
          }
      };
      
      // initialize...
      $sliderWithBar.nstSlider({
           'left_grip_selector' : '.left',
           'right_grip_selector' : '.right',
           'value_bar_selector' : '.bar'
      });

      // make sure we get a floating point width when we access the slider
      equal($sliderWithBar.width(), 123.343, 'Slider has a floating point width');
      equal($sliderWithBar.find('.left').outerWidth(), 34.33, 'Slider left grip has a floating point width');
      equal($sliderWithBar.find('.right').outerWidth(), 34.33, 'Slider left grip has a floating point width');

      ok($sliderWithBar.nstSlider('set_step_histogram', [ 
          1, 1, 2, 40, 128, 200, 10, 5, 1, 1
      ]), 'step histogram is set');

  });

  test("Highlighted range is calculated based on the histogram previously set", function () {
      var $sliderWithBarAndHighlight = $(this.sliders.sliderWithBarAndHighlight);
      
      // initialize...
      $sliderWithBarAndHighlight.nstSlider({
           'left_grip_selector' : '.left',
           'right_grip_selector' : '.right',
           'value_bar_selector' : '.bar',
           'highlight': {
              'grip_class' : 'hi',
              'panel_selector': '.highlightPanel'
           }
      });

      // setup some fake widths for the slider and the left grip
      // this is necessary for the width() 
      $sliderWithBarAndHighlight.width(300);
      $sliderWithBarAndHighlight.data('left_grip_width', 16);

      $sliderWithBarAndHighlight.nstSlider('set_step_histogram', [ 
            4, 6, 3, 20, 30, 82, 107, 75, 82, 30, 20, 3, 2, 4, 1
      ]);

      $sliderWithBarAndHighlight.nstSlider('highlight_range', 40, 60);

      equal(
          $sliderWithBarAndHighlight.find('.highlightPanel').width(),
          180,
          "expected width found for the highlight panel after highlighting a range"
      );


  });

  test("aria attributes are set correctly when slider is disabled", function () {

        var $accessibleSlider = $(this.sliders.accessibleSlider).nstSlider({
             'left_grip_selector' : '.left',
             'right_grip_selector' : '.right',
             'value_bar_selector' : '.bar'
        });

        // slider is initially enabled
        equal($accessibleSlider.nstSlider('is_enabled'), true, 'slider is enabled initially');
        equal($accessibleSlider.find('.left').attr('aria-disabled'), 'false', 'aria-disabled is false on left grip');
        equal($accessibleSlider.find('.right').attr('aria-disabled'), 'false', 'aria-disabled is false on right grip');

        // slider is disabled
        $accessibleSlider.nstSlider('disable');
        equal($accessibleSlider.nstSlider('is_enabled'), false, 'slider is disabled');
        equal($accessibleSlider.find('.left').attr('aria-disabled'), 'true', 'aria-disabled is true on left grip');
        equal($accessibleSlider.find('.right').attr('aria-disabled'), 'true', 'aria-disabled is true on right grip');

        // re-enable now...
        $accessibleSlider.nstSlider('enable');
        equal($accessibleSlider.nstSlider('is_enabled'), true, 'slider is re-enabled');
        equal($accessibleSlider.find('.left').attr('aria-disabled'), 'false', 'aria-disabled is false on left grip after enable is called');
        equal($accessibleSlider.find('.right').attr('aria-disabled'), 'false', 'aria-disabled is false on right grip after enable is called');
  });

  asyncTest("slider can be dragged on touch devices when no value bar is defined", 3, function () {
        // expect(1+2);
        var that = this,
            dragTriggered = false;

        var $sliderWithoutValueBar = $(that.sliders.sliderWithNoBarAndLabels).nstSlider({
             left_grip_selector : '.left',
             right_grip_selector : '.right',
             user_drag_start_callback : function () {
                dragTriggered = true;
             }
        });

        $.when(
            $sliderWithoutValueBar.trigger($.Event('touchstart', {
                originalEvent: {
                    touches: [
                        {
                            preventDefault: function () { }, // mock: no-op
                            pageX: 20,
                            pageY: parseInt( that.sliders.sliderWithNoBarAndLabels.position().top, 10)
                        }
                    ],
                    preventDefault: function () { } // mock: no-op
                }
            }))
        )
        .then(function () {
            ok(dragTriggered, 'drag start event was triggered');
            start();
        });
  });

  test("can get corresponding pixel value", function () {
      var $slider = buildSlider(this.sliders.sliderWithRounding, {
          'rounding' : 10, 'range_min' : 5, 'range_max' : 95,
          'cur_min' : 30, 'cur_max' : 60
      });

      // mock a slider width and a left grip width otherwise they are going to
      // take the maximum space available...
      $slider.data('left_grip_width', 20);
      $slider.css('width', 500);

      equal($slider.nstSlider('value_to_px', 5), 0, "min range");
      equal($slider.nstSlider('value_to_px', 95), 480, "max range");
      equal($slider.nstSlider('value_to_px', 9999), 480, "exceed max range");
      equal($slider.nstSlider('value_to_px', 0), 0, "exceed min range");
      equal($slider.nstSlider('value_to_px', -999), 0, "exceed min range (negative value)");
      equal($slider.nstSlider('value_to_px', 50), 240, "inbetween value");

  });

  asyncTest("correct mouse events are triggered when two sliders are in the document", function () {
      var eventsTriggered = {
        mouseup : {
            'sliderA' : 0,
            'sliderB' : 0
        },
        dragstart: {
            'sliderA' : 0,
            'sliderB' : 0
        },
        changed: {
            'sliderA' : 0,
            'sliderB' : 0
        }
      };

      var $sliderA = this.sliders.mouseupTestSliderA.nstSlider({
          'left_grip_selector': '#gripA',
          'value_bar_selector': '#barA',
          'user_mouseup_callback': function() {
              eventsTriggered.mouseup.sliderA++;
          },
          'user_drag_start_callback': function() {
              eventsTriggered.dragstart.sliderA++;
          },
          'value_changed_callback': function(reason) {
              if (reason !== 'init') {
                  eventsTriggered.changed.sliderA++;
              }
          }
      });

      var $sliderB = this.sliders.mouseupTestSliderB.nstSlider({
          'left_grip_selector': '#gripB',
          'value_bar_selector': '#barB',
          'user_mouseup_callback': function() {
              eventsTriggered.mouseup.sliderB++;
          },
          'user_drag_start_callback': function() {
              eventsTriggered.dragstart.sliderB++;
          },
          'value_changed_callback': function(reason) {
              if (reason !== 'init') {
                  eventsTriggered.changed.sliderB++;
              }
          }
      });

      $.when(
          $sliderA
            .trigger($.Event('mousedown', {
                pageX: getCssLeft($sliderA.find('.leftGrip')) - 20 // first mousemove
            }))
            .trigger($.Event('mouseup', {
                pageX: getCssLeft($sliderA.find('.leftGrip'))
            }))
      )
      .then(
          $sliderB
            .trigger($.Event('mousedown', {
                pageX: 10 // first mousemove
            }))
            .trigger($.Event('mouseup', {
                pageX: getCssLeft($sliderB.find('.leftGrip')) // no mousemove
            }))
      )
      .then(function () {
          equal(eventsTriggered.dragstart.sliderA, 1, "mousedown triggered once on slider A");
          equal(eventsTriggered.mouseup.sliderA, 1,   "mouseup triggered once on slider A");

          equal(eventsTriggered.dragstart.sliderB, 1, "mousedown triggered once on slider B");
          equal(eventsTriggered.mouseup.sliderB, 1,   "mouseup triggered once on slider B");
          start();
      });
    
  });

  test('binary search works', function () {
    var $slider = buildSlider(this.sliders.sliderWithRounding, {
        'rounding' : 10, 'range_min' : 5, 'range_max' : 95,
        'cur_min' : 30, 'cur_max' : 60
    });

    var bSearchMethod = $slider.nstSlider('_m', 'binarySearch');
    var getElementFunc = function (array, idx) {
        return array[idx];
    };
    var compareFunc = function (x, array, idx) {
        // lt = -1 (searchElement < currentElement)
        // eq = 0 
        // gt = 1  (searchElement > currentElement)
        if (x < array[idx]) { return -1; }
        if (x > array[idx]) { return 1; }
        return 0;
    };


    equal(bSearchMethod([3, 4, 45, 123, 254, 300], 3, getElementFunc, compareFunc), 0, "left extreme");
    equal(bSearchMethod([3, 4, 45, 123, 254, 300], 300, getElementFunc, compareFunc), 5, "right extreme");
    equal(bSearchMethod([3, 4, 45, 123, 254, 300], 45, getElementFunc, compareFunc), 2, "inner element");
    equal(bSearchMethod([3, 4, 45, 123, 254, 300], -2, getElementFunc, compareFunc), -1, "non existing element");

  });

  test('binarySearchValueToPxCompareFunc works as expected', function () {
    var $slider = buildSlider(this.sliders.sliderWithRounding, {
        'rounding' : 10, 'range_min' : 5, 'range_max' : 95,
        'cur_min' : 30, 'cur_max' : 60
    });

    var bSearchMethod = $slider.nstSlider('_m', 'binarySearch');
    var getElementFunc = function (array, idx) {
        return array[idx];
    };
    var compareFunc = $slider.nstSlider('_m', 'binarySearchValueToPxCompareFunc');

    equal(bSearchMethod([3, 5, 50, 100, 200, 300], 3, getElementFunc, compareFunc), 0, "left extreme");
    equal(bSearchMethod([3, 5, 50, 100, 200, 300], 300, getElementFunc, compareFunc), 5, "right extreme");
    equal(bSearchMethod([3, 5, 50, 100, 200, 300], 20, getElementFunc, compareFunc), 2, "inner element");
    equal(bSearchMethod([3, 5, 50, 100, 200, 300], 3.9, getElementFunc, compareFunc), 1, "near left extreme case 1");
    equal(bSearchMethod([3, 5, 50, 100, 200, 300], 4.1, getElementFunc, compareFunc), 1, "near left extreme case 2");
    equal(bSearchMethod([3, 5, 50, 100, 200, 300], 249.9, getElementFunc, compareFunc), 5, "near right extreme case 1");
    equal(bSearchMethod([3, 5, 50, 100, 200, 300], 250.1, getElementFunc, compareFunc), 5, "near right extreme case 2");

  });

  test('single handled slider with bar all the way right has handle stuck to the right border', function () {
    var $barRightSlider = this.sliders.sliderSingleBarRight.nstSlider({
         'left_grip_selector' : '#grip',
         'value_bar_selector' : '.bar'
    });

    var $bar = $barRightSlider.find(".bar");
    var $grip = $barRightSlider.find("#grip");

    equal($bar.css('left'), $grip.css('left'), "bar starts at the same position of the left handle");

    equal($bar.css('width'), 
        ($barRightSlider.css('width').replace('px', '') - $grip.css('left').replace('px', '')) + "px",
        "bar starts on the handle edge");
  });

  test('single handled slider with bar all the way left has handle stuck to the left border', function () {
    var $barLeftSlider = this.sliders.sliderSingleBarLeft.nstSlider({
         'left_grip_selector' : '#grip',
         'value_bar_selector' : '.bar'
    });

    var $bar = $barLeftSlider.find(".bar");
    var $grip = $barLeftSlider.find("#grip");

    equal($bar.css('width'), getCssLeft($grip) + getCssWidth($grip) + "px", "bar ends position of the left handle");

    equal($bar.css('left'), "0px", "bar starts on the handle edge");
  });

  test('single handled slider with bar in the middle has bar exactly in the middle of the slider container', function () {
    var $barMiddleSlider = this.sliders.sliderSingleBarMiddle.nstSlider({
         'left_grip_selector' : '#grip',
         'value_bar_selector' : '.bar'
    });

    var $bar = $barMiddleSlider.find(".bar");
    var $grip = $barMiddleSlider.find("#grip");

    equal($bar.css('width'), (getCssWidth($barMiddleSlider) / 2) + "px", "bar ends position of the left handle");
    equal(getCssLeft($bar), getCssLeft($grip), "bar starts where the grip starts");
  });

}(jQuery));
