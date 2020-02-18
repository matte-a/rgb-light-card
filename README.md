# RGB Light Card

[![Build Status][build-src]][build-href]
[![Version][version-src]][version-href]
[![HACS: Default][hacs-src]][hacs-href]
[![Codecov][codecov-src]][codecov-href]
[![Hits per month][hits-src]][hits-href]
[![code style: prettier][code-style-src]][code-style-href]

> A Lovelace custom card for RGB lights

![Light](https://github.com/bokub/rgb-light-card/raw/images/light.png)
![Dark](https://github.com/bokub/rgb-light-card/raw/images/dark.png)

## Installation

You can either install this card through [HACS](https://github.com/custom-components/hacs), or follow these simple steps:

#### 1. Open the Raw Config Editor

<details><summary>(Click to expand)</summary>

1. Go to your Lovelace view

2. Click on the three dots menu (top-right) and click on _Configure UI_.

3. Click in the three dots menu again and click on _Raw config editor_.

</details>

#### 2. Add the `rgb-light-card` to the resources

Add the following resource to your Lovelace configuration (typically at the top) :

```yaml
resources:
    - url: https://cdn.jsdelivr.net/npm/rgb-light-card
      type: js
```

## Updating

The RGB Light Card will auto-update automatically a few days after every new release (once your browser cache expires)

However, you can enforce a [specific version](https://github.com/bokub/rgb-light-card/releases) by adding `@X.X.X` at the end of the URL (e.g: `- url: ...@1.2.0`)

## Configuration

The `rbg-light-card` is meant to be included in the [Lovelace Entities Card](https://www.home-assistant.io/lovelace/entities/)

Example configuration:

```yaml
type: entities
entities:
    # Displays the light entity. It's optional
    - entity: light.example_light

    # Card configuration starts here
    - type: 'custom:rgb-light-card'
      entity: light.example_light
      colors:
          # Any option of the light.turn_on service can be used in each color
          - rgb_color:
                - 255
                - 127
                - 255
            brightness: 220
            transition: 1
          - hs_color:
                - 60
                - 30
            icon_color: '#fff8b0' # Override icon color
```

> #### Pro tip
>
> You can test all the colors options in the **Developer Tools > Service** page of your Home Assistant.
>
> Choose the `light.turn_on` service, change the service data, and call the service to see the result

### Options

| Name      | Type   | Requirement  | Default | Description                                                                                                                                          |
| --------- | ------ | ------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`    | string | **Required** |         | `custom:rgb-light-card`                                                                                                                              |
| `entity`  | string | **Optional** |         | Light entity to control. If not set here, `entity_id` must be set in each color                                                                      |
| `colors`  | array  | **Required** |         | Colors to display. Check out color options below                                                                                                     |
| `justify` | string | **Optional** | `left`  | How to distribute free space between icons. Possible values are `left`,`right`,`center`,`between` and `around`. Check out [examples](#justify) below |
| `size`    | number | **Optional** | `32`    | Diameter of the icons, in pixels                                                                                                                     |

### Colors options

| Name                                                       | Type   | Requirement  | Default | Description                                                                                                                                                                                                                                        |
| ---------------------------------------------------------- | ------ | ------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rgb_color`, `hs_color`, `brightness`, `transition` etc... | any    | **Optional** |         | When you click on a color, it will call the service `light.turn_on` with **all the options you put here** as service data<br> [**Click here**](https://www.home-assistant.io/integrations/light#service-lightturn_on) for the full list of options |
| `icon_color`                                               | string | **Optional** |         | Override icon color. Check out [examples](#icon-color) below                                                                                                                                                                                       |
| `entity_id`                                                | string | **Optional** |         | Override the `entity` option for this specific color                                                                                                                                                                                               |
| `type`                                                     | string | **Optional** | `light` | Can be set to `light` (default), or `call-service` to change the click action. Read the [explanation](#calling-services) just below                                                                                                                |
| `service`                                                  | string | **Optional** |         | Used with the `call-service` type to specify the service to call for the click action                                                                                                                                                              |
| `service_data`                                             | array  | **Optional** |         | Used with the `call-service` type to specify the data to be passed to the service                                                                                                                                                                  |

## Calling Services

This can call any service available on Home Assistant. The official [Home Assistant Service Calls](https://www.home-assistant.io/docs/scripts/service-calls/) documentation can be used for reference.

> #### Pro tip
>
> You can view all services available the **Developer Tools > Service** page of your Home Assistant

Example configuration:

```yaml
type: entities
entities:
    - type: 'custom:rgb-light-card'
      colors:
          # First icon calls a script
          - type: call-service
            service: script.turn_on
            service_data:
                entity_id: script.night_mode
            icon_color: '#90b2ec'
          # Second icon calls a scene
          - type: call-service
            service: scene.turn_on
            service_data:
                entity_id: scene.romantic
            icon_color: '#f1a5cb'
          # Third icon sends an Alexa TTS notification
          - type: call-service
            service: notify.alexa_media_office
            service_data:
                data:
                    type: tts
                message: Hello world!
            icon_color: '#77e28a'
```

Note that you can mix lights and service calls in the same card

The `icon_color` is still optional, but will be grey by default

## Examples

### Icon color

The `icon_color` option accepts the same values as the [CSS background property](https://developer.mozilla.org/docs/Web/CSS/background).

This means your `icon_color` can be:

-   A HTML color name: &nbsp; `icon_color: gold`
-   A hexadecimal code: &nbsp; `icon_color: '#FBB48C'`
-   Any other color compatible with [background-color](https://developer.mozilla.org/docs/Web/CSS/background-color): &nbsp; `icon_color: rgba(42, 204, 77, 0.5)`
-   A color gradient: &nbsp; `icon_color: 'linear-gradient(15deg, #0250c5, #d43f8d)'`
-   Or even an image: &nbsp; `icon_color: center/120% url('https://www.home-assistant.io/images/favicon-192x192.png')`

The 5 examples above will render like this:

![Icon color examples](https://github.com/bokub/rgb-light-card/raw/images/icon_color_examples.png)

⚠️ You **must** wrap your value between quotes if it contains the `#` character

### Justify

There are 5 possible values for the `justify` option: `left`,`right`,`center`,`between` and `around`. The default value is `left`.

Here are how the different values are handled:

![Justify examples](https://github.com/bokub/rgb-light-card/raw/images/justify_examples.png)

## License

MIT © [Boris K](https://github.com/bokub)

[build-src]: https://flat.badgen.net/travis/bokub/rgb-light-card
[version-src]: https://runkit.io/bokub/npm-version/branches/master/rgb-light-card?style=flat
[code-style-src]: https://flat.badgen.net/badge/code%20style/prettier/ff69b4
[hits-src]: https://data.jsdelivr.com/v1/package/npm/rgb-light-card/badge
[hacs-src]: https://flat.badgen.net/badge/HACS/default/orange
[codecov-src]: https://flat.badgen.net/codecov/c/github/bokub/rgb-light-card
[build-href]: https://travis-ci.org/bokub/rgb-light-card
[version-href]: https://www.npmjs.com/package/rgb-light-card
[code-style-href]: https://github.com/prettier/prettier
[hits-href]: https://www.jsdelivr.com/package/npm/rgb-light-card
[hacs-href]: https://github.com/custom-components/hacs
[codecov-href]: https://codecov.io/gh/bokub/rgb-light-card
