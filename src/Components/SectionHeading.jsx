import PropTypes from "prop-types";

const SectionHeading = ({ subtitle, title, className }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center mt-10 font-Inter space-y-5 `}
    >
      <p className={`text-color5 text-xl leading-6`}>{subtitle}</p>
      <h1
        className={`text-20 font-Cinzel font-semibold leading-7 text-color3 border border-x-0 border-y-2 border-[#e8e8e8] px-16 py-3 ${
          className || ""
        }`}
      >
        {title}
      </h1>
    </div>
  );
};
SectionHeading.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};
export default SectionHeading;
