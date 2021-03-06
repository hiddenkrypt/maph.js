/*mathstests.js
For testing matrices											cinv = [[-0.5,0.5,0],[0.55,-0.65,0.2],[0.2,0.4,-0.2]]
				b = I( 3x3 )
a = [1,2,3]		b= 	[1,0,0]	c=	[1,2,2]	a*c=[28,24,09]	det( c ) = 20, inv( b ) = b		[-0.50,0.50,0.00]
	[4,5,6]	a*b=a	[0,1,0]		[3,2,2]		[61,54,24]	det( b ) = 1			inv( c )= [0.55,-0.65,0.20] a*c*inv( c ) = a
	[7,8,9]			[0,0,1]		[7,6,1]		[94,84,39]	det( a ) = 0	inv( a )=undef	[0.20,0.40,-0.20]

d = [1,1,1,2]	e = [7,-7,0,0] f=[1,1,1,1]	det( d )= 0				[11,12,185,4]			[12,19,14,6]
	[2,2,2,1]		[3,2,1,0.5]	[0,5,6,2]	det( e )= 651		   d*e=	[22,21,94,5]		d*f=[21,32,19,9]
	[3,3,3,5]		[1,1,0,1]	[9,9,1,1]	det( f )=	47.999			[33,35,463,11]			[35,55,39,17]   g = I( 4x4 )
	[4,2,1,0]		[0,1,92,1]	[1,2,3,1]	det( de )= 0				[35,33,2,3]		[13,23,17,09]	d*g=d e*g=e f*g=f
											det( df )= 3.463
.
.
.
Lets make some vectors too
a = [1,2,3] b = [2,3,4] c=[92,1,0] d=[1,1,1] e = [0,0,0] f = [0.2,-5,-0.776]
free variables g,b2,f2
*/

var a,b,c,d,e,f,g,g2,b2,test;

function approxEquals( varA, varB, margin ){
	if( Math.abs( varA - varB ) <= margin ) return true;
	return false;
}
function approxEqVec( vec1, x, y, z, mar ){
	return approxEquals( vec1.x, x, mar ) && approxEquals( vec1.y, y, mar ) && approxEquals( vec1.z, z, mar );
}
function approxEqMtx( mtx, arr, mar ){
	for( var i = 0; i < mtx.n; i++ ){
		for( var j = 0; j < mtx.m; j++ ){
			if ( !approxEquals( mtx.matrix[i][j], arr[i][j], mar ) ){ return false;}
		}
	}
	return true;
}



QUnit.module( "Matrix", {
	setup: function(){
		a  = new Maph.Matrix( 3, [[1,2,3],[4,5,6],[7,8,9]] );
		b  = new Maph.Matrix( 3 ); // identity
		b2 = new Maph.Matrix( 3, [[1,0,0],[0,1,0],[0,0,1]] );
		c  = new Maph.Matrix( 3, [[1,2,2],[3,2,2],[7,6,1]] );
		d  = new Maph.Matrix( 4, [[1,1,1,2],[2,2,2,1],[3,3,3,5],[4,2,1,0]] );
		e  = new Maph.Matrix( 4, [[7,-7,0,0],[3,2,1,0.5],[1,1,0,1],[0,1,92,1]] );
		f  = new Maph.Matrix( 4, [[1,1,1,1],[0,5,6,2],[9,9,1,1],[1,2,3,1]] );
		g  = new Maph.Matrix( 4 ); // identity
		g2 = new Maph.Matrix( 4, [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]] );
		test = null;
	},
teardown: function(){}
} );

