/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// Custom dark theme
const myDarkTheme = {
  dark: true, // Ensure it's dark mode
  colors: {
    background: '#000000', // Custom dark background (deep dark gray)
    surface: '#1D2330', // Surface elements (cards, dialogs)
    primary: '#7D3FE2', // Your accent color (indigo)
    secondary: '#03DAC6', // A complementary secondary color
    success: '#4CAF50', // Green for success
    warning: '#FB8C00', // Orange for warning
    error: '#FF5252', // Red for errors
    info: '#2196F3', // Blue for info messages
  },
}

// Custom Light Theme
const myLightTheme = {
  dark: false, // Ensures light mode is applied
  colors: {
    background: '#F5F5F5', // Light gray background
    surface: '#FFFFFF', // White for cards, modals, etc.
    primary: '#7D3FE2', // Your accent indigo (consistent with dark mode)
    secondary: '#6200EE', // A deep purple for contrast
    success: '#4CAF50', // Green for success
    warning: '#FB8C00', // Orange for warnings
    error: '#D32F2F', // A slightly darker red
    info: '#1976D2', // A deeper blue
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'myDarkTheme', // Set custom theme as default
    themes: {
      myDarkTheme, // Register custom dark theme
      myLightTheme, // Register custom light theme
    },
  },
})
