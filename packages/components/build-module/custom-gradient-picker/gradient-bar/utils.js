/**
 * Internal dependencies
 */
import { MINIMUM_DISTANCE_BETWEEN_POINTS } from './constants';
/**
 * Clamps a number between 0 and 100.
 *
 * @param value Value to clamp.
 *
 * @return Value clamped between 0 and 100.
 */
export function clampPercent(value) {
  return Math.max(0, Math.min(100, value));
}

/**
 * Check if a control point is overlapping with another.
 *
 * @param value        Array of control points.
 * @param initialIndex Index of the position to test.
 * @param newPosition  New position of the control point.
 * @param minDistance  Distance considered to be overlapping.
 *
 * @return True if the point is overlapping.
 */
export function isOverlapping(value, initialIndex, newPosition, minDistance = MINIMUM_DISTANCE_BETWEEN_POINTS) {
  const initialPosition = value[initialIndex].position;
  const minPosition = Math.min(initialPosition, newPosition);
  const maxPosition = Math.max(initialPosition, newPosition);
  return value.some(({
    position
  }, index) => {
    return index !== initialIndex && (Math.abs(position - newPosition) < minDistance || minPosition < position && position < maxPosition);
  });
}

/**
 * Adds a control point from an array and returns the new array.
 *
 * @param points   Array of control points.
 * @param position Position to insert the new point.
 * @param color    Color to update the control point at index.
 *
 * @return New array of control points.
 */
export function addControlPoint(points, position, color) {
  const nextIndex = points.findIndex(point => point.position > position);
  const newPoint = {
    color,
    position
  };
  const newPoints = points.slice();
  newPoints.splice(nextIndex - 1, 0, newPoint);
  return newPoints;
}

/**
 * Removes a control point from an array and returns the new array.
 *
 * @param points Array of control points.
 * @param index  Index to remove.
 *
 * @return New array of control points.
 */
export function removeControlPoint(points, index) {
  return points.filter((_point, pointIndex) => {
    return pointIndex !== index;
  });
}
/**
 * Updates a control point from an array and returns the new array.
 *
 * @param points   Array of control points.
 * @param index    Index to update.
 * @param newPoint New control point to replace the index.
 *
 * @return New array of control points.
 */
export function updateControlPoint(points, index, newPoint) {
  const newValue = points.slice();
  newValue[index] = newPoint;
  return newValue;
}

/**
 * Updates the position of a control point from an array and returns the new array.
 *
 * @param points      Array of control points.
 * @param index       Index to update.
 * @param newPosition Position to move the control point at index.
 *
 * @return New array of control points.
 */
export function updateControlPointPosition(points, index, newPosition) {
  if (isOverlapping(points, index, newPosition)) {
    return points;
  }
  const newPoint = {
    ...points[index],
    position: newPosition
  };
  return updateControlPoint(points, index, newPoint);
}

/**
 * Updates the position of a control point from an array and returns the new array.
 *
 * @param points   Array of control points.
 * @param index    Index to update.
 * @param newColor Color to update the control point at index.
 *
 * @return New array of control points.
 */
export function updateControlPointColor(points, index, newColor) {
  const newPoint = {
    ...points[index],
    color: newColor
  };
  return updateControlPoint(points, index, newPoint);
}

/**
 * Updates the position of a control point from an array and returns the new array.
 *
 * @param points   Array of control points.
 * @param position Position of the color stop.
 * @param newColor Color to update the control point at index.
 *
 * @return New array of control points.
 */
export function updateControlPointColorByPosition(points, position, newColor) {
  const index = points.findIndex(point => point.position === position);
  return updateControlPointColor(points, index, newColor);
}

/**
 * Gets the horizontal coordinate when dragging a control point with the mouse.
 *
 * @param mouseXcoordinate Horizontal coordinate of the mouse position.
 * @param containerElement Container for the gradient picker.
 *
 * @return Whole number percentage from the left.
 */

export function getHorizontalRelativeGradientPosition(mouseXCoordinate, containerElement) {
  if (!containerElement) {
    return;
  }
  const {
    x,
    width
  } = containerElement.getBoundingClientRect();
  const absolutePositionValue = mouseXCoordinate - x;
  return Math.round(clampPercent(absolutePositionValue * 100 / width));
}
//# sourceMappingURL=utils.js.map