import { LitElement, html, css } from 'https://unpkg.com/lit-element@2.3.1/lit-element.js?module';

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
  }

  render() {
    return html`
    <ha-card>
      <div class="card-header">${this.config.title}</div>
      <div class="content clear speed-${this.speed} ${this.theme}">
        <div class="button" data-speed="off" @click="${this._changeSpeed}"></div>
        <div class="button" data-speed="low" @click="${this._changeSpeed}"></div>
        <div class="button" data-speed="medium" @click="${this._changeSpeed}"></div>
        <div class="button" data-speed="high" @click="${this._changeSpeed}"></div>
        <span data-speed="off">Off</span>
        <span data-speed="low">Low</span>
        <span data-speed="medium">Normal</span>
        <span data-speed="high">Fast</span>
      </div>
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
        width: 21.25%;
        margin-left: 5%;
        padding-bottom: 25%;
        background-repeat: none;
        height: auto;
        cursor: pointer;
        overflow: hidden;
        text-align center;
        background-color: rgba(0,0,0,0.5);
        mask-repeat: no-repeat;
        -webkit-mask-repeat: no-repeat;
      }
      .dark .button {
        background-color: rgba(255,255,255,0.5);
      }
      .button:first-of-type {
        margin-left: 0;
      }
      div[data-speed="off"] {
        mask-image: url('/local/ifan03-card/static/off.svg');
        -webkit-mask-image: url('/local/ifan03-card/static/off.svg');
      }
      div[data-speed="low"] {
        mask-image: url('/local/ifan03-card/static/low.svg');
        -webkit-mask-image: url('/local/ifan03-card/static/low.svg');
      }
      div[data-speed="medium"] {
        mask-image: url('/local/ifan03-card/static/medium.svg');
        -webkit-mask-image: url('/local/ifan03-card/static/medium.svg');
      }
      div[data-speed="high"] {
        mask-image: url('/local/ifan03-card/static/high.svg');
        -webkit-mask-image: url('/local/ifan03-card/static/high.svg');
      }
      .speed-off div[data-speed="off"], 
      .speed-low div[data-speed="low"], 
      .speed-medium div[data-speed="medium"], 
      .speed-high div[data-speed="high"] {
        background-color: var(--accent-color);
      }
      .speed-off span[data-speed="off"], 
      .speed-low span[data-speed="low"], 
      .speed-medium span[data-speed="medium"], 
      .speed-high span[data-speed="high"] {
        font-weight: bold;
        opacity: 1;
      }
      span {
        display: block;
        text-align: center;
        font-size: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 21.25%;
        margin-left: 5%;
        text-alignt: center;
        line-height: 20px;
        height: 20px;
        display: block;
        float: left;
        opacity: 0.7;
      }
      span:first-of-type {
        margin-left: 0;
      }
      `;
  }
}

customElements.define('ifan03-card', Card);

// entity: fan.ifan03
// theme: dark
// title: Ceiling fan
// type: 'custom:ifan03-card'
