# request-animation-frames

> Use [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) as an async iterable, in any JavaScript environment

This package [ponyfills](https://ponyfill.com) `requestAnimationFrame` internally when not available, so it works in any JavaScript environment.

## Install

```sh
npm install request-animation-frames
```

## Usage

```js
import requestAnimationFrames from 'request-animation-frames';

for await (const timestamp of requestAnimationFrames()) {
	console.log('Animation frame timestamp:', timestamp);
	drawVisualization();
}
```

## API

### requestAnimationFrames()

Returns an [`AsyncIterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_async_iterator_and_async_iterable_protocols) that yields animation frame [timestamps](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp).

The first timestamp is yielded right away for easier setup.

## FAQ

### How do I stop the iteration?

Simply `return` or `break` in the loop body.

### How do I stop the iteration from the outside?

```js
import requestAnimationFrames from 'request-animation-frames';

let shouldStop = false;

(async () => {
	for await (const timestamp of requestAnimationFrames()) {
		if (shouldStop) {
			break;
		}

		console.log('Animation frame timestamp:', timestamp);
	}
})();

setTimeout(() => {
	shouldStop = true;
}, 10000);
```

## Related

- [dom-mutations](https://github.com/sindresorhus/dom-mutations) - Observe changes to the DOM using an async iterable
