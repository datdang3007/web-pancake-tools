import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Create, EditOff } from "@mui/icons-material";
import {
  Grid2,
  IconButton,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import { memo, useCallback, useMemo } from "react";
import { IItems } from "../../App";

type Props = {
  item: any;
  enabled: boolean;
  selectItem: IItems | null;
  onOffSelectItem: () => void;
  onSelectItem: (item: any) => void;
};

export const DraggableItem = memo((props: Props) => {
  const theme = useTheme();
  const { item, enabled, selectItem, onSelectItem, onOffSelectItem } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const isSelected = useMemo(() => {
    return selectItem?.id === item.id;
  }, [item, selectItem]);

  // Event when click icon edit:
  const onClick = useCallback(() => {
    onSelectItem(item);
  }, [item, isSelected, onSelectItem]);

  // Event when click icon off:
  const onClickOff = useCallback(() => {
    onOffSelectItem();
  }, [onOffSelectItem]);

  return (
    <ListItem>
      <Grid2
        container
        size={12}
        sx={{
          borderRadius: 1,
          transition: "background 0.3s",
          background: isSelected ? theme.palette.primary.main : undefined,
        }}
      >
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
              <Typography
                gutterBottom
                fontSize={16}
                sx={{ color: isSelected ? "white" : undefined }}
              >
                {item.name_order}
              </Typography>
            </Grid2>
          </Grid2>
        ) : (
          <Grid2 container size="grow" position="relative">
            <Grid2 container size={12} sx={{ padding: `8px 16px` }}>
              <Typography
                gutterBottom
                fontSize={16}
                sx={{ color: isSelected ? "white" : undefined }}
              >
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
          <IconButton
            color="success"
            onClick={isSelected ? onClickOff : onClick}
            sx={{
              color: isSelected ? "white" : undefined,
            }}
          >
            {isSelected ? (
              <EditOff sx={{ fontSize: 18 }} />
            ) : (
              <Create sx={{ fontSize: 18 }} />
            )}
          </IconButton>
        </Grid2>
      </Grid2>
    </ListItem>
  );
});
