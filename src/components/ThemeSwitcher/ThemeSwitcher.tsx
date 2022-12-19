import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styles from '../ToDoList/ToDoList.module.css';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState(
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  );
  const intl = useIntl();
  return (
    <>
      <label htmlFor="theme-selector" className={styles.themeSelectorLabel}>
        <FormattedMessage id="themeButton" defaultMessage="Theme" />
      </label>
      <select
        id="theme-selector"
        value={theme}
        onChange={(evt) => {
          const newTheme = evt.target.value;
          document.documentElement.setAttribute('colour-scheme', newTheme);
          setTheme(newTheme);
        }}
      >
        {/* For some reason FormattedMessage didn't work in the <option> elements */}
        <option value="light">
          {intl.formatMessage({
            id: 'themeLight',
            defaultMessage: 'Light',
          })}
        </option>
        <option value="dark">
          {intl.formatMessage({
            id: 'themeDark',
            defaultMessage: 'Dark',
          })}
        </option>
      </select>
    </>
  );
}
