# AutonoIQ - AI Automation Services Website

A modern, responsive website for AutonoIQ, a company that provides AI automation services to small and medium businesses.

## Features

- **Modern Design**: Clean, professional design with gradient backgrounds and modern typography
- **Responsive**: Fully responsive design that works on all devices
- **Animations**: Smooth CSS animations and transitions for enhanced user experience
- **Interactive Elements**: 
  - Animated hero section with floating cards
  - Progress bars with animations
  - Hover effects on cards and buttons
  - Smooth scrolling navigation
- **Contact Forms**: 
  - Main contact form
  - Consultation booking modal with detailed form
- **Mobile-Friendly**: Hamburger menu and optimized mobile layout

## Sections

1. **Hero Section**: Eye-catching intro with animated demo cards
2. **Services Section**: Six main services with detailed descriptions
3. **About Section**: Company benefits with animated progress metrics
4. **Testimonials Section**: Customer reviews with star ratings
5. **CTA Section**: Call-to-action for booking consultations
6. **Contact Section**: Contact information and contact form
7. **Footer**: Links and company information

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- [Lucide Icons](https://lucide.dev/) for icons
- [Inter Font](https://fonts.google.com/specimen/Inter) from Google Fonts

## File Structure

```
AutonoIQ-Website/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All CSS styles and animations
├── js/
│   └── script.js       # JavaScript functionality
├── images/             # Image assets (empty - using external images)
├── assets/             # Other assets
└── README.md           # This file
```

## Setup

1. Clone or download the project files
2. Open `index.html` in your web browser
3. No server setup required - it's a static website

## Key Features

### Consultation Booking System
- Multiple CTA buttons throughout the site
- Modal popup with detailed consultation form
- Form validation and user feedback
- Simulated booking process (can be integrated with real booking APIs)

### Animations
- CSS keyframe animations for hero elements
- Intersection Observer API for scroll-triggered animations
- Progress bar animations
- Smooth transitions and hover effects

### Responsive Design
- Mobile-first approach
- Breakpoints at 1024px, 768px, and 480px
- Collapsible navigation for mobile devices
- Optimized layouts for all screen sizes

## Customization

### Colors
The color scheme is defined in CSS custom properties at the top of `style.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    /* ... more colors */
}
```

### Content
- Update text content in `index.html`
- Replace placeholder images with actual company images
- Update contact information in the contact section

### Integration
To integrate with real services:
1. Replace form submission simulation with actual API calls
2. Integrate consultation booking with calendar services (Calendly, Google Calendar, etc.)
3. Connect contact forms to email services or CRM systems
4. Add analytics tracking (Google Analytics, etc.)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance

The website is optimized for performance with:
- Minimal external dependencies
- Optimized CSS and JavaScript
- Lazy loading for images (when implemented)
- Efficient animations using CSS transforms

## Future Enhancements

Potential improvements for production use:
- Add actual images and company photos
- Integrate with real booking and CRM systems
- Add blog section
- Implement case studies section
- Add live chat functionality
- SEO optimization with meta tags and structured data
- Performance monitoring and analytics

## License

This project is created for AutonoIQ and is proprietary.