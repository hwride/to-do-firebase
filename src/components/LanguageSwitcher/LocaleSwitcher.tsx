import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styles from '../ToDoList/ToDoList.module.css';
import { SupportedLocale } from './type';

export function LocaleSwitcher({
  locale,
  setLocale,
}: {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}) {
  const intl = useIntl();
  return (
    <div>
      <label htmlFor="locale-selector" className={styles.themeSelectorLabel}>
        <FormattedMessage id="localeButton" defaultMessage="Locale" />
      </label>
      <select
        id="locale-selector"
        value={locale}
        onChange={(evt) => {
          const newLocale = evt.target.value;
          setLocale(newLocale as SupportedLocale);
        }}
      >
        {/* For some reason FormattedMessage didn't work in the <option> elements */}
        <option value="en">
          {intl.formatMessage({
            id: 'localeEn',
            defaultMessage: 'English',
          })}
        </option>
        <option value="fr">
          {intl.formatMessage({
            id: 'localeFr',
            defaultMessage: 'French',
          })}
        </option>
        <option value="ru">
          {intl.formatMessage({
            id: 'localeRu',
            defaultMessage: 'Russian',
          })}
        </option>
      </select>
    </div>
  );
}
