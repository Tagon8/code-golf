import unittest
import roman

class RomantTestCase ( unittest.TestCase ):

    def test_match ( self ):
        numbers = {
            'IV': 2,
            'IX': 2,
            'XL': 20,
            'XC': 20,
            'CD': 200,
            'CM': 200
        }

        for k, v in numbers.iteritems():
            self.assertEqual( roman.match( k ), v )

    def test_from_one_to_ten ( self ):
        numbers = {
            'I': 1, 'II': 2,
            'III': 3, 'IV': 4,
            'V': 5, 'VI': 6,
            'VII': 7, 'VIII': 8,
            'IX': 9, 'X': 10
        }

        for k, v in numbers.iteritems():
            self.assertEqual( roman.to_decimal( k ), v )


if __name__ == '__main__':
    unittest.main()
