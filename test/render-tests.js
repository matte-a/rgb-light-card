const test = require('ava');
const YAML = require('yamljs');

const testCases = [
    {
        name: 'Test icon colors',
        config: `---
entity: light.example_light
colors:
- rgb_color: [255, 127, 255]
  brightness: 220
  transition: 1
- hs_color: [60, 30]
- color_name: turquoise
- {}
- hs_color: [60, 30]
  icon_color: "#fff000"
`,
        result:
            '<style> .wrapper { justify-content: flex-start; margin-bottom: -4px; } .color-circle { width: 32px; height: 32px; margin: 4px 8px 8px; } </style>' +
            '<div class="color-circle" style="background: rgb(255, 127, 255);"></div>' +
            '<div class="color-circle" style="background: hsl(60, 100%, 85%);"></div>' +
            '<div class="color-circle" style="background: turquoise;"></div>' +
            '<div class="color-circle" style="background: rgb(127, 132, 142);"></div>' +
            '<div class="color-circle" style="background: rgb(255, 240, 0);"></div>'
    },
    {
        name: 'Test justify and size options',
        config: `---
entity: light.example_light
colors:
- rgb_color: [234, 136, 140]
- rgb_color: [251, 180, 140]
- rgb_color: [135, 198, 237]
justify: around
size: 28
`,
        result:
            '<style> .wrapper { justify-content: space-around; margin-bottom: -3.5px; } .color-circle { width: 28px; height: 28px; margin: 3.5px 7px 7px; } </style>' +
            '<div class="color-circle" style="background: rgb(234, 136, 140);"></div>' +
            '<div class="color-circle" style="background: rgb(251, 180, 140);"></div>' +
            '<div class="color-circle" style="background: rgb(135, 198, 237);"></div>'
    }
];

for (const testCase of testCases) {
    test(testCase.name || 'Unnamed test', t => {
        const card = new RGBLightCard();
        if (testCase.config) {
            card.setConfig(YAML.parse(testCase.config));
        }
        t.is(card.content.innerHTML, testCase.result);
    });
}