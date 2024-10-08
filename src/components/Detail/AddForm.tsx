import { Circle, Create, Delete } from "@mui/icons-material";
import {
  Card,
  Grid2,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { showAlertError } from "../../utils";
import { ButtonCommon } from "../Buttons";
import { TextFieldCommon } from "../Form";

type Props = {
  form: any;
  onSubmit: () => void;
};

export const AddForm = (props: Props) => {
  const { form, onSubmit } = props;
  const { control } = form;
  const inputNameFilterRef = useRef<HTMLInputElement>(null);
  const [selectNameFilterIDX, setSelectNameFilterIDX] = useState<number | null>(
    null
  );

  const inputFilterForm = useForm<any>({
    defaultValues: {
      input_filter: "",
    },
  });
  const {
    setValue: setValueInputFilterForm,
    getValues: getValuesInputFilterForm,
  } = inputFilterForm;

  const {
    fields: nameFilters,
    append,
    update,
    remove,
    replace,
  } = useFieldArray<any, any>({
    control,
    name: "name_filters",
  });

  // Handle Delete Name Filter
  const handleClickIconDelete = useCallback(
    (item: any, index: number) => {
      // If selectNameFilterIDX is not null, handleEditNameFilter
      if (selectNameFilterIDX === index + 1) {
        setSelectNameFilterIDX(null);
        setValueInputFilterForm("input_filter", "");
      }

      // Remove name filter from the list
      remove(index);
    },
    [remove, selectNameFilterIDX, setValueInputFilterForm]
  );

  // Handle Edit Name Filter
  const handleEditNameFilter = useCallback(() => {
    // If selectNameFilterIDX is null, return
    if (!selectNameFilterIDX) return;

    const index = selectNameFilterIDX - 1;
    const { input_filter } = getValuesInputFilterForm();
    const newInputFilter = input_filter.trim().toLowerCase();

    // If input_filter is empty, return
    update(index, { name: newInputFilter });
    setSelectNameFilterIDX(null);
    setValueInputFilterForm("input_filter", "");
  }, [
    update,
    selectNameFilterIDX,
    setValueInputFilterForm,
    getValuesInputFilterForm,
  ]);

  const handleClickIconEditNameFilter = useCallback(
    (item: any, index: number) => {
      // If inputNameFilterRef is not null, focus on it
      if (inputNameFilterRef?.current) {
        inputNameFilterRef.current.focus();
      }

      // If selectNameFilterIDX is not null, handleEditNameFilter
      if (selectNameFilterIDX) {
        handleEditNameFilter();
      }

      // Set selectNameFilterIDX and input_filter
      setSelectNameFilterIDX(index + 1);
      setValueInputFilterForm("input_filter", item?.name ?? "");
    },
    [handleEditNameFilter, selectNameFilterIDX, setValueInputFilterForm]
  );

  const handleAddMoreNameFilter = useCallback(() => {
    const { input_filter } = getValuesInputFilterForm();
    const newInputFilter = input_filter.trim().toLowerCase();

    // If input_filter is empty, return
    if (!newInputFilter) return;

    // Check if existed
    const existed = nameFilters.find(
      (field: any) => field.name === newInputFilter
    );

    // If existed, return
    if (existed) {
      showAlertError("Tên sản phẩm đã tồn tại");
      return;
    }

    // Append new name filter to the list
    append({ name: newInputFilter });
    setValueInputFilterForm("input_filter", "");
  }, [getValuesInputFilterForm, nameFilters, append, setValueInputFilterForm]);

  // Sort name filters by length DESC
  useEffect(() => {
    const sortedNameFilters = [...nameFilters].sort(
      (a: any, b: any) => b.name.length - a.name.length
    );
    if (!haveSameNamesButDifferentOrder(nameFilters, sortedNameFilters)) return;
    replace(sortedNameFilters);
  }, [replace, nameFilters]);

  return (
    <Card
      sx={{
        padding: 2,
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <Grid2
        container
        height={1}
        rowGap={2.5}
        component="form"
        onSubmit={onSubmit}
        flexDirection="column"
      >
        {/* Title */}
        <Grid2 container size="auto">
          <Typography fontWeight="bold" fontSize={20}>
            Thêm sản phẩm
          </Typography>
        </Grid2>

        {/* Tên sản phẩm khi lên đơn */}
        <Grid2 container size="auto">
          <TextFieldCommon
            form={form}
            fullWidth
            autoFocus
            name="name_order"
            label="Tên sản phẩm khi lên đơn"
            rules={{
              required: "Tên sản phẩm không được để trống",
            }}
          />
        </Grid2>

        {/* Tên sản phẩm trong tin nhắn */}
        <Grid2 container size="auto" columnGap={1.5}>
          {/* Input Filter */}
          <Grid2 container size="grow">
            <TextFieldCommon
              fullWidth
              name="input_filter"
              form={inputFilterForm}
              inputRef={inputNameFilterRef}
              label="Tên sản phẩm trong tin nhắn"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();

                  // If selectNameFilterID is not null, handleEditNameFilter
                  if (selectNameFilterIDX) {
                    handleEditNameFilter();
                    return;
                  }

                  // Otherwise, handleAddMoreNameFilter
                  handleAddMoreNameFilter();
                }
              }}
            />
          </Grid2>

          {/* Button Add */}
          <Grid2 container size="auto">
            {selectNameFilterIDX ? (
              <ButtonCommon variant="contained" onClick={handleEditNameFilter}>
                <Typography fontSize={14}>Chỉnh sửa</Typography>
              </ButtonCommon>
            ) : (
              <ButtonCommon
                variant="contained"
                onClick={handleAddMoreNameFilter}
              >
                <Typography fontSize={14}>Thêm tên</Typography>
              </ButtonCommon>
            )}
          </Grid2>
        </Grid2>

        <Grid2 container size="grow" rowGap={1.5} flexDirection="column">
          {/* Danh sách tên sản phẩm trong tin nhắn */}
          <Grid2 container size="grow">
            <Card
              sx={{
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <Grid2 container flexDirection="column">
                {/* Title */}
                <Grid2
                  container
                  size="auto"
                  sx={{
                    paddingBlock: 1,
                    paddingInline: 2,
                  }}
                >
                  <Typography fontWeight="bold" fontSize={16}>
                    Danh sách tên sản phẩm trong tin nhắn
                  </Typography>
                </Grid2>

                {/* List */}
                <Grid2 container size="grow">
                  <List sx={{ width: "100%" }}>
                    {nameFilters.length === 0 && (
                      <ListItem>
                        <Typography fontSize={14}>
                          {`<`}Chưa có tên sản phẩm trong tin nhắn{`>`}
                        </Typography>
                      </ListItem>
                    )}

                    {nameFilters.map((field: any, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          width: "100%",
                        }}
                      >
                        <Grid2 container size={12}>
                          <Grid2
                            container
                            size="grow"
                            columnGap={1}
                            alignItems="center"
                          >
                            <Circle sx={{ fontSize: 8 }} />
                            <Typography fontSize={16}>{field.name}</Typography>
                          </Grid2>

                          <Grid2 container size="auto" columnGap={1}>
                            <IconButton
                              color="success"
                              onClick={() =>
                                handleClickIconEditNameFilter(field, index)
                              }
                            >
                              <Create sx={{ fontSize: 18 }} />
                            </IconButton>

                            <IconButton
                              color="error"
                              onClick={() => {
                                handleClickIconDelete(field, index);
                              }}
                            >
                              <Delete sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Grid2>
                        </Grid2>
                      </ListItem>
                    ))}
                  </List>
                </Grid2>
              </Grid2>
            </Card>
          </Grid2>

          {/* Button Actions */}
          <Grid2 container size="auto">
            <Grid2 container>
              <ButtonCommon type="submit" variant="contained">
                <Typography fontSize={14}>Tạo</Typography>
              </ButtonCommon>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </Card>
  );
};

const haveSameNamesButDifferentOrder = (arr1: any[], arr2: any[]) => {
  // Kiểm tra nếu hai mảng có độ dài khác nhau
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Lấy tất cả giá trị của trường 'name' từ cả hai mảng và sắp xếp
  const namesArr1 = arr1.map((item) => item.name).sort();
  const namesArr2 = arr2.map((item) => item.name).sort();

  // So sánh hai mảng giá trị 'name' đã sắp xếp
  for (let i = 0; i < namesArr1.length; i++) {
    if (namesArr1[i] !== namesArr2[i]) {
      return false;
    }
  }

  // Kiểm tra nếu có sự khác biệt về vị trí
  return !arr1.every((item, index) => item.name === arr2[index].name);
};
