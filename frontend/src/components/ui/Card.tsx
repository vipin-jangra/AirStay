import React from "react";
import clsx from "clsx";

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        "rounded-2xl md:border border-[#a3a7b8] md:shadow-sm bg-white md:p-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  return <div className={clsx("mb-4", className)}>{children}</div>;
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  return <div className={clsx("space-y-6", className)}>{children}</div>;
};
