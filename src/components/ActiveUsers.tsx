type User = {
  id: string;
  name: string;
  color: string;
};

type Props = {
  users: User[];
  viewerCount: number;
};

export default function ActiveUsers({ users, viewerCount }: Props) {
  return (
    <div className="flex items-center gap-3">

      {/* COUNT */}
      <span className="text-sm text-gray-400">
        {viewerCount} people viewing
      </span>

      {/* AVATARS */}
      <div className="flex -space-x-2">
        {users.slice(0, 5).map((u) => (
          <div
            key={u.id}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs text-white border-2 border-gray-900 ${u.color}`}
          >
            {u.name}
          </div>
        ))}
      </div>

      {/* +MORE */}
      {users.length > 5 && (
        <span className="text-xs text-gray-400">
          +{users.length - 5}
        </span>
      )}

    </div>
  );
}