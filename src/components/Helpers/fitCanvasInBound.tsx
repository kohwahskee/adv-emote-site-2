/**
 * Fit the container back in the parent boundary when it is not visible when dragged out of the canvas/parent boundary.
 *
 * @param container The container of the icons, usually the element that is being dragged
 * @param parent The container of the parent, basically the parent boundary.
 */
export default function fitBoundInCanvas(container: HTMLElement, parent: HTMLElement) {
	const containerBound = container.getBoundingClientRect();
	const parentBound = parent.getBoundingClientRect();

	if (containerBound.right < parentBound.left + parentBound.width / 2) {
		setPosition(null, 0 - containerBound.width + parentBound.width / 2, container);
	}
	if (containerBound.left > parentBound.left + parentBound.width / 2) {
		setPosition(null, parentBound.width / 2, container);
	}
	if (containerBound.bottom < parentBound.top + parentBound.height / 2) {
		setPosition(0 - containerBound.height + parentBound.height / 2, null, container);
	}
	if (containerBound.top > parentBound.top + parentBound.height / 2) {
		setPosition(parentBound.height / 2, null, container);
	}

	function setPosition(top: number | null, left: number | null, element: HTMLElement) {
		if (top !== null) {
			element.style.top = `${top}px`;
		}
		if (left !== null) {
			element.style.left = `${left}px`;
		}
	}
}
