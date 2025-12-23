import ChannelView from "../views/ChannelView.js";

export class Sidebar{
    constructor(sidebarSelector, toggleSelector, channelViewSelector){
        console.log("Sidebar component initialized");

        this.sidebar = document.querySelector(sidebarSelector);
        this.toggleBtn = document.querySelector(toggleSelector);
        this.channelView = new ChannelView(channelViewSelector);

        if(!this.sidebar || ! this.toggleBtn) {
            console.warn("Sidebar or toggle button not found");
            return;
        }

        this.isOpen = false;
        this.sidebarBtns = Array.from(
            this.sidebar.querySelectorAll("button")
        );

        this.bindEvents();
        this.setDefaultActive();
    }

    bindEvents(){
        // Toggle sidebar visibility
        this.toggleBtn.addEventListener("click", () => {
            this.toggle();
        });

        // Handle sidebar button clicks
        this.sidebarBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                this.handleSidebarClick(btn);
            });
        });
    }

    toggle(){
        this.isOpen = !this.isOpen;
        
        if (this.isOpen){
            this.sidebar.classList.remove("hidden");
        } else {
            this.sidebar.classList.add("hidden");
        }
    }

    handleSidebarClick (activeBtn){
        this.setActive(activeBtn);

        const label = activeBtn.getAttribute("aria-label");

        if (label === "Calls"){
            this.channelView.show();
        } else {
            this.channelView.hide();
            alert("Chức năng đang phát triển 🚧");
        }
    }

    setActive(activeBtn){
        this.sidebarBtns.forEach(btn => {
            btn.classList.remove("text-blue-600");
        });

        activeBtn.classList.add("text-blue-600");
    }

    setDefaultActive(){
        const callsBtn = this.sidebarBtns.find(
            btn => btn.getAttribute("aria-label") === "Calls"
        );

        if (callsBtn) {
            this.setActive(callsBtn);
            this.channelView.show();
        }
    }
}