import PropTypes from "prop-types";

const MenuIcon = ({ className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <svg style={{ width: "100%" }} fill="#333" viewBox="0 0 210 210">
        <path
          d="M75,0H15C6.716,0,0,6.716,0,15v60c0,8.284,6.716,15,15,15h60c8.284,0,15-6.716,15-15V15
		C90,6.716,83.284,0,75,0z"
        />
        <path
          d="M75,120H15c-8.284,0-15,6.716-15,15v60c0,8.284,6.716,15,15,15h60c8.284,0,15-6.716,15-15v-60
		C90,126.716,83.284,120,75,120z"
        />
        <path
          d="M195,0h-60c-8.284,0-15,6.716-15,15v60c0,8.284,6.716,15,15,15h60c8.284,0,15-6.716,15-15V15
		C210,6.716,203.284,0,195,0z"
        />
        <path
          d="M195,120h-60c-8.284,0-15,6.716-15,15v60c0,8.284,6.716,15,15,15h60c8.284,0,15-6.716,15-15v-60
		C210,126.716,203.284,120,195,120z"
        />
      </svg>
    </button>
  );
};

MenuIcon.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default MenuIcon;
