import React from "react";

class ContainerSize extends React.Component {
  state = {
    elementHeight: 0,
    elementWidth: 0
  };

  setElementRef = (el) => {
    this.sizeElement = el;
  };

  onResize = () => {
    const {
      clientHeight: elementHeight,
      clientWidth: elementWidth
    } = this.sizeElement;
    if (
      this.state.elementHeight !== elementHeight ||
      this.state.elementWidth !== elementWidth
    ) {
      this.setState({ elementHeight, elementWidth });
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  render() {
    const { children } = this.props;
    const { elementHeight, elementWidth } = this.state;
    return (
      <div style={{ width: "100%", height: "100%" }} ref={this.setElementRef}>
        {children({ elementHeight, elementWidth })}
      </div>
    );
  }
}

const AspectRatio = ({ ratioX, ratioY, children, style, ...props }) => {
  const ratio = ratioX / ratioY;
  return (
    <ContainerSize>
      {({ elementHeight, elementWidth }) => {
        let dimension = {};
        if (elementHeight > elementWidth) {
          dimension = {
            height: (elementWidth * ratioY) / ratioX,
            width: elementWidth
          };
        } else if (elementHeight < elementWidth) {
          dimension = { height: elementHeight, width: elementHeight * ratio };
        } else {
          if (ratioX > ratioY) {
            const width = elementWidth;
            const height = elementWidth * (ratioY / ratioX);
            dimension = { height, width };
          } else if (ratioY > ratioX) {
            const width = elementHeight * (ratioX / ratioY);
            const height = elementHeight;
            dimension = { height, width };
          } else {
            const width = elementWidth;
            const height = elementHeight;
            dimension = { height, width };
          }
        }
        return (
          <div {...props} style={{ ...dimension, ...style }}>
            {children}
          </div>
        );
      }}
    </ContainerSize>
  );
};

export default AspectRatio;
