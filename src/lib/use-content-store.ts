"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { defaultContent, type SiteContent } from "@/lib/content-data";
import { mergeContent } from "@/lib/content-utils";

const STORAGE_KEY = "guibin-wu-site-content-v1";
const ADMIN_PASSWORD_KEY = "guibin-wu-admin-password";
const listeners = new Set<() => void>();

type SaveStatus = "idle" | "dirty" | "saving" | "saved" | "error";

let currentContent: SiteContent = defaultContent;
let loaded = false;
let remoteLoadStarted = false;
let saveStatus: SaveStatus = "idle";
let lastError = "";

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function loadFromStorage() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    currentContent = raw ? mergeContent(JSON.parse(raw) as Partial<SiteContent>) : defaultContent;
  } catch {
    currentContent = defaultContent;
  }
}

function getSnapshot() {
  loadFromStorage();
  return currentContent;
}

function getServerSnapshot() {
  return defaultContent;
}

function writeLocalContent(nextContent: SiteContent, status: SaveStatus) {
  currentContent = nextContent;
  loaded = true;
  saveStatus = status;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextContent));
  }
  emit();
}

async function loadRemoteContent() {
  if (remoteLoadStarted || typeof window === "undefined") return;
  remoteLoadStarted = true;

  try {
    const response = await fetch("/api/content", { cache: "no-store" });
    if (!response.ok) return;

    const data = (await response.json()) as {
      content?: Partial<SiteContent>;
      error?: string;
    };
    if (data.error) {
      lastError = data.error;
      saveStatus = "error";
      emit();
      return;
    }
    if (data.content) writeLocalContent(mergeContent(data.content), "saved");
  } catch (error) {
    lastError = error instanceof Error ? error.message : "Failed to load remote content";
    saveStatus = "error";
    emit();
  }
}

async function saveRemoteContent(nextContent: SiteContent) {
  if (typeof window === "undefined") return;

  const adminPassword =
    window.sessionStorage.getItem(ADMIN_PASSWORD_KEY) ||
    window.localStorage.getItem(ADMIN_PASSWORD_KEY) ||
    "admin123";

  saveStatus = "saving";
  lastError = "";
  emit();

  const response = await fetch("/api/content", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-admin-password": adminPassword,
    },
    body: JSON.stringify({ content: nextContent }),
  });

  if (!response.ok) {
    const message = await response.text();
    saveStatus = "error";
    lastError = `保存失败：${response.status} ${message}`;
    emit();
    return;
  }

  saveStatus = "saved";
  lastError = "";
  emit();
}

export function rememberAdminPassword(password: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(ADMIN_PASSWORD_KEY, password);
}

export function useContentStore() {
  const content = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    void loadRemoteContent();
  }, []);

  const updateContent = useCallback(
    (updater: (current: SiteContent) => SiteContent) => {
      const nextContent = updater(currentContent);
      writeLocalContent(nextContent, "dirty");
    },
    [],
  );

  const saveContent = useCallback(() => {
    void saveRemoteContent(currentContent);
  }, []);

  const resetContent = useCallback(() => {
    writeLocalContent(defaultContent, "dirty");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
    content,
    hydrated: loaded,
    lastError,
    saveContent,
    saveStatus,
    updateContent,
    resetContent,
  };
}
