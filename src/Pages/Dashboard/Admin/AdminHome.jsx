const AdminHome = () => {
  return (
    <section className="py-5">
      <h1 className="font-Cinzel font-semibold text-32 leading-11 text-color3">
        Hi, Welcome Back!
      </h1>
      {/*
       **stat of---------
       ** number of worker
       ** number of Buyer
       ** Total available coin
       ** Total Total Payment
       */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* ** number of worker */}
        <div className="bg-gradient-to-r from-[#BB34F5] to-[#FCDCFF] rounded-lg flex justify-center items-center gap-6 py-9">
          <p>icon</p>
          <div className="text-center">
            <p className="font-Inter font-extrabold text-40 leading-12">1000</p>
            <p className="text-2xl leading-7">Worker</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminHome;
