import { useState } from "react";
import Png_Image from "./images/Png_Image.png";
function Scheduler() {
  const [daily, setDaily] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const dateInput = () => {
    setDaily(true);
    setWeekly(false);
  };
  const weekInput = () => {
    setDaily(false);
    setWeekly(true);
  };
  return (
    <div className="font-raleway">
      <div className="grid grid-cols-4 ml-32 mr-32 mt-8">
        <div>
          <img src={Png_Image} alt="hello" className="w-64 h-40" />
        </div>
        <div className="col-span-3 font-bold text-xl tracking-wider mt-2">
          Hello Shreyasa,welcome!
          <div className="text-sm text-gray-600">Lets get to work today.</div>
          <div className="text-xs text-gray-400 mt-4">
            Use the scheduler to help schedule your day or even week! Set your
            goals and tasks to keep smashing them <br />
            everyday. Scheduling daily/weekly will also help you earn points!
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 ml-32 mr-32">
        <div className="text-left rounded bg-[#FFB40047]">
          <div className="flex font-bold">
            <div className="mx-2 mt-4 ml-4 cursor-pointer" onClick={dateInput}>
              Daily
            </div>
            <div className="mx-4 mt-4 cursor-pointer" onClick={weekInput}>
              Weekly
            </div>
          </div>
          {daily && (
            <div className="mt-4 ml-4 justify-left">
              <label for="start" className="font-bold">
                Date
              </label>
              <br />
              <input
                type="date"
                id="start"
                name="trip-start"
                value="2018-07-22"
                min="2018-01-01"
                max="2018-12-31"
                className="p-2 rounded-xl w-1/2"
              ></input>
            </div>
          )}
          {weekly && (
            <div className="mt-4 ml-4 justify-left">
              <label for="start">Date Weekly</label>
              <br />
              <input
                type="date"
                id="start"
                name="trip-start"
                value="2018-07-22"
                min="2018-01-01"
                max="2018-12-31"
                className="p-2 rounded-xl "
              ></input>
            </div>
          )}
        </div>
        <div className="text-left rounded  bg-[#FFB40047]">
          <p className="font-bold ml-4 mt-2">Project</p>
          <div className="ml-2 mt-2 mr-2 ">
            <select
              name="choose"
              required
              className="text-gray-900 p-2 rounded w-full outline-none font-bold"
            >
              <option value="" disabled selected hidden>
                Add New or Choose existing
              </option>
              <option value="coffee">Coffee</option>
              <option value="tea">Tea</option>
              <option value="milk">Milk</option>
            </select>
          </div>
          <div className="ml-4 mt-2">
            <input
              type="checkbox"
              id="coding"
              name="interest"
              value="coding"
              className="w-[15px] h-[14px]"
            />
            <label for="coding" className="text-gray-600 ml-2">
              Space
            </label>
          </div>
          <div className="ml-4 mt-2 mb-2">
            <input
              type="checkbox"
              id="music"
              name="interest"
              value="music"
              className="w-[15px] h-[14px]"
            />
            <label for="music" className="text-gray-600 ml-2">
              Forge
            </label>
          </div>
        </div>

        <div className="text-left rounded row-span-2  bg-[#FFB40047]">
          <p className="font-bold ml-4 mt-2">Goals</p>
          <div className="ml-2 mt-2 mr-2">
            <select
              name="choose"
              required
              className="text-gray-900 p-2 rounded w-full outline-none font-bold"
            >
              <option value="" disabled selected hidden>
                Add New or Choose existing
              </option>
              <option value="coffee">Coffee</option>
              <option value="tea">Tea</option>
              <option value="milk">Milk</option>
            </select>
          </div>
          <div className="flex justify-between bg-white rounded my-4 mx-2">
            <div className="ml-2 mt-3">
              <input
                type="checkbox"
                id="music"
                name="interest"
                value="music"
                className="w-[15px] h-[14px]"
              />
              <label for="music" className="font-bold ml-2">
                Get Design for Space
              </label>
              <div className="text-gray-600 text-xs p-2 ml-4 tracking-wider font-semibold">
                Project :<span className="ml-1">Space</span>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-center text-white font-bold bg-[#dc2626] w-8 rounded-xl ml-14 px-2">
                P1
              </p>
              <div className="text-gray-600 text-xs p-2 font-semibold">
                Due by : 23-02-23
              </div>
            </div>
          </div>
          <div className="flex justify-between bg-white rounded mx-2 my-4">
            <div className="ml-2 mt-2">
              <input
                type="checkbox"
                id="music"
                name="interest"
                value="music"
                className="w-[15px] h-[14px] "
              />
              <label for="music" className="font-bold ml-2">
                Get Design for Space
              </label>
              <div className="text-gray-600 text-xs p-2 ml-4 tracking-wider font-semibold">
                Project :<span className="ml-1">Space</span>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-center text-white font-bold bg-[#dc2626] w-8 rounded-xl ml-14 px-2">
                P1
              </p>
              <div className="text-gray-600 text-xs p-2 font-semibold">
                Due by : 23-02-23
              </div>
            </div>
          </div>{" "}
          <div className="flex justify-between bg-white rounded mx-2 my-4">
            <div className="ml-2 mt-2">
              <input
                type="checkbox"
                id="music"
                name="interest"
                value="music"
                className="w-[15px] h-[14px] "
              />
              <label for="music" className="font-bold ml-2">
                Get Design for Space
              </label>
              <div className="text-gray-600 text-xs p-2 ml-4 tracking-wider font-semibold">
                Project :<span className="ml-1">Space</span>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-center text-white font-bold bg-[#dc2626] w-8 rounded-xl ml-14 px-2">
                P1
              </p>
              <div className="text-gray-600 text-xs p-2 font-semibold">
                Due by : 23-02-23
              </div>
            </div>
          </div>{" "}
          <div className="flex justify-between bg-white rounded mx-2 my-4">
            <div className="ml-2 mt-2">
              <input
                type="checkbox"
                id="music"
                name="interest"
                value="music"
                className="w-[15px] h-[14px] "
              />
              <label for="music" className="font-bold ml-2">
                Get Design for Space
              </label>
              <div className="text-gray-600 text-xs p-2 ml-4 tracking-wider font-semibold">
                Project :<span className="ml-1">Space</span>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-center text-white font-bold bg-[#dc2626] w-8 rounded-xl ml-14 px-2">
                P1
              </p>
              <div className="text-gray-600 text-xs p-2 font-semibold">
                Due by : 23-02-23
              </div>
            </div>
          </div>
          <div className="flex justify-between bg-white rounded mx-2 my-4">
            <div className="ml-2 mt-2">
              <input
                type="checkbox"
                id="music"
                name="interest"
                value="music"
                className="w-[15px] h-[14px] "
              />
              <label for="music" className="font-bold ml-2">
                Get Design for Space
              </label>
              <div className="text-gray-600 text-xs p-2 ml-4 tracking-wider font-semibold">
                Project :<span className="ml-1">Space</span>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-center text-white font-bold bg-[#dc2626] w-8 rounded-xl ml-14 px-2">
                P1
              </p>
              <div className="text-gray-600 text-xs p-2 font-semibold">
                Due by : 23-02-23
              </div>
            </div>
          </div>
        </div>
        <div className="text-left bg-[#FFB40047] rounded">
          <p className="font-bold ml-4 mt-2">Goals</p>
          <div className="ml-2 mt-2 mr-2">
            <select
              name="choose"
              required
              className="text-gray-900 p-2 rounded w-full outline-none font-bold"
            >
              <option value="" disabled selected hidden>
                Add New or Choose existing
              </option>
              <option value="coffee">Coffee</option>
              <option value="tea">Tea</option>
              <option value="milk">Milk</option>
            </select>
          </div>
          <div className="flex justify-between bg-white rounded mx-2 my-4">
            <div className="ml-2 mt-2">
              <input
                type="checkbox"
                id="music"
                name="interest"
                value="music"
                className="w-[15px] h-[14px] "
              />
              <label for="music" className="font-bold ml-2">
                Get Design for Space
              </label>
              <div className="text-gray-600 text-xs p-2 ml-4 tracking-wider font-semibold">
                Project :<span className="ml-1">Space</span>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-center text-white font-bold bg-[#dc2626] w-8 rounded-xl ml-14 px-2">
                P1
              </p>
              <div className="text-gray-600 text-xs p-2 font-semibold">
                Due by : 23-02-23
              </div>
            </div>
          </div>
          <div className="flex justify-between bg-white rounded mx-2 my-4">
            <div className="ml-2 mt-2">
              <input
                type="checkbox"
                id="music"
                name="interest"
                value="music"
                className="w-[15px] h-[14px]"
              />
              <label for="music" className="font-bold ml-2">
                Get Design for Space
              </label>
              <div className="text-gray-600 text-xs p-2 ml-4 tracking-wider font-semibold">
                Project :<span className="ml-1">Space</span>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-center text-white font-bold bg-[#dc2626] w-8 rounded-xl ml-14 px-2">
                P1
              </p>
              <div className="text-gray-600 text-xs p-2 font-semibold">
                Due by : 23-02-23
              </div>
            </div>
          </div>
        </div>
        <div className="text-left rounded mt-2">
          <label for="notes" className="font-extrabold">
            Add Notes If Any
          </label>
          <div className="border border-gray-600 rounded p-2">
            <textarea
              id="notes"
              name="notes"
              rows="5"
              cols="33"
              placeholder="Input text"
              className="outline-none w-full h-[150px] font-bold"
            />
          </div>
        </div>
      </div>
      <button className="bg-[#FFB40047] px-4 py-2 rounded mt-4 font-bold float-right mr-32 tracking-wider">
        All Set!Lets GO→{" "}
      </button>
    </div>
  );
}

export default Scheduler;
