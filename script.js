function updateChannel(channelId, decimalId, hexId, byteColorId) {
    const switches = document.querySelectorAll(`#${channelId} .switch input`);
    let value = 0;
    switches.forEach(switchEl => {
        const bit = parseInt(switchEl.dataset.bit);
        if (switchEl.checked) {
            value += Math.pow(2, bit);
        }
    });

    // Update bit states
    const bitStates = document.querySelectorAll(`#${channelId} ~ .bit-states span`);
    switches.forEach((switchEl, index) => {
        bitStates[index].textContent = switchEl.checked ? '1' : '0';
    });

    document.getElementById(decimalId).textContent = value;
    const hex = value.toString(16).padStart(2, '0').toUpperCase();
    document.getElementById(hexId).textContent = hex;

    // Update individual byte color
    let rgb;
    if (channelId === 'red-switches') {
        rgb = `rgb(${value}, 0, 0)`;
    } else if (channelId === 'green-switches') {
        rgb = `rgb(0, ${value}, 0)`;
    } else {
        rgb = `rgb(0, 0, ${value})`;
    }
    document.getElementById(byteColorId).style.backgroundColor = rgb;

    return value;
}

// RGB to HSL conversion
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// HSL to RGB conversion
function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Determine color temperature
function getColorTemperature(h) {
    if (h >= 0 && h <= 60 || h >= 300 && h <= 360) return 'Warm';
    if (h >= 120 && h <= 240) return 'Cool';
    return 'Neutral';
}

// Get analogous colors
function getAnalogousColors(h, s, l) {
    const h1 = (h + 30) % 360;
    const h2 = (h - 30 + 360) % 360;
    return [
        hslToRgb(h1, s, l),
        hslToRgb(h2, s, l)
    ];
}

// Randomize switch states
function randomizeColor() {
    const channels = ['red-switches', 'green-switches', 'blue-switches'];
    channels.forEach(channelId => {
        const switches = document.querySelectorAll(`#${channelId} .switch input`);
        switches.forEach(switchEl => {
            switchEl.checked = Math.random() > 0.5; // Randomly set switch to on or off
        });
    });
    updateColor();
}

function updateColor() {
    const red = updateChannel('red-switches', 'red-decimal', 'red-hex', 'red-byte-color');
    const green = updateChannel('green-switches', 'green-decimal', 'green-hex', 'green-byte-color');
    const blue = updateChannel('blue-switches', 'blue-decimal', 'blue-hex', 'blue-byte-color');

    const mixedHex = `${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`.toUpperCase();
    document.getElementById('mixed-hex').textContent = mixedHex;
    document.getElementById('mixed-rgb').textContent = `${red},${green},${blue}`;

    const colorBox = document.getElementById('color-box');
    colorBox.style.backgroundColor = `rgb(${red},${green},${blue})`;

    // Update color name using ntc.js
    const hexColor = `#${mixedHex}`;
    const ntcMatch = ntc.name(hexColor);
    const colorName = ntcMatch[1];
    document.getElementById('color-name').textContent = colorName;

    // Update HSL values
    const [h, s, l] = rgbToHsl(red, green, blue);
    document.getElementById('mixed-hsl').textContent = `${h}°, ${s}%, ${l}%`;

    // Update color temperature
    const temperature = getColorTemperature(h);
    document.getElementById('color-temperature').textContent = temperature;

    // Update analogous colors
    const analogousColors = getAnalogousColors(h, s, l);
    document.getElementById('analogous-swatch-1').style.backgroundColor = `rgb(${analogousColors[0][0]},${analogousColors[0][1]},${analogousColors[0][2]})`;
    document.getElementById('analogous-swatch-2').style.backgroundColor = `rgb(${analogousColors[1][0]},${analogousColors[1][1]},${analogousColors[1][2]})`;

    // Calculate and display complementary color
    const compRed = 255 - red;
    const compGreen = 255 - green;
    const compBlue = 255 - blue;
    document.getElementById('complementary-rgb').textContent = `${compRed},${compGreen},${compBlue}`;
    const compSwatch = document.getElementById('complementary-swatch');
    compSwatch.style.backgroundColor = `rgb(${compRed},${compGreen},${compBlue})`;
}

function resetAll() {
    const allSwitches = document.querySelectorAll('.switch input');
    allSwitches.forEach(switchEl => {
        switchEl.checked = false;
    });
    updateColor();
}

// Initialize with random color on page load
document.addEventListener('DOMContentLoaded', () => {
    randomizeColor();
});

document.querySelectorAll('.switch input').forEach(switchEl => {
    switchEl.addEventListener('change', updateColor);
});

// Copy RGB Value Button
document.getElementById('copy-rgb-btn').addEventListener('click', () => {
    const rgbValue = document.getElementById('mixed-rgb').textContent;
    navigator.clipboard.writeText(rgbValue).then(() => {
        const button = document.getElementById('copy-rgb-btn');
        button.textContent = 'Copied!';
        button.classList.add('copied');
        setTimeout(() => {
            button.textContent = 'Copy RGB Value';
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});

// Reset Button
document.getElementById('reset-btn').addEventListener('click', resetAll);