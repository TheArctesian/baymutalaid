export function createScrollObserver(
	container: HTMLElement,
	onVisibleChange: (index: number, element: HTMLElement) => void
): IntersectionObserver {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const index = parseInt(entry.target.getAttribute('data-meal-index') || '0', 10);
					onVisibleChange(index, entry.target as HTMLElement);
				}
			});
		},
		{
			root: container,
			rootMargin: '-50% 0px -50% 0px',
			threshold: 0
		}
	);

	return observer;
}

export function observeElements(observer: IntersectionObserver, elements: NodeList) {
	elements.forEach((element) => observer.observe(element as Element));
}

export function unobserveElements(observer: IntersectionObserver, elements: NodeList) {
	elements.forEach((element) => observer.unobserve(element as Element));
}
