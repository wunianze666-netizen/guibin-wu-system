import { defaultContent, type SiteContent } from "@/lib/content-data";

export function mergeContent(saved: Partial<SiteContent> | null | undefined): SiteContent {
  if (!saved) return defaultContent;

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
