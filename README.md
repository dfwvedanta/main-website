# Vedanta DFW - Spiritual Website

A mesmerizing spiritual website featuring cutting-edge web technologies and a cosmic aesthetic design.

## Features

### Visual Design
- **Cosmic Theme**: Deep space-inspired color palette with blues, purples, and gold accents
- **Sacred Geometry**: Animated SVG patterns and mandala designs
- **Particle System**: Canvas-based cosmic particle effect with 400+ interactive stars
- **Glass Morphism**: Modern frosted glass effects throughout the UI
- **Smooth Animations**: CSS and JavaScript animations for seamless user experience

### Technologies Used

#### Modern Web Stack
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Advanced features including:
  - CSS Grid & Flexbox layouts
  - CSS Variables for theming
  - CSS Animations & Transitions
  - Backdrop filters for glass effects
  - Custom gradients and shadows
- **JavaScript ES6+**: Modern vanilla JavaScript with:
  - Canvas API for particle effects
  - Intersection Observer for scroll animations
  - Event handling and DOM manipulation
  - Object-oriented programming patterns

#### Typography
- **Cinzel**: Elegant serif font for headings and display text
- **Outfit**: Clean, modern sans-serif for body text

#### Visual Effects
- Animated particle background with mouse interaction
- Parallax scrolling effects
- Scroll-triggered fade-in animations
- Rotating sacred geometry overlay
- Pulsing and glowing elements
- Smooth page transitions

### Sections

1. **Hero**: Full-screen introduction with animated title and call-to-action
2. **Philosophy**: About Vedanta with three pillars and animated mandala
3. **Teachings**: Four core teaching cards with Sanskrit text
4. **Practice**: Meditation techniques and guided session interface
5. **Events**: Upcoming events calendar with featured event
6. **Community**: Features and benefits of joining the sangha
7. **Contact**: Contact information and functional form
8. **Footer**: Site navigation and branding

### Interactive Features

#### Particle System
- 400 animated particles creating a cosmic atmosphere
- Mouse-responsive particles that react to cursor movement
- Twinkling stars with varying sizes and colors
- Connected particle network for depth
- Smooth 60 FPS animation

#### Navigation
- Fixed header with scroll-triggered styling
- Mobile-responsive hamburger menu
- Smooth scroll to section anchors
- Active state indicators

#### Scroll Animations
- Intersection Observer for performance
- Staggered fade-in effects
- Parallax movement for hero and mandala
- Dynamic geometry rotation

#### Form Handling
- Client-side form validation
- Animated success feedback
- Styled inputs with focus states

#### Meditation Session
- Interactive play/pause button
- Animated breath circle visualization
- Ready for audio integration

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 1024px
- Touch-friendly navigation
- Optimized layouts for all screen sizes

### Performance Optimizations
- Debounced and throttled scroll handlers
- RequestAnimationFrame for smooth animations
- Efficient particle rendering
- CSS-only animations where possible
- Minimal DOM manipulation

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers
- Canvas API fallback support

## File Structure

```
newdesign/
├── index.html          # Main HTML structure
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Getting Started

1. Open `index.html` in a modern web browser
2. No build process or dependencies required
3. Works offline - all assets are self-contained

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --color-deep-space: #0a0e27;
    --color-gold: #d4af37;
    /* ... more colors */
}
```

### Particle Count
Adjust in `script.js`:
```javascript
this.particleCount = 400; // Increase or decrease
```

### Animation Speed
Modify transition durations in CSS:
```css
--transition-smooth: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
```

## Credits

Design & Development: Created with Claude Code
Fonts: Google Fonts (Cinzel & Outfit)
Inspiration: Vedantic philosophy and cosmic aesthetics

## License

© 2026 Vedanta DFW. All rights reserved.
