import React from 'react';

/**
 * Fit the container back in the parent boundary when it is not visible when dragged out of the canvas/parent boundary.
 *
 * @param container The container of the icons, usually the element that is being dragged
 * @param parent The container of the parent, basically the parent boundary.
 */
export default function fitBoundInCanvas(
	container: HTMLElement,
	parent: HTMLElement,
	setPositionFn: React.Dispatch<
		React.SetStateAction<{
			top: number;
			left: number;
		}>
	>
) {
	const containerBound = container.getBoundingClientRect();
	const parentBound = parent.getBoundingClientRect();

	if (containerBound.right < parentBound.right) {
		setPositionFn((prev) => ({
			...prev,
			left: 0 - (containerBound.width - parentBound.width),
		}));
	}
	if (containerBound.left > parentBound.left) {
		setPositionFn((prev) => ({
			...prev,
			left: 0,
		}));
	}
	if (containerBound.bottom < parentBound.bottom) {
		setPositionFn((prev) => ({
			...prev,
			top: 0 - (containerBound.height - parentBound.height),
		}));
	}
	if (containerBound.top > parentBound.top) {
		setPositionFn((prev) => ({
			...prev,
			top: 0,
		}));
	}

	// function setPosition(top: number | null, left: number | null, element: HTMLElement) {
	// 	if (top !== null) {
	// 		element.style.top = `${top}px`;
	// 	}
	// 	if (left !== null) {
	// 		element.style.left = `${left}px`;
	// 	}
	// }
}
