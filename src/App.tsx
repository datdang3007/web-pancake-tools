import {
  Card,
  Container,
  Grid2,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useForm } from "react-hook-form";
import { AddForm, Background, ButtonCommon } from "./components";

// Item Types
const ItemTypes = {
  ITEM: "item",
};

const enum E_Action {
  ADD = "add",
  EDIT = "edit",
  DELETE = "delete",
  EXPORT = "export",
  IMPORT = "import",
}

// Draggable Item Component
const DraggableItem: React.FC<{
  id: number;
  text: string;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}> = ({ id, text, index, moveItem }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ITEM,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <ListItem
      ref={ref}
      component={Paper}
      sx={{ opacity: isDragging ? 0.6 : 1, padding: 0 }}
    >
      <Grid2
        container
        size={12}
        sx={{
          cursor: "pointer",
          padding: `8px 16px`,
          "&:hover": {
            background: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <Typography gutterBottom fontSize={16}>
          {`[${index + 1}]`} {text}
        </Typography>
      </Grid2>
    </ListItem>
  );
};

// Main App Component
const App: React.FC = () => {
  const [action, setAction] = useState(E_Action.ADD);
  const [items, setItems] = useState([
    // { id: 1, text: "Sản phẩm A" },
    // { id: 2, text: "Sản phẩm B" },
    // { id: 3, text: "Sản phẩm C" },
    // { id: 4, text: "Sản phẩm D" },
    // { id: 5, text: "Sản phẩm E" },
  ]);

  const form = useForm();
  const { handleSubmit } = form;

  const onSubmit = handleSubmit(
    useCallback((values) => {
      console.log("values", values);
    }, [])
  );

  const moveItem = (fromIndex: number, toIndex: number) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

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
              width: "100%",
              height: "100%",
              padding: 1.5,
            }}
          >
            <Grid2
              container
              size={12}
              height={1}
              rowGap={1.5}
              flexDirection="column"
            >
              {/* Header */}
              <Grid2
                container
                sx={{
                  paddingBlock: 0.5,
                }}
              >
                {/* Title */}
                <Grid2 container size="grow">
                  <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
                    Pancake Tools
                  </Typography>
                </Grid2>

                {/* Button Actions */}
                <Grid2 container size="auto" columnGap={1.5}>
                  {/* Button Add New */}
                  <Grid2 container size="auto">
                    <ButtonCommon variant="contained">
                      <Typography fontSize={14}>Nhập dữ liệu</Typography>
                    </ButtonCommon>
                  </Grid2>

                  {/* Button Export */}
                  <Grid2 container size="auto">
                    <ButtonCommon variant="contained">
                      <Typography fontSize={14}>Tải về</Typography>
                    </ButtonCommon>
                  </Grid2>

                  {/* Button Add New */}
                  <Grid2 container size="auto">
                    <ButtonCommon variant="contained">
                      <Typography fontSize={14}>Thêm mới</Typography>
                    </ButtonCommon>
                  </Grid2>
                </Grid2>
              </Grid2>
              <Grid2 container size="grow" columnSpacing={2}>
                {/* Draggable */}
                <Grid2 container size={4} height={1}>
                  <Card sx={{ width: "100%", height: "100%" }}>
                    <DndProvider backend={HTML5Backend}>
                      <List
                        sx={{
                          rowGap: 2,
                          display: "grid",
                          overflow: "auto",
                          flexDirection: "column",
                        }}
                      >
                        {items?.length === 0 && (
                          <ListItem>
                            <Typography fontSize={16}>
                              Chưa có sản phẩm nào
                            </Typography>
                          </ListItem>
                        )}
                        {items?.map((item: any, index) => (
                          <DraggableItem
                            id={item?.id}
                            index={index}
                            key={item?.id}
                            text={item?.text}
                            moveItem={moveItem}
                          />
                        ))}
                      </List>
                    </DndProvider>
                  </Card>
                </Grid2>

                {/* Detail */}
                <Grid2 container size={8} height={1}>
                  {action === E_Action.ADD && (
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
