/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { Hero } from "@/components/landing/hero"
import { render, screen } from "@testing-library/react"
import { appConfig } from '@/config/app.config';

// Рендерит настоящий <Hero />, импортированный из @/components/landing/hero.
// Находит заголовок первого уровня по имени Build Beyond Limits..
// Проверяет, что заголовок присутствует в документе.
// Проверяет, что Hero содержит текст YOUR NEXT BUILD STARTS HERE.
describe('Hero', () => {

  test('main heading and next build text are present', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', {
      level: 1,
      name: `${appConfig.TEXT.LANDING.HERO.MAIN_HEADING_TEXT.main} ${appConfig.TEXT.LANDING.HERO.MAIN_HEADING_TEXT.hightLighted}`
    });

    const nextBuildtext = screen.getByText(appConfig.TEXT.LANDING.HERO.NEXT_BUILD_TEXT);

    expect(heading).toBeInTheDocument();
    expect(nextBuildtext).toBeInTheDocument();
  });

  test('renders CTA link with correct dashboard href', () => {
    render(<Hero />);

    const btn = screen.getByRole('link', {
      name: appConfig.TEXT.LANDING.HERO.CTA_BUTTON_MAIN
    });

    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('href', appConfig.ROUTES.dashboard);
  });

  test('renders all feature blocks', () => {
    render(<Hero />);

    const list = screen.getAllByRole('listitem');
    expect(list).toHaveLength(3);

    list.forEach((item, index) => {
      expect(item).toHaveTextContent(appConfig.TEXT.LANDING.HERO.FEATURES_LIST[index].primary);
      expect(item).toHaveTextContent(appConfig.TEXT.LANDING.HERO.FEATURES_LIST[index].secondary);
    });
  });

  test('render hero img', () => {
    render(<Hero />);

    const image = screen.getByRole('img', {
      name: appConfig.TEXT.LANDING.HERO.MAIN_IMG_ALT
    });

    expect(image).toHaveAttribute('src', expect.stringContaining('hero-pc-cutout.png'));
  });
});