import { FiChevronDown, FiClock } from 'react-icons/fi';
import { FaAirFreshener } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const StaggeredDropDown = ({ setSortOption }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="flex w-[100px] items-center justify-center pb-3"
      ref={dropdownRef}
    >
      <motion.div animate={open ? 'open' : 'closed'} className="relative">
        <button
          onClick={() => setOpen(pv => !pv)}
          className="flex items-center gap-2 rounded-md bg-indigo-500 px-3 py-2 text-indigo-50 transition-colors hover:bg-indigo-500"
        >
          <span className="text-sm font-medium">Sort By:</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: 'top', translateX: '-50%' }}
          className="absolute left-[50%] top-[120%] z-50 flex w-48 flex-col gap-2 overflow-hidden rounded-lg bg-white p-2 shadow-xl"
        >
          <Option
            value="newer"
            setOpen={setOpen}
            setSortOption={setSortOption}
            Icon={FaAirFreshener}
            text="Newer"
          />
          <Option
            value="older"
            setOpen={setOpen}
            setSortOption={setSortOption}
            Icon={FiClock}
            text="Older"
          />
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ value, text, Icon, setOpen, setSortOption }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setSortOption(value);
        setOpen(false);
      }}
      className="flex w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded-md p-2 text-xs font-medium text-slate-700 transition-colors hover:bg-indigo-100 hover:text-indigo-500"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: 'afterChildren',
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
