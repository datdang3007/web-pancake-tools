import { TextField, TextFieldProps, Tooltip } from "@mui/material";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { RegisterOptions, UseFormReturn, useController } from "react-hook-form";

export type TextFieldCommonProps = TextFieldProps & {
  name: string;
  rules?: RegisterOptions;
  form: Omit<UseFormReturn, "name">;
};

export const TextFieldCommon = (props: TextFieldCommonProps) => {
  const { name, form, rules, onChange: onChangeProp, ...rest } = props;
  const [focused, setFocused] = useState<boolean>(false);
  const { formState } = form;
  const { errors } = formState;

  const {
    field: { onChange, value, ref, ...field },
  } = useController({
    name,
    control: form.control,
    rules: {
      ...rules,
    },
  });

  const toolTipTitle = useMemo(() => {
    if (!focused) {
      return errors[name]?.message ?? value;
    }

    if (focused && !value) {
      return errors[name]?.message ?? value;
    }

    return "";
  }, [errors, focused, name, value]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const maxLength = props.inputProps?.maxLength as number;
      if (maxLength) {
        event.target.value = event.target.value.substring(0, maxLength);
      }
      onChange(event.target.value);
      onChangeProp?.(event);
    },
    [onChange, onChangeProp, props.inputProps?.maxLength]
  );

  return (
    <Tooltip title={toolTipTitle} enterDelay={500}>
      <TextField
        id={name}
        {...field}
        inputRef={ref}
        autoComplete="off"
        value={value ?? ""}
        error={!!errors[name]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={handleChange}
        InputLabelProps={{
          title: props.label as string,
          shrink: true,
        }}
        InputProps={{
          sx: {
            input: {
              paddingBlock: 1.25,
              paddingInline: 2,
            },
          },
        }}
        // required={props.required ?? Boolean(props.rules?.required)}
        {...rest}
      />
    </Tooltip>
  );
};
