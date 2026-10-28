import type { Metadata } from 'next';
import { content, DEFAULT_LANG } from '@/content/game';
import ResumeView from '@/components/resume/ResumeView';

const r = content[DEFAULT_LANG].resume;

export const metadata: Metadata = {
  title: r.metaTitle,
  description: r.metaDescription,
  openGraph: {
    title: r.metaTitle,
    description: r.metaDescription,
    type: 'profile',
  },
};

export default function ResumePage() {
  return <ResumeView />;
}
