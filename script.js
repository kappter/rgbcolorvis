function updateChannel(channelId, decimalId, hexId) {
    const switches = document.querySelectorAll(`#${channelId} .switch input`);
    let value = 0;
    switches.forEach(switchEl => {
        const bit = parseInt(switchEl.dataset.bit);
        if (switchEl.checked) {
            value += Math.pow(2, bit);
        }
    });

    document.getElementById(decimalId).textContent = value;
    const hex = value.toString(16).padStart(2, '0').toUpperCase();
    document.getElementById(hexId).textContent = hex;

    return value;
}

function updateColor() {
    const red = updateChannel('red-switches', 'red-decimal', 'red-hex');
    const green = updateChannel('green-switches', 'green-decimal', 'green-hex');
    const blue = updateChannel('blue-switches', 'blue-decimal', 'blue-hex');

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