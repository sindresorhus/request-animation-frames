/**
@returns An async iterable that yields animation frame timestamps.

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
