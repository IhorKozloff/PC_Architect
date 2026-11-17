/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { HowItWorks } from '@/components/landing/how-it-works';
import { appConfig } from '@/config/app.config';
import { render, screen, within } from '@testing-library/react';
import { Features } from '@/components/landing/features';
import { Components } from '@/components/landing/components';
import { componentCategories } from '@/lib/constants';
import { FinalCta } from '@/components/landing/final-cta';
import { Footer } from '@/components/landing/footer';
import { experimental_taintObjectReference } from 'react';

// Footer content	Название бренда и описание
// Navigation	Наличие именованной навигации
// Navigation links	Количество ссылок, названия и адреса href

// У нас также появится возможность использовать getAllByRole('link') и пройтись по ссылкам через forEach().

describe('footer', () => {
  test('render footer and info', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    const nav = within(footer).getByRole('navigation', {
      name: appConfig.TEXT.LANDING.FOOTER.NAV_LABEL
    });

    expect(footer).toBeInTheDocument();
    expect(nav).toBeInTheDocument();

    const links = within(nav).getAllByRole('link');
    expect(links).toHaveLength(appConfig.TEXT.LANDING.FOOTER.LINKS.length);

    links.forEach((item, index) => {
      expect(item.tagName).toBe('A');
      expect(item).toHaveAttribute('href', appConfig.TEXT.LANDING.FOOTER.LINKS[index].href);
      expect(item).toHaveAccessibleName(appConfig.TEXT.LANDING.FOOTER.LINKS[index].label);
    })
  })

  test('render brand and description', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    const description = within(footer).getByText(appConfig.TEXT.LANDING.FOOTER.DESCRIPTION);
    expect(description).toBeInTheDocument();


    const brandMain = within(footer).getByText(appConfig.TEXT.LANDING.FOOTER.BRAND.main);
    const brandWrapper = brandMain.closest('p');
    
    expect(brandWrapper).not.toBeNull();
    expect(brandWrapper).toHaveTextContent(appConfig.TEXT.LANDING.FOOTER.BRAND.main);
    expect(brandWrapper).toHaveTextContent(appConfig.TEXT.LANDING.FOOTER.BRAND.highlighted);
  })
})