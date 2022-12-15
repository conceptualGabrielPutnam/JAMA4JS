/* Generated from Java with JSweet 3.0.0 - http://www.jsweet.org */

/**
 * Example of use of Matrix Class, featuring magic squares.
 * @class
 */
var MagicSquareExample = /** @class */ (function () {
    function MagicSquareExample() {
    }
    /**
     * Generate magic square test matrix.
     * @param {number} n
     * @return {Matrix}
     */
    MagicSquareExample.magic = function (n) {
        var M = (function (dims) { var allocate = function (dims) { if (dims.length === 0) {
            return 0;
        }
        else {
            var array = [];
            for (var i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([n, n]);
        if ((n % 2) === 1) {
            var a = ((n + 1) / 2 | 0);
            var b = (n + 1);
            for (var j = 0; j < n; j++) {
                {
                    for (var i = 0; i < n; i++) {
                        {
                            M[i][j] = n * ((i + j + a) % n) + ((i + 2 * j + b) % n) + 1;
                        }
                        ;
                    }
                }
                ;
            }
        }
        else if ((n % 4) === 0) {
            for (var j = 0; j < n; j++) {
                {
                    for (var i = 0; i < n; i++) {
                        {
                            if ((((i + 1) / 2 | 0)) % 2 === (((j + 1) / 2 | 0)) % 2) {
                                M[i][j] = n * n - n * i - j;
                            }
                            else {
                                M[i][j] = n * i + j + 1;
                            }
                        }
                        ;
                    }
                }
                ;
            }
        }
        else {
            var p = (n / 2 | 0);
            var k = ((n - 2) / 4 | 0);
            var A = MagicSquareExample.magic(p);
            for (var j = 0; j < p; j++) {
                {
                    for (var i = 0; i < p; i++) {
                        {
                            var aij = A.get(i, j);
                            M[i][j] = aij;
                            M[i][j + p] = aij + 2 * p * p;
                            M[i + p][j] = aij + 3 * p * p;
                            M[i + p][j + p] = aij + p * p;
                        }
                        ;
                    }
                }
                ;
            }
            for (var i = 0; i < p; i++) {
                {
                    for (var j = 0; j < k; j++) {
                        {
                            var t_1 = M[i][j];
                            M[i][j] = M[i + p][j];
                            M[i + p][j] = t_1;
                        }
                        ;
                    }
                    for (var j = n - k + 1; j < n; j++) {
                        {
                            var t_2 = M[i][j];
                            M[i][j] = M[i + p][j];
                            M[i + p][j] = t_2;
                        }
                        ;
                    }
                }
                ;
            }
            var t = M[k][0];
            M[k][0] = M[k + p][0];
            M[k + p][0] = t;
            t = M[k][k];
            M[k][k] = M[k + p][k];
            M[k + p][k] = t;
        }
        return new Matrix(M);
    };
    /**
     * Shorten spelling of print.
     * @param {string} s
     * @private
     */
    /*private*/ MagicSquareExample.print = function (s) {
        console.info(s);
    };
    /**
     * Format double with Fw.d.
     * @param {number} x
     * @param {number} w
     * @param {number} d
     * @return {string}
     */
    MagicSquareExample.fixedWidthDoubletoString = function (x, w, d) {
        var s = x.toFixed(d);
        while ((s.length < w)) {
            {
                s = " " + s;
            }
        }
        ;
        return s;
    };
    /**
     * Format integer with Iw.
     * @param {number} n
     * @param {number} w
     * @return {string}
     */
    MagicSquareExample.fixedWidthIntegertoString = function (n, w) {
        var s = ('' + (n));
        while ((s.length < w)) {
            {
                s = " " + s;
            }
        }
        ;
        return s;
    };
    MagicSquareExample.runExample = function (argv) {
        MagicSquareExample.print("\n    Test of Matrix Class, using magic squares.\n");
        MagicSquareExample.print("    See MagicSquareExample.runExample() for an explanation.\n");
        MagicSquareExample.print("\n      n     trace       max_eig   rank        cond      lu_res      qr_res\n\n");
        var start_time = new Date();
        var eps = Math.pow(2.0, -52.0);
        for (var n = 3; n <= 32; n++) {
            {
                MagicSquareExample.print(MagicSquareExample.fixedWidthIntegertoString(n, 7));
                var M = MagicSquareExample.magic(n);
                var t = (M.trace() | 0);
                MagicSquareExample.print(MagicSquareExample.fixedWidthIntegertoString(t, 10));
                var E = new EigenvalueDecomposition(M.plus(M.transpose()).times$double(0.5));
                var d = E.getRealEigenvalues();
                MagicSquareExample.print(MagicSquareExample.fixedWidthDoubletoString(d[n - 1], 14, 3));
                var r = M.rank();
                MagicSquareExample.print(MagicSquareExample.fixedWidthIntegertoString(r, 7));
                var c = M.cond();
                MagicSquareExample.print(c < 1 / eps ? MagicSquareExample.fixedWidthDoubletoString(c, 12, 3) : "         Inf");
                var LU = new LUDecomposition(M);
                var L = LU.getL();
                var U = LU.getU();
                var p = LU.getPivot();
                var R = L.times$Matrix(U).minus(M.getMatrix$int_A$int$int(p, 0, n - 1));
                var res = R.norm1() / (n * eps);
                MagicSquareExample.print(MagicSquareExample.fixedWidthDoubletoString(res, 12, 3));
                var QR = new QRDecomposition(M);
                var Q = QR.getQ();
                R = QR.getR();
                R = Q.times$Matrix(R).minus(M);
                res = R.norm1() / (n * eps);
                MagicSquareExample.print(MagicSquareExample.fixedWidthDoubletoString(res, 12, 3));
                MagicSquareExample.print("\n");
            }
            ;
        }
        var stop_time = new Date();
        var etime = (stop_time.getTime() - start_time.getTime()) / 1000.0;
        MagicSquareExample.print("\nElapsed Time = " + MagicSquareExample.fixedWidthDoubletoString(etime, 12, 3) + " seconds\n");
        MagicSquareExample.print("Adios\n");
    };
    return MagicSquareExample;
}());
MagicSquareExample["__class"] = "MagicSquareExample";