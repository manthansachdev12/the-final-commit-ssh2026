export default function HackathonCard({ hackathon }) {

  return (
    <div className="border p-4 rounded shadow">

      <h2 className="font-bold text-lg">
        {hackathon?.title}
      </h2>

      <p>{hackathon?.description}</p>

    </div>
  );
}