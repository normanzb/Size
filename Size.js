define(function(){

    'use strict';

    var UNITS = {
        'em':'em',
        'px':'em',
        'pt':'pt',
        'rem':'rem'
    };

    function Measurer(reference) {
        if ( reference == null ) {
            throw 'Reference must be specified';
        }
        if ( 'length' in reference ) {
            reference = reference[0];
        }
        this.reference = reference;
        this._from = null;
    }

    Measurer.prototype.from = function(size){
        this._from = size;
    };

    Measurer.prototype.to = function(unit) {
        if (!(unit in UNITS)) {
            throw 'Unit is not supported';
        }

        var ref = this.reference;

        var oldHeight = ref.style.height;
        var oldOverflow = ref.style.overflow;
        var oldDisplay = ref.style.display;

        ref.style.overflow = 'hidden';

        ref.style.height = this._from.toString();
        var pxFrom = parseInt(ref.clientHeight, 10);

        ref.style.height = '1' + unit;
        var pxPerUnit = parseInt(ref.clientHeight, 10);

        ref.style.height = oldHeight;
        ref.style.overflow = oldOverflow;
        ref.style.display = oldDisplay;

        return new Ctor(pxFrom / pxPerUnit, unit);

    };

    function Ctor(value, unit) {
        this.value = value;
        this.unit = unit;
    }

    Ctor.parse = function parseSize(str){
        var matches = /([\d\.]*)?(\D*)?/.exec(str);
        return new Ctor(matches[1] || 0, matches[2] || '');
    };

    Ctor.prototype.valueOf = function sizeValueOf() {
        return this.value;
    };

    Ctor.prototype.toString = function sizeToString() {
        return this.value + this.unit;
    };

    Ctor.prototype.measurer = function (reference){
        var m = new Measurer(reference);
        m.from(this);
        return m;
    };

    return Ctor;
});