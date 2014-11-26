Size
====
Convenient utility for parsing and converting web units

Usage
=====

Size is packed as AMD module by default, so if you have AMD loader enabled in your environment you will be able to load it with a simple `require(['path to Size'])` call.

If there happen to be no AMD loader, then you may want to embed a small piece of amd shim (https://github.com/normanzb/amdshim) or simply copy paste the code as it is fairly small.

API
===

Parse unit string
-----------------

    var size = Size.parse($('the element').css('font-size'));
    console.log('The value is ' + size.value + ' and the unit is ' + size.unit );

Convert one unit to the other unit
----------------------------------

Because the visual size can be different even when the unit and value are the same, converting unit requires you to pass in a dom element as a reference.

For example, you have an `<span>` with `font-size` defined in `px`, you want to know how many is for `em`:

    var $container = $('the element');
    var size = Size.parse($container.css('font-size'));
    size.measurer($container).to('em');


    