test( "equals()", function( assert ){
	assert.ok( a.equals( a ), "A = A" );
	assert.ok( b.equals( b ), "B = B" );
	assert.ok( b.equals( b2 ), "B = B2" );
	assert.ok( g.equals( g2 ), "G = G2" );
	assert.ok( f.equals( new Maph.Matrix( 4, [[1,1,1,1],[0,5,6,2],[9,9,1,1],[1,2,3,1]] ) ), "F = new matrix with same elements as F" );
	assert.ok( e.equals( new Maph.Matrix( 4, [[7,-7,0,0],[3,2,1,0.5],[1,1,0,1],[0,1,92,1]] ) ), "E = new matrix with same elements as E" );

	assert.ok( !( a.equals( b ) ), "A != B" );
	assert.ok( !( b.equals( c ) ), "B != C" );
	assert.ok( !( c.equals( d ) ), "C != D" );
	assert.ok( !( d.equals( e ) ), "D != E" );
	assert.ok( !( e.equals( f ) ), "E != F" );
	assert.ok( !( f.equals( g ) ), "F != G" );
	assert.ok( !( g.equals( a ) ), "G != A" );

	assert.ok( !( a.equals( c ) ), "A != C" );
	assert.ok( !( b.equals( d ) ), "B != D" );
	assert.ok( !( c.equals( e ) ), "C != E" );
	assert.ok( !( d.equals( f ) ), "D != F" );
	assert.ok( !( e.equals( g ) ), "E != G" );
	assert.ok( !( f.equals( a ) ), "F != A" );
	assert.ok( !( g.equals( b ) ), "G != B" );

	assert.ok( !( g.equals( b ) ), "G != B" );
	assert.ok( !( b.equals( g ) ), "B != G" );

} );
QUnit.test( "determinant()", function( assert ){
	assert.equal( a.determinant(), 0, "det( a )" );
	assert.equal( b.determinant(), 1, "det( b )" );
	assert.equal( c.determinant(), 20, "det( c )" );
	assert.equal( d.determinant(), 0, "det( d )" );
	assert.equal( e.determinant(), -2583, "det( e ) = -2583, got: " + e.determinant() );
	assert.ok( approxEquals( f.determinant(), 47.999, 0.01 ), "det( f ) ~= 47.999" );
	assert.equal( g.determinant(), 1, "det( g )" );
} );

QUnit.test( "inverse()", function( assert ){ //incomplete
	assert.ok( a.inverse() === undefined, "inverse( A ) expected undefined( determinant 0 ) ,  got:"+a.inverse() );
	assert.ok( d.inverse() === undefined, "inverse( D ) expected undefined( determinant 0 ) ,  got:"+d.inverse() );

	test = b.inverse();
	assert.ok( b.equals( test ), " inverse( I3 ) = I3" );
	test = c.inverse();
	assert.ok(
		approxEqMtx(
			test
			,[[-0.5,0.5,0],[0.55,-0.65,0.2],[0.2,0.4,-0.2]]
			,0.01
		 )
		,"inverse( C ): expected [[-0.5,0.5,0],[0.55,-0.65,0.2],[0.2,0.4,-0.2]] ,  got:"+JSON.stringify( test.matrix )
	 );
	test = e.inverse();

	assert.ok( approxEqMtx( test, [[0.0534,0.2493,-0.1219,-0.0027],[-0.0894,0.2493,-0.1219,-0.0027],[0.0005,0.0027,-0.0121,0.0108],[0.0360,-0.4986,1.2439,0.0054]], 0.0001 ), "inverse( E ): expected [[0.0534,0.2493,-0.1219,-0.0027],[-0.0894,0.2493,-0.1219,-0.0027],[0.0005,0.0027,-0.0121,0.0108],[0.0360,-0.4986,1.2439,0.0054]] ,  got:"+JSON.stringify( test.matrix ) );
	test = f.inverse();
	assert.ok( approxEqMtx( test, [[-0.0416,-0.3333,0.04166,0.6666],[-0.0833,0.3333,0.0833,-0.6666],[-0.4583,-0.1666,-0.0416,0.8333],[1.5833,0.1666,-0.0833,-0.8333]], 0.0001 ), "inverse( F ): expected [[-0.0416,-0.3333,0.04166,0.6666],[-0.0833,0.3333,0.0833,-0.6666],[-0.4583,0.1666,-0.0416,0.8333],[1.5833,0.1666,-0.0833,-0.8333]] ,  got:"+JSON.stringify( test.matrix ) );
	test = g.inverse();
	assert.ok( test.equals( g ), "inverse( I4 ) = I4" );
} );
QUnit.test( "transpose()", function( assert ){
	test = a.transpose();
	assert.equal( test.matrix[0][0], 1, "A: upper left" );
	assert.equal( test.matrix[0][1], 4, "A: upper mid" );
	assert.equal( test.matrix[0][2], 7, "A: upper right" );
	assert.equal( test.matrix[1][0], 2, "A: mid left" );
	assert.equal( test.matrix[1][2], 8, "A: mid right" );
	assert.equal( test.matrix[2][0], 3, "A: lower left" );
	assert.equal( test.matrix[2][1], 6, "A: lower mid" );
	test = b.transpose();
	assert.ok( b.equals( test ), "The transpose of the Identity Matrix is itself" );
} );
QUnit.test( "product()", function( assert ){
	var ac = a.product( c );
	var predictedAC = new Maph.Matrix( 3, [[28,24,9],[61,54,24],[94,84,39]] );
	assert.ok( ac.equals( predictedAC ), "A*C:: expected [[28,24,9],[61,54,24],[94,84,39]], got "+JSON.stringify( ac.matrix ) );
	var de = d.product( e );
	var predictedDE =  new Maph.Matrix( 4, [[11,-2,185,3.5],[22,-7,94,4],[33,-7,463,9.5],[35,-23,2,2]] );
	assert.ok( de.equals( predictedDE ), "D*E:: expected [[11,-2,185,3.5],[22,-7,94,4],[33,-7,463,9.5],[35,-23,2,2]], got "+JSON.stringify( de.matrix ) );
	assert.ok( a.equals( a.product( b ) ), "A * I( 3x3 ) = A" );
	assert.ok( f.equals( f.product( g ) ), "F * I( 4x4 ) = F" );
} );



