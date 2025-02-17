import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";

type ControllerInputProps<FData extends FieldValues> = {
  control: Control<FData, unknown>;
  name: Path<FData>;
  type: HTMLInputElement["type"];
  placeholder?: string;
  label?: string;
  value?: string;
};
export const ControllerInput = <FData extends FieldValues>({
  control,
  name,
  type,
  placeholder,
  label,
  value,
}: ControllerInputProps<FData>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative">
          {label ? <Label htmlFor={name}>{label}</Label> : null}
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            value={value}
            className={clsx(
              " focus-visible:ring-2 focus-visible:ring-offset-0",
              error ? "ring-2 ring-red-600  focus-visible:ring-red-600" : ""
            )}
          />
          {error ? (
            <p className="absolute top-[105%] right-0 text-xs text-red-600">
              {error.message}
            </p>
          ) : null}
        </div>
      )}
    />
  );
};
