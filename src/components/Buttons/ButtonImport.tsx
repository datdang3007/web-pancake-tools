import { Grid2, Typography } from "@mui/material";
import { showAlertError, showAlertSuccess } from "../../utils";
import { ButtonCommon } from "./ButtonCommon";

type Props = {
  handleDataImport: (data: any) => void;
};

export const ButtonImport = (props: Props) => {
  const { handleDataImport } = props;

  // Hàm xử lý khi người dùng chọn file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          handleDataImport(json);
          showAlertSuccess("Nhập dữ liệu thành công");
        } catch (error) {
          showAlertError("File không hợp lệ");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Grid2 container>
      <input
        accept=".json"
        id="contained-button-file"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="contained-button-file">
        <ButtonCommon variant="contained" component="span">
          <Typography fontSize={14}>Nhập dữ liệu</Typography>
        </ButtonCommon>
      </label>
    </Grid2>
  );
};
