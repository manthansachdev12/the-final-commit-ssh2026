export default function TeamCard({ team }) {

  return (
    <div className="border p-4 rounded">

      <h2 className="font-bold">
        {team?.name}
      </h2>

      <p>Members: {team?.members?.length}</p>

    </div>
  );
}