# Family Meal Menu

A stylish React + Vite + Tailwind CSS web app for an iPad family breakfast and dinner selection flow.

## Files You Will Care About

- `src/App.jsx`: Main app flow and all React UI.
- `src/index.css`: Tailwind import plus custom Persona-inspired styling.
- `vite.config.js`: Vite config with React and Tailwind.
- `index.html`: Browser tab title and theme color.

## Commands

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Start the server so other devices on the same Wi-Fi can open it:

```bash
npm run dev -- --host
```

Build the production version:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## What The App Does

- Shows a stylish start screen.
- Walks through Ryan, Russell, Robin, and Rachel in that exact order.
- Lets each person choose breakfast and dinner.
- Shows waffle toppings only after Waffle is selected.
- Automatically moves to the next person after saving.
- Shows a final summary screen for Mom.
- Includes a Start Over button.

## iPad Testing

1. Run:

```bash
npm run dev -- --host
```

2. Find your Mac local IP address:

```bash
ipconfig getifaddr en0
```

3. In Safari on the iPad, open:

```text
http://YOUR_IP_ADDRESS:5173
```

If `en0` does not return an address, try:

```bash
ipconfig getifaddr en1
```
