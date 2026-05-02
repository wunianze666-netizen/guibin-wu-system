"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { defaultContent, type SiteContent } from "@/lib/content-data";
import { mergeContent } from "@/lib/content-utils";

const STORAGE_KEY = "guibin-wu-site-content-v1";
const ADMIN_PASSWORD_KEY = "guibin-wu-admin-password";
const listeners = new Set<() => void>();

let currentContent: SiteContent = defaultContent;
let loaded = false;
let remoteLoadStarted = false;
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

function saveLocalContent(nextContent: SiteContent) {
  currentContent = nextContent;
  loaded = true;
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
    if (data.error) lastError = data.error;
    if (data.content) saveLocalContent(mergeContent(data.content));
  } catch (error) {
    lastError = error instanceof Error ? error.message : "Failed to load remote content";
  }
}

async function saveRemoteContent(nextContent: SiteContent) {
  if (typeof window === "undefined") return;

  const adminPassword =
    window.sessionStorage.getItem(ADMIN_PASSWORD_KEY) ||
    window.localStorage.getItem(ADMIN_PASSWORD_KEY) ||
    "admin123";

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
    throw new Error(`Remote save failed: ${response.status} ${message}`);
  }
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
      saveLocalContent(nextContent);
      void saveRemoteContent(nextContent).catch((error) => {
        lastError = error instanceof Error ? error.message : "Failed to save remote content";
        emit();
      });
    },
    [],
  );

  const resetContent = useCallback(() => {
    saveLocalContent(defaultContent);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    void saveRemoteContent(defaultContent).catch((error) => {
      lastError = error instanceof Error ? error.message : "Failed to reset remote content";
      emit();
    });
  }, []);

  return { content, hydrated: loaded, lastError, updateContent, resetContent };
}
