export interface CodeLine {
  text: string;
  type?: "keyword" | "string" | "comment" | "base";
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectDetail {
  overview: string;
  highlights: string[];
  stats?: ProjectStat[];
}

export interface Project {
  title: string;
  shortDesc: string;
  stack: string[];
  github: string;
  live?: string;
  tag: string;
  image?: string;
  codeLines?: CodeLine[];
  filename?: string;
  details: ProjectDetail;
}
