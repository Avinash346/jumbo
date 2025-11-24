import { UserDetailClient } from '@/components/users/UserDetailClient';

// Required for static export
export async function generateStaticParams() {
  // Generate params for users 1-10 (JSONPlaceholder limit)
  return Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <UserDetailClient id={Number(id)} />;
}
