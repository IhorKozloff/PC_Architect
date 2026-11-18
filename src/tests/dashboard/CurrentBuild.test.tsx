/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { HowItWorks } from '@/components/landing/how-it-works';
import { appConfig } from '@/config/app.config';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CurrentBuild } from '@/app/dashboard/components/CurrentBuild';

jest.mock('@/app/dashboard/components/Table', () => ({
  TableParts: () => <div data-testid="table-parts-mock" />
}));

jest.mock('@/app/dashboard/actions', () => ({
  saveBuildAction: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe('CurrentBuild', () => {
  test('opens save build dialog after clicking Build button', async () => {
    render(<CurrentBuild />);
    const buildBtn = screen.getByRole('button', {
      name: 'Build'
    });

    const closedDialog = screen.queryByRole('dialog', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.title
    });

    expect(closedDialog).not.toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(buildBtn);

    const openedDialog = screen.getByRole('dialog');
    expect(openedDialog).toBeInTheDocument();
  });

  test('close save build dialog after clicking dialog Close button', async () => {
    render(<CurrentBuild />);
    const buildBtn = screen.getByRole('button', {
      name: 'Build'
    });

    const user = userEvent.setup();
    await user.click(buildBtn);

    const openedDialog = screen.getByRole('dialog', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.title
    });
    const closeBtn = within(openedDialog).getByRole('button', {
      name: 'Close'
    });
    await user.click(closeBtn);
    const closedDialog = screen.queryByRole('dialog', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.title
    });

    expect(closedDialog).not.toBeInTheDocument();
  });
});