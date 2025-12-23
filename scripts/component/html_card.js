
class HtmlCard {
    // locator: String - CSS selector for the HTML element
    // className: String - CSS class name for styling
    // parent: HtmlCard - reference to parent HtmlCard
    constructor(locator, tag = "", className = "", parent = null, children = []) {
        this.locator = locator;
        this.tag = tag;
        this.className = className;
        this.parent = parent;
        this.children = children;
        this.element = document.querySelector(this.locator);
    }

    // Get-Set Methods
    setElement(element) {
        if (element === null) {
            console.log("Warning: Attempting to set a null element.");
            return;
        }
        this.element = element;
    }

    getElement() {
        return this.element;
    }

    setParent(parent) {
        this.parent = parent;
    }
    
    getParent() {
        return this.parent;
    }

    getLocator() {
        return this.locator;
    }

    setClassName(className) {
        this.className = className;
        if(this.element){
            this.element.classList.add(className);
        }
    }
    
    getClassName() {
        return this.className;
    }

    // Child Management
    addChild(child) {
        // Guard: child phải tồn tại và là HtmlCard
        if (!child || !(child instanceof HtmlCard)) {
            console.warn("addChild: child is not a HtmlCard");
            return;
        }

        // Guard: child phải có element
        const childElement = child.getElement();
        if (!this.element || !childElement) {
            console.warn("addChild: element or child element not found");
            return;
        }

        // Nếu child đã có parent khác → remove khỏi parent cũ
        if (child.parent && child.parent !== this) {
            child.parent.removeChild(child);
        }

        // Append DOM
        this.element.appendChild(childElement);

        // Set logical relationship
        child.setParent(this);

        // Thêm vào mảng children nếu chưa tồn tại
        if (!this.children.includes(child)) {
            this.children.push(child);
        }
    }


    removeChild(child) {
        // Guard: child phải tồn tại và là HtmlCard
        if (!child || !(child instanceof HtmlCard)) {
            console.warn("removeChild: child is not a HtmlCard");
            return;
        }

        const childElement = child.getElement();

        // Guard: element cha hoặc element con không tồn tại
        if (!this.element || !childElement) {
            console.warn("removeChild: element or child element not found");
            return;
        }

        // Chỉ remove DOM nếu child thực sự thuộc về element này
        if (this.element.contains(childElement)) {
            this.element.removeChild(childElement);
        }

        // Cập nhật logical relationship
        if (child.parent === this) {
            child.setParent(null);
        }

        // Remove khỏi mảng children
        this.children = this.children.filter(c => c !== child);
    }

    removeAllChildren() {
        [...this.children].forEach(child => this.removeChild(child));
    }

    getChildren() {
        // nêú đã có sẵn children trong mảng thì trả về
        if (this.children.length > 0) {
            return [...this.children];
        }

        //nếu chưa có nhưng DOM có children -> wrap DOM nodes
        if (this.element) return [];

        const domChildren = Array.from(this.element.children);

        return domChildren.map(element => {
            const childCard = new HtmlCard(null);
            childCard.setElement(this.element);
            childCard.setParent(this);
            return childCard;
        });
    }

    // to String Method
    toString () {
        return this.element ? this.element.outerHTML : "";
    }

    static create(tagName, className = "", innerHTML = "") {
        const element = document.createElement(tagName);
        if (className) {
            element.className = className;
        }
        if (innerHTML) {
            element.innerHTML = innerHTML;
        }

        const card = new HtmlCard(null);
        card.setElement(element);
        card.setClassName(className);
        
        return card;
    }
}