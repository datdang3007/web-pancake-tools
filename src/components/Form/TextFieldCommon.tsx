import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useMemo } from "react";
import { RegisterOptions, UseFormReturn, useController } from "react-hook-form";
import { Clear, SearchSharp } from "@mui/icons-material";
import { useTheme } from "@mui/material";

export type TextFieldCommonProps = TextFieldProps & {
  name: string;
  rules?: RegisterOptions;
  form: Omit<UseFormReturn, "name">;
};

export const TextFieldCommon = (props: TextFieldCommonProps) => {
  const theme = useTheme();
  const { name, form, rules, onChange: onChangeProp, ...rest } = props;
  const { formState, setFocus, setValue } = form;
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
    <TextField
      id={name}
      {...field}
      inputRef={ref}
      autoComplete="off"
      value={value ?? ""}
      error={!!errors[name]}
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
      FormHelperTextProps={{
        title: (errors?.message ?? "") as string,
        sx: {
          bottom: 2,
          width: "100%",
          overflow: "hidden",
          position: "absolute",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        },
      }}
      required={props.required ?? Boolean(props.rules?.required)}
      {...rest}
    />
  );
};
