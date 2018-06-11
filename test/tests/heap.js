'use strict';

const assert = require('assert' );

const Heap = require('../../lib/heap');

describe('- default comparator', function()
{
	it('should create heap and pop items', function()
	{
		let heap, arr = new Array(), it = 0;

		for( let i = 0; i < 1000; ++i )
		{
			let v = Math.ceil( Math.random() * Number.MAX_SAFE_INTEGER );

			arr.push( v );
		}

		heap = Heap.from( arr );

		assert.ok( heap.size === arr.length );

		arr.sort( ( a, b ) => a < b ? -1 : 1 );

		while( heap.size )
		{
			let hv = heap.top();

			assert.ok( hv === heap.pop() );
			assert.ok( hv === arr.shift() );
			assert.ok( heap.size === arr.length );

			if( Math.random() < 0.35 )
			{
				let v = Math.ceil( Math.random() * Number.MAX_SAFE_INTEGER / 2 );

				heap.push( v );
				arr.push( v );

				assert.ok( heap.size === arr.length );

				arr.sort( ( a, b ) => a < b ? -1 : 1 );
			}

			if( Math.random() < 0.1 )
			{
				heap.sort();
			}
		}

		assert.ok( heap.size === 0 );
		assert.ok( heap.top() === undefined );
		assert.ok( heap.pop() === undefined );
	});
});

describe('- custom comparator', function()
{
	it('should create heap and pop items', function()
	{
		let heap = new Heap, arr = new Array(), it = 0, sortFn = ( a, b ) => a === b ? 0 : ( a < b ? 1 : -1 );

		for( let i = 0; i < 1000; ++i )
		{
			let v = Math.ceil( Math.random() * Number.MAX_SAFE_INTEGER );

			arr.push( v );
		}

		heap = Heap.from( arr, sortFn );

		assert.ok( heap.size === arr.length );

		arr.sort( sortFn );

		while( heap.size )
		{
			let hv = heap.top();

			assert.strictEqual( hv, heap.pop() );
			assert.strictEqual( hv, arr.shift() );
			assert.strictEqual( heap.size, arr.length );

			if( Math.random() < 0.35 )
			{
				let v = Math.ceil( Math.random() * Number.MAX_SAFE_INTEGER / 2 );

				heap.push( v );
				arr.push( v );

				assert.strictEqual( heap.size, arr.length );

				arr.sort( sortFn );
			}

			if( Math.random() < 0.1 )
			{
				heap.sort();
			}
		}

		assert.ok( heap.size === 0 );
		assert.ok( heap.top() === undefined );
		assert.ok( heap.pop() === undefined );
	});
});