QUnit.module( "Vector Initialization", {
	setup: function(){
	},
teardown: function(){}
} );
QUnit.test( "", function( assert ){
	a = new Maph.Vector( 1,2,3 );
  b = new Maph.Vector( 2,3,4 );
  c = new Maph.Vector( 92,1,0 );
  d = new Maph.Vector( 1 );
  e = new Maph.Vector();
  f= new Maph.Vector( 0.2,-5,-0.776 );
	assert.ok( a.x===1 &&a.y===2 &&a.z===3, "<Vector A initialized> expected( x=1,y=2,z=3 ):true,true,true,  got:"+( a.x===1 )+","+( a.y===2 )+","+( a.z===3 ) );
	assert.ok( b.x===2 &&b.y===3 &&b.z===4, "<Vector B initialized> expected( x=2,y=3,z=4 ):true,true,true,  got:"+( b.x===2 )+","+( b.y===3 )+","+( b.z===4 ) );
	assert.ok( c.x===92&&c.y===1 &&c.z===0, "<Vector C initialized> expected( x=92,y=1,z=0 ):true,true,true,  got:"+( c.x===92 )+","+( c.y===1 )+","+( c.z===0 ) );
	assert.ok( d.x===1 &&d.y===1 &&d.z===1, "<Vector D initialized with 1 arg> expected( x=1,y=1,z=1 ):true,true,true,  got:"+( d.x===1 )+","+( d.y===1 )+","+( d.z===1 ) );
	assert.ok( e.x===0 &&e.y===0 &&e.z===0, "<Vector E initialized with 0 args> expected( x=0,y=0,z=0 ) ,  got:"+( e.x )+","+( e.y )+","+( e.z ) );
	assert.ok( f.x===0.2&& f.y===-5 && f.z===-0.776,"<Vector F initialized> expected( x=0.2,y=-5,z=-0.776 ):true,true,true,  got:"+( e.x===0.2 )+","+( e.y===-5 )+","+( e.z===-0.776 ) )
} );

