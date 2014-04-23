define(['vendor/underscore'], function (_) { var templates = {};

//
// Source file: [/home/darksmo/working/mimosa-projects/nstSlider/assets/javascripts/app/template/basicSliderMarkup.tpl]
// Template name: [basicSliderMarkup]
//
templates['basicSliderMarkup'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="slider"\n    data-rounding="1"\n    data-range_min="-10"\n    data-range_max="100"\n    data-cur_min="20"\n    data-cur_max="80">\n\n    <div class="bar"></div>\n    <div class="leftGrip"></div>\n    <div class="rightGrip"></div>\n</div>\n<!-- Labels are managed outside the plugin -->\n<div class="leftLabel" />\n<div class="rightLabel" />\n';
}
return __p;
}

//
// Source file: [/home/darksmo/working/mimosa-projects/nstSlider/assets/javascripts/app/template/demoSection.tpl]
// Template name: [demoSection]
//
templates['demoSection'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<section id="'+
((__t=( id ))==null?'':__t)+
'" class="demo">\n    <h2>'+
((__t=( title ))==null?'':__t)+
'</h2>\n    <div class="widget">\n        '+
((__t=( markup ))==null?'':__t)+
'\n        <script type="text/javascript">\n            $(\'#'+
((__t=( id ))==null?'':__t)+
' .'+
((__t=( pluginClass ))==null?'':__t)+
'\').'+
((__t=( pluginName ))==null?'':__t)+
'(\n                '+
((__t=( pluginOptions ))==null?'':__t)+
'\n            );\n        </script>\n    </div>\n    <h3>HTML</h3>\n    <pre class="prettyprint lang-html">\n'+
((__t=( markup_escaped ))==null?'':__t)+
'\n    </pre>\n    <h3>Javascript</h3>\n    <pre class="prettyprint lang-javascript linenums">\n$(\'.slider\').nstSlider('+
((__t=( pluginOptions ))==null?'':__t)+
');</pre>\n</section>\n';
}
return __p;
}

//
// Source file: [/home/darksmo/working/mimosa-projects/nstSlider/assets/javascripts/app/template/pluginMethods.tpl]
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
// Source file: [/home/darksmo/working/mimosa-projects/nstSlider/assets/javascripts/app/template/pluginSettings.tpl]
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
// Source file: [/home/darksmo/working/mimosa-projects/nstSlider/assets/javascripts/app/template/scrollSpy.tpl]
// Template name: [scrollSpy]
//
templates['scrollSpy'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<nav class="scrollspy">\n    <ul>\n        <li id="li_demo">Demo</li>\n        ';
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
// Source file: [/home/darksmo/working/mimosa-projects/nstSlider/assets/javascripts/app/template/singleHandlerSlider.tpl]
// Template name: [singleHandlerSlider]
//
templates['singleHandlerSlider'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="slider"\n    data-rounding="1"\n    data-range_min="-127"\n    data-range_max="127"\n    data-cur_min="0">\n\n    <div class="leftGrip"></div>\n</div>\n<div class="leftLabel" />\n';
}
return __p;
}

//
// Source file: [/home/darksmo/working/mimosa-projects/nstSlider/assets/javascripts/app/template/singleHandlerSliderFixedBar.tpl]
// Template name: [singleHandlerSliderFixedBar]
//
templates['singleHandlerSliderFixedBar'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="slider"\n    data-rounding="1"\n    data-range_min="-127"\n    data-range_max="127"\n    data-cur_min="80"\n    data-cur_max="0">\n\n    <div class="bar"></div>\n    <div class="leftGrip"></div>\n</div>\n<div class="leftLabel" />\n';
}
return __p;
}
return templates; });