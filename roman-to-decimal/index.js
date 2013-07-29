(function () {
    var root = this,
        to = null,
        decimal = null,
        token = {};

    to = root.to = {};

    token['I'] = 1;
    token['V'] = 5;
    token['X'] = 10;
    token['L'] = 50;
    token['C'] = 100;
    token['D'] = 500;
    token['M'] = 1000;

    decimal = to.decimal = function ( expression, c  ) { 
        var out = 0,
            tokens = Object.keys( token ),
            l = expression.length,
            c1 = 0,
            c = 1;

        for (
            var i = 0,
                cE = null;
            i < l && ( cE = token[ expression[ i ] ] );
            i++
        ) {
            if ( 
                tokens.slice( c ).indexOf( expression[ i ] ) > -1
            ) {
                out = Math.max( out, cE ) - Math.min( out, cE );
                c += 1; 
            } else {
                out += cE;
            }
        }

        if ( expression.search(/^([XLCDM][XLCDM]{1,})+(I[V|X])$/) > -1 ) out -= 2;
        if ( expression.search(/^[XLCDM]IV$/) > -1 ) out -= 2;
        if ( expression.search(/^[XLCDM]IX$/) > -1 ) out += 18;
        if ( expression.search(/^[LCDMX][X]/) > -1 ) out += 20;
        if ( expression.search(/^[LCDMX]XL/) > -1 ) out += 60;
        if ( expression.search(/^[LCDMX]XL|XL/) > -1 ) out += 20;
        if ( expression.search(/^([C][L])XL/) > -1 ) out += 100;
        if ( expression.search(/^[C]{1,3}/) )
        if ( 
            expression.search(/^([CD]{2,})|([L]{1,})?(XL)|([LC]XL)/) > -1 
        ) out -= 20;
        if ( expression.search(/^[CD][L]/) > -1 ) out += token['C'];
        if ( expression.search(/^[DC]{2,}/) > -1 ) out += token['C'] * 2;
        if ( expression.search(/^[C]{4,}/) > -1 ) out += token['C'] * 2;

        return out;
    };
}).call( this );
