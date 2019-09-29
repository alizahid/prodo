export const inView = (element: HTMLElement) => {
  const { bottom, left, right, top } = element.getBoundingClientRect()

  return (
    top >= 0 &&
    left >= 0 &&
    bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export const findById = (element: HTMLElement, id: string) => {
  return element.querySelector<HTMLLinkElement>(`#${id}`)
}
