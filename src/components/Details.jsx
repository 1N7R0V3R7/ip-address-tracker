import React from "react";

const Details = (props) => {
  return (
    <div className="text-very-dark-gray text-xl py-8 w-[85%] max-w-5xl mx-auto mt-8 z-30 font-medium grid gap-8 bg-white text-center lg:text-left lg:gap-0 lg:grid-cols-4 lg:divide-x-2 rounded-2xl">
      <div className="lg:pl-8">
        <h4 className="text-dark-gray text-xs font-bold mb-2 tracking-widest">
          IP ADDRESS
        </h4>
        <p className="">{props.ip}</p>
      </div>
      <div className="lg:pl-8">
        <h4 className="text-dark-gray text-xs font-bold mb-2 tracking-widest">
          LOCATION
        </h4>
        <p className="">{props.location}</p>
      </div>
      <div className="lg:pl-8">
        <h4 className="text-dark-gray text-xs font-bold mb-2 tracking-widest">
          TIMEZONE
        </h4>
        <p className="">{props.timezone}</p>
      </div>
      <div className="lg:pl-8">
        <h4 className="text-dark-gray text-xs font-bold mb-2 tracking-widest">
          ISP
        </h4>
        <p className="">{props.isp}</p>
      </div>
    </div>
  );
};

export default Details;
