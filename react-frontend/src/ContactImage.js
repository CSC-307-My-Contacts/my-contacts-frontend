import React from "react";

const getImageUrl = (image) => {
  if (image && image.type && image.url) {
    if (image.type === "external") {
      return image.url;
    }
  }
  return "/contact-no-image.png";
};

const ContactImage = ({ image: image, className: className, ...rest }) => {
  return (
    <img
      {...rest}
      className={"rounded-circle " + className}
      src={getImageUrl(image)}
      alt=""
    />
  );
};

export default ContactImage;
