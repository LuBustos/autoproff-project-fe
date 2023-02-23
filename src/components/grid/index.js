import AddIcon from "@mui/icons-material/Add";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import {
  Box,
  Button,
  FormHelperText,
  LinearProgress,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import {
  DataGrid,
  GridToolbarContainer,
  gridClasses,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useOpenCreateModal } from "../../hooks";
import { createEmployeeFile } from "../../utils";
import CreateOrUpdateModal from "../modal/create";
import styles from "./styles.module.css";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[100],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
  border: 0,
  color:
    theme.palette.mode === "light"
      ? "rgba(0,0,0,.85)"
      : "rgba(255,255,255,0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: `1px solid ${
      theme.palette.mode === "light" ? theme.palette.grey[400] : "#303030"
    }`,
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: `1px solid ${
      theme.palette.mode === "light" ? theme.palette.grey[400] : "#303030"
    }`,
  },
  "& .MuiDataGrid-cell": {
    color:
      theme.palette.mode === "light"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.65)",
  },
  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: `1px solid ${theme.palette.grey[400]}`,
  },
}));

const ODD_OPACITY = 0.2;

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(_, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function EditToolbar(props) {
  const { openModal } = props;

  return (
    <GridToolbarContainer className={styles.toolbar}>
      <div className={styles.container}>
        <div>
          <Button color="primary" onClick={openModal} startIcon={<AddIcon />}>
            Add Employee
          </Button>
          <FormHelperText className={styles.helperText}>
            You can press ctrl + A and start to create an employee
          </FormHelperText>
        </div>
        <div className={styles.button}>
          <Button
            className={styles.download}
            color="primary"
            onClick={createEmployeeFile}
            startIcon={<SimCardDownloadIcon />}
          >
            Download employee file
          </Button>
          <FormHelperText className={styles.helperText}>
            You can press Ctrl + D - Download employee file
          </FormHelperText>
        </div>
      </div>
    </GridToolbarContainer>
  );
}

const GridUI = ({
  data,
  columns,
  loading,
  getRowId,
  showAlert,
  process,
  keyPressed,
}) => {
  const { openCreateModal, handlerCloseCreateModal, handlerOpenCreateModal } =
    useOpenCreateModal();

  useEffect(() => {
    if (
      keyPressed?.ctrlKey &&
      (keyPressed?.code === "a" || keyPressed?.code === "KeyA")
    ) {
      handlerOpenCreateModal();
    }

    if (
      keyPressed?.ctrlKey &&
      (keyPressed?.code === "d" || keyPressed?.code === "KeyD")
    ) {
      createEmployeeFile();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPressed]);

  return (
    <Box className={styles.container}>
      <StyledDataGrid
        rows={data}
        getRowId={getRowId}
        autoHeight
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        components={{
          Toolbar: (props) => (
            <EditToolbar {...props} openModal={handlerOpenCreateModal} />
          ),
          Pagination: CustomPagination,
          LoadingOverlay: LinearProgress,
        }}
        loading={loading}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
      />
      {openCreateModal ? (
        <CreateOrUpdateModal
          open={openCreateModal}
          handleClose={handlerCloseCreateModal}
          title={"Create"}
          update={false}
          id={null}
          showAlert={showAlert}
          process={process}
        />
      ) : null}
    </Box>
  );
};

export default GridUI;
