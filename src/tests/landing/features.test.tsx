/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { HowItWorks } from '@/components/landing/how-it-works';
import { appConfig } from '@/config/app.config';
import { render, screen, within } from '@testing-library/react';
import { Features } from '@/components/landing/features';
// FEATURES: {
//   EYEBROW_TEXT: 'BUILT AROUND YOUR CHOICES',
//   MAIN_HEADING_TEXT: 'Features',
//   DESCRIPTION: 'The essentials for putting your next PC together, one component at a time.',
//   ITEMS: [
//     { iconName: 'Layers', title: 'Eight component categories', description: 'Choose your CPU, graphics card, motherboard, RAM, storage, power supply, case, and cooling.' },
//     { iconName: 'RefreshCw', title: 'Swap parts as you go', description: 'Change a selected component from its category dialog while keeping the rest of your configuration.' },
//     { iconName: 'Calculator', title: 'A total that keeps up', description: 'See individual component prices and a running total based on the parts in your current build.' },
//     { iconName: 'Save', title: 'Save your configuration', description: 'Give your build a name and save the selected components and total price to your account.' },
//   ],
// },

describe('features', () => {
  test('render section by heading name', () => {
    render(<Features />);

    const section = screen.getByRole('region', {
      name: appConfig.TEXT.LANDING.FEATURES.MAIN_HEADING_TEXT
    });

    const heading = within(section).getByRole('heading', {
      level: 2,
      name: appConfig.TEXT.LANDING.FEATURES.MAIN_HEADING_TEXT
    });

    expect(section).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });

  test('features list inside section and all items are inside list', () => {
    render(<Features />);

    const section = screen.getByRole('region', {
      name: appConfig.TEXT.LANDING.FEATURES.MAIN_HEADING_TEXT
    });

    const list = within(section).getByRole('list');
    const items = within(list).getAllByRole('listitem');

    expect(list.tagName).toBe('UL');
    expect(items).toHaveLength(appConfig.TEXT.LANDING.FEATURES.ITEMS.length);

    items.forEach((item, index) => {
      const heading = within(item).getByRole('heading', {
        level: 3,
        name: appConfig.TEXT.LANDING.FEATURES.ITEMS[index].title
      });

      const description = within(item).getByText(appConfig.TEXT.LANDING.FEATURES.ITEMS[index].description);
      expect(heading).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });
});