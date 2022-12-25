/* eslint-disable no-param-reassign */
export default function scaleToFit(parentContainer: HTMLElement, iconList: HTMLElement[]) {
	// COLLISION DETECTION
	const parentBounds = parentContainer.getBoundingClientRect();

	iconList.forEach((icon) => {
		const iconBound = icon.getBoundingClientRect();
		const currentScale = parseFloat(icon.style.transform.substring(6)) || 1;
		const currentIconWidth = icon.getBoundingClientRect().width;
		const iconTrueWidth = currentIconWidth / currentScale;
		const newIconMiddlePoint = {
			x: iconBound.left + iconBound.width / 2,
			y: iconBound.top + iconBound.height / 2,
		};

		function iconScale(
			baseParentBound: number,
			baseIconBound: number,
			scaleDirection: 'up' | 'down'
		) {
			let newScale = 1;
			const distance = Math.abs(baseParentBound - baseIconBound);
			if (scaleDirection === 'up') {
				newScale = (1 + (distance * 2) / currentIconWidth) * currentScale;
			} else if (scaleDirection === 'down') {
				newScale = (1 - (distance * 2) / currentIconWidth) * currentScale;
			}
			if (newScale > 1) {
				newScale = 1;
			} else if (newScale <= 0.001) {
				newScale = 0.001;
			}

			return newScale;
		}

		// If icon is visible inside canvas
		if (
			newIconMiddlePoint.x > parentBounds.left &&
			newIconMiddlePoint.x < parentBounds.right &&
			newIconMiddlePoint.y > parentBounds.top &&
			newIconMiddlePoint.y < parentBounds.bottom
		) {
			const shouldLeftScale = newIconMiddlePoint.x <= parentBounds.left + iconTrueWidth / 2;
			const shouldTopScale = newIconMiddlePoint.y <= parentBounds.top + iconTrueWidth / 2;
			const shouldRightScale = newIconMiddlePoint.x >= parentBounds.right - iconTrueWidth / 2;
			const shouldBottomScale = newIconMiddlePoint.y >= parentBounds.bottom - iconTrueWidth / 2;

			let newScale;
			let horizontalScale;
			let verticalScale;

			if (shouldLeftScale) {
				horizontalScale = iconScale(
					parentBounds.left,
					iconBound.left,
					iconBound.left < parentBounds.left ? 'down' : 'up'
				);
			}
			if (shouldTopScale) {
				verticalScale = iconScale(
					parentBounds.top,
					iconBound.top,
					iconBound.top < parentBounds.top ? 'down' : 'up'
				);
			}
			if (shouldRightScale) {
				horizontalScale = iconScale(
					parentBounds.right,
					iconBound.right,
					iconBound.right > parentBounds.right ? 'down' : 'up'
				);
			}
			if (shouldBottomScale) {
				verticalScale = iconScale(
					parentBounds.bottom,
					iconBound.bottom,
					iconBound.bottom > parentBounds.bottom ? 'down' : 'up'
				);
			}

			horizontalScale = horizontalScale || 1;
			const newBoundAfterHorizontalScale = {
				left: newIconMiddlePoint.x - (iconTrueWidth * horizontalScale) / 2,
				top: newIconMiddlePoint.y - (iconTrueWidth * horizontalScale) / 2,
				right: newIconMiddlePoint.x + (iconTrueWidth * horizontalScale) / 2,
				bottom: newIconMiddlePoint.y + (iconTrueWidth * horizontalScale) / 2,
			};

			if (horizontalScale && verticalScale) {
				if (
					newBoundAfterHorizontalScale.left >= parentBounds.left &&
					newBoundAfterHorizontalScale.right <= parentBounds.right &&
					newBoundAfterHorizontalScale.top >= parentBounds.top &&
					newBoundAfterHorizontalScale.bottom <= parentBounds.bottom
				) {
					newScale = horizontalScale;
				} else {
					newScale = verticalScale;
				}
			} else {
				newScale = horizontalScale || verticalScale;
			}

			// If all 4 shouldScale are false -> no scale (Basically when icon is in the middle of canvas and isn't close to any edge, then automatically scale to full size)
			// This prevents iconScale() from behaving weirdly when it's supposed to calculate scale when icon is at full scale (1)
			// Mouse Event sucks.
			if (!shouldLeftScale && !shouldTopScale && !shouldRightScale && !shouldBottomScale) {
				newScale = 1;
			}
			icon.style.transform = `scale(${newScale})`;
		} else {
			icon.style.transform = `scale(0.01)`;
		}
	});
}
