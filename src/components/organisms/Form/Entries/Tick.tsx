import { MotionProps, motion } from 'framer-motion';
interface Props extends MotionProps {
  color: string;
}

const Tick = ({ color }: Props) => {
  return (
    <motion.svg className="tick" height={13} width={16} fill={color}>
      <path d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z" />
    </motion.svg>
  );
};

export default Tick;