QUnit.module( "Vector/Vector Math", {
	setup: function(){
		a = new Maph.Vector( 1,2,3 ), b = new Maph.Vector( 2,3,4 ), c = new Maph.Vector( 92,1,0 ), d= new Maph.Vector( 1 ), e = new Maph.Vector(), f= new Maph.Vector( 0.2,-5,-0.776 );
		test = null;
	},
teardown: function(){}
} );
QUnit.test( "Equality", function( assert ){//equals: function( vector ) returns true/false
	test = new Maph.Vector( 1,2,3 );
	assert.equal( a.equals( test ), true, "a = test[1,2,3]" );
	assert.ok( b.equals( b ) );
	assert.ok( f.equals( f ) );
	assert.ok( !( f.equals( e ) ) );
	assert.ok( !( a.equals( b ) ) );
	assert.ok( !( f.equals( d ) ) );
	assert.ok( !( c.equals( a ) ) );
} );
QUnit.test( "Addition", function( assert ){//add: function( vector ) returns vector
	test = a.add( b );
	assert.ok( test.equals( new Maph.Vector( 3,5,7 ) ),"<Vector A+B> expected [3,5,7] ,  got: "+test.print() );
	test = d.add( f );
	assert.ok( test.equals( new Maph.Vector( 1.2,-4,( 1-0.776 ) ) ),"<Vector D+F> expected [1.2,-4,0.244] ,  got: "+test.print() );
	test = d.add( new Maph.Vector( -1 ) );
	assert.ok( test.equals( e ) );
	test = e.add( c );
	assert.ok( test.equals( c ),"<Vector E+C> expected [92,1,0] ,  got: "+test.print() );
} );
QUnit.test( "Subtraction", function( assert ){//sub: function( vector ) returns vector
	test = a.sub( b );
	assert.ok( test.equals( new Maph.Vector( -1,-1,-1 ) ),"<Vector A-B> expected [-1,-1,-1] ,  got: "+test.print() );
	test = d.sub( f );
	assert.ok( test.equals( new Maph.Vector( 0.8,6,1.776 ) ),"<Vector D-F> expected [0.8,6,1.776] ,  got: "+test.print() );
	test = c.sub( e );
	assert.ok( test.equals( c ),"<Vector C-E> expected [92,1,0] ,  got: "+test.print() );
	test = e.sub( a );
	assert.ok( test.equals( a.invert() ),"<Vector E-A> expected [-1,-2,-3] ,  got: "+test.print() );
} );
QUnit.test( "Dot Product", function( assert ){//dot: function( vector ) returns scalar
	assert.equal( a.dot( a ), 14,"<A•A> expected 14 ,  got: "+a.dot( a ) );
	assert.equal( a.dot( b ), 20,"<A•B> expected 20 ,  got: "+a.dot( b ) );
	assert.equal( a.dot( c ), 94,"<A•C> expected 94 ,  got: "+a.dot( c ) );
	assert.equal( a.dot( d ),  6,"<A•D> expected  6 ,  got: "+a.dot( d ) );
	assert.equal( a.dot( e ),  0,"<A•E> expected  0 ,  got: "+a.dot( e ) );
	assert.equal( a.dot( f ), -( 1516/125 ),"<A•F> expected "+( -( 1516/125 ) )+" ,  got: "+a.dot( f ) );
	assert.equal( e.dot( e ), 0,"<E•E> expected 0 ,  got: "+e.dot( e ) );
	assert.equal( d.dot( f ), -( 697/125 ), "<D•F> expected "+( -( 697/125 ) )+",  got: "+d.dot( f ) );
	assert.equal( f.dot( f ), ( 400659/15625 ),"<F•F> expected "+( 400659/15625 )+",  got: "+f.dot( f ) );
} );
QUnit.test( "Cross Product", function( assert ){//cross: function( vector ) returns vector
	test = a.cross( a );
	assert.ok( test.equals( e ), "<AxA> expected [0,0,0] ,  got: "+test.print() );
	test = f.cross( f );
	assert.ok( test.equals( e ), "<FxF> expected [0,0,0] ,  got: "+test.print() );
	test = a.cross( b );
	assert.ok( test.equals( new Maph.Vector( -1,2,-1 ) ), "<AxB> expected [-1,2,-1] ,  got: "+test.print() );
	test = b.cross( c );
	assert.ok( test.equals( new Maph.Vector( -4,368,-274 ) ), "<BxC> expected [-4,368,-274] ,  got: "+test.print() );
	test = d.cross( e );
	assert.ok( test.equals( new Maph.Vector( 0,0,0 ) ), "<DxE> expected [0,0,0] ,  got: "+test.print() );
	test = f.cross( b );
	assert.ok( approxEqVec( test, -( 2209/125 ), -294/125, 53/5, 0.1 ), "<FxB> expected ["+-( 2209/125 )+","+-294/125+","+53/5+"],  got: "+test.print() );
} );

