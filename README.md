# 24Bit RGB Color Visualizer

## Purpose

The 24Bit RGB Color Visualizer is an interactive web application designed to help users understand and experiment with 24-bit RGB color values. It provides a hands-on way to manipulate the individual bits of the Red, Green, and Blue color channels (8 bits each, totaling 24 bits) to create colors. The app displays the decimal and hexadecimal values for each channel, the combined RGB and hex values, and a visual preview of the resulting color. It’s an educational tool for learning about binary representation, RGB color models, and how colors are constructed in digital systems.

## Usage

### Prerequisites
- A modern web browser (e.g., Chrome, Firefox, Safari, Edge) with JavaScript enabled.
- No additional software or dependencies are required, as the app runs entirely in the browser.

### Running the App
1. **Open the App**:
   - Open the `index.html` file in a web browser. You can do this by double-clicking the file if it’s on your local machine, or by hosting it on a web server.
   - The app consists of three files: `index.html`, `styles.css`, and `script.js`. Ensure they are in the same directory.

2. **Interact with the Switches**:
   - The app displays three sections for Red, Green, and Blue channels, each with 8 switches representing bits (from 128 to 1).
   - Click on a switch to toggle it between "ON" (black) and "OFF" (white). The switch visually flips to show the active state.
   - The binary value (1 or 0) below each switch updates to reflect the switch’s state.

3. **View Color Values**:
   - Each channel shows its decimal and hexadecimal values (e.g., "Red Decimal Value = 130", "Red HEX Value = 82").
   - A small color preview box to the right of each channel shows the color for that channel alone (e.g., for Red, it shows the color with only the Red value applied, Green and Blue as 0).

4. **See the Combined Color**:
   - The "Mixed HEX Value" and "Mixed RGB Value Visualized Below" at the bottom show the combined color in hexadecimal (e.g., "82A060") and RGB format (e.g., "130,160,96").
   - The large color preview box below these values displays the resulting color.

5. **Copy the RGB Value**:
   - Click the "Copy RGB Value" button to copy the mixed RGB value (e.g., "130,160,96") to your clipboard.
   - The button will change to "Copied!" for 2 seconds to confirm the action, then revert to "Copy RGB Value".
   - You can paste the RGB value into other applications (e.g., a graphics editor) using Ctrl+V (or Cmd+V on Mac).

### Example
- Toggle the Red channel’s bit 7 (128) and bit 1 (2) to "ON". The Red Decimal Value becomes 130, and the Red HEX Value becomes 82.
- Toggle the Green channel’s bit 7 (128) and bit 5 (32) to "ON". The Green Decimal Value becomes 160, and the Green HEX Value becomes A0.
- Toggle the Blue channel’s bit 6 (64) and bit 5 (32) to "ON". The Blue Decimal Value becomes 96, and the Blue HEX Value becomes 60.
- The mixed color will be displayed as "Mixed HEX Value = 82A060" and "Mixed RGB Value Visualized Below = 130,160,96", with the color preview showing the resulting shade.

## Files
- `index.html`: The main HTML file containing the structure of the app.
- `styles.css`: The CSS file for styling the app’s appearance.
- `script.js`: The JavaScript file handling the app’s functionality, including switch toggling, color calculations, and clipboard copying.

## Notes
- The app supports all 16,777,216 possible RGB colors (2^24) by allowing you to manipulate each bit of the 24-bit color space.
- The "1 pixel of 24Bit color..." label refers to the large color preview box, which visualizes the combined RGB color.
- Ensure your browser supports the `navigator.clipboard` API for the copy functionality to work (most modern browsers do).
