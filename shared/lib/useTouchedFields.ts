import { useState } from "react";

export const useTouchedFields = () => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const touch = (field: string) =>
    setTouched(prev => ({ ...prev, [field]: true }));

  const isTouched = (field: string) => touched[field];

  return { touched, touch, isTouched };
};