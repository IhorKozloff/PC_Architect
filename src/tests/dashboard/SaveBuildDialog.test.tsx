/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { appConfig } from '@/config/app.config';
import { render, screen, waitFor, within } from '@testing-library/react';
import { SaveBuildDialog } from '@/app/dashboard/components/SaveBuildDialog';
import { categories, buildName } from './testData';
import userEvent from '@testing-library/user-event';
import { saveBuildAction } from '@/app/dashboard/actions';
import { toast } from 'sonner';

const mockPush = jest.fn();
const mockRefresh = jest.fn();

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}));

jest.mock('@/app/dashboard/actions', () => ({
  saveBuildAction: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

describe('SaveBuildDialog', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('render dialog and content', async () => {
    render(<SaveBuildDialog
      open={true}
      onOpenChange={jest.fn()}
      selectedByCategory={{}}
    />);

    const dialog = screen.getByRole('dialog', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.title
    });
    const title = within(dialog).getByRole('heading', {
      level: 2,
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.title
    });
    const description = within(dialog).getByText(appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.description);

    const nameInput = within(dialog).getByRole('textbox', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.buildNameInputAriaLabel
    })

    const saveBtn = within(dialog).getByRole('button', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.ctaBtn.save
    });

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();

    expect(nameInput).toBeRequired();
    expect(nameInput).toHaveAttribute('placeholder', appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.placeholder)
  });

  test('render dialog, save btn should be disabled', async () => {
    render(<SaveBuildDialog
      open={true}
      onOpenChange={jest.fn()}
      selectedByCategory={{}}
    />);

    const dialog = screen.getByRole('dialog', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.title
    });

    const saveBtn = within(dialog).getByRole('button', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.ctaBtn.save
    });

    expect(saveBtn).toBeInTheDocument();
    expect(saveBtn).toBeDisabled();
  });

  test('render dialog, save btn should be active', async () => {
    render(<SaveBuildDialog
      open={true}
      onOpenChange={jest.fn()}
      selectedByCategory={categories}
    />);

    const dialog = screen.getByRole('dialog', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.title
    });

    const saveBtn = within(dialog).getByRole('button', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.ctaBtn.save
    });

    expect(saveBtn).toBeInTheDocument();
    expect(saveBtn).not.toBeDisabled();
  });

  test('calls onOpenChange(false) when close button is clicked', async () => {
    const mockOnOpenChange = jest.fn();

    render(<SaveBuildDialog
      open={true}
      onOpenChange={mockOnOpenChange}
      selectedByCategory={{}}
    />);

    const dialog = screen.getByRole('dialog', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.title
    });
    const closeBtn = within(dialog).getByRole('button', {
      name: 'Close'
    });

    const user = userEvent.setup();
    await user.click(closeBtn);

    expect(mockOnOpenChange).toHaveBeenCalledTimes(1);
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  test('user can write build name', async () => {


    render(<SaveBuildDialog
      open={true}
      onOpenChange={jest.fn()}
      selectedByCategory={{}}
    />);

    const dialog = screen.getByRole('dialog', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.title
    });
    const nameInput = within(dialog).getByRole('textbox', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.buildNameInputAriaLabel
    })
    expect(nameInput).toHaveValue('');

    const user = userEvent.setup();
    await user.type(nameInput, buildName);

    expect(nameInput).toHaveValue(buildName);
  });

  test('submit build form', async () => {
    jest.mocked(saveBuildAction).mockResolvedValue({
      status: 'success'
    });

    render(<SaveBuildDialog
      open={true}
      onOpenChange={jest.fn()}
      selectedByCategory={categories}
    />);

    const dialog = screen.getByRole('dialog', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.title
    });
    const nameInput = within(dialog).getByRole('textbox', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.buildNameInputAriaLabel
    });


    const user = userEvent.setup();
    await user.type(nameInput, buildName);

    const saveBtn = within(dialog).getByRole('button', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.ctaBtn.save
    });
    expect(saveBtn).toBeEnabled();
    await user.click(saveBtn);

    expect(saveBuildAction).toHaveBeenCalledTimes(1);
    const calls = jest.mocked(saveBuildAction).mock.calls;
    const [_, formData] = calls[0];
    const name = formData.get('name');
    const componentIds = formData.get('componentIds');

    expect(name).toBe(buildName);
    expect(componentIds).toEqual('111,222');
  });

  test('closes dialog after successful save', async () => {
    const mockOnOpenChange = jest.fn();
    jest.mocked(saveBuildAction).mockResolvedValue({
      status: 'success'
    });

    render(<SaveBuildDialog
      open={true}
      onOpenChange={mockOnOpenChange}
      selectedByCategory={categories}
    />);

    const dialog = screen.getByRole('dialog', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.title
    });
    const nameInput = within(dialog).getByRole('textbox', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.buildNameInputAriaLabel
    });

    const user = userEvent.setup();
    await user.type(nameInput, buildName);

    const saveBtn = within(dialog).getByRole('button', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.ctaBtn.save
    });

    await user.click(saveBtn);

    await waitFor(() => {
      expect(mockOnOpenChange).toHaveBeenCalledTimes(1);
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });
  });

  test('toast notify after successful save', async () => {

    jest.mocked(saveBuildAction).mockResolvedValue({
      status: 'success'
    });

    render(<SaveBuildDialog
      open={true}
      onOpenChange={jest.fn()}
      selectedByCategory={categories}
    />);

    const dialog = screen.getByRole('dialog', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.title
    });
    const nameInput = within(dialog).getByRole('textbox', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.buildNameInputAriaLabel
    });

    const user = userEvent.setup();
    await user.type(nameInput, buildName);

    const saveBtn = within(dialog).getByRole('button', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.ctaBtn.save
    });

    await user.click(saveBtn);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith('Build saved successfully!');
    });
  });

  test('refreshes router after successful save', async () => {
    jest.mocked(saveBuildAction).mockResolvedValue({
      status: 'success'
    });

    render(<SaveBuildDialog
      open={true}
      onOpenChange={jest.fn()}
      selectedByCategory={categories}
    />);

    const dialog = screen.getByRole('dialog', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.title
    });
    const nameInput = within(dialog).getByRole('textbox', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.buildNameInputAriaLabel
    });

    const user = userEvent.setup();
    await user.type(nameInput, buildName);

    const saveBtn = within(dialog).getByRole('button', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.ctaBtn.save
    });

    await user.click(saveBtn);

    await waitFor(() => {
      expect(mockRefresh).toHaveBeenCalledTimes(1);
      expect(mockPush).not.toHaveBeenCalled();
    });

  });

  test('route after successful save', async () => {
    jest.mocked(saveBuildAction).mockResolvedValue({
      status: 'success'
    });

    render(<SaveBuildDialog
      open={true}
      onOpenChange={jest.fn()}
      selectedByCategory={categories}
      redirectPath='/'
    />);

    const dialog = screen.getByRole('dialog', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.title
    });
    const nameInput = within(dialog).getByRole('textbox', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.buildNameInputAriaLabel
    });

    const user = userEvent.setup();
    await user.type(nameInput, buildName);

    const saveBtn = within(dialog).getByRole('button', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.ctaBtn.save
    });

    await user.click(saveBtn);
    await waitFor(() => {
      expect(mockRefresh).not.toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith('/');
    })

  });


  test('resets build name after successful save', async () => {
    jest.mocked(saveBuildAction).mockResolvedValue({
      status: 'success'
    });

    render(<SaveBuildDialog
      open={true}
      onOpenChange={jest.fn()}
      selectedByCategory={categories}
    />);

    const dialog = screen.getByRole('dialog', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.title
    });
    const nameInput = within(dialog).getByRole('textbox', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.buildNameInputAriaLabel
    });

    const user = userEvent.setup();
    await user.type(nameInput, buildName);

    expect(nameInput).toHaveValue(buildName);

    const saveBtn = within(dialog).getByRole('button', {
      name: appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.ctaBtn.save
    });

    await user.click(saveBtn);
    await waitFor(() => {
      expect(nameInput).toHaveValue('');
    });
  });
});