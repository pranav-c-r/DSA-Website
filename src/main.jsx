import { createRoot } from 'react-dom/client';
import App from './components/TreeVisualizer.jsx';
import './styles/app.css';

// Get the root element
const container = document.getElementById('root');
const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);