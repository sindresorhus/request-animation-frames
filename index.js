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
