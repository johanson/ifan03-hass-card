# Custom Home Assistant card for Tasmotized Sonoff IFan03

## Installation

* Extract the repo to `/config/www/ifan03-card/` directory of your Home Assistant installation.

* From your web panel add a JS resource (Configuration > Lovelace Dashboards > Resources) `/local/ifan03-card/ifan03-card.js` (www dir maps to local).

* Add a new Lovelace card:

```
entity: fan.ifan03
icon: 'mdi:key-wireless'
title: Ceiling fan
type: 'custom:ifan03-card'
```

or add `theme: dark` if you have dark UI.


![screenshot](screenshot.png?raw=true)