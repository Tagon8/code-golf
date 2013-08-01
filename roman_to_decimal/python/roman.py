# coding: utf-8
import re

def match ( expression ):
    out = 0

    tokens = {
        '(I[V|X])': 2,
        '(X[L|C])': 20,
        '(C[D|M])': 200
    }

    for k, v in tokens.iteritems():
        if re.search( k, expression ):
            out = v
            break

    return out

def to_decimal( expression ):
    out = 0

    tokens = {
        'I': 1, 'V': 5,
        'X': 10, 'L': 50,
        'C': 100, 'D': 500,
        'M': 1000
    }

    for i in expression:
        out += tokens[ i ]

    out -= match( expression )

    return out
