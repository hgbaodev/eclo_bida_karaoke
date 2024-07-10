'use client';
import { Dropdown, Button } from 'rizzui';
import { type Locale } from '@/lib/locales';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function LanguagePicker() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('en'); // Default to 'en'
  const locale = useLocale() as Locale;
  const router = useRouter();

  useEffect(() => {
    // Read the current locale from the cookie
    const cookieLocale = document.cookie
      .split('; ')
      .find((row) => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1] as Locale;

    if (cookieLocale) {
      setCurrentLocale(cookieLocale);
    } else {
      setCurrentLocale(locale);
    }
  }, [locale]);

  function handleLocaleChange(newLocale: Locale): void {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    setCurrentLocale(newLocale);
    router.refresh();
  }

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="outline">{currentLocale === 'en' ? 'English' : 'Tiếng Việt'}</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleLocaleChange('en')}>English</Dropdown.Item>
        <Dropdown.Item onClick={() => handleLocaleChange('vi')}>Tiếng Việt</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
