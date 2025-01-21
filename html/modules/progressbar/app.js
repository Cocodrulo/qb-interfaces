class ProgressBar extends HTMLElement {
    static observedAttributes = ["min", "max", "value", "background", "color"];

    constructor() {
        super();
        this.shadow = null;
    }

    #contructStyle() {
        if (!this.shadow) return;
        const style = document.createElement("style");
        style.textContent = `
            :host {
                display: block;
                width: 50%;
                height: 20px;
                background: white;
                color: black;
            }

            .progress {
                position: relative;
                width: 100%;
                height: 100%;
                background: ${this.background ?? "inherit"};
                border-radius: 5px;
                overflow: hidden;
            }

            .progress .progress-bar {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 100%;
                width: 0;
                background: ${this.color ?? "currentColor"};
                transition: all 0.7s linear;
            }
        `;

        this.shadow.appendChild(style);
    }

    connectedCallback() {
        console.log("connected");
        this.shadow = this.attachShadow({ mode: "open" });
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    get min() {
        return this.getAttribute("min") || 0;
    }

    set min(value) {
        this.setAttribute("min", value);
    }

    get max() {
        return this.getAttribute("max") || 100;
    }

    set max(value) {
        this.setAttribute("max", value);
    }

    get value() {
        return this.getAttribute("value") || 0;
    }

    set value(value) {
        this.setAttribute("value", value);
    }

    render() {
        if (!this.shadow) return;

        const min = Number(this.min) ?? 0;
        if (this.value < min) this.value = min;

        const max = Number(this.max) ?? 100;
        if (this.value > max) this.value = max;

        const value = Number(this.value);

        const innerValue = this.shadow.querySelector(".progress-bar");
        if (innerValue) {
            innerValue.style.width = `${(value / max) * 100}%`;
            return;
        }

        this.shadow.innerHTML = `
            <div class="progress">
                <div 
                    class="progress-bar" role="progressbar" style="width: ${
                        (value / max) * 100
                    }%;"
                    aria-valuenow="${value}" aria-valuemin="${min}" aria-valuemax="${max}">
                </div>
            </div>
        `;
        this.#contructStyle();
    }
}

customElements.define("progress-bar", ProgressBar);

const progressBar = document.querySelector("progress-bar");
progressBar.min = 0;
progressBar.max = 100;

setInterval(() => {
    progressBar.value = Math.floor(Math.random() * 100);
}, 1000);
