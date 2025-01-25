import { Helmet } from "react-helmet-async";
import { PropTypes } from "prop-types";

const HelmetTitle = ({ pageTitle }) => {
  return (
    <div>
      <Helmet>
        <title>{pageTitle} | Task2Earn</title>
      </Helmet>
    </div>
  );
};

HelmetTitle.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default HelmetTitle;
