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

// Color map with common color names and their RGB values
const colorMap = [
    { name: 'Black', rgb: [0, 0, 0] },
    { name: 'White', rgb: [255, 255, 255] },
    { name: 'Red', rgb: [255, 0, 0] },
    { name: 'Green', rgb: [0, 255, 0] },
    { name: 'Blue', rgb: [0, 0, 255] },
    { name: 'Yellow', rgb: [255, 255, 0] },
    { name: 'Cyan', rgb: [0, 255, 255] },
    { name: 'Magenta', rgb: [255, 0, 255] },
    { name: 'Gray', rgb: [128, 128, 128] },
    { name: 'Purple', rgb: [128, 0, 128] },
    { name: 'Orange', rgb: [255, 165, 0] },
    { name: 'Pink', rgb: [255, 192, 203] },
    { name: 'Brown', rgb: [165, 42, 42] },
    { name: 'Gold', rgb: [218, 165, 32] },
    { name: 'Silver', rgb: [192, 192, 192] },
    { name: 'Olive', rgb: [128, 128, 0] },
    { name: 'Maroon', rgb: [128, 0, 0] },
    { name: 'Navy', rgb: [0, 0, 128] },
    { name: 'Teal', rgb: [0, 128, 128] },
    { name: 'Lime', rgb: [0, 255, 0] }
];

// Function to find the closest color name
function getClosestColorName(r, g, b) {
    let closestColor = colorMap[0];
    let minDistance = Number.MAX_VALUE;

    colorMap.forEach(color => {
        const distance = Math.sqrt(
            Math.pow(r - color.rgb[0], 2) +
            Math.pow(g - color.rgb[1], 2) +
            Math.pow(b - color.rgb[2], 2)
        );
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = color;
        }
    });

    return closestColor.name;
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

    // Update color name
    const colorName = getClosestColorName(red, green, blue);
    document.getElementById('color-name').textContent = colorName;

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

updateColor();