define(['vendor/underscore'], function (_) { var templates = {};

//
// Source file: [/home/darksmo/gits/jquery-nstslider-gh-pages/assets/javascripts/app/template/accessibleSlider.tpl]
// Template name: [accessibleSlider]
//
templates['accessibleSlider'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<!-- specify data-aria_enabled="true" -->\n<div class="nstSlider" data-aria_enabled="true"\n    data-range_min="-100" data-range_max="100" data-cur_min="-50" data-cur_max="50">\n\n    <div class="bar"></div>\n    <div class="leftGrip"></div>\n    <div class="rightGrip"></div>\n</div>\n<div class="leftLabel" />\n<div class="rightLabel" />\n\n<!-- used to display the aria attributes (just as a demo) -->\n<div class="ariaAttributesAsText"></div>\n';
}
return __p;
}

//
// Source file: [/home/darksmo/gits/jquery-nstslider-gh-pages/assets/javascripts/app/template/basicSliderMarkup.tpl]
// Template name: [basicSliderMarkup]
//
templates['basicSliderMarkup'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="nstSlider" data-range_min="-10" data-range_max="100" \n                       data-cur_min="20"    data-cur_max="80">\n\n    <div class="bar"></div>\n    <div class="leftGrip"></div>\n    <div class="rightGrip"></div>\n</div>\n<div class="leftLabel" />\n<div class="rightLabel" />\n';
}
return __p;
}

//
// Source file: [/home/darksmo/gits/jquery-nstslider-gh-pages/assets/javascripts/app/template/customizationMarkup.tpl]
// Template name: [customizationMarkup]
//
templates['customizationMarkup'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="nstSlider" data-range_min="0" data-range_max="100"\n                       data-cur_min="10"  data-cur_max="90">\n\n    <div class="highlightPanel"></div>\n    <div class="bar"></div>\n    <div class="leftGrip"></div>\n    <div class="rightGrip"></div>\n</div>\n\n<div class="leftLabel" />\n<div class="rightLabel" />\n';
}
return __p;
}

//
// Source file: [/home/darksmo/gits/jquery-nstslider-gh-pages/assets/javascripts/app/template/demoSection.tpl]
// Template name: [demoSection]
//
templates['demoSection'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<section id="'+
((__t=( id ))==null?'':__t)+
'" class="demo">\n    <h2>'+
((__t=( title ))==null?'':__t)+
'</h2>\n    ';
 if (typeof description !== 'undefined') { 
__p+='\n    <div class="description">\n        '+
((__t=( description ))==null?'':__t)+
'\n    </div>\n    ';
 } 
__p+='\n    <div class="widget">\n        '+
((__t=( markup ))==null?'':__t)+
'\n        <script type="text/javascript">\n            $(\'#'+
((__t=( id ))==null?'':__t)+
'\').find(\'.'+
((__t=( pluginClass ))==null?'':__t)+
'\').'+
((__t=( pluginName ))==null?'':__t)+
'(\n                '+
((__t=( pluginOptions ))==null?'':__t)+
'\n            );\n            ';
 if (typeof extraJavascript !== 'undefined') { 
__p+='\n            ';
 var jsReplaced = extraJavascript.replace(/__PLUGIN_CLASS__/g, '$(\'#' + id + '\').find(\'.' + pluginClass + '\')'); 
__p+='\n                '+
((__t=( jsReplaced ))==null?'':__t)+
'\n            ';
 } 
__p+='\n        </script>\n    </div>\n    <h3>HTML</h3>\n    <pre class="prettyprint lang-html">\n'+
((__t=( markup_escaped ))==null?'':__t)+
'\n    </pre>\n    <h3>Javascript</h3>\n    <pre class="prettyprint lang-javascript linenums">\n$(\'.nstSlider\').nstSlider('+
((__t=( pluginOptions.replace(/</g,'&lt;').replace(/>/g, '&gt;') ))==null?'':__t)+
');\n';
 if (typeof extraJavascript !== 'undefined') { 
__p+=''+
((__t=( extraJavascript.replace(/__PLUGIN_CLASS__/g, '\'.' + pluginClass + '\'') ))==null?'':__t)+
'';
 } 
__p+='</pre>\n</section>\n';
}
return __p;
}

//
// Source file: [/home/darksmo/gits/jquery-nstslider-gh-pages/assets/javascripts/app/template/distributionBasedIncrementsMarkup.tpl]
// Template name: [distributionBasedIncrementsMarkup]
//
templates['distributionBasedIncrementsMarkup'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="nstSlider" data-range_min="0" data-range_max="100" \n                       data-cur_min="40"  data-cur_max="70">\n\n    <div class="bar"></div>\n    <div class="leftGrip"></div>\n    <div class="rightGrip"></div>\n</div>\n<div class="leftLabel" />\n<div class="rightLabel" />\n\n<a id="changeStepIncrement" onclick="return false;">Use Histogram-Based Increment Step</a>\n';
}
return __p;
}

