export function offsetTopRecursive(element: HTMLElement) {
    let top = element.offsetTop;
    while (element = element.offsetParent as HTMLElement)
        top += element.offsetTop;
    return top + document.documentElement.offsetTop;
}