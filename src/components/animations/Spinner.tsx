import { CirclesWithBar, Puff, RevolvingDot } from "react-loader-spinner";

interface SpinnerProps {
  name?: string;
}

const Spinner = ({ name }: SpinnerProps) => {
  if (name === "CirclesWithBar") {
    return (
     <div className="flex justify-center items-center">
       
        <CirclesWithBar
          wrapperClass=""
          height={100}
          color="rgb(253,244,255)"
          barColor="rgb(162,28,175)"
        />
     </div>
    );
  } else if (name === "Puff") {
    return (
      <div>
        <Puff
          height="100"
          width="100"
          radius={10}
          color="#4fa94d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
       </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center">
        <RevolvingDot
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor=""
          ariaLabel="revolving-dot-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
};

export default Spinner;
