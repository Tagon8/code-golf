(function () {
    var root = this,
        // objects
        to = null,
        valid = null,
        token = null,
        tokens = null,
        infers = null,
        // methods
        decimal = null,
        validToken = null,
        infersMatch = null;


    to = root.to = {};
    valid = root.valid = {};
    token = root.token = {};
    infers = root.infers = {};

    token['I'] = 1;
    token['V'] = 5;
    token['X'] = 10;
    token['L'] = 50;
    token['C'] = 100;
    token['D'] = 500;
    token['M'] = 1000;

    tokens = root.tokens = Object.keys( token );

    validToken = root.valid.token = function ( expression ) {
        var out = false,
            rValidTokens = new RegExp(
                '^[' + tokens.join() + ']{1,}$'    
            );

        if ( expression.search( rValidTokens ) > -1 ) out = true;

        return out;
    };

    infersMatch = root.infers.match = function ( expression ) {
        var out = 0,
            matches = {
                '(I[VX])': 2,
                '(X[LC])': 20,
                '(C[DM])': 200
            };

        for ( var k in matches ) {
            var re = new RegExp( k );

            if ( expression.search( re ) > -1 ) out += matches[ k ];
        }

        return out;
    };

    decimal = to.decimal = function ( expression ) { 
        var out = 0,
            l = expression.length;

        for (
            var i = 0,
                cE = null;
            i < l && ( cE = token[ expression[ i ] ] );
            i++
        ) {
            if ( cE !== undefined ) {
                out += cE;
            }
        }

        out -= ( out > 0 ) ? infersMatch( expression ) : out ;
        if ( !validToken( expression ) ) out = 0;

        return out;
    };
}).call( this );
