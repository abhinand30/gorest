import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex flex-col gap-2 md:p-10 text-6xl">
    404 Not Found
    <Link to="/" className="text-blue-500 underline">Home </Link>
  </div>
  )
}

export default NotFound