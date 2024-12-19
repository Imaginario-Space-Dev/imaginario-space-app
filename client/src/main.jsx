import React from 'react'
import ReactDOM from 'react-dom/client'
import dotenv from "dotenv"

// Translation imports
import i18n from "i18next";
import {initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import {GenaralContextProvider} from './context/context/GeneralContext.jsx'
import {UserContextProvider} from './context/context/UserContext.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import './index.css'

// dotenv.config()
// Load env vars
// dotenv.config({ path: '../.env'})

// Translation settings
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'pt', 'fr', 'es'],
    fallbackLng: "en",
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json'
    },
    react: { useSuspense: false}

});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <GenaralContextProvider>
        <App />
      </GenaralContextProvider>
    </UserContextProvider>
    
  </React.StrictMode>,
)
