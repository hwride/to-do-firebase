import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import './App.css';
import { firebaseAuthButtonStyleOverrides } from './auth/SignInScreen';
import { useUserState } from './auth/useUserState';
import ToDoList from './components/ToDoList/ToDoList';
import './firebase/firebase';

type SupportedLocales = 'en' | 'fr' | 'ru';

function App() {
  const userState = useUserState();
  const [localeChoice, setLocaleChoice] = useState<SupportedLocales>('ru');
  const [localeLoaded, setLocaleLoaded] = useState<{
    locale: SupportedLocales;
    messages: Record<string, string>;
  }>();
  useEffect(() => {
    (async function () {
      const messages = await loadLocaleData(localeChoice);
      setLocaleLoaded({
        locale: localeChoice,
        messages,
      });
    })();
  }, [localeChoice]);

  return localeLoaded ? (
    <IntlProvider locale={localeLoaded.locale} messages={localeLoaded.messages}>
      <div className="App">
        <style>{firebaseAuthButtonStyleOverrides}</style>
        <ToDoList userState={userState} />
      </div>
    </IntlProvider>
  ) : null;
}

async function loadLocaleData(locale: string) {
  const localeFinal = ['en', 'fr', 'ru'].includes(locale) ? locale : 'en';
  const localeModule = await import(`./lang/${localeFinal}.json`);
  const messages = localeModule.default;
  return messages;
}

export default App;
