import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { DonutTray } from "./types";
import { getTrayList } from "./services/apiComvis";
import "./App.css";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function App() {
  const [frame, setFrame] = useState<string | null>(null);
  const [trayList, setTrayList] = useState<DonutTray[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");
    ws.onmessage = (e) => setFrame(e.data as string);
    ws.onerror = (err) => console.error("WS error", err);
    return () => ws.close();
  }, []);

  const handleNext = async () => {
    try {
      const data = await getTrayList();

      if (data.alert) {
        Swal.fire({
          title: "Alert!",
          text: "Donut is laying down",
          icon: "error",
          showConfirmButton: true,
          confirmButtonText: "OK",
          buttonsStyling: false,
          customClass: {
            confirmButton: "swal-confirm-btn-large"
          }
        });
        return;
      }
      

      const newTray: DonutTray[] = (data.donut_tray ?? []).map((it: any) => ({
        label: it.label ?? "unknown",
        conf: Number(it.conf ?? 0),
      }));

      setTrayList((prev) => [...prev, ...newTray]);
    } catch (err) {
      console.error("next failed", err);
    }
  };

  const handleStop = () => {
    setTrayList([]);

    Swal.fire({
      title: "Checkout!",
      text: "Checkout successful",
      icon: "success",
      showConfirmButton: true,
      confirmButtonText: "OK",
      buttonsStyling: false,
      customClass: {
        confirmButton: "swal-confirm-btn-large"
      }
    });
  };

  const countsMap = trayList.reduce(
    (acc: Record<string, number>, item) => {
      const key = item.label ?? "unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <div className="app">
      {/* ================= LEFT ================= */}
      <div className="left-panel">
        {frame ? (
          <img
            className="viewer-img"
            src={`data:image/jpeg;base64,${frame}`}
            alt="stream"
          />
        ) : (
          <div className="waiting">Waiting for stream...</div>
        )}
      </div>

      {/* ================= RIGHT ================= */}
      <div className="right-panel">
        {/* ================= TABLE ================= */}
        <div className="right-top">
          <Box
            className="counts"
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              width: "100%",
            }}
          >
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                flex: 1,
                minHeight: 0,
                maxHeight: "100%", 
                overflowY: "auto", 
                overflowX: "hidden",
                background: "linear-gradient(180deg, #f8fbff, #eef4ff)",
                borderRadius: 3,
                border: "1px solid #dbeafe",
              }}
            >
              <Table
                stickyHeader
                size="small"
                sx={{
                  "& .MuiTableCell-root": {
                    color: "#1e293b",
                    borderBottom: "1px solid #dbeafe",
                    fontSize: 20,
                    padding: "8px 12px",
                  },
                  "& .MuiTableHead-root .MuiTableCell-root": {
                    backgroundColor: "#1e3a8a",
                    color: "#e0f2fe",
                    fontWeight: 600,
                  },
                  "& .MuiTableBody-root .MuiTableRow-root:hover": {
                    backgroundColor: "#eff6ff",
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{ padding: 20 }}>Label</TableCell>
                    <TableCell style={{ padding: 20 }} align="right">
                      Quantity
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {Object.entries(countsMap).map(([label, cnt]) => (
                    <TableRow key={label}>
                      <TableCell>{label}</TableCell>
                      <TableCell align="right">{cnt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="right-bottom">
          <button className="btn next" onClick={handleNext}>
            Next
          </button>
          <button
            className="btn stop"
            onClick={handleStop}
            disabled={trayList.length === 0}
            aria-disabled={trayList.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;


