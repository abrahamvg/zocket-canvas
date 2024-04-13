import { useState } from "react";
import DeleteIcon from "./images/delete.png";
import "./App.css";
import { HexColorPicker } from "react-colorful";
import CanvasEditor from "./CanvasEditor";

function App() {
  // const [count, setCount] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null);
  const [color, setColor] = useState([]);
  const [selectedColor, setSelectedColor] = useState("rgb(229 231 235)");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const [captionText, setCaptionText] = useState("");
  const [callToAction, setCallToAction] = useState("");

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleClick = () => {
    setIsColorPickerOpen(!isColorPickerOpen);
  };

  let currentColor = "";

  const handleColorChange = (color) => {
    currentColor = color;
  };

  const handleClose = () => {
    setIsColorPickerOpen(false);
    setSelectedColor(currentColor);
    const updatedColorList = [...color, currentColor];

    if (updatedColorList.length > 5) {
      // Remove the first element from the updatedColorList array
      setColor(updatedColorList.slice(1));
    } else {
      setColor(updatedColorList);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-50 flex justify-center items-center">
      <div className="h-fit w-3/5 bg-white shadow-md rounded-2xl grid grid-cols-12 ">
        <div className="left col-span-6 h-full"
        >
          {/* Canvas Element */}
          <CanvasEditor
            captionText={captionText}
            callToAction={callToAction}
            image={selectedImage}
            backgroundColor={selectedColor}
          />
        </div>
        <div className="right col-span-6 bg-white font-satoshi py-12 px-6 h-full">
          {/* Customisation Element */}
          <div className="header text-center">
            <h4>Ad Customisation</h4>
            <p>Customise you Ad and get template accordingly</p>
          </div>
          <div className="flex flex-row mt-4 gap-2">
            <div className="w-full p-3 border-gray-100 border-solid border-[2px] rounded-lg w-4/5">
              <label htmlFor="imageInput">
                <p>
                  Change the ad creative image.{" "}
                  <span className="text-blue-400 underline font-bold cursor-pointer">
                    select file.
                  </span>
                </p>
              </label>
            </div>
            {/* File input */}
            <input
              id="imageInput"
              type="file"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files[0];
                const reader = new FileReader();

                reader.onload = () => {
                  const img = new Image();
                  img.onload = () => {
                    setSelectedImage(img);
                  };
                  img.src = reader.result;
                };

                reader.readAsDataURL(file);
              }}
              accept="image/*"
            />
            {selectedImage && (
              <div
                className="h-full w-12 p-3 border-gray-100 border-solid border-[2px] rounded-lg"
                onClick={() => setSelectedImage(null)}
              >
                <img src={DeleteIcon} alt="" />
              </div>
            )}
          </div>
          <div className="h-12 w-full px-3 flex justify-between items-center my-5">
            <div className="w-full h-[1px] bg-gray-400"></div>
            <p className="mx-2 text-gray-400 w-56 text-center">Edit Contents</p>
            <div className="w-full h-[1px] bg-gray-400"></div>
          </div>
          <div className="mb-5 border  border-gray-400 focus-within:ring-blue-500 focus-within:border-blue-500 focus-within:text-blue-500 rounded-lg px-3 py-1 check">
            <label
              htmlFor="text"
              className="block mb-1 focus-within:text-blue-500"
            >
              <p>Ad Content</p>
            </label>
            <input
              type="text"
              id="text"
              className="focus-visible:border-blue placeholder:text-gray-400 text-gray-900 text-sm block w-full"
              placeholder="Enter Ad Content"
              value={captionText}
              onChange={(e) => setCaptionText(e.target.value)}
              required
            />
          </div>
          <div className="mb-5 border border-gray-400 focus-within:ring-blue-500 focus-within:border-blue-500 rounded-lg px-3 py-1 check">
            <label htmlFor="text" className="block mb-1">
              <p>CTA</p>
            </label>
            <input
              type="text"
              id="text"
              className="focus-visible:border-blue placeholder:text-gray-400 text-gray-900 text-sm block w-full "
              placeholder="Enter Ad Content"
              value={callToAction}
              onChange={(e) => setCallToAction(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <p>Choose You Color</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            {color.length > 0 && (
              <>
                {color.map((color, index) => (
                  <>
                    <div
                      className={`${
                        selectedColor === color
                          ? "border-2 border-blue-500 "
                          : ""
                      }rounded-full`}
                    >
                      <div
                        key={index}
                        className={`w-6 h-6 border flex justify-center items-center rounded-full ${
                          selectedColor === color
                            ? "border-2 border-white"
                            : "border-4 border-white"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(color)}
                      ></div>
                    </div>
                  </>
                ))}
              </>
            )}

            <div
              className="w-6 h-6 border bg-gray-200 flex justify-center items-center rounded-full"
              onClick={handleClick}
            >
              <p className="text-gray-700 font-black text-base">+</p>
            </div>
            {isColorPickerOpen && (
              <>
                <div
                  style={{ position: "absolute", inset: "0px" }}
                  onClick={handleClose}
                ></div>
                <HexColorPicker
                  className="absolute bottom-[200px]"
                  color={color[color.length - 1]}
                  onChange={handleColorChange}
                />
                {/* <input
                  type="color"
                  value={color[color.length - 1]}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="mt-4"
                /> */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
