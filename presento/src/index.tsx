import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement).render(<App />);
