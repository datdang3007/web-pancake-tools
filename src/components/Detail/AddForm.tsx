import { Circle } from "@mui/icons-material";
import { Card, Grid2, List, ListItem, Typography } from "@mui/material";
import { ButtonCommon } from "../Buttons";
import { TextFieldCommon } from "../Form";

type Props = {
  form: any;
  onSubmit: () => void;
};

export const AddForm = (props: Props) => {
  const { form, onSubmit } = props;

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
            required
            name="name_filter"
            label="Tên sản phẩm khi lên đơn"
          />
        </Grid2>

        {/* Tên sản phẩm trong tin nhắn */}
        <Grid2 size="auto" container columnGap={1.5}>
          {/* Text Field */}
          <Grid2 container size="grow">
            <TextFieldCommon
              form={form}
              fullWidth
              required
              name="name_order"
              label="Tên sản phẩm trong tin nhắn"
            />
          </Grid2>

          {/* Button Add */}
          <Grid2 container size="auto">
            <ButtonCommon variant="contained">
              <Typography fontSize={14}>Thêm tên</Typography>
            </ButtonCommon>
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
                  <List>
                    <ListItem>
                      <Grid2 container columnGap={1} alignItems="center">
                        <Circle sx={{ fontSize: 8 }} />
                        <Typography fontSize={16}>Tên sản phẩm 1</Typography>
                      </Grid2>
                    </ListItem>
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
