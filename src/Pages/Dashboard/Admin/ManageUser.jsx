import { FaRegTrashAlt } from "react-icons/fa";
import SectionHeading from "../../../Components/SectionHeading";
import useGetAllUser from "../../../Hooks/useGetAllUser";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
/*
The section will show a table of all users with  display_name, user_email, photo_url, role , coin 
and some actionable button 
● remove ( will delete user from the database ) 
○ By clicking Remove user will be deleted from the server. 
● Update Role ( Dropdown field.  On change it will change the role of user )  
○ Admin  
○ Buyer  
○ Worker  
*/

const ManageUser = () => {
  const [users, refetch] = useGetAllUser();
  const axiosSecure = useAxiosSecure();

  const handleUpdateRole = (e, id) => {
    console.log(e.target.value, id);
  };
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };
  return (
    <section className="bg-[#f6f6f6] min-h-screen">
      <SectionHeading
        title={"MANAGE ALL USERS"}
        subtitle={"---How many??---"}
      />
      <div className="m-12 bg-white lg:w-11/12 mx-auto p-6 space-y-4">
        <h1 className="font-Cinzel font-bold text-3xl leading-11 text-color3">
          Total users: {users.length}
        </h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-color1 text-white text-xl font-bold">
              <tr className="text-center">
                <th></th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Coin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, index) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageUser;
