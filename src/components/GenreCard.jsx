import { Link } from "react-router-dom";

export default function GenreCard({ name, id }) {
  return (
    <Link className="w-auto" to={`/genre/${id}`}>
      <div className="bg-red-600 hover:bg-red-700 transition-all w-52 h-24 shadow-md rounded-md p-4 relative flex justify-center items-center">
        <h3 className="text-lg text-white font-bold text-center">{name}</h3>
      </div>
    </Link>
  );
}
