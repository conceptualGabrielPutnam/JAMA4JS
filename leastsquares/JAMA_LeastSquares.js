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
    function LeastSquares( x, y, z=null ){
        if( x.length != y.length ){
            console.log( "arrays must be the same length" );
        }
        this.x = x;
        this.y = y;
        this.z = z;
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
    LeastSquares.prototype.plane3D = function(){
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
    LeastSquares.prototype.poly3D = function ( degreeX, degreeY, polyParam = -1 ){
        var A = [];
        var B = [];
        var degreeMax = Math.max( degreeX, degreeY );
        var dXm1 = degreeX-1;
        var dYm1 = degreeY-1;
        for( var i = 0; i < this.x.length; i++ ){
            A[i] = [];
            B[i] = [];
            var pIndex = 0;
            // Setup individual terms for X and Y (x, x2, x3, ect... y, y2, y3, ect...)
            A[i][pIndex++] = 1;
            for( var dX = 1; dX <= degreeX; dX++ ){
                A[i][pIndex] = A[i][pIndex-1] * this.x[i];
                pIndex++;
            }
            for( var dY = 1; dY <= degreeY; dY++ ){
                if( dY == 1 ){
                    A[i][pIndex++] = this.y[i];
                } else {
                    A[i][pIndex] = A[i][pIndex-1] * this.y[i];
                    pIndex++;
                }
            }
            
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
            var xTerm = this.x[i];
            for( var dX = 1; dX <= degreeX; dX++ ){
                var yTerm = this.y[i];
                for( var dY = 1; dY <= degreeY; dY++ ){
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
            var propNames = [ "C" ];
            var xName = "x";
            for( var dX = 1; dX <= degreeX; dX++ ){
                propNames.push( xName );
                xName += "x";
            }
            var yName = "y";
            for( var dY = 1; dY <= degreeY; dY++ ){
                propNames.push( yName );
                yName += "y";
            }
            // Setup the combination terms
            var xTerm = "x";
            var yTerm;
            for( var dX = 1; dX <= degreeX; dX++ ){
                yTerm = "y";
                for( var dY = 1; dY <= degreeY; dY++ ){
                    if( dX+dY <= degreeMax ){
                        propNames.push( xTerm + yTerm );
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