QUnit.module( "Vector/Scalar Math", {
	setup: function(){
		a = new Maph.Vector( 1,2,3 ), b = new Maph.Vector( 2,3,4 ), c = new Maph.Vector( 92,1,0 ), d= new Maph.Vector( 1 ), e = new Maph.Vector(), f= new Maph.Vector( 0.2,-5,-0.776 );
		test = null;
	},
teardown: function(){}
} );
QUnit.test( "Multiply", function( assert ){//scalarMultiply: function( scalar ) returns vector
	test =  new Maph.Vector( 2,4,6 );
	g = a.scalarMultiply( 2 );
	assert.ok( test.equals( g ), "<Vector A*2> expected:"+test.print()+",  got:"+g.print() );

	test =  new Maph.Vector( 6,9,12 );
	g = b.scalarMultiply( 3 );
	assert.ok( test.equals( g ), "<Vector B*3> expected:"+test.print()+",  got:"+g.print() );

	test =  new Maph.Vector( 46,0.5,0 );
	g = c.scalarMultiply( 0.5 );
	assert.ok( test.equals( g ), "<Vector C*0.5> expected:"+test.print()+",  got:"+g.print() );

	test =  new Maph.Vector( -5.75,-5.75,-5.75 );
	g = d.scalarMultiply( -5.75 );
	assert.ok( test.equals( g ), "<Vector D*-5.75> expected:"+test.print()+",  got:"+g.print() );

	test =  new Maph.Vector( 0,0,0 );
	g = e.scalarMultiply( 1000000 );
	assert.ok( test.equals( g ), "<Vector E*1000000> expected:"+test.print()+",  got:"+g.print() );

	test =  new Maph.Vector( -0.44,11,1.7072 );
	g = f.scalarMultiply( -2.2 );
	assert.ok( approxEqVec( g,-0.44,11,1.7072,0.001 ), "<Vector F*-2.2> expected:"+test.print()+",  got:"+g.print() );
} );
QUnit.test( "Divide", function( assert ){//scalarDivide: function( scalar ) returns vector
	test =  new Maph.Vector( 0.5,1,1.5 );
	g = a.scalarDivide( 2 );
	assert.ok( test.equals( g ), "<Vector A/2> expected:"+test.print()+",  got:"+g.print() );

	test =  new Maph.Vector( (2/3 ),1,( 4/3 ) );
	g = b.scalarDivide( 3 );
	assert.ok( approxEqVec( g,( 2/3 ),1,( 4/3 ),0.0001 ), "<Vector B/3> expected:"+test.print()+",  got:"+g.print() );

	test =  new Maph.Vector( 184,2,0 );
	g = c.scalarDivide( 0.5 );
	assert.ok( test.equals( g ), "<Vector C/0.5> expected:"+test.print()+",  got:"+g.print() );

	test = new Maph. Vector( (1/( -5.75 ) ),( 1/( -5.75 ) ),( 1/( -5.75 ) ) );
	g = d.scalarDivide( -5.75 );
	assert.ok( test.equals( g ), "<Vector D/-5.75> expected:"+test.print()+",  got:"+g.print() );

	test =  new Maph.Vector( 0,0,0 );
	g = e.scalarDivide( 1000000 );
	assert.ok( test.equals( g ), "<Vector E/1000000> expected:"+test.print()+",  got:"+g.print() );

	test =  new Maph.Vector( (0.2/( -2.2 ) ),( -5/( -2.2 ) ),( -0.776/( -2.2 ) ) );
	g = f.scalarDivide( -2.2 );
	assert.ok( test.equals( g ), "<Vector F/( -2.2 )> expected:"+test.print()+",  got:"+g.print() );
} );

