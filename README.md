# JAMA4JS
The JAMA Linear Algebra package translated for use with Javascript

- This repository represents a conversion of the JAMA linear algebra library for use with Javascript.
- The leastSquares folder contains a number of optional utility functions for performing Least Squares regression over various dimensional datasets.

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
  
## Edit 12/21/2022

- Got rid of _Babel subfiles due to complexity and lack of necessity or obvious benefit over simply hosting _Babel translations as main files.
- Got rid of JAMAwTest and JAMAwTestAndExample catgories, as interested users can simply load:
  - JAMA.js
  - test/JAMA_Test.js
  - example/JAMA_Example.js
- Added leastsquares/JAMA_LeastSquares.js with accompanying minified version
  - Provides condensed Least Squares calculation functions for a range of common tasks
    - Line, Parabola, Polynomial, Logarithm, Sin/Cos/SinCos(linear freq steps), Sin/Cos/SinCos(exponential freq steps), Ellipticals (Conic sections), Power Law (taken in log-log space) and Exponential (taken in log-log space)
  - Initialize with: var ls = new LeastSquares( x, y )
  - Run a calculation with: ls.line(), ls.parab(), ls.poly( 5 ), ls.sinCosLinFreq( 3 ), ls.ellipseGen(), ls.ellipseGen( ep, 0 ), or others.
  - ls.powLin(), and ls.expLin() use linear least squares by taking the ln of both sides, performing least squares, and then converting back.
    - This can tend to accentuate small noise values.
- Updated the test webpage to include Test, Example, and Least Squares, as well as a visual graph example. (needs Google Charts loader.js)

### Example of Ellipse Least Squares Fitting
![EllipseFit](https://i.imgur.com/4fczGnjm.png)
- Included as example in the JAMA_Test.html
- Shows curve fitting for six different ellipse fits based on preference of choice for independent variable
- F, or constant, as the independent is by far the most stable fit
- In the example, points can be dragged to visualize how the curve fit changes
### Example of SinCos Least Squares Fitting
![SinCosFit](https://i.imgur.com/NiApkDLm.png)
- Included as example in the JAMA_Test.html
- Shows curve fitting for A*sin(f*x) + B*cos(f*x) functions
  - Linear and exponential frequency increase with terms
- In the example, points can be dragged to visualize how the curve fit changes
## Edit 12/24/2022
- Added the ability for 3D LeastSquares curve fits with z data variable
- Added several new fit types to the possible LeastSquares curve fits (mostly 3D)
  - line3D(), plane3D(), poly3D( degreeX, degreeY, polyParam )
- Made the 2D curve fitting examples all interactive so you can watch how the curve fits change
### Example of 3D Line and Plane Least Squares Fitting
![LinePlane3D](https://i.imgur.com/r9YzJLxm.png)
- Included as example in the JAMA_Test.html
- Shows curve fitting for a 3D line and 3D plane with scatter data (obvious skew to check for alignment)
### Example of 2D Polynomial Least Squares Fitting
![Poly2D](https://i.imgur.com/sJsEySZm.png)
- Included as example in the JAMA_Test.html
- Shows curve fitting for poly(5,2)
  - f(C, x, xx, xxx, xxxx, xxxxx, xxxxy, xxxy, xxxyy, xxy, xxyy, xy xyy, y, yy)
## Edit 12/30/2022
- Added the ability for 3D LeastSquares sphere fits to 3D data
### Example of 3D Sphere Least Squares Fitting
![Sphere3D](https://i.imgur.com/AWKZPepm.png)
- Included as example in the JAMA_Test.html
- Shows 3D sphere fitting for all stars within 100 LY of Earth
## Edit 1/2/2023
- Added the ability for LeastSquares 3D Polynomial fits to 3D and 4D data
### Example of 3D Polynomial Least Squares Fitting
![Poly3DExample](misc/Poly3DExample.gif)
- Included as example in the JAMA_Test.html
- Shows 3D polynomial fitting for randomly generated clumps of data poly3D(4,4,4)
  - C, x, xx, xxx, xxxx, xxxy, xxxz, xxy, xxyy, xxyz, xxz, xxzz, xy, xyy, xyyy, xyyz, xyz, xyzz, xz, xzz, xzzz, y, yy, yyy, yyyy, yyyz, yyz, yyzz, yz, yzz, yzzz, z, zz, zzz, zzzz
- Added the ability for LeastSquares 2D SinCos fits to 3D data
  - Linear and Exponential Frequency Variation with Terms
### Example of 2D SinCos Least Squares Fitting
![SinCos2DLinAndExp](https://i.imgur.com/St8VkRsl.png)
- Included as example in the JAMA_Test.html
## Edit 1/13/2023
- Added the ability for LeastSquares fits to arbitrary functions
### Example of Parsing Equation and Least Squares Fitting
![EquationParseExample](https://i.imgur.com/isnshaj.png)
- Included as example in the JAMA_Test.html
- Shows fit for an equation input by the user
