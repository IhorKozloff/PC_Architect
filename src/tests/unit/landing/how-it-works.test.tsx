/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { HowItWorks } from '@/components/landing/how-it-works';
import { appConfig } from '@/config/app.config';
import { render, screen, within } from '@testing-library/react';

const content = appConfig.TEXT.LANDING.HOW_IT_WORKS;

describe('HowItWorks', () => {
  test('main heading and introductory text are present', () => {
    render(<HowItWorks />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: content.MAIN_HEADING_TEXT,
    });

    expect(heading).toBeInTheDocument();
    expect(screen.getByText(content.EYEBROW_TEXT)).toBeInTheDocument();
    expect(screen.getByText(content.DESCRIPTION)).toBeInTheDocument();
  });

  test('renders a section labelled by its heading', () => {
    render(<HowItWorks />);

    const section = screen.getByRole('region', { name: content.MAIN_HEADING_TEXT });

    expect(within(section).getByRole('heading', {
      level: 2,
      name: content.MAIN_HEADING_TEXT,
    })).toBeInTheDocument();
  });

  test('renders all steps in order with their headings and descriptions', () => {
    render(<HowItWorks />);

    const list = screen.getByRole('list');
    const items = within(list).getAllByRole('listitem');
    const expectedSteps = content.STEPS;

    expect(list.tagName).toBe('OL');
    expect(items).toHaveLength(expectedSteps.length);

    items.forEach((item, index) => {
      expect(within(item).getByRole('heading', {
        level: 3,
        name: expectedSteps[index].title,
      })).toBeInTheDocument();
      expect(within(item).getByText(expectedSteps[index].description)).toBeInTheDocument();
    });
  });
});