QUnit.module( "Vector Transformations", {
	setup: function(){
		a = new Maph.Vector( 1,2,3 );
		b = new Maph.Vector( 2,3,4 );
		c = new Maph.Vector( 92,1,0 );
		d= new Maph.Vector( 1 );
		e = new Maph.Vector();
		f= new Maph.Vector( 0.2,-5,-0.776 );
		test = null;
	},
teardown: function(){}
} );
QUnit.test( "Normalization", function( assert ){//normalize: function() returns vector
	test = a.normalize();
	g =  new Maph.Vector( (a.x/a.magnitude() ),( a.y/a.magnitude() ), ( a.z/a.magnitude() ) );
	assert.ok( test.equals( g ), "A, expected:" + g.print() + ",  got:" + test.print() );

	test = b.normalize();
	g =  new Maph.Vector( (b.x/b.magnitude() ),( b.y/b.magnitude() ), ( b.z/b.magnitude() ) );
	assert.ok( test.equals( g ), "B, expected:" +g.print() + ",  got:" + test.print() );

	test = c.normalize();
	g =  new Maph.Vector( (c.x/c.magnitude() ),( c.y/c.magnitude() ), ( c.z/c.magnitude() ) );
	assert.ok( test.equals( g ), "C, expected:" +g.print() + ",  got:" + test.print() );

	test = d.normalize();
	g =  new Maph.Vector( (d.x/d.magnitude() ),( d.y/d.magnitude() ), ( d.z/d.magnitude() ) );
	assert.ok( test.equals( g ), "D, expected:" +g.print() + ",  got:"+test.print() );

	test = e.normalize();
	g =  new Maph.Vector( 0,0,0 );
	assert.ok( test.equals( g ), "E, expected:" + g.print() + ",  got:"+test.print() );

	test = f.normalize();
	g =  new Maph.Vector( (f.x/f.magnitude() ),( f.y/f.magnitude() ), ( f.z/f.magnitude() ) ); ( (a.x/a.magnitude() ),( a.y/a.magnitude() ), ( a.z/a.magnitude() ) );
	assert.ok( test.equals( g ), "F, expected:" + g.print() + ",  got:"+test.print() );
} );
QUnit.test( "Inversion", function( assert ){//invert: function() returns vector
	test = a.invert();
	assert.ok( a.add( test ).magnitude() == 0, "A+!A, expected 0,  got:"+a.add( test ).magnitude() );
	test = b.invert();
	assert.ok( b.add( test ).magnitude() == 0, "B+!B expected 0,  got:"+b.add( test ).magnitude() );
	test = c.invert();
	assert.ok( c.add( test ).magnitude() == 0, "C+!C expected 0,  got:"+c.add( test ).magnitude() );
	test = d.invert();
	assert.ok( d.add( test ).magnitude() == 0, "D+!D expected 0,  got:"+d.add( test ).magnitude() );
	test = e.invert();
	assert.ok( e.add( test ).magnitude() == 0, "E+!E expected 0,  got:"+e.add( test ).magnitude() );
	test = f.invert();
	assert.ok( f.add( test ).magnitude() == 0, "F+!F expected 0,  got:"+f.add( test ).magnitude() );
} ); // could use more test coverage
QUnit.test( "Matrix Transformation", function( assert ){//transform: function( matrix ) returns vector
	g  = new Maph.Matrix( 3 );
	g2 = new Maph.Matrix( 4 );
  console.log(a);
  console.log(a.transform(g));
	assert.ok( a.equals( a.transform( g  ) ), "a * I3 == a" );
	assert.ok( a.equals( a.transform( g2 ) ), "a * I4 == a"  );
	assert.ok( b.equals( b.transform( g  ) ), "b * I3 == b"  );
	assert.ok( b.equals( b.transform( g2 ) ), "b * I4 == b"  );
	assert.ok( c.equals( c.transform( g  ) ), "c * I3 == c"  );
	assert.ok( c.equals( c.transform( g2 ) ), "c * I4 == c"  );
	assert.ok( d.equals( d.transform( g  ) ), "d * I3 == d"  );
	assert.ok( d.equals( d.transform( g2 ) ), "d * I4 == d"  );
	assert.ok( e.equals( e.transform( g  ) ), "e * I3 == e"  );
	assert.ok( e.equals( e.transform( g2 ) ), "e * I4 == e"  );
	assert.ok( f.equals( f.transform( g  ) ), "f * I3 == f"  );
	assert.ok( f.equals( f.transform( g2 ) ), "f * I4 == f"  );

	g = new Maph.Matrix( 3, [[1,2,3],[4,5,6],[7,8,9]] );

	test = a.transform( g );
	assert.ok(
		test.equals( new Maph.Vector( 30, 36, 42 ) )
		,"a * [[1,2,3],[4,5,6],[7,8,9]]. Expected [30,36,42].  Got: " + test.print()
	 );

	test = b.transform( g );
	assert.ok(
		test.equals( new Maph.Vector( 42, 51, 60 ) )
		,"b * [[1,2,3],[4,5,6],[7,8,9]]. Expected [42,51,60].  Got: " + test.print()
	 );

	test = c.transform( g );
	assert.ok(
		test.equals( new Maph.Vector( 96, 189, 282 ) )
		,"c * [[1,2,3],[4,5,6],[7,8,9]]. Expected [96,189,282].  Got: " + test.print()
	 );

	test = d.transform( g );
	assert.ok(
		test.equals( new Maph.Vector( 12, 15, 18 ) )
		, "d * [[1,2,3],[4,5,6],[7,8,9]]. Expected [12,15,18].  Got: " + test.print()
	 );

	test = e.transform( g );
	assert.ok(
		test.equals( new Maph.Vector( 0, 0, 0 ) )
		, "e * [[1,2,3],[4,5,6],[7,8,9]]. Expected [0,0,0].  Got: " + test.print()
	 );

	test = f.transform( g );
	assert.ok(
		approxEqVec( test, -25.232, -30.808, -36.384, 0.01 )
		,"f * [[1,2,3],[4,5,6],[7,8,9]]. Expected approximately [-25.232,-30.808,-36.384], testing with 0.01 tolerance. Got: " + test.print()
	 );

	g2 = new Maph.Matrix( 4, [[0.5,-2,3,7],[1,1,0,0],[-0.5, 73, 0, 0.6],[-11.77,23,0,1]] );

	test = a.transform( g2 );
	assert.ok(
		approxEqVec( test, -1.098, 24.693, 0.306, 0.01 )
		, "a * [[0.5,-2,3,7],[1,1,0,0],[-0.5, 73, 0, 0.6],[-11.77,23,0,1]]. Expected approximately [-1.098,24.693,0.306], testing with 0.01 tolerance. Got: " + test.print()
	 );

	test = b.transform( g2 );
	assert.ok(
		approxEqVec( test, -0.5614, 18.04597, 0.3448, 0.01 )
		,"b * [[0.5,-2,3,7],[1,1,0,0],[-0.5, 73, 0, 0.6],[-11.77,23,0,1]]. Expected approximately [-0.5614, 18.04597, 0.3448], testing with 0.01 tolerance. Got: " + test.print()
	 );

	test = c.transform( g2 );
	assert.ok(
		approxEqVec( test, 0.05443, -0.2476, 0.4278, 0.01 )
		,"c * [[0.5,-2,3,7],[1,1,0,0],[-0.5, 73, 0, 0.6],[-11.77,23,0,1]]. Expected approximately [0.05443,-0.2476,0.4278], testing with 0.01 tolerance. Got: " + test.print()
	 );
	assert.ok(
		approxEqVec( test, 0.05443, -0.2476, 0.4278, 0.001 )
		,"c * [[0.5,-2,3,7],[1,1,0,0],[-0.5, 73, 0, 0.6],[-11.77,23,0,1]]. Expected approximately [0.05443,-0.2476,0.4278], testing with 0.001 tolerance. Got: " + test.print()
	 );

	test = d.transform( g2 );
	assert.ok(
		approxEqVec( test, -1.2523, 11.0465, 0.3488, 0.01 )
		,"d * [[0.5,-2,3,7],[1,1,0,0],[-0.5, 73, 0, 0.6],[-11.77,23,0,1]]. Expected approximately [-1.2523,11.0465,0.3488], testing with 0.01 tolerance. Got: " + test.print()
	 );

	test = e.transform( g2 );
	assert.ok(
		approxEqVec( test, -11.77, 23, 0, 0.01 )
		,"e * [[0.5,-2,3,7],[1,1,0,0],[-0.5, 73, 0, 0.6],[-11.77,23,0,1]]. Expected approximately [-11.77, 23, 0], testing with 0.01 tolerance. Got: " + test.print()
	 );

	test = f.transform( g2 );
	assert.ok(
		approxEqVec( test, -8.41708, -20.1861, 0.3101, 0.01 )
		,"f * [[0.5,-2,3,7],[1,1,0,0],[-0.5, 73, 0, 0.6],[-11.77,23,0,1]]. Expected approximately [-8.41708, -20.1861, 0.3101], testing with 0.01 tolerance. Got: " + test.print()
	 );

} );

