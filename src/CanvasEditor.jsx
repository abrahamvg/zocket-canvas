/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRef, useEffect } from "react";

class CanvasElement {
  constructor(
    ctx,
    x,
    y,
    width,
    height,
    backgroundColor,
    image,
    maskUrl,
    strokeUrl,
    designUrl
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.maskUrl = maskUrl;
    this.strokeUrl = strokeUrl;
    this.designUrl = designUrl;
    this.maskImage = null;
    this.strokeImage = null;
    this.designImage = null;
    this.backgroundColor = backgroundColor;
  }

  async draw() {
    if (this.image) {
      await this.loadMaskAndStroke();
      this.ctx.save();

      // Draw the image
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

      // Apply the mask
      this.ctx.globalCompositeOperation = "destination-in";
      this.ctx.drawImage(
        this.maskImage,
        this.x,
        this.y,
        this.width,
        this.height
      );
      this.ctx.globalCompositeOperation = "source-over";

      // Draw the stroke
      this.ctx.drawImage(
        this.strokeImage,
        this.x,
        this.y,
        this.width,
        this.height
      );

      // Draw the design image
      this.ctx.globalCompositeOperation = "destination-over";
      this.ctx.drawImage(
        this.designImage,
        this.x,
        this.y,
        this.width,
        this.height
      );
      this.drawBackground()
    }
  }
  async loadMaskAndStroke() {
    this.maskImage = await this.loadImage(this.maskUrl);
    this.strokeImage = await this.loadImage(this.strokeUrl);
    this.designImage = await this.loadImage(this.designUrl);
  }

  drawBackground() {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  loadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });
  }
}

// eslint-disable-next-line no-unused-vars
class BackgroundElement extends CanvasElement {
  constructor(ctx, x, y, backgroundColor) {
    super(ctx, x, y, ctx.canvas.width, ctx.canvas.height);
    this.backgroundColor = backgroundColor;
  }

  draw() {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}


class CaptionElement extends CanvasElement {
  constructor(ctx, text, x, y, fontSize, alignment, textColor) {
    super(ctx, x, y, 0, 0);
    this.text = text;
    this.fontSize = fontSize;
    this.alignment = alignment;
    this.textColor = textColor;
  }

  draw() {
    this.ctx.fillStyle = this.textColor;
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.font = `${this.fontSize}px Satoshi`;
    this.ctx.fillStyle = this.textColor;
    this.ctx.textAlign = this.alignment;
    this.ctx.fillText(this.text, this.x, this.y);
  }
}
class CtaElement extends CanvasElement {
  constructor(ctx, text, x, y, fontSize, alignment, textColor) {
    super(ctx, x, y, 0, 0);
    this.text = text;
    this.fontSize = fontSize;
    this.alignment = alignment;
    this.textColor = textColor;
  }

  draw() {
    this.ctx.fillStyle = this.textColor;
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.font = `${this.fontSize}px Satoshi`;
    this.ctx.fillStyle = this.textColor;
    this.ctx.textAlign = this.alignment;
    this.ctx.fillText(this.text, this.x, this.y);
  }
}

class MainImage extends CanvasElement {
  constructor(
    ctx,
    x,
    y,
    width,
    height,
    image,
    maskUrl,
    strokeUrl,
    designUrl,
    backgroundColor,
    text
  ) {
    super(ctx, x, y, width, height);
    this.image = image;
    this.maskUrl = maskUrl;
    this.strokeUrl = strokeUrl;
    this.designUrl = designUrl;
    this.maskImage = null;
    this.strokeImage = null;
    this.designImage = null;
    this.backgroundColor = backgroundColor;
  }

  async draw() {
    if (this.image) {
      await this.loadMaskAndStroke();
      this.ctx.save();

      // Draw the image
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

      // Apply the mask
      this.ctx.globalCompositeOperation = "destination-in";
      this.ctx.drawImage(
        this.maskImage,
        this.x,
        this.y,
        this.width,
        this.height
      );
      this.ctx.globalCompositeOperation = "source-over";

      // Draw the stroke
      this.ctx.drawImage(
        this.strokeImage,
        this.x,
        this.y,
        this.width,
        this.height
      );

      // Draw the design image
      this.ctx.globalCompositeOperation = "destination-over";
      this.ctx.drawImage(
        this.designImage,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  caption() {
    this.ctx.fillStyle = this.textColor;
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.font = `${this.fontSize}px Satoshi`;
    this.ctx.fillStyle = this.textColor;
    this.ctx.textAlign = this.alignment;
    this.ctx.fillText(this.text, this.x, this.y);
  }

  async loadMaskAndStroke() {
    this.maskImage = await this.loadImage(this.maskUrl);
    this.strokeImage = await this.loadImage(this.strokeUrl);
    this.designImage = await this.loadImage(this.designUrl);
  }

  loadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });
  }
}

const CanvasEditor = ({
  captionText,
  callToAction,
  image,
  backgroundColor,
}) => {
  const imageMask = {
    x: 0,
    y: 0,
    width: 300,
    height: 150,
    maskUrl:
      "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png",
    strokeUrl:
      "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png",
    designUrl:
      "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png",
  };

  const canvasRef = useRef(null);
  const caption = {
    text: captionText,
    position: { x: 0, y: 0 },
    fontSize: 10,
    alignment: "left",
    textColor: "#000000",
    maxCharactersPerLine: 3,
  };
  const cta = {
    text: callToAction,
    position: { x: 20, y: 50 },
    fontSize: 10,
    alignment: "left",
    textColor: backgroundColor,
    maxCharactersPerLine: 3,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image
    const { x, y, width, height, maskUrl, strokeUrl, designUrl } = imageMask;

    const mainImage = new CanvasElement(
      ctx,
      x,
      y,
      width,
      height,
      backgroundColor,
      image,
      maskUrl,
      strokeUrl,
      designUrl,
    );
    mainImage.draw();

    const backgroundElement = new BackgroundElement(ctx, x, y, backgroundColor);
    backgroundElement.draw();

    const captionElement = new CaptionElement(
      ctx,
      caption.text,
      caption.position.x,
      caption.position.y,
      caption.fontSize,
      caption.alignment,
      caption.textColor
    );
    captionElement.draw();

    const ctaElement = new CtaElement(
      ctx,
      cta.text,
      cta.position.x,
      cta.position.y,
      cta.fontSize,
      cta.alignment,
      cta.textColor
    );
    ctaElement.draw();
  }, [image, captionText, callToAction, backgroundColor]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="border border-gray-500 h-4/5 w-4/5"
      ></canvas>
    </div>
  );
};
export default CanvasEditor;
