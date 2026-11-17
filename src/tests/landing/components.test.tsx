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

describe('components', () => {
  test('render section content and list', () => {
    render(<Components />);

    const section = screen.getByRole('region', {
      name: appConfig.TEXT.LANDING.COMPONENTS.MAIN_HEADING_TEXT
    });
    const heading = within(section).getByRole('heading', {
      level: 2,
      name: appConfig.TEXT.LANDING.COMPONENTS.MAIN_HEADING_TEXT
    });

    const description = within(section).getByText(appConfig.TEXT.LANDING.COMPONENTS.DESCRIPTION);

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(section).toHaveTextContent(appConfig.TEXT.LANDING.COMPONENTS.EYEBROW_TEXT);

    const list = within(section).getByRole('list')
    const items = within(list).getAllByRole('listitem');

    expect(list.tagName).toBe('UL');
    expect(items).toHaveLength(componentCategories.length);

    items.forEach((item, index) => {
      const nameKey = componentCategories[index].id as keyof typeof appConfig.TEXT.LANDING.COMPONENTS.CATEGORY_NAMES;
      const heading = within(item).getByRole('heading', {
        level: 3,
        name: appConfig.TEXT.LANDING.COMPONENTS.CATEGORY_NAMES[nameKey]
      });

      const svg = item.querySelector('svg')
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', "true")
      expect(heading).toBeInTheDocument();
    });
  })
})