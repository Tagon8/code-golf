/*
 * PUZZLE - Roman to decimal
 *
 * Author: Gabriel Raposo (gabriel@tagon8inc.com)
 */

#include <stdio.h>
#include <string.h>

struct roman_conv {
    char roman;
    int decimal;
};

static struct roman_conv __conv[] = {
    {'I', 1},
    {'V', 5},
    {'X', 10},
    {'L', 50},
    {'C', 100},
    {'D', 500},
    {'M', 1000},
    {0, 0}
};

/*
 * Function to receive a string from stdin
 */
static void input(char *string, int max)
{
    int key = 0,
        fim = 0;
    int tam = 0;

    memset(string, 0, sizeof(string));

    do {
        key = getchar();

        /* enter */
        if (key == 0x0A) {
            string[tam] = '\0';
            fim = 1;
        }

        /* back space */
        if (key == 0x08) {
            printf("\b \b");
            tam--;
        }

        if (tam > max || tam > 255) {
            printf("\b");
            tam--;
        }

        if (key >= 0x20 && key <= 0xFF) {
            string[tam] = (char)key;
            tam++;
        }
    } while (!fim);
}

/*
 * Gives the right value for each roman digit
 */
static int conv_digit(char c)
{
    int num = 0,
        j = 0;

    for (j = 0; __conv[j].roman; j++) {
        if (c == __conv[j].roman) {
            num = __conv[j].decimal;
            break;
        }
    }

    return num;
}

/*
 * Verify the roman numeral rules
 */
static int check_rules(int prev, int num)
{
    int i = 0;

    for (i = 0; i < 6; i += 2) {
        if (prev == __conv[i].decimal) {
            if ((num != __conv[i + 1].decimal) && 
                (num != __conv[i + 2].decimal))
                return 0;
        }
    }

    return 1;
}

/*
 * Convert the roman string into a decimal number
 */
static int roman2decimal(char * str)
{
    int finish = 0,
        total = 0,
        prev = 0,
        num = 0,
        aux = 0,
        i = 0,
        j = 0;

    while (1) {
        for (j = 0; j < 3; j++) {
            if (i >= (int)strlen(str)) {
                finish = 1;
                break;
            }

            if ((num = conv_digit(str[i]))) {
                if (!prev || prev == num) {
                    aux += num;
                    i++;
                } else if (prev < num) {
                    if (!check_rules(prev, num))
                        return -2;

                    aux = num - prev;
                    prev = 0;
                    i++;
                    break;
                } else
                    break;
            } else
                return -1;

            prev = num;
        }

        total += aux;
        aux = 0;
        prev = 0;

        if (finish)
            break;
    }

    return total;
}

int main()
{
    const int max_input = 16;
    char str[16];
    int ret = 0;

    fprintf(stdout, "Digite o numeral e algarismos romanos: ");

    input(str, max_input);
    fprintf(stdout, "\r\n");

    ret = roman2decimal(str);

    switch (ret) {
        case -1:
            fprintf(stdout, "ERRO! Algarismos invalidos\n");
            fprintf(stdout, "Algarismos romanos: \"I, V, X, L, C, D, M\"\n");
            break;

        case -2:
            fprintf(stdout, "ERRO! Sequencia invalida\n");
            break;

        default:
            fprintf(stdout, "Em decimal: %d\n", ret);
            break;
    }

    return 0;
}