//
// Source file: [/home/darksmo/gits/jquery-nstslider-gh-pages/assets/javascripts/app/template/pluginMethods.tpl]
// Template name: [pluginMethods]
//
templates['pluginMethods'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<table>\n    <tr>\n        <th>\n            Method Name\n        </th>\n        <th>\n            Parameters\n        </th>\n        <th>\n            Description\n        </th>\n    </tr>\n    ';
 for (var i=0; i<methods.length; i++) { 
__p+='\n        ';
 var method = methods[i]; 
__p+='\n        <tr>\n            <td>'+
((__t=( method.name ))==null?'':__t)+
'</td>\n            ';
 if (typeof method.arguments !== 'string') { 
__p+='\n                <td>\n                    <ol>\n                    ';
 for (var j = 0; j<method.arguments.length; j++) { 
__p+='\n                        ';
 var arg = method.arguments[j]; 
__p+='\n                        <li>'+
((__t=( arg ))==null?'':__t)+
'</li>\n                    ';
 } 
__p+='\n                    </ol>\n                </td>\n            ';
 } else { 
__p+='\n                <td>'+
((__t=( method.arguments ))==null?'':__t)+
'</td>\n            ';
 } 
__p+='\n\n            <td>'+
((__t=( method.description ))==null?'':__t)+
'</td>\n        </tr>\n    ';
 } 
__p+='\n</table>\n';
}
return __p;
}

//
// Source file: [/home/darksmo/gits/jquery-nstslider-gh-pages/assets/javascripts/app/template/pluginSettings.tpl]
// Template name: [pluginSettings]
//
templates['pluginSettings'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<table>\n    <tr>\n        <th>\n            Setting Name\n        </th>\n        <th>\n            Type\n        </th>\n        <th>\n            Default\n        </th>\n        <th>\n            Description\n        </th>\n    </tr>\n    ';
 for (var i=0; i<settings.length; i++) { 
__p+='\n    ';
 var setting = settings[i]; 
__p+='\n    <tr>\n        <td>'+
((__t=( setting.name ))==null?'':__t)+
'</td>\n        <td>'+
((__t=( setting.type ))==null?'':__t)+
'</td>\n        <td>'+
((__t=( setting.default ))==null?'':__t)+
'</td>\n        <td>'+
((__t=( setting.description ))==null?'':__t)+
'</td>\n    </tr>\n    ';
 } 
__p+='\n</table>\n';
}
return __p;
}

//
// Source file: [/home/darksmo/gits/jquery-nstslider-gh-pages/assets/javascripts/app/template/rangeHighlightMarkup.tpl]
// Template name: [rangeHighlightMarkup]
//
templates['rangeHighlightMarkup'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="nstSlider" data-range_min="0" data-range_max="100"\n                       data-cur_min="10"  data-cur_max="90">\n\n    <div class="highlightPanel"></div>\n    <div class="bar"></div>\n    <div class="leftGrip"></div>\n    <div class="rightGrip"></div>\n</div>\n\n<div class="leftLabel" />\n<div class="rightLabel" />\n\n<a href="#" onclick="return false;" id="highlightRangeButton">Highlight Random Range</a>\n';
}
return __p;
}

//
// Source file: [/home/darksmo/gits/jquery-nstslider-gh-pages/assets/javascripts/app/template/roundingIncrementsMarkup.tpl]
// Template name: [roundingIncrementsMarkup]
//
templates['roundingIncrementsMarkup'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="nstSlider" data-range_min="100" data-range_max="100000" \n                       data-cur_min="0"  data-cur_max="100000">\n\n    <div class="bar"></div>\n    <div class="leftGrip"></div>\n    <div class="rightGrip"></div>\n</div>\n<div class="leftLabel" />\n<div class="rightLabel" />\n';
}
return __p;
}

//
// Source file: [/home/darksmo/gits/jquery-nstslider-gh-pages/assets/javascripts/app/template/scrollSpy.tpl]
// Template name: [scrollSpy]
//
templates['scrollSpy'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<nav class="scrollspy">\n    <ul>\n        ';
 for (var i=0; i<items.length; i++) { 
__p+='\n        ';
 var item = items[i] 
__p+='\n        <li class="subitem" id="'+
((__t=( item.id ))==null?'':__t)+
'">'+
((__t=( item.name ))==null?'':__t)+
'</li>\n        ';
 } 
__p+='\n    </ul>\n    <ul>\n        <li id="li_features">Features</li>\n        <li id="li_settings">Settings</li>\n        <li id="li_methods">Methods</li>\n        <li id="li_get_it">Get It!</li>\n    </ul>\n</nav>\n';
}
return __p;
}

//
// Source file: [/home/darksmo/gits/jquery-nstslider-gh-pages/assets/javascripts/app/template/singleHandlerSlider.tpl]
// Template name: [singleHandlerSlider]
//
templates['singleHandlerSlider'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="nstSlider" data-range_min="-127" data-range_max="127" \n                       data-cur_min="0">\n\n    <div class="leftGrip"></div>\n</div>\n<div class="leftLabel" />\n';
}
return __p;
}

//
// Source file: [/home/darksmo/gits/jquery-nstslider-gh-pages/assets/javascripts/app/template/singleHandlerSliderFixedBar.tpl]
// Template name: [singleHandlerSliderFixedBar]
//
templates['singleHandlerSliderFixedBar'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="nstSlider" data-range_min="-127" data-range_max="127"\n                       data-cur_min="80"     data-cur_max="0">\n\n    <div class="bar"></div>\n    <div class="leftGrip"></div>\n</div>\n<div class="leftLabel" />\n';
}
return __p;
}
return templates; });