/**
@returns An async iterable that yields animation frame [timestamps](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp).

The first timestamp is yielded right away for easier setup.

@example
```
import requestAnimationFrames from 'request-animation-frames';

for await (const timestamp of requestAnimationFrames()) {
	console.log('Animation frame timestamp:', timestamp);
	drawVisualization();
}
```
*/
export default function requestAnimationFrames(): AsyncIterable<number>;
