export async function fetchStorageUsage(uid) {
  if (!uid) return 0;
  try {
    const res = await fetch(`/api/storage-usage/${uid}`);
    if (!res.ok) {
      console.error('Fetch storage usage failed:', res.status);
      return 0;
    }
    const data = await res.json();
    return data.totalBytes || 0;
  } catch (err) {
    console.error('Fetch storage usage error:', err);
    return 0;
  }
}
