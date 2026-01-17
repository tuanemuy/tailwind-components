import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { TwoFactorModal } from "./index";

const meta: Meta<typeof TwoFactorModal> = {
  title: "Organisms/Overlays/TwoFactorModal",
  component: TwoFactorModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TwoFactorModal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Enable 2FA</Button>
        <TwoFactorModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onComplete={(data) => {
            console.log("2FA completed:", data);
            setIsOpen(false);
          }}
          secretKey="JBSWY3DPEHPK3PXP"
          qrCodeUrl="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/MyApp:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=MyApp"
          backupCodes={[
            "ABCD-1234",
            "EFGH-5678",
            "IJKL-9012",
            "MNOP-3456",
            "QRST-7890",
            "UVWX-1234",
            "YZAB-5678",
            "CDEF-9012",
          ]}
        />
      </>
    );
  },
};

export const WithLoading: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Enable 2FA (Loading)</Button>
        <TwoFactorModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onComplete={(data) => {
            setLoading(true);
            setTimeout(() => {
              console.log("2FA completed:", data);
              setLoading(false);
              setIsOpen(false);
            }, 2000);
          }}
          secretKey="JBSWY3DPEHPK3PXP"
          qrCodeUrl="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/MyApp:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=MyApp"
          backupCodes={[
            "ABCD-1234",
            "EFGH-5678",
            "IJKL-9012",
            "MNOP-3456",
            "QRST-7890",
            "UVWX-1234",
          ]}
          loading={loading}
        />
      </>
    );
  },
};

export const CustomBranding: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Setup Authenticator</Button>
        <TwoFactorModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onComplete={(data) => {
            console.log("2FA completed:", data);
            setIsOpen(false);
          }}
          secretKey="JBSWY3DPEHPK3PXP"
          qrCodeUrl="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/SecureApp:admin@company.com?secret=JBSWY3DPEHPK3PXP&issuer=SecureApp"
          backupCodes={[
            "SECURE-0001",
            "SECURE-0002",
            "SECURE-0003",
            "SECURE-0004",
            "SECURE-0005",
            "SECURE-0006",
            "SECURE-0007",
            "SECURE-0008",
            "SECURE-0009",
            "SECURE-0010",
          ]}
          title="Setup Two-Factor Authentication"
        />
      </>
    );
  },
};
