jquery.nstSlider.js
-------

[1]: <https://github.com/lokku/jquery-nstslider>

Fully customizable with CSS, Single/Double handles, Touch-enabled, IE 7+ Compatibility, Custom Digit Rounding, Non linear step increments!

[![Build Status](https://travis-ci.org/lokku/jquery-nstslider.svg?branch=master)](https://travis-ci.org/lokku/jquery-nstslider)

#### Example

Initialize with:

```javascript
$(".mySlider").nstSlider({
    "left_grip_selector": ".leftGrip",
    "right_grip_selector": ".rightGrip",
    "value_bar_selector": ".bar",
    "value_changed_callback": function(cause, minValue, maxValue, prevMinValue, prevMaxValue) {
        // show the suggested values in your min/max labels elements
    }
});
 ```

Method call:

```javascript
$(".mySlider").nstSlider("set_position", 10 /* min */, 90 /* max */);
```

Destroy with:

```javascript
$(".mySlider").nstSlider("teardown");
```


#### Demo

For live demos please visit the project webpage:

[http://lokku.github.io/jquery-nstslider/](http://lokku.github.io/jquery-nstslider/)

For a Quick Start have a look at the source html of the following file:

[https://github.com/lokku/jquery-nstslider/blob/master/demo/index.html](https://github.com/lokku/jquery-nstslider/blob/master/demo/index.html)

#### Options

Option | Type | Default | Description
------ | ---- | ------- | -----------
animating_css_class | string | nst-animating | the css class to be used when the slider is to be animated (this happens when a certain min/max value is being set for example).
touch_tolerance_value_bar_x | number | 15 | the horizontal tolerance in pixels by which a handle of the slider should be grabbed if the user touches outside the slider bar area.
touch_tolerance_value_bar_y | number | 30 | the vertical tolerance in pixels by which a handle of the slider should be grabbed if the user touches outside the slider bar area.
left_grip_selector | string | .nst-slider-grip-left | the selector of the left grip handle. The left grip element must exist in the page when the slider is initialized.
right_grip_selector | string | undefined | the selector of the right grip handle. This is optional. A single handler bar is assumed if this selector is not specified.
value_bar_selector | string | undefined  | the selector of the value bar. If not specified assumes a value bar representing the selection is not wanted.
rounding | object or number | 1 | the rounding for a certain value displayed on the slider. This rounds the values returned in the value_changed_callback as roundedValue : int(actualValue / rounding) * rounding. The rounding parameter can be a number (i.e., fixed rounding) or can depend on actualValue (i.e., dynamic rounding). To perform dynamic rounding an object must be passed instead of a value. For example, passing rounding : { '1' : '100', '10' : '1000', '50' : '10000' } will use rounding = 1 when actualValue <= 100, rounding = 10 when 100 < actualValue <= 1000 and so on...
crossable_handles | boolean | true | Allow handles to cross each other while one of them is being dragged. This option is ignored if just one handle is used.
value_changed_callback | function | function(cause, curMin, curMax, prevMin, prevMax) { return; } | a callback called whenever the user drags one of the handles.
user_mouseup_callback | function | function(vmin, vmax, left_grip_moved) { return; } | a callback called whenever the mouse button pressed while dragging a slider grip is released
user_drag_start_callback | function | function () { return; } | a callback called before the user drags one of the handles

#### Methods

When calling methods, use **positional** arguments. For example, for the
`set_position` method, call:

```javascript
$(".mySlider").nstSlider("set_position", 10 /* min */, 90 /* max */);
```

do not call:

```javascript
$(".mySlider").nstSlider("set_position", { min: 10, max: 90 });
```

unless the documentation says that the first argument is an object.


Method | Arguments (positional) | Description
------ | -------- | -----------
get_range_min | None | return the current minimum range of the slider
get_range_max | None | return the current maximum range of the slider
get_current_min_value | None | return the current minimum value of the slider
get_current_max_value | None | return the current maximum value of the slider
is_handle_to_left_extreme | None | return a boolean indicating whether or not the left handler is moved all the way to the left
is_handle_to_right_extreme | None | return a boolean indicating whether or not the right handler is moved all the way to the right
refresh | None | force a refresh of the slider
disable | None | disable the slider (i.e., user cannot move the handles)
enable | None | enable the slider (i.e., user can move the handles)
is_enabled | None | return a boolean indicating whether or not the slider can be moved by the user
set_position | min: number, max: number | set the handles at the specified min and max values
set_step_histogram | histogram : array of numbers | use a non-linear step increment for the slider that is stretched where the histogram provided counts more items
unset_step_histogram | None | use a linear scale of increments for the slider
set_range | rangeMin : number, rangeMax : number | set the minimum and the maximum range of values the slider
set_rounding | rounding: number or object | set the rounding for the slider
get_rounding | None | return the current rounding of the slider
teardown | None | remove all data stored in the slider
value_to_px | number | given a value in the range of the slider, returns the corresponding value in pixel relative to the slider width

#### Dependencies

jQuery 1.6.4+

#### License

Copyright (c) 2014 Lokku Ltd.

Licensed under the MIT license.
