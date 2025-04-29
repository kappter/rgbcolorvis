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

function updateColor() {
    const red = updateChannel('red-switches', 'red-decimal', 'red-hex', 'red-byte-color');
    const green = updateChannel('green-switches', 'green-decimal', 'green-hex', 'green-byte-color');
    const blue = updateChannel('blue-switches', 'blue-decimal', 'blue-hex', 'blue-byte-color');

    const mixedHex = `${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`.toUpperCase();
    document.getElementById('mixed-hex').textContent = mixedHex;
    document.getElementById('mixed-rgb').textContent = `${red},${green},${blue}`;

    const colorBox = document.getElementById('color-box');
    const pixel = document.getElementById('pixel');
    const color = `rgb(${red},${green},${blue})`;
    colorBox.style.backgroundColor = color;
    pixel.style.backgroundColor = color;
}

document.querySelectorAll('.switch input').forEach(switchEl => {
    switchEl.addEventListener('change', updateColor);
});

updateColor();