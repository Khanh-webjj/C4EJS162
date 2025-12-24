import ViewBase from "../core/ViewBase.js";
import CallBox from "../component/call_history_box.js";

export default class ChannelView extends ViewBase {
    constructor() {
        super("#channel-view");

        console.log("ChannelView initialized");
        
        this.tabs = document.querySelectorAll("[data-tab]");
        this.callBox = document.querySelector("#callBox");
        this.smsBox = document.querySelector("#smsBox");

        this.activeTab = "call";

        this.callSearch = new CallBox("#callBox");

        this.bindEvents();
    }

    bindEvents() {
        this.tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                const type = tab.dataset.tab;
                this.onTabSelected(type);
            });
        });
    }

    onTabSelected(type) {
        if (type === 'email'){
            alert("Email tab is under development!");
            this.restorePreviousTab();
            return;
        }

        if (this.activeTab === "call" && type!=="call"){
            this.callSearch?.reset();
        }

        this.activeTab = type;
        this.updateUI(type);
    }

    updateUI(type) {
        this.resetTabs();

        const tab = document.querySelector(`[data-tab="${type}"]`);
        
        tab.classList.remove("text-gray-600", "hover:text-blue-600");
        tab.classList.add("border-b-2", "text-blue-600", "font-medium");
        tab.querySelectorAll("span")[1].className = "inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full";
        
        this.callBox.classList.toggle("hidden", type !== "call");
        this.smsBox.classList.toggle("hidden", type !== "sms");
    }

    resetTabs() {
        this.tabs.forEach(tab => {
            tab.classList.remove("text-blue-600", "font-medium", "border-b-2");
            tab.classList.add("text-gray-600", "hover:text-blue-600");
            tab.querySelectorAll("span")[1].className = "inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full";
        });
    }

    restorePreviousTab() {
        this.updateUI(this.activeTab);
    }

    show() {
        if(!this.rootElement) return;
        this.rootElement.classList.remove("hidden");
    }

    hide() {
        if(!this.rootElement) return;
        this.rootElement.classList.add("hidden");
    }

    
}