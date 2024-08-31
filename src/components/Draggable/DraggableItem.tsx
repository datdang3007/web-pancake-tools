import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Create } from "@mui/icons-material";
import { Grid2, IconButton, ListItem, Typography } from "@mui/material";
import { memo, useCallback } from "react";

type Props = {
  item: any;
  enabled: boolean;
  onSelectItem: (item: any) => void;
};

export const DraggableItem = memo((props: Props) => {
  const { item, enabled, onSelectItem } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const onClick = useCallback(() => {
    onSelectItem(item);
  }, [item, onSelectItem]);

  return (
    <ListItem>
      <Grid2 container size={12}>
        {enabled ? (
          <Grid2
            container
            size="grow"
            position="relative"
            ref={setNodeRef}
            {...attributes}
            {...listeners}
          >
            <Grid2
              container
              size={12}
              sx={{
                cursor: "pointer",
                padding: `8px 16px`,
                transition: transition,
                transform: CSS.Transform.toString(transform),
                "&:hover": {
                  background: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <Typography gutterBottom fontSize={16}>
                {item.name_order}
              </Typography>
            </Grid2>
          </Grid2>
        ) : (
          <Grid2 container size="grow" position="relative">
            <Grid2 container size={12} sx={{ padding: `8px 16px` }}>
              <Typography gutterBottom fontSize={16}>
                {item.name_order}
              </Typography>
            </Grid2>
          </Grid2>
        )}

        <Grid2
          container
          alignItems="center"
          sx={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <IconButton color="success" onClick={onClick}>
            <Create sx={{ fontSize: 18 }} />
          </IconButton>
        </Grid2>
      </Grid2>
    </ListItem>
  );
});
