/**
 * TestMatrix tests the functionality of the Jama Matrix class and associated decompositions.
 * <P>
 * Run the test from the command line using
 * <BLOCKQUOTE><PRE><CODE>
 * java Jama.test.TestMatrix
 * </CODE></PRE></BLOCKQUOTE>
 * Detailed output is provided indicating the functionality being tested
 * and whether the functionality is correctly implemented.   Exception handling
 * is also tested.
 * <P>
 * The test is designed to run to completion and give a summary of any implementation errors
 * encountered. The final output should be:
 * <BLOCKQUOTE><PRE><CODE>
 * TestMatrix completed.
 * Total errors reported: n1
 * Total warning reported: n2
 * </CODE></PRE></BLOCKQUOTE>
 * If the test does not run to completion, this indicates that there is a
 * substantial problem within the implementation that was not anticipated in the test design.
 * The stopping point should give an indication of where the problem exists.
 * @class
 */
var TestMatrix = /** @class */ (function () {
  function TestMatrix() {}
  TestMatrix.runJAMATest = function () {
    var A;
    var B;
    var C;
    var Z;
    var O;
    var I;
    var R;
    var S;
    var X;
    var SUB;
    var M;
    var T;
    var SQ;
    var DEF;
    var SOL;
    var errorCount = 0;
    var warningCount = 0;
    var tmp = 0.0;
    var s = 0.0;
    var columnwise = [
      1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0
    ];
    var rowwise = [
      1.0, 4.0, 7.0, 10.0, 2.0, 5.0, 8.0, 11.0, 3.0, 6.0, 9.0, 12.0
    ];
    var avals = [
      [1.0, 4.0, 7.0, 10.0],
      [2.0, 5.0, 8.0, 11.0],
      [3.0, 6.0, 9.0, 12.0]
    ];
    var rankdef = [avals[0].slice(), avals[1].slice(), avals[2].slice()];
    var tvals = [
      [1.0, 2.0, 3.0],
      [4.0, 5.0, 6.0],
      [7.0, 8.0, 9.0],
      [10.0, 11.0, 12.0]
    ];
    var subavals = [
      [5.0, 8.0, 11.0],
      [6.0, 9.0, 12.0]
    ];
    var rvals = [
      [1.0, 4.0, 7.0],
      [2.0, 5.0, 8.0, 11.0],
      [3.0, 6.0, 9.0, 12.0]
    ];
    var pvals = [
      [4.0, 1.0, 1.0],
      [1.0, 2.0, 3.0],
      [1.0, 3.0, 6.0]
    ];
    var ivals = [
      [1.0, 0.0, 0.0, 0.0],
      [0.0, 1.0, 0.0, 0.0],
      [0.0, 0.0, 1.0, 0.0]
    ];
    var evals = [
      [0.0, 1.0, 0.0, 0.0],
      [1.0, 0.0, 2.0e-7, 0.0],
      [0.0, -2.0e-7, 0.0, 1.0],
      [0.0, 0.0, 1.0, 0.0]
    ];
    var square = [
      [166.0, 188.0, 210.0],
      [188.0, 214.0, 240.0],
      [210.0, 240.0, 270.0]
    ];
    var sqSolution = [[13.0], [15.0]];
    var condmat = [
      [1.0, 3.0],
      [7.0, 9.0]
    ];
    var badeigs = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 1, 0],
      [1, 1, 0, 0, 1],
      [1, 0, 1, 0, 1]
    ];
    var rows = 3;
    var cols = 4;
    var invalidld = 5;
    var raggedr = 0;
    var raggedc = 4;
    var validld = 3;
    var nonconformld = 4;
    var ib = 1;
    var ie = 2;
    var jb = 1;
    var je = 3;
    var rowindexset = [1, 2];
    var badrowindexset = [1, 3];
    var columnindexset = [1, 2, 3];
    var badcolumnindexset = [1, 2, 4];
    var columnsummax = 33.0;
    var rowsummax = 30.0;
    var sumofdiagonals = 15;
    var sumofsquares = 650;
    TestMatrix.print$java_lang_String(
      "\nTesting constructors and constructor-like methods...\n"
    );
    try {
      A = new Matrix(columnwise, invalidld);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "Catch invalid length in packed constructor... ",
        "exception not thrown for invalid input"
      );
    } catch (e) {
      TestMatrix.try_success(
        "Catch invalid length in packed constructor... ",
        e.message
      );
    }
    try {
      A = new Matrix(rvals);
      tmp = A.get(raggedr, raggedc);
    } catch (__e) {
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.IllegalArgumentException") >= 0
      ) {
        var e = __e;
        TestMatrix.try_success(
          "Catch ragged input to default constructor... ",
          e.message
        );
      }
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.ArrayIndexOutOfBoundsException") >=
          0
      ) {
        var e = __e;
        errorCount = TestMatrix.try_failure(
          errorCount,
          "Catch ragged input to constructor... ",
          "exception not thrown in construction...ArrayIndexOutOfBoundsException thrown later"
        );
      }
    }
    try {
      A = Matrix.constructWithCopy(rvals);
      tmp = A.get(raggedr, raggedc);
    } catch (__e) {
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.IllegalArgumentException") >= 0
      ) {
        var e = __e;
        TestMatrix.try_success(
          "Catch ragged input to constructWithCopy... ",
          e.message
        );
      }
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.ArrayIndexOutOfBoundsException") >=
          0
      ) {
        var e = __e;
        errorCount = TestMatrix.try_failure(
          errorCount,
          "Catch ragged input to constructWithCopy... ",
          "exception not thrown in construction...ArrayIndexOutOfBoundsException thrown later"
        );
      }
    }
    A = new Matrix(columnwise, validld);
    B = new Matrix(avals);
    tmp = B.get(0, 0);
    avals[0][0] = 0.0;
    C = B.minus(A);
    avals[0][0] = tmp;
    B = Matrix.constructWithCopy(avals);
    tmp = B.get(0, 0);
    avals[0][0] = 0.0;
    if (tmp - B.get(0, 0) !== 0.0) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "constructWithCopy... ",
        "copy not effected... data visible outside"
      );
    } else {
      TestMatrix.try_success("constructWithCopy... ", "");
    }
    avals[0][0] = columnwise[0];
    I = new Matrix(ivals);
    try {
      TestMatrix.check$Matrix$Matrix(I, Matrix.identity(3, 4));
      TestMatrix.try_success("identity... ", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "identity... ",
        "identity Matrix not successfully created"
      );
    }
    TestMatrix.print$java_lang_String("\nTesting access methods...\n");
    B = new Matrix(avals);
    if (B.getRowDimension() !== rows) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "getRowDimension... ",
        ""
      );
    } else {
      TestMatrix.try_success("getRowDimension... ", "");
    }
    if (B.getColumnDimension() !== cols) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "getColumnDimension... ",
        ""
      );
    } else {
      TestMatrix.try_success("getColumnDimension... ", "");
    }
    B = new Matrix(avals);
    var barray = B.getArray();
    if (barray !== avals) {
      errorCount = TestMatrix.try_failure(errorCount, "getArray... ", "");
    } else {
      TestMatrix.try_success("getArray... ", "");
    }
    barray = B.getArrayCopy();
    if (barray === avals) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "getArrayCopy... ",
        "data not (deep) copied"
      );
    }
    try {
      TestMatrix.check$double_A_A$double_A_A(barray, avals);
      TestMatrix.try_success("getArrayCopy... ", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "getArrayCopy... ",
        "data not successfully (deep) copied"
      );
    }
    var bpacked = B.getColumnPackedCopy();
    try {
      TestMatrix.check$double_A$double_A(bpacked, columnwise);
      TestMatrix.try_success("getColumnPackedCopy... ", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "getColumnPackedCopy... ",
        "data not successfully (deep) copied by columns"
      );
    }
    bpacked = B.getRowPackedCopy();
    try {
      TestMatrix.check$double_A$double_A(bpacked, rowwise);
      TestMatrix.try_success("getRowPackedCopy... ", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "getRowPackedCopy... ",
        "data not successfully (deep) copied by rows"
      );
    }
    try {
      tmp = B.get(B.getRowDimension(), B.getColumnDimension() - 1);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "get(int,int)... ",
        "OutOfBoundsException expected but not thrown"
      );
    } catch (__e) {
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.ArrayIndexOutOfBoundsException") >=
          0
      ) {
        var e = __e;
        try {
          tmp = B.get(B.getRowDimension() - 1, B.getColumnDimension());
          errorCount = TestMatrix.try_failure(
            errorCount,
            "get(int,int)... ",
            "OutOfBoundsException expected but not thrown"
          );
        } catch (e1) {
          TestMatrix.try_success(
            "get(int,int)... OutofBoundsException... ",
            ""
          );
        }
      }
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.IllegalArgumentException") >= 0
      ) {
        var e1 = __e;
        errorCount = TestMatrix.try_failure(
          errorCount,
          "get(int,int)... ",
          "OutOfBoundsException expected but not thrown"
        );
      }
    }
    try {
      if (
        B.get(B.getRowDimension() - 1, B.getColumnDimension() - 1) !==
        avals[B.getRowDimension() - 1][B.getColumnDimension() - 1]
      ) {
        errorCount = TestMatrix.try_failure(
          errorCount,
          "get(int,int)... ",
          "Matrix entry (i,j) not successfully retreived"
        );
      } else {
        TestMatrix.try_success("get(int,int)... ", "");
      }
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "get(int,int)... ",
        "Unexpected ArrayIndexOutOfBoundsException"
      );
    }
    SUB = new Matrix(subavals);
    try {
      M = B.getMatrix$int$int$int$int(ib, ie + B.getRowDimension() + 1, jb, je);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "getMatrix(int,int,int,int)... ",
        "ArrayIndexOutOfBoundsException expected but not thrown"
      );
    } catch (__e) {
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.ArrayIndexOutOfBoundsException") >=
          0
      ) {
        var e = __e;
        try {
          M = B.getMatrix$int$int$int$int(
            ib,
            ie,
            jb,
            je + B.getColumnDimension() + 1
          );
          errorCount = TestMatrix.try_failure(
            errorCount,
            "getMatrix(int,int,int,int)... ",
            "ArrayIndexOutOfBoundsException expected but not thrown"
          );
        } catch (e1) {
          TestMatrix.try_success(
            "getMatrix(int,int,int,int)... ArrayIndexOutOfBoundsException... ",
            ""
          );
        }
      }
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.IllegalArgumentException") >= 0
      ) {
        var e1 = __e;
        errorCount = TestMatrix.try_failure(
          errorCount,
          "getMatrix(int,int,int,int)... ",
          "ArrayIndexOutOfBoundsException expected but not thrown"
        );
      }
    }
    try {
      M = B.getMatrix$int$int$int$int(ib, ie, jb, je);
      try {
        TestMatrix.check$Matrix$Matrix(SUB, M);
        TestMatrix.try_success("getMatrix(int,int,int,int)... ", "");
      } catch (e) {
        errorCount = TestMatrix.try_failure(
          errorCount,
          "getMatrix(int,int,int,int)... ",
          "submatrix not successfully retreived"
        );
      }
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "getMatrix(int,int,int,int)... ",
        "Unexpected ArrayIndexOutOfBoundsException"
      );
    }
    try {
      M = B.getMatrix$int$int$int_A(ib, ie, badcolumnindexset);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "getMatrix(int,int,int[])... ",
        "ArrayIndexOutOfBoundsException expected but not thrown"
      );
    } catch (__e) {
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.ArrayIndexOutOfBoundsException") >=
          0
      ) {
        var e = __e;
        try {
          M = B.getMatrix$int$int$int_A(
            ib,
            ie + B.getRowDimension() + 1,
            columnindexset
          );
          errorCount = TestMatrix.try_failure(
            errorCount,
            "getMatrix(int,int,int[])... ",
            "ArrayIndexOutOfBoundsException expected but not thrown"
          );
        } catch (e1) {
          TestMatrix.try_success(
            "getMatrix(int,int,int[])... ArrayIndexOutOfBoundsException... ",
            ""
          );
        }
      }
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.IllegalArgumentException") >= 0
      ) {
        var e1 = __e;
        errorCount = TestMatrix.try_failure(
          errorCount,
          "getMatrix(int,int,int[])... ",
          "ArrayIndexOutOfBoundsException expected but not thrown"
        );
      }
    }
    try {
      M = B.getMatrix$int$int$int_A(ib, ie, columnindexset);
      try {
        TestMatrix.check$Matrix$Matrix(SUB, M);
        TestMatrix.try_success("getMatrix(int,int,int[])... ", "");
      } catch (e) {
        errorCount = TestMatrix.try_failure(
          errorCount,
          "getMatrix(int,int,int[])... ",
          "submatrix not successfully retreived"
        );
      }
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "getMatrix(int,int,int[])... ",
        "Unexpected ArrayIndexOutOfBoundsException"
      );
    }
    try {
      M = B.getMatrix$int_A$int$int(badrowindexset, jb, je);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "getMatrix(int[],int,int)... ",
        "ArrayIndexOutOfBoundsException expected but not thrown"
      );
    } catch (__e) {
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.ArrayIndexOutOfBoundsException") >=
          0
      ) {
        var e = __e;
        try {
          M = B.getMatrix$int_A$int$int(
            rowindexset,
            jb,
            je + B.getColumnDimension() + 1
          );
          errorCount = TestMatrix.try_failure(
            errorCount,
            "getMatrix(int[],int,int)... ",
            "ArrayIndexOutOfBoundsException expected but not thrown"
          );
        } catch (e1) {
          TestMatrix.try_success(
            "getMatrix(int[],int,int)... ArrayIndexOutOfBoundsException... ",
            ""
          );
        }
      }
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.IllegalArgumentException") >= 0
      ) {
        var e1 = __e;
        errorCount = TestMatrix.try_failure(
          errorCount,
          "getMatrix(int[],int,int)... ",
          "ArrayIndexOutOfBoundsException expected but not thrown"
        );
      }
    }
    try {
      M = B.getMatrix$int_A$int$int(rowindexset, jb, je);
      try {
        TestMatrix.check$Matrix$Matrix(SUB, M);
        TestMatrix.try_success("getMatrix(int[],int,int)... ", "");
      } catch (e) {
        errorCount = TestMatrix.try_failure(
          errorCount,
          "getMatrix(int[],int,int)... ",
          "submatrix not successfully retreived"
        );
      }
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "getMatrix(int[],int,int)... ",
        "Unexpected ArrayIndexOutOfBoundsException"
      );
    }
    try {
      M = B.getMatrix$int_A$int_A(badrowindexset, columnindexset);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "getMatrix(int[],int[])... ",
        "ArrayIndexOutOfBoundsException expected but not thrown"
      );
    } catch (__e) {
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.ArrayIndexOutOfBoundsException") >=
          0
      ) {
        var e = __e;
        try {
          M = B.getMatrix$int_A$int_A(rowindexset, badcolumnindexset);
          errorCount = TestMatrix.try_failure(
            errorCount,
            "getMatrix(int[],int[])... ",
            "ArrayIndexOutOfBoundsException expected but not thrown"
          );
        } catch (e1) {
          TestMatrix.try_success(
            "getMatrix(int[],int[])... ArrayIndexOutOfBoundsException... ",
            ""
          );
        }
      }
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.IllegalArgumentException") >= 0
      ) {
        var e1 = __e;
        errorCount = TestMatrix.try_failure(
          errorCount,
          "getMatrix(int[],int[])... ",
          "ArrayIndexOutOfBoundsException expected but not thrown"
        );
      }
    }
    try {
      M = B.getMatrix$int_A$int_A(rowindexset, columnindexset);
      try {
        TestMatrix.check$Matrix$Matrix(SUB, M);
        TestMatrix.try_success("getMatrix(int[],int[])... ", "");
      } catch (e) {
        errorCount = TestMatrix.try_failure(
          errorCount,
          "getMatrix(int[],int[])... ",
          "submatrix not successfully retreived"
        );
      }
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "getMatrix(int[],int[])... ",
        "Unexpected ArrayIndexOutOfBoundsException"
      );
    }
    try {
      B.set(B.getRowDimension(), B.getColumnDimension() - 1, 0.0);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "set(int,int,double)... ",
        "OutOfBoundsException expected but not thrown"
      );
    } catch (__e) {
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.ArrayIndexOutOfBoundsException") >=
          0
      ) {
        var e = __e;
        try {
          B.set(B.getRowDimension() - 1, B.getColumnDimension(), 0.0);
          errorCount = TestMatrix.try_failure(
            errorCount,
            "set(int,int,double)... ",
            "OutOfBoundsException expected but not thrown"
          );
        } catch (e1) {
          TestMatrix.try_success(
            "set(int,int,double)... OutofBoundsException... ",
            ""
          );
        }
      }
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.IllegalArgumentException") >= 0
      ) {
        var e1 = __e;
        errorCount = TestMatrix.try_failure(
          errorCount,
          "set(int,int,double)... ",
          "OutOfBoundsException expected but not thrown"
        );
      }
    }
    try {
      B.set(ib, jb, 0.0);
      tmp = B.get(ib, jb);
      try {
        TestMatrix.check$double$double(tmp, 0.0);
        TestMatrix.try_success("set(int,int,double)... ", "");
      } catch (e) {
        errorCount = TestMatrix.try_failure(
          errorCount,
          "set(int,int,double)... ",
          "Matrix element not successfully set"
        );
      }
    } catch (e1) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "set(int,int,double)... ",
        "Unexpected ArrayIndexOutOfBoundsException"
      );
    }
    M = new Matrix(2, 3, 0.0);
    try {
      B.setMatrix$int$int$int$int$Matrix(
        ib,
        ie + B.getRowDimension() + 1,
        jb,
        je,
        M
      );
      errorCount = TestMatrix.try_failure(
        errorCount,
        "setMatrix(int,int,int,int,Matrix)... ",
        "ArrayIndexOutOfBoundsException expected but not thrown"
      );
    } catch (__e) {
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.ArrayIndexOutOfBoundsException") >=
          0
      ) {
        var e = __e;
        try {
          B.setMatrix$int$int$int$int$Matrix(
            ib,
            ie,
            jb,
            je + B.getColumnDimension() + 1,
            M
          );
          errorCount = TestMatrix.try_failure(
            errorCount,
            "setMatrix(int,int,int,int,Matrix)... ",
            "ArrayIndexOutOfBoundsException expected but not thrown"
          );
        } catch (e1) {
          TestMatrix.try_success(
            "setMatrix(int,int,int,int,Matrix)... ArrayIndexOutOfBoundsException... ",
            ""
          );
        }
      }
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.IllegalArgumentException") >= 0
      ) {
        var e1 = __e;
        errorCount = TestMatrix.try_failure(
          errorCount,
          "setMatrix(int,int,int,int,Matrix)... ",
          "ArrayIndexOutOfBoundsException expected but not thrown"
        );
      }
    }
    try {
      B.setMatrix$int$int$int$int$Matrix(ib, ie, jb, je, M);
      try {
        TestMatrix.check$Matrix$Matrix(
          M.minus(B.getMatrix$int$int$int$int(ib, ie, jb, je)),
          M
        );
        TestMatrix.try_success("setMatrix(int,int,int,int,Matrix)... ", "");
      } catch (e) {
        errorCount = TestMatrix.try_failure(
          errorCount,
          "setMatrix(int,int,int,int,Matrix)... ",
          "submatrix not successfully set"
        );
      }
      B.setMatrix$int$int$int$int$Matrix(ib, ie, jb, je, SUB);
    } catch (e1) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "setMatrix(int,int,int,int,Matrix)... ",
        "Unexpected ArrayIndexOutOfBoundsException"
      );
    }
    try {
      B.setMatrix$int$int$int_A$Matrix(
        ib,
        ie + B.getRowDimension() + 1,
        columnindexset,
        M
      );
      errorCount = TestMatrix.try_failure(
        errorCount,
        "setMatrix(int,int,int[],Matrix)... ",
        "ArrayIndexOutOfBoundsException expected but not thrown"
      );
    } catch (__e) {
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.ArrayIndexOutOfBoundsException") >=
          0
      ) {
        var e = __e;
        try {
          B.setMatrix$int$int$int_A$Matrix(ib, ie, badcolumnindexset, M);
          errorCount = TestMatrix.try_failure(
            errorCount,
            "setMatrix(int,int,int[],Matrix)... ",
            "ArrayIndexOutOfBoundsException expected but not thrown"
          );
        } catch (e1) {
          TestMatrix.try_success(
            "setMatrix(int,int,int[],Matrix)... ArrayIndexOutOfBoundsException... ",
            ""
          );
        }
      }
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.IllegalArgumentException") >= 0
      ) {
        var e1 = __e;
        errorCount = TestMatrix.try_failure(
          errorCount,
          "setMatrix(int,int,int[],Matrix)... ",
          "ArrayIndexOutOfBoundsException expected but not thrown"
        );
      }
    }
    try {
      B.setMatrix$int$int$int_A$Matrix(ib, ie, columnindexset, M);
      try {
        TestMatrix.check$Matrix$Matrix(
          M.minus(B.getMatrix$int$int$int_A(ib, ie, columnindexset)),
          M
        );
        TestMatrix.try_success("setMatrix(int,int,int[],Matrix)... ", "");
      } catch (e) {
        errorCount = TestMatrix.try_failure(
          errorCount,
          "setMatrix(int,int,int[],Matrix)... ",
          "submatrix not successfully set"
        );
      }
      B.setMatrix$int$int$int$int$Matrix(ib, ie, jb, je, SUB);
    } catch (e1) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "setMatrix(int,int,int[],Matrix)... ",
        "Unexpected ArrayIndexOutOfBoundsException"
      );
    }
    try {
      B.setMatrix$int_A$int$int$Matrix(
        rowindexset,
        jb,
        je + B.getColumnDimension() + 1,
        M
      );
      errorCount = TestMatrix.try_failure(
        errorCount,
        "setMatrix(int[],int,int,Matrix)... ",
        "ArrayIndexOutOfBoundsException expected but not thrown"
      );
    } catch (__e) {
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.ArrayIndexOutOfBoundsException") >=
          0
      ) {
        var e = __e;
        try {
          B.setMatrix$int_A$int$int$Matrix(badrowindexset, jb, je, M);
          errorCount = TestMatrix.try_failure(
            errorCount,
            "setMatrix(int[],int,int,Matrix)... ",
            "ArrayIndexOutOfBoundsException expected but not thrown"
          );
        } catch (e1) {
          TestMatrix.try_success(
            "setMatrix(int[],int,int,Matrix)... ArrayIndexOutOfBoundsException... ",
            ""
          );
        }
      }
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.IllegalArgumentException") >= 0
      ) {
        var e1 = __e;
        errorCount = TestMatrix.try_failure(
          errorCount,
          "setMatrix(int[],int,int,Matrix)... ",
          "ArrayIndexOutOfBoundsException expected but not thrown"
        );
      }
    }
    try {
      B.setMatrix$int_A$int$int$Matrix(rowindexset, jb, je, M);
      try {
        TestMatrix.check$Matrix$Matrix(
          M.minus(B.getMatrix$int_A$int$int(rowindexset, jb, je)),
          M
        );
        TestMatrix.try_success("setMatrix(int[],int,int,Matrix)... ", "");
      } catch (e) {
        errorCount = TestMatrix.try_failure(
          errorCount,
          "setMatrix(int[],int,int,Matrix)... ",
          "submatrix not successfully set"
        );
      }
      B.setMatrix$int$int$int$int$Matrix(ib, ie, jb, je, SUB);
    } catch (e1) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "setMatrix(int[],int,int,Matrix)... ",
        "Unexpected ArrayIndexOutOfBoundsException"
      );
    }
    try {
      B.setMatrix$int_A$int_A$Matrix(rowindexset, badcolumnindexset, M);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "setMatrix(int[],int[],Matrix)... ",
        "ArrayIndexOutOfBoundsException expected but not thrown"
      );
    } catch (__e) {
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.ArrayIndexOutOfBoundsException") >=
          0
      ) {
        var e = __e;
        try {
          B.setMatrix$int_A$int_A$Matrix(badrowindexset, columnindexset, M);
          errorCount = TestMatrix.try_failure(
            errorCount,
            "setMatrix(int[],int[],Matrix)... ",
            "ArrayIndexOutOfBoundsException expected but not thrown"
          );
        } catch (e1) {
          TestMatrix.try_success(
            "setMatrix(int[],int[],Matrix)... ArrayIndexOutOfBoundsException... ",
            ""
          );
        }
      }
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.IllegalArgumentException") >= 0
      ) {
        var e1 = __e;
        errorCount = TestMatrix.try_failure(
          errorCount,
          "setMatrix(int[],int[],Matrix)... ",
          "ArrayIndexOutOfBoundsException expected but not thrown"
        );
      }
    }
    try {
      B.setMatrix$int_A$int_A$Matrix(rowindexset, columnindexset, M);
      try {
        TestMatrix.check$Matrix$Matrix(
          M.minus(B.getMatrix$int_A$int_A(rowindexset, columnindexset)),
          M
        );
        TestMatrix.try_success("setMatrix(int[],int[],Matrix)... ", "");
      } catch (e) {
        errorCount = TestMatrix.try_failure(
          errorCount,
          "setMatrix(int[],int[],Matrix)... ",
          "submatrix not successfully set"
        );
      }
    } catch (e1) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "setMatrix(int[],int[],Matrix)... ",
        "Unexpected ArrayIndexOutOfBoundsException"
      );
    }
    TestMatrix.print$java_lang_String("\nTesting array-like methods...\n");
    S = new Matrix(columnwise, nonconformld);
    R = Matrix.random(A.getRowDimension(), A.getColumnDimension());
    A = R;
    try {
      S = A.minus(S);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "minus conformance check... ",
        "nonconformance not raised"
      );
    } catch (e) {
      TestMatrix.try_success("minus conformance check... ", "");
    }
    if (A.minus(R).norm1() !== 0.0) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "minus... ",
        "(difference of identical Matrices is nonzero,\nSubsequent use of minus should be suspect)"
      );
    } else {
      TestMatrix.try_success("minus... ", "");
    }
    A = R.copy();
    A.minusEquals(R);
    Z = new Matrix(A.getRowDimension(), A.getColumnDimension());
    try {
      A.minusEquals(S);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "minusEquals conformance check... ",
        "nonconformance not raised"
      );
    } catch (e) {
      TestMatrix.try_success("minusEquals conformance check... ", "");
    }
    if (A.minus(Z).norm1() !== 0.0) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "minusEquals... ",
        "(difference of identical Matrices is nonzero,\nSubsequent use of minus should be suspect)"
      );
    } else {
      TestMatrix.try_success("minusEquals... ", "");
    }
    A = R.copy();
    B = Matrix.random(A.getRowDimension(), A.getColumnDimension());
    C = A.minus(B);
    try {
      S = A.plus(S);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "plus conformance check... ",
        "nonconformance not raised"
      );
    } catch (e) {
      TestMatrix.try_success("plus conformance check... ", "");
    }
    try {
      TestMatrix.check$Matrix$Matrix(C.plus(B), A);
      TestMatrix.try_success("plus... ", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "plus... ",
        "(C = A - B, but C + B != A)"
      );
    }
    C = A.minus(B);
    C.plusEquals(B);
    try {
      A.plusEquals(S);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "plusEquals conformance check... ",
        "nonconformance not raised"
      );
    } catch (e) {
      TestMatrix.try_success("plusEquals conformance check... ", "");
    }
    try {
      TestMatrix.check$Matrix$Matrix(C, A);
      TestMatrix.try_success("plusEquals... ", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "plusEquals... ",
        "(C = A - B, but C = C + B != A)"
      );
    }
    A = R.uminus();
    try {
      TestMatrix.check$Matrix$Matrix(A.plus(R), Z);
      TestMatrix.try_success("uminus... ", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "uminus... ",
        "(-A + A != zeros)"
      );
    }
    A = R.copy();
    O = new Matrix(A.getRowDimension(), A.getColumnDimension(), 1.0);
    C = A.arrayLeftDivide(R);
    try {
      S = A.arrayLeftDivide(S);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "arrayLeftDivide conformance check... ",
        "nonconformance not raised"
      );
    } catch (e) {
      TestMatrix.try_success("arrayLeftDivide conformance check... ", "");
    }
    try {
      TestMatrix.check$Matrix$Matrix(C, O);
      TestMatrix.try_success("arrayLeftDivide... ", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "arrayLeftDivide... ",
        "(M.\\M != ones)"
      );
    }
    try {
      A.arrayLeftDivideEquals(S);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "arrayLeftDivideEquals conformance check... ",
        "nonconformance not raised"
      );
    } catch (e) {
      TestMatrix.try_success("arrayLeftDivideEquals conformance check... ", "");
    }
    A.arrayLeftDivideEquals(R);
    try {
      TestMatrix.check$Matrix$Matrix(A, O);
      TestMatrix.try_success("arrayLeftDivideEquals... ", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "arrayLeftDivideEquals... ",
        "(M.\\M != ones)"
      );
    }
    A = R.copy();
    try {
      A.arrayRightDivide(S);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "arrayRightDivide conformance check... ",
        "nonconformance not raised"
      );
    } catch (e) {
      TestMatrix.try_success("arrayRightDivide conformance check... ", "");
    }
    C = A.arrayRightDivide(R);
    try {
      TestMatrix.check$Matrix$Matrix(C, O);
      TestMatrix.try_success("arrayRightDivide... ", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "arrayRightDivide... ",
        "(M./M != ones)"
      );
    }
    try {
      A.arrayRightDivideEquals(S);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "arrayRightDivideEquals conformance check... ",
        "nonconformance not raised"
      );
    } catch (e) {
      TestMatrix.try_success(
        "arrayRightDivideEquals conformance check... ",
        ""
      );
    }
    A.arrayRightDivideEquals(R);
    try {
      TestMatrix.check$Matrix$Matrix(A, O);
      TestMatrix.try_success("arrayRightDivideEquals... ", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "arrayRightDivideEquals... ",
        "(M./M != ones)"
      );
    }
    A = R.copy();
    B = Matrix.random(A.getRowDimension(), A.getColumnDimension());
    try {
      S = A.arrayTimes(S);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "arrayTimes conformance check... ",
        "nonconformance not raised"
      );
    } catch (e) {
      TestMatrix.try_success("arrayTimes conformance check... ", "");
    }
    C = A.arrayTimes(B);
    try {
      TestMatrix.check$Matrix$Matrix(C.arrayRightDivideEquals(B), A);
      TestMatrix.try_success("arrayTimes... ", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "arrayTimes... ",
        "(A = R, C = A.*B, but C./B != A)"
      );
    }
    try {
      A.arrayTimesEquals(S);
      errorCount = TestMatrix.try_failure(
        errorCount,
        "arrayTimesEquals conformance check... ",
        "nonconformance not raised"
      );
    } catch (e) {
      TestMatrix.try_success("arrayTimesEquals conformance check... ", "");
    }
    A.arrayTimesEquals(B);
    try {
      TestMatrix.check$Matrix$Matrix(A.arrayRightDivideEquals(B), R);
      TestMatrix.try_success("arrayTimesEquals... ", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "arrayTimesEquals... ",
        "(A = R, A = A.*B, but A./B != R)"
      );
    }
    TestMatrix.print$java_lang_String("\nTesting I/O methods...\n");
    TestMatrix.print$java_lang_String("\nTesting linear algebra methods...\n");
    A = new Matrix(columnwise, 3);
    T = new Matrix(tvals);
    T = A.transpose();
    try {
      TestMatrix.check$Matrix$Matrix(A.transpose(), T);
      TestMatrix.try_success("transpose...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "transpose()...",
        "transpose unsuccessful"
      );
    }
    A.transpose();
    try {
      TestMatrix.check$double$double(A.norm1(), columnsummax);
      TestMatrix.try_success("norm1...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "norm1()...",
        "incorrect norm calculation"
      );
    }
    try {
      TestMatrix.check$double$double(A.normInf(), rowsummax);
      TestMatrix.try_success("normInf()...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "normInf()...",
        "incorrect norm calculation"
      );
    }
    try {
      TestMatrix.check$double$double(A.normF(), Math.sqrt(sumofsquares));
      TestMatrix.try_success("normF...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "normF()...",
        "incorrect norm calculation"
      );
    }
    try {
      TestMatrix.check$double$double(A.trace(), sumofdiagonals);
      TestMatrix.try_success("trace()...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "trace()...",
        "incorrect trace calculation"
      );
    }
    try {
      TestMatrix.check$double$double(
        A.getMatrix$int$int$int$int(
          0,
          A.getRowDimension() - 1,
          0,
          A.getRowDimension() - 1
        ).det(),
        0.0
      );
      TestMatrix.try_success("det()...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "det()...",
        "incorrect determinant calculation"
      );
    }
    SQ = new Matrix(square);
    try {
      TestMatrix.check$Matrix$Matrix(A.times$Matrix(A.transpose()), SQ);
      TestMatrix.try_success("times(Matrix)...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "times(Matrix)...",
        "incorrect Matrix-Matrix product calculation"
      );
    }
    try {
      TestMatrix.check$Matrix$Matrix(A.times$double(0.0), Z);
      TestMatrix.try_success("times(double)...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "times(double)...",
        "incorrect Matrix-scalar product calculation"
      );
    }
    A = new Matrix(columnwise, 4);
    var QR = A.qr();
    R = QR.getR();
    try {
      TestMatrix.check$Matrix$Matrix(A, QR.getQ().times$Matrix(R));
      TestMatrix.try_success("QRDecomposition...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "QRDecomposition...",
        "incorrect QR decomposition calculation"
      );
    }
    var SVD = A.svd();
    try {
      TestMatrix.check$Matrix$Matrix(
        A,
        SVD.getU().times$Matrix(SVD.getS().times$Matrix(SVD.getV().transpose()))
      );
      TestMatrix.try_success("SingularValueDecomposition...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "SingularValueDecomposition...",
        "incorrect singular value decomposition calculation"
      );
    }
    DEF = new Matrix(rankdef);
    try {
      TestMatrix.check$double$double(
        DEF.rank(),
        Math.min(DEF.getRowDimension(), DEF.getColumnDimension()) - 1
      );
      TestMatrix.try_success("rank()...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "rank()...",
        "incorrect rank calculation"
      );
    }
    B = new Matrix(condmat);
    SVD = B.svd();
    var singularvalues = SVD.getSingularValues();
    try {
      TestMatrix.check$double$double(
        B.cond(),
        singularvalues[0] /
          singularvalues[
            Math.min(B.getRowDimension(), B.getColumnDimension()) - 1
          ]
      );
      TestMatrix.try_success("cond()...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "cond()...",
        "incorrect condition number calculation"
      );
    }
    var n = A.getColumnDimension();
    A = A.getMatrix$int$int$int$int(0, n - 1, 0, n - 1);
    A.set(0, 0, 0.0);
    var LU = A.lu();
    try {
      TestMatrix.check$Matrix$Matrix(
        A.getMatrix$int_A$int$int(LU.getPivot(), 0, n - 1),
        LU.getL().times$Matrix(LU.getU())
      );
      TestMatrix.try_success("LUDecomposition...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "LUDecomposition...",
        "incorrect LU decomposition calculation"
      );
    }
    X = A.inverse();
    try {
      TestMatrix.check$Matrix$Matrix(A.times$Matrix(X), Matrix.identity(3, 3));
      TestMatrix.try_success("inverse()...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "inverse()...",
        "incorrect inverse calculation"
      );
    }
    O = new Matrix(SUB.getRowDimension(), 1, 1.0);
    SOL = new Matrix(sqSolution);
    SQ = SUB.getMatrix$int$int$int$int(
      0,
      SUB.getRowDimension() - 1,
      0,
      SUB.getRowDimension() - 1
    );
    try {
      TestMatrix.check$Matrix$Matrix(SQ.solve(SOL), O);
      TestMatrix.try_success("solve()...", "");
    } catch (__e) {
      if (
        __e != null &&
        __e["__classes"] &&
        __e["__classes"].indexOf("java.lang.IllegalArgumentException") >= 0
      ) {
        var e1 = __e;
        errorCount = TestMatrix.try_failure(
          errorCount,
          "solve()...",
          e1.message
        );
      }
      if (
        (__e != null &&
          __e["__classes"] &&
          __e["__classes"].indexOf("java.lang.RuntimeException") >= 0) ||
        (__e != null && __e instanceof Error)
      ) {
        var e = __e;
        errorCount = TestMatrix.try_failure(
          errorCount,
          "solve()...",
          e.message
        );
      }
    }
    A = new Matrix(pvals);
    var Chol = A.chol();
    var L = Chol.getL();
    try {
      TestMatrix.check$Matrix$Matrix(A, L.times$Matrix(L.transpose()));
      TestMatrix.try_success("CholeskyDecomposition...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "CholeskyDecomposition...",
        "incorrect Cholesky decomposition calculation"
      );
    }
    X = Chol.solve(Matrix.identity(3, 3));
    try {
      TestMatrix.check$Matrix$Matrix(A.times$Matrix(X), Matrix.identity(3, 3));
      TestMatrix.try_success("CholeskyDecomposition solve()...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "CholeskyDecomposition solve()...",
        "incorrect Choleskydecomposition solve calculation"
      );
    }
    var Eig = A.eig();
    var D = Eig.getD();
    var V = Eig.getV();
    try {
      TestMatrix.check$Matrix$Matrix(A.times$Matrix(V), V.times$Matrix(D));
      TestMatrix.try_success("EigenvalueDecomposition (symmetric)...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "EigenvalueDecomposition (symmetric)...",
        "incorrect symmetric Eigenvalue decomposition calculation"
      );
    }
    A = new Matrix(evals);
    Eig = A.eig();
    D = Eig.getD();
    V = Eig.getV();
    try {
      TestMatrix.check$Matrix$Matrix(A.times$Matrix(V), V.times$Matrix(D));
      TestMatrix.try_success("EigenvalueDecomposition (nonsymmetric)...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "EigenvalueDecomposition (nonsymmetric)...",
        "incorrect nonsymmetric Eigenvalue decomposition calculation"
      );
    }
    try {
      TestMatrix.print$java_lang_String(
        "\nTesting Eigenvalue; If this hangs, we've failed\n"
      );
      var bA = new Matrix(badeigs);
      var bEig = bA.eig();
      TestMatrix.try_success("EigenvalueDecomposition (hang)...", "");
    } catch (e) {
      errorCount = TestMatrix.try_failure(
        errorCount,
        "EigenvalueDecomposition (hang)...",
        "incorrect termination"
      );
    }
    TestMatrix.print$java_lang_String("\nTestMatrix completed.\n");
    TestMatrix.print$java_lang_String(
      "Total errors reported: " + /* toString */ ("" + errorCount) + "\n"
    );
    TestMatrix.print$java_lang_String(
      "Total warnings reported: " + /* toString */ ("" + warningCount) + "\n"
    );
  };
  /*private*/
  TestMatrix.check$double$double = function (x, y) {
    var eps = Math.pow(2.0, -52.0);
    if (
      (function (lhs, rhs) {
        return lhs && rhs;
      })(x === 0, Math.abs(y) < 10 * eps)
    )
      return;
    if (
      (function (lhs, rhs) {
        return lhs && rhs;
      })(y === 0, Math.abs(x) < 10 * eps)
    )
      return;
    if (Math.abs(x - y) > 10 * eps * Math.max(Math.abs(x), Math.abs(y))) {
      throw Object.defineProperty(
        new Error(
          "The difference x-y is too large: x = " +
            /* toString */ ("" + x) +
            "  y = " +
            /* toString */ ("" + y)
        ),
        "__classes",
        {
          configurable: true,
          value: [
            "java.lang.Throwable",
            "java.lang.Object",
            "java.lang.RuntimeException",
            "java.lang.Exception"
          ]
        }
      );
    }
  };
  TestMatrix.check$double_A$double_A = function (x, y) {
    if (x.length === y.length) {
      for (var i = 0; i < x.length; i++) {
        {
          TestMatrix.check$double$double(x[i], y[i]);
        }
      }
    } else {
      throw Object.defineProperty(
        new Error("Attempt to compare vectors of different lengths"),
        "__classes",
        {
          configurable: true,
          value: [
            "java.lang.Throwable",
            "java.lang.Object",
            "java.lang.RuntimeException",
            "java.lang.Exception"
          ]
        }
      );
    }
  };
  /**
   * Check norm of difference of "vectors".
   * @param {double[]} x
   * @param {double[]} y
   * @private
   */
  TestMatrix.check = function (x, y) {
    if (
      ((x != null &&
        x instanceof Array &&
        (x.length == 0 || x[0] == null || typeof x[0] === "number")) ||
        x === null) &&
      ((y != null &&
        y instanceof Array &&
        (y.length == 0 || y[0] == null || typeof y[0] === "number")) ||
        y === null)
    ) {
      return TestMatrix.check$double_A$double_A(x, y);
    } else if (
      ((x != null &&
        x instanceof Array &&
        (x.length == 0 || x[0] == null || x[0] instanceof Array)) ||
        x === null) &&
      ((y != null &&
        y instanceof Array &&
        (y.length == 0 || y[0] == null || y[0] instanceof Array)) ||
        y === null)
    ) {
      return TestMatrix.check$double_A_A$double_A_A(x, y);
    } else if (
      ((x != null && x instanceof Matrix) || x === null) &&
      ((y != null && y instanceof Matrix) || y === null)
    ) {
      return TestMatrix.check$Matrix$Matrix(x, y);
    } else if (
      (typeof x === "number" || x === null) &&
      (typeof y === "number" || y === null)
    ) {
      return TestMatrix.check$double$double(x, y);
    } else throw new Error("invalid overload");
  };
  /*private*/
  TestMatrix.check$double_A_A$double_A_A = function (x, y) {
    var A = new Matrix(x);
    var B = new Matrix(y);
    TestMatrix.check$Matrix$Matrix(A, B);
  };
  /*private*/
  TestMatrix.check$Matrix$Matrix = function (X, Y) {
    var eps = Math.pow(2.0, -52.0);
    if (
      (function (lhs, rhs) {
        return lhs && rhs;
      })(X.norm1() === 0.0, Y.norm1() < 10 * eps)
    )
      return;
    if (
      (function (lhs, rhs) {
        return lhs && rhs;
      })(Y.norm1() === 0.0, X.norm1() < 10 * eps)
    )
      return;
    if (X.minus(Y).norm1() > 1000 * eps * Math.max(X.norm1(), Y.norm1())) {
      throw Object.defineProperty(
        new Error(
          "The norm of (X-Y) is too large: " +
            /* toString */ ("" + X.minus(Y).norm1())
        ),
        "__classes",
        {
          configurable: true,
          value: [
            "java.lang.Throwable",
            "java.lang.Object",
            "java.lang.RuntimeException",
            "java.lang.Exception"
          ]
        }
      );
    }
  };
  /*private*/
  TestMatrix.print$java_lang_String = function (s) {
    console.info(s);
  };
  /**
   * Print appropriate messages for successful outcome try
   * @param {string} s
   * @param {string} e
   * @private
   */
  /*private*/
  TestMatrix.try_success = function (s, e) {
    TestMatrix.print$java_lang_String(">    " + s + "success\n");
    if (e !== "") {
      TestMatrix.print$java_lang_String(">      Message: " + e + "\n");
    }
  };
  /**
   * Print appropriate messages for unsuccessful outcome try
   * @param {number} count
   * @param {string} s
   * @param {string} e
   * @return {number}
   * @private
   */
  /*private*/
  TestMatrix.try_failure = function (count, s, e) {
    TestMatrix.print$java_lang_String(
      ">    " + s + "*** failure ***\n>      Message: " + e + "\n"
    );
    return ++count;
  };
  /**
   * Print appropriate messages for unsuccessful outcome try
   * @param {number} count
   * @param {string} s
   * @param {string} e
   * @return {number}
   * @private
   */
  /*private*/
  TestMatrix.try_warning = function (count, s, e) {
    TestMatrix.print$java_lang_String(
      ">    " + s + "*** warning ***\n>      Message: " + e + "\n"
    );
    return ++count;
  };
  TestMatrix.print$double_A$int$int = function (x, w, d) {
    console.info("\n");
    new Matrix(x, 1).print(w, d);
    TestMatrix.print$java_lang_String("\n");
  };
  /**
   * Print a row vector.
   * @param {double[]} x
   * @param {number} w
   * @param {number} d
   * @private
   */
  TestMatrix.print = function (x, w, d) {
    if (
      ((x != null &&
        x instanceof Array &&
        (x.length == 0 || x[0] == null || typeof x[0] === "number")) ||
        x === null) &&
      (typeof w === "number" || w === null) &&
      (typeof d === "number" || d === null)
    ) {
      return TestMatrix.print$double_A$int$int(x, w, d);
    } else if (
      (typeof x === "string" || x === null) &&
      w === undefined &&
      d === undefined
    ) {
      return TestMatrix.print$java_lang_String(x);
    } else throw new Error("invalid overload");
  };
  return TestMatrix;
})();
TestMatrix["__class"] = "TestMatrix";