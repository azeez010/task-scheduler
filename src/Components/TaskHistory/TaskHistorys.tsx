import React, { useState } from "react";
import { getTaskHistory, deleteTaskHistory } from "../../util"; // Assuming you have a deleteTaskHistory function
import Navbar from "../NavBar";

const TaskHistorys: React.FC = () => {
  const taskHistory = getTaskHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(
    null
  );

  const itemsPerPage = 10;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistory = taskHistory.slice(indexOfFirstItem, indexOfLastItem);

  const handleDeleteClick = (historyId: string) => {
    setSelectedHistoryId(historyId);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedHistoryId) {
      deleteTaskHistory(selectedHistoryId);
      setIsModalOpen(false);
      setSelectedHistoryId(null);
      // Optionally, you can update the task history state without reloading the page
      // setTaskHistory(taskHistory.filter(item => item.id !== selectedHistoryId));
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setSelectedHistoryId(null);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(taskHistory.length / itemsPerPage);

  return (
    <div className="h-screen p-6 rounded-lg shadow-lg bg-blue-50">
      <Navbar />
      <h2 className="mb-6 text-2xl font-bold text-center text-blue-700 mt-7">
        Task History
      </h2>
      {currentHistory.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {currentHistory.map((historyItem) => (
            <div
              key={historyItem.id}
              className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm"
            >
              <h3 className="mb-2 text-xl font-semibold text-blue-600">
                {historyItem.title}
              </h3>
              <p className="mb-1 text-gray-700">{historyItem.description}</p>
              <p className="mb-1 text-gray-700">
                <strong>Type:</strong> {historyItem.type}
              </p>
              <p className="mb-1 text-gray-700">
                <strong>Status:</strong> {historyItem.status}
              </p>
              <p className="text-gray-700">
                <strong>Completion Date:</strong>{" "}
                {new Date(historyItem.completionDate).toLocaleString()}
              </p>
              <button
                onClick={() => handleDeleteClick(historyItem.id)}
                className="px-3 py-1 mt-3 font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">No task history available.</p>
      )}

      {/* Pagination */}
      {taskHistory.length > itemsPerPage && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none ${
                currentPage === index + 1 ? "bg-blue-600" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full p-6 bg-white rounded-lg shadow-lg sm:w-2/3 md:w-1/2 lg:w-1/3">
            <h3 className="mb-4 text-xl font-bold">Confirm Deletion</h3>
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete this task history?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 font-medium text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskHistorys;
