import React, { useEffect, useState } from "react";
import { getItems, updateItemStatus } from "../../Actions/service/item";
import { FaSpinner } from "react-icons/fa";
import { showErrorMessage, showSuccessMessage } from "../../layouts/toast";

const GetUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleConfirmation = (item) => {
    setSelectedItem(item);
    setConfirmationVisible(true);
  };

  const handleCancel = () => {
    setConfirmationVisible(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const items = await getItems();
        console.log("items", items);
        setItems(items);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

    fetchData();
  }, []);

  const handleActivate = async (item) => {
    try {
      // Toggle the itemStatus when the button is clicked
      item.itemStatus = !item.itemStatus;
      
      // Update the item status on the server
      await updateItemStatus(item._id, item.itemStatus);
  
      // Update the item status in the local state
      const updatedItems = items.map((u) =>
        u._id === item._id ? { ...u, itemStatus: item.itemStatus } : u
      );
      setItems(updatedItems);
    } catch (error) {
      console.error("Error updating item status:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 font-jost">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75 z-50">
          <FaSpinner className="animate-spin mr-2" />
          <span className="text-gray-600">Loading items...</span>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Users items</h1>
      <div className="w-full h-[60vh] overflow-y-scroll">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white">
            <tr className="text-[#9c9696] text-start">
              <th className="px-4 py-2 text-[#0C0B0B]">
                <p className="text-center">items ids</p>
              </th>
              <th className="px-4 py-2 ">
                <p className="text-center">owner</p>
              </th>
              <th className="px-4 py-2 ">
                <p className="text-center">role</p>
              </th>
              <th className="px-4 py-2 ">
                <p className="text-center">telephone</p>
              </th>
              <th className="px-4 py-2 ">
                <p className="text-center">item status</p>
              </th>
            </tr>
          </thead>
          <tbody className="p-[12px] rounded-2xl">
            {items?.map((item) => (
              <tr
                key={item._id}
                className="border-b-[30px] border-[white] bg-[#F5F5F7]"
              >
                <td className="px-4 py-2 text-center ">
                  <p className="m-auto w-8 h-8 rounded-full">{item._id}</p>
                </td>
                <td className="px-4 py-2 text-center">
                  <p className="text-[gray]">
                    {item.createdBy.firstname} {item.createdBy.lastname}
                  </p>
                </td>
                <td className="px-4 py-2 text-start">
                  <div className="flex items-center justify-center gap-2">
                    <p>{item.createdBy.role}</p>
                  </div>
                </td>
                <td className="px-4 py-2 text-start">
                  <div className="flex items-center justify-center gap-2">
                    <p>{item.createdBy.telephone}</p>
                  </div>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    className={`py-2 rounded-lg ${
                      item.itemStatus
                        ? "bg-green-500 text-white hover:bg-[#143831]"
                        : "bg-[red] text-white hover:bg-[#9e3d3d]"
                    }`}
                    onClick={() => handleActivate(item)}
                    style={{ width: "100%" }}
                  >
                    {item.itemStatus ? "entered" : "exited"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isConfirmationVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded">
            <p className="text-gray-500">
              Are you sure you want to{" "}
              {selectedItem.itemStatus ? "disable" : "activate"} this <br></br>{" "}
              item status?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 rounded  text-black border border-bg-[#96c7be] font-semibold mr-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
              {selectedItem.itemStatus ? (
                <button
                  className="px-4 py-2 rounded bg-[red] text-white font-semibold"
                  onClick={() => {
                    handleActivate(selectedItem);
                    setConfirmationVisible(false);
                  }}
                >
                  Disable{" "}
                </button>
              ) : (
                <button
                  className="px-4 py-2 rounded-lg bg-[#09B294] text-white hover:bg-[#96c7be] font-semibold"
                  onClick={() => {
                    handleActivate(selectedItem);
                    setConfirmationVisible(false);
                  }}
                >
                  Activate
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetUsers;
