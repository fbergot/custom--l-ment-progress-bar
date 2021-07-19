class Progress_bar extends HTMLElement {
  // ces getters et setters fonctionnent lorsqu'on utilise la syntaxe element["progress-width"]
  

  // progress-width
  set progressWidth(value) {
    this.setAttribute("progress-width", value);
  }

  get progressWidth() {
    return this._progressWidth;
  }

  // progress-height
  set progressHeight(value) {
    this.setAttribute("progress-height", value);
  }

  get progressHeight() {
    return this._progressHeight;
  }

  // progress-color

  set color(value) {
    this.setAttribute("progress-color", value);
  }

  get color() {
    return this._color;
  }

  set background(value) {
    this.setAttribute("progress-background", value);
  }

  get background() {
    return this._progressBackground;
  }

  // progress-value
  set value(value) {
    if (value >= 0 && value <= 100) {
      this.setAttribute("progress-value", value);
    } else {
      throw Error("La valeur doit être comprise entre 0 et 100");
    }
  }

  get value() {
    return this._value;
  }

  constructor() {
    super();
    //dom de lombre
    this.attachShadow({ mode: "open" });
    // (au lieu de this.innerHTML tout court)
    this.shadowRoot.innerHTML = `
            <div class='progress-bar-container'>
                <div class="progress"></div>
            </div>

            <style>
                  .progress-bar-container {
                    width: ${this.getAttribute("progress-width")}px;
                    height: ${this.getAttribute("progress-height")}px;
                    background-color: ${this.getAttribute(
                      "progress-background"
                    )};
                    border-radius: 5px;
                }

                .progress {
                    background-color: ${this.getAttribute("progress-color")};
                    width: ${this.getAttribute("progress-value")}%;
                    height: 100%;
                    border-radius: 5px;

                }                
            </style>
            `;
  }

  connectedCallback() {
    this._progressWidth = this.getAttribute("progress-width");
    this._progressHeight = this.getAttribute("progress-height");
    this._progressBackground = this.getAttribute("progress-background");
    this._color = this.getAttribute("progress-color");
    this._value = this.getAttribute("progress-value");
    // on greffe la possibilité pour notre customElement d'émettre un évènement au click sur lui
    //l'event est nommé progress-click et est de type mouseEvent
    this.shadowRoot
      .querySelector(".progress-bar-container")
      .addEventListener("click", (ev) => {
        this.dispatchEvent(new MouseEvent("progress-click", ev));
      });
    this.render();
  }

  render() {
    this.shadowRoot.querySelector(".progress").style[
      "width"
    ] = `${this._value}%`;
    this.shadowRoot.querySelector(".progress").style[
      "backgroundColor"
    ] = `${this._color}`;
    this.shadowRoot.querySelector(".progress-bar-container").style[
      "width"
    ] = `${this._progressWidth}px`;
    this.shadowRoot.querySelector(".progress-bar-container").style[
      "height"
    ] = `${this._progressHeight}px`;
    this.shadowRoot.querySelector(".progress-bar-container").style[
      "backgroundColor"
    ] = `${this._progressBackground}`;
  }
  //indique au navigateur les attributs à surveiller
  static get observedAttributes() {
    return [
      "progress-width",
      "progress-color",
      "progress-height",
      "progress-value",
      "progress-background",
    ];
  }

  // appelée quand on tente de changer la valeur d'un attribut avec setAttribute
  attributeChangedCallback(name, oldVal, newVal) {
    const attrProps = {
      "progress-width": "_progressWidth",
      "progress-color": "_color",
      "progress-height": "_progressHeight",
      "progress-value": "_value",
      "progress-background": "_progressBackground",
    };

    if (name === "progress-value") {
      if (parseInt(newVal) >= 0 && parseInt(newVal) <= 100) {
        this._value = newVal;
      } else {
        throw Error("La valeur doit être comprise entre 0 et 100");
      }
    } else {
      attrProps[name]
        ? (this[attrProps[name]] = newVal)
        : console.error("attribut absent");
    }

    // on met à jour
    this.render();
  }
}


window.customElements.define("user-progress", Progress_bar);
