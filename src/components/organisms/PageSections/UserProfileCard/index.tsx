import { forwardRef } from "react";
import { cn } from "@/components/utils";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";

export interface UserProfileCardDetail {
  label: string;
  value: React.ReactNode;
}

export interface UserProfileCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  avatarSrc?: string;
  avatarFallback?: string;
  details: UserProfileCardDetail[];
  onDelete?: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  deleteLabel?: string;
  cancelLabel?: string;
  showFooter?: boolean;
}

// SVG Header Background Component
const SvgHeaderBackground = () => (
  <figure className="shrink-0 h-40 overflow-hidden rounded-t-xl">
    <svg
      className="w-full h-40 rounded-t-xl"
      preserveAspectRatio="xMidYMid slice"
      width="1113"
      height="161"
      viewBox="0 0 1113 161"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Decorative header background"
    >
      <g clipPath="url(#clip0_697_201879)">
        <rect x="1" width="1112" height="348" fill="#B2E7FE" />
        <rect
          width="185.209"
          height="704.432"
          transform="matrix(0.50392 0.86375 -0.860909 0.508759 435.452 -177.87)"
          fill="#FF8F5D"
        />
        <rect
          width="184.653"
          height="378.667"
          transform="matrix(0.849839 -0.527043 0.522157 0.852849 -10.4556 -16.4521)"
          fill="#3ECEED"
        />
        <rect
          width="184.653"
          height="189.175"
          transform="matrix(0.849839 -0.527043 0.522157 0.852849 35.4456 58.5195)"
          fill="#4C48FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_697_201879">
          <rect x="0.5" width="1112" height="161" rx="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </figure>
);

export const UserProfileCard = forwardRef<HTMLDivElement, UserProfileCardProps>(
  (
    {
      className,
      avatarSrc,
      avatarFallback = "U",
      details,
      onDelete,
      onCancel,
      onSubmit,
      submitLabel = "Add user",
      deleteLabel = "Delete",
      cancelLabel = "Cancel",
      showFooter = true,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-card border border-border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700",
          className
        )}
        {...props}
      >
        {/* SVG Background Element */}
        <SvgHeaderBackground />

        {/* Avatar */}
        <div className="-mt-24">
          <div className="relative flex size-30 mx-auto border-4 border-background rounded-full dark:border-neutral-800">
            <Avatar
              src={avatarSrc}
              fallback={avatarFallback}
              className="size-full"
            />
          </div>
        </div>

        {/* Body - Description List */}
        <div className="p-4 sm:p-8">
          <dl className="grid grid-cols-2 gap-y-2 gap-x-4">
            {details.map((detail) => (
              <div key={detail.label} className="contents">
                <dt className="py-1 text-end text-sm text-muted-foreground">
                  {detail.label}:
                </dt>
                <dd className="py-1 font-medium text-sm text-foreground">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Footer */}
        {showFooter && (
          <div className="p-4 flex flex-wrap justify-between gap-2 border-t border-border">
            <div>
              {onDelete && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onDelete}
                  className="text-destructive hover:text-destructive"
                >
                  {deleteLabel}
                </Button>
              )}
            </div>

            <div className="flex-1 flex justify-end items-center gap-2">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onCancel}
                >
                  {cancelLabel}
                </Button>
              )}

              {onSubmit && (
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={onSubmit}
                >
                  {submitLabel}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);
UserProfileCard.displayName = "UserProfileCard";

// Country flag component for displaying country with flag
export interface CountryValueProps {
  countryCode: "gb" | "us" | "jp" | "de" | "fr";
  countryName: string;
}

const flagPaths: Record<string, React.ReactNode> = {
  gb: (
    <>
      <path fill="#012169" d="M0 0h512v512H0z" />
      <path
        fill="#FFF"
        d="M512 0v64L322 256l190 187v69h-67L254 324 68 512H0v-68l186-187L0 74V0h62l192 188L440 0z"
      />
      <path
        fill="#C8102E"
        d="M184 324l11 34L42 512H0v-3l184-185zm124-12l54 8 150 147v45L308 312zM512 0L320 196l-4-44L466 0h46zM0 1l193 189-59-8L0 49V1z"
      />
      <path fill="#FFF" d="M176 0v512h160V0H176zM0 176v160h512V176H0z" />
      <path fill="#C8102E" d="M0 208v96h512v-96H0zM208 0v512h96V0h-96z" />
    </>
  ),
  us: (
    <>
      <path fill="#B22234" d="M0 0h512v512H0z" />
      <path
        fill="#fff"
        d="M0 59h512v39H0zm0 78h512v39H0zm0 78h512v39H0zm0 78h512v39H0zm0 78h512v39H0zm0 78h512v39H0z"
      />
      <path fill="#3C3B6E" d="M0 0h205v275H0z" />
    </>
  ),
  jp: (
    <>
      <path fill="#fff" d="M0 0h512v512H0z" />
      <circle cx="256" cy="256" r="111" fill="#bc002d" />
    </>
  ),
  de: (
    <>
      <path fill="#000" d="M0 0h512v171H0z" />
      <path fill="#D00" d="M0 171h512v170H0z" />
      <path fill="#FFCE00" d="M0 341h512v171H0z" />
    </>
  ),
  fr: (
    <>
      <path fill="#002395" d="M0 0h171v512H0z" />
      <path fill="#fff" d="M171 0h170v512H171z" />
      <path fill="#ED2939" d="M341 0h171v512H341z" />
    </>
  ),
};

export const CountryValue = ({ countryCode, countryName }: CountryValueProps) => (
  <span className="flex items-center gap-x-1.5">
    <svg
      className="shrink-0 size-4 rounded-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      role="img"
      aria-label={`${countryName} flag`}
    >
      {flagPaths[countryCode]}
    </svg>
    {countryName}
  </span>
);
