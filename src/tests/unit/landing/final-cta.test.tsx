/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { appConfig } from '@/config/app.config';
import { render, screen, within } from '@testing-library/react';
import { FinalCta } from '@/components/landing/final-cta';

describe('', () => {
  test('render section content', () => {
    render(<FinalCta />);
    const section = screen.getByRole('region', {
      name: appConfig.TEXT.LANDING.FINAL_CTA.MAIN_HEADING_TEXT
    });

    const eyebrowText = within(section).getByText(appConfig.TEXT.LANDING.FINAL_CTA.EYEBROW_TEXT);
    expect(eyebrowText).toBeInTheDocument();

    const description = within(section).getByText(appConfig.TEXT.LANDING.FINAL_CTA.DESCRIPTION);
    expect(description).toBeInTheDocument();

    const heading = within(section).getByRole('heading', {
      name: appConfig.TEXT.LANDING.FINAL_CTA.MAIN_HEADING_TEXT
    });
    expect(heading).toBeInTheDocument();

    const signInText = within(section).getByText(appConfig.TEXT.LANDING.FINAL_CTA.SIGN_IN_TEXT);
    expect(signInText).toBeInTheDocument();
  });

  test('render CTA navigation element', () => {
    render(<FinalCta />);
    // screen.debug();
    const redirectLink = screen.getByRole('button', {
      name: appConfig.TEXT.LANDING.FINAL_CTA.CTA_BUTTON_MAIN
    });

    expect(redirectLink).toHaveAttribute('href', appConfig.ROUTES.dashboard);
  });

});