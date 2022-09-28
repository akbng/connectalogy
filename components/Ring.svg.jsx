import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Ring = ({ size, color, ringOffset, style, className }) => {
  const radius = ~~(size / 2) - Math.min(8, size * 0.1);
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.svg className={className} style={style} width={size} height={size}>
      <motion.circle
        stroke={color}
        strokeWidth={Math.max(1, ~~(size / 40))}
        fill="transparent"
        r={radius}
        cx={~~(size / 2)}
        cy={~~(size / 2)}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        animate={{ strokeDashoffset: ringOffset }}
        transition={{
          duration: 0.65,
          ease: "easeOut",
        }}
      />
    </motion.svg>
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
