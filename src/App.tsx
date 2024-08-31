import { SwapVert } from "@mui/icons-material";
import {
  Card,
  Container,
  debounce,
  Divider,
  Grid2,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { cloneDeep } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AddForm,
  Background,
  ButtonCommon,
  ButtonImport,
  Draggable,
  EditForm,
} from "./components";
import { randomStringID, showAlertError, showAlertSuccess } from "./utils";

interface IForm {
  name_order: string;
  name_filters: string[];
}

export interface IItems {
  id: string;
  name_order: string;
  name_filters: string[];
}

const defaultFormValues: IForm = {
  name_order: "",
  name_filters: [],
};

const App = () => {
  const [search, setSearch] = useState<string>("");
  const [items, setItems] = useState<IItems[]>([]);
  const [enableSwap, setEnableSwap] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<IItems | null>(null);
  const [itemsVisualization, setItemsVisualization] = useState<IItems[]>([]);

  const form = useForm<IForm>({ defaultValues: defaultFormValues });
  const { reset, handleSubmit } = form;

  // Handle Submit Add New Item:
  const handleSubmitAddNew = useCallback(
    (values: IForm) => {
      const { name_order, name_filters } = values;

      // Check if name_filters is empty
      if (name_filters.length === 0) {
        showAlertError("Chưa thiết lập tên sản phẩm trong tin nhắn!");
        return;
      }

      // Add new item to list
      const newItems = cloneDeep([...items]);
      newItems.push({
        id: randomStringID(),
        name_order: name_order,
        name_filters: name_filters,
      });
      setItems(newItems);
      reset(defaultFormValues);

      showAlertSuccess(`Thêm sản phẩm ${name_order} thành công`);
    },
    [items, reset]
  );

  // Handle Submit Edit Item:
  const handleSubmitEdit = useCallback(
    (values: IForm) => {
      // Check if selectItem is null
      const id = selectItem?.id;
      if (!id) return;

      // Get values
      const { name_order, name_filters } = values;

      // Check if name_filters is empty
      if (name_filters.length === 0) {
        showAlertError("Chưa thiết lập tên sản phẩm trong tin nhắn!");
        return;
      }

      // Edit item in list
      const newItems = cloneDeep([...items]);
      const index = newItems.findIndex((item) => item.id === id);
      newItems[index] = {
        id: id,
        name_order: name_order,
        name_filters: name_filters,
      };
      setItems(newItems);
      reset(defaultFormValues);

      // Show alert success
      showAlertSuccess(`Chỉnh sửa sản phẩm ${name_order} thành công`);
      setSelectItem(null);
    },
    [items, reset, selectItem]
  );

  // On Click Button Submit:
  const onSubmit = handleSubmit(
    useCallback(
      (values) => {
        if (selectItem) {
          handleSubmitEdit(values);
          return;
        }
        handleSubmitAddNew(values);
      },
      [selectItem, handleSubmitEdit, handleSubmitAddNew]
    )
  );

  // On Click Item:
  const onSelectItem = useCallback(
    (item: IItems) => {
      setSelectItem(item);
      form.reset(item);
    },
    [form]
  );

  // On Click Button Add In Header:
  const onClickButtonAdd = useCallback(() => {
    reset(defaultFormValues);
    setSelectItem(null);
  }, [reset]);

  // On Click Button Remove:
  const onClickButtonRemove = useCallback(() => {
    if (!selectItem) return;

    const newItems = items.filter((item) => item.id !== selectItem.id);
    setItems(newItems);
    setSelectItem(null);
    reset(defaultFormValues);
    showAlertSuccess(`Xóa sản phẩm ${selectItem.name_order} thành công`);
  }, [items, reset, selectItem]);

  // On Click Button Export:
  const onClickButtonExport = useCallback(() => {
    // Kiểm tra nếu không có dữ liệu
    if (items.length === 0) {
      showAlertError("Không có dữ liệu để xuất");
      return;
    }

    // Chuyển đổi mảng dữ liệu thành chuỗi JSON
    const jsonString = JSON.stringify(items);

    // Tạo một đối tượng Blob từ chuỗi JSON
    const blob = new Blob([jsonString], { type: "application/json" });

    // Tạo URL từ đối tượng Blob
    const url = URL.createObjectURL(blob);

    // Tạo một thẻ <a> để tải xuống file
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json"; // Đặt tên file
    a.click(); // Kích hoạt sự kiện click để tải xuống file

    // Hủy URL object sau khi hoàn tất để giải phóng bộ nhớ
    URL.revokeObjectURL(url);
  }, [items]);

  // On Click Button Swap:
  const onClickSwap = useCallback(() => {
    setEnableSwap((prev) => !prev);
  }, []);

  // On Change Search:
  const onChangeSearch = debounce((e) => {
    const value = e.target.value;
    if (!!value) setEnableSwap(false);
    setSearch(value);
  }, 1000);

  // Handle Data Import:
  const handleDataImport = useCallback((data: any) => {
    setItems(data);
  }, []);

  useEffect(() => {
    const itemAfterSearch = items.filter((item) => {
      return item.name_order.toLowerCase().includes(search.toLowerCase());
    });
    setItemsVisualization(itemAfterSearch);
  }, [items, search]);

  return (
    <Background>
      <Container
        maxWidth="lg"
        sx={{
          top: "4%",
          left: "50%",
          height: "80%",
          position: "absolute",
          transform: "translateX(-50%)",
        }}
      >
        <Grid2 container height={1}>
          <Paper
            elevation={3}
            sx={{
              padding: 1.5,
              width: "100%",
              height: "100%",
            }}
          >
            <Grid2 container size={12} height={1} rowGap={1.5}>
              {/* Header */}
              <Grid2 size={12} container sx={{ paddingBlock: 0.5 }}>
                {/* Title */}
                <Grid2 container size="grow">
                  <Typography sx={{ fontSize: 22, fontWeight: "bold" }}>
                    Pancake Tools
                  </Typography>
                </Grid2>

                {/* Button Actions */}
                <Grid2 container size="auto" columnGap={1.5}>
                  {/* Button Add New */}
                  <Grid2 container size="auto">
                    <ButtonImport handleDataImport={handleDataImport} />
                  </Grid2>

                  {/* Button Export */}
                  <Grid2 container size="auto">
                    <ButtonCommon
                      variant="contained"
                      onClick={onClickButtonExport}
                    >
                      <Typography fontSize={14}>Xuất dữ liệu</Typography>
                    </ButtonCommon>
                  </Grid2>

                  {/* Button Add New */}
                  <Grid2 container size="auto">
                    <ButtonCommon
                      variant="contained"
                      onClick={onClickButtonAdd}
                    >
                      <Typography fontSize={14}>Thêm mới</Typography>
                    </ButtonCommon>
                  </Grid2>
                </Grid2>
              </Grid2>

              <Grid2
                container
                size={12}
                columnSpacing={2}
                sx={{ height: "calc(100% - (41px + 12px))" }}
              >
                {/* Draggable */}
                <Grid2 container size={4} height={1}>
                  <Card sx={{ width: "100%", height: "100%" }}>
                    <Grid2 container size={12}>
                      <Paper
                        component="form"
                        sx={{
                          p: "2px 4px",
                          display: "flex",
                          alignItems: "center",
                          width: 400,
                        }}
                      >
                        {/* <IconButton sx={{ p: "10px" }} aria-label="menu">
                          <Menu />
                        </IconButton> */}
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="Tìm kiếm"
                          onChange={onChangeSearch}
                        />
                        <Divider
                          sx={{ height: 28, m: 0.5 }}
                          orientation="vertical"
                        />
                        <Tooltip
                          enterDelay={500}
                          title={`${
                            enableSwap ? "Tắt" : "Bật"
                          } thay đổi vị trí`}
                        >
                          <IconButton
                            disabled={!!search}
                            onClick={onClickSwap}
                            color={enableSwap ? "primary" : undefined}
                            sx={{
                              p: "10px",
                              color: !enableSwap
                                ? "rgba(0, 0, 0, 0.26)"
                                : undefined,
                              "&:hover": {
                                background: "rgba(0, 0, 0, 0.04)",
                              },
                            }}
                          >
                            <SwapVert />
                          </IconButton>
                        </Tooltip>
                      </Paper>
                    </Grid2>

                    {/* List Items */}
                    <Grid2
                      sx={{
                        height: "calc(100% - 48px)",
                        overflow: "auto",
                        "::-webkit-scrollbar": {
                          width: "5px",
                        },
                        "::-webkit-scrollbar-track": {
                          background: "#f1f1f1",
                        },
                        "::-webkit-scrollbar-thumb": {
                          background: "#888",
                        },
                        "::-webkit-scrollbar-thumb:hover": {
                          background: "#555",
                        },
                      }}
                    >
                      {itemsVisualization.length === 0 && (
                        <Grid2>
                          <Typography
                            sx={{
                              fontSize: 14,
                              paddingBlock: 2,
                              textAlign: "center",
                            }}
                          >
                            Không có dữ liệu
                          </Typography>
                        </Grid2>
                      )}

                      <Draggable
                        setItems={setItems}
                        enable={enableSwap}
                        items={itemsVisualization}
                        onSelectItem={onSelectItem}
                      />
                    </Grid2>
                  </Card>
                </Grid2>

                {/* Detail */}
                <Grid2 container size={8} height={1}>
                  {selectItem ? (
                    <EditForm
                      form={form}
                      onSubmit={onSubmit}
                      selectItem={selectItem}
                      onClickButtonRemove={onClickButtonRemove}
                    />
                  ) : (
                    <AddForm form={form} onSubmit={onSubmit} />
                  )}
                </Grid2>
              </Grid2>
            </Grid2>
          </Paper>
        </Grid2>
      </Container>
    </Background>
  );
};

export default App;
