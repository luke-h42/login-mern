import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast";
import axios from "axios";

function Dashboard() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchAllPosts = async () => {
    try {
      const response = await axios.get("/api/admin/get-posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts", error);
      toast.error("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);
  return (
    <div className="flex items-center flex-col min-h-svh pt-10 bg-white dark:bg-gray-900 text-center">
      <h1 className="text-5xl text-gray-700 dark:text-gray-300">Dashboard</h1>
      {!!user && (
        <h2 className="text-3xl text-gray-700 dark:text-gray-300">
          Hi {user.name}!
        </h2>
      )}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className="flex flex-col gap-6 my-10 max-w-[80%] min-w-[50%]">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div
                key={post._id}
                className={`text-gray-300 flex flex-col p-6 rounded-lg ${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                }`}
              >
                <h3 className="text-xl text-left">{post.title}</h3>
                <p className="text-left">{post.message}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-300">No posts available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
