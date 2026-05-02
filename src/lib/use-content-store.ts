"use client";

import { useCallback, useSyncExternalStore } from "react";
import { defaultContent, type SiteContent } from "@/lib/content-data";

const STORAGE_KEY = "guibin-wu-site-content-v1";
const listeners = new Set<() => void>();

let currentContent: SiteContent = defaultContent;
let loaded = false;

function mergeContent(saved: Partial<SiteContent>): SiteContent {
  return {
    ...defaultContent,
    ...saved,
    site: { ...defaultContent.site, ...saved.site },
    profile: { ...defaultContent.profile, ...saved.profile },
    resume: { ...defaultContent.resume, ...saved.resume },
    projects: saved.projects ?? defaultContent.projects,
    works: saved.works ?? defaultContent.works,
    internships: saved.internships ?? defaultContent.internships,
    certificates: saved.certificates ?? defaultContent.certificates,
    posts: saved.posts ?? defaultContent.posts,
    messages: saved.messages ?? defaultContent.messages,
  };
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

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  loadFromStorage();
  return currentContent;
}

function getServerSnapshot() {
  return defaultContent;
}

function saveContent(nextContent: SiteContent) {
  currentContent = nextContent;
  loaded = true;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextContent));
  }
  emit();
}

export function useContentStore() {
  const content = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const updateContent = useCallback(
    (updater: (current: SiteContent) => SiteContent) => {
      saveContent(updater(currentContent));
    },
    [],
  );

  const resetContent = useCallback(() => {
    currentContent = defaultContent;
    loaded = true;
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    emit();
  }, []);

  return { content, hydrated: loaded, updateContent, resetContent };
}
