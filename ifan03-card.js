import { LitElement, html, css } from 'https://unpkg.com/lit-element@2.3.1/lit-element.js?module';
import { unsafeHTML } from 'https://unpkg.com/lit-html/directives/unsafe-html.js?module';

class Card extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  constructor() {
    super();
    this.speed = 'off';
    this.sprite = `
    <svg width="0" height="0" class="hidden">
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 -61 512 512" id="off">
        <path d="M263.339 9a186 186 0 1 0 186 186 186.21 186.21 0 0 0-186-186zm0 360a174 174 0 1 1 174-174 174.198 174.198 0 0 1-174 174z"></path>
        <path d="M301.139 93.804a6 6 0 1 0-4.2 11.238 96 96 0 1 1-67.854.252 6.002 6.002 0 0 0-4.284-11.214 108 108 0 1 0 76.338-.276z"></path>
        <path d="M263.339 183a6 6 0 0 0 6-6V75a6 6 0 0 0-12 0v102a6 6 0 0 0 6 6z"></path>
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 -61 512 512" id="speed_low">
        <path d="M182 225c0 90.98 74.02 165 165 165s165-74.02 165-165c0-85.926-66.023-156.707-150-164.313V30h30V0h-90v30h30v30.688C248.023 68.293 182 139.073 182 225zm300 0c0 74.438-60.563 135-135 135s-135-60.563-135-135S272.563 90 347 90s135 60.563 135 135zm0 0"></path>
        <path d="M332 120v120h120v-30h-90v-90zM30 300h122v30H30zm0 0"></path>
      </symbol>
      <symbol viewBox="0 -61 512 512" xmlns="http://www.w3.org/2000/svg" id="speed_high">
        <path d="M182 225c0 90.98 74.02 165 165 165s165-74.02 165-165c0-85.926-66.023-156.707-150-164.313V30h30V0h-90v30h30v30.688C248.023 68.293 182 139.073 182 225zm300 0c0 74.438-60.563 135-135 135s-135-60.563-135-135S272.563 90 347 90s135 60.563 135 135zm0 0"></path>
        <path d="M332 120v120h120v-30h-90v-90zM0 210h122v30H0zm30-90h122v30H30zm0 180h122v30H30zm0 0"></path>
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 -61 512 512" id="speed_med">
        <path d="M182 225c0 90.98 74.02 165 165 165s165-74.02 165-165c0-85.926-66.023-156.707-150-164.313V30h30V0h-90v30h30v30.688C248.023 68.293 182 139.073 182 225zm300 0c0 74.438-60.563 135-135 135s-135-60.563-135-135S272.563 90 347 90s135 60.563 135 135zm0 0"></path>
        <path d="M332 120v120h120v-30h-90v-90zM0 210h122v30H0zm30 90h122v30H30zm0 0"></path>
      </symbol>
    </svg>`;
  }

  render() {
    return html`
    <ha-card>
      <div class="card-header">${this.config.title}</div>
        <div class="content clear speed-${this.speed} ${this.theme}">
          <div class="button" data-speed="high" @click="${this._changeSpeed}">
            <svg class="icon">
              <use xlink:href="#speed_high"></use>
            </svg>
            <span>Fast</span>
          </div>
          <div class="button" data-speed="medium" @click="${this._changeSpeed}">
            <svg class="icon">
              <use xlink:href="#speed_med"></use>
            </svg>
            <span>Normal</span>
          </div>
          <div class="button" data-speed="low" @click="${this._changeSpeed}">
            <svg class="icon">
              <use xlink:href="#speed_low"></use>
            </svg>
            <span>Slow</span>
          </div>
          <div class="button" data-speed="off" @click="${this._changeSpeed}">  
            <svg class="icon">
              <use xlink:href="#off"></use>
            </svg>
            <span>Off</span>
          </div>
        </div>
    ${unsafeHTML(this.sprite)}
    </ha-card>
    `;
  }

  _changeSpeed(e) {
    this.hass.callService('fan', 'set_speed', {
      entity_id: this.config.entity,
      speed: e.currentTarget.dataset.speed,
    });
    this.speed = e.currentTarget.dataset.speed;
  }

  _checkSpeed() {
    if (this.hass.states[this.config.entity].state === 'on') {
      this.speed = this.hass.states[this.config.entity].attributes.speed;
    } else {
      this.speed = this.hass.states[this.config.entity].state;
    }
  }

  updated() {
    this._checkSpeed();
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    } else if (!config.title) {
      throw new Error('You need to define a title');
    }
    try {
      if (config.theme === 'dark') { this.theme = 'dark'; }
    } catch {
      this.theme = 'light';
    }
    this.config = config;
  }

  getCardSize() {
    return 3;
  }

  static get styles() {
    return css`
      :host {
        box-sizing: border-box;
      }
      .clear:after {
        content: "";
        display: table;
        clear: both;
      }
      .hidden {
        display: none;
      }
      .content {
        padding: 0px 16px 16px
      }
      .button {
        display: block;
        position: relative;
        float: left;
        height: auto;
        width: 25%;
        padding-bottom: 25%;
        height: auto;
        cursor: pointer;
        overflow: hidden;
        text-align center;
      }
      @media only screen and (max-width: 460px) {
        .button {
          padding-bottom: 30%;
        }
      }
      .button svg {
        fill: #212121;
        display: block;
        width: 100%;
        position: absolute;
        width: 80%;
        height: 80%;
        top: 0;
        left; 10%;
        overflow: hidden;
      }
      .button:last-of-type svg {
        width: 80%;
        height: 80%;
        left: 15%;
      }
      .button span {
        display: block;
        text-align: center;
        font-size: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        position: absolute;
        text-alignt: center;
        bottom: 0;
        line-height: 20px;
        height: 20px;
        text-indent: 8%;
      }
      .dark .button svg {
        fill: #dacca7;
      }
      .speed-off [data-speed="off"] svg, 
      .speed-low [data-speed="low"] svg, 
      .speed-medium [data-speed="medium"] svg, 
      .speed-high [data-speed="high"] svg {
        fill: var(--accent-color);
      }
      .speed-off [data-speed="off"] span, 
      .speed-low [data-speed="low"] span, 
      .speed-medium [data-speed="medium"] span, 
      .speed-high [data-speed="high"] span {
        font-weight: bold;
      }  
      `;
  }
}

customElements.define('ifan03-card', Card);

// entity: fan.ifan03
// theme: dark
// title: Ceiling fan
// type: 'custom:ifan03-card'
