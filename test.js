import test from 'ava';
import requestAnimationFrames from './index.js';

test('generates timestamps', async t => {
	const rafIterable = requestAnimationFrames();
	const iterator = rafIterable[Symbol.asyncIterator]();
	const {value: firstTimeStamp} = await iterator.next();
	const {value: secondTimeStamp} = await iterator.next();

	t.is(typeof firstTimeStamp, 'number');
	t.is(typeof secondTimeStamp, 'number');
	t.true(secondTimeStamp > firstTimeStamp);
	iterator.return();
});

test('iterator completes on return', async t => {
	const rafIterable = requestAnimationFrames();
	const iterator = rafIterable[Symbol.asyncIterator]();
	await iterator.next();
	const {done} = await iterator.return();
	t.true(done);
});

test('handles multiple iterations', async t => {
	const rafIterable = requestAnimationFrames();
	const iterator = rafIterable[Symbol.asyncIterator]();

	await iterator.next();
	const {value: timeStamp1} = await iterator.next();
	const {value: timeStamp2} = await iterator.next();

	t.is(typeof timeStamp1, 'number');
	t.is(typeof timeStamp2, 'number');
	t.true(timeStamp2 > timeStamp1);

	iterator.return();
});

test('works in non-browser environment', async t => {
	const originalRequestAnimationFrame = globalThis.requestAnimationFrame;
	const originalCancelAnimationFrame = globalThis.cancelAnimationFrame;
	globalThis.requestAnimationFrame = undefined;
	globalThis.cancelAnimationFrame = undefined;

	const rafIterable = requestAnimationFrames();
	const iterator = rafIterable[Symbol.asyncIterator]();

	const {value: timeStamp} = await iterator.next();

	t.is(typeof timeStamp, 'number');

	iterator.return();

	globalThis.requestAnimationFrame = originalRequestAnimationFrame;
	globalThis.cancelAnimationFrame = originalCancelAnimationFrame;
});
