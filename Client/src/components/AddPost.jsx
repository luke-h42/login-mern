import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
function AddPost({ onClose, onSubmit }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    status: "active",
    selectedFile: null,
  });
  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files.length > 1) {
      alert("You can only upload one image.");
      event.target.value = "";

      setFormData({
        ...formData,
        selectedFile: null,
      });
    } else if (files.length === 1) {
      setFormData({
        ...formData,
        selectedFile: files[0],
      });
    }
  };
  const modalClose = () => {
    setFormData({
      ...formData,
      selectedFile: null,
      title: "",
      message: "",
    });
    setIsLoading(false);
    onSubmit();
    onClose();
  };
  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("message", formData.message);
    formDataToSend.append("status", formData.status);
    if (formData.selectedFile) {
      formDataToSend.append("imageFiles", formData.selectedFile);
    }
    try {
      const response = await axios.post(
        "/api/admin/upload-post",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Post created successfully");
      console.log("Post created successfully:", response.data);
      modalClose();
    } catch (error) {
      toast.error("Error uploading post");
      console.error(
        "Error uploading post:",
        error.response ? error.response.data : error.message
      );
      modalClose();
    }
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div
          className="relative w-auto my-6 mx-auto max-w-[90%]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Adding a new post</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => {
                  modalClose();
                }}
              >
                <svg
                  className="w-8 h-8 text-black hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
              </button>
            </div>
            <div className="relative p-6 flex-auto overflow-y-auto max-h-[70vh]">
              <form onSubmit={submitForm}>
                <div className="mb-4">
                  <label
                    htmlFor="post-title"
                    name="post-title"
                    className="flex text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="post-title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
                    placeholder="Enter the title of the post"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="post-message"
                    name="post-message"
                    className="flex text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Post message
                  </label>
                  <textarea
                    type="text"
                    id="post-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    rows="4"
                    cols="50"
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
                    placeholder="Enter the title of the post"
                    required
                  ></textarea>
                </div>
                <div className="mb-4 flex gap-2 items-center">
                  <label htmlFor="active-status">Choose post status:</label>
                  <select
                    id="active-status"
                    name="active-status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 "
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
                  <input
                    name="imageFiles"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="text-gray-300 px-2 py-1 rounded-md border w-full md:w-auto"
                    required
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gray-900 text-gray-300 px-2 py-1 rounded-md border hover:text-gray-900 hover:bg-gray-300 w-full md:w-auto disabled:bg-gray-500"
                  >
                    {isLoading ? "Submitting Post..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default AddPost;
