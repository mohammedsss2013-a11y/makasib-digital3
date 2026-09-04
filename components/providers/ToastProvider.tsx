"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";
type Toast = { id: string; message: string; type: ToastType };
type ToastContextValue = { showToast: (message: string, type?: ToastType) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => setToasts((current) => current.filter((toast) => toast.id !== id)), []);

  useEffect(() => {
    if (!toasts.length) return;
    const timers = toasts.map((toast) => window.setTimeout(() => removeToast(toast.id), 4000));
    return () => timers.forEach(window.clearTimeout);
  }, [toasts, removeToast]);

  return <ToastContext.Provider value={{ showToast }}>
    {children}
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[70] flex max-w-sm flex-col gap-2 sm:left-4 sm:right-auto" dir="rtl" aria-live="polite">
      {toasts.map((toast) => <div key={toast.id} role={toast.type === "error" ? "alert" : "status"} className="pointer-events-auto flex items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm text-white shadow-2xl">
        <div className="flex min-w-0 items-center gap-3">{toast.type === "success" ? <CheckCircle2 className="shrink-0 text-emerald-400" size={18} /> : toast.type === "error" ? <AlertCircle className="shrink-0 text-red-400" size={18} /> : <Info className="shrink-0 text-blue-400" size={18} />}<span>{toast.message}</span></div>
        <button type="button" onClick={() => removeToast(toast.id)} className="shrink-0 rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="إغلاق الإشعار"><X size={16} /></button>
      </div>)}
    </div>
  </ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
