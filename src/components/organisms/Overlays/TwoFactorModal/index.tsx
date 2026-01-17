import { forwardRef, useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Step, Stepper } from "@/components/molecules/Stepper";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/organisms/Layout/Modal";
import { CheckCircleIcon, CheckIcon, CopyIcon, LockIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type TwoFactorStep = "setup" | "verify" | "backup" | "complete";

export interface TwoFactorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: { method: string; code: string }) => void;
  title?: string;
  qrCodeUrl?: string;
  secretKey?: string;
  backupCodes?: string[];
  onRequestNewBackupCodes?: () => void;
  onResendCode?: () => void;
  loading?: boolean;
  className?: string;
}

export const TwoFactorModal = forwardRef<HTMLDivElement, TwoFactorModalProps>(
  (
    {
      isOpen,
      onClose,
      onComplete,
      title = "Enable Two-Factor Authentication",
      qrCodeUrl,
      secretKey,
      backupCodes = [],
      onRequestNewBackupCodes,
      onResendCode,
      loading,
      className,
    },
    ref,
  ) => {
    const [currentStep, setCurrentStep] = useState<TwoFactorStep>("setup");
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [copiedSecret, setCopiedSecret] = useState(false);
    const [copiedBackup, setCopiedBackup] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
      if (isOpen) {
        setCurrentStep("setup");
        setCode(["", "", "", "", "", ""]);
        setCopiedSecret(false);
        setCopiedBackup(false);
      }
    }, [isOpen]);

    const handleCodeChange = (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return;

      const newCode = [...code];
      newCode[index] = value.slice(-1);
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedText = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);
      const newCode = [...code];
      for (let i = 0; i < pastedText.length; i++) {
        newCode[i] = pastedText[i];
      }
      setCode(newCode);
      inputRefs.current[Math.min(pastedText.length, 5)]?.focus();
    };

    const copyToClipboard = async (
      text: string,
      setCopied: (v: boolean) => void,
    ) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback
      }
    };

    const handleVerify = () => {
      const fullCode = code.join("");
      if (fullCode.length === 6) {
        if (backupCodes.length > 0) {
          setCurrentStep("backup");
        } else {
          setCurrentStep("complete");
        }
      }
    };

    const handleComplete = () => {
      onComplete({ method: "totp", code: code.join("") });
    };

    const steps = [
      { id: "setup", label: "Setup" },
      { id: "verify", label: "Verify" },
      ...(backupCodes.length > 0 ? [{ id: "backup", label: "Backup" }] : []),
      { id: "complete", label: "Complete" },
    ];

    const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
          title={title}
          subtitle="Add an extra layer of security to your account"
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="space-y-6">
            {/* Stepper */}
            <Stepper currentStep={currentStepIndex} size="sm">
              {steps.map((step, index) => (
                <Step
                  key={step.id}
                  label={step.label}
                  status={
                    index < currentStepIndex
                      ? "completed"
                      : index === currentStepIndex
                        ? "current"
                        : "upcoming"
                  }
                />
              ))}
            </Stepper>

            {/* Setup step */}
            {currentStep === "setup" && (
              <div className="space-y-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Scan this QR code with your authenticator app
                </p>

                {/* QR Code */}
                {qrCodeUrl ? (
                  <div className="mx-auto w-fit rounded-lg border border-border bg-white p-4">
                    <img
                      src={qrCodeUrl}
                      alt="QR Code for 2FA setup"
                      className="size-48"
                    />
                  </div>
                ) : (
                  <div className="mx-auto flex size-48 items-center justify-center rounded-lg border border-dashed border-border bg-muted">
                    <LockIcon className="size-12 text-muted-foreground" />
                  </div>
                )}

                {/* Secret key */}
                {secretKey && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Or enter this code manually:
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <code className="rounded bg-muted px-3 py-2 font-mono text-sm">
                        {secretKey}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(secretKey, setCopiedSecret)
                        }
                      >
                        {copiedSecret ? (
                          <CheckIcon className="size-4 text-success" />
                        ) : (
                          <CopyIcon className="size-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Verify step */}
            {currentStep === "verify" && (
              <div className="space-y-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit code from your authenticator app
                </p>

                {/* Code input */}
                <div
                  className="flex justify-center gap-2"
                  onPaste={handlePaste}
                >
                  {code.map((digit, index) => (
                    <input
                      // biome-ignore lint/suspicious/noArrayIndexKey: Input position represents digit position in code
                      key={`code-input-${index}`}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      disabled={loading}
                      className={cn(
                        "size-12 rounded-lg border border-border bg-background text-center font-mono text-xl font-semibold",
                        "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                        "disabled:opacity-50",
                      )}
                    />
                  ))}
                </div>

                {onResendCode && (
                  <p className="text-sm text-muted-foreground">
                    Didn't receive a code?{" "}
                    <button
                      type="button"
                      onClick={onResendCode}
                      className="font-medium text-primary hover:underline"
                    >
                      Resend
                    </button>
                  </p>
                )}
              </div>
            )}

            {/* Backup codes step */}
            {currentStep === "backup" && (
              <div className="space-y-4">
                <div className="rounded-lg border border-warning/50 bg-warning/10 p-3">
                  <p className="text-sm text-warning">
                    <strong>Important:</strong> Save these backup codes in a
                    secure place. You can use them to access your account if you
                    lose your authenticator device.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 rounded-lg border border-border p-4">
                  {backupCodes.map((code) => (
                    <code
                      key={code}
                      className="font-mono text-sm text-foreground"
                    >
                      {code}
                    </code>
                  ))}
                </div>

                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(backupCodes.join("\n"), setCopiedBackup)
                    }
                  >
                    {copiedBackup ? (
                      <>
                        <CheckIcon className="size-4 text-success" />
                        Copied
                      </>
                    ) : (
                      <>
                        <CopyIcon className="size-4" />
                        Copy codes
                      </>
                    )}
                  </Button>
                  {onRequestNewBackupCodes && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onRequestNewBackupCodes}
                    >
                      Generate new codes
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Complete step */}
            {currentStep === "complete" && (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/10">
                  <CheckCircleIcon className="size-8 text-success" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">
                    Two-factor authentication enabled
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your account is now more secure. You'll need to enter a code
                    from your authenticator app when signing in.
                  </p>
                </div>
              </div>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          {currentStep === "setup" && (
            <>
              <Button variant="outline" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => setCurrentStep("verify")}
                loading={loading}
              >
                Continue
              </Button>
            </>
          )}

          {currentStep === "verify" && (
            <>
              <Button
                variant="outline"
                onClick={() => setCurrentStep("setup")}
                disabled={loading}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleVerify}
                loading={loading}
                disabled={code.some((d) => !d)}
              >
                Verify
              </Button>
            </>
          )}

          {currentStep === "backup" && (
            <>
              <Button
                variant="outline"
                onClick={() => setCurrentStep("verify")}
                disabled={loading}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => setCurrentStep("complete")}
                loading={loading}
              >
                I've saved my codes
              </Button>
            </>
          )}

          {currentStep === "complete" && (
            <Button
              variant="primary"
              onClick={handleComplete}
              className="w-full"
            >
              Done
            </Button>
          )}
        </ModalFooter>
      </Modal>
    );
  },
);
TwoFactorModal.displayName = "TwoFactorModal";
