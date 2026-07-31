import { Link, useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  let errorStatus: number;
  let errorStatusText: string;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorStatusText = error.statusText;
  } else if (error instanceof Error) {
    errorStatus = 500;
    errorStatusText = error.message;
  } else {
    errorStatus = 500;
    errorStatusText = "Something went wrong";
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-950 text-gray-100 gap-3">
      <h1 className="text-8xl font-bold text-cyan-600">{errorStatus}</h1>
      <p className="text-red-500 text-lg">{errorStatusText}</p>
      <div className="flex gap-1">
        <Link className="text-white px-6 py-2 bg-cyan-600 rounded-xl hover:cursor-pointer hover:bg-cyan-700 duration-300 shadow-xl" to="/">Go to Home</Link>
        <button className="text-white px-6 py-2 bg-cyan-600 rounded-xl hover:cursor-pointer hover:bg-cyan-700 duration-300 shadow-xl" onClick={() => navigate(-1)}>Return back</button>
      </div>
    </div>
  );
};

export default ErrorPage;