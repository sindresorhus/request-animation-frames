export default function requestAnimationFrames() {
	const hasRaf = typeof globalThis.requestAnimationFrame === 'function';

	const requestFrame = callback => hasRaf
		? globalThis.requestAnimationFrame(callback)
		: setTimeout(() => callback(performance.now()), 16);

	const cancelFrame = id => {
		if (hasRaf) {
			globalThis.cancelAnimationFrame(id);
		} else {
			clearTimeout(id);
		}
	};

	return {
		async * [Symbol.asyncIterator]() {
			let requestId;

			try {
				yield performance.now();

				// Ensure the RAF timestamp comes after our custom one.
				// In some cases without this, the `performance.now()`
				// call above would return the same timestamp as RAF.
				await new Promise(resolve => {
					setTimeout(resolve, 1);
				});

				while (true) {
					yield await new Promise(resolve => { // eslint-disable-line no-await-in-loop
						requestId = requestFrame(resolve);
					});
				}
			} finally {
				cancelFrame(requestId);
			}
		},
	};
}
