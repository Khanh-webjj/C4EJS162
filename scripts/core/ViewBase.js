export default class ViewBase {
    constructor(rootSelector ){
        this.rootElement = document.querySelector(rootSelector);
    }

    show() {
        if (this.rootElement) this.rootElement.classList.remove("hidden");
    }

    hide() {
        if (this.rootElement) this.rootElement.classList.add("hidden");
    }
}