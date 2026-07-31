import type { TLoadingStatus } from "@/types/types";

interface ILoadingProps {
  loading: TLoadingStatus;
  error: string | null;
  children: React.ReactNode;
  skeleton?: React.ReactNode;
}

const Loading = ({ loading, error, children, skeleton }: ILoadingProps) => {
  if (loading === "pending") {
    return skeleton ? <>{skeleton}</> : <p>Loading...</p>;
  }

  if (loading === "rejected") {
    return (
      <div className="p-4 bg-rose-950/30 border border-rose-800 rounded-xl text-rose-300 text-sm my-4">
        <p className="font-semibold">Failed to load content</p>
        <p className="text-xs text-rose-400 mt-1">{error || "An unknown error occurred"}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default Loading;
