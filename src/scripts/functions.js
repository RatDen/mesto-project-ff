export function getFirstSibling(item, selector) {
    const parent = item.parentNode;
    const sel = parent.querySelector(selector);
    return sel;
}