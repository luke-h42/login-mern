import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import AddPost from "../components/AddPost";
import toast from "react-hot-toast";
import axios from "axios";
function AdminDashboard() {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
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
      <h1 className="text-5xl text-gray-700 dark:text-gray-300">
        Admin Dashboard
      </h1>
      {!!user && (
        <>
          <h2 className="text-3xl text-gray-700 dark:text-gray-300">
            Hi {user.name}!
          </h2>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="bg-gray-400  px-4 py-2 rounded-2xl mt-2"
          >
            Add post
          </button>
          {showModal ? (
            <AddPost
              onClose={() => setShowModal(false)}
              onSubmit={fetchAllPosts}
            />
          ) : null}
        </>
      )}
      {/* Show posts set as active */}
      {loading ? (
        <p className="text-gray-300">Loading posts...</p>
      ) : (
        <div className="flex flex-col gap-6 my-10 max-w-[80%] min-w-[50%]">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div
                key={post._id}
                className={`text-gray-300 flex flex-col md:flex-row md:items-center md:justify-between  p-6 rounded-lg gap-4 ${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                }`}
              >
                <div className="flex flex-col gap-2 text-left">
                  <h3 className="text-xl ">{post.title}</h3>
                  <p>{post.message}</p>
                </div>
                <div>
                  {post.imageUrls.map((url, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={url}
                      alt={post.title}
                      className="mt-2 rounded-md "
                      style={{ maxWidth: "200px", height: "auto" }}
                    />
                  ))}
                </div>
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

export default AdminDashboard;
