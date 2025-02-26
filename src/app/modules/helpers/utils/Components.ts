function handleModalPosition(
  position: { clientX: number; clientY: number },
  id: string,
): { x: number; y: number } | null {
  const dynamicModalElement = document.querySelector(id);

  if (!dynamicModalElement) return null;

  const dimensions = dynamicModalElement.getBoundingClientRect();

  const modalWith: number = dimensions.width;
  const modalHeight: number = dimensions.height;

  const positionY: number =
    window.innerHeight - position.clientY < modalHeight
      ? position.clientY - modalHeight - 5
      : position.clientY + 15;
  const positionX: number =
    window.innerWidth - position.clientX < modalWith
      ? position.clientX - modalWith
      : position.clientX;

  return { x: positionX, y: positionY };
}

export { handleModalPosition };
