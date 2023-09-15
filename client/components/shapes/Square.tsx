interface Props {
  x: number
  y: number
  size: number
  handleClick: (e: React.MouseEvent<SVGRectElement>) => void
}

function Square(props: Props) {
  return (
    <svg style={{ overflow: 'visible', position: 'absolute' }}>
      <rect
      data-testid="square-rect"
        role="img"
        x={props.x}
        y={props.y}
        width={props.size}
        height={props.size}
        onClick={props.handleClick}
      ></rect>
    </svg>
  )
}

export default Square
