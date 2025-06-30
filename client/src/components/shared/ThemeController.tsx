import { FaSun } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";

const ThemeController = ({ isDarkMode, setIsDarkMode }) => {
  const handleSwitch = () => {
    setIsDarkMode(!isDarkMode);
    console.log(isDarkMode);
  };
  return (
    <label className="swap swap-rotate">
      {/* this hidden checkbox controls the state */}
      <input type="checkbox" className="theme-controller" value="synthwave" />

      {/* sun icon */}

      {/* moon icon */}
      {isDarkMode ? (
        <div onClick={handleSwitch}>
          <FaRegMoon />
        </div>
      ) : (
        <div onClick={handleSwitch}>
          <FaSun />
        </div>
      )}
    </label>
  );
};

export default ThemeController;
