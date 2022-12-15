# JAMA4JS
The JAMA Linear Algebra package translated for use with Javascript

This repository represents a conversion of the JAMA linear algebra library for use with Javascript due to a noticable lack of linear algebra availability.

### Translation Source
The initial commit of this library was created from the JAMA archive located at:
- https://math.nist.gov/javanumerics/jama/

The initial commit used ver 1.0.3 found at:
- https://math.nist.gov/javanumerics/jama/Jama-1.0.3.zip

### Original JAMA Release Info
Per the wording at the NIST site for JAMA:
> Copyright Notice
> This software is a cooperative product of The MathWorks and the National Institute of Standards and Technology (NIST) which has been released to the public domain. Neither The MathWorks nor NIST assumes any responsibility whatsoever for its use by other parties, and makes no guarantees, expressed or implied, about its quality, reliability, or any other characteristic.

The original release of JAMA (from 1998, in Java) was created by:
> - Joe Hicklin, Cleve Moler, Peter Webb ... from The MathWorks
> - Ronald F. Boisvert, Bruce Miller, Roldan Pozo, Karin Remington ... from NIST

The author of this conversion used the following tools to aid the conversion to Javascript:
- (JSweet) https://www.jsweet.org/jsweet-live-sandbox/
- (Babel) https://babeljs.io/repl
- (JSCompress) https://jscompress.com/

### Functionality
The Javascript release should be functionally similar to the original Java release of JAMA, except that due to Javascript limitations cannot read disk files.  All print and output have been redirected to the console log.  A test program, JAMA_Test.js is included in the test/ directory or with the JAMAwTest.js files that tests the operations for mathematical correctness, and has been shown to work in Javascript with zero errors. (See JAMA_Test.html)

### Code Structure
The initial commit contains three main parts.  All parts are availble as original translation, Babel prettify/shrink, and JSCompress minify forms.
- JAMA (main routines)
  - Found solitary in JAMA.js, JAMA_Babel.js, or JAMA.min.js
  - Found with functionality tests in JAMAwTest.js, JAMAwTest_Babel.js, or JAMAwTest.min.js
  - Found with tests and example in JAMAwTestAndExample.js, JAMAwTestAndExample_Babel.js, JAMAwTestAndExample.min.js
- Test routines to check functionality of the JAMA methods and classes.
  - Found solitary in test/JAMA_Test.js, JAMA_Test_Babel.js, JAMA_Test.min.js
- Example of matrix calculations using a magic square routine (uses Eigenvalue Decomposition, LU Decomposition, QR Decomposition, and Singular Value Decomposition for Condition and Rank.
  - Found solitary in example/JAMA_Example.js, JAMA_Example_Babel.js, JAMA_Example.min.js
  
An additional (extremely simple) webpage JAMA_Test.html has been included to demonstrate magic square example functionality and test completion.

### Summary of Capabilities (from NIST)
- Object Manipulation
  - constructors
  - set elements
  - get elements
  - copy
  - clone
- Elementary Operations
  - addition
  - subtraction
  - multiplication
  - scalar multiplication
  - element-wise multiplication
  - element-wise division
  - unary minus
  - transpose
  - norm
- Decompositions
  - Cholesky
  - LU
  - QR
  - SVD
  - symmetric eigenvalue
  - nonsymmetric eigenvalue
- Equation Solution
  - nonsingular systems
  - least squares
- Derived Quantities
  - condition number
  - determinant
  - rank
  - inverse
  - pseudoinverse
