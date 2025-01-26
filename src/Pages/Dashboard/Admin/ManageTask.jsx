import SectionHeading from "../../../Components/SectionHeading";

const ManageTask = () => {
  // #TODO: Completed task of this page
  return (
    <section className="bg-[#f6f6f6] min-h-screen">
      <SectionHeading
        title={"MANAGE ALL TASK"}
        subtitle={"---How to do??---"}
      />
      <div className="m-12 bg-white lg:w-11/12 mx-auto p-6 space-y-4">
        <h1 className="font-Cinzel font-bold text-3xl leading-11 text-color3">
          Total Available Task:
          {/* {users.length} */}
        </h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-color1 text-white text-xl font-bold">
              <tr className="text-center">
                {/* প্রতিটি কলাম:
                 **Task Name: টাস্কের নাম যেমন "Complete Docs"
                 **Description: টাস্কের সংক্ষিপ্ত বা বিস্তারিত বর্ণনা
                 **Due Date: টাস্কটির শেষ সময়
                 **Assigned To: যাকে টাস্কটি দেওয়া হয়েছে
                 **Status: টাস্কটির বর্তমান অবস্থা (যেমন Pending, In Progress, Completed)
                 **Actions: টাস্কটি সম্পাদন, মুছতে বা সম্পূর্ণ হিসেবে মার্ক করার জন্য বাটন */}
                <th></th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {/* tasks */}
              {/* {users.map((user, index) => (
                <tr key={user._id} className="text-center text-20 font-medium">
                  <th>{index + 1}</th>
                  <th>
                    <img
                      className="w-14 rounded-full"
                      src={user.userPhotoURL}
                      alt=""
                    />
                  </th>
                  <th>{user.userName}</th>
                  <th>{user.userEmail}</th>
                  <th>{user.userRole}</th>
                  <th>{user.userAvailableCoin}</th>
                  <th className="flex items-center justify-center gap-1">
                    <button>
                      <select
                        onChange={(event) => handleUpdateRole(event, user._id)}
                        defaultValue={user?.userRole || "worker"}
                        className="bg-white text-[rgb(251,128,79)] p-3 rounded-md"
                      >
                        <option value="admin">Admin</option>
                        <option value="buyer">Buyer</option>
                        <option value="worker">Worker</option>
                      </select>
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-color1 text-white p-4 rounded-md text-2xl"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </th>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageTask;
