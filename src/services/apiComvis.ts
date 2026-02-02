import { DonutTray, DonutTrayData, DonutTrayResponse } from "../types";

const API_URL = "http://localhost:8000";

export async function getTrayList(): Promise<DonutTrayData> {
    const res = await fetch(`${API_URL}/next`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  
    if (!res.ok) throw new Error(`Failed getting tray list: ${res.status}`);
  
    const body = (await res.json()) as DonutTrayResponse;
    return body.data;
  }

export async function sendCheckout(trayList: DonutTray[]): Promise<void> {
  const res = await fetch(`${API_URL}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tray_list: trayList })
  });

  if (!res.ok) throw new Error(`Failed sending checkout: ${res.status}`);
  }
