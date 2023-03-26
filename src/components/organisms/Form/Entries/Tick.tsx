interface Props {
  color: string;
}

const Tick = ({ color }: Props) => {
  return (
    <svg className="tick" height={13} width={16} fill={color}>
      <path d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z" />
    </svg>
  );
};

export default Tick;
