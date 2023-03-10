"use strict";

/**
 * Least Squares
 * Structure to hold least squares utility methods
 * @param  
 * @class
 */

var LeastSquares = /** @class */ (function () {
    /**
    * Basic constructor
    * @return Return values
    */
    function LeastSquares( x, y, z=null, w=null ){
        if( x.length != y.length ){
            console.log( "arrays must be the same length" );
        }
        this.x = x;
        this.y = y;
        if( z == null ){
            this.z = [];
        } else {
            this.z = z;
        }
        if( w == null ){
            this.w = [];
        } else {
            this.w = w;
        }
        
        this.f = {
            add: '+',
            sub: '-',
            div: '/',
            mlt: '*',
            mod: '%',
            pow: '^',
        };

        // Create array for Order of Operation and precedence
        this.f.orderOfOp = [
            [ [this.f.pow] ],
            [ [this.f.mlt], [this.f.div], [this.f.mod] ],
            [ [this.f.add], [this.f.sub] ]
        ];
    }
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.line = function (){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            B[i][0] = this.y[i];
            A[i][0] = this.x[i];
            A[i][1] = 1;
        }
        A = new Matrix( A );
        B = new Matrix( B );
        return A.solve(B);
    };
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.line3D = function(){
        // First find the average of the points
        var avg = [];
        avg[0] = eval(this.x.join('+'))/this.x.length;
        avg[1] = eval(this.y.join('+'))/this.y.length;
        avg[2] = eval(this.z.join('+'))/this.z.length;
        
        // Then take the singular value decomposition of the points minus the average
        var A = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            A[i][0] = this.x[i] - avg[0];
            A[i][1] = this.y[i] - avg[1];
            A[i][2] = this.z[i] - avg[2];
        }
        A = new Matrix( A );
        var res = A.svd();
        //console.log( res.s );
        console.log( res.V );
        var out = [];
        for( var i = 0; i < 3; i++ ){
            out[i] = [];
            out[i][0] = avg[i];
            out[i][1] = res.V[i][0];
        }
        return new Matrix( out );
    }
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.plane = function(){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            A[i][0] = this.x[i];
            A[i][1] = this.y[i];
            A[i][2] = 1;
            B[i][0] = this.z[i];
        }
        A = new Matrix( A );
        B = new Matrix( B );
        return A.solve(B);
    }
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.parab = function (){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            B[i][0] = this.y[i];
            A[i][2] = 1;
            A[i][1] = this.x[i]
            A[i][0] = this.x[i] * A[i][1];
        }
        A = new Matrix( A );
        B = new Matrix( B );
        return A.solve(B);
    };
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.poly = function ( degree ){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            B[i][0] = this.y[i];
            A[i][degree] = 1;
            for( var d = degree-1; d >= 0; d-- ){
                A[i][d] = this.x[i] * A[i][d+1];
            }
        }
        A = new Matrix( A );
        B = new Matrix( B );
        return A.solve(B);
    };
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.poly2D = function ( degreeX, degreeY, polyParam = -1 ){
        var A = [];
        var B = [];
        var degreeMax = Math.max( degreeX, degreeY );
        var dXm1 = degreeX-1;
        var dYm1 = degreeY-1;
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            var pIndex = 0;
            // Setup the combination terms
            // 1,1 = {}
            // 2,1 || 1,2 || 2,2 = { xy }
            // 3,1 = { xy, x2y }
            // 1,3 = { xy, xy2 }
            // 3,2 || 2,3 || 3,3 = { xy, x2y, xy2 }
            // 4,1 = { xy, x2y, x3y }
            // 1,4 = { xy, xy2, xy3 }
            // 4,2 = { xy, x2y, xy2, x3y, x2y2 }
            // 2,4 = { xy, x2y, xy2, xy3, x2y2 }
            // 4,3 || 3,4 || 4,4 = { xy, x2y, xy2, x3y, x2y2, xy3 }
            var xTerm = 1;
            for( var dX = 0; dX <= degreeX; dX++ ){
                var yTerm = 1;
                for( var dY = 0; dY <= degreeY; dY++ ){
                    if( dX+dY <= degreeMax ){
                        A[i][pIndex++] = xTerm * yTerm;
                    }
                    yTerm *= this.y[i];
                }
                xTerm *= this.x[i];
            }
            B[i][0] = this.z[i];
        }
        
        A = new Matrix( A );
        B = new Matrix( B );
        var res = A.solve(B);
        
        // If this has an optional return parameter, then fill out the optional return parameters
        if( polyParam != -1 ){
            // Setup individual terms for X and Y (x, x2, x3, ect... y, y2, y3, ect...)
            var propNames = [];
            // Setup the combination terms
            var xTerm = "";
            var yTerm;
            for( var dX = 0; dX <= degreeX; dX++ ){
                yTerm = "";
                for( var dY = 0; dY <= degreeY; dY++ ){
                    if( dX+dY <= degreeMax ){
                        if( dX+dY == 0 ){
                            propNames.push( "C" );
                        } else {
                            propNames.push( xTerm + yTerm );
                        }
                    }
                    yTerm += "y";
                }
                xTerm += "x";
            }
            for( var n = 0; n < propNames.length; n++ ){
                polyParam[ propNames[n] ] = res.A[n][0];
            }
        }
        
        return res;
    };
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.poly3D = function ( degreeX, degreeY, degreeZ, polyParam = -1 ){
        if( this.z == null ){
            console.log( "ERROR: No Z Data, cannot compute 3D polynomial" );
            return null;
        }
        if( this.w == null ){
            console.log( "WARNING: No W Data, setting all W values to 1." );
            this.w = [];
            for( var i = 0; i < this.x.length; i++ ){
                this.w.push( 1 );
            }
        }
        var A = [];
        var B = [];
        var degreeMax = Math.max( Math.max( degreeX, degreeY ), degreeZ );
        var dXm1 = degreeX-1;
        var dYm1 = degreeY-1;
        var dZm1 = degreeZ-1;
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            var pIndex = 0;
            // Setup the combination terms
            // 1,1,1 = {}
            // 2,1,1 || 1,2,1 || 1,1,2 || 2,2,1 || 2,1,2 || 1,2,2 || 2,2,2 = { xy, xz, yz }
            // 3,1,1 = { xy, xz, yz, xxy, xxz, xyz }
            // 1,3,1 = { xy, xz, yz, xyy, yyz, xyz }
            // 1,1,3 = { xy, xz, yz, xzz, yzz, xyz }
            // 3,2,1 || 2,3,1 || 3,3,1 = { xy, xz, yz, xxy, xxz, xyy, yyz, xyz }
            // 3,1,2 || 2,1,3 || 3,1,3 = { xy, xz, yz, xxy, xxz, xzz, yzz, xyz }
            // 1,3,2 || 1,2,3 || 1,3,3 = { xy, xz, yz, xyy, yyz, xzz, yzz, xyz }
            // 3,3,2 || 3,2,3 || 2,3,3 = { xy, xz, yz, xxy, xxz, xyy, yyz, xzz, yzz, xyz }
            // 4,1,1 = { xy, xz, yz, xxy, xxz, xyz, xxxy, xxxz, xxyz }
            // 1,4 = { xy, xz, yz, xyy, xyyy }
            // 4,2 = { xy, xxy, xyy, xxxy, xxyy }
            // 2,4 = { xy, xxy, xyy, xyyy, xxyy }
            // 4,3 || 3,4 || 4,4 = { xy, x2y, xy2, x3y, x2y2, xy3 }
            var xTerm = 1;
            for( var dX = 0; dX <= degreeX; dX++ ){
                var yTerm = 1;
                for( var dY = 0; dY <= degreeY; dY++ ){
                    var zTerm = 1;
                    for( var dZ = 0; dZ <= degreeZ; dZ++ ){
                        if( dX+dY+dZ <= degreeMax ){
                            A[i][pIndex++] = xTerm * yTerm * zTerm;
                        }
                        zTerm *= this.z[i];
                    }
                    yTerm *= this.y[i];
                }
                xTerm *= this.x[i];
            }
            B[i][0] = this.w[i];
        }
        
        A = new Matrix( A );
        B = new Matrix( B );
        var res = A.solve(B);
        
        // If this has an optional return parameter, then fill out the optional return parameters
        if( polyParam != -1 ){
            // Setup individual terms for X and Y (x, x2, x3, ect... y, y2, y3, ect...)
            var propNames = [];
            // Setup the combination terms
            var xTerm = "";
            var yTerm;
            for( var dX = 0; dX <= degreeX; dX++ ){
                yTerm = "";
                for( var dY = 0; dY <= degreeY; dY++ ){
                    zTerm = "";
                    for( var dZ = 0; dZ <= degreeZ; dZ++ ){
                        if( dX+dY+dZ <= degreeMax ){
                            if( dX+dY+dZ == 0 ){
                                propNames.push( "C" );
                            } else {
                                propNames.push( xTerm + yTerm + zTerm );
                            }
                        }
                        zTerm += "z";
                    }
                    yTerm += "y";
                }
                xTerm += "x";
            }
            for( var n = 0; n < propNames.length; n++ ){
                polyParam[ propNames[n] ] = res.A[n][0];
            }
        }
        
        return res;
    };
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.log = function (){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            B[i][0] = this.y[i];
            A[i][0] = Math.log( this.x[i] );
            A[i][1] = 1;
        }
        A = new Matrix( A );
        B = new Matrix( B );
        return A.solve(B);
    };
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.powLin = function (){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            B[i][0] = Math.log( this.y[i] );
            A[i][0] = Math.log( this.x[i] );
            A[i][1] = 1;
        }
        A = new Matrix( A );
        B = new Matrix( B );
        var res = A.solve(B);
        res.A[1][0] = Math.exp( res.A[1][0] );
        return res;
    };
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.expLin = function (){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            B[i][0] = Math.log( this.y[i] );
            A[i][0] = this.x[i];
            A[i][1] = 1;
        }
        A = new Matrix( A );
        B = new Matrix( B );
        var res = A.solve(B);
        res.A[1][0] = Math.exp( res.A[1][0] );
        return res;
    };
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.sinLinFreq = function ( degree, stFreq=1.0, freqStep=stFreq ){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            B[i][0] = this.y[i];
            A[i][degree] = 1;
            var freqMult = stFreq;
            for( var d = degree-1; d >= 0; d-- ){
                A[i][d]   = Math.sin( this.x[i] * freqMult );
                freqMult += freqStep;
            }
        }
        A = new Matrix( A );
        B = new Matrix( B );
        return A.solve(B);
    };
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.cosLinFreq = function ( degree, stFreq=1.0, freqStep=stFreq ){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            B[i][0] = this.y[i];
            A[i][degree] = 1;
            var freqMult = stFreq;
            for( var d = degree-1; d >= 0; d-- ){
                A[i][d]   = Math.cos( this.x[i] * freqMult );
                freqMult += freqStep;
            }
        }
        A = new Matrix( A );
        B = new Matrix( B );
        return A.solve(B);
    };
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.sinCosLinFreq = function ( degree, stFreq=1.0, freqStep=stFreq ){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            B[i][0] = this.y[i];
            A[i][degree*2] = 1;
            var freqMult = stFreq;
            for( var d = degree*2-1; d >= 0; d-=2 ){
                A[i][d]   = Math.sin( this.x[i] * freqMult );
                A[i][d-1] = Math.cos( this.x[i] * freqMult );
                freqMult += freqStep;
            }
        }
        A = new Matrix( A );
        B = new Matrix( B );
        return A.solve(B);
    };
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.sinExpFreq = function ( degree, stFreq=1.0, freqExpRate=2.0 ){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            B[i][0] = this.y[i];
            A[i][degree] = 1;
            var freqMult = stFreq;
            for( var d = degree-1; d >= 0; d-- ){
                A[i][d] = Math.sin( this.x[i] * freqMult );
                freqMult *= freqExpRate;
            }
        }
        A = new Matrix( A );
        B = new Matrix( B );
        return A.solve(B);
    };
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.cosExpFreq = function ( degree, stFreq=1.0, freqExpRate=2.0 ){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            B[i][0] = this.y[i];
            A[i][degree] = 1;
            var freqMult = stFreq;
            for( var d = degree-1; d >= 0; d-- ){
                A[i][d] = Math.cos( this.x[i] * freqMult );
                freqMult *= freqExpRate;
            }
        }
        A = new Matrix( A );
        B = new Matrix( B );
        return A.solve(B);
    };
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.sinCosExpFreq = function ( degree, stFreq=1.0, freqExpRate=2.0 ){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            B[i][0] = this.y[i];
            A[i][degree*2] = 1;
            var freqMult = stFreq;
            for( var d = degree*2-1; d >= 0; d-=2 ){
                A[i][d]   = Math.sin( this.x[i] * freqMult );
                A[i][d-1] = Math.cos( this.x[i] * freqMult );
                freqMult *= freqExpRate;
            }
        }
        A = new Matrix( A );
        B = new Matrix( B );
        return A.solve(B);
    };
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.sinCos2DLinFreq = function ( degreeX, degreeY, stFreq=[1.0,1.0], freqStep=[1.0,1.0] ){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            B[i][0] = this.z[i];
            A[i][0] = 1;
            var freqMult = stFreq.slice();;
            var index = 1;
            for( var dx = 0; dx < degreeX; dx++ ){
                A[i][index++] = Math.sin( this.x[i] * freqMult[0] );
                A[i][index++] = Math.cos( this.x[i] * freqMult[0] );
                freqMult[0] += freqStep[0];
            }
            for( var dy = 0; dy < degreeY; dy++ ){
                A[i][index++] = Math.sin( this.y[i] * freqMult[1] );
                A[i][index++] = Math.cos( this.y[i] * freqMult[1] );
                freqMult[1] += freqStep[1];
            }
        }
        A = new Matrix( A );
        B = new Matrix( B );
        return A.solve(B);
    };
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.sinCos2DExpFreq = function ( degreeX, degreeY, stFreq=[1.0,1.0], freqExpRate=[2.0,2.0] ){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            B[i][0] = this.z[i];
            A[i][0] = 1;
            var freqMult = stFreq.slice();
            var index = 1;
            for( var dx = 0; dx < degreeX; dx++ ){
                A[i][index++] = Math.sin( this.x[i] * freqMult[0] );
                A[i][index++] = Math.cos( this.x[i] * freqMult[0] );
                freqMult[0] *= freqExpRate[0];
            }
            for( var dy = 0; dy < degreeY; dy++ ){
                A[i][index++] = Math.sin( this.y[i] * freqMult[1] );
                A[i][index++] = Math.cos( this.y[i] * freqMult[1] );
                freqMult[1] *= freqExpRate[1];
            }
        }
        A = new Matrix( A );
        B = new Matrix( B );
        return A.solve(B);
    };
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.ellipse = function (){
        
    };
    
    /**
    * General purpose of the method
    * @return Return values
    */
    LeastSquares.prototype.ellipseGen = function ( ellipseParam = -1, ellipseFit = 5 ){
        if( ellipseFit == 0 ){
            return this.ellipseGenA( ellipseParam );
        } else if( ellipseFit == 1 ){
            return this.ellipseGenB( ellipseParam );
        } else if( ellipseFit == 2 ){
            return this.ellipseGenC( ellipseParam );
        } else if( ellipseFit == 3 ){
            return this.ellipseGenD( ellipseParam );
        } else if( ellipseFit == 4 ){
            return this.ellipseGenE( ellipseParam );
        } else {
            return this.ellipseGenF( ellipseParam );
        }
    };
    
    LeastSquares.prototype.ellipseGenA = function ( ellipseParam = -1 ){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            A[i][4] = 1;
            A[i][3] = this.y[i];
            A[i][2] = this.x[i];
            A[i][1] = this.y[i] * this.y[i];
            A[i][0] = this.x[i] * this.y[i];
            B[i][0] = -this.x[i] * this.x[i];
        }
        A = new Matrix( A );
        B = new Matrix( B );
        var res = A.solve(B);
        var out = [];
        out[0] = [];
        out[0][0] = 1;
        for( var i = 1; i < 6; i++ ){
            out[i] = [];
            out[i][0] = res.A[i-1][0];
        }
        
        return this.returnEllipse( out, ellipseParam );
    };
    
    LeastSquares.prototype.ellipseGenB = function ( ellipseParam = -1 ){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            A[i][4] = 1;
            A[i][3] = this.y[i];
            A[i][2] = this.x[i];
            A[i][1] = this.y[i] * this.y[i];
            A[i][0] = this.x[i] * this.x[i];
            B[i][0] = -this.x[i] * this.y[i];
        }
        A = new Matrix( A );
        B = new Matrix( B );
        var res = A.solve(B);
        var out = [];
        for( var i = 0; i < 5; i++ ){
            if( i == 0 ){
                out[i] = [];
                out[i][0] = res.A[i][0];
            } else {
                out[i+1] = [];
                out[i+1][0] = res.A[i][0];
            }
        }
        out[1] = [];
        out[1][0] = 1;
        
        return this.returnEllipse( out, ellipseParam );
    };
    
    LeastSquares.prototype.ellipseGenC = function ( ellipseParam = -1 ){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            A[i][4] = 1;
            A[i][3] = this.y[i];
            A[i][2] = this.x[i];
            A[i][1] = this.x[i] * this.y[i];
            A[i][0] = this.x[i] * this.x[i];
            B[i][0] = -this.y[i] * this.y[i];
        }
        A = new Matrix( A );
        B = new Matrix( B );
        var res = A.solve(B);
        var out = [];
        for( var i = 0; i < 5; i++ ){
            if( i <= 1 ){
                out[i] = [];
                out[i][0] = res.A[i][0];
            } else {
                out[i+1] = [];
                out[i+1][0] = res.A[i][0];
            }
        }
        out[2] = [];
        out[2][0] = 1;
        
        return this.returnEllipse( out, ellipseParam );
    };
    
    LeastSquares.prototype.ellipseGenD = function ( ellipseParam = -1 ){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            A[i][4] = 1;
            A[i][3] = this.y[i];
            A[i][2] = this.y[i] * this.y[i];
            A[i][1] = this.x[i] * this.y[i];
            A[i][0] = this.x[i] * this.x[i];
            B[i][0] = -this.x[i];
        }
        A = new Matrix( A );
        B = new Matrix( B );
        var res = A.solve(B);
        var out = [];
        for( var i = 0; i < 5; i++ ){
            if( i <= 2 ){
                out[i] = [];
                out[i][0] = res.A[i][0];
            } else {
                out[i+1] = [];
                out[i+1][0] = res.A[i][0];
            }
        }
        out[3] = [];
        out[3][0] = 1;
        
        return this.returnEllipse( out, ellipseParam );
    };
    
    LeastSquares.prototype.ellipseGenE = function ( ellipseParam = -1 ){
        var A = [];
        var B = [];
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            A[i][4] = 1;
            A[i][3] = this.x[i];
            A[i][2] = this.y[i] * this.y[i];
            A[i][1] = this.x[i] * this.y[i];
            A[i][0] = this.x[i] * this.x[i];
            B[i][0] = -this.y[i];
        }
        A = new Matrix( A );
        B = new Matrix( B );
        var res = A.solve(B);
        var out = [];
        for( var i = 0; i < 5; i++ ){
            if( i <= 3 ){
                out[i] = [];
                out[i][0] = res.A[i][0];
            } else {
                out[i+1] = [];
                out[i+1][0] = res.A[i][0];
            }
        }
        out[4] = [];
        out[4][0] = 1;
        
        return this.returnEllipse( out, ellipseParam );
    };
    
    LeastSquares.prototype.ellipseGenF = function ( ellipseParam = -1 ){
        var A = [];	
        var B = [];	
        for( var i = 0; i < this.x.length; i++ ){	
            A[i] = [];	
            B[i] = [];	
            B[i][0] = -1;	
            A[i][4] = this.y[i];	
            A[i][3] = this.x[i];	
            A[i][2] = this.y[i] * A[i][4];		
            A[i][1] = this.x[i] * this.y[i];
            A[i][0] = this.x[i] * A[i][3];	
        }	
        A = new Matrix( A );	
        B = new Matrix( B );	
        var res = A.solve(B);	

        var out = [];
        for( var i = 0; i < 5; i++ ){
            out[i] = [];
            out[i][0] = res.A[i][0];
        }
        out[5] = [];
        out[5][0] = 1;
        
        return this.returnEllipse( out, ellipseParam );
    };
    
    
    LeastSquares.prototype.returnEllipse = function ( out, ellipseParam = -1 ){    
        // Ellipse (conic section) parameters of ax2 + bxy + y2 + dx + ey +f = 0;
        var eA = out[0][0];
        var eB = out[1][0];
        var eC = out[2][0];
        var eD = out[3][0];
        var eE = out[4][0];
        var eF = out[5][0];
        
        // The coefficient normalizing factor
        var btb        = eB * eB;
        var amc        = eA - eC;
        var apc        = eA + eC;
        var ctd        = eC * eD;
        var btd        = eB * eD;
        var bte        = eB * eE;
        var ate        = eA * eE;
        var ctdtd      = eC*eD*eD;
        var bbmac      = btb-4*eA*eC;
        var aembd      = ate - btd;
        var abst       = 2*( ( aembd )*eE+ctdtd+( bbmac )*eF );
        var rtamc2mbtb = Math.sqrt( amc*amc+btb );
        var a_r   = -Math.sqrt( abst*( (apc) + rtamc2mbtb ))/( bbmac );
        var b_r   = -Math.sqrt( abst*( (apc) - rtamc2mbtb ))/( bbmac );
        //var q     = 64*( f*(acmbb)-( ate + btd )*e - ctd*d )/(acmbb*acmbb);
        var x_c   = (2*ctd - bte)/(bbmac);
        var y_c   = (2*ate - btd)/(bbmac);
        var theta = 0;
        if( eB == 0 ){
            if( eA > eC ){
                theta = 0;
            } else {
                theta = Math.PI;
            }
        } else {
            theta = Math.atan( 1.0/eB*( eC-eA-rtamc2mbtb ) );
        }
        
        if( ellipseParam != -1 ){
            ellipseParam.x_c   = x_c;
            ellipseParam.y_c   = y_c;
            ellipseParam.a_r   = a_r;
            ellipseParam.b_r   = b_r;
            ellipseParam.theta = theta;
        }
        
        return new Matrix( out );
    };
    
    LeastSquares.prototype.equationParse = function ( equation_in, param, depend=-1 ){
        var lsInputs = this.equationParseParse( equation_in, param, 0 );
        
        var xyzwNames = [ "x", "y", "z", "w" ];
        var xyzwLen = [ this.x.length, this.y.length, this.z.length, this.w.length ];
        // If no dependent variable specified, then choose the last variable with a positive length
        if( depend == -1 ){
            var dependIndex = xyzwLen.findLastIndex( (element) => element > 0 );
            depend = xyzwNames[ dependIndex ];
        }
        
        var maxXYZW = Math.max.apply( Math, xyzwLen );
        var xyzw = {};
        
        var A = [];
        var B = [];

        for( var xyzwInd = 0; xyzwInd < maxXYZW; xyzwInd++ ){
            xyzw[ "x" ] = this.x[ xyzwInd ];
            xyzw[ "y" ] = this.y[ xyzwInd ];
            xyzw[ "z" ] = this.z[ xyzwInd ];
            xyzw[ "w" ] = this.w[ xyzwInd ];
            
            A[xyzwInd] = [];	
            B[xyzwInd] = [];	
            B[xyzwInd][0] = xyzw[ depend ];
            
            for( var lsI = 0; lsI < lsInputs.length; lsI++ ){
                A[xyzwInd].push( Number( this.equationParseCalcInput( lsInputs[lsI], xyzw ) ) );
            }
            //document.getElementById("output").innerHTML += "<br>x: " + xyzw.x + " y: " + xyzw.y + " z: " + xyzw.z + " w: " + xyzw.w + " = " + result.toString();
        }
        	
        A = new Matrix( A );	
        B = new Matrix( B );	
        var res = A.solve(B);	

        for( var key in param ){
            var value = param[ key ];
            param[ key ] = res.A[value][0];
        }
        
        return res;
    };
    
    LeastSquares.prototype.equationParseEvaluate = function ( equation_in, param, xyzw_in, depend=-1 ){
        // Find a set of equation inputs with the parameter values replaced
        var lsInputs = this.equationParseParse( equation_in, param, 1 );
        
        if( xyzw_in.y == undefined ){ xyzw_in.y = []; }
        if( xyzw_in.z == undefined ){ xyzw_in.z = []; }
        if( xyzw_in.w == undefined ){ xyzw_in.w = []; }
        
        var xyzwNames = [ "x", "y", "z", "w" ];
        var xyzwLen = [ xyzw_in.x.length, xyzw_in.y.length, xyzw_in.z.length, xyzw_in.w.length ];
        // If no dependent variable specified, then choose the last variable with a positive length
        if( depend == -1 ){
            var dependIndex = xyzwLen.findLastIndex( (element) => element > 0 );
            depend = xyzwNames[ dependIndex ];
        }
        var maxXYZW = Math.max.apply( Math, xyzwLen );
        
        var xyzw = {};

        var res = [];
        for( var xyzwInd = 0; xyzwInd < maxXYZW; xyzwInd++ ){
            xyzw[ "x" ] = xyzw_in.x[ xyzwInd ];
            xyzw[ "y" ] = xyzw_in.y[ xyzwInd ];
            xyzw[ "z" ] = xyzw_in.z[ xyzwInd ];
            xyzw[ "w" ] = xyzw_in.w[ xyzwInd ];
            
            res.push( 0 );
            for( var lsI = 0; lsI < lsInputs.length; lsI++ ){
                res[xyzwInd] += ( Number( this.equationParseCalcInput( lsInputs[lsI], xyzw ) ) );
            }
        }
        
        return res;
    };
        
    //----------------------------------------
    // Support functions for equation parsing
    //----------------------------------------
    
    LeastSquares.prototype.equationParseParse = function( equation_in, param, evaluation ){
        // Answers From:
        // https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript
        // https://stackoverflow.com/questions/39647555/how-to-split-string-while-ignoring-portion-in-parentheses
        // https://stackoverflow.com/questions/3409520/javascript-get-only-the-variable-part-of-a-regex-match
        // https://stackoverflow.com/questions/1234712/javascript-replace-with-reference-to-matched-group
        // https://stackoverflow.com/questions/6479236/calculate-string-value-in-javascript-not-using-eval
        // Get rid of whitespace
        var strNoWhitespace = equation_in.replace( /\s+/g, '' );
        // Split all the portions into seperate components (based on +/- signs outside parentheses)
        // Thoughts on seperating text numbers /[^0-9]+|[0-9]+/g
        var parenDepth = 0;
        var parenMatchesArr = [];
        var strParenRepl = strNoWhitespace;
        while( strParenRepl.match( /\(([^()]*)\)/g ) ){
            parenMatchesArr[parenDepth] = strParenRepl.match( /\(([^()]*)\)/g );
            var replStr = "REPLACESTR" + parenDepth;
            strParenRepl = strParenRepl.replace( /\(([^()]*)\)/g, replStr );
            //console.log( parenMatchesArr[parenDepth] );
            //console.log( strParenRepl );
            parenDepth++;
        }
        var strMinusRepl = strParenRepl.replace( /\-(?![^(]*\))/g, '+-' );
        var lsInputs = strMinusRepl.split( /\+(?![^(]*\))/ );
        if( lsInputs[0] == "" ){
            lsInputs.shift();
        }

        var pRI = [];
        for( var parDep = 0; parDep < parenDepth; parDep++ ){
            pRI.push( 0 );
        }
        //console.log( "pRI: " + pRI.toString() );
        for( var lsI = 0; lsI < lsInputs.length; lsI++ ){
            // First, return any parentheses taken out
            for( var parDep = parenDepth-1; parDep >= 0; parDep-- ){
                var replStr = "REPLACESTR" + parDep;
                var re = new RegExp( replStr,"" );
                while( lsInputs[lsI].match( re ) ){
                    //console.log( "before: " + lsInputs[lsI] + " pRI: " + pRI + " parDep: " + parDep );
                    lsInputs[lsI] = lsInputs[lsI].replace( re, parenMatchesArr[ parDep ][ pRI[parDep] ]  );
                    pRI[parDep]++;
                    //console.log( "after: " + lsInputs[lsI] + " pRI: " + pRI + " parDep: " + parDep );
                }
            }
            if( evaluation ){
                // Check each of the calculated parameters for a match in this input
                var keyArray = Object.keys(param);
                // From: https://stackoverflow.com/questions/10630766/how-to-sort-an-array-based-on-the-length-of-each-element
                keyArray.sort( function( a, b ){
                    // ASC  -> a.length - b.length
                    // DESC -> b.length - a.length
                    return b.length - a.length;
                });
                for( var keyIndex in keyArray ){
                    var key = keyArray[ keyIndex ];
                    var reKey = new RegExp( '(\\-?)(' + key + ')(\\**)(.*)' );
                    if( lsInputs[lsI].match( reKey ) ){
                        // If we find a match, replace it with the calculated value
                        // then stop checking (should only be 1 param per input)
                        var value = param[ key ];
                        var replStr = RegExp.$1 + value + RegExp.$3 + RegExp.$4;
                        lsInputs[lsI] = lsInputs[lsI].replace( reKey, replStr );
                        break;
                    }
                }
            } else {
                // Find the parameter that's being calculated and store it
                var curParam = lsInputs[lsI].match( /(\-?)([A-Za-z]+)\**(.*)/ )[2];
                param[ curParam ] = lsI;
                // Erase the parameter from the input
                if( lsInputs[lsI].match( /(\-?)([A-Za-z]+)\**(.*)/ ) ){
                    //console.log( RegExp.$1 + " " + RegExp.$2 + " " + RegExp.$3 + " " + RegExp.$4 );
                    var replStr;
                    if( RegExp.$3 == "" ){
                        replStr = RegExp.$1 + 1;
                    } else {
                        replStr = RegExp.$1 + RegExp.$3;
                    }
                    lsInputs[lsI] = lsInputs[lsI].replace( /(\-?)([A-Za-z]+)\**(.*)/, replStr );
                }
            }
            // clean up unnecessary characters
            var matches = lsInputs[lsI].match( /(sqrt|sin|cos|tan|exp|pow|log|[0-9xyzwEe%\^*\/()\-+.,])/g );
            lsInputs[lsI] = matches.join( '' );
        }
        return lsInputs;
    };

    LeastSquares.prototype.equationParseCalcInput = function( input, xyzw ){
        // exp(x)*(2*x)
        // exp(2*x)
        // exp(2*(2*x))
        // exp( pow(2-x,x+2))
        // x^-2
        var inputMatch;
        var reGen = /(sqrt|sin|cos|tan|exp|pow|log)*\(([^()]*)\)/;
        var reXYZW  = /([xyzw])/;
        while( inputMatch = input.match( reGen ) ){
            //console.log( "inputMatch: " + inputMatch );
            var mathFunc;
            // Handle the case for pow( number, number )
            if( inputMatch[1] == "pow" ){
                var powHalves = inputMatch[2].split( "," );
                //console.log( powHalves.toString() );
                var re = /((\d*\.?\d+|\d+)([Ee][+-]?\d+)?|[xyzw])([+*/^%-])(-?(\d*\.?\d+|\d+)([Ee][+-]?\d+)?|-?[xyzw])/;
                if( powHalves[0].match( re ) ){
                    //console.log( powHalves[0] );
                    powHalves[0] = this.equationParseCalcInputNoParentheses( powHalves[0], xyzw );
                } else {
                    if( powHalves[0].match( reXYZW ) ){
                        powHalves[0] = powHalves[0].replace( reXYZW, xyzw[ RegExp.$1 ] );
                    }
                }
                if( powHalves[1].match( re ) ){
                    //console.log( powHalves[1] );
                    powHalves[1] = this.equationParseCalcInputNoParentheses( powHalves[1], xyzw );
                } else {
                    if( powHalves[1].match( reXYZW ) ){
                        powHalves[1] = powHalves[1].replace( reXYZW, xyzw[ RegExp.$1 ] );
                    }
                }
                var output = Math.pow( powHalves[0], powHalves[1] );
                //console.log( powHalves[0] + " " + powHalves[1] + " " + output );
                input = input.replace( reGen, output );
            // Handle the cases for sqrt|sin|cos|tan|exp|log( number )
            } else if( mathFunc = inputMatch[0].match( /(sqrt|sin|cos|tan|exp|log)/ ) ){
                var re = /((\d*\.?\d+|\d+)([Ee][+-]?\d+)?|[xyzw])([+*/^%-])(-?(\d*\.?\d+|\d+)([Ee][+-]?\d+)?|-?[xyzw])/;
                if( inputMatch[2].match( re ) ){
                    inputMatch[2] = this.equationParseCalcInputNoParentheses( inputMatch[2], xyzw );
                }
                var output;
                if( inputMatch[2].match( reXYZW ) ){
                    inputMatch[2] = inputMatch[2].replace( reXYZW, xyzw[ RegExp.$1 ] );
                }
                switch( mathFunc[0] ){
                    case "sqrt":
                        output = Math.sqrt( inputMatch[2] );
                        break;
                    case "sin":
                        output = Math.sin( inputMatch[2] );
                        break;
                    case "cos":
                        output = Math.cos( inputMatch[2] );
                        break;
                    case "tan":
                        output = Math.tan( inputMatch[2] );
                        break;
                    case "exp":
                        output = Math.exp( inputMatch[2] );
                        break;
                    case "log":
                        output = Math.log( inputMatch[2] );
                        break;
                    default:
                        null;
                }
                //console.log( mathFunc + " " + inputMatch[2] + " " + output );
                input = input.replace( reGen, output );
            // Handle cases where there's still basic math operation parentheses after handling function parentheses
            } else {
                var output;
                var re = /((\d*\.?\d+|\d+)([Ee][+-]?\d+)?|[xyzw])([+*/^%-])(-?(\d*\.?\d+|\d+)([Ee][+-]?\d+)?|-?[xyzw])/;
                if( inputMatch[2].match( re ) ){
                    output = this.equationParseCalcInputNoParentheses( inputMatch[2], xyzw );
                } else {
                    output = inputMatch[2];
                    if( output.match( reXYZW ) ){
                        output = output.replace( reXYZW, xyzw[ RegExp.$1 ] );
                    }
                }
                input = input.replace( reGen, output );
            }
            //console.log( "input: " + input );
            //calcInput( inputMatch[1] );
        }
        
        var output;
        var reNoParenMath = /((\d*\.?\d+|\d+)([Ee][+-]?\d+)?|[xyzw])([+*/^%-])(-?(\d*\.?\d+|\d+)([Ee][+-]?\d+)?|-?[xyzw])/;
        // Deal with any remaining basic math operations
        if( input.match( reNoParenMath ) ){
            output = this.equationParseCalcInputNoParentheses( input, xyzw );
            //input = input.replace( reNoParenMath, output );
        } else {
            output = input;
            if( output.match( reXYZW ) ){
                output = output.replace( reXYZW, xyzw[ RegExp.$1 ] );
            }
        }
        if( output.match( /--/ ) ){
            output = output.replace( /--/, "" );
        }
        //console.log( "output: " + output );
        return output;
    };

    LeastSquares.prototype.equationParseCalcInputNoParentheses = function( input, xyzw ){
        for( var i = 0, n = this.f.orderOfOp.length; i < n; i++ ){
            for( var op = 0, m = this.f.orderOfOp[i].length; op < m; op++ ){
                // Regular Expression to look for operators between floating numbers or integers
                var re;
                if( i == 2 ){
                    // For addition and subtraction need to account for optional leading negative (-)
                    re = new RegExp('(^[-+]?(?:\\d*\\.?\\d+|\\d+)(?:[Ee][+-]?\\d+)?|[xyzw])([\\' + this.f.orderOfOp[i][op] + '])(-?(?:\\d*\\.?\\d+|\\d+)(?:[Ee][+-]?\\d+)?|-?[xyzw])');
                } else {
                    re = new RegExp('((?:\\d*\\.?\\d+|\\d+)(?:[Ee][+-]?\\d+)?|[xyzw])([\\' + this.f.orderOfOp[i][op] + '])(-?(?:\\d*\\.?\\d+|\\d+)(?:[Ee][+-]?\\d+)?|-?[xyzw])');
                }
                
                //re = new RegExp('(\\d+\\.?\\d*|[xyzw])([\\' + f.orderOfOp[i][op] + '])(\\-?\\d+\\.?\\d*|\\-?[xyzw])');
                re.lastIndex = 0; // take precautions and reset re starting pos
                // Loop while there is still calculation for level of precedence
                while( re.test(input) ){
                    output = this.equationParse_calculate( RegExp.$1, RegExp.$2, RegExp.$3, xyzw );
                    if( isNaN(output) || !isFinite(output) ) 
                        return output; // exit early if not a number
                    input = input.replace( re, output );
                }
            }
        }
        
        if( input.match( /--/ ) ){
            input = input.replace( /--/, "" );
        }

        return input;
    };

    LeastSquares.prototype.equationParse_calculate = function( a, op, b, xyzw ){
        if( a == "x" ){ a = xyzw.x; }
        if( a == "y" ){ a = xyzw.y; }
        if( a == "z" ){ a = xyzw.z; }
        if( a == "w" ){ a = xyzw.w; }
        if( b == "x" ){ b = xyzw.x; }
        if( b == "y" ){ b = xyzw.y; }
        if( b == "z" ){ b = xyzw.z; }
        if( b == "w" ){ b = xyzw.w; }
        a = a * 1;
        b = b * 1;
        switch (op) {
            case this.f.add:
                return a + b;
                break;
            case this.f.sub:
                return a - b;
                break;
            case this.f.div:
                return a / b;
                break;
            case this.f.mlt:
                return a * b;
                break;
            case this.f.mod:
                return a % b;
                break;
            case this.f.pow:
                return Math.pow(a, b);
                break;
            default:
                null;
        }
    };
    
    LeastSquares.prototype.sphere3D = function ( sphereParam = -1 ){
        // Basing on my own work at https://math.stackexchange.com/questions/4606786/converting-ellipsoid-equation-to-canonical-form-parameters
        var lsA = [];	
        var lsB = [];	
        for( var i = 0; i < this.x.length; i++ ){	
            lsA[i] = [];	
            lsB[i] = [];	
            lsB[i][0] = -1;
            lsA[i][8] = this.z[i];
            lsA[i][7] = this.y[i];
            lsA[i][6] = this.x[i];
            lsA[i][5] = this.y[i] * this.z[i];
            lsA[i][4] = this.x[i] * this.z[i];
            lsA[i][3] = this.x[i] * this.y[i];
            lsA[i][2] = this.z[i] * this.z[i];	
            lsA[i][1] = this.y[i] * this.y[i];
            lsA[i][0] = this.x[i] * this.x[i];
        }	
        lsA = new Matrix( lsA );	
        lsB = new Matrix( lsB );	
        var res = lsA.solve(lsB);

        // Solve for the sphere plotting parameters
        var A = res.A[0][0]; // xx A
        var B = res.A[1][0]; // yy B
        var C = res.A[2][0]; // zz C
        var D = 0.5 * res.A[3][0]; // xy D
        var E = 0.5 * res.A[4][0]; // xz E
        var F = 0.5 * res.A[5][0]; // yz F
        var G = res.A[6][0]; // x G
        var H = res.A[7][0]; // y H
        var I = res.A[8][0]; // z I
        var cst = 1;
        
        var dd    = D*D;
        var ee    = E*E;
        var ff    = F*F;
        
        var efmcd = E*F-C*D;
        var dfmbe = D*F-B*E;
        var demaf = D*E-A*F;
        var bamdd = B*A-dd;
        var den   = 2*D*E*F+C*(bamdd)-A*ff-B*ee;
        
        var x_c = -0.5*(G*(B*C-ff)+H*(efmcd) +I*(dfmbe))/den;
        var y_c = -0.5*(G*(efmcd) +H*(C*A-ee)+I*(demaf))/den;
        var z_c = -0.5*(G*(dfmbe) +H*(demaf) +I*(bamdd))/den;
        
        var M = [
            [ A, D, E ],
            [ D, B, F ],
            [ E, F, C ]
        ];
        
        var N = [
            [ x_c ],
            [ y_c ],
            [ z_c ]
        ];
        
        M = new Matrix( M );
        N = new Matrix( N );
        var NT = N.transpose();
        
        var MtN = M.times( N );
        var NTtMtN = NT.times( MtN );
        var NTtMtNmC = NTtMtN.A[0][0] - 1;
        var Mpr = M.times( 1/NTtMtNmC );
        
        var eig = Mpr.eig();
        
        var a_r   = 1 / Math.sqrt( Math.abs( -eig.d[0] ) );
        var b_r   = 1 / Math.sqrt( Math.abs( -eig.d[1] ) );
        var c_r   = 1 / Math.sqrt( Math.abs( -eig.d[2] ) );
        
        var sqrt1mR20 = Math.sqrt( 1 - eig.V[2][0] * eig.V[2][0] );
        var beta      = Math.asin( eig.V[2][0] );
        var gamma     = Math.atan2( eig.V[2][1]/sqrt1mR20, eig.V[2][2]/sqrt1mR20 );
        var alpha     = Math.atan2( eig.V[1][0]/sqrt1mR20, eig.V[0][0]/sqrt1mR20 );
        
        if( sphereParam != -1 ){
            sphereParam.x_c   = x_c;
            sphereParam.y_c   = y_c;
            sphereParam.z_c   = z_c;
            sphereParam.a_r   = a_r;
            sphereParam.b_r   = b_r;
            sphereParam.c_r   = c_r;
            sphereParam.alpha = alpha;
            sphereParam.beta  = beta;
            sphereParam.gamma = gamma;
            sphereParam.eigV  = eig.V;
        }
        
        return res;
        
        /*var A = [
            [ a0,     0.5*a3, 0.5*a4 ],
            [ 0.5*a3, a1,     0.5*a5 ],
            [ 0.5*a4, 0.5*a5, a2     ]
        ];
        var B = [
            [ a6 ],
            [ a7 ],
            [ a8 ]
        ];
        
        var invA   = A.inverse();
        var invAtB = invA.times( B );
        var r_c    = {
            [ -0.5*invAtB.A[0][0] ],
            [ -0.5*invAtB.A[0][1] ],
            [ -0.5*invAtB.A[0][2] ]
        ];*/
    };
    
    LeastSquares.runLeastSquaresTest = function () {
        var x = [ 0.083488725, 0.972233795, 0.519432488, 0.557793421, 0.300510972, 0.529587317, 0.288370293, 0.295974099, 0.972950908, 0.562190618, 0.485386043, 0.187655207, 0.173117839, 0.401618916, 0.510703949, 0.834813425, 0.913974888, 0.358703401, 0.037429811, 0.809497463, 0.285912045, 0.153523603, 0.966634609, 0.529821905, 0.592251179, 0.710151685, 0.611030014, 0.137094865, 0.619995355, 0.185711451 ];
        var y = [ 0.154093159, 0.560237285, 0.301702746, 0.233999395, 0.319387128, 0.912314852, 0.055485191, 0.131389179, 0.584452711, 0.121399731, 0.478089423, 0.527552888, 0.30823643, 0.401301559, 0.39393612, 0.057959329, 0.429895272, 0.212793677, 0.058030451, 0.128383908, 0.069685073, 0.588424668, 0.129995286, 0.895030989, 0.310668533, 0.286987422, 0.714797546, 0.238023745, 0.842531267, 0.710897663 ];
        var ls = new LeastSquares( x, y );
        console.log( "x data" );
        console.log( x );
        console.log( "y data" );
        console.log( y );
        console.log( "line fit" );
        var res = ls.line();
        res.print( 5, 3 );
        console.log( "parabola fit" );
        res = ls.parab();
        res.print( 5, 3 );
        console.log( "5th degree poly fit" );
        res = ls.poly(5);
        res.print( 5, 3 );
        console.log( "8th degree poly fit" );
        res = ls.poly(8);
        res.print( 5, 3 );
        console.log( "Logarithmic fit" );
        res = ls.log();
        res.print( 5, 3 );
        console.log( "3rd degree exp freq sin fit (10Hz start freq)" );
        res = ls.sinExpFreq( 3, 10, 2 );
        res.print( 5, 3 );
        console.log( "3rd degree exp freq cos fit (10Hz start freq)" );
        res = ls.cosExpFreq( 3, 10, 2 );
        res.print( 5, 3 );
        console.log( "3rd degree exp freq sin-cos fit (10Hz start freq)" );
        res = ls.sinCosExpFreq( 3, 10, 2 );
        res.print( 5, 3 );

        var xSC = [ -4, -3, -2,  -1,   0,  1,  2,   3,  4 ];
        var ySC = [ -1,  0, -1.5, 0.5, 1, -1, -0.5, 2, -1 ];
        console.log( "x data" );
        console.log( xSC );
        console.log( "y data" );
        console.log( ySC );
        var lsSC = new LeastSquares( xSC, ySC );
        console.log( "3rd degree linear freq sin fit" );
        res = lsSC.sinLinFreq(3);
        res.print( 5, 3 );
        console.log( "3rd degree linear freq cos fit" );
        res = lsSC.cosLinFreq(3);
        res.print( 5, 3 );
        console.log( "3rd degree linear freq sin-cos fit" );
        res = lsSC.sinCosLinFreq(3);
        res.print( 5, 3 );
        
        var xExp = [ 1.006, 1.666, 3.418, 3.605, 4.562, 6.166, 7.331, 7.642, 8.745, 9.971, 10.924, 11.702, 12.802, 14.339, 14.901 ];
        var yExp = [ 0.853, 1.625, 5.326, 4.168, 9.873, 14.529, 21.579, 25.018, 33.839, 45.783, 59.037, 76.580, 94.795, 123.343, 161.893 ];
        console.log( "Exponential fit (Linear LS)" );
        var lsExp = new LeastSquares( xExp, yExp );
        res = lsExp.expLin();
        res.print( 5, 3 );
        console.log( "Power law fit (Linear LS)" );
        res = lsExp.powLin();
        res.print( 5, 3 );

        console.log( "Elliptical Fits" );
        var xEllipse = [ 0, 2, 1, -1, -3, -1 ];
        var yEllipse = [ 2, 1, -1, -2, 1, -1 ];
        var lsElp = new LeastSquares( xElp, yElp );
        console.log( "Ellipse with default, no return parameters (only Ax2+Bxy+Cy2+Dx+Ey+F matrix)" );
        res = lsElp.ellipseGen();
        res.print( 5, 3 );
        var ep = {};
        res = lsElp.ellipseGen( ep, 0 );
        console.log( "Ellipse parameters (x2 as dependent var)" );
        console.log( "x_c: " + ep.x_c + " y_c: " + ep.y_c + " a_r: " + ep.a_r + " b_r: " + ep.b_r + " theta: " + ep.theta );
        res.print( 5, 3 );
        ep = {};
        res = lsElp.ellipseGen( ep, 1 );
        console.log( "Ellipse parameters (xy as dependent var)" );
        console.log( "x_c: " + ep.x_c + " y_c: " + ep.y_c + " a_r: " + ep.a_r + " b_r: " + ep.b_r + " theta: " + ep.theta );
        res.print( 5, 3 );
        ep = {};
        res = lsElp.ellipseGen( ep, 2 );
        console.log( "Ellipse parameters (y2 as dependent var)" );
        console.log( "x_c: " + ep.x_c + " y_c: " + ep.y_c + " a_r: " + ep.a_r + " b_r: " + ep.b_r + " theta: " + ep.theta );
        res.print( 5, 3 );
        ep = {};
        res = lsElp.ellipseGen( ep, 3 );
        console.log( "Ellipse parameters (x as dependent var)" );
        console.log( "x_c: " + ep.x_c + " y_c: " + ep.y_c + " a_r: " + ep.a_r + " b_r: " + ep.b_r + " theta: " + ep.theta );
        res.print( 5, 3 );
        ep = {};
        res = lsElp.ellipseGen( ep, 4 );
        console.log( "Ellipse parameters (y as dependent var)" );
        console.log( "x_c: " + ep.x_c + " y_c: " + ep.y_c + " a_r: " + ep.a_r + " b_r: " + ep.b_r + " theta: " + ep.theta );
        res.print( 5, 3 );
        ep = {};
        res = lsElp.ellipseGen( ep, 5 );
        console.log( "Ellipse parameters (Const as dependent var)" );
        console.log( "x_c: " + ep.x_c + " y_c: " + ep.y_c + " a_r: " + ep.a_r + " b_r: " + ep.b_r + " theta: " + ep.theta );
        res.print( 5, 3 );
    };
    
    return LeastSquares;
})();
Matrix["__class"] = "LeastSquares";
Matrix["__interfaces"] = ["java.lang.Cloneable", "java.io.Serializable"];