import PropTypes from "prop-types";

const Ring = ({ size, color, ringOffset, style, className }) => {
  const radius = ~~(size / 2) - 8;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg className={className} style={style} width={size} height={size}>
      <circle
        className="progress-ring__circle"
        stroke={color}
        strokeWidth={~~(size / 40)}
        fill="transparent"
        r={radius}
        cx={~~(size / 2)}
        cy={~~(size / 2)}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        style={{
          transition: "all 675ms ease-out",
          strokeDashoffset: ringOffset,
        }}
      />
    </svg>
  );
};

Ring.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  ringOffset: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Ring;