QUnit.module( "Vector Miscellaneous", {
	setup: function(){
		a = new Maph.Vector( 1,2,3 ), b = new Maph.Vector( 2,3,4 ), c = new Maph.Vector( 92,1,0 ), d= new Maph.Vector( 1 ), e = new Maph.Vector(), f= new Maph.Vector( 0.2,-5,-0.776 );
		test = null;
	},
teardown: function(){}
} );
QUnit.test( "Magnitude ", function( assert ){//magnitude: function() returns scalar
	assert.equal( a.magnitude(), Math.sqrt( 14 ), 	"A, expected: " + Math.sqrt( 14 ) +   ",  got:" + a.magnitude() );
	assert.equal( b.magnitude(), Math.sqrt( 29 ), 	"B, expected: " + Math.sqrt( 29 ) +   ",  got:" + b.magnitude() );
	assert.equal( c.magnitude(), Math.sqrt( 8465 ), "C, expected: " + Math.sqrt( 8465 ) + ",  got:" + c.magnitude() );
	assert.equal( d.magnitude(), Math.sqrt( 3 ), 	"D, expected: " + Math.sqrt( 3 ) +    ",  got:" + d.magnitude() );
	assert.equal( e.magnitude(), 0, 				"E, expected: 0,  got:"                         + e.magnitude() );
} );
QUnit.test( "Pretty Printing  ", function( assert ){ // prettyPrint: function() returns string
	assert.equal( a.prettyPrint(), "Vector(x,y,z):[1,2,3]",  "A, expected: Vector(x,y,z):[1,2,3], got:" + a.prettyPrint() );
	assert.equal( b.prettyPrint(), "Vector(x,y,z):[2,3,4]",  "B, expected: Vector(x,y,z):[2,3,4], got:" + b.prettyPrint() );
	assert.equal( c.prettyPrint(), "Vector(x,y,z):[92,1,0]", "C, expected: Vector(x,y,z):[92,1,0], got:"+ c.prettyPrint() );
	assert.equal( d.prettyPrint(), "Vector(x,y,z):[1,1,1]",  "D, expected: Vector(x,y,z):[1,1,1], got:" + d.prettyPrint() );
	assert.equal( e.prettyPrint(), "Vector(x,y,z):[0,0,0]",  "E, expected: Vector(x,y,z):[0,0,0], got:" + e.prettyPrint() );
} );
QUnit.test( "Simple Printing  ", function( assert ){ // print: function() returns string
	assert.equal( a.print(), "[1,2,3]",  "A, expected: [1,2,3], got: " + a.print() );
	assert.equal( b.print(), "[2,3,4]",  "B, expected: [2,3,4], got: " + b.print() );
	assert.equal( c.print(), "[92,1,0]", "C, expected: [92,1,0], got: "+ c.print() );
	assert.equal( d.print(), "[1,1,1]",  "D, expected: [1,1,1], got: " + d.print() );
	assert.equal( e.print(), "[0,0,0]",  "E, expected: [0,0,0], got: " + e.print() );
} );
