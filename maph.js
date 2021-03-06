

var maph = function(){
  function Vector( initX, initY, initZ ){
    var newVector = Object.create(vectorPrototype);
    newVector.x = 0;
    newVector.y = 0;
    newVector.z = 0;

    if(arguments.length == 1){
      newVector.x = initX;
      newVector.y = initX;
      newVector.z = initX;
    }
    if (arguments.length == 3){
      newVector.x = initX;
      newVector.y = initY;
      newVector.z = initZ;
    }
    return newVector;
  }
  this.Vector = Vector;
  var vectorPrototype = {
    magnitude: function(){
      return Math.sqrt((this.x*this.x) + (this.y*this.y) + (this.z*this.z));
    },
    invert: function(){
      return new Vector( -this.x, -this.y, -this.z );
    },
    normalize: function(){
      return this.scalarDivide(this.magnitude() || 1);
    },
    add: function(vector){
      return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z );
    },
    sub: function(vector){
      return new Vector( this.x - vector.x, this.y - vector.y, this.z - vector.z );
    },
    dot: function(vector){
      return this.x*vector.x+this.y*vector.y+this.z*vector.z;
    },
    cross: function(vector){
      return new Vector( this.y*vector.z - this.z*vector.y, this.z*vector.x - this.x*vector.z, this.x*vector.y - this.y*vector.x );
    },
    equals: function(vector){
      return this.x == vector.x && this.y==vector.y && this.z==vector.z;
    },
    eq: function(vector){
      return this.equals(vector);
    },
    scalarMultiply: function(scalar){
      return new Vector( this.x * scalar, this.y * scalar, this.z * scalar );
    },
    scalarDivide: function(scalar){
      return new Vector( this.x / scalar, this.y / scalar, this.z / scalar );
    },
    prettyPrint: function(){
      return "Vector(x,y,z):["+this.x+","+this.y+","+this.z+"]";
    },
    print: function(){
      return "["+this.x+","+this.y+","+this.z+"]";
    },
    transform: function(matrix){
      var xTransformed = 0;
      var yTransformed = 0;
      var zTransformed = 0;
      if ( matrix.m == 3 ){
        xTransformed = (this.x * matrix.matrix[0][0]) + (this.y * matrix.matrix[1][0]) + (this.z * matrix.matrix[2][0]);
        yTransformed = (this.x * matrix.matrix[0][1]) + (this.y * matrix.matrix[1][1]) + (this.z * matrix.matrix[2][1]);
        zTransformed = (this.x * matrix.matrix[0][2]) + (this.y * matrix.matrix[1][2]) + (this.z * matrix.matrix[2][2]);
        return new Vector(xTransformed, yTransformed, zTransformed);
      }
      if (matrix.m == 4){
        xTransformed = (this.x * matrix.matrix[0][0]) + (this.y * matrix.matrix[1][0]) + (this.z * matrix.matrix[2][0]) + matrix.matrix[3][0];
        yTransformed = (this.x * matrix.matrix[0][1]) + (this.y * matrix.matrix[1][1]) + (this.z * matrix.matrix[2][1]) + matrix.matrix[3][1];
        zTransformed = (this.x * matrix.matrix[0][2]) + (this.y * matrix.matrix[1][2]) + (this.z * matrix.matrix[2][2]) + matrix.matrix[3][2];
        var w = (this.x * matrix.matrix[0][3]) + (this.y * matrix.matrix[1][3]) + (this.z * matrix.matrix[2][3]) + matrix.matrix[3][3];
        return new Vector(xTransformed/w, yTransformed/w, zTransformed/w);
      }
      else {
        return undefined;
      }
    }
  };

	var Matrix = (function(){
		function Matrix(size, arrayIn){//arrayIn optional
			if(!size || size <1 || (size != size*1) || (size != Math.floor(size))){
				throw {error:"Invalid size for Matrix constructor: " +size, id:0};
			}
			this.m = size;
			this.n = size;
			this.matrix = [];
			if(arrayIn && arrayIn.length == this.n && arrayIn[0].length == this.m){
				this.matrix = JSON.parse(JSON.stringify(arrayIn));
			}
			else{
				for (var i =0; i < this.m; i++){
					var row = [];
					for(var j=0; j < this.n; j++){
						if(j==i){row.push(1);}
						else{row.push(0);}
					}
					this.matrix.push(row);
				}
			}
		};
		Matrix.prototype.product = function(right){
			if(this.n != right.m || this.m != right.n){ // only equal sized square matrices
				throw {error:"Improper matrix product attempt", id:1};
			}
			var result = [];
			for (var i = 0; i < this.n; i++){
				var row = [];
				for (var j = 0; j < right.m; j++){
					var sum = 0;
					for (var k = 0; k < this.n; k++){
						sum += this.matrix[i][k] * right.matrix[k][j]; // should be generic for any square matrix.
					}
					row.push(sum);
				}
				result.push(row);
			}
			return new Matrix(result.length, result);
		};
		Matrix.prototype.transpose = function(){
			var mOut = [];
			for(var i=0;i<this.n; i++){
				var row = [];
				for(var j=0; j<this.m; j++){
					row.push(this.matrix[j][i]);
				}
				mOut.push(row);
			}
			return new Matrix(this.n, mOut);
		};
		Matrix.prototype.determinant = function(){
			if(this.m != this.n){ return undefined;}
			if(this.m == 2){ // hardcode for 2x2 matrix
				return (this.matrix[0][0]*this.matrix[1][1]) - (this.matrix[0][1]*this.matrix[1][0]);
			}
			var sign = 1;
			var total = 0;
			for(var top = 0; top < this.n; top++){
				var reducedMatrix = [];
				for(var i = 1; i < this.n; i++){
					var row = [];
					for(var j = 0; j < this.n; j++){
						if(j != top){row.push(this.matrix[i][j]);}
					}
					reducedMatrix.push(row);
				}
				reducedMatrix = new Matrix(reducedMatrix.length, reducedMatrix);
				total += sign*this.matrix[0][top]*reducedMatrix.determinant();
				sign = -sign;
			}
			return total;
		};
		Matrix.prototype.equals = function(test){
			if(test.n != this.n || test.m != this.m){return false;}

			for(var i=0;i<this.n; i++){
				for(var j=0; j<this.m; j++){
					if(this.matrix[i][j] != test.matrix[i][j]){return false;}
				}
			}
			return true;
		};
		Matrix.prototype.eq = function(matrix){
			return this.equals(matrix);
		};
		Matrix.prototype.prettyPrint = function(){
			var out = "Matrix("+this.m+"x"+this.n+"):\n";
			for (var i = 0; i < this.m; i++){
				out+= "|[";
				for (var j = 0; j < this.n; j++){
					out += this.matrix[i][j];
					if(j < this.n-1)out+=", ";
				}
				out+="]|\n";
			}
			return out;
		};
		Matrix.prototype.inverse = function(){
			var majorDeterminant = this.determinant();
			if( !majorDeterminant ){ return undefined; }
			var minorArray = [];
			var determinantFactorArray = [];
      var i, i2, j, j2;
			for ( i = 0; i < this.m; i++){
				var row = [];
				var determinantFactorRow = [];
				for( j = 0; j < this.n; j++){
					row.push(0);
					if(i===j){
						determinantFactorRow.push( 1/majorDeterminant );
					}
					else{
						determinantFactorRow.push( 0 );
					}
				}
				minorArray.push(row);
				determinantFactorArray.push( determinantFactorRow );
			}
			for ( i = 0; i < this.m; i++ ){
				for( j = 0; j < this.n; j++ ){
					var submatrixArray = [];
					for ( i2 =0; i2 < this.m; i2++ ){
						var submatrixRow = [];
						for( j2=0; j2 < this.n; j2++ ){ //O^4, now that's what I call performance!
							if( i2 != i && j2 != j ){
								submatrixRow.push( this.matrix[i2][j2] )
							}
						}
						if(submatrixRow.length){submatrixArray.push( submatrixRow );}
					}
					var submatrix = new Maph.Matrix( submatrixArray.length, submatrixArray );
					var minor = submatrix.determinant();
					if( ( i + j ) % 2 == 0 ){
						minorArray[i][j] = minor;
					} else{
						minorArray[i][j] = -minor;
					}
				}
			}
			var minorMatrix = new Maph.Matrix( this.m, minorArray );
			var adjugate = minorMatrix.transpose();
			var inverse =  adjugate.product( new Maph.Matrix( determinantFactorArray.length , determinantFactorArray ) );
			return inverse;
		};

		return Matrix;

	})();
	this.Matrix = Matrix;
};

var Maph = new maph();
//module.exports = Maph;
