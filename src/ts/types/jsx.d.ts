// Suppress warnings about custom elements in JSX
declare namespace JSX {
    interface IntrinsicElements {
        [key: string]: any
    }
}