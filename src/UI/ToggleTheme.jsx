import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useGlobalContext } from '../service/GlobalContext';
import { useState } from 'react';

const initialTheme = localStorage.getItem('theme') || 'light';

const TOGGLE_CLASSES =
  'text-sm font-medium flex items-center gap-2 px-2 md:px-3 py-1.5 md:py-1 transition-colors relative z-10';

const Example = () => {
  const [selected, setSelected] = useState(initialTheme);
  //
  return (
    <div className={`grid h-[44px] place-content-center px-2`}>
      <SliderToggle selected={selected} setSelected={setSelected} />
    </div>
  );
};

const SliderToggle = ({ selected, setSelected }) => {
  const { dispatch } = useGlobalContext();

  function handleDark() {
    dispatch({ type: 'DARK' });
    setSelected('dark');
  }
  function handleLight() {
    dispatch({ type: 'LIGHT' });
    setSelected('light');
  }

  return (
    <div className="relative flex w-fit items-center rounded-full">
      <button
        className={`${TOGGLE_CLASSES} text-foreground`}
        onClick={() => handleLight()}
      >
        <FiSun className="relative z-10 text-lg md:text-sm" />
      </button>
      <button
        className={`${TOGGLE_CLASSES} text-foreground`}
        onClick={() => handleDark()}
      >
        <FiMoon className="relative z-10 text-lg md:text-sm" />
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          selected === 'dark' ? 'justify-end' : 'justify-start'
        }`}
      >
        <motion.span
          layout
          transition={{ type: 'spring', damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-primary/40 to-primary/20"
        />
      </div>
    </div>
  );
};

export default Example;
