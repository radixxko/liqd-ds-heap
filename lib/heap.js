'use strict';

/* istanbul ignore next */
if( !Array.prototype.values )
{
	Object.defineProperty( Array.prototype, 'values',
	{
		value: Array.prototype[Symbol.iterator],
		configurable: false,
		writable: false
	});
}

module.exports = class Heap
{
	constructor( comparator )
	{
		this.data = new Array();
		this.compare = comparator ? comparator : ( a, b ) => a < b ? -1 : 1;
	}

	static from( container, comparator )
	{
		let heap = new Heap( comparator );

		for( const item of container.values() )
		{
			heap.push( item );
		}

		return heap;
	}

	_sift_up( i )
	{
		let pi = ( i - 1 ) >> 1;

		while( i > 0 && this.compare( this.data[i], this.data[pi] ) < 0 )
		{
			let v = this.data[i];
			this.data[i] = this.data[pi];
			this.data[pi] = v;

			i = pi;
			pi = ( i - 1 ) >> 1;
		}
	}

	_sift_down( i )
	{
		let ci = 2 * i + 1;

		while( ci < this.data.length )
		{
			ci = this.data.length > ci + 1 && this.compare( this.data[ci+1], this.data[ci] ) < 0 ? ci + 1 : ci;

			if( this.compare( this.data[ci], this.data[i] ) < 0 )
			{
				let v = this.data[i];
				this.data[i] = this.data[ci];
				this.data[ci] = v;

				i = ci;
				ci = 2 * i + 1;
			}
			else{ break; }
		}
	}

	get size()
	{
		return this.data.length;
	}

	top()
	{
		return this.data.length ? this.data[0] : undefined;
	}

	push( value )
	{
		this.data.push( value );

		this._sift_up( this.data.length - 1 );
	}

	pop()
	{
		if( this.data.length )
		{
			let last = this.data.pop();

			if( this.data.length )
			{
				let top = this.data[0]; this.data[0] = last;

				this._sift_down( 0 );

				return top;
			}
			else{ return last; }
		}
		else{ return undefined; }
	}

	sort()
	{
		let data = this.data; this.data = new Array();

		for( const item of data )
		{
			this.push( item );
		}
	}
}
