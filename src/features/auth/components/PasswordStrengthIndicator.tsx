interface PasswordStrengthIndicatorProps {
  password?: string;
}

export const PasswordStrengthIndicator = ({ password = '' }: PasswordStrengthIndicatorProps) => {
  const getStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, label: 'ZƏİF' };
    if (pass.length > 8) score += 1;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score += 1;
    if (/\d/.test(pass)) score += 1;
    if (/[^a-zA-Z\d]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: 'ZƏİF' };
    if (score === 2) return { score: 2, label: 'NORMAL' };
    if (score === 3) return { score: 3, label: 'YAXŞI' };
    return { score: 4, label: 'GÜCLÜ' };
  };

  const { score, label } = getStrength(password);

  return (
    <div className="flex flex-col gap-1.5 w-full mt-1">
      <div className="flex gap-2 w-full h-1">
        {[1, 2, 3, 4].map((index) => {
          const isActive = index <= score;
          return (
            <div
              key={index}
              className={`flex-1 h-full rounded-full transition-colors duration-300 ${
                isActive ? 'bg-accent shadow-[0_0_8px_rgba(166,130,255,0.6)]' : 'bg-ui-surface border border-ui-border'
              }`}
            />
          );
        })}
      </div>
      <span className="text-[10px] text-ui-muted font-semibold uppercase tracking-wider mt-1">
        GÜC : <span className={score > 0 ? 'text-accent' : ''}>{label}</span>
      </span>
    </div>
  );
};
