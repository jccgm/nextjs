import React from "react";
import { Card } from "antd";
import PropTypes from "prop-types";

const Widget = ({
  title,
  children,
  styleName,
  cover,
  extra,
  actions,
  hoverable,
  onClick,
  shadow = true,
}) => {
  const shadowClass = shadow ? "gx-card-widget" : "";
  return (
    <Card
      title={title}
      actions={actions}
      cover={cover}
      className={`${shadowClass} ${styleName}`}
      extra={extra}
      hoverable={hoverable}
      onClick={onClick}
    >
      {children}
    </Card>
  );
};

export default Widget;
Widget.defaultProps = {
  styleName: "",
};

Widget.propTypes = {
  title: PropTypes.node,
  extra: PropTypes.node,
  cover: PropTypes.node,
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
};
