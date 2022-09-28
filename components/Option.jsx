import PropTypes from "prop-types";

import Ring from "../components/Ring.svg.jsx";

const Option = ({ label, className, optionNum, color, onClick }) => {
  return (
    <button
      className={className}
      style={{ position: "relative" }}
      onClick={onClick}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          position: "absolute",
          left: "5px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <Ring size={30} color={color} />
        <p
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textTransform: "uppercase",
            color: color,
          }}
        >
          {optionNum}
        </p>
      </div>
      <div style={{ fontSize: "1rem" }}>{label}</div>
    </button>
  );
};

Option.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  optionNum: PropTypes.oneOf(["a", "b", "c", "d"]),
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Option;
